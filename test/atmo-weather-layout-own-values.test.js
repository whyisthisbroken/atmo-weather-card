import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { errors, makeHass, mountCard } from "./helpers/dom.js";
import {
  applyCardLayout,
  CARD_LAYOUTS,
  CONFIG_DEFAULTS,
  HOUSE_PLACEMENT,
  layoutDefaults,
  usesBundledHouse,
  withoutLayoutNudges,
} from "../src/atmo-weather-config.js";
import { cssLengths } from "../src/atmo-weather-helpers.js";

await import("../src/atmo-weather-card.js");
await import("../src/atmo-weather-card-editor.js");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), []);
});

async function mountEditor(config) {
  const editor = document.createElement("atmo-weather-card-editor");
  const emitted = [];
  editor.addEventListener("config-changed", (event) => {
    emitted.push(event.detail.config);
    editor.setConfig(event.detail.config);
  });
  editor.hass = makeHass();
  editor.setConfig(config);
  document.body.append(editor);
  await editor.updateComplete;
  return { editor, emitted };
}

// What a layout brings, as the editor shows it (the house placement too).
const look = (cfg) => {
  const { chips, ...rest } = layoutDefaults(cfg.card_layout, cfg.weather_entity, "sun.sun") || {};
  return withoutLayoutNudges(usesBundledHouse(cfg) ? { ...rest, ...HOUSE_PLACEMENT } : rest, cfg);
};

// Report of 2026-11-22: in Home, wind_compass: off was not taken. The editor
// dropped every value equal to the default, and then the layout's value came
// back. Every setting a layout brings must take the default as your choice.
for (const layout of CARD_LAYOUTS) {
  const card = { type: "custom:atmo-weather-card", weather_entity: "weather.home", card_layout: layout };
  const keys = Object.entries(look(card)).filter(
    ([k, v]) => Object.prototype.hasOwnProperty.call(CONFIG_DEFAULTS, k) && CONFIG_DEFAULTS[k] !== v,
  );
  test(`${layout}: the default of every setting the layout changes can be picked (${keys.length})`, async () => {
    for (const [key] of keys) {
      const { editor, emitted } = await mountEditor(card);
      editor._updateField(key, CONFIG_DEFAULTS[key]);
      await editor.updateComplete;
      const saved = emitted.at(-1);
      assert.ok(saved, `${key}: a change is sent`);
      assert.deepEqual(saved[key], CONFIG_DEFAULTS[key], `${key} stays in the config`);
      assert.deepEqual(applyCardLayout(saved)[key], CONFIG_DEFAULTS[key], `${key}: the card uses it`);
      assert.ok(!editor._fromLayout(key), `${key} no longer shows as the layout's value`);
      document.body.replaceChildren();
    }
  });
}

test("Home: compass off, a top-right image spot and no bar background are taken", async () => {
  const card = { type: "custom:atmo-weather-card", weather_entity: "weather.home", card_layout: "home" };
  const { editor, emitted } = await mountEditor(card);
  editor._updateField("wind_compass", "off");
  editor._updateField("image_alignment", "top-right");
  editor._updateField("chip_area_background", false);
  await editor.updateComplete;
  const shown = applyCardLayout(emitted.at(-1));
  assert.equal(shown.wind_compass, "off");
  assert.equal(shown.image_alignment, "top-right");
  assert.equal(shown.chip_area_background, false);
  // A spot of its own: the layout's nudges go.
  assert.equal(shown.image_y, undefined);
  // The card draws no compass.
  const mounted = mountCard(emitted.at(-1));
  assert.equal(mounted.shadowRoot.querySelector("#wind-compass").hidden, true);
});

test("a default without a layout still goes from the config", async () => {
  const { emitted, editor } = await mountEditor({ type: "custom:atmo-weather-card", weather_entity: "weather.home" });
  editor._updateField("wind_compass", "off");
  editor._updateField("card_height", 150);
  await editor.updateComplete;
  assert.ok(!("wind_compass" in emitted.at(-1)));
});

test("settings without effect are judged with the layout's values", async () => {
  // Panel brings a grid chip row, so its column count is in use.
  const { editor, emitted } = await mountEditor({ type: "custom:atmo-weather-card", weather_entity: "weather.home", card_layout: "panel" });
  assert.equal(look({ weather_entity: "weather.home", card_layout: "panel" }).chip_area_layout, "grid");
  editor._updateField("chip_area_columns", 3);
  await editor.updateComplete;
  assert.equal(emitted.at(-1).chip_area_columns, 3);
});

// Found by the editor sweep on 2026-11-22: in Home the separator switch did
// nothing, because chip_area_grouped comes from the layout and the editor
// judged the separator as unused without it.
test("Home: the chip row separator switch is taken", async () => {
  const { editor, emitted } = await mountEditor({ type: "custom:atmo-weather-card", weather_entity: "weather.home", card_layout: "home" });
  editor._updateField("chip_area_separator", true);
  await editor.updateComplete;
  assert.equal(emitted.at(-1).chip_area_separator, true);
  assert.equal(applyCardLayout(emitted.at(-1)).chip_area_separator, true);
});

// Found by the chip sweep on 2026-11-22: the Hide switch of the second value
// flipped back on a chip without a second value.
test("the Hide switch of the second value shows only with a second value, and works there", async () => {
  const open = async (chip) => {
    const { editor, emitted } = await mountEditor({ type: "custom:atmo-weather-card", weather_entity: "weather.home", chips: [chip] });
    editor._openPanel = "chips";
    editor._expandedChip = 0;
    editor._acc_open_0 = "text";
    editor._text_acc_0 = "text_sub";
    editor.requestUpdate();
    await editor.updateComplete;
    return { editor, emitted, sw: editor.shadowRoot.querySelector('ha-switch[data-key="hide_sub_value"]') };
  };
  const without = await open({ entity: "weather.home", attribute: "temperature" });
  assert.equal(without.sw, null);
  document.body.replaceChildren();
  const withSub = await open({ entity: "weather.home", attribute: "temperature", sub_value_attribute: "humidity" });
  assert.ok(withSub.sw, "the switch is there");
  withSub.sw.checked = true;
  withSub.sw.dispatchEvent(new Event("change", { bubbles: true }));
  await withSub.editor.updateComplete;
  assert.equal(withSub.emitted.at(-1).chips[0].hide_sub_value, true);
});

// Found by the layout check on 2026-11-22: in Compact "12.4 °C" ran into the
// condition at 114 px. Short degree sign, condition and values further right
// (measured in Chromium: no overlap with "-25.8°" or "103.5°" from 300 px up).
test("Compact leaves room for a temperature with a decimal and a minus", () => {
  const c = layoutDefaults("compact", "weather.home");
  const [temp, condition] = c.chips;
  assert.equal(temp.attribute, "temperature");
  assert.equal(temp.unit_format, "°");
  assert.equal(temp.fancy_unit, false);
  assert.equal(temp.text_size, "40px");
  assert.equal(condition.position_x, "136px");
  assert.match(c.chip_area_padding, /134px$/);
});

test("cssLengths makes bare numbers pixels", () => {
  assert.equal(cssLengths("0"), "0px");
  assert.equal(cssLengths(0), "0px");
  assert.equal(cssLengths("8 16"), "8px 16px");
  assert.equal(cssLengths(" 12px  1em "), "12px 1em");
  assert.equal(cssLengths("var(--x)"), "var(--x)");
  assert.equal(cssLengths(""), "");
  assert.equal(cssLengths(undefined), "");
});

// Report of 2026-11-22: card_padding "0" put the house in the top-left
// corner. calc(0 - 16px) is invalid CSS (0 has no unit), so the browser
// dropped the image's right and bottom and it fell back to its static place.
test("card_padding 0 keeps the image at its spot", () => {
  for (const padding of ["0", 0, "0 0"]) {
    const card = mountCard({ card_layout: "home", card_height: 200, card_padding: padding });
    const root = card.shadowRoot.querySelector("#card-root");
    assert.equal(root.style.getPropertyValue("--_awc-pad-h"), "0px", String(padding));
    assert.equal(root.style.getPropertyValue("--_awc-pad-v"), "0px", String(padding));
    assert.equal(root.style.getPropertyValue("--awc-card-padding"), padding === "0 0" ? "0px 0px" : "0px");
    document.body.replaceChildren();
  }
  const two = mountCard({ card_padding: "8 20" });
  const r = two.shadowRoot.querySelector("#card-root");
  assert.equal(r.style.getPropertyValue("--_awc-pad-v"), "8px");
  assert.equal(r.style.getPropertyValue("--_awc-pad-h"), "20px");
});
