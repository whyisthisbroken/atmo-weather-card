import { test } from "node:test";
import assert from "node:assert/strict";

import {
  drawClouds,
  drawFog,
  drawHail,
  drawLightning,
  drawRain,
  drawShootingStars,
  drawSnow,
} from "../atmo-weather-animations.js";

function createContext() {
  return {
    drawImageCalls: 0,
    fillCalls: 0,
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
    beginPath() {},
    arc() {},
    ellipse() {},
    save() {},
    restore() {},
    fillRect() {},
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

test("drawFog moves and renders fog banks", () => {
  const card = baseCard();
  card._fogBanks = [
    { x: 10, y: 20, w: 40, h: 10, speed: 1, phase: 0, opacity: 0.5, layer: 0 },
  ];
  const ctx = createContext();

  drawFog(card, ctx, 100);

  assert.ok(card._fogBanks[0].x > 10);
  assert.equal(ctx.fillCalls, 1);
  assert.equal(ctx.globalAlpha, 1);
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

test("drawLightning removes expired bolts", () => {
  const card = baseCard();
  card._params = { thunder: true };
  card._config = { card_style: "immersive" };
  card._bolts = [
    {
      alpha: 0.01,
      glow: 0,
      segments: [{ x: 0, y: 0, nx: 10, ny: 10, branch: false }],
      _outerStroke: "white",
      _coreStroke: "white",
      _branchStroke: "white",
      _glowStroke: "white",
    },
  ];
  card._flashOpacity = 0;
  card._flashHold = 0;
  card._isLightBackground = false;
  card._isThemeDark = true;
  card._createBolt = () => {
    throw new Error("unexpected bolt spawn");
  };
  const ctx = createContext();
  const originalRandom = Math.random;
  Math.random = () => 1;

  try {
    drawLightning(card, ctx, 100, 100, { MAX_BOLTS: 4 });
  } finally {
    Math.random = originalRandom;
  }

  assert.equal(card._bolts.length, 0);
  assert.ok(ctx.strokeCalls > 0);
});
