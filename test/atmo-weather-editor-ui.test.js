import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { errors, makeHass, runFrames } from "./helpers/dom.js";

await import("../src/atmo-weather-card.js");
await import("../src/atmo-weather-card-editor.js");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), []);
});

const FORECAST = { entity: "weather.home", forecast: "daily", attribute: "temperature" };
const CHIPS = {
  sensor: { entity: "sensor.temperature", name: "Room", icon: "mdi:home" },
  attribute: { entity: "weather.home", attribute: "humidity", sub_value_entity: "sensor.temperature" },
  forecast: { ...FORECAST, forecast_offset: 1, sub_value_attribute: "templow", sub_value_position: "beside" },
  hourly: { ...FORECAST, forecast: "hourly", icon: "weather", icon_path: "/local/icons/" },
  ring: { entity: "sensor.temperature", type: "ring", ring_min: 0, ring_max: 40, ring_thresholds: [{ value: 10, color: "red" }] },
  bar: { entity: "sensor.temperature", type: "bar", bar_color: "#ff0000", bar_threshold_mode: "gradient", bar_thresholds: [{ value: 10, color: "red" }] },
  custom: { entity: "sensor.time", position: "custom", position_anchor: "top-left", position_x: "pad", position_y: "16px", background: true, behind_effects: true, fancy_unit: true },
  styled: { entity: "binary_sensor.door", style: "stacked", align: "center", label_overflow: "marquee", overflow: "wrap", tap_action: { action: "toggle" }, background_color: "rgba(10,20,30,0.5)" },
};

async function mountEditor(config, hass = makeHass()) {
  const editor = document.createElement("atmo-weather-card-editor");
  const emitted = [];
  editor.addEventListener("config-changed", (event) => {
    emitted.push(event.detail.config);
    editor.setConfig(event.detail.config);
  });
  editor.hass = hass;
  editor.setConfig(config);
  document.body.append(editor);
  await editor.updateComplete;
  return { editor, emitted };
}

const settle = async (editor) => {
  await editor.updateComplete;
  await Promise.resolve();
};

function validate(config) {
  const card = document.createElement("atmo-weather-card");
  card.setConfig(config);
  document.body.append(card);
  card.hass = makeHass();
  runFrames(1);
  card.remove();
}

async function poke(editor, selector, act) {
  const root = editor.shadowRoot;
  const count = root.querySelectorAll(selector).length;
  for (let i = 0; i < count; i++) {
    const el = root.querySelectorAll(selector)[i];
    if (!el) break;
    act(el);
    await settle(editor);
  }
  return count;
}

async function pokeEverything(editor) {
  let total = 0;
  total += await poke(editor, "ha-expansion-panel", (el) =>
    el.dispatchEvent(new CustomEvent("expanded-changed", { detail: { expanded: true }, bubbles: true })),
  );
  total += await poke(editor, "details", (el) => {
    el.open = true;
    el.dispatchEvent(new Event("toggle"));
  });
  total += await poke(editor, "ha-form", (el) =>
    el.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...el.data } }, bubbles: true })),
  );
  total += await poke(editor, "ha-switch", (el) => {
    el.checked = !el.checked;
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
  total += await poke(editor, "input, textarea, select", (el) => {
    if (el.type === "color") el.value = "#112233";
    else if (el.type === "range") el.value = el.max || "1";
    else el.value = el.value || "12";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
  total += await poke(editor, "button, [role=button], .segment, .grid-cell", (el) => el.click());
  return total;
}

test("the editor renders nothing without hass", async () => {
  const editor = document.createElement("atmo-weather-card-editor");
  editor.setConfig({});
  document.body.append(editor);
  await editor.updateComplete;

  assert.equal(editor.shadowRoot.querySelector("ha-form"), null);
});

for (const openPanel of ["sun_moon", "color_mode", "card_style", "chips", "image", "cards", "performance"]) {
  test(`every control in panel ${openPanel} leaves a valid config`, async () => {
    const { editor, emitted } = await mountEditor({
      weather_entity: "weather.home",
      image_day: "/local/day.png",
      image_x: "4",
      status_entity: "binary_sensor.door",
      chip_area_background: true,
      card_stack_order: 1,
      custom_cards: [{ type: "markdown", content: "x" }, { type: "entities", entities: [] }],
      chips: Object.values(CHIPS),
    });
    editor._openPanel = openPanel;
    await settle(editor);

    const touched = await pokeEverything(editor);

    assert.ok(touched > 0);
    for (const config of emitted) validate(config);
  });
}

for (const [name, chip] of Object.entries(CHIPS)) {
  test(`every control of a ${name} chip leaves a valid config`, async () => {
    const { editor, emitted } = await mountEditor({ weather_entity: "weather.home", chips: [chip, CHIPS.sensor] });
    editor._openPanel = "chips";
    editor._expandedChip = 0;
    await settle(editor);

    for (const key of ["display", "value", "icon", "name", "style", "text", "action", "gauge", "sub"]) {
      editor._acc_open_0 = key;
      editor._text_acc_0 = key;
      editor.requestUpdate();
      await settle(editor);
      await poke(editor, "[data-acc-key]", (el) => el.click());
    }
    await pokeEverything(editor);

    assert.equal(typeof editor._config, "object");
    for (const config of emitted) validate(config);
  });
}

test("emitted configs are stable when loaded again", async () => {
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home", chips: Object.values(CHIPS) });
  editor._openPanel = "chips";
  await settle(editor);
  await pokeEverything(editor);

  assert.ok(emitted.length > 0);
  for (const config of emitted) assert.deepEqual(editor._cleanConfig(config), config);
});

test("chips can be moved, duplicated and removed", async () => {
  const { editor, emitted } = await mountEditor({
    weather_entity: "weather.home",
    chips: [{ entity: "sensor.temperature" }, { entity: "sensor.time" }, { entity: "sensor.moon" }],
  });
  const entities = () => emitted.at(-1).chips.map((chip) => chip.entity);

  editor._moveChip(0, 1);
  assert.deepEqual(entities(), ["sensor.time", "sensor.temperature", "sensor.moon"]);

  const before = emitted.length;
  editor._moveChip(0, -1);
  assert.equal(emitted.length, before);

  editor._duplicateChip(1);
  assert.deepEqual(entities(), ["sensor.time", "sensor.temperature", "sensor.temperature", "sensor.moon"]);
  assert.equal(editor._expandedChip, 2);

  editor._removeChip(2);
  assert.deepEqual(entities(), ["sensor.time", "sensor.temperature", "sensor.moon"]);
  assert.equal(editor._expandedChip, null);
});

test("the card style switch writes immersive and removes the default", async () => {
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home" });

  editor._setCardStyle("immersive");
  assert.equal(emitted.at(-1).card_style, "immersive");

  editor._setCardStyle("standalone");
  assert.ok(!("card_style" in emitted.at(-1)));
});

test("a hass update re-renders once and stops when removed", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home" });

  editor.hass = makeHass({ weather: "rainy" });
  assert.equal(editor._hassThrottle, true);

  editor.remove();
  assert.equal(editor._hassThrottleTimer ?? null, null);
});

test("the wind display style can be picked in the editor", async () => {
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home", sun_entity: "sun.sun" });
  const button = (value) => editor.shadowRoot.querySelector(`button[data-field="wind_style"][data-value="${value}"]`);

  assert.ok(button("lines").classList.contains("active"));
  button("flow").click();
  await settle(editor);

  assert.equal(emitted.at(-1).wind_style, "flow");
  assert.ok(button("flow").classList.contains("active"));
  button("lines").click();
  await settle(editor);
  // The default is not saved.
  assert.ok(!("wind_style" in emitted.at(-1)));
});
