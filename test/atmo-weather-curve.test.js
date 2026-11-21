import { test } from "node:test";
import assert from "node:assert/strict";

import { curveColor, curveHeight, curveMarkup, curveMode, monotonePath, toCelsius } from "../src/atmo-weather-curve.js";

test("modes and heights are checked", () => {
  assert.equal(curveMode("Line"), "line");
  assert.equal(curveMode("band"), "band");
  assert.equal(curveMode("color"), "color");
  assert.equal(curveMode("soft"), "soft");
  assert.equal(curveMode("rainbow"), "");
  assert.equal(curveMode(undefined), "");
  assert.equal(curveHeight(undefined), 46);
  assert.equal(curveHeight("10"), 24);
  assert.equal(curveHeight(500), 120);
  assert.equal(curveHeight(60), 60);
});

test("the path goes through every point and never overshoots", () => {
  const xs = [0, 100, 200, 300], ys = [10, 30, 30, 5];
  const d = monotonePath(xs, ys);
  assert.ok(d.startsWith("M0,10"));
  assert.ok(d.endsWith("300,5"));
  // Every control point stays inside the range of its two ends.
  const nums = [...d.matchAll(/C([\d.-]+),([\d.-]+) ([\d.-]+),([\d.-]+) ([\d.-]+),([\d.-]+)/g)];
  nums.forEach((m, i) => {
    const lo = Math.min(ys[i], ys[i + 1]), hi = Math.max(ys[i], ys[i + 1]);
    for (const v of [Number(m[2]), Number(m[4])]) assert.ok(v >= lo - 0.01 && v <= hi + 0.01, `segment ${i}: ${v}`);
  });
  assert.equal(monotonePath([0], [1]), "");
});

test("colors follow the temperature and Fahrenheit is converted", () => {
  assert.equal(curveColor(-20), "rgb(122,162,255)");
  assert.equal(curveColor(40), "rgb(255,94,87)");
  assert.equal(curveColor(17), "rgb(255,214,102)");
  assert.notEqual(curveColor(5), curveColor(20));
  assert.equal(Math.round(toCelsius(68, "°F")), 20);
  assert.equal(toCelsius(20, "°C"), 20);
});

test("markup for each mode, with fallbacks", () => {
  const base = { xs: [10, 60, 110], his: [14, 18, 12], height: 46, id: "t" };
  const line = curveMarkup({ ...base, mode: "line" });
  assert.equal((line.match(/<circle/g) || []).length, 3);
  assert.ok(line.includes('stroke="#fff"'));
  const band = curveMarkup({ ...base, mode: "band", los: [6, 9, 5] });
  assert.equal((band.match(/<circle/g) || []).length, 6);
  assert.ok(band.includes(" Z\""));
  // Without lows, as in most hourly forecasts, the band is a line.
  assert.equal(curveMarkup({ ...base, mode: "band", los: [NaN, NaN, NaN] }), line);
  const color = curveMarkup({ ...base, mode: "color" });
  assert.ok(color.includes('id="t-c"') && color.includes("url(#t-c)") && color.includes('mask="url(#t-m)"'));
  const soft = curveMarkup({ ...base, mode: "soft" });
  assert.equal((soft.match(/<circle[^>]*fill="none"/g) || []).length, 3);
  assert.ok(soft.includes('stroke-opacity="0.55"') && soft.includes("url(#t-s)"));
  assert.equal(curveMarkup({ ...base, mode: "" }), "");
  assert.equal(curveMarkup({ ...base, mode: "line", xs: [10] , his: [14] }), "");
  assert.equal(curveMarkup({ ...base, mode: "line", his: [14, NaN, 12] }), "");
  // Equal values draw a flat line in the middle.
  assert.ok(curveMarkup({ ...base, mode: "line", his: [15, 15, 15] }).includes('cy="23.0"'));
});
