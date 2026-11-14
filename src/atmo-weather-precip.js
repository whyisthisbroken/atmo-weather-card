// Rain, snow and leaves on the wind.
//
// Rain: fewer, longer drops at a steady pace (rain falls at terminal
// velocity); part of them splash on the bottom edge, where the drop springs
// back in a small arc and two droplets fly out. Snow: soft flakes whose size
// sets their depth, swinging like a pendulum on a straight line slanted by the
// wind; part of them settle on a thin snow edge along the bottom. Leaves cross
// the card on windy days, green in spring and summer, autumn colours in autumn
// and winter.
//
// Speeds are in px/s. One frame at 30 fps is 1/30 s times the frame scale, so
// every frame rate moves at the same speed.

const TWO_PI = Math.PI * 2;
const REF_AREA = 420 * 230;

// Particle counts grow with the card's area, so a wall panel isn't sparse and
// a small tile isn't crowded.
export function areaFactor(w, h) {
  return Math.min(3, Math.max(0.6, (w * h) / REF_AREA)) || 1;
}
const between = (a, b) => a + Math.random() * (b - a);
export const frameSeconds = (card) =>
  ((card._frameScale || 1) * card._animationSpeed) / 30;
const windStep = (card) => (card._frameScale || 1) * card._animationSpeed;

// Particles are created for the highest density; the density option decides
// how many of them are drawn, so the sliders work without a rebuild.
export const MAX_DENSITY = 3;
export const RAIN_SHARE = 0.18;
export const SNOW_SHARE = 0.6;

export function precipCounts(type, count, w, h) {
  let rain = 0,
    snow = 0,
    hail = 0;
  if (type === "rain") rain = count;
  else if (type === "snow") snow = count;
  else if (type === "mix") {
    rain = count / 2;
    snow = count / 2;
  } else if (type === "hail") {
    hail = Math.round(count * 0.45);
    rain = count - hail;
  }
  const area = areaFactor(w, h);
  const pool = (base, share) =>
    base > 0 ? Math.max(6, Math.ceil(base * share * MAX_DENSITY * area)) : 0;
  return { rain: pool(rain, RAIN_SHARE), snow: pool(snow, SNOW_SHARE), hail };
}

export function drawnCount(length, density) {
  if (length <= 0) return 0;
  return Math.min(length, Math.max(2, Math.round((length * density) / MAX_DENSITY)));
}

// ── Rain ──
export const RAIN_KINDS = Object.freeze({
  rain: Object.freeze({ len: [20, 28], speed: [420, 520], wMax: 2.4 }),
  storm: Object.freeze({ len: [30, 38], speed: [520, 620], wMax: 2.6 }),
  pouring: Object.freeze({ len: [36, 46], speed: [620, 760], wMax: 3 }),
});
export const RAIN_SPLASH_SHARE = 0.3;
const MAX_SPLASHES = 40;

export function rainKind(params) {
  const a = params && params.atmosphere;
  return a === "pouring" ? "pouring" : a === "storm" ? "storm" : "rain";
}

export function setupDrop(pt, kind, w, h, warm) {
  const k = RAIN_KINDS[kind];
  pt.kind = kind;
  pt.dw = between(1, k.wMax);
  pt.len = between(k.len[0], k.len[1]);
  pt.v = between(k.speed[0], k.speed[1]);
  pt.op = 0.55 + 0.45 * Math.min(1, pt.dw / 2.4);
  pt.splash = Math.random() < RAIN_SPLASH_SHARE;
  pt.splashed = false;
  pt.x = between(-w * 0.15, w * 1.15);
  // A warm start spreads the drops over the card, so it opens mid-shower.
  pt.y = warm ? between(-pt.len, h) : -pt.len - Math.random() * 30;
}

// Below the card the drops fall on the dashboard, so they take its theme:
// light drops on a dark dashboard, dark ones on a light dashboard.
function dashboardDark(card) {
  const themes = card._hass && card._hass.themes;
  return !themes || themes.darkMode !== false;
}
const spillTextures = new Map();
function spillRainTexture(card) {
  const rgb = dashboardDark(card) ? "210, 225, 255" : "70, 84, 110";
  if (!spillTextures.has(rgb)) spillTextures.set(rgb, streak(rgb));
  return spillTextures.get(rgb);
}

function rainTexture(card) {
  const rgb = card._renderState ? card._renderState.rainRgb : "220,230,245";
  if (card._rainStreakTex && card._rainStreakRgb === rgb)
    return card._rainStreakTex;
  card._rainStreakTex = streak(rgb);
  card._rainStreakRgb = rgb;
  return card._rainStreakTex;
}

function streak(rgb) {
  const c = document.createElement("canvas");
  c.width = 96;
  c.height = 8;
  const x = c.getContext("2d");
  // Head on the right, tail fading to nothing on the left.
  const g = x.createLinearGradient(0, 0, 96, 0);
  g.addColorStop(0, `rgba(${rgb},0)`);
  g.addColorStop(0.7, `rgba(${rgb},0.55)`);
  g.addColorStop(1, `rgba(${rgb},0.95)`);
  x.fillStyle = g;
  x.beginPath();
  if (x.roundRect) x.roundRect(0, 0, 96, 8, 4);
  else x.rect(0, 0, 96, 8);
  x.fill();
  return c;
}

export function spawnSplash(card, x, h, rgb) {
  const list = card._splashes;
  if (list.length >= MAX_SPLASHES) list.shift();
  const rise = between(10, 30);
  const reach = (Math.random() < 0.5 ? -1 : 1) * between(10, 24);
  list.push({
    x,
    y: h,
    t: 0,
    rgb,
    // the drop springing back up in a short arc
    arc: { rise, reach, fall: between(6, 18), dur: between(0.42, 0.56) },
    // two droplets thrown out to the sides
    dots: [-1, 1].map((side) => ({
      spread: side * between(6, 12),
      rise: between(4, 10),
      dur: between(0.22, 0.28),
    })),
  });
}

const quad = (p0, c, p1, t) =>
  (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * c + t * t * p1;

export function drawSplashes(card, ctx, dt, fade) {
  const list = card._splashes;
  if (!list || !list.length) return;
  let keep = 0;
  for (let i = 0; i < list.length; i++) {
    const s = list[i];
    s.t += dt;
    const a = s.arc;
    const arcLive = s.t < a.dur;
    if (arcLive) {
      // A short streak running along an arc that peaks near `rise`.
      const u = s.t / a.dur;
      const head = 1 - (1 - u) * (1 - u);
      const tail = Math.max(0, head - 0.28);
      const alpha = 0.85 * (u > 0.65 ? 1 - (u - 0.65) / 0.35 : 1) * fade;
      ctx.strokeStyle = `rgba(${s.rgb},${alpha.toFixed(3)})`;
      ctx.lineWidth = 1.6 - u;
      ctx.lineCap = "round";
      ctx.beginPath();
      for (let k = 0; k <= 6; k++) {
        const t = tail + ((head - tail) * k) / 6;
        const px = s.x + quad(0, a.reach, 2 * a.reach, t);
        const py = s.y + quad(0, -2 * a.rise, a.fall, t);
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    let dotsLive = false;
    for (const d of s.dots) {
      if (s.t >= d.dur) continue;
      dotsLive = true;
      const u = s.t / d.dur;
      const px = s.x + d.spread * (1 - (1 - u) * (1 - u));
      const py = s.y - 2 - d.rise * Math.sin(Math.PI * u);
      const alpha = 0.9 * (u > 0.6 ? 1 - (u - 0.6) / 0.4 : 1) * fade;
      ctx.fillStyle = `rgba(${s.rgb},${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(px, py, 1, 0, TWO_PI);
      ctx.fill();
    }
    if (arcLive || dotsLive) list[keep++] = s;
  }
  list.length = keep;
}

export function drawRain(card, ctx, w, h, effectiveWind) {
  const fade = card._layerFadeProgress.precipitation;
  if (fade <= 0 || !card._rain.length) return;
  const kind = rainKind(card._params);
  const tex = rainTexture(card);
  const dt = frameSeconds(card);
  const step = windStep(card);
  const dpr = card._cachedDimensions.dpr;
  const rgb = card._rainStreakRgb;
  const opts = card._precip || {};
  const splashes = opts.rainSplash !== false;
  const n = drawnCount(card._rain.length, opts.rainDensity ?? 1);
  const dim = card._isLightBackground ? 1 : 0.85;
  // With effect_spill, drops fall on below the card and fade out there.
  const spill = card._spill;
  const floor = spill ? h + spill.h : h;
  const spillTex = spill ? spillRainTexture(card) : null;
  for (let i = 0; i < n; i++) {
    const pt = card._rain[i];
    if (pt.kind !== kind) setupDrop(pt, kind, w, h, true);
    const depth = pt.dw / RAIN_KINDS[kind].wMax;
    const vy = pt.v * dt;
    const vx = effectiveWind * 1.8 * (depth * 0.65 + 0.35) * step;
    pt.x += vx;
    pt.y += vy;
    let len = pt.len;
    let headY = pt.y;
    if (splashes && pt.splash && pt.y >= h) {
      // The head stops on the bottom edge and the streak runs into it.
      if (!pt.splashed) {
        pt.splashed = true;
        spawnSplash(card, pt.x, h, rgb);
      }
      len = pt.len - (pt.y - h);
      headY = h;
      if (len <= 0) {
        setupDrop(pt, kind, w, h, false);
        continue;
      }
    } else if (pt.y - pt.len > floor) {
      setupDrop(pt, kind, w, h, false);
      continue;
    }
    if (pt.x > w + 40) pt.x -= w + 80;
    else if (pt.x < -40) pt.x += w + 80;
    const alpha = pt.op * fade * dim;
    if (alpha < 0.02) continue;
    const angle = Math.atan2(vy, vx);
    ctx.translate(pt.x, headY);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;
    ctx.drawImage(tex, -len, -pt.dw / 2, len, pt.dw);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (spill && headY > h) {
      const s = spill.ctx;
      s.translate(pt.x, headY - h);
      s.rotate(angle);
      s.globalAlpha = alpha * Math.max(0, 1 - (headY - h) / spill.h);
      s.drawImage(spillTex, -len, -pt.dw / 2, len, pt.dw);
      s.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }
  if (spill) spill.ctx.globalAlpha = 1;
  ctx.globalAlpha = 1;
  if (card._splashes.length) drawSplashes(card, ctx, dt, fade);
}

// ── Snow ──
export const SNOW_SIZE = Object.freeze([2, 6]);
export const SNOW_SPEED = Object.freeze([20, 38]);
const SNOW_SWAY = (10 * Math.PI) / 180;
export const SNOW_SETTLE_SHARE = 0.6;
const MAX_SETTLED = 80;

export function setupFlake(pt, w, h, warm) {
  pt.d = between(SNOW_SIZE[0], SNOW_SIZE[1]);
  const depth = (pt.d - SNOW_SIZE[0]) / (SNOW_SIZE[1] - SNOW_SIZE[0]);
  pt.depth = depth;
  pt.v =
    (SNOW_SPEED[0] + (SNOW_SPEED[1] - SNOW_SPEED[0]) * depth) * between(0.9, 1.1);
  pt.op = 0.45 + 0.45 * depth;
  pt.swing = Math.random() * TWO_PI;
  pt.swingRate = TWO_PI / (2 * between(1.4, 2.2));
  pt.settles = Math.random() < SNOW_SETTLE_SHARE;
  pt.x = between(-w * 0.1, w * 1.1);
  pt.y = warm ? between(-pt.d * 2, h) : -pt.d * 2;
}

// White flakes vanish on a light dashboard, so they turn blue-grey there.
function spillFlakeTexture(card) {
  const rgb = dashboardDark(card) ? "255,255,255" : "130,146,172";
  const key = "flake:" + rgb;
  if (!spillTextures.has(key)) spillTextures.set(key, flake(rgb));
  return spillTextures.get(key);
}

function flake(rgb) {
  const c = document.createElement("canvas");
  c.width = c.height = 32;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, `rgba(${rgb},1)`);
  g.addColorStop(0.45, `rgba(${rgb},1)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g;
  x.fillRect(0, 0, 32, 32);
  return c;
}

function flakeTexture(card) {
  if (card._flakeTex) return card._flakeTex;
  const c = document.createElement("canvas");
  c.width = c.height = 32;
  const x = c.getContext("2d");
  // Solid in the middle and soft at the rim: a crisp dot reads as punctuation.
  const g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,1)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, 32, 32);
  card._flakeTex = c;
  return c;
}

// The snow edge: a thin, uneven band along the bottom that builds up as
// flakes settle. Heights live in bins a few px wide.
export const PILE_BIN = 6;
export const PILE_MAX = 7;

export function snowPile(card, w, h) {
  let pile = card._snowPile;
  const bins = Math.ceil(w / PILE_BIN) + 3;
  if (!pile || pile.n !== bins) {
    const heights = new Float32Array(bins);
    const max = PILE_MAX * Math.min(1.4, Math.sqrt(areaFactor(w, h)));
    // Start part grown, so the edge is there when the card opens.
    let wave = Math.random() * TWO_PI;
    for (let i = 0; i < bins; i++) {
      wave += 0.35 + Math.random() * 0.3;
      heights[i] = max * (0.45 + 0.12 * Math.sin(wave) + Math.random() * 0.06);
    }
    pile = card._snowPile = { n: bins, heights, max };
  }
  return pile;
}

export function pileAt(pile, x) {
  if (!pile) return 0;
  const f = Math.max(0, Math.min(pile.n - 1.001, x / PILE_BIN + 1));
  const i = Math.floor(f);
  return pile.heights[i] + (pile.heights[i + 1] - pile.heights[i]) * (f - i);
}

export function addToPile(pile, x, d) {
  const c = Math.round(x / PILE_BIN + 1);
  for (let k = -2; k <= 2; k++) {
    const i = c + k;
    if (i < 0 || i >= pile.n) continue;
    const room = 1 - pile.heights[i] / pile.max;
    pile.heights[i] += d * 0.05 * (1 - Math.abs(k) * 0.3) * Math.max(0, room);
  }
}

// Sharp steps even out slowly, the way loose snow slumps.
export function settlePile(pile, dt) {
  const hs = pile.heights;
  const k = Math.min(1, dt * 0.6) * 0.5;
  for (let i = 1; i < pile.n - 1; i++) {
    hs[i] += ((hs[i - 1] + hs[i + 1]) / 2 - hs[i]) * k;
  }
}

function drawPile(card, ctx, pile, h, fade) {
  const hs = pile.heights;
  const g = ctx.createLinearGradient(0, h - pile.max * 1.3, 0, h);
  const light = card._isLightBackground;
  g.addColorStop(0, `rgba(255,255,255,${light ? 0.95 : 0.8})`);
  g.addColorStop(1, light ? "rgba(232,240,250,0.9)" : "rgba(196,208,226,0.7)");
  ctx.globalAlpha = fade;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(-PILE_BIN, h + 1);
  let px = -PILE_BIN,
    py = h - hs[0];
  ctx.lineTo(px, py);
  for (let i = 1; i < pile.n; i++) {
    const x = (i - 1) * PILE_BIN,
      y = h - hs[i];
    ctx.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2);
    px = x;
    py = y;
  }
  ctx.lineTo(px, py);
  ctx.lineTo(px, h + 1);
  ctx.closePath();
  ctx.fill();
  // A soft rim, so the top doesn't read as a hard line.
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

export function drawSnow(card, ctx, w, h, effectiveWind) {
  const fade = card._layerFadeProgress.precipitation;
  if (fade <= 0 || !card._snow.length) return;
  const tex = flakeTexture(card);
  const dt = frameSeconds(card);
  const step = windStep(card);
  const opts = card._precip || {};
  const settled = card._settled;
  const pile = opts.snowEdge !== false ? snowPile(card, w, h) : null;
  if (pile) {
    settlePile(pile, dt);
    drawPile(card, ctx, pile, h, fade);
  }
  const n = drawnCount(card._snow.length, opts.snowDensity ?? 1);
  const boost = card._isLightBackground ? 1.15 : 1;
  const spill = card._spill;
  const floor = spill ? h + spill.h : h;
  const spillTex = spill ? spillFlakeTexture(card) : null;
  for (let i = 0; i < n; i++) {
    const pt = card._snow[i];
    if (pt.d === undefined) setupFlake(pt, w, h, true);
    pt.swing += pt.swingRate * dt;
    pt.y += pt.v * dt;
    // A straight line slanted by the wind; nearer flakes drift more.
    pt.x += effectiveWind * 0.55 * (pt.depth * 0.6 + 0.4) * step;
    // The pendulum hangs from a point about five flake sizes above.
    const theta = SNOW_SWAY * Math.sin(pt.swing);
    const arm = pt.d * 5.5;
    const sx = pt.x + arm * Math.sin(theta);
    const sy = pt.y - arm * (1 - Math.cos(theta));
    const ground = h - pileAt(pile, sx);
    if (pt.settles && sy >= ground - pt.d * 0.5) {
      if (settled.length >= MAX_SETTLED) settled.shift();
      settled.push({
        x: sx,
        y: ground - pt.d * 0.45,
        d: pt.d,
        op: pt.op,
        t: 0,
        life: between(1.6, 3.2),
      });
      if (pile) addToPile(pile, sx, pt.d);
      setupFlake(pt, w, h, false);
      continue;
    }
    if (sy - pt.d > floor) {
      setupFlake(pt, w, h, false);
      continue;
    }
    if (pt.x > w + 30) pt.x -= w + 60;
    else if (pt.x < -30) pt.x += w + 60;
    ctx.globalAlpha = Math.min(1, pt.op * fade * boost);
    ctx.drawImage(tex, sx - pt.d / 2, sy - pt.d / 2, pt.d, pt.d);
    if (spill && sy + pt.d / 2 > h) {
      spill.ctx.globalAlpha = Math.min(1, pt.op * fade * boost) * Math.max(0, 1 - (sy - h) / spill.h);
      spill.ctx.drawImage(spillTex, sx - pt.d / 2, sy - h - pt.d / 2, pt.d, pt.d);
    }
  }
  if (spill) spill.ctx.globalAlpha = 1;
  // Settled flakes melt into the edge: they shrink and fade.
  let keep = 0;
  for (let i = 0; i < settled.length; i++) {
    const s = settled[i];
    s.t += dt;
    const u = s.t / s.life;
    if (u >= 1) continue;
    const d = s.d * (1 - 0.4 * u);
    ctx.globalAlpha = Math.min(1, s.op * (1 - u) * fade * boost);
    ctx.drawImage(tex, s.x - d / 2, s.y - d / 2, d, d);
    settled[keep++] = s;
  }
  settled.length = keep;
  ctx.globalAlpha = 1;
}

// ── Leaves ──
export const LEAF_PALETTES = Object.freeze({
  green: Object.freeze(["#4f7f2f", "#5f8f3a", "#6f9e3c", "#7da23f", "#8fae45", "#a3b84a"]),
  autumn: Object.freeze(["#c9a227", "#d98a2b", "#c46a28", "#bf5a2a", "#8f3f24", "#7a4a2a"]),
});
export const LEAF_SPEED = Object.freeze([90, 160]);
export const LEAF_GAP = Object.freeze([0.9, 1.4]);
export const LEAVES_AT_ONCE = 3;

// Spring and summer have green leaves, autumn and winter autumn colours.
// South of the equator the seasons are the other way round.
export function leafSeason(date, latitude) {
  const m = date.getMonth();
  const northGreen = m >= 2 && m <= 7; // March to August
  if (Number(latitude) < 0) return northGreen ? "autumn" : "green";
  return northGreen ? "green" : "autumn";
}

function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${Math.round(((n >> 16) & 255) * f)},${Math.round(((n >> 8) & 255) * f)},${Math.round((n & 255) * f)})`;
}

export function spawnLeaf(card, w, h, dir) {
  const hass = card._hass;
  const season = leafSeason(new Date(), hass && hass.config && hass.config.latitude);
  const palette = LEAF_PALETTES[season];
  const s = between(6, 14) * Math.min(1.4, Math.sqrt(areaFactor(w, h)));
  const startY = 20 + Math.random() * Math.max(40, h - 40);
  const gust = Math.random();
  // A quarter are weak and sink, a few catch an updraft and rise.
  const weak = gust < 0.25;
  const updraft = gust > 0.8 && startY > h * 0.45;
  const kmh = Math.max(card._windKmh || 0, 15);
  const windFactor = Math.min(2.2, Math.max(0.6, kmh / 30));
  const speed = between(LEAF_SPEED[0], LEAF_SPEED[1]) * windFactor * (weak ? 0.6 : 1);
  const x0 = dir > 0 ? -s - 10 : w + s + 10;
  const x1 = dir > 0 ? w + s + 10 : -s - 10;
  const rise = updraft
    ? -between(60, 140)
    : weak
      ? between(80, 160)
      : (Math.random() - 0.5) * 80;
  const color = palette[Math.floor(Math.random() * palette.length)];
  const night = card._isNight ? 0.45 : 1;
  return {
    s,
    x0,
    x1,
    y0: startY,
    rise,
    weak,
    dur: Math.abs(x1 - x0) / speed,
    t: 0,
    rot: Math.random() * TWO_PI,
    spin: ((120 + Math.random() * 180) * Math.PI) / 180,
    flip: Math.random() * TWO_PI,
    flipRate: between(2.5, 5),
    fill: shade(color, night),
    rib: shade(color, 0.7 * night),
  };
}

// `angle` is the screen direction the wind blows to. Leaves cross the card
// horizontally in that direction, tilted a little by its vertical part.
export function drawLeaves(card, ctx, w, h, angle) {
  const dt = frameSeconds(card);
  const dir = Math.cos(angle) >= 0 ? 1 : -1;
  const leaves = card._leaves;
  const density = (card._precip && card._precip.leafDensity) ?? 1;
  const cap = Math.max(1, Math.round(LEAVES_AT_ONCE * density * Math.sqrt(areaFactor(w, h))));
  card._leafTimer = (card._leafTimer ?? between(0.15, 0.5)) - dt;
  if (card._leafTimer <= 0) {
    if (leaves.length < cap) leaves.push(spawnLeaf(card, w, h, dir));
    card._leafTimer = between(LEAF_GAP[0], LEAF_GAP[1]) / Math.max(0.5, density);
  }
  const slope = Math.sin(angle) * 0.35;
  const dpr = card._cachedDimensions.dpr;
  let keep = 0;
  for (let i = 0; i < leaves.length; i++) {
    const L = leaves[i];
    L.t += dt;
    const u = L.t / L.dur;
    if (u >= 1) continue;
    leaves[keep++] = L;
    const x = L.x0 + (L.x1 - L.x0) * u;
    const ease = L.weak
      ? 1 - Math.cos((u * Math.PI) / 2)
      : (1 - Math.cos(u * Math.PI)) / 2;
    const y =
      L.y0 +
      L.rise * ease +
      slope * Math.abs(x - L.x0) +
      Math.sin(L.t * 3 + L.flip) * 3;
    // Tumbling: now and then the leaf turns its edge towards you.
    const flip = 0.35 + 0.65 * Math.abs(Math.cos(L.flip + L.t * L.flipRate * 0.5));
    const r = L.s / 2;
    ctx.globalAlpha = 0.9 * Math.min(1, L.t / 0.25);
    ctx.translate(x, y);
    ctx.rotate(L.rot + L.spin * u);
    ctx.scale(1, flip);
    // A soft shadow, then the leaf: two curves meeting in a point at each end.
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath();
    ctx.moveTo(-r, -r + 1.2);
    ctx.quadraticCurveTo(r, -r + 1.2, r, r + 1.2);
    ctx.quadraticCurveTo(-r, r + 1.2, -r, -r + 1.2);
    ctx.fill();
    ctx.fillStyle = L.fill;
    ctx.beginPath();
    ctx.moveTo(-r, -r);
    ctx.quadraticCurveTo(r, -r, r, r);
    ctx.quadraticCurveTo(-r, r, -r, -r);
    ctx.fill();
    ctx.strokeStyle = L.rib;
    ctx.lineWidth = Math.max(0.5, L.s / 14);
    ctx.beginPath();
    ctx.moveTo(-r * 0.8, -r * 0.8);
    ctx.lineTo(r * 0.8, r * 0.8);
    ctx.stroke();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  leaves.length = keep;
  ctx.globalAlpha = 1;
}
