import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { errors, makeHass, mountCard, runFrames } from "./helpers/dom.js";
import { FrostLayer, frostLevel, FROST_GROW_PER_S, FROST_THAW_PER_S } from "../src/atmo-weather-frost.js";

await import("../src/atmo-weather-card.js");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), []);
});

test("frost follows temperature and humidity", () => {
  // Warm or dry above 0 °C: none.
  assert.equal(frostLevel(10, 99).amount, 0);
  assert.equal(frostLevel(2, 80).amount, 0);
  assert.equal(frostLevel(4, 100).amount, 0);
  // Just above 0 °C in very humid air: a thin rime, more towards 0 °C.
  const rime = frostLevel(1.9, 99);
  assert.ok(rime.amount > 0 && rime.amount < 0.3);
  assert.ok(frostLevel(0.5, 99).amount > rime.amount);
  // Rain on the glass above 0 °C is water, not rime.
  assert.equal(frostLevel(1, 99, "rainy").amount, 0);
  assert.equal(frostLevel(1, 99, "pouring").amount, 0);
  // From 0 °C always, further the colder, full at -12 °C.
  assert.ok(Math.abs(frostLevel(0, 40).amount - 0.3) < 1e-9);
  assert.ok(frostLevel(-6, 70).amount > frostLevel(-2, 70).amount);
  assert.equal(frostLevel(-12, 70).amount, 1);
  assert.equal(frostLevel(-20, 70).amount, 1);
  // Below 0 °C rain does not stop it (the snow or ice is frozen anyway).
  assert.ok(frostLevel(-3, 90, "snowy").amount > 0);
  // Humidity makes it thicker.
  assert.ok(frostLevel(-6, 99).density > frostLevel(-6, 60).density);
  // Missing readings.
  assert.equal(frostLevel(null, 99).amount, 0);
  assert.equal(frostLevel("unknown", 99).amount, 0);
  assert.equal(frostLevel(1, null).amount, 0);
  assert.ok(frostLevel(-4, null).amount > 0, "below 0 °C without humidity");
  assert.ok(FROST_THAW_PER_S > FROST_GROW_PER_S, "thaws faster than it grows");
});

test("the frost layer grows in from the edges and stays clear in the middle longer", () => {
  const box = document.createElement("div");
  const layer = new FrostLayer(box);
  assert.equal(box.children.length, 3);
  assert.equal(layer.resize(400, 200), true);
  assert.equal(layer.resize(400, 200), false, "same size, nothing to do");
  layer.draw(0.5, 0.8, false, { mode: "sun", strength: 1, x: 40, y: 30 });
  // Averages over a few points: the edge carries more rime than the middle.
  const avg = (pts) => pts.reduce((s, [x, y]) => s + layer.cover(x, y), 0) / pts.length;
  const edge = avg([[2, 2], [398, 2], [2, 198], [398, 198], [200, 2], [200, 198]]);
  const middle = avg([[200, 100], [180, 95], [220, 105]]);
  assert.ok(edge > middle, `edge ${edge} > middle ${middle}`);
  // More amount, more rime at the same point.
  const before = avg([[100, 60], [300, 140], [60, 100]]);
  layer.draw(1, 0.8, false, null);
  assert.ok(avg([[100, 60], [300, 140], [60, 100]]) >= before);
  assert.match(layer.glass.style.background, /rgba/);
  for (const mode of ["matte", "night"]) layer.draw(0.6, 0.5, mode === "night", { mode, strength: 0.3, x: 0, y: 0 });
  layer.setVisible(true);
  assert.equal(layer.tex.style.opacity, "1");
  layer.destroy();
  assert.equal(box.children.length, 0);
});

const cold = (temperature, humidity, weather = "partlycloudy") => {
  const hass = makeHass({ weather });
  Object.assign(hass.states["weather.home"].attributes, { temperature, humidity });
  return hass;
};
const frostEl = (card) => card.shadowRoot.querySelector("#frost");

test("the card shows frost on a cold day and none on a mild one", () => {
  const card = mountCard({}, cold(-6, 92));
  runFrames(3);
  assert.ok(card._frost, "frost layer made");
  assert.equal(frostEl(card).children.length, 3);
  assert.ok(card._frost.shown > 0.5);
  // It sits under the text and the chips.
  const order = [...card.shadowRoot.querySelector("#card-root").children].map((el) => el.id);
  assert.ok(order.indexOf("frost") > order.indexOf("fg-canvas"));
  assert.ok(order.indexOf("frost") < order.indexOf("text-wrapper"));

  const mild = mountCard({}, cold(10, 92));
  runFrames(3);
  assert.ok(!mild._frost);
  assert.equal(frostEl(mild).children.length, 0);
});

test("frost stays away when switched off, without effects or in the immersive style", () => {
  for (const config of [{ effect_frost: false }, { perf_mode: "low" }, { card_style: "immersive" }]) {
    const card = mountCard(config, cold(-8, 90));
    runFrames(3);
    assert.ok(!card._frost, JSON.stringify(config));
    assert.equal(frostEl(card).children.length, 0, JSON.stringify(config));
  }
});

test("frost thaws slowly when it gets warmer and grows slowly when it gets colder", () => {
  const card = mountCard({}, cold(-2, 80));
  runFrames(3);
  const start = card._frost.shown;
  let now = 1e6;
  card._tickFrost(now);
  // Colder: it grows, but not at once.
  card.hass = cold(-12, 80);
  card._tickFrost((now += 1000));
  const grown = card._frost.shown;
  assert.ok(grown > start && grown < 1, `${start} < ${grown} < 1`);
  for (let i = 0; i < 90; i++) card._tickFrost((now += 1000));
  assert.equal(card._frost.shown, 1);
  // Warmer: it thaws and the layer goes away.
  card.hass = cold(8, 80);
  card._tickFrost((now += 1000));
  assert.ok(card._frost && card._frost.shown < 1, "thawing");
  for (let i = 0; i < 60; i++) card._tickFrost((now += 1000));
  assert.equal(card._frost, null);
  assert.equal(frostEl(card).children.length, 0);
});

test("own temperature and humidity sensors drive the frost", () => {
  const hass = cold(12, 50);
  hass.states["sensor.station_temp"] = { entity_id: "sensor.station_temp", state: "-7", attributes: { unit_of_measurement: "°C" } };
  hass.states["sensor.station_hum"] = { entity_id: "sensor.station_hum", state: "95", attributes: { unit_of_measurement: "%" } };
  const card = mountCard({ temperature_entity: "sensor.station_temp", humidity_entity: "sensor.station_hum" }, hass);
  runFrames(3);
  assert.ok(card._frost, "frost from the station, not the mild weather entity");
});
