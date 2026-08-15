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

await import("../atmo-weather-card.js");

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
