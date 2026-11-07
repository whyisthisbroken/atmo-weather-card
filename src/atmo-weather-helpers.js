import { CONFIG_DEFAULTS } from "./atmo-weather-config.js";
import { FORECAST_UNAVAILABLE } from "./atmo-weather-data.js";

// Figtree ships in dist/, so no request leaves the user's network.
export const FIGTREE_FACES = Object.freeze([
  [
    "figtree-latin-ext-wght-normal.woff2",
    "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF",
  ],
  [
    "figtree-latin-wght-normal.woff2",
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  ],
]);
export function parseCSSVal(v) {
  const s = String(v).trim();
  if (!s || s === "0") return "0px";
  return /[%a-z]/i.test(s) ? s : s + "px";
}
export function loadFigtreeFont() {
  if (window._figtreeLoaded) return;
  window._figtreeLoaded = true;
  const style = document.createElement("style");
  style.textContent = FIGTREE_FACES.map(([file, unicodeRange]) => {
    const url = new URL(`./${file}`, import.meta.url).href;
    return `@font-face{font-family:'Figtree';font-style:normal;font-display:swap;font-weight:300 900;src:url("${url}") format("woff2-variations");unicode-range:${unicodeRange};}`;
  }).join("");
  document.head.appendChild(style);
}
export function resolveBackgroundStyle(cfg) {
  const style = (cfg.card_background_style || "").toLowerCase();
  return ["contrast", "frosted", "theme"].includes(style)
    ? style
    : CONFIG_DEFAULTS.card_background_style;
}
export function forecastUnavailableText(lang) {
  const base = String(lang || "").toLowerCase().split("-")[0];
  return FORECAST_UNAVAILABLE[base] || FORECAST_UNAVAILABLE.en;
}
export function parseAnchor(anchor) {
  if (anchor === "center") return ["center", "center"];
  if (anchor === "left") return ["center", "left"];
  if (anchor === "right") return ["center", "right"];
  return anchor.includes("-") ? anchor.split("-") : ["top", anchor];
}
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
export function escapeHtmlAttr(value) {
  return escapeHtml(value);
}
export function thresholdSig(thresholds) {
  if (!Array.isArray(thresholds)) return "";
  let s = "";
  for (let i = 0; i < thresholds.length; i++) {
    const t = thresholds[i];
    s += `${i > 0 ? "," : ""}${t && t.value != null ? t.value : ""}:${t && t.color ? t.color : ""}`;
  }
  return s;
}
export function computeGauge(rawVal, min, max, colorRaw, thresholds, mode) {
  const range = max - min || 1;
  const progress = isNaN(rawVal)
    ? 0
    : Math.max(0, Math.min(1, (rawVal - min) / range));
  const pct = (progress * 100).toFixed(1);
  const baseColor = colorRaw && colorRaw !== "auto" ? colorRaw : "";
  const valid = thresholds.filter(
    (t) => t.value !== "" && t.value !== undefined && t.color,
  );
  let gradient = "",
    barGradient = "",
    hasSegments = false,
    effectiveColor = baseColor;
  if (
    valid.length &&
    !isNaN(rawVal) &&
    (mode === "segments" || mode === "gradient")
  ) {
    const sorted = [...valid].sort(
      (a, b) => parseFloat(a.value) - parseFloat(b.value),
    );
    const toPct = (v) =>
      (Math.max(0, Math.min(1, (parseFloat(v) - min) / range)) * 100).toFixed(
        1,
      );
    const stops = [],
      barStops = [];
    for (let i = 0; i < sorted.length; i++) {
      const t = sorted[i],
        startPct = toPct(t.value);
      const endPct = i < sorted.length - 1 ? toPct(sorted[i + 1].value) : "100";
      if (mode === "segments") {
        stops.push(`${t.color} ${startPct}%`, `${t.color} ${endPct}%`);
        if (progress > 0) {
          const bStart = (
            (parseFloat(startPct) / (progress * 100)) *
            100
          ).toFixed(1);
          const bEnd = ((parseFloat(endPct) / (progress * 100)) * 100).toFixed(
            1,
          );
          barStops.push(`${t.color} ${bStart}%`, `${t.color} ${bEnd}%`);
        }
      } else {
        stops.push(`${t.color} ${startPct}%`);
        if (progress > 0) {
          const bStart = (
            (parseFloat(startPct) / (progress * 100)) *
            100
          ).toFixed(1);
          barStops.push(`${t.color} ${bStart}%`);
        }
      }
    }
    if (stops.length) {
      hasSegments = true;
      gradient = stops.join(", ");
    }
    if (barStops.length) {
      barGradient = barStops.join(", ");
    }
  }
  if (valid.length && !isNaN(rawVal) && mode === "solid") {
    const sorted = [...valid].sort(
      (a, b) => parseFloat(a.value) - parseFloat(b.value),
    );
    for (const t of sorted) {
      if (rawVal >= parseFloat(t.value)) effectiveColor = t.color;
    }
  }
  return { pct, gradient, barGradient, hasSegments, effectiveColor };
}
export function fcFilterPast(raw, daily) {
  const now = new Date(),
    cut = daily
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
      : now.getTime();
  return raw.filter((f) => Date.parse(f.datetime) >= cut);
}
export function fcFingerprint(fc) {
  if (!fc || !fc.length) return "";
  let s = "" + fc.length;
  for (const f of fc)
    s += `|${f.datetime}|${f.condition}|${f.temperature}|${f.templow != null ? f.templow : ""}|${f.precipitation_probability != null ? f.precipitation_probability : ""}`;
  return s;
}
export function fcLabel(dt, daily, locale) {
  const d = new Date(dt);
  return daily
    ? d.toLocaleDateString(locale, { weekday: "short" })
    : d.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
}