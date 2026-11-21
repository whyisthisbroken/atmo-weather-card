import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { errors, makeHass, mountCard, runFrames } from "./helpers/dom.js";
import { sunPathState, sunPathSvg, sunPathTime } from "../src/atmo-weather-sunpath.js";

await import("../src/atmo-weather-card.js");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors, []);
  errors.length = 0;
});

const H = 3600000;
const at = (iso) => Date.parse(iso);
const sun = (state, rising, setting) => ({ entity_id: "sun.sun", state, attributes: { next_rising: rising, next_setting: setting } });

test("by day the sun runs from this morning's sunrise to tonight's sunset", () => {
  // 13:00, sunrise 06:00 tomorrow, sunset 18:00 today: 7 of 12 hours gone.
  const s = sunPathState(sun("above_horizon", "2026-11-21T06:00:00Z", "2026-11-20T18:00:00Z"), at("2026-11-20T13:00:00Z"));
  assert.equal(s.night, false);
  assert.ok(Math.abs(s.t - 7 / 12) < 1e-9);
  assert.equal(s.from.toISOString(), "2026-11-20T06:00:00.000Z");
  assert.equal(s.to.toISOString(), "2026-11-20T18:00:00.000Z");
});

test("at night the moon runs from tonight's sunset to the next sunrise", () => {
  // 21:00, sunrise 06:00, sunset 18:00 tomorrow: 3 of 12 hours gone.
  const s = sunPathState(sun("below_horizon", "2026-11-21T06:00:00Z", "2026-11-21T18:00:00Z"), at("2026-11-20T21:00:00Z"));
  assert.equal(s.night, true);
  assert.ok(Math.abs(s.t - 0.25) < 1e-9);
  assert.equal(s.from.toISOString(), "2026-11-20T18:00:00.000Z");
  assert.equal(s.to.toISOString(), "2026-11-21T06:00:00.000Z");
});

test("while Home Assistant moves the times on, the body stays at the horizon", () => {
  // Below the horizon, but the sunset still ahead: at the start of the night.
  assert.equal(sunPathState(sun("below_horizon", "2026-11-21T06:00:00Z", "2026-11-20T18:05:00Z"), at("2026-11-20T18:00:00Z")).t, 0);
  // Above the horizon with the sunrise just ahead: at the start of the day.
  assert.equal(sunPathState(sun("above_horizon", "2026-11-20T06:05:00Z", "2026-11-20T18:00:00Z"), at("2026-11-20T06:00:00Z")).t, 0);
  // Without times there is nothing to draw.
  assert.equal(sunPathState({ state: "above_horizon", attributes: {} }), null);
  assert.equal(sunPathState(null), null);
});

test("the times follow date_format or Home Assistant's 12 or 24 hours", () => {
  const d = new Date(2026, 10, 20, 18, 5);
  assert.equal(sunPathTime(d, "%H:%M", { language: "en" }), "18:05");
  assert.match(sunPathTime(d, undefined, { language: "en", time_format: "24" }), /^18:05$/);
  assert.match(sunPathTime(d, undefined, { language: "en", time_format: "12" }), /6:05\s?PM/i);
});

test("the arc draws the way gone solid and the sun or the moon on it", () => {
  const day = sunPathSvg(0.5, false);
  assert.match(day, /class="sp-done"/);
  assert.match(day, /class="sp-sun" cx="50.0" cy="6.0"/);
  const night = sunPathSvg(0, true);
  assert.match(night, /sp-night/);
  assert.match(night, /class="sp-moon"/);
  // Nothing gone yet: no solid part.
  assert.doesNotMatch(night, /sp-done/);
});

test("a sun_path chip shows the arc, Daylight or Night and the two times", () => {
  const hass = makeHass();
  const now = Date.now();
  hass.states["sun.sun"] = sun("above_horizon", new Date(now + 18 * H).toISOString(), new Date(now + 4 * H).toISOString());
  const card = mountCard({ chips: [{ entity: "sun.sun", type: "sun_path", date_format: "%H:%M" }] }, hass);
  runFrames(2);
  const chip = card.shadowRoot.querySelector(".chip.chip-sunpath-type");
  assert.ok(chip);
  assert.equal(chip.querySelector(".chip-icon"), null);
  assert.equal(chip.querySelector(".chip-name").textContent, "Daylight");
  assert.ok(chip.querySelector(".chip-sunpath svg.sp-arc .sp-sun"));
  assert.equal(chip.querySelectorAll(".sp-times span").length, 2);
  // German, at night.
  const de = makeHass({ language: "de" });
  de.states["sun.sun"] = sun("below_horizon", new Date(now + 6 * H).toISOString(), new Date(now + 18 * H).toISOString());
  card.hass = de;
  runFrames(2);
  const n = card.shadowRoot.querySelector(".chip.chip-sunpath-type");
  assert.equal(n.querySelector(".chip-name").textContent, "Nacht");
  assert.ok(n.querySelector(".sp-moon"));
});

test("a sun_path chip on an entity without sun times stays a normal chip", () => {
  const card = mountCard({ chips: [{ entity: "sensor.outside_temperature", type: "sun_path" }] }, makeHass());
  runFrames(2);
  assert.equal(card.shadowRoot.querySelector(".chip-sunpath-type"), null);
  assert.ok(card.shadowRoot.querySelector(".chip .chip-val"));
});
