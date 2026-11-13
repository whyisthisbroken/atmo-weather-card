import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

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

// scope: an optional CSS selector that limits poking to one part of the editor.
async function poke(editor, selector, act, scope) {
  const all = () => {
    const root = scope ? editor.shadowRoot.querySelector(scope) : editor.shadowRoot;
    return root ? root.querySelectorAll(selector) : [];
  };
  const count = all().length;
  for (let i = 0; i < count; i++) {
    const el = all()[i];
    if (!el) break;
    act(el);
    await settle(editor);
  }
  return count;
}

async function pokeEverything(editor, scope) {
  const p = (selector, act) => poke(editor, selector, act, scope);
  let total = 0;
  total += await p("ha-expansion-panel", (el) =>
    el.dispatchEvent(new CustomEvent("expanded-changed", { detail: { expanded: true }, bubbles: true })),
  );
  total += await p("details", (el) => {
    el.open = true;
    el.dispatchEvent(new Event("toggle"));
  });
  total += await p("ha-form", (el) =>
    el.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...el.data } }, bubbles: true })),
  );
  total += await p("input, textarea, select", (el) => {
    if (el.type === "color") el.value = "#112233";
    else if (el.type === "range") el.value = el.max || "1";
    else el.value = el.value || "12";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
  total += await p("button, [role=button], .segment, .grid-cell", (el) => el.click());
  // Switches last: "Hide" switches would hide the other controls first.
  total += await p("ha-switch", (el) => {
    el.checked = !el.checked;
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
  return total;
}

test("the editor renders nothing without hass", async () => {
  const editor = document.createElement("atmo-weather-card-editor");
  editor.setConfig({});
  document.body.append(editor);
  await editor.updateComplete;

  assert.equal(editor.shadowRoot.querySelector("ha-form"), null);
});

for (const openPanel of ["sun_moon", "appearance", "chips", "image", "cards", "performance"]) {
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

    // Each panel test pokes only its own panel; the others have their own test.
    const touched = await pokeEverything(editor, `ha-expansion-panel[data-panel="${openPanel}"]`);

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

    for (const key of ["data", "text", "icon", "look", "position", "tap"]) {
      editor._acc_open_0 = key;
      editor._text_acc_0 = key === "text" ? "text_label" : null;
      editor.requestUpdate();
      await settle(editor);
      await poke(editor, "[data-acc-kind=text]", (el) => el.click());
      await pokeEverything(editor, ".chip-tab-body");
    }

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

test("the precipitation sensor picker lists only rain rate sensors", async () => {
  const rate = (unit) => ({ state: "0.4", attributes: { unit_of_measurement: unit } });
  const hass = makeHass({
    states: {
      "sensor.radar_now": rate("mm/h"),
      "sensor.us_rain": rate("in/h"),
      "sensor.rain_today": rate("mm"),
      "sensor.rain_5min": rate("mm/5min"),
    },
  });
  const { editor } = await mountEditor({ weather_entity: "weather.home" }, hass);
  const form = [...editor.shadowRoot.querySelectorAll("ha-form")].find((f) =>
    (f.schema || []).some((field) => field.name === "precipitation_entity"),
  );

  assert.ok(form, "field rendered");
  const field = form.schema.find((x) => x.name === "precipitation_entity");
  assert.deepEqual(field.selector, {
    entity: { domain: "sensor", include_entities: ["sensor.radar_now", "sensor.us_rain"] },
  });
  // It sits with your own sensors, below the weather entity.
  assert.ok(form.closest("details.own-sensors"));
  assert.equal(form.computeLabel(field), "Precipitation Sensor");
});

test("your own sensors: each picker lists only fitting sensors", async () => {
  const s = (unit, device_class) => ({ state: "1", attributes: { unit_of_measurement: unit, ...(device_class ? { device_class } : {}) } });
  const hass = makeHass({
    states: {
      "sensor.station_wind": s("km/h", "wind_speed"),
      "sensor.station_gust_mph": s("mph"),
      "sensor.station_dir": s("°", "wind_direction"),
      "sensor.station_temp": s("°C", "temperature"),
      "sensor.station_humidity": s("%", "humidity"),
      "sensor.battery": s("%", "battery"),
      "sensor.clouds": s("%"),
      "sensor.visibility": s("km", "distance"),
      "sensor.power": s("W", "power"),
    },
  });
  const { editor } = await mountEditor({ weather_entity: "weather.home" }, hass);
  const group = editor.shadowRoot.querySelector("details.own-sensors");
  // Closed until a sensor of your own is set.
  assert.equal(group.open, false);
  const form = group.querySelector("ha-form");
  // Only the sensors of this test; the test Home Assistant brings a few more.
  const list = (name) =>
    form.schema.find((x) => x.name === name).selector.entity.include_entities.filter((id) => id in hass.states && /station|battery|clouds|visibility|power/.test(id));
  assert.deepEqual(list("wind_speed_entity"), ["sensor.station_wind", "sensor.station_gust_mph"]);
  assert.deepEqual(list("wind_bearing_entity"), ["sensor.station_dir"]);
  assert.deepEqual(list("temperature_entity"), ["sensor.station_temp"]);
  assert.deepEqual(list("dew_point_entity"), ["sensor.station_temp"]);
  assert.deepEqual(list("humidity_entity"), ["sensor.station_humidity"]);
  assert.deepEqual(list("cloud_coverage_entity"), ["sensor.clouds"]);
  assert.deepEqual(list("visibility_entity"), ["sensor.visibility"]);
  const set = await mountEditor({ weather_entity: "weather.home", wind_speed_entity: "sensor.station_wind" }, hass);
  assert.equal(set.editor.shadowRoot.querySelector("details.own-sensors").open, true);
});

test("a chosen precipitation sensor stays in the list", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home", precipitation_entity: "sensor.temperature" });
  assert.deepEqual(editor._precipitationSensors(), ["sensor.temperature"]);
});

test("effect switches save only when turned off", async () => {
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home" });
  editor._openPanel = "performance";
  await settle(editor);
  const sw = (key) => editor.shadowRoot.querySelector(`ha-switch[data-key="${key}"]`);
  for (const key of [
    "effect_blue_hour",
    "effect_golden_hour",
    "effect_sun_rays",
    "effect_haze",
    "effect_ground_mist",
    "effect_cloud_coverage",
    "effect_shooting_stars",
    "effect_comets",
  ]) {
    assert.equal(sw(key).checked, true, key);
    sw(key).checked = false;
    sw(key).dispatchEvent(new Event("change", { bubbles: true }));
    await settle(editor);
    assert.equal(emitted.at(-1)[key], false, key);
    sw(key).checked = true;
    sw(key).dispatchEvent(new Event("change", { bubbles: true }));
    await settle(editor);
    assert.ok(!(key in emitted.at(-1)), key);
  }
});

test("the frequency sliders follow their switches", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home", effect_comets: false });
  editor._openPanel = "performance";
  await settle(editor);
  const labels = [...editor.shadowRoot.querySelectorAll(".indent .awc-slider-label")].map((el) => el.textContent);
  assert.deepEqual(labels, ["Frequency"]);
});

test("birds and planes switch on and off on their own", async () => {
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home" });
  const toggle = (which, on) =>
    editor._onFaunaToggle({ currentTarget: { dataset: { fauna: which } }, target: { checked: on } });

  toggle("birds", false);
  assert.equal(emitted.at(-1).fauna_birds, false);
  toggle("planes", false);
  assert.equal(emitted.at(-1).fauna_planes, false);
  toggle("birds", true);
  assert.ok(!("fauna_birds" in emitted.at(-1)));

  // From "no fauna at all", planes alone can be turned on.
  editor.setConfig({ weather_entity: "weather.home", perf_fauna: 0 });
  toggle("planes", true);
  assert.equal(emitted.at(-1).perf_fauna, 2);
  assert.equal(emitted.at(-1).fauna_birds, false);
  assert.ok(!("fauna_planes" in emitted.at(-1)));
});

test("a preset turns birds and planes back on", async () => {
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home", fauna_birds: false, fauna_planes: false });
  editor._openPanel = "performance";
  await settle(editor);
  const ultra = [...editor.shadowRoot.querySelectorAll(".grid-picker .segmented button")].find(
    (b) => b.textContent.trim() === "Ultra",
  );
  ultra.click();
  await settle(editor);
  assert.equal(emitted.at(-1).perf_mode, "ultra");
  assert.ok(!("fauna_birds" in emitted.at(-1)));
  assert.ok(!("fauna_planes" in emitted.at(-1)));
});

test("a preset writes only perf_mode and removes own values", async () => {
  const { editor, emitted } = await mountEditor({
    weather_entity: "weather.home",
    perf_fps: 60,
    fauna_bird_density: 0.7,
    perf_fauna: 1,
  });
  editor._openPanel = "performance";
  await settle(editor);
  const button = (label) =>
    [...editor.shadowRoot.querySelectorAll(".grid-picker .segmented button")].find(
      (b) => b.textContent.trim() === label,
    );
  const perfKeys = (cfg) => Object.keys(cfg).filter((k) => k !== "perf_mode" && /^(perf_|fauna_|animation_speed|bird_|star_)/.test(k));
  button("Low").click();
  await settle(editor);
  assert.equal(emitted.at(-1).perf_mode, "low");
  assert.deepEqual(perfKeys(emitted.at(-1)), []);
  // The editor still shows the preset as chosen, not as custom.
  assert.ok(button("Low").classList.contains("active"));
  button("Default").click();
  await settle(editor);
  assert.ok(!("perf_mode" in emitted.at(-1)));
  assert.deepEqual(perfKeys(emitted.at(-1)), []);
});

test("quick add puts a ready chip for the weather entity", async () => {
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home" });
  editor._openPanel = "chips";
  await settle(editor);
  const buttons = () => [...editor.shadowRoot.querySelectorAll(".quick-add-btn")];
  assert.equal(buttons().length, 5);
  buttons()[0].click();
  await settle(editor);
  buttons()[4].click();
  await settle(editor);
  const [temp, tomorrow] = emitted.at(-1).chips;
  assert.deepEqual(temp, { entity: "weather.home", attribute: "temperature", icon: "mdi:thermometer", name: "Temperature" });
  assert.equal(tomorrow.forecast, "daily");
  assert.equal(tomorrow.forecast_offset, 1);
  for (const config of emitted) validate(config);
});

test("a chip row shows the live value of its entity", async () => {
  const { editor } = await mountEditor({
    weather_entity: "weather.home",
    chips: [{ entity: "sensor.temperature" }, { entity: "weather.home", attribute: "humidity" }, { entity: "sensor.gone" }],
  });
  editor._openPanel = "chips";
  await settle(editor);
  const subs = [...editor.shadowRoot.querySelectorAll(".card-row-sub")].map((el) => el.textContent);
  assert.deepEqual(subs, ["21.5 °C", "80", "Entity not found"]);
});

test("the help button shows the explanation with a link to the docs", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home" });
  editor._openPanel = "performance";
  await settle(editor);
  const button = editor.shadowRoot.querySelector('.help-btn[data-help="performance"]');
  assert.equal(editor.shadowRoot.querySelector(".help-box"), null);
  button.click();
  await settle(editor);
  const box = editor.shadowRoot.querySelector(".help-box");
  assert.match(box.querySelector("a").href, /#performance$/);
});

test("embedded cards use the Home Assistant card editor when it loads", async () => {
  const { editor, emitted } = await mountEditor({
    weather_entity: "weather.home",
    custom_cards: [{ type: "markdown", content: "x", custom_width: "50%" }],
  });
  // Outside Home Assistant the YAML field stays.
  editor._openPanel = "cards";
  editor._expandedCard = 0;
  editor.requestUpdate();
  await settle(editor);
  await editor._cardEditorsLoading;
  await settle(editor);
  assert.equal(editor._cardEditorsReady, false);
  assert.ok(editor.shadowRoot.querySelector(".card-row-body ha-form"));

  // With the editor available, changes keep our own size keys.
  editor._cardEditorsReady = true;
  editor.requestUpdate();
  await settle(editor);
  const cardEditor = editor.shadowRoot.querySelector("hui-card-element-editor");
  assert.deepEqual(cardEditor.value, { type: "markdown", content: "x" });
  cardEditor.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { type: "markdown", content: "y" } } }));
  assert.deepEqual(emitted.at(-1).custom_cards, [{ type: "markdown", content: "y", custom_width: "50%" }]);

  // Adding a card opens Home Assistant's card picker.
  editor.shadowRoot.querySelector(".add-card-btn").click();
  await settle(editor);
  const picker = editor.shadowRoot.querySelector("hui-card-picker");
  picker.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { type: "entities", entities: [] } } }));
  assert.equal(emitted.at(-1).custom_cards.length, 2);
  assert.equal(editor._cardPickerOpen, false);
});

test("embedded cards can be edited when Home Assistant freezes the config", async () => {
  const cards = Object.freeze([Object.freeze({ type: "markdown", content: "x" }), Object.freeze({ type: "entities", entities: [] })]);
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home", custom_cards: cards });
  editor._config = Object.freeze({ ...editor._config, custom_cards: cards });
  editor._updateCardAt(0, { type: "markdown", content: "y" });
  assert.equal(emitted.at(-1).custom_cards[0].content, "y");
  editor._config = Object.freeze({ ...editor._config, custom_cards: cards });
  editor._moveCard(0, 1);
  assert.equal(emitted.at(-1).custom_cards[0].type, "entities");
  editor._config = Object.freeze({ ...editor._config, custom_cards: cards });
  editor._removeCard(0);
  assert.equal(emitted.at(-1).custom_cards.length, 1);
});

test("sliders without a saved value show what the card uses", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home" });
  const value = async (panel, label) => {
    editor._openPanel = panel;
    editor.requestUpdate();
    await settle(editor);
    const slider = [...editor.shadowRoot.querySelectorAll(".awc-slider")].find(
      (el) => el.querySelector(".awc-slider-label").textContent.trim() === label,
    );
    return Number(slider.querySelector(".awc-slider-num").value);
  };
  assert.equal(await value("sun_moon", "Size (px)"), 62);
  // The card sits at z-index 1 without card_stack_order.
  assert.equal(await value("appearance", "Layer Order"), 1);
  assert.match(readFileSync(new URL("../src/atmo-weather-styles.js", import.meta.url), "utf8"),/#card-root \{[^}]*z-index: var\(--awc-stack-order, 1\)/);
  assert.equal(await value("performance", "Star Twinkle Speed"), 0.5);
  assert.equal(await value("performance", "Animation Speed"), 1);
});

test("birds can be turned on from a low preset written in YAML", async () => {
  const { editor, emitted } = await mountEditor({ weather_entity: "weather.home", perf_mode: "low" });
  const toggle = (which, on) =>
    editor._onFaunaToggle({ currentTarget: { dataset: { fauna: which } }, target: { checked: on } });
  toggle("birds", true);
  assert.equal(emitted.at(-1).perf_fauna, 1);
  toggle("planes", true);
  assert.equal(emitted.at(-1).perf_fauna, 2);
});

test("effect sliders show the values of the chosen preset", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home", perf_mode: "ultra" });
  editor._openPanel = "performance";
  await settle(editor);
  const value = (label) =>
    Number(
      [...editor.shadowRoot.querySelectorAll(".awc-slider")]
        .find((el) => el.querySelector(".awc-slider-label").textContent.trim() === label)
        .querySelector(".awc-slider-num").value,
    );
  assert.equal(value("Birds per flock"), 12);
});

test("Effect Quality Off explains which effects still work", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home", perf_effects: 0 });
  editor._openPanel = "performance";
  await settle(editor);
  const notes = [...editor.shadowRoot.querySelectorAll(".info")].map((el) => el.textContent.trim());
  assert.ok(notes.some((n) => n.includes("Blue hour, golden hour and cloud amount still work")));
  assert.ok(notes.some((n) => n.includes("no shooting stars or comets")));
});

test("the image preview follows the image scale", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home", image_day: "/local/a.png", image_scale: 150 });
  editor._openPanel = "image";
  await settle(editor);
  assert.match(editor.shadowRoot.querySelector(".image-preview-img").getAttribute("style"), /height:150%/);
});

test("the card picker gets the dashboard config, or an empty one", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home" });
  assert.deepEqual(editor._lovelace(), { views: [] });
  const root = document.createElement("hui-root");
  root.lovelace = { config: { views: [{ cards: [] }] } };
  document.body.append(root);
  assert.deepEqual(editor._lovelace(), { views: [{ cards: [] }] });
  root.remove();
});

test("Home Assistant's card editors load through a stack card editor", async () => {
  const { editor } = await mountEditor({ weather_entity: "weather.home" });
  let loaded = false;
  window.loadCardHelpers = async () => ({
    createCardElement: async () => {
      const el = document.createElement("div");
      el.constructor.getConfigElement = async () => {
        if (!customElements.get("hui-card-element-editor"))
          customElements.define("hui-card-element-editor", class extends HTMLElement {});
        if (!customElements.get("hui-card-picker")) customElements.define("hui-card-picker", class extends HTMLElement {});
        loaded = true;
      };
      return el;
    },
  });
  try {
    assert.equal(await editor._loadCardEditors(), true);
    assert.equal(loaded, true);
    assert.equal(editor._cardEditorsReady, true);
  } finally {
    delete window.loadCardHelpers;
    delete HTMLDivElement.getConfigElement;
  }
});
