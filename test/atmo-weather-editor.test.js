import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { CONFIG_DEFAULTS } from "../src/atmo-weather-config.js";

await import("../src/atmo-weather-card-editor.js");

const Editor = customElements.get("atmo-weather-card-editor");
const createEditor = () => Object.create(Editor.prototype);

test("editor keeps card_background_style without a chip area background", () => {
  const output = createEditor()._cleanConfig({
    card_background_style: "contrast",
    chips: [{ entity: "sensor.a", background: true }],
  });

  assert.equal(output.card_background_style, "contrast");
});

test("editor strips every shared default from the saved config", () => {
  const output = createEditor()._cleanConfig({ ...CONFIG_DEFAULTS });

  assert.deepEqual(Object.keys(output), []);
});

test("editor templates only use Home Assistant elements that still exist", () => {
  const source = readFileSync(
    new URL("../src/atmo-weather-card-editor.js", import.meta.url),
    "utf8",
  );

  assert.ok(!source.includes("<ha-textfield"));
});

function createLiveEditor(hass) {
  const editor = createEditor();
  const events = [];
  editor.requestUpdate = () => {};
  editor.dispatchEvent = (event) => events.push(event.detail.config);
  editor.hass = hass;
  return { editor, events };
}

test("editor migrates legacy values when it loads a config", () => {
  const { editor } = createLiveEditor();

  editor.setConfig({
    weather_entity: "weather.home",
    sun_entity: "sun.sun",
    card_color_mode: "force_dark",
  });

  assert.equal(editor._config.card_color_mode, "dark");
  assert.equal(editor._colorModeState, "force_dark");
});

test("editor fills in missing entities and reports the change", async () => {
  const { editor, events } = createLiveEditor({
    states: { "weather.home": {}, "sun.sun": {} },
  });

  editor.setConfig({});
  await Promise.resolve();

  assert.equal(events.length, 1);
  assert.equal(events[0].weather_entity, "weather.home");
  assert.equal(events[0].sun_entity, "sun.sun");
});

test("editor color mode switches write the expected keys", () => {
  const { editor, events } = createLiveEditor();
  editor._config = { weather_entity: "weather.home" };
  const change = (value) =>
    editor._valueChanged({
      stopPropagation() {},
      detail: { value: { ...editor._config, ...value } },
    });

  change({ _color_mode: "force_light", theme_entity: "sun.sun" });
  assert.equal(events.at(-1).card_color_mode, "light");
  assert.ok(!("theme_entity" in events.at(-1)));

  change({ _color_mode: "ha_theme" });
  assert.ok(!("card_color_mode" in events.at(-1)));
  assert.ok(!("_color_mode" in events.at(-1)));
});

test("editor reports an invalid card height", () => {
  const { editor } = createLiveEditor();
  editor._config = {};
  const change = (card_height) =>
    editor._valueChanged({
      stopPropagation() {},
      detail: { value: { card_height } },
    });

  change("12 parsecs");
  assert.notEqual(editor._cardHeightError, "");

  change("160px");
  assert.equal(editor._cardHeightError, "");
});

test("editor removes keys of inactive layouts", () => {
  const editor = createEditor();
  const keys = {
    chip_area_columns: 2,
    chip_area_scroll_count: 3,
    chip_area_height: "80px",
  };

  const wrap = editor._cleanConfig({ ...keys, chip_area_layout: "wrap" });
  assert.ok(!("chip_area_columns" in wrap));
  assert.ok(!("chip_area_scroll_count" in wrap));

  const grid = editor._cleanConfig({ ...keys, chip_area_layout: "grid" });
  assert.equal(grid.chip_area_columns, 2);

  const scroll = editor._cleanConfig({
    ...keys,
    chip_area_layout: "horizontal-scroll",
  });
  assert.equal(scroll.chip_area_scroll_count, 3);
  assert.equal(scroll.chip_area_height, "80px");
});

test("editor converts text input to numbers and booleans", () => {
  const output = createEditor()._cleanConfig({
    image_scale: "80",
    card_square: "true",
    card_height: "160",
    chips: [{ entity: "sensor.a", ring_min: "5", hide_icon: "true" }],
  });

  assert.equal(output.image_scale, 80);
  assert.equal(output.card_square, true);
  assert.equal(output.card_height, 160);
  assert.equal(output.chips[0].ring_min, 5);
  assert.equal(output.chips[0].hide_icon, true);
});

test("editor drops empty values and keeps custom_cards last", () => {
  const output = createEditor()._cleanConfig({
    custom_cards: [{ type: "markdown" }],
    image_day: "",
    chips: [],
    weather_entity: "weather.home",
    some_unknown_key: 1,
  });

  assert.ok(!("image_day" in output));
  assert.ok(!("chips" in output));
  assert.equal(output.some_unknown_key, 1);
  assert.equal(Object.keys(output).at(-1), "custom_cards");
});
