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

test("every chip layout sets its class", () => {
  for (const chip_area_layout of ["wrap", "grid", "horizontal-scroll", "vertical-scroll"]) {
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

    assert.equal(chips(card).length, 3, chip_area_layout);
    assert.ok(row(card).className.includes(chip_area_layout), chip_area_layout);
    document.body.replaceChildren();
  }
});

test("the chip area and free chips can sit at every anchor", () => {
  for (const anchor of ["top-left", "top-center", "top-right", "left", "center", "right", "bottom-left", "bottom-center", "bottom-right"]) {
    const card = mountCard({
      chip_area_position: anchor,
      custom_cards_position: anchor,
      custom_cards_css_class: "one two",
      chips: [SENSOR, { ...SENSOR, position: "custom", position_anchor: anchor, position_x: "pad", position_y: "12px" }],
    });
    const html = card.shadowRoot.innerHTML;

    // The chip area, the free chip and the embedded cards all name the anchor.
    assert.ok(row(card).outerHTML.includes(anchor), `chip area at ${anchor}`);
    assert.equal(chips(card).length, 2, anchor);
    assert.ok(html.split(anchor).length > 2, `free chip and cards at ${anchor}`);
    document.body.replaceChildren();
  }
});

test("every chip style applies to all chips", () => {
  for (const chip_style of ["inline", "stacked", "vertical"]) {
    const card = mountCard({ chip_style, chip_area_align: "spread", chips: [SENSOR, { ...SENSOR, type: "ring" }, { ...SENSOR, type: "bar" }] });
    const classes = chips(card).map((c) => c.className);

    assert.equal(classes.length, 3, chip_style);
    // Inline is the plain chip without a format class.
    for (const c of classes)
      assert.equal(c.includes(`format-${chip_style}`), chip_style !== "inline", `${chip_style}: ${c}`);
    document.body.replaceChildren();
  }
});

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

test("the dynamic sun and moon move along their arc by day and night", () => {
  for (const celestial_position of ["dynamic_sun", "dynamic_both"]) {
    for (const sun of ["above_horizon", "below_horizon"]) {
      const card = mountCard({ celestial_position, perf_mode: "ultra", celestial_size: 40 }, makeHass({ sun, weather: "sunny" }));
      runFrames(20);
      const position = card._getCelestialPosition(400, 200);

      assert.ok(Number.isFinite(position.x) && Number.isFinite(position.y), `${celestial_position}, ${sun}`);
      document.body.replaceChildren();
    }
  }
});

test("a fixed sun stays inside the card at every alignment", () => {
  for (const align of ["top-left", "top-right", "left", "right", "center", "bottom-center", "bottom-right"]) {
    const card = mountCard({ celestial_alignment: align, celestial_x: 10, celestial_y: 10 });
    const { x, y } = card._getCelestialPosition(400, 200);

    assert.ok(x > 0 && x < 400, `${align}: x ${x}`);
    assert.ok(y > 0 && y < 200, `${align}: y ${y}`);
    document.body.replaceChildren();
  }
});

test("golden hour tints the card near sunset", () => {
  const hass = makeHass({ weather: "sunny", dark: true });
  hass.states["sun.sun"].attributes.elevation = 3;
  hass.states["sun.sun"].attributes.rising = false;
  const card = mountCard({ card_style: "immersive" }, hass);
  runFrames(5);

  assert.ok(card.shadowRoot.querySelector("#card-root").style.getPropertyValue("--gh-wash") !== null);
});

test("wind speed is read in every unit system", () => {
  for (const [wind_speed, wind_speed_unit, kmh] of [[90, "km/h", 90], [40, "mph", 64.36], [15, "m/s", 54], [50, "kn", 92.6], [0, "km/h", 0]]) {
    const hass = makeHass({ weather: "windy" });
    Object.assign(hass.states["weather.home"].attributes, { wind_speed, wind_speed_unit });
    const card = mountCard({ perf_mode: "ultra" }, hass);
    runFrames(10);

    assert.ok(Math.abs(card._windKmh - kmh) < 0.01, `${wind_speed} ${wind_speed_unit}: ${card._windKmh}`);
    document.body.replaceChildren();
  }
  // In rain the wind only shows once it is strong.
  for (const [kmh, shown] of [[60, true], [20, false]]) {
    const hass = makeHass({ weather: "rainy" });
    hass.states["weather.home"].attributes.wind_speed = kmh;
    const card = mountCard({}, hass);
    runFrames(5);

    assert.equal(Boolean(card._windLines), shown, `rain at ${kmh} km/h`);
    document.body.replaceChildren();
  }
});

test("missing and unavailable entities render without errors", () => {
  const hass = makeHass();
  hass.states["sensor.temperature"].state = "unavailable";
  const card = mountCard({ weather_entity: "weather.none", sun_entity: "sun.none", theme_entity: "sensor.none", moon_phase_entity: "sensor.none", status_entity: "sensor.none", chips: [SENSOR, { entity: "sensor.none" }] }, hass);
  runFrames(5);

  assert.equal(card._lastSnapshot.weather, "cloudy");
  assert.equal(card._lastSnapshot.temp, "--");

  // Unavailable and unknown states draw the card too.
  const down = makeHass();
  down.states["weather.home"] = { entity_id: "weather.home", state: "unavailable", attributes: {} };
  down.states["sun.sun"] = { entity_id: "sun.sun", state: "unknown", attributes: {} };
  const card2 = mountCard({}, down);
  runFrames(5);
  assert.equal(card2._lastSnapshot.weather, "unavailable");
  assert.equal(card2._lastSnapshot.temp, "");
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

test("clouds are baked with a slight blur against the gradient grid", () => {
  const card = mountCard({});
  assert.equal(card._cloudBakeFilter(2), "blur(1.35px)");
  assert.equal(card._cloudBakeFilter(1.5), "blur(1.35px)");
  assert.equal(card._cloudBakeFilter(0.5), "blur(0.675px)");

  card.setConfig({ weather_entity: "weather.home", card_filter_clouds: "Muted" });
  // A chosen cloud filter is kept on top of the blur.
  assert.equal(card._cloudBakeFilter(1), "blur(1.35px) saturate(0.55) brightness(1.08)");
});

test("breathing re-bakes only the changed clouds in their own cells, a few per frame", () => {
  const card = mountCard({ perf_mode: "ultra" }, makeHass({ weather: "cloudy" }));
  runFrames(5);
  assert.equal(card._cloudBreathingShapes, true);
  const clouds = card._clouds.filter((c) => c._bakedCanvas);
  const cell = (c) => [c._bakedCanvas, c._atlasX, c._atlasY, c._atlasW, c._atlasH];
  const cells = clouds.map(cell);
  let fullBakes = 0;
  const fullBake = card._doBakeAllClouds;
  card._doBakeAllClouds = function () {
    fullBakes++;
    return fullBake.call(this);
  };
  for (const cloud of clouds) card._breatheCloudShape(cloud);
  card._requestAdvancedCloudBake(clouds);
  assert.equal(card._pendingCloudBakes.size, clouds.length);
  // The first frame takes clouds until about 120 puffs are re-baked.
  let firstFrame = 0;
  for (let puffs = 0; puffs < 120 && firstFrame < clouds.length; firstFrame++)
    puffs += clouds[firstFrame].puffs.length;
  assert.ok(firstFrame < clouds.length);
  runFrames(1);
  assert.equal(card._pendingCloudBakes.size, clouds.length - firstFrame);
  runFrames(clouds.length);
  assert.equal(card._pendingCloudBakes.size, 0);
  assert.equal(fullBakes, 0);
  // The breathing range is part of the bake box, so every cloud keeps its cell.
  assert.deepEqual(clouds.map(cell), cells);
});

test("a cloud that no longer fits its cell falls back to a full bake", () => {
  const card = mountCard({ perf_mode: "ultra" }, makeHass({ weather: "cloudy" }));
  runFrames(5);
  const [first, second] = card._clouds.filter((c) => c._bakedCanvas);
  let fullBakes = 0;
  card._doBakeAllClouds = () => fullBakes++;
  card._lastBakeTime = null;
  first._atlasW = 1;
  card._requestAdvancedCloudBake([first, second]);
  runFrames(1);
  assert.equal(fullBakes, 1);
  // The full bake covers the rest of the queue.
  assert.equal(card._pendingCloudBakes.size, 0);
  assert.equal(card._rebakeCloudInPlace({ puffs: [] }), false);
});

test("clouds are blurred once each, not once per puff", () => {
  const card = mountCard({ perf_mode: "ultra" }, makeHass({ weather: "cloudy" }));
  runFrames(5);
  const atlas = card._cloudAtlases[0];
  const scratch = card._getCloudScratch(1, 1);
  const filters = [];
  for (const ctx of [atlas.ctx, scratch.ctx]) {
    let value = "none";
    Object.defineProperty(ctx, "filter", {
      configurable: true,
      get: () => value,
      set: (v) => {
        value = v;
        filters.push([ctx === atlas.ctx ? "atlas" : "scratch", v]);
      },
    });
  }
  const cloud = card._clouds.find((c) => c._bakedCanvas === atlas.canvas);
  assert.ok(cloud.puffs.length > 3);
  assert.equal(card._rebakeCloudInPlace(cloud), true);
  assert.deepEqual(filters, [["atlas", card._cloudBakeFilter(card._cachedDimensions.dpr)]]);
  // A larger cloud grows the scratch canvas, a smaller one reuses it.
  const grown = card._getCloudScratch(scratch.canvas.width + 10, 1);
  assert.notEqual(grown, scratch);
  assert.equal(card._getCloudScratch(1, 1), grown);
});

test("starting the card bakes the clouds once, without a second bake queued", () => {
  const card = mountCard({ perf_mode: "ultra" }, makeHass({ weather: "cloudy" }));
  runFrames(5);
  assert.ok(card._clouds.some((c) => c._bakedCanvas));
  // The first bake remembers the light direction, so the first frame finds
  // nothing to re-bake.
  assert.notEqual(card._lastSunAngleBucket, null);
  assert.equal(card._pendingBakeTimer, null);
  assert.equal(card._pendingBakeRequested, false);
  assert.equal(card._pendingCloudBakes.size, 0);
});

test("a new light direction re-bakes the clouds in place, not all at once", () => {
  const card = mountCard({ perf_mode: "ultra" }, makeHass({ weather: "cloudy" }));
  runFrames(5);
  const bucket = card._lastSunAngleBucket;
  let fullBakes = 0;
  card._doBakeAllClouds = () => fullBakes++;
  card._lastSunAngleBucket = bucket + 10;
  runFrames(1);
  assert.equal(card._lastSunAngleBucket, bucket);
  assert.ok(card._pendingCloudBakes.size > 0);
  runFrames(card._clouds.length);
  assert.equal(card._pendingCloudBakes.size, 0);
  assert.equal(fullBakes, 0);
});

test("the sun corona is blurred once into sprites, not on every frame", () => {
  const card = mountCard({ perf_mode: "ultra" }, makeHass({ weather: "sunny" }));
  runFrames(5);
  const sprites = card._coronaSprites;
  assert.equal(sprites.list.length, 10);
  // Each frame only draws the sprites; the blur stays on the sprite canvases.
  const blurs = [];
  const layers = Object.values(card._ctxs);
  for (const ctx of layers)
    Object.defineProperty(ctx, "filter", {
      configurable: true,
      get: () => "none",
      set: (v) => blurs.push(v),
    });
  runFrames(5);
  for (const ctx of layers) delete ctx.filter;
  assert.ok(blurs.length > 0);
  assert.equal(card._coronaSprites, sprites);
  assert.ok(!blurs.some((v) => String(v).includes("blur")));
  assert.ok(sprites.list[0].canvas.context.filter.startsWith("blur("));
  // A new pixel density builds new sprites.
  card._cachedDimensions.dpr = 3;
  runFrames(1);
  assert.notEqual(card._coronaSprites, sprites);
});

test("low mode draws the sun without a corona", () => {
  const card = mountCard({ perf_mode: "low" }, makeHass({ weather: "sunny" }));
  runFrames(5);
  assert.equal(card._coronaSprites, undefined);
});

const weatherWith = (weather, attributes, extra = {}) => {
  const hass = makeHass({ weather, ...extra });
  Object.assign(hass.states["weather.home"].attributes, attributes);
  return hass;
};
const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0));
// happy-dom has no layout, so a rebuild is counted rather than run.
const countRebuilds = (card) => {
  const calls = { n: 0 };
  card._initParticles = () => calls.n++;
  return calls;
};

test("measured cloud cover sets the clouds and rebuilds the scene when it changes", async () => {
  const card = mountCard({ perf_mode: "ultra" }, weatherWith("sunny", { cloud_coverage: 60 }));
  runFrames(3);
  assert.equal(card._params.cloud, 27);
  assert.ok(card._clouds.length > 0);

  const rebuilds = countRebuilds(card);
  card.hass = weatherWith("sunny", { cloud_coverage: 0 });
  await nextTask();
  assert.equal(card._params.cloud, 0);
  assert.equal(rebuilds.n, 1);
  // The same cover again changes nothing.
  card.hass = weatherWith("sunny", { cloud_coverage: 0 });
  await nextTask();
  assert.equal(rebuilds.n, 1);
});

test("rain follows the precipitation sensor and ignores the attribute", () => {
  const rain = (config, attrs) => {
    const hass = weatherWith("rainy", attrs, {
      states: { "sensor.rain_rate": { entity_id: "sensor.rain_rate", state: "8", attributes: { unit_of_measurement: "mm/h" } } },
    });
    return mountCard({ perf_mode: "ultra", ...config }, hass)._params.count;
  };
  assert.equal(rain({}, { precipitation: 8 }), 120);
  assert.equal(rain({ precipitation_entity: "sensor.rain_rate" }, {}), 280);
});

test("a new reading of the precipitation sensor reaches the card", async () => {
  const sensor = (state) => ({ "sensor.rain_rate": { entity_id: "sensor.rain_rate", state, attributes: { unit_of_measurement: "mm/h" } } });
  const card = mountCard(
    { perf_mode: "ultra", precipitation_entity: "sensor.rain_rate" },
    makeHass({ weather: "rainy", states: sensor("1") }),
  );
  assert.equal(card._params.count, 70);
  assert.equal(card._rain.length, 70);
  const rebuilds = countRebuilds(card);
  card.hass = makeHass({ weather: "rainy", states: sensor("4") });
  await nextTask();
  assert.equal(card._params.count, 160);
  assert.equal(rebuilds.n, 1);
});

test("the sky light effects draw for twilight, haze, mist and sun rays", () => {
  const dusk = makeHass({ weather: "clear-night", sun: "below_horizon", dark: true });
  dusk.states["sun.sun"].attributes.elevation = -2;
  Object.assign(dusk.states["weather.home"].attributes, { visibility: 3, temperature: 6, dew_point: 5.8 });
  const night = mountCard({ perf_mode: "ultra" }, dusk);
  runFrames(3);
  assert.ok(night._atmo.twilight > 0.5);
  assert.ok(night._atmo.starVisibility < 0.5);
  assert.ok(night._twilightGrad, "twilight drawn");
  assert.ok(night._hazeGrad, "haze drawn");
  assert.equal(night._mistBanks.length, 5, "mist drawn");

  const day = makeHass({ weather: "partlycloudy" });
  day.states["sun.sun"].attributes.elevation = 15;
  const sunny = mountCard({ perf_mode: "ultra" }, day);
  runFrames(3);
  assert.equal(sunny._atmo.rays, 1);
  assert.ok(sunny._atmoCache.has("rays"), "sun rays drawn");
  // Low mode leaves the extra light out.
  const low = mountCard({ perf_mode: "low" }, day);
  runFrames(3);
  assert.ok(!low._atmoCache);
});

test("a comet made while building the night sky has colors and draws", () => {
  const card = mountCard({ perf_mode: "ultra" }, makeHass({ weather: "clear-night", sun: "below_horizon", dark: true }));
  const comet = card._createComet(400, 200);
  assert.ok(comet._coreRgb && comet._glowRgb && comet._tailRgb);
  card._comets.push(comet);
  runFrames(5);
  assert.ok(!errors.some((e) => e.includes("render frame failed")));
});

test("the canvases follow every height change, the scene only bigger ones", () => {
  const card = mountCard({ perf_mode: "ultra" });
  const dpr = card._cachedDimensions.dpr;
  assert.equal(card._elements.bg.height, Math.floor(200 * dpr));

  // 120 px more used to be ignored, leaving the bottom of the card empty.
  assert.equal(card._updateCanvasDimensions(400, 320), true);
  assert.equal(card._elements.bg.height, Math.floor(320 * dpr));
  // A small change resizes the canvases without rebuilding the scene.
  assert.equal(card._updateCanvasDimensions(400, 340), false);
  assert.equal(card._elements.bg.height, Math.floor(340 * dpr));
  assert.equal(card._updateCanvasDimensions(400, 340), false);
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

test("effect switches reach the scene", () => {
  const hass = makeHass({ weather: "partlycloudy" });
  Object.assign(hass.states["weather.home"].attributes, { cloud_coverage: 0, visibility: 2 });
  const on = mountCard({ perf_mode: "ultra" }, hass);
  assert.equal(on._params.cloud, 0, "cloud cover from data");
  assert.ok(on._atmo.haze > 0);
  assert.ok(on._atmo.rays > 0);

  const off = mountCard(
    { perf_mode: "ultra", effect_cloud_coverage: false, effect_haze: "false", effect_sun_rays: false },
    hass,
  );
  assert.ok(off._params.cloud > 0, "fixed cloud amount of the weather state");
  assert.equal(off._atmo.haze, 0);
  assert.equal(off._atmo.rays, 0);
});

test("birds and planes can be switched off on their own", () => {
  const card = mountCard({ perf_mode: "ultra", fauna_birds: false, fauna_plane_speed: 2 });
  assert.equal(card._faunaBirds, false);
  assert.equal(card._faunaPlanes, true);
  assert.equal(card._faunaPlaneSpeed, 2);
  card._birds.push({ x: 0, y: 0 });
  runFrames(2);
  assert.equal(card._birds.length, 0);

  const plane = card._createPlane(400, 200);
  const near = Math.abs(plane.vx) / Math.cos(plane.climbAngle);
  assert.ok(near > 0.4 && near < 1.4);

  const noPlanes = mountCard({ perf_mode: "ultra", fauna_planes: false });
  noPlanes._planes.push(noPlanes._createPlane(400, 200));
  const x = noPlanes._planes[0].x;
  runFrames(2);
  assert.equal(noPlanes._planes[0].x, x, "planes are not drawn or moved");
});

test("new options apply at once, without waiting for a state change", () => {
  const hass = makeHass({ weather: "partlycloudy" });
  Object.assign(hass.states["weather.home"].attributes, { cloud_coverage: 0 });
  const card = mountCard({ perf_mode: "ultra" }, hass);
  assert.equal(card._params.cloud, 0);
  card.setConfig({ weather_entity: "weather.home", sun_entity: "sun.sun", perf_mode: "ultra", effect_cloud_coverage: false });
  assert.ok(card._params.cloud > 0);
});

test("without cloud amount from data, a closed deck still blocks the sun rays", () => {
  const hass = makeHass({ weather: "cloudy" });
  hass.states["sun.sun"].attributes.elevation = 15;
  Object.assign(hass.states["weather.home"].attributes, { cloud_coverage: 100 });
  const card = mountCard({ perf_mode: "ultra", effect_cloud_coverage: false }, hass);
  assert.equal(card._atmo.rays, 0);
});

test("the performance preset sets the amount of birds and planes unless the config does", () => {
  const ultra = mountCard({ perf_mode: "ultra" });
  assert.equal(ultra._faunaBirdDensity, 1.5);
  assert.equal(ultra._faunaPlaneDensity, 1.5);
  assert.equal(ultra._faunaBirdFlockSize, 12);
  const low = mountCard({ perf_mode: "low" });
  assert.equal(low._faunaBirdDensity, 0.5);
  assert.equal(low._faunaBirdFlockSize, 4);
  const plain = mountCard({});
  assert.equal(plain._faunaBirdFlockSize, 8);
  const custom = mountCard({ perf_mode: "ultra", fauna_bird_density: 0.7, fauna_bird_flock_size: 3 });
  assert.equal(custom._faunaBirdDensity, 0.7);
  assert.equal(custom._faunaBirdFlockSize, 3);
});

test("shooting star and comet rates stay between 0.25 and 3", () => {
  const card = mountCard({ shooting_star_rate: 0, comet_rate: 9 });
  assert.equal(card._fx.shootingStarRate, 0.25);
  assert.equal(card._fx.cometRate, 3);
});

test("fancy_unit shows the unit once when Home Assistant formats it with a unit", async () => {
  const { stripTrailingUnit } = await import("../src/atmo-weather-helpers.js");
  assert.equal(stripTrailingUnit("12 °C", "°C"), "12");
  assert.equal(stripTrailingUnit("12 °F", "°F"), "12");
  assert.equal(stripTrailingUnit("12", "°C"), "12");
  assert.equal(stripTrailingUnit("°C", "°C"), "°C");
  assert.equal(stripTrailingUnit("12 °C", ""), "12 °C");

  // Like Home Assistant: weather temperatures come formatted with their unit.
  const hass = makeHass();
  hass.formatEntityAttributeValue = (entity, attribute) =>
    attribute === "temperature" ? `${entity.attributes.temperature} ${entity.attributes.temperature_unit}` : `${entity.attributes[attribute]}`;
  const card = mountCard({ chips: [{ entity: "weather.home", attribute: "temperature", fancy_unit: true }] }, hass);
  const html = chips(card)[0].innerHTML;
  assert.equal((html.match(/°C/g) || []).length, 1, html);
  assert.match(html, /<span class="fancy-unit">°C<\/span>/);
});

test("the clouds fill a ring wider than the card so the wind carries no hole across it", () => {
  // Wind from the west keeps the ring overhang on the left where it was built.
  const hass = makeHass({ weather: "windy" });
  hass.states["weather.home"].attributes.wind_bearing = 270;
  const card = mountCard({ perf_mode: "ultra" }, hass);
  runFrames(3);
  const w = card._width;
  const xs = card._clouds.map((c) => c.x);
  assert.ok(xs.some((x) => x < -w * 0.1), "clouds beyond the left edge");
  assert.ok(xs.every((x) => x > -w * 0.5 && x < w * 1.1), `all within the ring, ${Math.min(...xs)}..${Math.max(...xs)}`);
  // The banks share the clouds evenly along the ring.
  const thirds = [0, 0, 0];
  for (const x of xs) thirds[Math.max(0, Math.min(2, Math.floor(((x + w * 0.3) / (w * 1.3)) * 3)))]++;
  assert.ok(Math.min(...thirds) >= card._clouds.length * 0.15, thirds.join("/"));
});

test("the wind direction comes from the weather entity and turns smoothly", () => {
  const card = mountCard({}, makeHass({ weather: "windy" }));
  runFrames(2);
  // The test weather blows from the east, so everything drifts to the left.
  assert.equal(card._windBearing, 90);
  assert.equal(card._windDir, -1);
  const hass = makeHass({ weather: "windy" });
  hass.states["weather.home"].attributes.wind_bearing = 250;
  card.hass = hass;
  runFrames(2);
  assert.equal(card._windBearing, 250);
  assert.ok(card._windDir > -1 && card._windDir < 1, `turning, ${card._windDir}`);
  runFrames(400);
  assert.equal(card._windDir, 1);
});

const compassEl = (card) => card.shadowRoot.querySelector("#wind-compass");

test("the wind compass shows the bearing of the weather entity", () => {
  const card = mountCard(
    { wind_compass: "rose", wind_compass_degrees: true, wind_compass_speed: true },
    makeHass({ weather: "windy" }),
  );
  runFrames(2);
  const el = compassEl(card);
  assert.equal(el.hidden, false);
  assert.ok(el.querySelector(".cmp-style-rose.cmp-pos-bottom-right"));
  // The test weather blows from the east at 20 km/h.
  assert.deepEqual([...el.querySelectorAll(".cmp-label span")].map((s) => s.textContent), ["E", "90°", "20 km/h"]);
  assert.match(el.querySelector(".cmp-rot").style.transform, /rotate\(90deg\)/);
});

test("the compass turns the short way and follows the language", () => {
  const card = mountCard({ wind_compass: "vane", wind_compass_position: "top-left" }, makeHass({ weather: "windy" }));
  runFrames(2);
  const hass = makeHass({ weather: "windy", language: "de" });
  hass.states["weather.home"].attributes.wind_bearing = 60;
  card.hass = hass;
  runFrames(2);
  const el = compassEl(card);
  assert.ok(el.querySelector(".cmp-pos-top-left"));
  assert.equal(el.querySelector(".cmp-label").textContent, "ONO");
  // Rebuilt for the new language, so it starts at the current bearing.
  assert.match(el.querySelector(".cmp-rot").style.transform, /rotate\(60deg\)/);
  const next = makeHass({ weather: "windy", language: "de" });
  next.states["weather.home"].attributes.wind_bearing = 350;
  card.hass = next;
  runFrames(2);
  // From 60° to 350° is 70° back, not 290° forward.
  assert.match(el.querySelector(".cmp-rot").style.transform, /rotate\(-10deg\)/);
});

test("the compass is off by default, hides without a bearing and falls back on unknown styles", () => {
  const plain = mountCard({}, makeHass({ weather: "windy" }));
  runFrames(2);
  assert.equal(compassEl(plain).hidden, true);
  assert.equal(compassEl(plain).innerHTML, "");
  const hass = makeHass({ weather: "windy" });
  delete hass.states["weather.home"].attributes.wind_bearing;
  const card = mountCard({ wind_compass: "pill" }, hass);
  runFrames(2);
  assert.equal(compassEl(card).hidden, true);
  const odd = mountCard({ wind_compass: "spinner", wind_compass_position: 5 }, makeHass({ weather: "windy" }));
  runFrames(2);
  assert.equal(compassEl(odd).hidden, true);
  assert.equal(odd._compass.style, "off");
});

test("the compass gets a frosted background on request, the chip keeps its own", () => {
  const card = mountCard({ wind_compass: "arrow", wind_compass_background: true }, makeHass({ weather: "windy" }));
  runFrames(2);
  assert.ok(compassEl(card).querySelector(".cmp-style-arrow.cmp-bg"));
  const pill = mountCard({ wind_compass: "pill", wind_compass_background: true }, makeHass({ weather: "windy" }));
  runFrames(2);
  assert.ok(compassEl(pill).querySelector(".cmp-style-pill"));
  assert.equal(compassEl(pill).querySelector(".cmp-bg"), null);
});

test("an automatic compass moves away from the chips", () => {
  const pos = (cfg) => {
    const card = mountCard({ wind_compass: "arrow", ...cfg }, makeHass({ weather: "windy" }));
    runFrames(2);
    const cls = compassEl(card).firstElementChild.className;
    document.body.replaceChildren();
    return cls.match(/cmp-pos-([a-z-]+)/)[1];
  };
  // No chips: the arrow sits in its corner, bottom left.
  assert.equal(pos({}), "bottom-left");
  // The chip row sits bottom left by default, so the arrow goes up.
  assert.equal(pos({ chips: [SENSOR] }), "top-left");
  // A free chip top left as well: the arrow goes to the other side.
  assert.equal(pos({ chips: [SENSOR, { ...SENSOR, position: "custom", position_anchor: "top-left" }] }), "bottom-right");
  // A full width chip row takes the whole bottom edge.
  assert.equal(pos({ wind_compass: "band", chip_area_full_width: true, chips: [SENSOR] }), "top-center");
  // A chosen place is kept.
  assert.equal(pos({ wind_compass_position: "bottom-left", chips: [SENSOR] }), "bottom-left");
});

test("the wind arrow keeps its full size on a low card", () => {
  const card = mountCard({ wind_compass: "arrow" }, makeHass({ weather: "windy" }));
  runFrames(2);
  card._cachedDimensions = { width: 400, height: 140, dpr: 1 };
  card._updateCompassScale();
  assert.equal(compassEl(card).style.getPropertyValue("--_cmp-scale"), "1.000");
  const rose = mountCard({ wind_compass: "rose" }, makeHass({ weather: "windy" }));
  runFrames(2);
  rose._cachedDimensions = { width: 400, height: 140, dpr: 1 };
  rose._updateCompassScale();
  assert.equal(compassEl(rose).style.getPropertyValue("--_cmp-scale"), "0.700");
});

test("wind direction chips show degrees, the compass point or both", () => {
  const hass = makeHass();
  hass.states["sensor.wind_dir"] = {
    entity_id: "sensor.wind_dir",
    state: "250",
    attributes: { device_class: "wind_direction", unit_of_measurement: "°" },
  };
  hass.formatEntityState = (s) => `${s.state}${s.attributes.unit_of_measurement || ""}`;
  const bearing = { entity: "weather.home", attribute: "wind_bearing" };
  const card = mountCard({
    chips: [
      bearing,
      { ...bearing, bearing_format: "cardinal" },
      { ...bearing, bearing_format: "both" },
      { entity: "sensor.wind_dir", bearing_format: "both" },
      // Other chips ignore the option.
      { entity: "weather.home", attribute: "humidity", bearing_format: "cardinal" },
    ],
  }, hass);
  const values = chips(card).map(text);
  assert.match(values[0], /90/);
  assert.ok(!/\bE\b/.test(values[0]), values[0]);
  assert.match(values[1], /\bE\b/);
  assert.ok(!values[1].includes("90"), values[1]);
  assert.match(values[2], /E 90/);
  assert.match(values[3], /WSW 250°/);
  assert.ok(!/[A-Z]{1,3}\b/.test(values[4].replace(/Hum\w*/i, "")), values[4]);
});

test("wind direction chips use German compass points", () => {
  const hass = makeHass();
  hass.locale = { language: "de" };
  const card = mountCard({ chips: [{ entity: "weather.home", attribute: "wind_bearing", bearing_format: "cardinal" }] }, hass);
  assert.match(text(chips(card)[0]), /\bO\b/);
});

test("a wind direction chip can turn its icon with the wind and show the speed", () => {
  const bearing = { entity: "weather.home", attribute: "wind_bearing", bearing_format: "cardinal" };
  const card = mountCard({
    chips: [
      { ...bearing, bearing_icon: "arrow", bearing_speed: true },
      { ...bearing, bearing_icon: "needle" },
      { ...bearing, bearing_icon: "filled", icon: "mdi:weather-windy" },
      // Chips without a wind direction ignore both options.
      { entity: "weather.home", attribute: "humidity", bearing_icon: "arrow", bearing_speed: true },
    ],
  });
  const [arrow, needle, filled, other] = chips(card);
  // Wind from the east (90°): the arrow points west where it blows, the needle east where it comes from.
  assert.match(arrow.querySelector("svg.bearing-icon").getAttribute("style"), /rotate\(270deg\)/);
  assert.match(needle.querySelector("svg.bearing-icon").getAttribute("style"), /rotate\(90deg\)/);
  // The turning icon wins over a configured icon.
  assert.ok(filled.querySelector("svg.bearing-icon") && !filled.querySelector("ha-icon"));
  assert.match(text(arrow), /E · 20 km\/h/);
  assert.ok(!text(needle).includes("km/h"));
  assert.equal(other.querySelector("svg.bearing-icon"), null);
  // Without a bearing there is no turning icon and no speed after N/A.
  const hass = makeHass();
  delete hass.states["weather.home"].attributes.wind_bearing;
  document.body.replaceChildren();
  const none = mountCard({ chips: [{ ...bearing, bearing_icon: "arrow", bearing_speed: true }] }, hass);
  assert.equal(chips(none)[0].querySelector("svg.bearing-icon"), null);
  assert.ok(!text(chips(none)[0]).includes("km/h"), text(chips(none)[0]));
  assert.ok(!text(other).includes("km/h"));
});

test("degrees get their sign next to the turning icon or the speed, plain chips stay as before", () => {
  const b = { entity: "weather.home", attribute: "wind_bearing" };
  const card = mountCard({
    chips: [
      { ...b, bearing_speed: true },
      { ...b, bearing_icon: "needle" },
      { ...b, bearing_format: "both", bearing_speed: true },
      b,
    ],
  });
  const [speed, icon, both, plain] = chips(card).map(text);
  assert.match(speed, /\b90° · 20 km\/h/);
  assert.match(icon, /\b90°/);
  assert.ok(!/°°/.test(both) && /90° · 20 km\/h/.test(both), both);
  assert.ok(/\b90\b/.test(plain) && !plain.includes("°"), plain);
});

test("times follow the time format of the Home Assistant profile", () => {
  const at = new Date();
  at.setHours(18, 5, 0, 0);
  const shown = (time_format) => {
    const hass = makeHass();
    hass.locale = { language: "en", ...(time_format ? { time_format } : {}) };
    hass.states["sensor.time"] = { entity_id: "sensor.time", state: at.toISOString(), attributes: {} };
    document.body.replaceChildren();
    return text(chips(mountCard({ chips: [{ entity: "sensor.time" }] }, hass))[0]);
  };
  assert.match(shown("24"), /\b18:05\b/);
  assert.match(shown("12"), /6:05\sPM/);
  // "language" and no setting keep the default of the language.
  assert.match(shown("language"), /6:05\sPM/);
  assert.match(shown(), /6:05\sPM/);
});
