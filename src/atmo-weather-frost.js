// Rime on the card like on a car windscreen: a milky, grainy ice layer that
// grows in from the edges in uneven patches. Temperature sets how far it
// reaches, humidity how thick it is. It takes the light without moving:
// warmer towards the sun with a few still points, matte under clouds, cool
// blue at night. It only moves when it grows or thaws.

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// States where water on the glass is rain, not rime, while it is above 0 °C.
const WET_STATES = new Set(["rainy", "pouring", "lightning-rainy", "snowy-rainy", "hail"]);

// The amount at 0 °C. Below that amount the rime hardly shows, and a car
// windscreen at 0 °C in humid air is plainly white at the edges.
export const FROST_AT_ZERO = 0.65;

// How much rime: { amount 0..1, density 0..1 }. Temperature in °C, humidity
// in %. Above 0 °C only in very humid air (from 85 %) and up to +3.5 °C: on a
// clear morning the glass is colder than the air, so a rim of rime shows
// already at +1 °C. From 0 °C always, reaching further down to -12 °C.
export function frostLevel(temperature, humidity, state) {
  const t = Number(temperature);
  if (temperature == null || !Number.isFinite(t)) return { amount: 0, density: 0 };
  const rh = Number(humidity);
  const hasRh = humidity != null && Number.isFinite(rh);
  if (t > 0) {
    if (!hasRh || WET_STATES.has(state)) return { amount: 0, density: 0 };
    const wet = clamp01((rh - 85) / 15);
    const near = Math.pow(clamp01((3.5 - t) / 3.5), 0.6);
    return { amount: FROST_AT_ZERO * near * wet, density: 0.3 + 0.4 * wet };
  }
  const humid = hasRh ? clamp01((rh - 50) / 50) : 0.4;
  return { amount: FROST_AT_ZERO + (1 - FROST_AT_ZERO) * clamp01(-t / 12), density: 0.3 + 0.7 * humid };
}

// Growth per second of the amount: the full layer in about a minute, thawing
// twice as fast.
export const FROST_GROW_PER_S = 1 / 60;
export const FROST_THAW_PER_S = 1 / 30;
// The layer is redrawn at most this often while it grows or thaws.
export const FROST_REDRAW_MS = 1000;

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function valueNoise(seed) {
  const r = rng(seed);
  const vals = new Float32Array(256),
    perm = new Uint8Array(512);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  for (let i = 0; i < 256; i++) vals[i] = r();
  const lat = (x, y) => vals[perm[(perm[x & 255] + y) & 255]];
  const sm = (t) => t * t * (3 - 2 * t);
  return (x, y) => {
    const ix = Math.floor(x),
      iy = Math.floor(y),
      fx = sm(x - ix),
      fy = sm(y - iy);
    const a = lat(ix, iy),
      b = lat(ix + 1, iy),
      c = lat(ix, iy + 1),
      d = lat(ix + 1, iy + 1);
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  };
}

// The field is worked out at this width at most and stretched to the card.
const FIELD_MAX_W = 240;
// One grain per this many square pixels, and never more than GRAIN_MAX.
const GRAIN_AREA = 10;
const GRAIN_MAX = 26000;

export class FrostLayer {
  constructor(container, seed = 3) {
    this.container = container;
    this.seed = seed;
    this.w = 0;
    this.h = 0;
    this.amount = 0;
    this.density = 0;
    this.light = null;
    const doc = container.ownerDocument || document;
    // The milky glass: blurs and brightens what lies behind the rime.
    this.glass = doc.createElement("div");
    this.glass.className = "frost-glass";
    this.mask = doc.createElement("canvas");
    this.tex = doc.createElement("canvas");
    this.tex.className = "frost-grain";
    this.lit = doc.createElement("canvas");
    this.lit.className = "frost-light";
    container.append(this.glass, this.tex, this.lit);
  }

  // Card size in CSS pixels. Builds the field and the grains again.
  resize(w, h) {
    w = Math.round(w);
    h = Math.round(h);
    if (w <= 0 || h <= 0 || (w === this.w && h === this.h)) return false;
    this.w = w;
    this.h = h;
    const scale = Math.min(1, FIELD_MAX_W / w);
    const fw = Math.max(8, Math.round(w * scale)),
      fh = Math.max(4, Math.round(h * scale));
    this.fw = fw;
    this.fh = fh;
    this.fs = fw / w;
    const noise = valueNoise(this.seed),
      streaks = valueNoise(this.seed + 9);
    // Edges first, uneven patches, a few long streaks.
    this.field = new Float32Array(fw * fh);
    for (let y = 0; y < fh; y++) {
      for (let x = 0; x < fw; x++) {
        const px = x / this.fs,
          py = y / this.fs;
        let n = 0,
          amp = 0.5,
          f = 1 / 70;
        for (let o = 0; o < 4; o++) {
          n += amp * noise(px * f, py * f);
          amp *= 0.5;
          f *= 2.1;
        }
        const streak = streaks(px / 140, py / 14) * 0.18;
        const d = Math.min(px, w - px, py, h - py) / (h * 0.5);
        const edge = Math.pow(Math.max(0, 1 - d), 1.6);
        this.field[y * fw + x] = 0.55 * n + 0.5 * edge + streak;
      }
    }
    this.mask.width = fw;
    this.mask.height = fh;
    const dpr = Math.min(2, (typeof window !== "undefined" && window.devicePixelRatio) || 1);
    this.dpr = dpr;
    for (const c of [this.tex, this.lit]) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    const r = rng(this.seed + 1);
    this.grains = [];
    const count = Math.min(GRAIN_MAX, Math.round((w * h) / GRAIN_AREA));
    for (let k = 0; k < count; k++) {
      const type = r() < 0.78 ? 0 : r() < 0.8 ? 1 : 2;
      this.grains.push({
        x: r() * w,
        y: r() * h,
        gate: r(),
        type,
        s: r(),
        a: r(),
        ang: (Math.floor(r() * 6) * Math.PI) / 3 + (r() - 0.5) * 0.3,
      });
    }
    return true;
  }

  // How much rime covers this point, 0..1.
  cover(x, y) {
    if (!this.field) return 0;
    const xi = Math.min(this.fw - 1, Math.max(0, (x * this.fs) | 0)),
      yi = Math.min(this.fh - 1, Math.max(0, (y * this.fs) | 0));
    const m = this.field[yi * this.fw + xi],
      threshold = 1.05 - this.amount * 0.85;
    return clamp01((m - threshold) / 0.32);
  }

  // light: { mode: "sun" | "matte" | "night", strength 0..1, x, y } with x/y
  // the sun or moon in CSS pixels.
  draw(amount, density, night, light) {
    this.amount = amount;
    this.density = density;
    this.night = night;
    this.light = light;
    if (!this.field) return;
    const { w, h, fw, fh } = this;
    const op = 0.55 + 0.45 * density;
    const mctx = this.mask.getContext("2d");
    const img = mctx && mctx.createImageData ? mctx.createImageData(fw, fh) : null;
    if (img && img.data) {
      for (let i = 0, y = 0; y < fh; y++) {
        for (let x = 0; x < fw; x++, i++) {
          const o = i * 4;
          img.data[o] = img.data[o + 1] = img.data[o + 2] = 255;
          img.data[o + 3] = amount <= 0 ? 0 : Math.round(this.cover((x + 0.5) / this.fs, (y + 0.5) / this.fs) * op * 255);
        }
      }
      mctx.putImageData(img, 0, 0);
    }
    let url = "";
    try {
      url = this.mask.toDataURL();
    } catch {
      url = "";
    }
    const g = this.glass.style;
    if (url) {
      g.webkitMaskImage = `url(${url})`;
      g.maskImage = `url(${url})`;
    }
    const blur = night ? 2 + 3 * density : 3 + 4 * density;
    const filter = night
      ? `blur(${blur.toFixed(1)}px) saturate(.7) brightness(1.25)`
      : `blur(${blur.toFixed(1)}px) saturate(.6) brightness(1.1)`;
    g.webkitBackdropFilter = filter;
    g.backdropFilter = filter;
    g.background = night
      ? `rgba(170,190,215,${(0.1 + 0.12 * density).toFixed(3)})`
      : `rgba(236,243,250,${(0.2 + 0.22 * density).toFixed(3)})`;
    this._drawGrain(w, h, night);
    this._drawLight(w, h, light);
  }

  _ctx(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);
    return ctx;
  }

  _drawGrain(w, h, night) {
    const ctx = this._ctx(this.tex);
    if (!ctx || this.amount <= 0) return;
    ctx.lineCap = "round";
    const keep = 0.25 + 0.75 * this.density;
    const dim = night ? 0.8 : 1;
    for (const g of this.grains) {
      const cv = this.cover(g.x, g.y);
      if (cv <= 0 || g.gate > cv * keep) continue;
      if (g.type === 0) {
        ctx.fillStyle = `rgba(255,255,255,${((0.25 + g.a * 0.55) * cv * dim).toFixed(3)})`;
        const s = 0.35 + g.s * 0.8;
        ctx.fillRect(g.x, g.y, s, s);
      } else {
        const l = g.type === 1 ? 1.5 + g.s * 3.5 : 1 + g.s * 2;
        ctx.strokeStyle = `rgba(255,255,255,${((0.3 + g.a * 0.4) * cv).toFixed(3)})`;
        ctx.lineWidth = 0.45;
        const arms =
          g.type === 1 ? [g.ang] : [g.ang, g.ang + (Math.PI / 3) * 2, g.ang - (Math.PI / 3) * 2];
        for (const a of arms) {
          ctx.beginPath();
          ctx.moveTo(g.x, g.y);
          ctx.lineTo(g.x + Math.cos(a) * l, g.y + Math.sin(a) * l);
          ctx.stroke();
        }
      }
    }
  }

  _drawLight(w, h, light) {
    const ctx = this._ctx(this.lit);
    if (!ctx || this.amount <= 0 || !light) return;
    const lx = light.x,
      ly = light.y,
      far = Math.hypot(w, h);
    if (light.mode === "sun") {
      const s = light.strength;
      const warm = ctx.createRadialGradient(lx, ly, 0, lx, ly, far * 0.75);
      warm.addColorStop(0, `rgba(255,238,205,${(0.38 * s).toFixed(3)})`);
      warm.addColorStop(0.45, `rgba(255,246,232,${(0.12 * s).toFixed(3)})`);
      warm.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = warm;
      ctx.fillRect(0, 0, w, h);
      const cool = ctx.createRadialGradient(lx, ly, far * 0.35, lx, ly, far);
      cool.addColorStop(0, "rgba(175,200,235,0)");
      cool.addColorStop(1, `rgba(175,200,235,${(0.22 * s).toFixed(3)})`);
      ctx.fillStyle = cool;
      ctx.fillRect(0, 0, w, h);
      // A few grains facing the sun catch the light: still, tiny, sharp.
      const r = rng(77);
      const keep = 0.25 + 0.75 * this.density;
      const max = Math.round((25 + 55 * this.amount * s) * Math.min(2, (w * h) / 120000));
      let n = 0;
      for (const g of this.grains) {
        if (n >= max) break;
        if (r() > 0.02) continue;
        const cv = this.cover(g.x, g.y);
        if (cv < 0.4 || g.gate > cv * keep) continue;
        const near = 1 - Math.min(1, Math.hypot(g.x - lx, g.y - ly) / (far * 0.8));
        if (r() > 0.25 + 0.75 * near) continue;
        const a = (0.55 + 0.45 * near) * s;
        ctx.fillStyle = `rgba(255,255,250,${(0.35 * a).toFixed(3)})`;
        ctx.fillRect(g.x - 1, g.y - 1, 2.2, 2.2);
        ctx.fillStyle = `rgba(255,255,252,${a.toFixed(3)})`;
        ctx.fillRect(g.x - 0.45, g.y - 0.45, 1.1, 1.1);
        n++;
      }
    } else if (light.mode === "night") {
      ctx.fillStyle = "rgba(140,165,210,0.22)";
      ctx.fillRect(0, 0, w, h);
      const moon = ctx.createRadialGradient(lx, ly, 0, lx, ly, far * 0.6);
      moon.addColorStop(0, `rgba(215,225,245,${(0.22 * light.strength).toFixed(3)})`);
      moon.addColorStop(1, "rgba(215,225,245,0)");
      ctx.fillStyle = moon;
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = "rgba(222,228,236,0.16)";
      ctx.fillRect(0, 0, w, h);
    }
    // Only where the rime is.
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(this.mask, 0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
  }

  // Shows or hides the layer with a soft fade (CSS transition on each part,
  // so the glass blur keeps working while it fades).
  setVisible(on) {
    for (const el of [this.glass, this.tex, this.lit]) el.style.opacity = on ? "1" : "0";
  }

  destroy() {
    this.glass.remove();
    this.tex.remove();
    this.lit.remove();
    this.field = null;
    this.grains = [];
  }
}
