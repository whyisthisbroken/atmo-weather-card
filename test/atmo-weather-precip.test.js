import { test } from "node:test";
import assert from "node:assert/strict";

import {
  addToPile,
  areaFactor,
  drawLeaves,
  drawnCount,
  drawRain,
  drawSnow,
  drawSplashes,
  leafSeason,
  LEAF_PALETTES,
  MAX_DENSITY,
  pileAt,
  precipCounts,
  rainKind,
  RAIN_KINDS,
  settlePile,
  setupDrop,
  setupFlake,
  snowPile,
  SNOW_SIZE,
  spawnLeaf,
  spawnSplash,
} from "../src/atmo-weather-precip.js";

// Runs fn with a fixed random sequence, so chance-based tests always see the same draws.
function seeded(fn, start = 7) {
  const saved = Math.random;
  let seed = start;
  Math.random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  try {
    fn();
  } finally {
    Math.random = saved;
  }
}

function ctx() {
  const c = {
    drawImageCalls: 0,
    fillCalls: 0,
    strokeCalls: 0,
    globalAlpha: 1,
  };
  for (const m of ["translate", "rotate", "scale", "setTransform", "beginPath", "moveTo", "lineTo", "quadraticCurveTo", "closePath", "arc"])
    c[m] = () => {};
  c.drawImage = () => c.drawImageCalls++;
  c.fill = () => c.fillCalls++;
  c.stroke = () => c.strokeCalls++;
  c.createLinearGradient = () => ({ addColorStop() {} });
  return c;
}

function card(extra = {}) {
  return {
    _layerFadeProgress: { precipitation: 1 },
    _animationSpeed: 1,
    _frameScale: 1,
    _cachedDimensions: { dpr: 1 },
    _isLightBackground: false,
    _params: { atmosphere: "rain" },
    _renderState: { rainRgb: "200,210,220" },
    _rainStreakTex: {},
    _rainStreakRgb: "200,210,220",
    _flakeTex: {},
    _rain: [],
    _snow: [],
    _splashes: [],
    _settled: [],
    _leaves: [],
    ...extra,
  };
}

test("the particle count follows the card's area within limits", () => {
  assert.equal(areaFactor(420, 230), 1);
  assert.equal(areaFactor(100, 50), 0.6);
  assert.equal(areaFactor(4000, 3000), 3);
  assert.equal(areaFactor(0, 0), 0.6);
});

test("precipCounts splits mixed and hail weather and sizes the pools for the top density", () => {
  const rain = precipCounts("rain", 120, 420, 230);
  assert.equal(rain.rain, Math.ceil(120 * 0.18 * MAX_DENSITY));
  assert.equal(rain.snow, 0);
  const mix = precipCounts("mix", 100, 420, 230);
  assert.ok(mix.rain > 0 && mix.snow > 0);
  const hail = precipCounts("hail", 150, 420, 230);
  assert.equal(hail.hail, Math.round(150 * 0.45));
  assert.ok(hail.rain > 0);
  assert.deepEqual(precipCounts("stars", 280, 420, 230), { rain: 0, snow: 0, hail: 0 });
  // tiny counts still give a few drops
  assert.equal(precipCounts("rain", 1, 100, 50).rain, 6);
});

test("drawnCount scales with the density and never exceeds the pool", () => {
  assert.equal(drawnCount(90, MAX_DENSITY), 90);
  assert.equal(drawnCount(90, 1), 30);
  assert.equal(drawnCount(90, 0.25), 8);
  assert.equal(drawnCount(0, 1), 0);
  assert.equal(drawnCount(3, 0.25), 2);
});

test("the rain kind follows the weather's atmosphere", () => {
  assert.equal(rainKind({ atmosphere: "pouring" }), "pouring");
  assert.equal(rainKind({ atmosphere: "storm" }), "storm");
  assert.equal(rainKind({ atmosphere: "rain" }), "rain");
  assert.equal(rainKind(null), "rain");
});

test("setupDrop gives each drop a size, speed and depth from its kind", () => {
  for (const kind of Object.keys(RAIN_KINDS)) {
    const k = RAIN_KINDS[kind];
    const pt = {};
    setupDrop(pt, kind, 400, 200, true);
    assert.equal(pt.kind, kind);
    assert.ok(pt.dw >= 1 && pt.dw <= k.wMax);
    assert.ok(pt.len >= k.len[0] && pt.len <= k.len[1]);
    assert.ok(pt.v >= k.speed[0] && pt.v <= k.speed[1]);
    assert.ok(pt.op > 0.5 && pt.op <= 1);
    assert.ok(pt.y >= -pt.len && pt.y <= 200);
    setupDrop(pt, kind, 400, 200, false);
    assert.ok(pt.y < 0, "a new drop starts above the card");
  }
});

test("a splashing drop stops on the bottom edge and throws a splash once", () => {
  const c = card();
  const pt = { kind: "rain", x: 50, y: 99, dw: 2, len: 20, v: 450, op: 1, splash: true, splashed: false };
  c._rain = [pt];
  drawRain(c, ctx(), 100, 100, 0);
  assert.equal(c._splashes.length, 1);
  assert.equal(c._splashes[0].y, 100);
  drawRain(c, ctx(), 100, 100, 0);
  assert.equal(c._splashes.length, 1, "no second splash for the same drop");
});

test("rain without splashes lets every drop fall through", () => {
  const c = card({ _precip: { rainSplash: false } });
  const pt = { kind: "rain", x: 50, y: 99, dw: 2, len: 20, v: 450, op: 1, splash: true, splashed: false };
  c._rain = [pt];
  drawRain(c, ctx(), 100, 100, 0);
  assert.equal(c._splashes.length, 0);
});

test("drops of another kind are set up again when the weather changes", () => {
  const c = card({ _params: { atmosphere: "pouring" } });
  const pt = { kind: "rain", x: 50, y: 10, dw: 2, len: 20, v: 450, op: 1, splash: false };
  c._rain = [pt];
  drawRain(c, ctx(), 100, 100, 0);
  assert.equal(pt.kind, "pouring");
});

test("rain draws nothing while the precipitation layer is faded out", () => {
  const c = card({ _layerFadeProgress: { precipitation: 0 } });
  const pt = { kind: "rain", x: 50, y: 10, dw: 2, len: 20, v: 450, op: 1 };
  c._rain = [pt];
  const g = ctx();
  drawRain(c, g, 100, 100, 0);
  assert.equal(g.drawImageCalls, 0);
  assert.equal(pt.y, 10);
});

test("splashes live for half a second and the list is capped", () => {
  const c = card();
  for (let i = 0; i < 50; i++) spawnSplash(c, i, 100, "1,2,3");
  assert.equal(c._splashes.length, 40);
  const g = ctx();
  drawSplashes(c, g, 0.1, 1);
  assert.ok(g.strokeCalls > 0 && g.fillCalls > 0);
  drawSplashes(c, g, 1, 1);
  assert.equal(c._splashes.length, 0);
});

test("setupFlake ties speed and brightness to the flake's size", () => {
  const small = {}, big = {};
  for (let i = 0; i < 50; i++) {
    setupFlake(small, 400, 200, true);
    setupFlake(big, 400, 200, true);
    const [a, b] = small.d < big.d ? [small, big] : [big, small];
    assert.ok(a.d >= SNOW_SIZE[0] && b.d <= SNOW_SIZE[1]);
    assert.ok(a.op <= b.op);
  }
});

test("a settling flake lands on the snow edge, melts and builds the edge up", () => {
  const c = card();
  const pile = snowPile(c, 100, 100);
  const before = pileAt(pile, 50);
  const pt = { x: 50, y: 99, d: 4, depth: 0.5, v: 30, op: 1, swing: 0, swingRate: 0, settles: true };
  c._snow = [pt];
  drawSnow(c, ctx(), 100, 100, 0);
  assert.equal(c._settled.length, 1);
  assert.ok(pileAt(pile, 50) > before);
  assert.ok(pt.y < 0, "the flake starts again at the top");
  // melted after its life
  for (let i = 0; i < 120; i++) drawSnow(c, ctx(), 100, 100, 0);
  assert.ok(c._settled.length <= 1);
});

test("the snow edge stays below its maximum and evens out", () => {
  const c = card();
  const pile = snowPile(c, 120, 100);
  for (let i = 0; i < 2000; i++) addToPile(pile, 60, 6);
  for (const v of pile.heights) assert.ok(v <= pile.max + 1e-6);
  pile.heights[5] = pile.max;
  pile.heights[4] = 0;
  pile.heights[6] = 0;
  settlePile(pile, 1);
  assert.ok(pile.heights[5] < pile.max);
  assert.equal(pileAt(null, 10), 0);
});

test("without the snow edge no edge is drawn", () => {
  const c = card({ _precip: { snowEdge: false } });
  c._snow = [{ x: 50, y: 10, d: 4, depth: 0.5, v: 30, op: 1, swing: 0, swingRate: 0, settles: true }];
  const g = ctx();
  drawSnow(c, g, 100, 100, 0);
  assert.equal(g.fillCalls, 0);
  assert.equal(c._snowPile, undefined);
});

test("no snow edge without snow", () => {
  const c = card();
  const g = ctx();
  drawSnow(c, g, 100, 100, 0);
  assert.equal(g.fillCalls, 0);
});

test("leaf colours follow the season and the hemisphere", () => {
  assert.equal(leafSeason(new Date(2026, 4, 1), 52), "green");
  assert.equal(leafSeason(new Date(2026, 9, 1), 52), "autumn");
  assert.equal(leafSeason(new Date(2026, 0, 1), 52), "autumn");
  assert.equal(leafSeason(new Date(2026, 4, 1), -33), "autumn");
  assert.equal(leafSeason(new Date(2026, 11, 1), -33), "green");
  assert.equal(leafSeason(new Date(2026, 6, 1), undefined), "green");
});

test("a leaf crosses the card in the wind's direction", () => {
  const c = card({ _hass: { config: { latitude: 52 } }, _windKmh: 30 });
  const right = spawnLeaf(c, 400, 200, 1);
  assert.ok(right.x0 < 0 && right.x1 > 400);
  const left = spawnLeaf(c, 400, 200, -1);
  assert.ok(left.x0 > 400 && left.x1 < 0);
  assert.ok(right.dur > 0);
  const palette = [...LEAF_PALETTES.green, ...LEAF_PALETTES.autumn];
  assert.ok(palette.length === 12);
});

// Seeded: with real chance the first 200 frames now and then spawned no leaf.
test("leaves spawn up to their limit and leave after crossing", () =>
  seeded(() => {
    const c = card({ _hass: { config: { latitude: 52 } }, _windKmh: 30, _leafTimer: 0 });
    const g = ctx();
    for (let i = 0; i < 200; i++) drawLeaves(c, g, 420, 230, 0);
    assert.ok(c._leaves.length >= 1 && c._leaves.length <= 3);
    assert.ok(g.fillCalls > 0);
    c._precip = { leafDensity: 3 };
    for (let i = 0; i < 600; i++) drawLeaves(c, g, 420, 230, Math.PI);
    assert.ok(c._leaves.length <= 9);
  }));
