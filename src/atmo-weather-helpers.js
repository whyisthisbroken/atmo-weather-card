import { CONFIG_DEFAULTS } from "./atmo-weather-config.js";
import { ACTIVE_STATES, FORECAST_UNAVAILABLE } from "./atmo-weather-data.js";

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
// Removes a trailing unit (with any space before it) from a formatted value.
// Home Assistant formats weather temperatures as "12 °C"; fancy_unit draws
// the unit itself.
export function stripTrailingUnit(text, unit) {
  const value = String(text);
  if (!unit) return value;
  const trimmed = value.replace(/[\s\u00a0\u202f]+$/, "");
  if (!trimmed.endsWith(unit) || trimmed.length === unit.length) return value;
  return trimmed.slice(0, -unit.length).replace(/[\s\u00a0\u202f]+$/, "");
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
// Time options for toLocaleTimeString that follow the time format of the
// Home Assistant profile: "12", "24", "system" (the browser) or "language"
// (the default of the language).
export function timeFormatOptions(haLocale) {
  const tf = haLocale && haLocale.time_format;
  if (tf === "24") return { hourCycle: "h23" };
  if (tf === "12") return { hour12: true };
  if (tf === "system") {
    const h12 = new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hour12;
    return h12 ? { hour12: true } : { hourCycle: "h23" };
  }
  return {};
}
export function fcLabel(dt, daily, locale, haLocale, dateFormat) {
  const d = new Date(dt);
  if (hasDateCodes(dateFormat)) return formatDateCodes(d, dateFormat, locale);
  return daily
    ? d.toLocaleDateString(locale, { weekday: "short" })
    : d.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit", ...timeFormatOptions(haLocale) });
}

// Date codes like Home Assistant templates use them: "%a, %d" prints "Thu, 12".
// A "-" after the percent sign drops the leading zero ("%-d" prints "5").
const DATE_CODE_RE = /%(-?)([aAbBdmyYHIMSp%])/g;
export function hasDateCodes(pattern) {
  return typeof pattern === "string" && /%-?[aAbBdmyYHIMSp]/.test(pattern);
}
export function formatDateCodes(date, pattern, locale) {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d) || typeof pattern !== "string") return "";
  const name = (opts) => {
    try {
      return d.toLocaleDateString(locale, opts);
    } catch {
      return d.toLocaleDateString("en", opts);
    }
  };
  const pad = (n, keep) => (keep ? String(n).padStart(2, "0") : String(n));
  return pattern.replace(DATE_CODE_RE, (_, dash, code) => {
    const zero = dash !== "-";
    switch (code) {
      case "a": return name({ weekday: "short" });
      case "A": return name({ weekday: "long" });
      case "b": return name({ month: "short" });
      case "B": return name({ month: "long" });
      case "d": return pad(d.getDate(), zero);
      case "m": return pad(d.getMonth() + 1, zero);
      case "y": return pad(d.getFullYear() % 100, zero);
      case "Y": return String(d.getFullYear());
      case "H": return pad(d.getHours(), zero);
      case "I": return pad(d.getHours() % 12 || 12, zero);
      case "M": return pad(d.getMinutes(), zero);
      case "S": return pad(d.getSeconds(), zero);
      case "p": return d.getHours() < 12 ? "AM" : "PM";
      default: return "%";
    }
  });
}

// The moon phase from the date alone, for cards without a moon sensor.
// Within about a day of the real phase, plenty for a picture of the moon.
const SYNODIC_MONTH_DAYS = 29.530588853;
const NEW_MOON_EPOCH = Date.UTC(2000, 0, 6, 18, 14);
const MOON_PHASE_NAMES = [
  "new_moon",
  "waxing_crescent",
  "first_quarter",
  "waxing_gibbous",
  "full_moon",
  "waning_gibbous",
  "last_quarter",
  "waning_crescent",
];
export function moonPhaseAt(date) {
  const days = (date.getTime() - NEW_MOON_EPOCH) / 86400000;
  let age = (days / SYNODIC_MONTH_DAYS) % 1;
  if (age < 0) age += 1;
  // The lit part of the disc, 0 at new moon and 1 at full moon.
  const illumination =
    Math.round(((1 - Math.cos(2 * Math.PI * age)) / 2) * 100) / 100;
  return {
    state: MOON_PHASE_NAMES[Math.round(age * 8) % 8],
    illumination,
    direction: illumination >= 1 ? "none" : age < 0.5 ? "right" : "left",
  };
}

// Image rules swap the house image while an entity matches: status_entity
// first, then image_conditions top to bottom. The first match wins.
function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function imageRuleStates(state) {
  const list = Array.isArray(state) ? state : [state];
  const states = list
    .filter((s) => ["string", "number", "boolean"].includes(typeof s))
    .map((s) => String(s).trim().toLowerCase())
    .filter(Boolean);
  return states.length ? states : ACTIVE_STATES;
}

// The label of a layout chip. Home Assistant names an attribute in the user's
// language; without a translation it returns the key in words (next_setting:
// "Next setting"). Then the card's own word wins, when it has one for that
// language. In English, or without an own word, Home Assistant's label stays.
export function layoutChipLabel(haLabel, attribute, fallback, lang, translate) {
  const ha = String(haLabel || "").trim();
  if (!ha) return translate ? translate(fallback) : fallback;
  const base = String(lang || "").toLowerCase().split("-")[0];
  const raw = String(attribute || "").replace(/_/g, " ").trim().toLowerCase();
  if (base && base !== "en" && translate && ha.toLowerCase() === raw) {
    const own = translate(fallback);
    if (own && own !== fallback) return own;
  }
  return ha;
}

// image_max_width as CSS: a number is a share of the card width in %, a value
// with a unit stays as it is. Empty, 0 or nonsense: no limit.
export function imageMaxWidth(value) {
  if (value == null) return "";
  const s = String(value).trim();
  if (/^\d+(\.\d+)?$/.test(s)) return Number(s) > 0 ? `${Math.min(Number(s), 100)}%` : "";
  return /^\d+(\.\d+)?(px|%|cqw|em|rem|vw)$/.test(s) && parseFloat(s) > 0 ? s : "";
}

export function buildImageRules(config) {
  const rules = [];
  const add = (entity, attribute, state, day, night) => {
    const id = cleanText(entity);
    const dayImg = cleanText(day);
    const nightImg = cleanText(night);
    if (!id || (!dayImg && !nightImg)) return;
    rules.push({
      entity: id,
      attribute: cleanText(attribute),
      states: imageRuleStates(state),
      day: dayImg || nightImg,
      night: nightImg || dayImg,
    });
  };
  if (!config) return rules;
  add(config.status_entity, "", null, config.status_day, config.status_night);
  if (Array.isArray(config.image_conditions)) {
    for (const rule of config.image_conditions) {
      if (rule && typeof rule === "object")
        add(rule.entity, rule.attribute, rule.state, rule.image_day, rule.image_night);
    }
  }
  return rules;
}

// The compared value: the state, or the attribute when the rule names one.
export function imageRuleValue(rule, stateObj) {
  if (!stateObj) return "";
  const value = rule.attribute
    ? stateObj.attributes && stateObj.attributes[rule.attribute]
    : stateObj.state;
  return value == null ? "" : String(value).trim().toLowerCase();
}

export function imageRuleMatches(rule, stateObj) {
  const value = imageRuleValue(rule, stateObj);
  return value !== "" && rule.states.includes(value);
}
