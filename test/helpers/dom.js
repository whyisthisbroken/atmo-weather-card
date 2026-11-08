// Simulated browser for full card runs: DOM from happy-dom, a recording canvas,
// frames that tests advance by hand and a seeded Math.random.
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register({ url: "http://localhost/" });

export const canvasCalls = new Map();

function createContext() {
  const noop = (name) => () => {
    canvasCalls.set(name, (canvasCalls.get(name) || 0) + 1);
  };
  const gradient = () => ({ addColorStop() {} });
  const special = {
    createLinearGradient: gradient,
    createRadialGradient: gradient,
    createConicGradient: gradient,
    createPattern: () => ({}),
    measureText: (text) => ({ width: String(text).length * 6 }),
    getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
  };
  const state = {};
  return new Proxy(state, {
    get: (target, key) => {
      if (key in special) return special[key];
      if (key in target) return target[key];
      return noop(key);
    },
    set: (target, key, value) => {
      target[key] = value;
      return true;
    },
  });
}

const contexts = new WeakMap();
HTMLCanvasElement.prototype.getContext = function getContext() {
  if (!contexts.has(this)) contexts.set(this, createContext());
  return contexts.get(this);
};
globalThis.OffscreenCanvas = class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.context = createContext();
  }
  getContext() {
    return this.context;
  }
};

let frameQueue = [];
let frameClock = 1000;
globalThis.requestAnimationFrame = window.requestAnimationFrame = (callback) => {
  frameQueue.push(callback);
  return frameQueue.length;
};
globalThis.cancelAnimationFrame = window.cancelAnimationFrame = () => {
  frameQueue = [];
};

export function runFrames(count = 1, step = 34) {
  for (let i = 0; i < count; i++) {
    const queue = frameQueue;
    frameQueue = [];
    // Like a browser, frame times never lag behind performance.now(): the card
    // starts its frame timer with performance.now() and skips "early" frames.
    // On a busy machine a pure fake clock fell behind and nothing was drawn.
    frameClock = Math.max(frameClock + step, performance.now());
    for (const callback of queue) callback(frameClock);
  }
}

const observers = [];
class FakeObserver {
  constructor(callback) {
    this.callback = callback;
    this.targets = new Set();
    observers.push(this);
  }
  observe(target) {
    this.targets.add(target);
  }
  unobserve(target) {
    this.targets.delete(target);
  }
  disconnect() {
    this.targets.clear();
  }
}
globalThis.ResizeObserver = window.ResizeObserver = class extends FakeObserver {
  resize(width, height) {
    for (const target of this.targets)
      this.callback([{ target, borderBoxSize: [{ inlineSize: width, blockSize: height }] }]);
  }
};
globalThis.IntersectionObserver = window.IntersectionObserver = class extends FakeObserver {
  intersect(isIntersecting) {
    for (const target of this.targets) this.callback([{ target, isIntersecting }]);
  }
};

export function resizeAll(width = 400, height = 200) {
  for (const observer of observers) if (observer.resize) observer.resize(width, height);
}
export function intersectAll(visible = true) {
  for (const observer of observers) if (observer.intersect) observer.intersect(visible);
}

let seed = 1;
Math.random = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
export const seedRandom = (value = 1) => {
  seed = value;
};

window.loadCardHelpers = async () => ({
  createCardElement: () => document.createElement("div"),
});

export const errors = [];
console.error = (...args) => errors.push(args.map(String).join(" "));
console.info = () => {};

export function makeHass({ weather = "sunny", sun = "above_horizon", dark = false, language = "en", states = {} } = {}) {
  const now = Date.now();
  return {
    language,
    locale: { language },
    themes: { darkMode: dark },
    config: { latitude: 52, longitude: 8, unit_system: { temperature: "°C" } },
    localize: (key) => key.split(".").pop(),
    formatEntityState: (entity) =>
      `${entity.state}${entity.attributes.unit_of_measurement ? ` ${entity.attributes.unit_of_measurement}` : ""}`,
    formatEntityAttributeValue: (entity, attribute) => `${entity.attributes[attribute]}`,
    connection: { subscribeMessage: async () => () => {} },
    callWS: async () => ({}),
    callService: async () => ({}),
    states: {
      "weather.home": {
        entity_id: "weather.home",
        state: weather,
        attributes: {
          temperature: 12,
          temperature_unit: "°C",
          humidity: 80,
          wind_speed: 20,
          wind_speed_unit: "km/h",
          wind_bearing: 90,
          friendly_name: "Home",
        },
      },
      "sun.sun": {
        entity_id: "sun.sun",
        state: sun,
        attributes: {
          elevation: sun === "above_horizon" ? 30 : -10,
          next_rising: new Date(now + 4e7).toISOString(),
          next_setting: new Date(now + 1e7).toISOString(),
        },
      },
      "sensor.temperature": {
        entity_id: "sensor.temperature",
        state: "21.5",
        attributes: { unit_of_measurement: "°C", friendly_name: "Room", device_class: "temperature" },
      },
      "sensor.moon": { entity_id: "sensor.moon", state: "full_moon", attributes: {} },
      "binary_sensor.door": {
        entity_id: "binary_sensor.door",
        state: "on",
        attributes: { friendly_name: "Door" },
      },
      "sensor.time": {
        entity_id: "sensor.time",
        state: new Date(now).toISOString(),
        attributes: {},
      },
      ...states,
    },
  };
}

export function mountCard(config, hass = makeHass()) {
  const card = document.createElement("atmo-weather-card");
  card.setConfig({ weather_entity: "weather.home", sun_entity: "sun.sun", ...config });
  document.body.append(card);
  card.hass = hass;
  resizeAll();
  intersectAll();
  runFrames(2);
  return card;
}
