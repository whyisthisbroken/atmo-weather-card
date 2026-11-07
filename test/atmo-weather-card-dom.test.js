import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { errors, makeHass, mountCard, resizeAll, runFrames } from "./helpers/dom.js";

await import("../src/atmo-weather-card.js");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), []);
});

const row = (card) => card.shadowRoot.querySelector("#chips-row");
const chips = (card) => [...card.shadowRoot.querySelectorAll(".chip")];
const text = (el) => el.textContent.replace(/\s+/g, " ").trim();
const SENSOR = { entity: "sensor.temperature" };

test("chips render values in the shadow DOM", () => {
  const card = mountCard({ chips: [SENSOR, { entity: "weather.home", attribute: "humidity", name: "Hum" }] });

  assert.equal(chips(card).length, 2);
  assert.ok(text(chips(card)[0]).includes("21.5 °C"));
  assert.ok(text(chips(card)[1]).includes("Hum"));
});

for (const chip_area_layout of ["wrap", "grid", "horizontal-scroll", "vertical-scroll"]) {
  test(`chip layout ${chip_area_layout} sets its class`, () => {
    const card = mountCard({
      chip_area_layout,
      chip_area_columns: 2,
      chip_area_scroll_count: 2,
      chip_area_height: "60px",
      chip_area_grouped: true,
      chip_area_separator: true,
      chip_area_background: true,
      chips: [SENSOR, SENSOR, SENSOR],
    });

    assert.equal(chips(card).length, 3);
    assert.ok(row(card).className.includes(chip_area_layout));
  });
}

for (const anchor of ["top-left", "top-center", "top-right", "left", "center", "right", "bottom-left", "bottom-center", "bottom-right"]) {
  test(`chip area and free chips can sit at ${anchor}`, () => {
    const card = mountCard({
      chip_area_position: anchor,
      custom_cards_position: anchor,
      custom_cards_css_class: "one two",
      chips: [SENSOR, { ...SENSOR, position: "custom", position_anchor: anchor, position_x: "pad", position_y: "12px" }],
    });

    assert.ok(card.shadowRoot.innerHTML.length > 0);
  });
}

for (const chip_style of ["inline", "stacked", "vertical"]) {
  test(`chip style ${chip_style} applies to all chips`, () => {
    const card = mountCard({ chip_style, chip_area_align: "spread", chips: [SENSOR, { ...SENSOR, type: "ring" }, { ...SENSOR, type: "bar" }] });

    if (chip_style !== "inline") assert.ok(chips(card)[0].className.includes(`format-${chip_style}`));
  });
}

test("gauges use thresholds in solid and gradient mode", () => {
  const thresholds = [{ value: 10, color: "green" }, { value: 20, color: "red" }];
  const card = mountCard({
    chips: [
      { ...SENSOR, type: "bar", bar_thresholds: thresholds },
      { ...SENSOR, type: "bar", bar_thresholds: thresholds, bar_threshold_mode: "gradient" },
      { ...SENSOR, type: "ring", ring_thresholds: thresholds },
      { ...SENSOR, type: "ring", ring_thresholds: thresholds, ring_threshold_mode: "gradient" },
      { ...SENSOR, type: "ring", ring_thresholds: thresholds, ring_threshold_mode: "segments" },
      { entity: "sensor.moon", type: "ring" },
    ],
  });

  assert.ok(card.shadowRoot.innerHTML.includes("red"));
  assert.equal(chips(card).length, 6);
});

test("value formatting options reach the chip", () => {
  const card = mountCard({
    chips: [
      { ...SENSOR, value_precision: 0 },
      { ...SENSOR, unit_format: "°" },
      { entity: "weather.home", attribute: "temperature", fancy_unit: true },
      { entity: "weather.home", attribute: "temperature", fancy_unit: true, value_precision: 1 },
      { ...SENSOR, hide_icon: true, hide_label: true },
      { ...SENSOR, hide_value: true },
      { entity: "sensor.time" },
      { entity: "binary_sensor.door", icon: "weather" },
      { ...SENSOR, sub_value_entity: "sensor.moon" },
      { ...SENSOR, sub_value_entity: "weather.home", sub_value_attribute: "humidity", sub_value_position: "beside", sub_value_format: "x" },
      { ...SENSOR, name_sensor: "binary_sensor.door" },
      { ...SENSOR, label_overflow: "marquee", overflow: "marquee", sub_value_overflow: "marquee", marquee_rtl: true },
    ],
  });

  assert.equal(chips(card).length, 12);
});

test("marquee text starts scrolling when it overflows", () => {
  const card = mountCard({ chips: [{ ...SENSOR, label_overflow: "marquee", name: "A very long chip label that overflows" }] });
  const host = card.shadowRoot.querySelector(".awc-marquee-host");
  assert.ok(host);
  Object.defineProperty(host, "clientWidth", { value: 40 });
  const track = host.querySelector(".awc-marquee-track") || host.firstElementChild;
  Object.defineProperty(track, "scrollWidth", { value: 300 });

  card._measureMarqueeOne(host);
  runFrames(3);
});

test("a tap on the card fires the configured action", () => {
  const card = mountCard({ card_tap_action: { action: "navigate", navigation_path: "/x" } });
  const fired = [];
  card.addEventListener("hass-action", (event) => fired.push(event.detail));

  card.click();

  assert.equal(fired[0].config.tap_action.navigation_path, "/x");
  assert.ok(card.shadowRoot.querySelector("#card-root").classList.contains("clickable"));
});

test("a tap on a chip fires more-info by default", () => {
  const card = mountCard({ chips: [SENSOR] });
  const fired = [];
  card.addEventListener("hass-action", (event) => fired.push(event.detail));

  chips(card)[0].click();

  assert.equal(fired[0].config.entity, "sensor.temperature");
  assert.equal(fired[0].config.tap_action.action, "more-info");
});

test("day and night images follow the sun", () => {
  const config = { image_day: "/local/day.png", image_night: "/local/night.png", image_scale: 80, image_alignment: "bottom-left", image_x: "4", image_y: "-3" };
  const src = (card) => card.shadowRoot.querySelector("#image-slot > img").getAttribute("src");

  assert.ok(src(mountCard(config)).includes("day.png"));
  assert.ok(src(mountCard(config, makeHass({ sun: "below_horizon", dark: true }))).includes("night.png"));
});

test("a status entity overrides the image while it is active", () => {
  const card = mountCard({ image_day: "/local/day.png", status_entity: "binary_sensor.door", status_day: "/local/open.png", status_night: "/local/open-night.png" });

  assert.ok(card.shadowRoot.querySelector("#image-slot > img").getAttribute("src").includes("open.png"));
});

test("custom cards are created and receive hass", async () => {
  const created = [];
  window.loadCardHelpers = async () => ({
    createCardElement: (config) => {
      const el = document.createElement("div");
      el.config = config;
      created.push(el);
      return el;
    },
  });
  const card = mountCard({ custom_cards: [{ type: "markdown" }, { type: "entities" }], custom_cards_position: "left" });
  await new Promise((resolve) => setTimeout(resolve, 0));
  await Promise.resolve();
  const hass = makeHass({ weather: "rainy" });

  card.hass = hass;

  assert.equal(created.length, 2);
  assert.equal(created[0].hass, hass);
});

for (const celestial_position of ["dynamic_sun", "dynamic_both"]) {
  for (const sun of ["above_horizon", "below_horizon"]) {
    test(`${celestial_position} moves the body along its arc, ${sun}`, () => {
      const card = mountCard({ celestial_position, perf_mode: "ultra", celestial_size: 40 }, makeHass({ sun, weather: "sunny" }));
      runFrames(20);
      const position = card._getCelestialPosition(400, 200);

      assert.ok(Number.isFinite(position.x) && Number.isFinite(position.y));
    });
  }
}

for (const align of ["top-left", "top-right", "left", "right", "center", "bottom-center", "bottom-right"]) {
  test(`fixed sun at ${align} stays inside the card`, () => {
    const card = mountCard({ celestial_alignment: align, celestial_x: 10, celestial_y: 10 });
    const { x, y } = card._getCelestialPosition(400, 200);

    assert.ok(x > 0 && x < 400, `x ${x}`);
    assert.ok(y > 0 && y < 200, `y ${y}`);
  });
}

test("golden hour tints the card near sunset", () => {
  const hass = makeHass({ weather: "sunny", dark: true });
  hass.states["sun.sun"].attributes.elevation = 3;
  hass.states["sun.sun"].attributes.rising = false;
  const card = mountCard({ card_style: "immersive" }, hass);
  runFrames(5);

  assert.ok(card.shadowRoot.querySelector("#card-root").style.getPropertyValue("--gh-wash") !== null);
});

test("wind speed and unit systems drive the wind", () => {
  for (const [wind_speed, wind_speed_unit] of [[90, "km/h"], [40, "mph"], [15, "m/s"], [50, "kn"], [0, "km/h"]]) {
    const hass = makeHass({ weather: "windy" });
    Object.assign(hass.states["weather.home"].attributes, { wind_speed, wind_speed_unit });
    mountCard({ perf_mode: "ultra" }, hass);
    runFrames(10);
  }
});

test("missing and unavailable entities render without errors", () => {
  const hass = makeHass();
  hass.states["sensor.temperature"].state = "unavailable";
  const card = mountCard({ weather_entity: "weather.none", sun_entity: "sun.none", theme_entity: "sensor.none", moon_phase_entity: "sensor.none", status_entity: "sensor.none", chips: [SENSOR, { entity: "sensor.none" }] }, hass);
  runFrames(5);

  assert.equal(card._lastSnapshot.weather, "cloudy");
});

test("every moon phase renders in both color modes", () => {
  for (const phase of ["new_moon", "waxing_crescent", "first_quarter", "waxing_gibbous", "full_moon", "waning_gibbous", "last_quarter", "waning_crescent"]) {
    for (const dark of [true, false]) {
      const hass = makeHass({ weather: "clear-night", sun: "below_horizon", dark });
      hass.states["sensor.moon"].state = phase;
      mountCard({ moon_phase_entity: "sensor.moon", perf_mode: "ultra" }, hass);
      runFrames(6);
    }
  }
});

test("forecast chips update from subscription messages", async () => {
  const push = {};
  const hass = makeHass();
  hass.connection.subscribeMessage = async (callback, message) => {
    push[message.forecast_type] = callback;
    return () => {};
  };
  const card = mountCard({ chips: [{ entity: "weather.home", forecast: "daily", attribute: "temperature", forecast_offset: 1 }, { entity: "weather.home", forecast: "hourly", attribute: "condition" }] }, hass);
  await Promise.resolve();
  const day = 864e5;

  push.daily({ forecast: [0, 1, 2].map((n) => ({ datetime: new Date(Date.now() + n * day).toISOString(), temperature: 10 + n, condition: "rainy", humidity: 50 })) });

  assert.ok(text(chips(card)[0]).includes("11"));
});

test("changing the config rebuilds chips and filters", () => {
  const card = mountCard({ chips: [SENSOR], card_filter_clouds: "vivid" });

  card.setConfig({ weather_entity: "weather.home", chips: [SENSOR, SENSOR], card_filter_clouds: "warm", card_filter_sun: "muted", card_square: true, card_stack_order: 2, card_mask_vertical: false, card_mask_horizontal: false, card_full_width: true, card_offset: "4px", card_hide_text: true });
  card.hass = makeHass({ weather: "rainy" });
  resizeAll(300, 300);
  runFrames(5);

  assert.equal(card.style.aspectRatio, "1 / 1");
});

test("the editor loads through getConfigElement", async () => {
  await import("../src/atmo-weather-card-editor.js");

  const editor = await customElements.get("atmo-weather-card").getConfigElement();

  assert.equal(editor.localName, "atmo-weather-card-editor");
});

test("fog is pure haze without clouds, sun clouds or wind streaks", () => {
  for (const sun of ["above_horizon", "below_horizon"]) {
    for (const perf_mode of ["low", "default", "ultra"]) {
      const card = mountCard({ perf_mode }, makeHass({ weather: "fog", sun, dark: sun !== "above_horizon" }));
      runFrames(5);

      assert.equal(card._clouds.length, 0, `${sun} ${perf_mode} clouds`);
      assert.equal(card._celestialClouds.length, 0, `${sun} ${perf_mode} sun clouds`);
      assert.equal(card._windVapor.length, 0, `${sun} ${perf_mode} streaks`);
      assert.ok(card._fogBanks.length > 0, `${sun} ${perf_mode} fog`);
    }
  }
});

test("cloudy and precipitation skies are overcast, partly cloudy is not", () => {
  for (const weather of ["cloudy", "rainy", "pouring", "lightning", "lightning-rainy", "hail", "snowy", "snowy-rainy"]) {
    for (const sun of ["above_horizon", "below_horizon"]) {
      const card = mountCard({}, makeHass({ weather, sun, dark: sun !== "above_horizon" }));
      runFrames(3);

      assert.equal(card._params.overcast, true, weather);
      assert.ok(card._clouds.length >= 38, `${weather} ${sun} ${card._clouds.length}`);
      assert.ok(card._stars.length <= 15, `${weather} ${sun} stars`);
      assert.ok(card._deckGrad, `${weather} ${sun} deck`);
    }
  }
  const card = mountCard({}, makeHass({ weather: "partlycloudy" }));
  runFrames(3);
  assert.ok(!card._params.overcast);
  assert.equal(card._deckGrad, undefined);
});

test("the sun is drawn in every performance mode", () => {
  for (const perf_mode of ["low", "default", "ultra"]) {
    const card = mountCard({ perf_mode }, makeHass({ weather: "sunny" }));
    let drawn = 0;
    const original = card._drawCelestialGlow.bind(card);
    card._drawCelestialGlow = (...args) => {
      drawn++;
      return original(...args);
    };
    runFrames(10);

    assert.ok(drawn > 0, perf_mode);
  }
});

test("wind style and bearing reach the card", () => {
  const hass = makeHass({ weather: "windy" });
  hass.states["weather.home"].attributes.wind_bearing = 135;

  const lines = mountCard({}, hass);
  assert.equal(lines._windStyle, "lines");
  assert.equal(lines._windBearing, 135);
  assert.equal(lines._windVapor.length, 0);
  runFrames(5);
  assert.ok(lines._windLines.length > 0);

  assert.equal(mountCard({ wind_style: "flow" }, hass)._windStyle, "flow");
  assert.equal(mountCard({ wind_style: "sideways" }, hass)._windStyle, "lines");
  // Off brings back the old wind streaks.
  assert.ok(mountCard({ wind_style: "off" }, hass)._windVapor.length > 0);
});

test("strong wind shows up in rain but light wind does not", () => {
  for (const [kmh, shown] of [[60, true], [20, false]]) {
    const hass = makeHass({ weather: "rainy" });
    hass.states["weather.home"].attributes.wind_speed = kmh;
    const card = mountCard({}, hass);
    runFrames(5);

    assert.equal(Boolean(card._windLines), shown, `${kmh} km/h`);
  }
});

test("clouds are baked with a slight blur against the gradient grid", () => {
  const card = mountCard({});
  assert.equal(card._cloudBakeFilter(2), "blur(1.35px)");
  assert.equal(card._cloudBakeFilter(1.5), "blur(1.35px)");
  assert.equal(card._cloudBakeFilter(0.5), "blur(0.675px)");

  card.setConfig({ weather_entity: "weather.home", card_filter_clouds: "Muted" });
  // A chosen cloud filter is kept on top of the blur.
  assert.equal(card._cloudBakeFilter(1), "blur(1.35px) saturate(0.55) brightness(1.08)");
});

test("ultra keeps large cards sharp, other modes cap the pixels", () => {
  const ratio = window.devicePixelRatio;
  window.devicePixelRatio = 2;
  try {
    // A wide wall-tablet card: 1600x500 CSS px at 2x is 3.2 million pixels.
    const sharpness = (mode) => {
      const card = mountCard({ perf_mode: mode });
      card._updateCanvasDimensions(1600, 500);
      return card._cachedDimensions.dpr;
    };

    assert.equal(sharpness("ultra"), 2);
    assert.ok(sharpness("default") < 1.7);
  } finally {
    window.devicePixelRatio = ratio;
  }
});

test("the dynamic sun stays at the horizon while Home Assistant rolls over sunset and sunrise", () => {
  const h = 3600e3;
  const place = (state, risingIn, settingIn) => {
    const hass = makeHass({ sun: state });
    const now = Date.now();
    Object.assign(hass.states["sun.sun"].attributes, {
      elevation: 0,
      next_rising: new Date(now + risingIn).toISOString(),
      next_setting: new Date(now + settingIn).toISOString(),
    });
    const card = mountCard({ celestial_position: "dynamic_both" }, hass);
    return card._computeDynamicCelestial("dynamic_both").t;
  };

  // Normal afternoon: sunset in 1 h, sunrise tomorrow.
  assert.ok(place("above_horizon", 15 * h, 1 * h) > 0.85);
  // Just after sunset: next_setting already points to tomorrow, the state is still above.
  assert.equal(place("above_horizon", 15 * h, 24 * h - 60e3), 1);
  // Just before sunrise the state flipped early: the sun starts on the left.
  assert.equal(place("above_horizon", 5 * 60e3, 9 * h), 0);
  // Just after sunrise: next_rising points to tomorrow, the state is still below.
  assert.equal(place("below_horizon", 24 * h - 60e3, 9 * h), 1);
  // Just before sunset the state flipped early: the moon starts on the left.
  assert.equal(place("below_horizon", 15 * h, 5 * 60e3), 0);
});
