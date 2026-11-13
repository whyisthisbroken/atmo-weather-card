// Real weather data and sky light: reads the optional attributes of the
// weather entity and turns them into cloud amount, precipitation density,
// haze, ground mist, twilight and sun rays. Every attribute is
// optional; without it the card looks as before.

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const num = (v) => {
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

// Options for readings from your own sensors, for example a weather station,
// and the weather attribute each one replaces.
export const SENSOR_OPTIONS = Object.freeze({
  wind_speed_entity: "wind_speed",
  wind_bearing_entity: "wind_bearing",
  temperature_entity: "temperature",
  humidity_entity: "humidity",
  dew_point_entity: "dew_point",
  cloud_coverage_entity: "cloud_coverage",
  visibility_entity: "visibility",
});
// The unit attribute that goes with a reading.
const SENSOR_UNITS = {
  wind_speed: "wind_speed_unit",
  temperature: "temperature_unit",
  dew_point: "dew_point_unit",
  visibility: "visibility_unit",
};
const POINTS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
// A wind direction in degrees, or as a compass point like "NW".
function bearingOf(state) {
  const n = num(state);
  if (n != null) return n;
  const i = POINTS.indexOf(String(state || "").trim().toUpperCase());
  return i >= 0 ? i * 22.5 : null;
}
// Dew point in °C from temperature in °C and relative humidity (Magnus).
export function dewPointC(tempC, humidity) {
  if (tempC == null || humidity == null || humidity <= 0) return null;
  const g = Math.log(Math.min(humidity, 100) / 100) + (17.62 * tempC) / (243.12 + tempC);
  return Math.round(((243.12 * g) / (17.62 - g)) * 10) / 10;
}

// The weather attributes with the readings of your own sensors laid over
// them. `readings` maps a weather attribute to the state object of its
// sensor. A sensor that is missing, unknown or unavailable keeps the value of
// the weather entity. Without a dew point sensor, but with your own
// temperature or humidity, the dew point is worked out from both, so it fits
// the station.
export function mergeWeatherSensors(attrs, readings) {
  const base = attrs || {};
  const out = { ...base };
  // The dew point of the weather entity is in the unit of its temperature.
  if (out.dew_point != null && !out.dew_point_unit && out.temperature_unit)
    out.dew_point_unit = out.temperature_unit;
  const own = new Set();
  for (const [attr, obj] of Object.entries(readings || {})) {
    if (!obj) continue;
    const value = attr === "wind_bearing" ? bearingOf(obj.state) : num(obj.state);
    if (value == null) continue;
    out[attr] = value;
    own.add(attr);
    const unit = obj.attributes && obj.attributes.unit_of_measurement;
    if (SENSOR_UNITS[attr] && unit) out[SENSOR_UNITS[attr]] = unit;
  }
  if (!own.has("dew_point") && (own.has("temperature") || own.has("humidity"))) {
    const t = num(out.temperature);
    const tC = t != null && String(out.temperature_unit || "").includes("F") ? ((t - 32) * 5) / 9 : t;
    const dp = dewPointC(tC, num(out.humidity));
    if (dp != null) {
      out.dew_point = dp;
      out.dew_point_unit = "°C";
    }
  }
  return out;
}

// Normalizes the attributes the effects use: km, mm/h and degrees Celsius.
// The rain amount only comes from the optional precipitation sensor.
export function readWeatherData(attrs, precipEntity) {
  const a = attrs || {};
  let visibility = num(a.visibility);
  const visUnit = String(a.visibility_unit || "km").toLowerCase();
  if (visibility != null && visUnit.startsWith("mi")) visibility *= 1.609;
  else if (visibility != null && visUnit === "m") visibility /= 1000;
  let precipitation = precipEntity ? num(precipEntity.state) : null;
  const precUnit = String(
    (precipEntity &&
      precipEntity.attributes &&
      precipEntity.attributes.unit_of_measurement) ||
      "mm/h",
  ).toLowerCase();
  if (precipitation != null && precUnit.startsWith("in")) precipitation *= 25.4;
  let temperature = num(a.temperature),
    dewPoint = num(a.dew_point);
  const toC = (v) => ((v - 32) * 5) / 9;
  if (temperature != null && String(a.temperature_unit || "").includes("F"))
    temperature = toC(temperature);
  // The dew point can come from its own sensor with its own unit.
  if (dewPoint != null && String(a.dew_point_unit || a.temperature_unit || "").includes("F"))
    dewPoint = toC(dewPoint);
  return {
    coverage: num(a.cloud_coverage),
    precipitation,
    visibility,
    humidity: num(a.humidity),
    temperature,
    dewPoint,
  };
}

// Cloud amount and precipitation density from the measured values. Values are
// rounded into steps, so small sensor changes don't rebuild the scene.
export function adjustParams(params, data) {
  const p = { ...params };
  if (data.coverage != null && p.type !== "fog") {
    const cov = clamp(data.coverage, 0, 100);
    const clouds = Math.round((cov * 0.45) / 3) * 3;
    if (params.overcast) {
      // Rain needs clouds: keep at least 60 % of the usual amount.
      p.cloud = Math.round(
        clamp(clouds, params.cloud * 0.6, params.cloud * 1.1),
      );
      p.overcast = cov >= 70;
    } else p.cloud = clouds;
  }
  if (data.precipitation != null) {
    const mm = Math.max(0, data.precipitation);
    if (p.type === "rain")
      p.count = Math.round(clamp(40 + 30 * mm, 40, 280) / 10) * 10;
    else if (p.type === "snow")
      p.count = Math.round(clamp(20 + 20 * mm, 20, 150) / 10) * 10;
  }
  return p;
}

// How much warm low sun reaches the scene in each weather state.
const GOLDEN_STATES = { sunny: 1, "clear-night": 1, partlycloudy: 1, windy: 0.9, "windy-variant": 0.7, exceptional: 1, cloudy: 0.45, fog: 0.3 };

// Strength (0..1) of every sky light effect for the current conditions.
export function computeAtmosphere(
  data,
  { state, isTimeNight, sunElev, effects },
) {
  const out = {
    haze: 0,
    mist: 0,
    twilight: 0,
    starVisibility: 1,
    rays: 0,
    golden: 0,
    sunset: 0,
    sunElev,
  };
  const elev = sunElev;
  const foggy = state === "fog";
  if (!foggy) {
    const visTerm =
      data.visibility == null ? 0 : clamp((20 - data.visibility) / 18, 0, 1);
    const humTerm =
      data.humidity == null ? 0 : clamp((data.humidity - 80) / 20, 0, 1) * 0.5;
    out.haze = Math.max(visTerm, humTerm);
    // Mist forms when the air cools to its dew point: at night and in the
    // morning, not in heavy rain.
    if (
      data.temperature != null &&
      data.dewPoint != null &&
      (elev == null || elev < 12) &&
      state !== "pouring"
    ) {
      const spread = data.temperature - data.dewPoint;
      out.mist = clamp((2.5 - spread) / 2.5, 0, 1);
    }
  }
  if (elev != null && isTimeNight) {
    // Civil twilight: the sky stays blue until the sun is 6 degrees down,
    // and the stars come out one by one until about 8 degrees.
    out.twilight = clamp(1 + elev / 6, 0, 1);
    out.starVisibility = clamp(-elev / 8, 0.15, 1);
  }
  // Golden hour: below about 12 degrees the light turns warm, and in the last
  // few degrees before the horizon it deepens to the orange of a sunset.
  // After sunset the afterglow fades over the blue hour until 6 degrees
  // down, so the change from day to night has no jump. Only where the sun
  // gets through.
  if (elev != null && elev < 12) {
    const sunny = GOLDEN_STATES[state] || 0;
    if (!isTimeNight) {
      const s = clamp((12 - elev) / 10, 0, 1);
      out.golden = sunny * s * s * (3 - 2 * s);
      out.sunset = sunny * clamp((3 - elev) / 4, 0, 1);
    } else {
      out.golden = sunny * clamp((elev + 6) / 5.2, 0, 1);
      out.sunset = sunny;
    }
  }
  if (!isTimeNight && (elev == null || elev > 0)) {
    const base = state === "partlycloudy" ? 1 : state === "cloudy" ? 0.6 : 0;
    const closed = data.coverage != null && data.coverage >= 95;
    if (base > 0 && !closed)
      out.rays = base * (elev == null || elev < 35 ? 1 : 0.6);
  }
  // Effects switched off in the config.
  const fx = effects || {};
  if (fx.haze === false) out.haze = 0;
  if (fx.mist === false) out.mist = 0;
  if (fx.sunRays === false) out.rays = 0;
  if (fx.goldenHour === false) {
    out.golden = 0;
    out.sunset = 0;
  }
  if (fx.blueHour === false) {
    out.twilight = 0;
    out.starVisibility = 1;
  }
  return out;
}

// ---------------------------------------------------------------- drawing

function cacheCanvas(card, key, w, h, build) {
  const store = card._atmoCache || (card._atmoCache = new Map());
  const hit = store.get(key);
  if (hit && hit.k === build.k) return hit.canvas;
  const dpr = card._cachedDimensions.dpr || 1;
  const pw = Math.max(1, Math.ceil(w * dpr)),
    ph = Math.max(1, Math.ceil(h * dpr));
  let canvas = hit && hit.canvas;
  if (!canvas || canvas.width !== pw || canvas.height !== ph) {
    try {
      canvas = new OffscreenCanvas(pw, ph);
    } catch (e) {
      canvas = document.createElement("canvas");
      canvas.width = pw;
      canvas.height = ph;
    }
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, pw, ph);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  build.draw(ctx);
  store.set(key, { k: build.k, canvas });
  return canvas;
}

// Deep blue sky with a soft warm band near the horizon, behind the stars.
export function drawTwilight(card, ctx, w, h) {
  const a = card._atmo;
  if (!a || a.twilight <= 0.01 || card._isImmersive) return;
  const t = a.twilight;
  const key = `${Math.round(w)}|${Math.round(h)}`;
  if (!card._twilightGrad || card._twilightGradKey !== key) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "rgba(28, 52, 104, 1)");
    g.addColorStop(0.55, "rgba(58, 88, 150, 1)");
    g.addColorStop(0.85, "rgba(120, 118, 168, 1)");
    g.addColorStop(1, "rgba(214, 140, 128, 1)");
    card._twilightGrad = g;
    card._twilightGradKey = key;
  }
  ctx.save();
  ctx.globalAlpha = Math.min(1, 0.85 * Math.pow(t, 1.4));
  ctx.fillStyle = card._twilightGrad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

// Home Assistant moves the sun every two minutes near the horizon. The light
// glides to each of these small steps in about a second instead of jumping.
// A big change (a new dashboard, another weather, a time picked in the demo)
// shows at once. Call once per frame.
export function easeGoldenLight(card) {
  const a = card._atmo;
  const target = { g: (a && a.golden) || 0, s: (a && a.sunset) || 0 };
  const cur = card._golden;
  if (
    !cur ||
    Math.abs(target.g - cur.g) > GOLDEN_SNAP ||
    Math.abs(target.s - cur.s) > GOLDEN_SNAP
  ) {
    card._golden = target;
    return target;
  }
  const k = 1 - Math.pow(0.9, card._frameScale || 1);
  for (const key of ["g", "s"]) {
    const d = target[key] - cur[key];
    cur[key] = Math.abs(d) < 0.002 ? target[key] : cur[key] + d * k;
  }
  return cur;
}
// Larger than any two minute step of the sun.
const GOLDEN_SNAP = 0.25;

// Golden hour sky: warm light that rises from the horizon, gold at first,
// then orange and rose at sunset with a touch of violet higher up. Drawn
// behind the clouds.
export function drawGoldenSky(card, ctx, w, h) {
  const cur = card._golden;
  if (!cur || cur.g <= 0.01 || card._isImmersive) return;
  const g = cur.g,
    s = cur.s;
  const key = `${Math.round(w)}|${Math.round(h)}|${Math.round(g * 60)}|${Math.round(s * 60)}`;
  if (!card._goldenSkyGrad || card._goldenSkyKey !== key) {
    const low = mix([255, 198, 104], [255, 116, 56], s);
    const mid = mix([255, 226, 166], [240, 116, 116], s);
    const upper = mix([255, 234, 196], [186, 112, 158], s);
    const high = mix([255, 240, 214], [128, 100, 162], s);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, `rgba(${high}, ${(0.26 + 0.2 * s) * g})`);
    grad.addColorStop(0.3, `rgba(${upper}, ${(0.38 + 0.12 * s) * g})`);
    grad.addColorStop(0.6, `rgba(${mid}, ${0.55 * g})`);
    grad.addColorStop(1, `rgba(${low}, ${0.8 * g})`);
    card._goldenSkyGrad = grad;
    card._goldenSkyKey = key;
  }
  ctx.save();
  ctx.fillStyle = card._goldenSkyGrad;
  ctx.fillRect(0, 0, w, h);
  // A bright warm halo where the sun stands.
  const c = card._getCelestialPosition(w, h);
  const haloKey = `${key}|${Math.round(c.x)}|${Math.round(c.y)}`;
  if (!card._goldenHalo || card._goldenHaloKey !== haloKey) {
    const halo = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, Math.max(w, h) * 0.75);
    const core = mix([255, 214, 140], [255, 150, 80], s);
    halo.addColorStop(0, `rgba(${core}, ${0.55 * g})`);
    halo.addColorStop(0.35, `rgba(${core}, ${0.18 * g})`);
    halo.addColorStop(1, `rgba(${core}, 0)`);
    card._goldenHalo = halo;
    card._goldenHaloKey = haloKey;
  }
  ctx.fillStyle = card._goldenHalo;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

// Golden hour light on everything already drawn on the layer (clouds, wind,
// birds): gold on the side of the sun, rose and at sunset a little violet
// further away.
export function drawGoldenLight(card, ctx, w, h) {
  const cur = card._golden;
  if (!cur || cur.g <= 0.01) return;
  const g = cur.g,
    s = cur.s;
  const c = card._getCelestialPosition(w, h);
  const key = `${Math.round(w)}|${Math.round(h)}|${Math.round(c.x)}|${Math.round(c.y)}|${Math.round(g * 60)}|${Math.round(s * 60)}`;
  if (!card._goldenLight || card._goldenLightKey !== key) {
    const r = Math.hypot(Math.max(c.x, w - c.x), Math.max(c.y, h - c.y));
    const near = mix([255, 196, 112], [255, 146, 74], s);
    const far = mix([255, 176, 150], [178, 112, 166], s);
    const light = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r);
    light.addColorStop(0, `rgba(${near}, ${0.62 * g})`);
    light.addColorStop(0.45, `rgba(${near}, ${0.42 * g})`);
    light.addColorStop(1, `rgba(${far}, ${0.36 * g})`);
    card._goldenLight = light;
    card._goldenLightKey = key;
  }
  ctx.save();
  // Only on what is there: the light colors the clouds, not the empty sky.
  ctx.globalCompositeOperation = "source-atop";
  ctx.fillStyle = card._goldenLight;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

// A thin veil that thickens towards the ground: low visibility or humid air.
export function drawHaze(card, ctx, w, h) {
  const a = card._atmo;
  if (!a || a.haze <= 0.01) return;
  const color = card._isTimeNight
    ? "62,70,88"
    : card._isLightBackground
      ? "214,220,228"
      : "150,160,176";
  const key = `${color}|${Math.round(h)}`;
  if (card._hazeKey !== key) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, `rgba(${color},0.25)`);
    g.addColorStop(0.6, `rgba(${color},0.6)`);
    g.addColorStop(1, `rgba(${color},1)`);
    card._hazeGrad = g;
    card._hazeKey = key;
  }
  ctx.save();
  ctx.globalAlpha = Math.min(1, 0.5 * a.haze * card._layerFadeProgress.effects);
  ctx.fillStyle = card._hazeGrad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

// Ground mist: a low band with a few soft banks drifting slowly.
export function drawMist(card, ctx, w, h) {
  const a = card._atmo;
  if (!a || a.mist <= 0.01) return;
  const color = card._isTimeNight
    ? "92,100,118"
    : card._isLightBackground
      ? "232,236,242"
      : "176,186,200";
  if (!card._mistBanks || card._mistBanks.w !== w || card._mistBanks.h !== h) {
    card._mistBanks = Array.from({ length: 5 }, (_, i) => ({
      x: (w * (i + Math.random() * 0.6)) / 4,
      rx: w * (0.25 + Math.random() * 0.2),
      ry: h * (0.08 + Math.random() * 0.06),
      y: h * (0.86 + Math.random() * 0.1),
      speed: 0.04 + Math.random() * 0.06,
    }));
    card._mistBanks.w = w;
    card._mistBanks.h = h;
  }
  const s = Math.min(1, a.mist * card._layerFadeProgress.effects);
  const animSpeed = card._animationSpeed * (card._frameScale || 1);
  const key = `${color}|${Math.round(h)}`;
  if (card._mistKey !== key) {
    const band = ctx.createLinearGradient(0, h * 0.6, 0, h);
    band.addColorStop(0, `rgba(${color},0)`);
    band.addColorStop(1, `rgba(${color},0.55)`);
    const blob = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    blob.addColorStop(0, `rgba(${color},0.5)`);
    blob.addColorStop(0.6, `rgba(${color},0.18)`);
    blob.addColorStop(1, `rgba(${color},0)`);
    card._mistBand = band;
    card._mistBlob = blob;
    card._mistKey = key;
  }
  ctx.save();
  ctx.globalAlpha = s;
  ctx.fillStyle = card._mistBand;
  ctx.fillRect(0, h * 0.6, w, h * 0.4);
  ctx.fillStyle = card._mistBlob;
  for (const b of card._mistBanks) {
    b.x += b.speed * animSpeed;
    if (b.x - b.rx > w) b.x = -b.rx;
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.scale(b.rx, b.ry);
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

// Soft beams fanning out from the sun, baked once with a blur and only
// breathing slowly while drawn.
export function drawSunRays(card, ctx, w, h) {
  const a = card._atmo;
  if (!a || a.rays <= 0.01) return;
  const sun = card._getCelestialPosition(w, h);
  const sx = Math.round(sun.x),
    sy = Math.round(sun.y);
  const dpr = card._cachedDimensions.dpr || 1;
  const light = card._isLightBackground;
  const sprite = cacheCanvas(card, "rays", w, h, {
    k: `${Math.round(w)}|${Math.round(h)}|${sx}|${sy}|${dpr}|${light}`,
    draw: (c) => {
      const len = Math.hypot(w, h) * 1.1;
      const toCenter = Math.atan2(h * 0.9 - sy, w / 2 - sx);
      const color = light ? "255,248,225" : "255,240,205";
      c.filter = `blur(${Math.max(4, h * 0.03) * dpr}px)`;
      const beams = [-0.62, -0.38, -0.2, -0.04, 0.12, 0.3, 0.5, 0.7];
      beams.forEach((off, i) => {
        const ang = toCenter + off;
        const spread = 0.05 + ((i * 37) % 5) * 0.015;
        const g = c.createRadialGradient(sx, sy, 0, sx, sy, len);
        g.addColorStop(0, `rgba(${color},0.75)`);
        g.addColorStop(0.3, `rgba(${color},0.42)`);
        g.addColorStop(0.7, `rgba(${color},0.12)`);
        g.addColorStop(1, `rgba(${color},0)`);
        c.fillStyle = g;
        c.globalAlpha = 0.55 + ((i * 53) % 7) / 14;
        c.beginPath();
        c.moveTo(sx, sy);
        c.lineTo(
          sx + Math.cos(ang - spread) * len,
          sy + Math.sin(ang - spread) * len,
        );
        c.lineTo(
          sx + Math.cos(ang + spread) * len,
          sy + Math.sin(ang + spread) * len,
        );
        c.closePath();
        c.fill();
      });
      c.filter = "none";
      c.globalAlpha = 1;
    },
  });
  card._raysPhase =
    (card._raysPhase || 0) +
    0.004 * card._animationSpeed * (card._frameScale || 1);
  const breath = 0.7 + 0.3 * Math.sin(card._raysPhase);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = Math.min(
    1,
    (light ? 0.9 : 1) * a.rays * breath * card._layerFadeProgress.effects,
  );
  ctx.drawImage(sprite, 0, 0, w, h);
  ctx.restore();
}
