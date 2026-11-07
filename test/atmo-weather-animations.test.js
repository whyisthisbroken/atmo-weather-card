import { test } from "node:test";
import assert from "node:assert/strict";

import {
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

for (const fps of [24, 30, 60, 120]) {
  test(`animation speed per second is the same at ${fps} fps`, () => {
    const card = { _perfFps: fps, _lastFrameTime: 0 };
    let progress = 0;
    for (let t = 1000 / fps; t <= 1000.01; t += 1000 / fps) {
      if (!shouldSkipFrame(card, t)) progress += card._frameScale;
    }

    // One second always advances 30 base frames, whatever the frame rate.
    assert.ok(Math.abs(progress - 30) < 0.5, `${progress}`);
  });
}

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
