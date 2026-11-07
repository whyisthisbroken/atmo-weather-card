import { test } from "node:test";
import assert from "node:assert/strict";

const registeredElements = new Map();

globalThis.HTMLElement = class {
  attachShadow() {
    return {};
  }
};
globalThis.CSS = { registerProperty() {} };
globalThis.window = { customCards: [] };
globalThis.document = {};
globalThis.customElements = {
  define(name, element) {
    registeredElements.set(name, element);
  },
  get(name) {
    return registeredElements.get(name);
  },
};

await import("../src/atmo-weather-card.js");

const AtmosphericWeatherCard = registeredElements.get("atmo-weather-card");

function createSetterCard(config) {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  card._config = config;
  card._chips = [{ entity: "sensor.missing", attribute: "temperature" }];
  card._customCardElements = [];
  card._lastSnapshot = null;
  card._moonRotationRad = undefined;
  card._entityErrors = new Map();
  card._lastErrorLog = 0;
  card._elements = null;
  card._hasReceivedFirstHass = false;
  card._renderGate = { hasFirstHass: false };
  card._stubbedRenderMethods = [
    "_updateStandaloneStyles",
    "_updateTextElements",
    "_updateImage",
    "_applyGoldenHour",
    "_buildRenderState",
    "_syncFc",
    "_tryInitialize",
    "_handleWeatherChange",
  ];
  for (const method of card._stubbedRenderMethods) card[method] = () => {};
  return card;
}

test("set hass tolerates missing configured entities", () => {
  const card = createSetterCard({
    weather_entity: "weather.missing",
    sun_entity: "sun.missing",
    theme_entity: "sensor.theme_missing",
  });

  assert.doesNotThrow(() => {
    card.hass = {
      states: {},
      themes: { darkMode: false },
      config: { latitude: 50 },
      locale: { language: "de" },
    };
  });
  assert.equal(card._lastSnapshot.weather, "cloudy");
  assert.equal(card._lastSnapshot.temp, "--");
});

test("set hass tolerates unavailable and unknown entities", () => {
  const card = createSetterCard({
    weather_entity: "weather.home",
    sun_entity: "sun.home",
    theme_entity: "sensor.theme",
  });

  assert.doesNotThrow(() => {
    card.hass = {
      states: {
        "weather.home": { state: "unavailable", attributes: {} },
        "sun.home": { state: "unknown", attributes: {} },
        "sensor.theme": { state: "unavailable", attributes: {} },
      },
      themes: { darkMode: true },
      config: { latitude: 50 },
      locale: { language: "de" },
    };
  });
  assert.equal(card._lastSnapshot.weather, "unavailable");
  assert.equal(card._lastSnapshot.temp, "");
});

test("weather effects survive a simulated day/night transition", () => {
  const card = createSetterCard({ weather_entity: "weather.home" });
  card._params = { type: "cloud" };
  card._lastState = "cloudy";
  card._buildRenderState = () => {};
  card._handleWeatherChange =
    AtmosphericWeatherCard.prototype._handleWeatherChange;

  card._handleWeatherChange("rainy", { type: "rain", count: 120 }, true);

  assert.equal(card._lastState, "rainy");
  assert.equal(card._params.type, "rain");
  assert.equal(card._params.count, 120);
});

test("missing card_style defaults to standalone", () => {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  card._config = {};
  card._isThemeDark = false;
  card._isTimeNight = false;

  assert.equal(card._isImmersive, false);
  assert.equal(card._isDarkDayImmersive, false);
});

test("advanced cloud effects use tier defaults and explicit overrides", () => {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  card._config = {};
  card._elements = {
    root: {
      classList: { toggle() {} },
    },
  };
  card.style = { removeProperty() {}, setProperty() {} };
  card._customCardElements = [];
  card._deriveChips = () => [];
  card._initDOM = () => {};
  card._syncFc = () => {};
  card._applyConfigStyles = () => {};
  card._configureCloudBreathingTimer = () => {};

  card.setConfig({ perf_effects: 2 });
  assert.equal(card._cloudSunAngleLighting, true);
  assert.equal(card._cloudBreathingShapes, true);

  card.setConfig({
    perf_effects: 2,
    cloud_sun_angle_lighting: false,
    cloud_breathing_shapes: false,
  });
  assert.equal(card._cloudSunAngleLighting, false);
  assert.equal(card._cloudBreathingShapes, false);

  card.setConfig({
    perf_effects: 0,
    cloud_sun_angle_lighting: true,
    cloud_breathing_shapes: true,
  });
  assert.equal(card._cloudSunAngleLighting, true);
  assert.equal(card._cloudBreathingShapes, true);
});

test("overcast weather blocks celestial transients", () => {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  card._config = {};
  card._isThemeDark = true;
  card._isTimeNight = true;
  card._computeGlowParams = () => null;
  card._computeCloudPalette = () => ({});
  card._buildTextures = () => {};

  card._params = { type: "cloud" };
  card._lastState = "cloudy";
  card._buildRenderState();
  assert.equal(card._renderState.isBadWeatherForComets, true);

  card._params = { type: "cloud" };
  card._lastState = "partlycloudy";
  card._buildRenderState();
  assert.equal(card._renderState.isBadWeatherForComets, false);
});

test("only configured overcast states block celestial transients", () => {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  card._config = {};
  card._isThemeDark = true;
  card._isTimeNight = true;
  card._computeGlowParams = () => null;
  card._computeCloudPalette = () => ({});
  card._buildTextures = () => {};

  for (const state of [
    "cloudy",
    "rainy",
    "pouring",
    "lightning-rainy",
    "snowy-rainy",
  ]) {
    card._params = { type: "cloud" };
    card._lastState = state;
    card._buildRenderState();
    assert.equal(card._renderState.isBadWeatherForComets, true, state);
  }
  for (const state of ["windy", "fog", "partlycloudy", "clear-night"]) {
    card._params = { type: "cloud" };
    card._lastState = state;
    card._buildRenderState();
    assert.equal(card._renderState.isBadWeatherForComets, false, state);
  }
});

test("cloud bake debounce queues a rapid follow-up request", () => {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  card._renderState = {};
  card._lastBakeTime = null;
  card._pendingBakeRequested = false;
  card._pendingBakeTimer = null;
  let bakeCount = 0;
  card._doBakeAllClouds = () => {
    bakeCount++;
  };

  try {
    card._bakeAllClouds();
    card._bakeAllClouds();

    assert.equal(bakeCount, 1);
    assert.equal(card._pendingBakeRequested, true);
    assert.ok(card._pendingBakeTimer);
  } finally {
    clearTimeout(card._pendingBakeTimer);
  }
});

test("connectedCallback restarts forecast subscriptions", () => {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  let syncs = 0;
  card._syncFc = () => syncs++;
  card._resizeObserver = {};
  card._intersectionObserver = {};
  card._elements = null;
  card._initializationComplete = false;
  card._renderGate = { hasFirstHass: false };
  globalThis.window._figtreeLoaded = true;

  card.connectedCallback();

  assert.equal(syncs, 1);
});

test("bar chip escapes configured colors", () => {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  card._config = {};
  card._fcData = new Map();
  card._entityErrors = new Map();
  const payload = '"><img src=x onerror=alert(1)>';
  const hass = {
    locale: { language: "en" },
    states: { "sensor.a": { entity_id: "sensor.a", state: "50", attributes: {} } },
    formatEntityState: (entity) => entity.state,
    formatEntityAttributeValue: (entity, attribute) =>
      entity.attributes[attribute],
  };
  const render = (chip) =>
    card._renderChip(chip, 0, hass, {}, "en", false, "frosted", "inline").html;

  const solid = render({ entity: "sensor.a", type: "bar", bar_color: payload });
  const thresholds = render({
    entity: "sensor.a",
    type: "bar",
    bar_thresholds: [{ value: 0, color: payload }],
  });

  for (const html of [solid, thresholds]) {
    assert.ok(html.includes("chip-bar-fill"));
    assert.ok(!html.includes("<img"));
  }
});

function createChipCard(config = {}) {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  card._config = config;
  card._fcData = new Map();
  card._entityErrors = new Map();
  return card;
}

function chipHass(states = {}) {
  return {
    locale: { language: "en" },
    localize: () => "",
    states: {
      "sensor.a": {
        entity_id: "sensor.a",
        state: "50",
        attributes: { friendly_name: "Sensor A", level: 7 },
      },
      ...states,
    },
    formatEntityState: (entity) => `${entity.state} units`,
    formatEntityAttributeValue: (entity, attribute) =>
      `${entity.attributes[attribute]} attr`,
  };
}

function renderChip(card, chip, hass = chipHass()) {
  return card._renderChip(chip, 0, hass, {}, "en", false, "frosted", "inline");
}

test("chip without an entity renders nothing", () => {
  const output = renderChip(createChipCard(), {});

  assert.equal(output.html, "");
  assert.equal(output.sig, "skip-0");
});

test("chip shows the formatted entity state", () => {
  const { html } = renderChip(createChipCard(), { entity: "sensor.a" });

  assert.ok(html.includes("50 units"));
});

test("chip shows the formatted attribute value", () => {
  const { html } = renderChip(createChipCard(), {
    entity: "sensor.a",
    attribute: "level",
  });

  assert.ok(html.includes("7 attr"));
});

test("chip shows N/A for a missing entity or attribute", () => {
  const card = createChipCard();

  for (const chip of [
    { entity: "sensor.missing" },
    { entity: "sensor.a", attribute: "missing" },
  ]) {
    assert.ok(renderChip(card, chip).html.includes("N/A"));
  }
});

test("chip escapes entity data and configured names", () => {
  const payload = "<img src=x onerror=alert(1)>";
  const hass = chipHass({
    "sensor.evil": {
      entity_id: "sensor.evil",
      state: payload,
      attributes: { friendly_name: payload },
    },
  });

  const { html } = renderChip(
    createChipCard(),
    { entity: "sensor.evil", name: payload },
    hass,
  );

  assert.ok(!html.includes("<img"));
});

test("chip signature changes with the value and stays stable otherwise", () => {
  const card = createChipCard();
  const chip = { entity: "sensor.a" };
  const changed = chipHass({
    "sensor.a": { entity_id: "sensor.a", state: "51", attributes: {} },
  });

  assert.equal(renderChip(card, chip).sig, renderChip(card, chip).sig);
  assert.notEqual(renderChip(card, chip).sig, renderChip(card, chip, changed).sig);
});

test("chip background uses the card background style", () => {
  const { html } = renderChip(createChipCard(), {
    entity: "sensor.a",
    background: true,
  });

  assert.ok(html.includes("with-bg"));
  assert.ok(html.includes("frosted"));
});

test("forecast chip shows a loader until data arrives, then the value", () => {
  const card = createChipCard();
  const hass = chipHass({
    "weather.home": {
      entity_id: "weather.home",
      state: "rainy",
      attributes: { temperature_unit: "°C" },
    },
  });
  const chip = {
    entity: "weather.home",
    forecast: "daily",
    attribute: "temperature",
  };

  assert.ok(renderChip(card, chip, hass).html.includes("chip-loading"));

  card._fcData.set("weather.home|daily", {
    processed: [{ datetime: "2026-11-07T12:00:00Z", temperature: 9 }],
    fp: "x",
  });
  const { html } = renderChip(card, chip, hass);

  assert.ok(!html.includes("chip-loading"));
  assert.ok(html.includes("9"));
});

test("bar chip scales its fill to the value", () => {
  const { html } = renderChip(createChipCard(), {
    entity: "sensor.a",
    type: "bar",
    bar_min: 0,
    bar_max: 200,
  });

  assert.ok(html.includes("--awc-bar-scale:0.2500"));
});

test("ring chip fills to the value", () => {
  const { html } = renderChip(createChipCard(), {
    entity: "sensor.a",
    type: "ring",
  });

  assert.ok(html.includes("--awc-ring-pct:50"));
});

test("set hass skips work when the watched entities are unchanged", () => {
  const card = createSetterCard({ weather_entity: "weather.home" });
  card._chips = [];
  let updates = 0;
  card._handleWeatherChange = () => updates++;
  const weather = { state: "rainy", attributes: {} };
  const hass = (entity) => ({
    states: { "weather.home": entity },
    themes: { darkMode: true },
    config: { latitude: 50 },
    locale: { language: "en" },
  });

  card.hass = hass(weather);
  card.hass = hass(weather);
  assert.equal(updates, 0);

  card.hass = hass({ state: "sunny", attributes: {} });
  assert.equal(updates, 1);
});

function applyConfig(config) {
  const card = Object.create(AtmosphericWeatherCard.prototype);
  const slot = { style: {} };
  card._elements = {
    root: { classList: { toggle() {} } },
    imageSlot: slot,
  };
  card.style = { removeProperty() {}, setProperty() {} };
  card._customCardElements = [];
  card._initDOM = () => {};
  card._syncFc = () => {};
  card._applyConfigStyles = () => {};
  card._configureCloudBreathingTimer = () => {};
  card.setConfig(config);
  return { card, slot };
}

test("setConfig turns card_height into a CSS size", () => {
  const height = (config) => applyConfig(config).card.style.height;

  assert.equal(height({}), "200px");
  assert.equal(height({ card_height: 150 }), "150px");
  assert.equal(height({ card_height: "40vh" }), "40vh");
  assert.equal(height({ card_height: "auto" }), "100%");
  assert.equal(height({ card_square: true }), "auto");
});

test("image_alignment accepts the left and right shorthands", () => {
  const { slot } = applyConfig({ image_alignment: "left" });

  assert.equal(slot.style.top, "50%");
  assert.equal(slot.style.right, "auto");
});

test("forecast data renders without waiting for a state change", () => {
  const card = createSetterCard({ weather_entity: "weather.home" });
  card._chips = [];
  card._fcData = new Map();
  card.hass = {
    states: { "weather.home": { state: "rainy", attributes: {} } },
    themes: { darkMode: true },
    config: { latitude: 50 },
    locale: { language: "en" },
  };
  let renders = 0;
  card._updateTextElements = () => renders++;

  card._onFcData("weather.home|daily", [{ datetime: "2099-01-01T00:00:00Z" }], true);

  assert.equal(renders, 1);
});

test("forecast chip asks to check the provider when there is no data", () => {
  const card = createChipCard();
  const hass = chipHass({
    "weather.home": { entity_id: "weather.home", state: "rainy", attributes: {} },
  });
  card._fcData.set("weather.home|daily", { processed: [], fp: "" });
  const chip = { entity: "weather.home", forecast: "daily", attribute: "temperature" };
  const render = (lang) =>
    card._renderChip(chip, 0, hass, {}, lang, false, "frosted", "inline").html;

  assert.ok(render("en").includes("Please check your weather provider"));
  assert.ok(render("de").includes("Bitte prüfen Sie Ihren Wetteranbieter"));
  assert.ok(render("de-CH").includes("Bitte prüfen Sie Ihren Wetteranbieter"));
  assert.ok(render("xx").includes("Please check your weather provider"));
  assert.ok(!render("en").includes("chip-loading"));
});

test("provider message survives every forecast chip variant", () => {
  const card = createChipCard();
  const hass = chipHass({
    "weather.home": { entity_id: "weather.home", state: "rainy", attributes: {} },
  });
  card._fcData.set("weather.home|daily", { processed: [], fp: "" });
  const base = { entity: "weather.home", forecast: "daily", attribute: "temperature" };

  for (const extra of [
    { fancy_unit: true },
    { sub_value_attribute: "templow", sub_value_position: "beside" },
    { type: "ring" },
    { type: "bar" },
    { value_precision: 1 },
    { attribute: "condition" },
  ]) {
    const { html } = renderChip(card, { ...base, ...extra }, hass);
    assert.ok(html.includes("Please check your weather provider"), JSON.stringify(extra));
  }
});

test("a failed forecast subscription ends the loading state", async () => {
  const card = createSetterCard({ weather_entity: "weather.home" });
  card._fcSubs = new Map();
  card._fcData = new Map();
  card._chips = [{ entity: "weather.home", forecast: "daily" }];
  Object.defineProperty(card, "isConnected", { value: true });
  card._hass = {
    states: { "weather.home": { state: "rainy", attributes: {} } },
    themes: { darkMode: true },
    config: { latitude: 50 },
    locale: { language: "en" },
    connection: {
      subscribeMessage: () => Promise.reject(new Error("not supported")),
    },
  };

  card._startFcSub("weather.home|daily");
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.deepEqual(card._fcData.get("weather.home|daily").processed, []);
});
