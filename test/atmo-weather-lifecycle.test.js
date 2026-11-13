import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  canvasCalls,
  errors,
  makeHass,
  mountCard,
  resizeAll,
  intersectAll,
  runFrames,
  seedRandom,
} from "./helpers/dom.js";
import { WEATHER_MAP } from "../src/atmo-weather-data.js";

await import("../src/atmo-weather-card.js");

const Card = customElements.get("atmo-weather-card");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), []);
});

const NIGHT = { sun: "below_horizon", dark: true };
const DAY_DARK = { sun: "above_horizon", dark: true };
const DAY_LIGHT = { sun: "above_horizon", dark: false };
const NIGHT_LIGHT = { sun: "below_horizon", dark: false };

function animate(card, frames = 40) {
  canvasCalls.clear();
  runFrames(frames);
  assert.ok(card.shadowRoot.querySelectorAll("canvas").length >= 3);
}

// Removes the card and checks it logged no errors, so the next combination
// starts clean and a failure names the combination.
function done(label) {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), [], label);
}

// One test per weather; inside it every scene and both card styles.
for (const weather of Object.keys(WEATHER_MAP)) {
  test(`renders ${weather} by day and night, light and dark, in both card styles`, () => {
    for (const [label, scene] of Object.entries({ NIGHT, DAY_DARK, DAY_LIGHT, NIGHT_LIGHT })) {
      for (const card_style of ["standalone", "immersive"]) {
        const combo = `${weather}, ${label}, ${card_style}`;
        seedRandom(7);
        const card = mountCard(
          { card_style, perf_mode: "ultra", moon_phase_entity: "sensor.moon" },
          makeHass({ weather, ...scene }),
        );

        animate(card);

        assert.ok(card._initializationComplete, combo);
        assert.ok(canvasCalls.size > 0, `nothing was drawn: ${combo}`);
        done(combo);
      }
    }
  });
}

test("renders in every performance mode", () => {
  for (const perf_mode of ["low", "default", "ultra"]) {
    const card = mountCard({ perf_mode }, makeHass({ weather: "pouring" }));

    animate(card);
    assert.ok(card._initializationComplete, perf_mode);
    done(perf_mode);
  }
});

test("the weather can change while the animation runs", () => {
  const card = mountCard({ perf_mode: "ultra" });
  runFrames(5);
  const states = Object.keys(WEATHER_MAP);

  for (const [index, weather] of states.entries()) {
    card.hass = makeHass({ weather, ...(index % 2 ? NIGHT : DAY_LIGHT) });
    runFrames(12);
  }

  assert.ok(card._initializationComplete);
});

test("the animation stops off screen and resumes when visible", () => {
  const card = mountCard({});
  runFrames(3);

  intersectAll(false);
  runFrames(3);
  assert.equal(card._isVisible, false);

  intersectAll(true);
  runFrames(3);
  assert.equal(card._isVisible, true);
  assert.notEqual(card._animID, null);
});

test("resizing reinitializes the canvas", () => {
  const card = mountCard({});
  const before = card._cachedDimensions.width;

  resizeAll(800, 300);
  runFrames(3);

  assert.notEqual(card._cachedDimensions.width, before);
});

test("a removed card stops and can be attached again", () => {
  const card = mountCard({});
  card.remove();
  assert.equal(card._animID, null);

  document.body.append(card);
  card.hass = makeHass({ weather: "rainy" });
  resizeAll();
  intersectAll();
  runFrames(5);

  assert.notEqual(card._animID, null);
});

test("getStubConfig finds a weather entity and renders", () => {
  const hass = makeHass();
  const config = Card.getStubConfig(hass);

  assert.equal(config.weather_entity, "weather.home");
  // New cards keep every chip in front of the sky.
  assert.ok(config.chips.every((c) => c.behind_effects !== true));
  animate(mountCard(config, hass));
});

test("card reports its size", () => {
  const card = document.createElement("atmo-weather-card");

  assert.equal(typeof card.getCardSize(), "number");
  assert.equal(card.getGridOptions().columns, 12);
});
