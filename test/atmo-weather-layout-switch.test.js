import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { errors, makeHass } from "./helpers/dom.js";
import { applyCardLayout, arrangeChipsForLayout, layoutDefaults } from "../src/atmo-weather-config.js";

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

test("picking a layout drops own values for the settings it brings, and Undo brings them back", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  tile(editor, "home").click();
  await settle(editor);
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

  const notice = $(editor, ".layout-reset");
  assert.ok(notice, "a notice says what happened");
  assert.match(notice.textContent, /12/);
  buttonIn(editor, ".layout-reset", "Undo").click();
  await settle(editor);
  const back = emitted.at(-1);
  assert.equal(back.card_layout, "home");
  assert.equal(back.image_scale, 0);
  assert.equal(back.card_height, 200);
  assert.ok(!$(editor, ".layout-reset"));
});

test("Free and the layout the card already has reset nothing", async () => {
  const { editor, emitted } = await mountEditor({ ...USER_CARD, card_layout: "home" });
  tile(editor, "home").click();
  await settle(editor);
  assert.equal(emitted.length, 0);
  tile(editor, "").click();
  await settle(editor);
  const cfg = emitted.at(-1);
  assert.ok(!("card_layout" in cfg));
  assert.equal(cfg.image_scale, 0);
  assert.equal(cfg.card_height, 200);
  assert.ok(!$(editor, ".layout-reset"));
  assert.ok(!$(editor, ".layout-ask"));
});

test("with own chips the editor asks: keep them, then arrange them", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  tile(editor, "home").click();
  await settle(editor);
  assert.equal($(editor, ".layout-ask").dataset.step, "keep");
  buttonIn(editor, ".layout-ask", "Keep").click();
  await settle(editor);
  assert.equal($(editor, ".layout-ask").dataset.step, "arrange");
  const before = emitted.length;
  buttonIn(editor, ".layout-ask", "Arrange").click();
  await settle(editor);
  assert.equal(emitted.length, before + 1);
  const cfg = emitted.at(-1);
  assert.equal(cfg.layout_chips, true);
  assert.deepEqual(cfg.chips, [
    { hide_icon: true, fancy_unit: true, entity: "sensor.time", hide_label: true, label_overflow: "marquee" },
  ]);
  // The card shows the layout's chips first, the clock joins the bar.
  const shown = applyCardLayout(cfg).chips;
  assert.equal(shown.length, layoutDefaults("home", "weather.home").chips.length + 1);
  assert.equal(shown.at(-1).entity, "sensor.time");
  assert.match($(editor, ".layout-chips-undo").textContent, /arranged/);

  buttonIn(editor, ".layout-chips-undo", "Undo").click();
  await settle(editor);
  assert.deepEqual(emitted.at(-1).chips, [CLOCK]);
  assert.ok(!("layout_chips" in emitted.at(-1)));
});

test("keeping the positions changes nothing about the chips", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  tile(editor, "standard").click();
  await settle(editor);
  buttonIn(editor, ".layout-ask", "Keep").click();
  await settle(editor);
  const before = emitted.length;
  buttonIn(editor, ".layout-ask", "Keep positions").click();
  await settle(editor);
  assert.equal(emitted.length, before);
  assert.deepEqual(emitted.at(-1).chips, [CLOCK]);
  assert.ok(!$(editor, ".layout-ask"));
  // Later the panel still offers the choice.
  assert.ok($(editor, ".layout-chips"));
  buttonIn(editor, ".layout-chips", "Change").click();
  await settle(editor);
  assert.equal($(editor, ".layout-ask").dataset.step, "keep");
});

test("not keeping the chips gives the card the layout's chips, Undo brings yours back", async () => {
  const { editor, emitted } = await mountEditor(USER_CARD);
  tile(editor, "panel").click();
  await settle(editor);
  buttonIn(editor, ".layout-ask", "Use the layout's chips").click();
  await settle(editor);
  assert.ok(!("chips" in emitted.at(-1)));
  assert.deepEqual(applyCardLayout(emitted.at(-1)).chips, layoutDefaults("panel", "weather.home").chips);
  buttonIn(editor, ".layout-chips-undo", "Undo").click();
  await settle(editor);
  assert.deepEqual(emitted.at(-1).chips, [CLOCK]);
});

test("a card without own chips is not asked about chips", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home", card_height: 150 });
  tile(editor, "compact").click();
  await settle(editor);
  assert.ok(!$(editor, ".layout-ask"));
  assert.ok(!$(editor, ".layout-chips"));
  assert.ok($(editor, ".layout-reset"));
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
