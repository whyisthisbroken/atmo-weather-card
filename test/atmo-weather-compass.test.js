import { test } from "node:test";
import assert from "node:assert/strict";

import {
  compassLabel,
  compassMarkup,
  compassPoint,
  resolveCompassPosition,
  styleRotation,
  unwrapAngle,
} from "../src/atmo-weather-compass.js";

test("bearings map to the 16 compass points in English and German", () => {
  assert.equal(compassPoint(0), "N");
  assert.equal(compassPoint(11), "N");
  assert.equal(compassPoint(12), "NNE");
  assert.equal(compassPoint(250), "WSW");
  assert.equal(compassPoint(359), "N");
  assert.equal(compassPoint(-90), "W");
  assert.equal(compassPoint(720 + 90), "E");
  assert.equal(compassPoint(90, "de"), "O");
  assert.equal(compassPoint(135, "de"), "SO");
  assert.equal(compassPoint(60, "de"), "ONO");
  // Unknown languages fall back to English.
  assert.equal(compassPoint(90, "fr"), "E");
});

test("a turn takes the short way round", () => {
  assert.equal(unwrapAngle(null, 250), 250);
  assert.equal(unwrapAngle(350, 10), 370);
  assert.equal(unwrapAngle(10, 350), -10);
  assert.equal(unwrapAngle(250, 90), 90);
  assert.equal(unwrapAngle(370, 20), 380);
  assert.equal(unwrapAngle(720, 0), 720);
});

test("each style has its own corner unless a position is set", () => {
  assert.equal(resolveCompassPosition("arrow", "auto"), "bottom-left");
  assert.equal(resolveCompassPosition("rose", undefined), "bottom-right");
  assert.equal(resolveCompassPosition("pill", "auto"), "top-right");
  assert.equal(resolveCompassPosition("band", "auto"), "bottom-center");
  assert.equal(resolveCompassPosition("vane", "auto"), "bottom-right");
  assert.equal(resolveCompassPosition("rose", "top-left"), "top-left");
  assert.equal(resolveCompassPosition("rose", "middle"), "bottom-right");
});

test("the label shows only the parts that are switched on", () => {
  const base = { bearing: 250.4, lang: "en", speed: 25.25, speedUnit: "km/h" };
  assert.deepEqual(compassLabel({ ...base, show: { cardinal: true } }), ["WSW"]);
  assert.deepEqual(
    compassLabel({ ...base, show: { cardinal: true, degrees: true, speed: true } }),
    ["WSW", "250°", "25.3 km/h"],
  );
  assert.deepEqual(compassLabel({ ...base, show: {} }), []);
  assert.deepEqual(compassLabel({ ...base, lang: "de", show: { cardinal: true, speed: true } }), ["WSW", "25,3 km/h"]);
  assert.deepEqual(compassLabel({ ...base, speed: NaN, show: { speed: true } }), []);
});

test("the arrow points where the wind blows, the needles where it comes from", () => {
  // Wind from the west: the arrow, drawn pointing east, stays east.
  assert.equal(styleRotation("arrow", 270) % 360, 0);
  assert.equal(styleRotation("arrow", 90) % 360, 180);
  for (const style of ["rose", "pill", "vane"]) assert.equal(styleRotation(style, 250), 250);
});

test("every style builds its own markup with a label slot", () => {
  for (const style of ["arrow", "rose", "pill", "band", "vane"]) {
    const html = compassMarkup(style, "bottom-left", "en");
    assert.match(html, new RegExp(`cmp-style-${style} cmp-pos-bottom-left`));
    assert.match(html, /class="cmp-label"/);
    assert.ok(style === "band" ? html.includes("cmp-band") : html.includes("cmp-rot"), style);
  }
  assert.match(compassMarkup("vane", "bottom-right", "de"), />O</);
  assert.match(compassMarkup("band", "bottom-center", "de"), />WSW</);
});
