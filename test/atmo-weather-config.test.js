import { test } from "node:test";
import assert from "node:assert";

import { migrateConfig } from "../src/atmo-weather-config.js";

test("chip card_tap_action migrates to tap_action", () => {
  const action = { action: "more-info" };
  const output = migrateConfig({ chips: [{ card_tap_action: action }] });

  assert.strictEqual(output.chips[0].tap_action, action);
  assert.ok(!("card_tap_action" in output.chips[0]));
});

test("chip tap_action wins over the legacy key", () => {
  const output = migrateConfig({
    chips: [{ card_tap_action: "old", tap_action: "new" }],
  });

  assert.strictEqual(output.chips[0].tap_action, "new");
});

test("keys from before v7 are no longer migrated", () => {
  const output = migrateConfig({
    offset: 5,
    sun_moon_x_position: -60,
    top_text_sensor: "sensor.outdoor",
  });

  assert.deepStrictEqual(output, {
    offset: 5,
    sun_moon_x_position: -60,
    top_text_sensor: "sensor.outdoor",
  });
});

test("legacy card_filter migrates to independent cloud and sun filters", () => {
  const output = migrateConfig({
    card_filter: "vivid",
    card_filter_clouds: "muted",
    celestial_moon_style: "yellow",
  });

  assert.strictEqual(output.card_filter_clouds, "muted");
  assert.strictEqual(output.card_filter_sun, "vivid");
  assert.ok(!("card_filter" in output));
  assert.ok(!("celestial_moon_style" in output));
});

test("forecast_show_min migrates to sub value options", () => {
  const chip = { forecast: "daily", attribute: "temperature", forecast_show_min: true };

  const beside = migrateConfig({ chips: [chip] }).chips[0];
  assert.strictEqual(beside.sub_value_attribute, "templow");
  assert.strictEqual(beside.sub_value_position, "beside");
  assert.ok(!("forecast_show_min" in beside));

  const below = migrateConfig({
    chips: [{ ...chip, forecast_low_position: "below" }],
  }).chips[0];
  assert.strictEqual(below.sub_value_attribute, "templow");
  assert.ok(!("sub_value_position" in below));
  assert.ok(!("forecast_low_position" in below));
});

test("bugfix: chip overflow marquee migrates to label_overflow marquee", () => {
  const output = migrateConfig({ chips: [{ overflow: "marquee" }] });

  assert.strictEqual(output.chips[0].label_overflow, "marquee");
});

test("bugfix guard: existing chip label_overflow is not overwritten", () => {
  const output = migrateConfig({
    chips: [{ overflow: "marquee", label_overflow: "ellipsis" }],
  });

  assert.strictEqual(output.chips[0].label_overflow, "ellipsis");
});

test("chip_area_layout scroll migrates to horizontal-scroll", () => {
  const output = migrateConfig({ chip_area_layout: "scroll" });

  assert.strictEqual(output.chip_area_layout, "horizontal-scroll");
});

test("idempotence: second migration run does not change migrated output", () => {
  const once = migrateConfig({
    card_color_mode: "force_dark",
    card_filter: "vivid",
    chip_area_layout: "scroll",
    chips: [
      {
        forecast: "daily",
        attribute: "temperature",
        forecast_show_min: true,
        card_tap_action: { action: "more-info" },
        overflow: "marquee",
      },
    ],
  });

  assert.deepStrictEqual(migrateConfig(once), once);
});

test("minimal inputs produce valid objects and do not throw", () => {
  assert.doesNotThrow(() => migrateConfig({}));
  assert.doesNotThrow(() => migrateConfig({ chips: [] }));

  const outEmpty = migrateConfig({});
  const outChips = migrateConfig({ chips: [] });

  assert.ok(outEmpty && typeof outEmpty === "object");
  assert.ok(outChips && typeof outChips === "object");
  assert.ok(Array.isArray(outChips.chips));
});

test("celestial offsets without alignment are valid config and stay untouched", () => {
  const output = migrateConfig({ celestial_x: 60, celestial_y: 20 });

  assert.equal(output.celestial_x, 60);
  assert.equal(output.celestial_y, 20);
  assert.equal(output.celestial_alignment, undefined);
});

test("legacy card_color_mode values map to current ones", () => {
  assert.equal(migrateConfig({ card_color_mode: "force_dark" }).card_color_mode, "dark");
  assert.equal(migrateConfig({ card_color_mode: "force_light" }).card_color_mode, "light");
  assert.ok(!("card_color_mode" in migrateConfig({ card_color_mode: "entity" })));
  assert.equal(migrateConfig({ card_color_mode: "night" }).card_color_mode, "night");
  assert.ok(!("card_color_mode" in migrateConfig({})));
});

test("wrong types on string options fall back to the default", () => {
  const output = migrateConfig({
    card_color_mode: true,
    image_alignment: 5,
    chip_area_position: {},
    chip_style: [],
    custom_cards_css_class: 1,
    wind_style: false,
  });

  assert.deepEqual(output, {});
  assert.equal(migrateConfig({ chip_style: "stacked" }).chip_style, "stacked");
});
