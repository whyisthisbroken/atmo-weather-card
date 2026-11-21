import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { errors, makeHass, mountCard, resizeAll, runFrames } from "./helpers/dom.js";
import {
  applyCardLayout,
  CARD_LAYOUTS,
  CONFIG_DEFAULTS,
  layoutDefaults,
} from "../src/atmo-weather-config.js";
import { CLOUD_PALETTES } from "../src/atmo-weather-data.js";
import { layoutChipLabel } from "../src/atmo-weather-helpers.js";
import { makeTranslator } from "../src/atmo-weather-i18n.js";
import { drawRain, drawSnow } from "../src/atmo-weather-precip.js";

await import("../src/atmo-weather-card.js");
const Card = customElements.get("atmo-weather-card");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), []);
});

test("without a known layout the config stays as it is", () => {
  const cfg = { weather_entity: "weather.home", card_height: 150 };
  assert.equal(applyCardLayout(cfg), cfg);
  assert.equal(applyCardLayout({ ...cfg, card_layout: "huge" }).chips, undefined);
  assert.equal(layoutDefaults("nope"), null);
});

test("every layout brings a height, a sky position and chips on the weather entity", () => {
  for (const layout of CARD_LAYOUTS) {
    const cfg = applyCardLayout({ weather_entity: "weather.garden", card_layout: layout });
    assert.ok(cfg.card_height > 0, layout);
    assert.ok(cfg.celestial_alignment, layout);
    assert.ok(cfg.chips.length >= 3, layout);
    for (const chip of cfg.chips) {
      // Home and Panel show the sunset of the sun entity.
      assert.ok(["weather.garden", "sun.sun"].includes(chip.entity), layout);
      assert.ok(!("name" in chip) || typeof chip.name === "string", layout);
    }
  }
  // The sunset follows the card's sun entity.
  const home = applyCardLayout({ weather_entity: "weather.garden", sun_entity: "sun.garden", card_layout: "home" });
  assert.ok(home.chips.some((c) => c.entity === "sun.garden" && c.attribute === "next_setting"));
  // Panel puts the next hours into the second chip area under a soft curve.
  const panel = applyCardLayout({ weather_entity: "weather.garden", card_layout: "panel" });
  assert.equal(panel.chips.filter((c) => c.area === 2).length, 5);
  assert.equal(panel.forecast_curve, "soft");
  assert.equal(panel.chip_area_2.position, "bottom-left");
  assert.equal(home.wind_compass, "ticks");
  // Upper case and spaces are fine.
  assert.equal(applyCardLayout({ card_layout: " Compact " }).card_height, 96);
});

test("the wide layout turns into the standard one on a narrow card", () => {
  assert.equal(applyCardLayout({ card_layout: "wide" }, 400).chip_area_layout, undefined);
  assert.equal(applyCardLayout({ card_layout: "wide" }, 400).card_height, 200);
  assert.equal(applyCardLayout({ card_layout: "wide" }, 900).chip_area_layout, "grid");
  assert.equal(applyCardLayout({ card_layout: "wide" }).chip_area_layout, "grid");
  assert.equal(applyCardLayout({ card_layout: "compact" }, 300).card_height, 96);
  const card = mountCard({ card_layout: "wide" });
  card._layoutWidth = 900;
  assert.equal(card._layoutNeedsWidth(400), true);
  card._layoutWidth = 400;
  assert.equal(card._layoutNeedsWidth(450), false);
  assert.equal(card._layoutNeedsWidth(800), true);
});

test("a wide card in a narrow column still starts and draws", () => {
  // Regression: switching to standard on the first resize skipped the canvas setup,
  // so the card stayed empty.
  const card = mountCard({ card_layout: "wide" });
  assert.equal(card._layoutWidth, 400);
  assert.equal(card._config.chip_area_layout, undefined);
  assert.equal(card._initializationComplete, true);
  assert.ok(card._elements.bg.width > 0);
});

test("own values and own chips win over the layout", () => {
  const own = [{ entity: "sensor.x" }];
  const cfg = applyCardLayout({ weather_entity: "weather.home", card_layout: "wide", card_height: 180, chips: own });
  assert.equal(cfg.card_height, 180);
  assert.equal(cfg.chips, own);
  assert.equal(cfg.chip_area_layout, "grid");
  // An empty chip list counts as no chips.
  assert.ok(applyCardLayout({ card_layout: "wide", chips: [] }).chips.length > 0);
});

test("a new card starts from the standard layout, with the moon when there is one", () => {
  const hass = makeHass();
  hass.states["sensor.moon_phase"] = { entity_id: "sensor.moon_phase", state: "full_moon", attributes: {} };
  const config = Card.getStubConfig(hass);
  assert.deepEqual(config, {
    weather_entity: "weather.home",
    sun_entity: "sun.sun",
    moon_phase_entity: "sensor.moon_phase",
    theme_entity: "sun.sun",
    card_layout: "standard",
  });
  assert.equal(Card.getStubConfig(makeHass()).moon_phase_entity, undefined);
});

test("Home Assistant gets a suggestion per layout for a weather entity", () => {
  const entry = window.customCards.find((c) => c.type === "atmo-weather-card");
  assert.equal(entry.preview, true);
  const hass = makeHass();
  const list = entry.getEntitySuggestion(hass, "weather.home");
  assert.deepEqual(list.map((s) => s.label), ["Standard", "Compact", "Wide", "Home", "Panel"]);
  assert.equal(list[1].config.type, "custom:atmo-weather-card");
  assert.equal(list[1].config.card_layout, "compact");
  assert.equal(list[2].config.weather_entity, "weather.home");
  assert.equal(entry.getEntitySuggestion(hass, "sensor.temperature"), null);
  assert.equal(entry.getEntitySuggestion(hass, undefined), null);
});

test("the card runs every layout", () => {
  for (const layout of CARD_LAYOUTS) {
    const card = mountCard({ card_layout: layout }, makeHass({ weather: "rainy" }));
    runFrames(5);
    assert.ok(card.shadowRoot.querySelectorAll(".chip").length >= 3, layout);
    document.body.replaceChildren();
  }
});

test("spill is off by default and opens a canvas below the card when on", () => {
  assert.equal(CONFIG_DEFAULTS.effect_spill, false);
  const off = mountCard({}, makeHass({ weather: "rainy" }));
  runFrames(3);
  assert.equal(off.classList.contains("spill"), false);
  assert.equal(off.shadowRoot.getElementById("spill-canvas").hidden, true);
  assert.equal(off._spill, null);
  document.body.replaceChildren();

  const on = mountCard({ effect_spill: true }, makeHass({ weather: "rainy" }));
  runFrames(3);
  assert.equal(on.classList.contains("spill"), true);
  const canvas = on.shadowRoot.getElementById("spill-canvas");
  assert.equal(canvas.hidden, false);
  assert.ok(on._spill && on._spill.h > 0);
  // Turned off again, the canvas goes away.
  on.setConfig({ ...on._config, effect_spill: false });
  runFrames(2);
  assert.equal(canvas.hidden, true);
  assert.equal(on._spill, null);
});

function spillCtx() {
  const c = { drawImageCalls: 0, globalAlpha: 1 };
  for (const m of ["translate", "rotate", "setTransform", "beginPath", "moveTo", "lineTo", "quadraticCurveTo", "closePath", "arc", "fill", "stroke"]) c[m] = () => {};
  c.drawImage = () => c.drawImageCalls++;
  c.createLinearGradient = () => ({ addColorStop() {} });
  return c;
}
function particleCard(extra) {
  return {
    _layerFadeProgress: { precipitation: 1 },
    _animationSpeed: 1,
    _frameScale: 1,
    _cachedDimensions: { dpr: 1 },
    _isLightBackground: false,
    _params: { atmosphere: "rain" },
    _renderState: { rainRgb: "1,2,3" },
    _rainStreakTex: {},
    _rainStreakRgb: "1,2,3",
    _flakeTex: {},
    _hass: { themes: { darkMode: true } },
    _rain: [],
    _snow: [],
    _splashes: [],
    _settled: [],
    ...extra,
  };
}

test("with spill, drops and flakes fall on below the card and fade there", () => {
  const s = spillCtx();
  const drop = { kind: "rain", x: 50, y: 120, dw: 2, len: 20, v: 450, op: 1, splash: false };
  const card = particleCard({ _spill: { ctx: s, h: 90 }, _rain: [drop] });
  drawRain(card, spillCtx(), 100, 100, 0);
  assert.ok(drop.y > 120, "the drop keeps falling past the edge");
  assert.equal(s.drawImageCalls, 1);
  assert.equal(s.globalAlpha, 1);
  // Without spill the same drop starts again at the top.
  const plain = { ...drop, y: 125 };
  drawRain(particleCard({ _rain: [plain] }), spillCtx(), 100, 100, 0);
  assert.ok(plain.y < 0);

  const s2 = spillCtx();
  const flake = { x: 50, y: 130, d: 4, depth: 0.5, v: 30, op: 1, swing: 0, swingRate: 0, settles: false };
  drawSnow(particleCard({ _spill: { ctx: s2, h: 90 }, _snow: [flake], _precip: { snowEdge: false } }), spillCtx(), 100, 100, 0);
  assert.ok(flake.y > 130);
  assert.equal(s2.drawImageCalls, 1);
});

test("the text veil is on by default, follows the chip row and can be switched off", () => {
  assert.equal(CONFIG_DEFAULTS.effect_text_scrim, true);
  const card = mountCard({});
  const root = card.shadowRoot.getElementById("card-root");
  assert.ok(root.classList.contains("scrim"));
  assert.ok(!root.classList.contains("scrim-top"));
  card.setConfig({ ...card._config, chip_area_position: "top-right" });
  assert.ok(root.classList.contains("scrim-top"));
  card.setConfig({ ...card._config, effect_text_scrim: false });
  assert.ok(!root.classList.contains("scrim"));
});

test("thunderstorms by day get dark clouds and light rain", () => {
  assert.ok(CLOUD_PALETTES.lightThunder[6] < CLOUD_PALETTES.lightStorm[6]);
  const storm = mountCard({}, makeHass({ weather: "lightning-rainy" }));
  runFrames(3);
  assert.equal(storm._renderState.rainRgb, "210, 225, 255");
  document.body.replaceChildren();
  const rain = mountCard({}, makeHass({ weather: "rainy" }));
  runFrames(3);
  assert.equal(rain._renderState.rainRgb, "58, 72, 100");
});

test("layout readings take Home Assistant's label and stay away without a value", () => {
  const hass = makeHass({ weather: "rainy" });
  hass.formatEntityAttributeName = (st, a) => ({ humidity: "Luftfeuchtigkeit", wind_speed: "Windgeschwindigkeit" })[a] || "";
  delete hass.states["weather.home"].attributes.pressure;
  const card = mountCard({ card_layout: "wide" }, hass);
  runFrames(3);
  const text = [...card.shadowRoot.querySelectorAll(".chip")].map((c) => c.textContent).join("|");
  assert.match(text, /Luftfeuchtigkeit/);
  assert.doesNotMatch(text, /Pressure|N\/A/);
  document.body.replaceChildren();
  // Without the function the English fallback shows.
  const plain = mountCard({ card_layout: "standard" }, makeHass({ weather: "rainy" }));
  runFrames(3);
  const names = [...plain.shadowRoot.querySelectorAll(".chip-name")].map((c) => c.textContent);
  assert.ok(names.includes("Humidity"), names.join(","));
});

test("a layout tile takes the card's own word where Home Assistant has no translation", () => {
  // Home Assistant without a German name for next_setting returns the key in words.
  const hass = makeHass({ language: "de" });
  hass.formatEntityAttributeName = (st, a) => ({ humidity: "Luftfeuchtigkeit", next_setting: "Next setting", wind_bearing: "Windrichtung" })[a] || "";
  const card = mountCard({ card_layout: "panel" }, hass);
  runFrames(3);
  const names = [...card.shadowRoot.querySelectorAll(".chip-name")].map((c) => c.textContent.trim());
  assert.ok(names.includes("Sonnenuntergang"), names.join(","));
  assert.ok(names.includes("Luftfeuchtigkeit"), names.join(","));
  assert.ok(!names.includes("Next setting"), names.join(","));
  document.body.replaceChildren();
  // In English Home Assistant's label stays.
  const en = makeHass();
  en.formatEntityAttributeName = (st, a) => ({ next_setting: "Next setting" })[a] || "";
  const enCard = mountCard({ card_layout: "panel" }, en);
  runFrames(3);
  assert.ok([...enCard.shadowRoot.querySelectorAll(".chip-name")].some((c) => c.textContent.trim() === "Next setting"));
});

test("layoutChipLabel keeps real translations and words it has none for", () => {
  const de = makeTranslator("de");
  assert.equal(layoutChipLabel("Next setting", "next_setting", "Sunset", "de", de), "Sonnenuntergang");
  assert.equal(layoutChipLabel("Nächster Untergang", "next_setting", "Sunset", "de", de), "Nächster Untergang");
  assert.equal(layoutChipLabel("Next setting", "next_setting", "Sunset", "fr", makeTranslator("fr")), "Next setting");
  assert.equal(layoutChipLabel("Next setting", "next_setting", "Sunset", "en", makeTranslator("en")), "Next setting");
  assert.equal(layoutChipLabel("", "precipitation_probability", "Rain", "de", de), "Regen");
});

test("panel's rain tile stays away when the forecast has no rain probability", async () => {
  const day = 864e5;
  const feed = (withRain) => {
    const hass = makeHass();
    Object.assign(hass.states["weather.home"].attributes, { uv_index: 3, pressure: 1016 });
    hass.connection.subscribeMessage = async (callback, message) => {
      if (message.forecast_type === "daily")
        setTimeout(() => callback({ forecast: [0, 1].map((n) => ({ datetime: new Date(Date.now() + n * day).toISOString(), temperature: 14, templow: 6, condition: "rainy", ...(withRain ? { precipitation_probability: 70 } : {}) })) }), 0);
      return () => {};
    };
    return hass;
  };
  for (const withRain of [false, true]) {
    document.body.replaceChildren();
    const card = mountCard({ card_layout: "panel" }, feed(withRain));
    await new Promise((r) => setTimeout(r, 5));
    runFrames(3);
    const text = [...card.shadowRoot.querySelectorAll(".chip")].map((c) => c.textContent).join("|");
    assert.doesNotMatch(text, /N\/A/);
    // Four tiles in two rows: with the rain chance the pressure stays away,
    // without it the pressure takes the free place.
    const tiles = [...card.shadowRoot.querySelectorAll("#chips-row .chip")].map((c) => c.textContent);
    assert.equal(tiles.length, 4, tiles.join("|"));
    if (withRain) {
      assert.match(tiles.join("|"), /70/);
      assert.doesNotMatch(tiles.join("|"), /Pressure|1016/);
    } else assert.match(tiles.join("|"), /Pressure|1016/);
  }
});

test("a forecast chip past the end of the forecast stays away", async () => {
  const hass = makeHass();
  hass.connection.subscribeMessage = async (callback, message) => {
    if (message.forecast_type === "daily")
      setTimeout(() => callback({ forecast: [0, 1, 2].map((n) => ({ datetime: new Date(Date.now() + n * 864e5).toISOString(), temperature: 10 + n, condition: "sunny" })) }), 0);
    return () => {};
  };
  const day = (forecast_offset) => ({ entity: "weather.home", forecast: "daily", attribute: "temperature", forecast_offset });
  const card = mountCard({ chips: [day(1), day(2), day(3), day(5)] }, hass);
  await new Promise((r) => setTimeout(r, 5));
  runFrames(3);
  const vals = [...card.shadowRoot.querySelectorAll(".chip")].map((c) => c.textContent.replace(/\D+/g, " ").trim());
  // Day 2 and 3 exist, day 4 and 6 do not: no second copy of day 3.
  assert.equal(vals.length, 2, vals.join("|"));
});

test("wide's tomorrow tile writes the low with the same short degree sign", async () => {
  const hass = makeHass();
  hass.connection.subscribeMessage = async (callback, message) => {
    if (message.forecast_type === "daily")
      setTimeout(() => callback({ forecast: [0, 1].map((n) => ({ datetime: new Date(Date.now() + n * 864e5).toISOString(), temperature: 17, templow: 7, condition: "sunny" })) }), 0);
    return () => {};
  };
  const card = mountCard({ card_layout: "wide" }, hass);
  resizeAll(900, 260);
  await new Promise((r) => setTimeout(r, 5));
  runFrames(3);
  const tile = [...card.shadowRoot.querySelectorAll(".chip")].find((c) => /17/.test(c.textContent));
  assert.ok(tile);
  assert.match(tile.textContent, /7°/);
  assert.doesNotMatch(tile.textContent, /°C/);
});

test("tiles in a grid row keep the same height, even next to a ring or a forecast tile", async () => {
  const { buildStyles } = await import("../src/atmo-weather-styles.js");
  const css = buildStyles();
  // Rules that pull a row of enhanced chips to one edge must leave grid rows
  // stretched, or a short tile (sunrise) sits lower than a tall one (forecast).
  const rules = css.match(/[^{}]*has-enhanced-child[^{}]*\{[^}]*align-items:\s*flex-(end|start)[^}]*\}/g) || [];
  assert.ok(rules.length >= 2);
  for (const r of rules) assert.match(r, /:not\(\.row-grid\)/);
  assert.match(css, /\.row-grid\s*\{[^}]*align-items: stretch/);
});

test("home: the bar text and gaps shrink with the card width, so a narrow card keeps one line", () => {
  const home = layoutDefaults("home", "weather.home", "sun.sun");
  for (const key of ["chip_text_size", "chip_icon_size", "chip_area_gap"]) assert.match(home[key], /^clamp\(\d+px, [\d.]+cqw, \d+px\)$/, key);
});
