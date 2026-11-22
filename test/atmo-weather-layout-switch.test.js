import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { errors, makeHass } from "./helpers/dom.js";
import { applyCardLayout, arrangeChipsForLayout, layoutDefaults, LAYOUT_LOOK_KEYS } from "../src/atmo-weather-config.js";

await import("../src/atmo-weather-card.js");
await import("../src/atmo-weather-card-editor.js");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), []);
});

// A real card from a user: a big clock chip, image_scale 0 from before there
// was a house, own sizes and sun place. Picking Home showed no house.
const CLOCK = {
  position: "custom",
  position_anchor: "center",
  position_x: "0",
  position_y: "0",
  text_size: "50px",
  padding: "0px 4px",
  hide_icon: true,
  fancy_unit: true,
  entity: "sensor.time",
  background: false,
  hide_label: true,
  value_weight: "600",
  label_overflow: "marquee",
};
const USER_CARD = {
  type: "custom:atmo-weather-card",
  weather_entity: "weather.home",
  sun_entity: "sun.sun",
  card_height: 200,
  celestial_size: 65,
  celestial_position: "dynamic_both",
  celestial_alignment: "right",
  celestial_x: 45,
  celestial_y: "center",
  image_scale: 0,
  image_alignment: "center",
  chip_area_position: "bottom-center",
  chip_text_size: "12px",
  chip_area_align: "spread",
  chip_padding: "6px 10px",
  perf_mode: "ultra",
  fauna_bird_density: 1.3,
  chips: [CLOCK],
};

async function mountEditor(config) {
  const editor = document.createElement("atmo-weather-card-editor");
  const emitted = [];
  editor.addEventListener("config-changed", (event) => {
    emitted.push(event.detail.config);
    editor.setConfig(event.detail.config);
  });
  editor.hass = makeHass();
  editor.setConfig(config);
  editor._openPanel = "layouts";
  document.body.append(editor);
  await editor.updateComplete;
  return { editor, emitted };
}
const settle = async (editor) => {
  await editor.updateComplete;
  await Promise.resolve();
  await editor.updateComplete;
};
const $ = (editor, sel) => editor.shadowRoot.querySelector(sel);
const tile = (editor, value) => $(editor, `button[data-field="card_layout"][data-value="${value}"]`);
const buttonIn = (editor, sel, label) =>
  [...editor.shadowRoot.querySelectorAll(`${sel} button`)].find((b) => b.textContent.trim() === label);

// The card as the editor holds it before any click, to compare Undo against.
const startOf = (editor) => JSON.parse(JSON.stringify(editor._config));
const click = async (editor, sel, label) => {
  const b = buttonIn(editor, sel, label);
  assert.ok(b, `${sel} has a ${label} button`);
  b.click();
  await settle(editor);
};
const pick = async (editor, value) => {
  tile(editor, value).click();
  await settle(editor);
};
// After Undo nothing of the layout step is left: no note, no question.
const assertBackToStart = (editor, emitted, start) => {
  assert.deepEqual(emitted.at(-1), start);
  assert.deepEqual(editor._config, start);
  assert.ok(!$(editor, ".layout-reset"), "no note");
  assert.ok(!$(editor, ".layout-ask"), "no question");
};

test("picking a layout drops own values for the settings it brings", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  await pick(editor, "home");
  const cfg = emitted.at(-1);
  assert.equal(cfg.card_layout, "home");
  // Home's own values, and the chip row it stands for: an old spread squeezed
  // the frosted bar until its values were cut off.
  for (const k of ["image_scale", "image_alignment", "card_height", "celestial_size", "celestial_position", "celestial_alignment", "celestial_x", "celestial_y", "chip_area_position", "chip_text_size", "chip_padding", "chip_area_align"])
    assert.ok(!(k in cfg), `${k} is reset`);
  // Everything else stays yours.
  assert.equal(cfg.perf_mode, "ultra");
  assert.equal(cfg.fauna_bird_density, 1.3);
  assert.deepEqual(cfg.chips, [CLOCK]);
  // The card now shows the house at the Home size.
  const shown = applyCardLayout(cfg);
  assert.match(shown.image_day, /house-day\.webp$/);
  assert.equal(shown.image_scale, 55);
  assert.match($(editor, ".layout-reset").textContent, /12/);
});

test("Undo right after the pick puts back the whole card and asks nothing more", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  const start = startOf(editor);
  await pick(editor, "home");
  assert.equal($(editor, ".layout-ask").dataset.step, "keep");
  await click(editor, ".layout-reset", "Undo");
  assertBackToStart(editor, emitted, start);
  assert.ok(!("card_layout" in emitted.at(-1)), "the layout goes too");
});

test("Undo after keeping and arranging the chips puts back the whole card", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  const start = startOf(editor);
  await pick(editor, "home");
  await click(editor, ".layout-ask", "Keep");
  await click(editor, ".layout-ask", "Arrange");
  assert.equal(emitted.at(-1).layout_chips, true);
  await click(editor, ".layout-reset", "Undo");
  assertBackToStart(editor, emitted, start);
});

test("Undo after using the layout's chips brings your chips and values back", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  const start = startOf(editor);
  await pick(editor, "panel");
  await click(editor, ".layout-ask", "Use the layout's chips");
  assert.ok(!("chips" in emitted.at(-1)));
  assert.deepEqual(applyCardLayout(emitted.at(-1)).chips, layoutDefaults("panel", "weather.home").chips);
  assert.match($(editor, ".layout-reset").textContent, /chips of the layout/);
  await click(editor, ".layout-reset", "Undo");
  assertBackToStart(editor, emitted, start);
});

test("Undo after keeping the positions puts back the whole card", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  const start = startOf(editor);
  await pick(editor, "standard");
  await click(editor, ".layout-ask", "Keep");
  const before = emitted.length;
  await click(editor, ".layout-ask", "Keep positions");
  assert.equal(emitted.length, before, "keeping the positions changes nothing");
  assert.deepEqual(emitted.at(-1).chips, [CLOCK]);
  assert.ok(!$(editor, ".layout-ask"));
  await click(editor, ".layout-reset", "Undo");
  assertBackToStart(editor, emitted, start);
});

test("two tiles in a row: Undo goes back to the card before the first", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  const start = startOf(editor);
  await pick(editor, "home");
  await click(editor, ".layout-ask", "Use the layout's chips");
  await pick(editor, "panel");
  // The second pick starts from your own chips again and asks again.
  assert.deepEqual(emitted.at(-1).chips, [CLOCK]);
  assert.equal(emitted.at(-1).card_layout, "panel");
  assert.equal($(editor, ".layout-ask").dataset.step, "keep");
  assert.match($(editor, ".layout-reset").textContent, /12/);
  await click(editor, ".layout-reset", "Undo");
  assertBackToStart(editor, emitted, start);
});

test("Change after a chip choice gives your chips back and asks again; Undo still goes to the start", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  const start = startOf(editor);
  await pick(editor, "home");
  await click(editor, ".layout-ask", "Keep");
  await click(editor, ".layout-ask", "Arrange");
  await click(editor, ".layout-reset", "Change");
  assert.deepEqual(emitted.at(-1).chips, [CLOCK]);
  assert.ok(!("layout_chips" in emitted.at(-1)));
  assert.equal(emitted.at(-1).card_layout, "home");
  assert.equal($(editor, ".layout-ask").dataset.step, "keep");
  await click(editor, ".layout-ask", "Use the layout's chips");
  await click(editor, ".layout-reset", "Undo");
  assertBackToStart(editor, emitted, start);
});

test("another change ends the layout step, so Undo can never take it back", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  await pick(editor, "home");
  assert.ok($(editor, ".layout-reset"));
  editor._updateField("fauna_bird_density", 2);
  await settle(editor);
  assert.equal(emitted.at(-1).fauna_bird_density, 2);
  assert.ok(!$(editor, ".layout-reset"), "the note is gone");
  assert.ok(!$(editor, ".layout-ask"), "the question is gone");
  // Own chips are still there: the panel offers the choice again.
  assert.ok($(editor, ".layout-chips"));
});

test("a change from outside the editor (YAML) ends the layout step", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  await pick(editor, "home");
  editor.setConfig({ ...emitted.at(-1), card_height: 250 });
  await settle(editor);
  assert.ok(!$(editor, ".layout-reset"));
  assert.ok(!$(editor, ".layout-ask"));
});

test("Change outside a layout step asks again, and Undo puts back the card from then", async () => {
  const { editor, emitted } = await mountEditor({ ...USER_CARD, card_layout: "standard" });
  const start = startOf(editor);
  await click(editor, ".layout-chips", "Change");
  assert.equal($(editor, ".layout-ask").dataset.step, "keep");
  await click(editor, ".layout-ask", "Keep");
  await click(editor, ".layout-ask", "Arrange");
  assert.equal(emitted.at(-1).layout_chips, true);
  await click(editor, ".layout-reset", "Undo");
  assertBackToStart(editor, emitted, start);
});

test("Free and the layout the card already has reset nothing", async () => {
  const { editor, emitted } = await mountEditor({ ...USER_CARD, card_layout: "home" });
  await pick(editor, "home");
  assert.equal(emitted.length, 0);
  await pick(editor, "");
  const cfg = emitted.at(-1);
  assert.ok(!("card_layout" in cfg));
  assert.equal(cfg.image_scale, 0);
  assert.equal(cfg.card_height, 200);
  assert.ok(!$(editor, ".layout-reset"));
  assert.ok(!$(editor, ".layout-ask"));
});

test("a card without own chips is not asked about chips", async () => {
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home", card_height: 150 });
  const start = startOf(editor);
  await pick(editor, "compact");
  assert.ok(!$(editor, ".layout-ask"));
  assert.ok(!$(editor, ".layout-chips"));
  assert.ok($(editor, ".layout-reset"));
  await click(editor, ".layout-reset", "Undo");
  assertBackToStart(editor, emitted, start);
});

// The full card from the report of 2026-11-22: Home, Undo, Keep, Arrange gave
// Home with the old values. Every way through the questions must end either
// in the layout's look or, with Undo, in exactly the old card.
const REPORTED_CARD = {
  type: "custom:atmo-weather-card",
  weather_entity: "weather.home",
  sun_entity: "sun.sun",
  theme_entity: "sun.sun",
  card_height: 140,
  card_padding: "16px",
  celestial_size: 65,
  celestial_position: "dynamic_both",
  celestial_alignment: "right",
  celestial_x: 45,
  celestial_y: "center",
  image_scale: 0,
  image_alignment: "center",
  chip_area_position: "center",
  chip_text_size: "12px",
  chip_area_align: "spread",
  chip_padding: "6px 10px",
  chip_gap: "8px",
  chip_area_background: true,
  card_background_style: "theme",
  card_tap_action: { action: "navigate", navigation_path: "#wetter-details" },
  card_stack_order: 0,
  chip_icon_background: false,
  perf_mode: "ultra",
  perf_fps: 60,
  wind_style: "leaves",
  chips: [{ ...CLOCK, tap_action: { action: "navigate", navigation_path: "#wetter-details" } }],
  grid_options: { rows: "auto" },
};
const PATHS = [
  [],
  ["Keep", "Arrange"],
  ["Keep", "Keep positions"],
  ["Use the layout's chips"],
];
for (const layout of ["standard", "compact", "wide", "home", "panel"])
  for (const path of PATHS)
    test(`reported card: ${layout}, ${path.join(" > ") || "no answer"}, then Undo`, async () => {
      const { editor, emitted } = await mountEditor(REPORTED_CARD);
      const start = startOf(editor);
      await pick(editor, layout);
      for (const label of path) await click(editor, ".layout-ask", label);
      const cfg = emitted.at(-1);
      // The layout's look, not the old values.
      for (const k of LAYOUT_LOOK_KEYS) assert.ok(!(k in cfg), `${k} is reset`);
      assert.equal(cfg.card_layout, layout);
      await click(editor, ".layout-reset", "Undo");
      assertBackToStart(editor, emitted, start);
    });

test("arranging leaves out chips the layout already shows and drops place and look", () => {
  const layout = layoutDefaults("standard", "weather.home").chips;
  const own = [
    { entity: "weather.home", attribute: "humidity", text_size: "20px" },
    { entity: "weather.home", attribute: "pressure", position: "custom", position_x: "4px", style: "stacked", name: "Druck" },
    { entity: "weather.home", forecast: "daily", forecast_offset: 1, attribute: "temperature" },
    { entity: "weather.home", forecast: "daily", forecast_offset: 2, attribute: "temperature", area: 2 },
    "not a chip",
  ];
  assert.deepEqual(arrangeChipsForLayout(own, layout), [
    { entity: "weather.home", attribute: "pressure", name: "Druck" },
    { entity: "weather.home", forecast: "daily", forecast_offset: 2, attribute: "temperature" },
  ]);
});

test("layout_chips puts the layout's chips before your own, and only with a layout", () => {
  const own = [{ entity: "sensor.time" }];
  const base = layoutDefaults("standard", "weather.home").chips;
  assert.deepEqual(applyCardLayout({ weather_entity: "weather.home", card_layout: "standard", chips: own, layout_chips: true }).chips, [...base, ...own]);
  assert.deepEqual(applyCardLayout({ weather_entity: "weather.home", card_layout: "standard", chips: own }).chips, own);
  assert.deepEqual(applyCardLayout({ weather_entity: "weather.home", card_layout: "standard", layout_chips: true }).chips, base);
  assert.deepEqual(applyCardLayout({ weather_entity: "weather.home", chips: own, layout_chips: true }).chips, own);
});
