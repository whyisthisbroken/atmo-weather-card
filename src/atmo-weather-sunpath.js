// Sun path chip (chip type "sun_path"): a flat arc from sunrise to sunset with
// the sun on it, and at night the moon on its way to the next sunrise.
import { formatDateCodes, hasDateCodes, timeFormatOptions } from "./atmo-weather-helpers.js";

const DAY_MS = 86400000;
// Home Assistant moves next_rising / next_setting to the next day at the
// event, and the sun state can follow a few minutes later. In that window the
// body stays at the horizon it has just reached or is about to leave.
const NEAR_HORIZON_MS = 6 * 3600000;

// Where the sun or moon stands: night, the share of the way t (0 to 1) and
// the two horizon events at the ends. null without the sun's times.
export function sunPathState(sun, now = Date.now()) {
  const a = sun && sun.attributes;
  if (!a) return null;
  const rise = Date.parse(a.next_rising);
  const set = Date.parse(a.next_setting);
  if (!Number.isFinite(rise) || !Number.isFinite(set)) return null;
  const night = sun.state === "below_horizon";
  let from, to, t;
  if (night) {
    to = rise;
    if (set < rise) {
      // Sunset still ahead: the state went below the horizon a little early.
      from = set;
      t = 0;
    } else {
      from = set - DAY_MS;
      t = (now - from) / (to - from);
    }
  } else {
    to = set;
    if (rise < set) {
      // Sunrise still ahead or just passed and not moved on yet.
      from = rise;
      t = rise - now < NEAR_HORIZON_MS ? 0 : 1;
    } else {
      from = rise - DAY_MS;
      t = (now - from) / (to - from);
    }
  }
  if (!Number.isFinite(t)) return null;
  return { night, t: Math.min(1, Math.max(0, t)), from: new Date(from), to: new Date(to) };
}

// A time of day the way the chip's date_format asks for, or like Home
// Assistant shows it (12 or 24 hours from the user's profile).
export function sunPathTime(date, dateFormat, locale) {
  const lang = (locale && locale.language) || undefined;
  if (hasDateCodes(dateFormat)) return formatDateCodes(date, dateFormat, lang);
  return date.toLocaleTimeString(lang, { hour: "numeric", minute: "2-digit", ...timeFormatOptions(locale) });
}

// The arc as inline SVG, 100 x 36 units: horizon, the whole way dashed, the
// part already gone drawn solid, the sun (or the moon) where it is now.
export function sunPathSvg(t, night) {
  const x0 = 7, x1 = 93, y0 = 30, h = 24;
  const at = (f) => [x0 + (x1 - x0) * f, y0 - h * Math.sin(Math.PI * f)];
  const path = (f1) => {
    const pts = [];
    const n = Math.max(2, Math.round(32 * f1));
    for (let i = 0; i <= n; i++) pts.push(at((f1 * i) / n));
    return "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L");
  };
  const [sx, sy] = at(t);
  const body = night
    ? `<circle class="sp-moon" cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="4.2"/><circle class="sp-moon-shade" cx="${(sx + 1.9).toFixed(1)}" cy="${(sy - 1.2).toFixed(1)}" r="3.4"/>`
    : `<circle class="sp-glow" cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="7.5"/><circle class="sp-sun" cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="3.8"/>`;
  return `<svg class="sp-arc${night ? " sp-night" : ""}" viewBox="0 0 100 36" aria-hidden="true"><line class="sp-horizon" x1="2" x2="98" y1="${y0}" y2="${y0}"/><path class="sp-track" d="${path(1)}"/>${t > 0 ? `<path class="sp-done" d="${path(t)}"/>` : ""}${body}</svg>`;
}
