import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { errors, makeHass, mountCard, runFrames } from "./helpers/dom.js";
import { applyCardLayout, curveHasChips, layoutDefaults, ownChipFromLayout, shownLayoutChips } from "../src/atmo-weather-config.js";

await import("../src/atmo-weather-card.js");
await import("../src/atmo-weather-card-editor.js");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), []);
});

async function mountEditor(config, hass = makeHass()) {
  const editor = document.createElement("atmo-weather-card-editor");
  const emitted = [];
  editor.addEventListener("config-changed", (event) => {
    emitted.push(event.detail.config);
    editor.setConfig(event.detail.config);
  });
  editor.hass = hass;
  editor.setConfig(config);
  editor._openPanel = "chips";
  document.body.append(editor);
  await editor.updateComplete;
  return { editor, emitted };
}
const HOME = { type: "custom:atmo-weather-card", weather_entity: "weather.home", sun_entity: "sun.sun", card_layout: "home" };
const noLayoutKeys = (chips) => chips.every((c) => !Object.keys(c).some((k) => k.startsWith("_layout")));

// Report of 2026-11-22: after picking a layout the chips it shows were not in
// the chip list, so they could not be changed or removed.
test("a fresh layout lists the chips it shows, and the config stays without chips", async () => {
  const { editor, emitted } = await mountEditor(HOME);
  const list = editor._getChips();
  assert.ok(list.length >= 4, `listed ${list.length}`);
  assert.ok(noLayoutKeys(list));
  assert.equal(editor.shadowRoot.querySelectorAll(".sensor-list .chip-row, .sensor-list > *").length > 0, true);
  assert.match(editor.shadowRoot.querySelector(".layout-chips-list").textContent, /first change/);
  assert.equal(emitted.length, 0);
  assert.ok(!("chips" in editor._config));
});

test("the first change makes the listed chips your own, with that change", async () => {
  const { editor, emitted } = await mountEditor(HOME);
  const before = editor._getChips();
  editor._updateChipAt(1, { ...before[1], name: "Draußen" });
  await editor.updateComplete;
  const chips = emitted.at(-1).chips;
  assert.equal(chips.length, before.length);
  assert.equal(chips[1].name, "Draußen");
  assert.deepEqual(chips[0], before[0]);
  assert.ok(noLayoutKeys(chips));
  // Now they are your own: the list is the config.
  assert.deepEqual(editor._getChips(), chips);
  assert.ok(!editor.shadowRoot.querySelector(".layout-chips-list"));
});

test("removing, adding and moving work on the layout's chips too", async () => {
  const { editor, emitted } = await mountEditor(HOME);
  const before = editor._getChips();
  editor._removeChip(0);
  await editor.updateComplete;
  assert.deepEqual(emitted.at(-1).chips, before.slice(1));
  document.body.replaceChildren();
  const second = await mountEditor(HOME);
  second.editor._addQuickChip({ entity: "sensor.x" });
  await second.editor.updateComplete;
  assert.deepEqual(second.emitted.at(-1).chips, [...before, { entity: "sensor.x" }]);
  document.body.replaceChildren();
  const third = await mountEditor(HOME);
  third.editor._moveChip(0, 1);
  await third.editor.updateComplete;
  assert.deepEqual(third.emitted.at(-1).chips, [before[1], before[0], ...before.slice(2)]);
});

test("chips taken from a layout look the same on the card", async () => {
  // Wide is left out: on a narrow card it turns into Standard, with its chips.
  for (const layout of ["standard", "compact", "home", "panel"]) {
    const cfg = { ...HOME, card_layout: layout };
    const { editor } = await mountEditor(cfg, makeHass({ language: "de" }));
    const own = editor._getChips();
    document.body.replaceChildren();
    const texts = (card) => [...card.shadowRoot.querySelectorAll(".chip")].map((c) => c.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
    const a = mountCard(cfg, makeHass({ language: "de" }));
    runFrames(3);
    const fromLayout = texts(a);
    document.body.replaceChildren();
    const b = mountCard({ ...cfg, chips: own }, makeHass({ language: "de" }));
    runFrames(3);
    assert.deepEqual(texts(b), fromLayout, layout);
    document.body.replaceChildren();
  }
});

test("Panel takes only the tiles it shows", () => {
  const chips = applyCardLayout({ ...HOME, card_layout: "panel" }).chips;
  const tiles = (value) => shownLayoutChips(chips, value).filter((c) => c._layoutGroup === "tiles").map((c) => c.attribute);
  // Everything reported: the first four.
  assert.deepEqual(tiles(() => 1), ["wind_bearing", "humidity", "uv_index", "precipitation_probability"]);
  // No UV index and no rain chance: pressure and the sunset step in.
  assert.deepEqual(tiles((c) => (c.attribute === "uv_index" || c.attribute === "precipitation_probability" ? undefined : 1)), ["wind_bearing", "humidity", "pressure", "next_setting"]);
  // A forecast not known yet counts as shown.
  assert.deepEqual(tiles((c) => (c.forecast ? null : 1)), ["wind_bearing", "humidity", "uv_index", "precipitation_probability"]);
  assert.deepEqual(ownChipFromLayout({ entity: "x", _layoutLabel: "Rain", _layoutGroup: "t", _layoutMax: 4, _layoutOptional: true }, "Regen"), { entity: "x", name: "Regen" });
});

test("the editor asks the forecast for Panel's rain tile, like the card", async () => {
  const hass = makeHass();
  delete hass.states["weather.home"].attributes.uv_index;
  hass.states["weather.home"].attributes.pressure = 1016;
  hass.connection = {
    subscribeMessage: async (cb, msg) => {
      setTimeout(() => cb({ type: msg.forecast_type, forecast: [{ datetime: "2099-01-01T00:00:00Z", temperature: 10 }] }), 0);
      return () => {};
    },
  };
  const { editor } = await mountEditor({ ...HOME, card_layout: "panel" }, hass);
  editor._getChips();
  await new Promise((r) => setTimeout(r, 10));
  await editor.updateComplete;
  const tiles = editor._getChips().filter((c) => !c.forecast || c.attribute !== "temperature").map((c) => c.attribute);
  assert.ok(!tiles.includes("precipitation_probability"), tiles.join(","));
  assert.ok(tiles.includes("pressure"), tiles.join(","));
});

// Report of 2026-11-22: the temperature curve could be picked in Home, where
// it never shows.
test("the temperature curve is greyed out with a hint where it cannot show", async () => {
  assert.equal(curveHasChips(applyCardLayout(HOME).chips), false);
  assert.equal(curveHasChips(applyCardLayout({ ...HOME, card_layout: "panel" }).chips), true);
  assert.equal(curveHasChips([{ forecast: "hourly", attribute: "temperature" }, { forecast: "hourly", attribute: "temperature", forecast_offset: 1 }]), true);
  assert.equal(curveHasChips([{ forecast: "hourly", attribute: "temperature" }, { forecast: "hourly", attribute: "temperature", area: 2 }]), false);
  assert.equal(curveHasChips([{ forecast: "hourly", attribute: "temperature", position: "custom" }, { forecast: "hourly", attribute: "temperature" }]), false);
  const home = await mountEditor(HOME);
  assert.ok(home.editor.shadowRoot.querySelector(".curve-unused"));
  document.body.replaceChildren();
  const panel = await mountEditor({ ...HOME, card_layout: "panel" });
  assert.ok(!panel.editor.shadowRoot.querySelector(".curve-unused"));
  assert.ok(layoutDefaults("panel", "weather.home").forecast_curve);
});
