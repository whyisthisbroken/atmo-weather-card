import { precipCounts } from "../src/atmo-weather-precip.js";
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

test("night images follow the sun by default and the theme on request", () => {
  const config = { image_day: "/local/day.png", image_night: "/local/night.png" };
  const src = (card) => card.shadowRoot.querySelector("#image-slot > img").getAttribute("src");
  const sunDownLight = () => makeHass({ sun: "below_horizon", dark: false });
  const sunUpDark = () => makeHass({ sun: "above_horizon", dark: true });

  assert.equal(src(mountCard(config, sunDownLight())), "/local/night.png");
  assert.equal(src(mountCard(config, sunUpDark())), "/local/day.png");
  assert.equal(src(mountCard({ ...config, image_night_source: "theme" }, sunDownLight())), "/local/day.png");
  assert.equal(src(mountCard({ ...config, image_night_source: "theme" }, sunUpDark())), "/local/night.png");
  // Without a sun entity the theme decides.
  assert.equal(src(mountCard({ ...config, sun_entity: undefined }, sunUpDark())), "/local/night.png");
});

test("a status entity overrides the image while it is active", () => {
  const card = mountCard({ image_day: "/local/day.png", status_entity: "binary_sensor.door", status_day: "/local/open.png", status_night: "/local/open-night.png" });

  assert.ok(card.shadowRoot.querySelector("#image-slot > img").getAttribute("src").includes("open.png"));
});

const imageSrc = (card) => card.shadowRoot.querySelector("#image-slot > img").getAttribute("src");
const snowHass = (snow, extra = {}) =>
  makeHass({
    weather: "rainy",
    ...extra,
    states: {
      "binary_sensor.snow_on_roof": { entity_id: "binary_sensor.snow_on_roof", state: snow, attributes: { depth: 4 } },
      ...(extra.states || {}),
    },
  });
const CONDITIONS = {
  image_day: "/local/house.png",
  image_night: "/local/house-night.png",
  image_conditions: [
    { entity: "binary_sensor.snow_on_roof", image_day: "/local/snow.png", image_night: "/local/snow-night.png" },
    { entity: "weather.home", state: ["Rainy", "pouring"], image_day: "/local/rain.png" },
  ],
};

test("image conditions pick the first match and fall back to the base image", () => {
  assert.equal(imageSrc(mountCard(CONDITIONS, snowHass("on"))), "/local/snow.png");
  assert.equal(imageSrc(mountCard(CONDITIONS, snowHass("off"))), "/local/rain.png");
  assert.equal(imageSrc(mountCard(CONDITIONS, snowHass("off", { weather: "sunny" }))), "/local/house.png");
});

test("image conditions use their night image, or the day image when none is set", () => {
  const night = { sun: "below_horizon", dark: true };

  assert.equal(imageSrc(mountCard(CONDITIONS, snowHass("on", night))), "/local/snow-night.png");
  assert.equal(imageSrc(mountCard(CONDITIONS, snowHass("off", night))), "/local/rain.png");
});

test("the image follows a condition entity when its state changes", () => {
  const hass = snowHass("off", { weather: "sunny" });
  // Without the blend, so the new image is there at once.
  const card = mountCard({ ...CONDITIONS, image_transition: 0 }, hass);
  assert.equal(imageSrc(card), "/local/house.png");
  const snow = hass.states["binary_sensor.snow_on_roof"];

  card.hass = { ...hass, states: { ...hass.states, [snow.entity_id]: { ...snow, state: "on" } } };

  assert.equal(imageSrc(card), "/local/snow.png");
});

// Blending between images: decode() and animate() become stubs the test controls.
function fadeStubs() {
  const decodes = [], anims = [];
  const proto = window.HTMLImageElement.prototype;
  const saved = { decode: proto.decode, animate: window.Element.prototype.animate };
  proto.decode = function () {
    return new Promise((resolve, reject) => decodes.push({ img: this, resolve, reject }));
  };
  window.Element.prototype.animate = function (keyframes, options) {
    let finish;
    const anim = { el: this, keyframes, options, cancelled: false, finished: new Promise((r) => (finish = r)) };
    anim.cancel = () => (anim.cancelled = true);
    anim.finish = () => finish(anim);
    anims.push(anim);
    return anim;
  };
  const restore = () => {
    proto.decode = saved.decode;
    window.Element.prototype.animate = saved.animate;
  };
  return { decodes, anims, restore };
}
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));
const slotImgs = (card) => [...card.shadowRoot.querySelectorAll("#image-slot > img")];
function revealedCard(config) {
  const hass = snowHass("off", { weather: "sunny" });
  const card = mountCard({ ...CONDITIONS, ...config }, hass);
  card._renderGate.isRevealed = true;
  const snow = hass.states["binary_sensor.snow_on_roof"];
  const setSnow = (state) => (card.hass = { ...hass, states: { ...hass.states, [snow.entity_id]: { ...snow, state } } });
  return { card, setSnow };
}

test("a changed image blends in once it has loaded", async () => {
  const stubs = fadeStubs();
  try {
    const { card, setSnow } = revealedCard({});
    setSnow("on");
    // Until the new image has loaded, the old one stays alone.
    assert.deepEqual(slotImgs(card).map((i) => i.getAttribute("src")), ["/local/house.png"]);
    assert.equal(stubs.decodes.length, 1);
    stubs.decodes[0].resolve();
    await tick();
    const [next, old] = slotImgs(card);
    assert.equal(next.getAttribute("src"), "/local/snow.png");
    assert.equal(old.getAttribute("src"), "/local/house.png");
    assert.ok(old.classList.contains("awc-img-layer"));
    assert.equal(imageSrc(card), "/local/snow.png");
    // Default 1 s; the new one is fully in before the old one is fully out.
    assert.deepEqual(stubs.anims.map((a) => [a.el, a.options.duration]), [[next, 1000], [old, 1000]]);
    assert.deepEqual(stubs.anims[0].keyframes.map((k) => k.opacity), [0, 1, 1]);
    assert.deepEqual(stubs.anims[1].keyframes.map((k) => k.opacity), [1, 1, 0]);
    stubs.anims[0].finish();
    await tick();
    assert.deepEqual(slotImgs(card).map((i) => i.getAttribute("src")), ["/local/snow.png"]);
    assert.ok(!slotImgs(card)[0].classList.contains("awc-img-layer"));
  } finally {
    stubs.restore();
  }
});

test("image_transition sets the fade time and 0 switches at once", async () => {
  const stubs = fadeStubs();
  try {
    const slow = revealedCard({ image_transition: "2.5" });
    slow.setSnow("on");
    stubs.decodes[0].resolve();
    await tick();
    assert.equal(stubs.anims[0].options.duration, 2500);

    const instant = revealedCard({ image_transition: 0 });
    instant.setSnow("on");
    assert.deepEqual(slotImgs(instant.card).map((i) => i.getAttribute("src")), ["/local/snow.png"]);
    assert.equal(stubs.decodes.length, 1);
  } finally {
    stubs.restore();
  }
});

test("quick changes end on the last image with one layer left", async () => {
  const stubs = fadeStubs();
  try {
    const { card, setSnow } = revealedCard({});
    // On and off again before the snow image has loaded: nothing happens.
    setSnow("on");
    setSnow("off");
    stubs.decodes[0].resolve();
    await tick();
    assert.deepEqual(slotImgs(card).map((i) => i.getAttribute("src")), ["/local/house.png"]);
    assert.equal(stubs.anims.length, 0);
    // A new change in the middle of a blend ends the running one first.
    setSnow("on");
    stubs.decodes[1].resolve();
    await tick();
    setSnow("off");
    assert.ok(stubs.anims.slice(0, 2).every((a) => a.cancelled));
    assert.deepEqual(slotImgs(card).map((i) => i.getAttribute("src")), ["/local/snow.png"]);
    stubs.decodes[2].resolve();
    await tick();
    stubs.anims[2].finish();
    await tick();
    assert.deepEqual(slotImgs(card).map((i) => i.getAttribute("src")), ["/local/house.png"]);
  } finally {
    stubs.restore();
  }
});

test("images switch at once before the card shows and with reduced motion", () => {
  const stubs = fadeStubs();
  const savedMatch = window.matchMedia;
  try {
    const hidden = revealedCard({});
    hidden.card._renderGate.isRevealed = false;
    hidden.setSnow("on");
    assert.equal(imageSrc(hidden.card), "/local/snow.png");

    window.matchMedia = (q) => ({ matches: q.includes("reduce"), addEventListener() {}, removeEventListener() {} });
    const calm = revealedCard({});
    calm.setSnow("on");
    assert.equal(imageSrc(calm.card), "/local/snow.png");
    assert.equal(stubs.decodes.length, 0);
  } finally {
    window.matchMedia = savedMatch;
    stubs.restore();
  }
});

test("an image that does not load is not blended in", async () => {
  const stubs = fadeStubs();
  try {
    const { card, setSnow } = revealedCard({});
    setSnow("on");
    stubs.decodes[0].reject(new Error("404"));
    await tick();
    const imgs = slotImgs(card);
    assert.deepEqual(imgs.map((i) => i.getAttribute("src")), ["/local/snow.png"]);
    assert.equal(imgs[0].style.opacity, "0");
    assert.equal(stubs.anims.length, 0);
  } finally {
    stubs.restore();
  }
});

test("an image still loading when the card is removed is dropped", async () => {
  const stubs = fadeStubs();
  try {
    const { card, setSnow } = revealedCard({});
    setSnow("on");
    card.remove();
    stubs.decodes[0].resolve();
    await tick();
    assert.deepEqual(slotImgs(card).map((i) => i.getAttribute("src")), ["/local/house.png"]);
    assert.equal(stubs.anims.length, 0);
  } finally {
    stubs.restore();
  }
});

test("a blended image keeps the broken-image handling", async () => {
  const stubs = fadeStubs();
  try {
    const { card, setSnow } = revealedCard({});
    setSnow("on");
    stubs.decodes[0].resolve();
    await tick();
    const next = slotImgs(card)[0];
    next.onerror();
    assert.equal(next.style.opacity, "0");
    next.onload();
    assert.equal(next.style.opacity, "1");
  } finally {
    stubs.restore();
  }
});

test("image conditions can match an attribute", () => {
  const config = {
    image_day: "/local/house.png",
    image_conditions: [{ entity: "binary_sensor.snow_on_roof", attribute: "depth", state: 4, image_day: "/local/deep.png" }],
  };

  assert.equal(imageSrc(mountCard(config, snowHass("off"))), "/local/deep.png");
});

test("status_entity comes before the image conditions", () => {
  const config = { ...CONDITIONS, status_entity: "binary_sensor.door", status_day: "/local/open.png" };

  assert.equal(imageSrc(mountCard(config, snowHass("on"))), "/local/open.png");
});

test("broken image conditions are skipped", () => {
  const config = {
    image_day: "/local/house.png",
    image_conditions: [null, "x", { image_day: "/local/a.png" }, { entity: "binary_sensor.door" }, { entity: 5, image_day: "/local/b.png" }, { entity: "sensor.none", image_day: "/local/c.png" }],
  };

  assert.equal(imageSrc(mountCard(config)), "/local/house.png");
  assert.equal(imageSrc(mountCard({ ...config, image_conditions: "nope" })), "/local/house.png");
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
  // The drop pool is sized from the count, see precipCounts.
  assert.ok(card._rain.length >= precipCounts("rain", 70, 1, 1).rain);
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

test("unit_format replaces the unit Home Assistant puts on a live value", () => {
  // Like Home Assistant: weather attributes and sensor states come with their unit.
  const hass = makeHass({ states: { "sensor.room": { entity_id: "sensor.room", state: "21.4", attributes: { unit_of_measurement: "°C" } } } });
  hass.formatEntityAttributeValue = (entity, attribute) =>
    attribute === "temperature" ? `${entity.attributes.temperature} ${entity.attributes.temperature_unit}`
      : attribute === "humidity" ? `${entity.attributes.humidity} %` : `${entity.attributes[attribute]}`;
  const card = mountCard({ chips: [
    { entity: "weather.home", attribute: "temperature", unit_format: "°" },
    { entity: "sensor.room", unit_format: "°" },
    { entity: "weather.home", attribute: "humidity", unit_format: " pct" },
  ] }, hass);
  const text = chips(card).map((c) => c.querySelector(".chip-val").textContent.trim());
  const t = hass.states["weather.home"].attributes.temperature;
  const h = hass.states["weather.home"].attributes.humidity;
  assert.deepEqual(text, [`${t}°`, "21.4°", `${h}pct`]);
});

test("a centered free chip moves by its offset", () => {
  const card = mountCard({ chips: [
    { entity: "weather.home", attribute: "temperature", position: "custom", position_anchor: "center", position_x: "40px", position_y: "-10px" },
    { entity: "weather.home", attribute: "temperature", position: "custom", position_anchor: "top-center", position_x: "-20", position_y: "8px" },
    { entity: "weather.home", attribute: "temperature", position: "custom", position_anchor: "center-right", position_x: "12px", position_y: "5%" },
  ] });
  const free = [...card.shadowRoot.querySelectorAll(".chip-free")];
  assert.equal(free[0].style.left, "calc(50% + 40px)");
  assert.equal(free[0].style.top, "calc(50% + -10px)");
  assert.equal(free[1].style.left, "calc(50% + -20px)");
  assert.equal(free[1].style.top, "8px");
  assert.equal(free[2].style.right, "12px");
  assert.equal(free[2].style.top, "calc(50% + 5%)");
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

test("a chip area 100 % wide takes its whole row from the compass", () => {
  const pos = (cfg) => {
    const card = mountCard({ wind_compass: "arrow", ...cfg }, makeHass({ weather: "windy" }));
    runFrames(2);
    const cls = compassEl(card).firstElementChild.className;
    document.body.replaceChildren();
    return cls.match(/cmp-pos-([a-z-]+)/)[1];
  };
  // The row sits bottom center, 100 % wide: the arrow leaves the bottom left corner.
  assert.equal(pos({ chip_area_position: "bottom-center", chip_area_width: "100%", chips: [SENSOR] }), "top-left");
  // The second area, 100 % wide at the bottom, does the same.
  assert.equal(pos({ chip_area_position: "top-left", chip_area_2: { position: "bottom-left", width: "100%" }, chips: [SENSOR, { ...SENSOR, area: 2 }] }), "top-right");
});

test("an automatic compass measures the chips, hides without room and keeps a chosen place", () => {
  // Boxes in px for each place of the compass, and one chip under the bottom row.
  const BOX = { "bottom-left": [10, 150, 60, 190], "bottom-right": [340, 150, 390, 190], "bottom-center": [175, 150, 225, 190], "top-left": [10, 10, 60, 50], "top-right": [340, 10, 390, 50], "top-center": [175, 10, 225, 50] };
  const rect = ([l, t, r, b]) => ({ left: l, top: t, right: r, bottom: b, width: r - l, height: b - t });
  const stub = (card, chipBoxes) => {
    const box = compassEl(card).firstElementChild;
    box.getBoundingClientRect = () => rect(BOX[box.className.match(/cmp-pos-([a-z-]+)/)[1]]);
    const chips = [...card.shadowRoot.querySelectorAll(".chip")];
    chips.forEach((c, i) => (c.getBoundingClientRect = () => rect(chipBoxes[i] || [0, 0, 0, 0])));
  };
  const posOf = (card) => compassEl(card).firstElementChild.className.match(/cmp-pos-([a-z-]+)/)[1];
  // The chip row covers the whole bottom and the top left: top right is free.
  let card = mountCard({ wind_compass: "rose", chips: [SENSOR, { ...SENSOR, position: "custom", position_anchor: "top-left" }] }, makeHass({ weather: "windy" }));
  runFrames(2);
  stub(card, [[0, 140, 400, 200], [0, 0, 120, 60]]);
  card._fitCompass();
  assert.equal(posOf(card), "top-right");
  assert.equal(compassEl(card).hidden, false);
  // Chips everywhere: no compass, and the next update keeps it hidden.
  stub(card, [[0, 140, 400, 200], [0, 0, 400, 60]]);
  card._fitCompass();
  assert.equal(compassEl(card).hidden, true);
  card.hass = makeHass({ weather: "windy" });
  runFrames(2);
  assert.equal(compassEl(card).hidden, true);
  document.body.replaceChildren();
  // A chosen place is never moved, even over a chip.
  card = mountCard({ wind_compass: "rose", wind_compass_position: "bottom-left", chips: [SENSOR] }, makeHass({ weather: "windy" }));
  runFrames(2);
  stub(card, [[0, 140, 400, 200]]);
  card._fitCompass();
  assert.equal(posOf(card), "bottom-left");
  assert.equal(compassEl(card).hidden, false);
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

test("your own sensors drive the wind, and a change of a sensor updates the card", () => {
  const hass = makeHass();
  hass.states["sensor.station_wind"] = { entity_id: "sensor.station_wind", state: "10", attributes: { unit_of_measurement: "mph" } };
  hass.states["sensor.station_dir"] = { entity_id: "sensor.station_dir", state: "270", attributes: { unit_of_measurement: "°", device_class: "wind_direction" } };
  const card = mountCard({
    wind_speed_entity: "sensor.station_wind",
    wind_bearing_entity: "sensor.station_dir",
    chips: [{ entity: "sensor.station_dir", bearing_format: "cardinal", bearing_speed: true }],
  }, hass);
  assert.ok(Math.abs(card._windKmh - 16.09) < 0.01, String(card._windKmh));
  assert.equal(card._windBearing, 270);
  // The wind direction sensor chip shows the station speed in its unit.
  assert.match(text(chips(card)[0]), /W · 10 mph/);
  // Only the sensor changes, not the weather entity: the card follows.
  card.hass = { ...hass, states: { ...hass.states, "sensor.station_dir": { ...hass.states["sensor.station_dir"], state: "90" } } };
  assert.equal(card._windBearing, 90);
  // Unavailable: back to the weather entity.
  card.hass = { ...hass, states: { ...hass.states, "sensor.station_dir": { ...hass.states["sensor.station_dir"], state: "unavailable" } } };
  assert.equal(card._windBearing, Number(hass.states["weather.home"].attributes.wind_bearing));
});

test("clouds and rain move with the wind in km/h, whatever the unit", () => {
  const speed = (wind_speed, wind_speed_unit) => {
    const hass = makeHass();
    hass.states["weather.home"] = { ...hass.states["weather.home"], attributes: { ...hass.states["weather.home"].attributes, wind_speed, wind_speed_unit } };
    document.body.replaceChildren();
    return mountCard({}, hass)._windSpeed;
  };
  // 5 m/s is 18 km/h, not 5.
  assert.ok(Math.abs(speed(5, "m/s") - 1.8) < 1e-9);
  assert.ok(Math.abs(speed(18, "km/h") - 1.8) < 1e-9);
  assert.equal(speed(40, "mph"), 2);
});

test("the system time format follows the browser", async () => {
  const { timeFormatOptions } = await import("../src/atmo-weather-helpers.js");
  const h12 = new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hour12;
  assert.deepEqual(timeFormatOptions({ time_format: "system" }), h12 ? { hour12: true } : { hourCycle: "h23" });
  assert.deepEqual(timeFormatOptions(undefined), {});
});

test("effect_golden_hour off also turns off the warm glow of a low sun", () => {
  const hass = makeHass();
  hass.states["sun.sun"] = { entity_id: "sun.sun", state: "above_horizon", attributes: { elevation: 4 } };
  hass.states["weather.home"] = { ...hass.states["weather.home"], state: "sunny" };
  const wash = (cfg) => {
    document.body.replaceChildren();
    const card = mountCard({ sun_entity: "sun.sun", ...cfg }, hass);
    return Number(card._elements.root.style.getPropertyValue("--gh-wash") || 0);
  };
  assert.ok(wash({}) > 0);
  assert.equal(wash({ effect_golden_hour: false }), 0);
});

test("embedded cards without Home Assistant's card helpers leave the card running", () => {
  const saved = window.loadCardHelpers;
  delete window.loadCardHelpers;
  try {
    const card = mountCard({ custom_cards: [{ type: "entities", entities: [] }] });
    assert.ok(card._renderState || card._elements, "the card still renders");
    assert.equal(card._customCardElements.length, 0);
  } finally {
    if (saved) window.loadCardHelpers = saved;
  }
});

test("the moon phase follows the date without a moon sensor", async () => {
  const { moonPhaseAt } = await import("../src/atmo-weather-helpers.js");
  // New moon 2024-01-11 11:57 UTC, first quarter 01-18, full moon 01-25, last quarter 02-02.
  // The mean month puts the quarters up to a day off, so they show 0.44 to 0.56.
  const at = (iso) => moonPhaseAt(new Date(iso));
  assert.equal(at("2024-01-11T12:00:00Z").state, "new_moon");
  assert.ok(at("2024-01-11T12:00:00Z").illumination <= 0.01);
  assert.equal(at("2024-01-18T04:00:00Z").state, "first_quarter");
  assert.equal(at("2024-01-18T04:00:00Z").direction, "right");
  assert.ok(Math.abs(at("2024-01-18T04:00:00Z").illumination - 0.5) < 0.08);
  assert.equal(at("2024-01-25T18:00:00Z").state, "full_moon");
  assert.ok(at("2024-01-25T18:00:00Z").illumination >= 0.99);
  assert.equal(at("2024-02-02T23:00:00Z").state, "last_quarter");
  assert.equal(at("2024-02-02T23:00:00Z").direction, "left");
  // Dates before the reference new moon work too.
  assert.equal(at("1999-12-08T00:00:00Z").state, "new_moon");
});

test("a moon sensor wins, and without a usable one the card computes the phase", () => {
  const hass = makeHass({ states: { "sensor.moon": { entity_id: "sensor.moon", state: "waxing_crescent", attributes: {} } } });
  const card = mountCard({ moon_phase_entity: "sensor.moon" }, hass);
  assert.equal(card._moonPhaseState, "waxing_crescent");
  assert.equal(card._moonPhaseConfig.illumination, 0.25);

  card._updateMoonPhase({ state: "unavailable" }, new Date("2024-01-25T18:00:00Z"));
  assert.equal(card._moonPhaseState, "full_moon");
  assert.ok(card._moonPhaseConfig.illumination >= 0.99);

  card._updateMoonPhase(null, new Date("2024-01-18T04:00:00Z"));
  assert.equal(card._moonPhaseState, "first_quarter");
  // Back on the sensor, even when it reports the phase it had before.
  card._updateMoonPhase({ state: "waxing_crescent" });
  assert.equal(card._moonPhaseState, "waxing_crescent");
  assert.equal(card._moonPhaseConfig.illumination, 0.25);

  const plain = mountCard({});
  assert.ok(plain._moonPhaseConfig.illumination >= 0 && plain._moonPhaseConfig.illumination <= 1);
  assert.ok(["left", "right", "none"].includes(plain._moonPhaseConfig.direction));
});

test("date codes print dates and times like Home Assistant templates", async () => {
  const { formatDateCodes, hasDateCodes, fcLabel } = await import("../src/atmo-weather-helpers.js");
  const d = new Date(2026, 10, 5, 7, 4, 9);
  assert.equal(formatDateCodes(d, "%d.%m.%Y %H:%M:%S", "en"), "05.11.2026 07:04:09");
  assert.equal(formatDateCodes(d, "%-d.%-m. %-H:%M %y", "en"), "5.11. 7:04 26");
  assert.equal(formatDateCodes(d, "%a %A %b %B", "en"), "Thu Thursday Nov November");
  assert.equal(formatDateCodes(d, "%a", "de"), "Do");
  assert.equal(formatDateCodes(new Date(2026, 10, 5, 0, 30), "%I:%M %p", "en"), "12:30 AM");
  assert.equal(formatDateCodes(new Date(2026, 10, 5, 13, 30), "%I %p 100%%", "en"), "01 PM 100%");
  assert.equal(formatDateCodes("nonsense", "%d", "en"), "");
  assert.equal(formatDateCodes(d, "%d", "not-a-locale-!!"), "05");
  assert.ok(hasDateCodes("%a") && !hasDateCodes("plain") && !hasDateCodes(undefined) && !hasDateCodes("100%"));
  assert.equal(fcLabel(d.toISOString(), true, "en", undefined, "%a %-d."), "Thu 5.");
  // Without a code the usual label stays.
  assert.equal(fcLabel(d.toISOString(), true, "en", undefined, "Day"), "Thu");
});

test("date_format changes the label of a forecast chip and a time value", async () => {
  const hass = makeHass();
  const push = {};
  hass.connection.subscribeMessage = async (callback, message) => {
    push[message.forecast_type] = callback;
    return () => {};
  };
  const sunrise = new Date(2026, 10, 20, 7, 41);
  hass.states["sun.sun"].attributes.next_rising = sunrise.toISOString();
  const card = mountCard({
    chips: [
      { entity: "weather.home", forecast: "daily", attribute: "temperature", forecast_offset: 1, date_format: "%A" },
      { entity: "sun.sun", attribute: "next_rising", date_format: "%H:%M" },
      { entity: "sun.sun", attribute: "next_rising" },
    ],
  }, hass);
  await Promise.resolve();
  const day = 864e5;
  const tomorrow = new Date(Date.now() + day);
  push.daily({ forecast: [0, 1, 2].map((n) => ({ datetime: new Date(Date.now() + n * day).toISOString(), temperature: 10 + n, condition: "rainy" })) });

  assert.ok(text(chips(card)[0]).includes(tomorrow.toLocaleDateString("en", { weekday: "long" })));
  assert.ok(text(chips(card)[1]).includes("07:41"));
  assert.ok(!text(chips(card)[2]).includes("07:41") || text(chips(card)[2]) !== text(chips(card)[1]));
});

test("the card tells card_mod styles where the sun is and what the weather is", () => {
  const hass = makeHass({ weather: "partlycloudy" });
  Object.assign(hass.states["sun.sun"].attributes, { elevation: 30, azimuth: 90 });
  const card = mountCard({}, hass);
  const v = (name) => card.style.getPropertyValue(name);
  assert.equal(v("--awc-sun-x"), "1.000");
  assert.equal(v("--awc-sun-y"), "0.000");
  assert.equal(v("--awc-sun-elevation"), "30.0");
  assert.equal(v("--awc-sun-shadow"), "1.732");
  assert.equal(Number(v("--awc-sun-light")), 0.75);
  assert.equal(card.dataset.condition, "partlycloudy");
  assert.equal(card.dataset.daytime, "day");

  // Night: no light and no shadow, the night weather.
  const night = makeHass({ weather: "sunny", sun: "below_horizon" });
  Object.assign(night.states["sun.sun"].attributes, { elevation: -10, azimuth: 300 });
  card.hass = night;
  assert.equal(v("--awc-sun-light"), "0.000");
  assert.equal(v("--awc-sun-shadow"), "0.000");
  assert.equal(card.dataset.condition, "clear-night");
  assert.equal(card.dataset.daytime, "night");

  // Without a sun position the variables go away.
  const none = makeHass({ weather: "rainy" });
  delete none.states["sun.sun"].attributes.azimuth;
  card.hass = none;
  assert.equal(v("--awc-sun-x"), "");
  assert.equal(v("--awc-sun-light"), "");
});

test("a chip with visibility conditions shows only while they hold", () => {
  const hass = makeHass({ states: { "input_boolean.guest": { entity_id: "input_boolean.guest", state: "off", attributes: {} } } });
  const card = mountCard({
    chips: [
      SENSOR,
      { entity: "weather.home", attribute: "humidity", name: "Hum", visibility: [{ condition: "state", entity: "input_boolean.guest", state: "on" }] },
      { entity: "weather.home", attribute: "wind_speed", name: "Wind", visibility: [{ condition: "numeric_state", entity: "weather.home", attribute: "humidity", above: 50 }] },
    ],
  }, hass);
  assert.deepEqual(chips(card).map((c) => text(c).includes("Hum")), [false, false]);
  assert.ok(text(chips(card)[1]).includes("Wind"));

  const guest = { ...hass.states["input_boolean.guest"], state: "on" };
  card.hass = { ...hass, states: { ...hass.states, "input_boolean.guest": guest } };

  assert.equal(chips(card).length, 3);
  assert.ok(text(chips(card)[1]).includes("Hum"));
});

test("a screen condition follows the media query", () => {
  const saved = globalThis.matchMedia;
  const listeners = new Set();
  let wide = false;
  globalThis.matchMedia = (q) => ({
    media: q,
    get matches() {
      return wide;
    },
    addEventListener: (_, fn) => listeners.add(fn),
    removeEventListener: (_, fn) => listeners.delete(fn),
  });
  try {
    const card = mountCard({
      chips: [SENSOR, { entity: "weather.home", attribute: "humidity", name: "Hum", visibility: [{ condition: "screen", media_query: "(min-width: 768px)" }] }],
    });
    assert.equal(chips(card).length, 1);
    wide = true;
    for (const fn of listeners) fn();
    assert.equal(chips(card).length, 2);
    card.remove();
    assert.equal(listeners.size, 0);
  } finally {
    globalThis.matchMedia = saved;
  }
});

test("the css option puts own styles last into the card and follows changes", () => {
  const card = mountCard({ css: ".chip { color: red; }" });
  const own = () => card.shadowRoot.querySelector("#awc-own-css");
  assert.equal(own().textContent, ".chip { color: red; }");
  assert.equal(card.shadowRoot.lastElementChild, own());
  card.setConfig({ weather_entity: "weather.home", css: ":host { --awc-bottom-font-size: 20px; }" });
  assert.equal(own().textContent, ":host { --awc-bottom-font-size: 20px; }");
  assert.equal(card.shadowRoot.querySelectorAll("#awc-own-css").length, 1);
  card.setConfig({ weather_entity: "weather.home" });
  assert.equal(own(), null);
  // Not a string: ignored.
  card.setConfig({ weather_entity: "weather.home", css: { a: 1 } });
  assert.equal(own(), null);
});

test("image_folder picks the picture for the weather, with fallbacks and the base image", async () => {
  const card = document.createElement("atmo-weather-card");
  const files = new Set(["/local/h/rainy.webp", "/local/h/sunny.webp"]);
  const asked = [];
  card._probeImage = (url) => {
    asked.push(url);
    return Promise.resolve(files.has(url));
  };
  card.setConfig({ weather_entity: "weather.home", sun_entity: "sun.sun", image_folder: "/local/h", image_day: "/local/base.png", image_transition: 0 });
  document.body.append(card);
  const settle = async () => {
    for (let i = 0; i < 6; i++) await Promise.resolve();
  };
  const hass = makeHass({ weather: "pouring" });
  card.hass = hass;
  await settle();
  // pouring.webp is missing, rainy.webp is there.
  assert.equal(imageSrc(card), "/local/h/rainy.webp");
  assert.deepEqual(asked, ["/local/h/pouring.webp", "/local/h/rainy.webp"]);
  card.hass = { ...hass, states: { ...hass.states, "weather.home": { ...hass.states["weather.home"], state: "fog" } } };
  await settle();
  // No fog picture: the day image.
  assert.equal(imageSrc(card), "/local/base.png");
  // Every file is asked once only.
  card.hass = hass;
  await settle();
  assert.equal(asked.filter((u) => u === "/local/h/pouring.webp").length, 1);
});

test("an image condition wins over the picture folder", async () => {
  const card = document.createElement("atmo-weather-card");
  card._probeImage = () => Promise.resolve(true);
  const hass = snowHass("on", { weather: "sunny" });
  card.setConfig({ weather_entity: "weather.home", sun_entity: "sun.sun", ...CONDITIONS, image_folder: "/local/h2", image_transition: 0 });
  document.body.append(card);
  card.hass = hass;
  for (let i = 0; i < 6; i++) await Promise.resolve();
  assert.equal(imageSrc(card), "/local/snow.png");
});

test("a screen change while the card is away counts once it is back", () => {
  const saved = globalThis.matchMedia;
  let wide = false;
  globalThis.matchMedia = () => ({ get matches() { return wide; }, addEventListener() {}, removeEventListener() {} });
  try {
    const card = mountCard({
      chips: [SENSOR, { entity: "weather.home", attribute: "humidity", name: "Hum", visibility: [{ condition: "screen", media_query: "(min-width: 768px)" }] }],
    });
    assert.equal(chips(card).length, 1);
    // Home Assistant moves the card to another column on resize.
    card.remove();
    wide = true;
    document.body.append(card);
    assert.equal(chips(card).length, 2);
  } finally {
    globalThis.matchMedia = saved;
  }
});

test("forecast_curve draws over the forecast temperature chips", async () => {
  const proto = window.HTMLElement.prototype;
  const saved = proto.getBoundingClientRect;
  proto.getBoundingClientRect = function () {
    const i = Number(this.dataset && this.dataset.idx);
    if (Number.isFinite(i)) return { left: i * 100, width: 80, top: 0, height: 60, right: i * 100 + 80, bottom: 60 };
    return { left: 0, width: 600, top: 0, height: 100, right: 600, bottom: 100 };
  };
  try {
    const hass = makeHass();
    const push = {};
    hass.connection.subscribeMessage = async (callback, message) => {
      push[message.forecast_type] = callback;
      return () => {};
    };
    const fc = (o) => ({ entity: "weather.home", forecast: "daily", forecast_offset: o, attribute: "temperature" });
    const card = mountCard({ forecast_curve: "band", chips: [SENSOR, fc(1), fc(2), fc(3), { ...fc(4), attribute: "humidity" }] }, hass);
    await Promise.resolve();
    push.daily({ forecast: [0, 1, 2, 3, 4].map((n) => ({ datetime: new Date(Date.now() + n * 864e5).toISOString(), temperature: 10 + n * 2, templow: 3 + n, humidity: 50, condition: "rainy" })) });
    runFrames(2);
    const svg = card.shadowRoot.querySelector("#chips-group > #forecast-curve");
    assert.ok(svg);
    // Three temperature chips, high and low each: six dots.
    assert.equal(svg.querySelectorAll("circle").length, 6);
    const dots = [...svg.querySelectorAll("circle")].map((c) => Number(c.getAttribute("cx")));
    assert.deepEqual([...new Set(dots)], [140, 240, 340]);
    card.setConfig({ weather_entity: "weather.home", sun_entity: "sun.sun", chips: [SENSOR, fc(1), fc(2)] });
    runFrames(2);
    assert.equal(card.shadowRoot.querySelector("#forecast-curve"), null);
  } finally {
    proto.getBoundingClientRect = saved;
  }
});

test("the tick ring shows the speed with its unit below", () => {
  const card = mountCard({ wind_compass: "ticks", wind_compass_speed: true, wind_compass_cardinal: false }, makeHass({ weather: "windy" }));
  runFrames(2);
  const el = card.shadowRoot.querySelector("#wind-compass");
  assert.ok(el.querySelector(".cmp-style-ticks.cmp-pos-top-right"));
  assert.deepEqual([...el.querySelectorAll(".cmp-label span")].map((s) => [s.textContent, s.className]), [["20", ""], ["km/h", "cmp-unit"]]);
});

test("chips with area 2 go to the second chip area with its own place and look", () => {
  const card = mountCard({
    chip_area_background: true,
    chip_area_columns: 3,
    chip_area_layout: "grid",
    chip_area_2: { position: "bottom-right", layout: "grid", columns: 2 },
    chips: [SENSOR, { entity: "weather.home", attribute: "humidity", name: "Hum", area: 2 }, { entity: "weather.home", attribute: "wind_speed", name: "Wind", area: 2 }],
  });
  const row2 = card.shadowRoot.querySelector("#chips-row-2");
  const group2 = card.shadowRoot.querySelector("#chips-group-2");
  assert.equal(row(card).querySelectorAll(".chip").length, 1);
  assert.equal(row2.querySelectorAll(".chip").length, 2);
  assert.equal(group2.style.display, "");
  assert.ok(group2.classList.contains("pos-bottom-right"));
  assert.ok(row2.classList.contains("row-grid"));
  assert.equal(group2.style.getPropertyValue("--awc-row-columns"), "2");
  // Unset: not the first area's value from the card.
  assert.equal(group2.style.getPropertyValue("--awc-bottom-gap"), "initial");
  // The first area has a background, the second not.
  assert.ok(row(card).querySelector(".chip").classList.contains("with-bg"));
  assert.ok(!row2.querySelector(".chip").classList.contains("with-bg"));
  // A tap on a chip of the second area works like any other.
  const fired = [];
  card.addEventListener("hass-action", (e) => fired.push(e.detail.config.entity));
  row2.querySelector(".chip").click();
  assert.deepEqual(fired, ["weather.home"]);
  // Without area 2 chips the second area hides.
  card.setConfig({ weather_entity: "weather.home", sun_entity: "sun.sun", chips: [SENSOR] });
  card.hass = makeHass({ weather: "rainy" });
  assert.equal(group2.style.display, "none");
});

test("the temperature curve uses the second area when only it has forecast temperatures", async () => {
  const proto = window.HTMLElement.prototype;
  const saved = proto.getBoundingClientRect;
  proto.getBoundingClientRect = function () {
    const i = Number(this.dataset && this.dataset.idx);
    if (Number.isFinite(i)) return { left: i * 100, width: 80, top: 0, height: 60, right: i * 100 + 80, bottom: 60 };
    return { left: 0, width: 600, top: 0, height: 100, right: 600, bottom: 100 };
  };
  try {
    const hass = makeHass();
    const push = {};
    hass.connection.subscribeMessage = async (callback, message) => {
      push[message.forecast_type] = callback;
      return () => {};
    };
    const fc = (o) => ({ entity: "weather.home", forecast: "hourly", forecast_offset: o, attribute: "temperature", area: 2 });
    const card = mountCard({ forecast_curve: "soft", chip_area_2: { position: "top-left" }, chips: [SENSOR, fc(1), fc(2), fc(3)] }, hass);
    await Promise.resolve();
    push.hourly({ forecast: [0, 1, 2, 3].map((n) => ({ datetime: new Date(Date.now() + (n + 1) * 36e5).toISOString(), temperature: 10 + n, condition: "rainy" })) });
    runFrames(2);
    const svg = card.shadowRoot.querySelector("#chips-group-2 > #forecast-curve");
    assert.ok(svg);
    // The area sits at the top, so the curve goes below it.
    assert.ok(svg.classList.contains("below"));
    assert.equal(svg.querySelectorAll("circle").length, 3);
  } finally {
    proto.getBoundingClientRect = saved;
  }
});
