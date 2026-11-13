import { test } from "node:test";
import assert from "node:assert/strict";

import {
  cometColors,
  cometRate,
  planeSpeedForScale,
  shootingStarRate,
  drawComets,
  drawBirds,
  drawPlanes,
  drawClouds,
  drawFog,
  drawHail,
  drawLightning,
  drawRain,
  drawShootingStars,
  drawSnow,
  shouldSkipFrame,
  trailPoints,
  windDisplayActive,
  drawWindLines,
  drawWindFlow,
  STRONG_WIND_KMH,
  advanceWindAndPulse,
  windTargetDirection,
} from "../src/atmo-weather-animations.js";

function createContext() {
  return {
    drawImageCalls: 0,
    fillCalls: 0,
    fillRectCalls: 0,
    strokeCalls: 0,
    globalAlpha: 1,
    translate() {},
    rotate() {},
    scale() {},
    setTransform() {},
    drawImage() {
      this.drawImageCalls++;
    },
    fill() {
      this.fillCalls++;
    },
    stroke() {
      this.strokeCalls++;
    },
    createRadialGradient() {
      return { addColorStop() {} };
    },
    createLinearGradient() {
      return { addColorStop() {} };
    },
    beginPath() {},
    arc() {},
    ellipse() {},
    save() {},
    restore() {},
    fillRect() {
      this.fillRectCalls++;
    },
    moveTo() {},
    lineTo() {},
  };
}

function baseCard() {
  return {
    _layerFadeProgress: { precipitation: 1, effects: 1 },
    _animationSpeed: 1,
    _frameScale: 1,
    _cachedDimensions: { dpr: 1 },
    _windSpeed: 0,
    _isLightBackground: false,
    _isThemeDark: true,
  };
}

test("drawRain advances and draws visible rain particles", () => {
  const card = baseCard();
  const particle = {
    x: 10,
    y: 10,
    z: 1,
    speedY: 5,
    turbulence: 0,
    len: 12,
    op: 1,
  };
  card._rain = [particle];
  card._rainTex = {};
  const ctx = createContext();

  drawRain(card, ctx, 100, 100, 0);

  assert.ok(particle.y > 10);
  assert.equal(ctx.drawImageCalls, 1);
  assert.equal(ctx.globalAlpha, 1);
});

test("drawSnow resets particles that leave the canvas", () => {
  const card = baseCard();
  const particle = {
    x: 10,
    y: 104,
    z: 1,
    speedY: 2,
    turbulence: 0,
    wobblePhase: 0,
    wobbleSpeed: 0.1,
    size: 2,
    op: 1,
  };
  card._snow = [particle];
  card._snowTexFg = {};
  card._snowTexBg = {};
  const ctx = createContext();

  drawSnow(card, ctx, 100, 100, 0);

  assert.equal(particle.y, -5);
  assert.ok(particle.x >= 0 && particle.x <= 100);
  assert.equal(ctx.drawImageCalls, 1);
  assert.equal(ctx.globalAlpha, 1);
});

test("drawHail advances, rotates, and draws hail particles", () => {
  const card = baseCard();
  const particle = {
    x: 10,
    y: 10,
    z: 1,
    speedY: 5,
    turbulence: 0,
    rotation: 0,
    rotationSpeed: 0.1,
    size: 3,
    op: 1,
  };
  card._hail = [particle];
  card._hailTex = {};
  const ctx = createContext();

  drawHail(card, ctx, 100, 100, 0);

  assert.ok(particle.y > 10);
  assert.ok(particle.rotation > 0);
  assert.equal(ctx.drawImageCalls, 1);
  assert.equal(ctx.globalAlpha, 1);
});

function fogCard(extra = {}) {
  return {
    ...baseCard(),
    _cachedDimensions: { dpr: 1, height: 100 },
    _getCelestialPosition: () => ({ x: 70, y: 30 }),
    _fogBanks: [
      { x: 10, y: 20, w: 40, h: 10, speed: 1, phase: 0, opacity: 0.5, layer: 0 },
    ],
    ...extra,
  };
}

test("drawFog moves and renders fog banks", () => {
  const card = fogCard({ _perfEffects: 1 });
  const ctx = createContext();

  drawFog(card, ctx, 100);

  assert.ok(card._fogBanks[0].x > 10);
  // Veil, one soft bank, aura and sun disc; no hard-edged ellipse fill.
  assert.equal(ctx.fillRectCalls, 4);
  assert.equal(ctx.fillCalls, 0);
  assert.equal(ctx.globalAlpha, 1);
});

test("drawFog shows the moon aura without a sun disc at night", () => {
  const ctx = createContext();

  drawFog(fogCard({ _perfEffects: 1, _isNight: true }), ctx, 100);

  assert.equal(ctx.fillRectCalls, 3);
});

test("drawFog keeps the veil and the light in low mode but skips the banks", () => {
  const card = fogCard({ _perfEffects: 0 });
  const ctx = createContext();

  drawFog(card, ctx, 100);

  assert.equal(card._fogBanks[0].x, 10);
  assert.equal(ctx.fillRectCalls, 3);
});

test("animation speed per second is the same at every frame rate", () => {
  for (const fps of [24, 30, 60, 120]) {
    const card = { _perfFps: fps, _lastFrameTime: 0 };
    let progress = 0;
    for (let t = 1000 / fps; t <= 1000.01; t += 1000 / fps) {
      if (!shouldSkipFrame(card, t)) progress += card._frameScale;
    }

    // One second always advances 30 base frames, whatever the frame rate.
    assert.ok(Math.abs(progress - 30) < 0.5, `${fps} fps: ${progress}`);
  }
});

test("trails get more points at higher frame rates to keep their length", () => {
  assert.equal(trailPoints({ _perfFps: 30 }, 22), 22);
  assert.equal(trailPoints({ _perfFps: 60 }, 22), 44);
  assert.equal(trailPoints({ _perfFps: 24 }, 100), 80);
  assert.equal(trailPoints({}, 22), 22);
});

test("drawClouds preserves the original drift calculation at low effects", () => {
  const card = baseCard();
  card._layerFadeProgress.clouds = 1;
  card._renderState = {};
  card._perfEffects = 0;
  const cloud = {
    x: 10,
    y: 20,
    speed: 0.03,
    layer: 2,
    seed: 120,
    breathPhase: 0.5,
    breathSpeed: 0,
    opacity: 1,
    _bakedCanvas: {},
    _bakeOffX: 0,
    _bakeOffY: 0,
    _atlasX: 0,
    _atlasY: 0,
    _atlasW: 10,
    _atlasH: 10,
    _bakeLogicalW: 10,
    _bakeLogicalH: 10,
  };
  const layerPhase = cloud.breathPhase + cloud.seed * 0.0007;
  const expectedMicroDrift =
    Math.sin(layerPhase * (1.8 + cloud.layer * 0.7)) *
    (7 + cloud.layer * 10) *
    0.001;
  const expectedSpeed =
    cloud.speed * 1 * (0.7 + cloud.layer * 0.35) * 0.5 + expectedMicroDrift;
  const ctx = createContext();

  drawClouds(card, ctx, [cloud], 1000, 100, 1);

  assert.ok(Math.abs(cloud.x - (10 + expectedSpeed)) < 1e-12);
});

test("drawShootingStars does not spawn during bad weather", () => {
  const card = baseCard();
  card._layerFadeProgress.stars = 1;
  card._renderState = { isBadWeatherForComets: true };
  card._shootingStars = [];
  card._perfEffects = 1;
  const ctx = createContext();
  const originalRandom = Math.random;
  Math.random = () => 0;

  try {
    drawShootingStars(card, ctx, 100, 100, { MAX_SHOOTING_STARS: 1 }, 12);
  } finally {
    Math.random = originalRandom;
  }

  assert.equal(card._shootingStars.length, 0);

  card._renderState.isBadWeatherForComets = false;
  Math.random = () => 0;
  try {
    drawShootingStars(card, ctx, 100, 100, { MAX_SHOOTING_STARS: 1 }, 12);
  } finally {
    Math.random = originalRandom;
  }

  assert.equal(card._shootingStars.length, 1);
});

function stormCard() {
  return {
    ...baseCard(),
    _params: { thunder: true },
    _isImmersive: false,
    _flashOpacity: 0,
    _flashHold: 0,
  };
}

// Math.random returns these values in order, then the fallback.
function withRandomSequence(values, fallback, run) {
  const original = Math.random;
  let i = 0;
  Math.random = () => (i < values.length ? values[i++] : fallback);
  try {
    run();
  } finally {
    Math.random = original;
  }
}

test("a strike flashes the card without a bolt most of the time", () => {
  const card = stormCard();
  const ctx = createContext();

  // Strike, flash position, then a roll above the bolt chance.
  withRandomSequence([0, 0.5, 0.5, 0.9], 1, () => drawLightning(card, ctx, 100, 100));

  assert.equal(card._bolt, null);
  assert.ok(card._flashOpacity > 0.9);
  assert.equal(ctx.strokeCalls, 0);
  assert.equal(ctx.fillRectCalls, 2); // storm dimming and the flash
});

test("some strikes also draw a branching bolt", () => {
  const card = stormCard();
  const ctx = createContext();

  withRandomSequence([0, 0.5, 0.5, 0], 0.5, () => drawLightning(card, ctx, 100, 100));

  assert.ok(card._bolt.main.length > 100);
  assert.ok(card._bolt.branches.length >= 2);
  assert.ok(ctx.strokeCalls > 0);
});

test("the flash fades out and takes the bolt with it", () => {
  const card = stormCard();
  card._flashOpacity = 0.4;
  card._bolt = { main: [0, 0, 5, 50, 0, 100], branches: [] };
  const ctx = createContext();

  withRandomSequence([], 1, () => {
    for (let i = 0; i < 40; i++) drawLightning(card, ctx, 100, 100);
  });

  assert.equal(card._flashOpacity, 0);
  assert.equal(card._bolt, null);
});

test("drawLightning dims the canvas when card_style is unset", () => {
  const countFills = (isImmersive) => {
    const card = baseCard();
    card._params = { thunder: true };
    card._config = {};
    card._isImmersive = isImmersive;
    card._flashOpacity = 0;
    card._flashHold = 0;
    const ctx = createContext();
    let fills = 0;
    ctx.fillRect = () => fills++;
    const originalRandom = Math.random;
    Math.random = () => 1;
    try {
      drawLightning(card, ctx, 100, 100);
    } finally {
      Math.random = originalRandom;
    }
    return fills;
  };

  assert.equal(countFills(false), 1);
  assert.equal(countFills(true), 0);
});

function drawingContext() {
  const noop = () => {};
  return new Proxy(
    {},
    {
      get: (target, key) =>
        key in target ? target[key] : key === "createLinearGradient" ? () => ({ addColorStop: noop }) : noop,
      set: (target, key, value) => {
        target[key] = value;
        return true;
      },
    },
  );
}

function faunaCard() {
  return {
    ...baseCard(),
    _birdAnimationSpeed: 1,
    _faunaBirdDensity: 1,
    _faunaBirdFlockSize: 6,
    _faunaPlaneDensity: 1,
    _renderState: { isSevereWeather: false },
    _birds: [],
    _planes: [],
  };
}

function withRandom(value, run) {
  const originalRandom = Math.random;
  Math.random = () => value;
  try {
    run();
  } finally {
    Math.random = originalRandom;
  }
}

test("drawBirds spawns a flock in calm weather", () => {
  const card = faunaCard();

  withRandom(0, () => drawBirds(card, drawingContext(), 300, 100));

  assert.ok(card._birds.length > 0);
});

test("drawBirds does not spawn in severe weather", () => {
  const card = faunaCard();
  card._renderState.isSevereWeather = true;

  withRandom(0, () => drawBirds(card, drawingContext(), 300, 100));

  assert.equal(card._birds.length, 0);
});

test("drawBirds removes birds that left the canvas", () => {
  const card = faunaCard();
  card._birds = [
    { x: 500, y: 10, vx: 1, vy: 0, flapPhase: 0, flapSpeed: 0.1, size: 2 },
  ];

  withRandom(1, () => drawBirds(card, drawingContext(), 300, 100));

  assert.equal(card._birds.length, 0);
});

test("drawPlanes spawns a plane through the card factory", () => {
  const card = faunaCard();
  let created = 0;
  card._createPlane = () => {
    created++;
    return {
      x: 10,
      y: 10,
      vx: 1,
      vy: 0,
      size: 1,
      climbAngle: 0,
      gapTimer: 0,
      histBuf: new Float32Array(30),
      histHead: 0,
      histLen: 0,
      _lastRecX: 0,
      _lastRecY: 0,
    };
  };

  withRandom(0, () =>
    drawPlanes(card, drawingContext(), 300, 100, [0], {}, 10),
  );

  assert.equal(created, 1);
  assert.equal(card._planes.length, 1);
});

test("wind shows in windy weather and in rain, hail or snow once it is strong", () => {
  const card = (params, kmh, style = "lines") => ({ _params: params, _windKmh: kmh, _windStyle: style });

  assert.equal(windDisplayActive(card({ flow: true }, 5)), true);
  assert.equal(windDisplayActive(card({ flow: true }, 50, "off")), false);
  assert.equal(windDisplayActive(card({ count: 300 }, STRONG_WIND_KMH)), true);
  assert.equal(windDisplayActive(card({ count: 300 }, STRONG_WIND_KMH - 1)), false);
  assert.equal(windDisplayActive(card({ count: 0, cloud: 30 }, 80)), false);
});

function windCard(extra = {}) {
  return {
    ...baseCard(),
    _perfEffects: 1,
    _windKmh: 30,
    _windBearing: 270,
    ...extra,
  };
}

test("wind lines draw along the wind, fade out and start again", () => {
  const card = windCard();
  const ctx = createContext();

  for (let i = 0; i < 400; i++) drawWindLines(card, ctx, 400, 200);

  assert.ok(card._windLines.length >= 3);
  assert.ok(ctx.strokeCalls > 0);
  // From the west every line runs left to right.
  for (const line of card._windLines) assert.ok(line.pts[line.pts.length - 2] > line.pts[0]);
});

test("wind lines follow the wind bearing", () => {
  const card = windCard({ _windBearing: 90 });

  drawWindLines(card, createContext(), 400, 200);

  for (const line of card._windLines) assert.ok(line.pts[line.pts.length - 2] < line.pts[0]);
});

test("stronger wind brings more wind lines", () => {
  const calm = windCard({ _windKmh: 15 });
  const storm = windCard({ _windKmh: 90 });

  drawWindLines(calm, createContext(), 400, 200);
  drawWindLines(storm, createContext(), 400, 200);

  assert.ok(storm._windLines.length > calm._windLines.length);
});

test("the flow field streams with the wind", () => {
  const card = windCard({ _windBearing: 90 });
  const ctx = createContext();

  drawWindFlow(card, ctx, 400, 200);
  const before = card._flow.map((f) => f.x);
  for (let i = 0; i < 5; i++) drawWindFlow(card, ctx, 400, 200);
  const moved = card._flow.filter((f, i) => f.age > 5 && f.x < before[i]).length;

  assert.ok(card._flow.length >= 50);
  assert.ok(moved > card._flow.length / 2, `${moved}`);
  assert.ok(ctx.strokeCalls > 0);
});

test("a wind line ends by shrinking from its tail, not by stopping", () => {
  const card = windCard();
  const ctx = createContext();
  drawWindLines(card, ctx, 400, 200);
  const line = card._windLines[0];
  line.delay = 0;
  let shrinking = 0;
  let rebuilt = false;
  for (let i = 0; i < 2000 && !rebuilt; i++) {
    const pts = line.pts;
    const before = { head: line.head, len: line.head - line.tail };
    drawWindLines(card, ctx, 400, 200);
    if (line.pts !== pts) rebuilt = true;
    // The front still moves on while the line gets shorter from behind.
    else if (line.head > before.head && line.head - line.tail < before.len) shrinking++;
  }

  assert.ok(rebuilt);
  assert.ok(shrinking > 3, String(shrinking));
  // Thin strokes.
  assert.ok(card._windLines.every((l) => l.width <= 1.2));
});

test("wind line ends glide between the points instead of jumping", () => {
  const card = windCard({ _animationSpeed: 0 });
  drawWindLines(card, createContext(), 400, 200);
  const [line, ...rest] = card._windLines;
  for (const other of rest) other.delay = 1;
  line.delay = 0;
  line.tail = 10.25;
  line.head = 30.5;
  const moves = [];
  const ctx = { ...createContext(), moveTo: (x, y) => moves.push([x, y]) };

  drawWindLines(card, ctx, 400, 200);

  const at = (i) => [line.pts[i * 2], line.pts[i * 2 + 1]];
  const [x0, y0] = at(10);
  const [x1, y1] = at(11);
  // The tail sits a quarter of the way to the next point, not on point 10.
  assert.ok(Math.abs(moves[0][0] - (x0 + (x1 - x0) * 0.25)) < 1e-4);
  assert.ok(Math.abs(moves[0][1] - (y0 + (y1 - y0) * 0.25)) < 1e-4);
});

test("the demo can spawn a shooting star or a comet on demand", () => {
  const card = baseCard();
  card._layerFadeProgress.stars = 1;
  card._renderState = { isBadWeatherForComets: false };
  card._shootingStars = [];
  card._comets = [];
  card._isNight = true;
  card._isThemeDark = true;
  card._perfEffects = 1;
  const ctx = createContext();
  const originalRandom = Math.random;
  // A roll that never spawns on its own.
  Math.random = () => 0.999;
  try {
    drawShootingStars(card, ctx, 100, 100, { MAX_SHOOTING_STARS: 2 }, 12);
    drawComets(card, ctx, 100, 100, 12);
    assert.equal(card._shootingStars.length + card._comets.length, 0);
    card._forceShootingStar = true;
    card._forceComet = true;
    drawShootingStars(card, ctx, 100, 100, { MAX_SHOOTING_STARS: 2 }, 12);
    drawComets(card, ctx, 100, 100, 12);
  } finally {
    Math.random = originalRandom;
  }
  assert.equal(card._shootingStars.length, 1);
  assert.equal(card._comets.length, 1);
  assert.equal(card._forceShootingStar, false);
  assert.equal(card._forceComet, false);
});

test("comets and shooting stars get every color on dark themes and ink tones on light ones", () => {
  const light = cometColors({ _isThemeDark: false });
  assert.equal(light._coreRgb, "50,60,75");
  // Each roll picks another color; walk through all of them instead of hoping
  // the random numbers of a test run hit every one.
  const originalRandom = Math.random;
  const comets = new Set();
  const stars = new Set();
  try {
    for (const roll of [0.1, 0.6, 0.85, 0.95]) {
      Math.random = () => roll;
      const dark = cometColors({ _isThemeDark: true });
      assert.match(dark._coreRgb, /^[0-9]+,[0-9]+,[0-9]+$/);
      comets.add(dark._coreRgb);
      const card = baseCard();
      Object.assign(card, { _isNight: true, _isThemeDark: true, _perfEffects: 1, _shootingStars: [], _forceShootingStar: true });
      card._layerFadeProgress.stars = 1;
      card._renderState = { isBadWeatherForComets: false };
      drawShootingStars(card, createContext(), 100, 100, { MAX_SHOOTING_STARS: 2 }, 12);
      stars.add(card._shootingStars[0]._headRgb);
    }
  } finally {
    Math.random = originalRandom;
  }
  assert.ok(comets.size >= 3, [...comets].join(" "));
  assert.ok(!comets.has(light._coreRgb));
  assert.equal(stars.size, 4, [...stars].join(" "));
});

test("spawn rates follow the effect switches and sliders", () => {
  assert.equal(shootingStarRate({}), 1);
  assert.equal(cometRate({}), 1);
  const fx = { shootingStars: true, shootingStarRate: 2, comets: false, cometRate: 3 };
  assert.equal(shootingStarRate({ _fx: fx }), 2);
  assert.equal(cometRate({ _fx: fx }), 0);
});

test("switched off shooting stars do not spawn", () => {
  const card = baseCard();
  card._layerFadeProgress.stars = 1;
  card._renderState = { isBadWeatherForComets: false };
  card._shootingStars = [];
  card._perfEffects = 1;
  card._fx = { shootingStars: false, shootingStarRate: 1 };
  const originalRandom = Math.random;
  Math.random = () => 0;
  try {
    drawShootingStars(card, createContext(), 100, 100, { MAX_SHOOTING_STARS: 1 }, 12);
  } finally {
    Math.random = originalRandom;
  }
  assert.equal(card._shootingStars.length, 0);
});

test("near planes fly faster than distant ones", () => {
  assert.ok(Math.abs(planeSpeedForScale(0.5) - 0.5) < 1e-9);
  assert.ok(Math.abs(planeSpeedForScale(0.9) - 1.2) < 1e-9);
  assert.ok(planeSpeedForScale(0.7) > planeSpeedForScale(0.6));
});

// ── Wind direction ──
function gustCard(bearing) {
  return {
    ...baseCard(),
    _params: { wind: 1 },
    _windBearing: bearing,
    _windGust: 0,
    _gustPhase: 0,
    _microGustPhase: 0,
    _sunPulsePhase: 0,
    _windDir: null,
    _windDirTarget: 1,
  };
}

test("the wind blows left from the east and right from the west", () => {
  assert.ok(advanceWindAndPulse(gustCard(90)) < 0);
  assert.ok(advanceWindAndPulse(gustCard(270)) > 0);
  assert.ok(advanceWindAndPulse(gustCard(45)) < 0);
  assert.ok(advanceWindAndPulse(gustCard(315)) > 0);
  // Without a bearing the wind keeps coming from the west.
  assert.ok(advanceWindAndPulse(gustCard(undefined)) > 0);
});

test("near north and south the wind keeps its last direction", () => {
  const card = gustCard(275);
  assert.equal(windTargetDirection(card), 1);
  card._windDirTarget = 1;
  card._windBearing = 5;
  assert.equal(windTargetDirection(card), 1);
  card._windBearing = 355;
  assert.equal(windTargetDirection(card), 1);
  card._windBearing = 20;
  assert.equal(windTargetDirection(card), -1);
  card._windDirTarget = -1;
  card._windBearing = 175;
  assert.equal(windTargetDirection(card), -1);
  card._windBearing = 185;
  assert.equal(windTargetDirection(card), -1);
  card._windBearing = 200;
  assert.equal(windTargetDirection(card), 1);
});

test("a wind turn eases through a stop instead of jumping", () => {
  const card = gustCard(270);
  advanceWindAndPulse(card);
  assert.equal(card._windDir, 1);
  card._windBearing = 90;
  const dirs = [];
  for (let i = 0; i < 400; i++) {
    advanceWindAndPulse(card);
    dirs.push(card._windDir);
  }
  for (let i = 1; i < dirs.length; i++) assert.ok(dirs[i] <= dirs[i - 1]);
  assert.ok(dirs[10] > 0.9 && dirs[10] < 1);
  assert.ok(Math.abs(dirs[149]) < 0.02);
  assert.equal(dirs[299], -1);
  assert.equal(dirs[399], -1);
});

function ringCloud(x, extra = {}) {
  return {
    x,
    y: 20,
    speed: 0.03,
    layer: 2,
    seed: 120,
    breathPhase: 0,
    breathSpeed: 0,
    opacity: 1,
    scale: 1,
    _bakedCanvas: {},
    _bakeOffX: -50,
    _bakeOffY: 0,
    _atlasX: 0,
    _atlasY: 0,
    _atlasW: 100,
    _atlasH: 10,
    _bakeLogicalW: 100,
    _bakeLogicalH: 10,
    ...extra,
  };
}

function cloudCard() {
  const card = baseCard();
  card._layerFadeProgress.clouds = 1;
  card._renderState = {};
  card._perfEffects = 0;
  return card;
}

test("a cloud that left the card comes back just outside the windward edge", () => {
  const card = cloudCard();
  const w = 400;
  // Image spans x-50 .. x+50, so at x = 460 it is fully past the right edge.
  const cloud = ringCloud(460);
  drawClouds(card, createContext(), [cloud], w, 100, 1);
  assert.ok(cloud.x + 50 < 0, `right edge off the left side, x=${cloud.x}`);
  assert.ok(cloud.x + 50 > -300, `close to the edge, x=${cloud.x}`);
  assert.ok(cloud._fadeAlpha < 1);
  // It fades in before it shows and then drifts on with the wind.
  let frames = 0;
  while (cloud.x + 50 < 0 && frames < 100000) {
    drawClouds(card, createContext(), [cloud], w, 100, 1);
    frames++;
  }
  assert.equal(cloud._fadeAlpha, 1);
  assert.ok(frames > 0);
});

test("with the wind from the east a cloud leaves on the left and returns on the right", () => {
  const card = cloudCard();
  const cloud = ringCloud(-60);
  drawClouds(card, createContext(), [cloud], 400, 100, -1);
  assert.ok(cloud.x - 50 > 400, `left edge past the right side, x=${cloud.x}`);
  assert.ok(cloud.x - 50 < 700, `close to the edge, x=${cloud.x}`);
});

test("a cloud still partly on the card drifts on and is not moved", () => {
  const card = cloudCard();
  const cloud = ringCloud(430);
  drawClouds(card, createContext(), [cloud], 400, 100, 1);
  assert.ok(cloud.x > 430 && cloud.x < 431, `x=${cloud.x}`);
  assert.equal(cloud._fadeAlpha, 1);
  // A cloud without its baked image is never wrapped either.
  const unbaked = ringCloud(460, { _bakedCanvas: null });
  drawClouds(card, createContext(), [unbaked], 400, 100, 1);
  assert.ok(unbaked.x > 460);
});

test("in strong wind the fade keeps up with the drift", () => {
  const card = cloudCard();
  const w = 400;
  const cloud = ringCloud(460, { speed: 3 });
  drawClouds(card, createContext(), [cloud], w, 100, 10);
  let frames = 0;
  while (cloud.x + 50 < 0 && frames < 1000) {
    drawClouds(card, createContext(), [cloud], w, 100, 10);
    frames++;
  }
  assert.equal(cloud._fadeAlpha, 1, "opaque before it shows");
  assert.ok(frames < 60, `fast re-entry, ${frames} frames`);
});
