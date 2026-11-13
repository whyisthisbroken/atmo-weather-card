// Optional wind compass drawn over the scene. It reads wind_bearing (where the
// wind comes from) and shows it in one of five styles. The markup is built once
// per style and settings; later updates only turn the dial and change the text,
// so CSS transitions can ease every change of direction.

export const COMPASS_STYLES = Object.freeze([
  "off",
  "arrow",
  "rose",
  "pill",
  "band",
  "vane",
]);
export const COMPASS_POSITIONS = Object.freeze([
  "auto",
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]);
// Smallest scale per style on low cards. The arrow is thin, so it keeps its
// full size to stay readable on a pale sky.
export const COMPASS_MIN_SCALE = Object.freeze({ arrow: 1 });

// Where each style sits when the position is "auto".
const AUTO_POSITION = Object.freeze({
  arrow: "bottom-left",
  rose: "bottom-right",
  pill: "top-right",
  band: "bottom-center",
  vane: "bottom-right",
});

const POINTS = Object.freeze({
  en: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"],
  de: ["N", "NNO", "NO", "ONO", "O", "OSO", "SO", "SSO", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"],
});

const pointsFor = (lang) => POINTS[lang] || POINTS.en;

// 16-point compass name for a bearing in degrees.
export function compassPoint(deg, lang = "en") {
  const d = ((Number(deg) % 360) + 360) % 360;
  return pointsFor(lang)[Math.round(d / 22.5) % 16];
}

// A chosen position is kept. "auto" uses the usual corner of the style, but
// moves away from places taken by chips: first to the other edge on the same
// side, then to the other side.
export function resolveCompassPosition(style, position, taken = []) {
  if (COMPASS_POSITIONS.includes(position) && position !== "auto")
    return position;
  const home = AUTO_POSITION[style] || "bottom-right";
  if (!taken.includes(home)) return home;
  const [row, col] = home.split("-");
  const flipRow = row === "top" ? "bottom" : "top";
  const flipCol = col === "left" ? "right" : col === "right" ? "left" : col;
  const options = [`${flipRow}-${col}`, `${row}-${flipCol}`, `${flipRow}-${flipCol}`];
  return options.find((p) => !taken.includes(p)) || home;
}

// Turns a new bearing into an angle that continues from the previous one, so a
// turn from 350° to 10° goes 20° forward instead of 340° back.
export function unwrapAngle(prev, target) {
  if (prev == null || !Number.isFinite(prev)) return target;
  const delta = ((((target - prev) % 360) + 540) % 360) - 180;
  return prev + delta;
}

// Chips that show a wind direction: the wind_bearing attribute (live or
// forecast) or a sensor with the wind_direction device class.
export const BEARING_FORMATS = Object.freeze(["degrees", "cardinal", "both"]);

export function isBearingChip(chip, hass) {
  if (!chip || !chip.entity) return false;
  if (chip.attribute) return chip.attribute === "wind_bearing";
  if (chip.forecast) return false;
  const st = hass && hass.states && hass.states[chip.entity];
  return !!(st && st.attributes && st.attributes.device_class === "wind_direction");
}

// Icons a wind direction chip can turn with the wind. The arrows point where
// the wind blows, like the wind lines; the needle's red tip points where it
// comes from, like the compass rose. All are drawn pointing up (north).
export const BEARING_ICONS = Object.freeze(["arrow", "filled", "needle"]);
const BEARING_GLYPHS = {
  arrow:
    '<path d="M12 20V4M12 4l-6 6M12 4l6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  filled: '<path d="M12 2.5l6.5 17-6.5-3.6-6.5 3.6z" fill="currentColor"/>',
  needle:
    '<path d="M12 2l3.6 10H8.4z" fill="#e5534b"/><path d="M12 22l3.6-10H8.4z" fill="currentColor" opacity="0.7"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/>',
};

export function bearingIconSvg(style, bearing) {
  const glyph = BEARING_GLYPHS[style];
  const deg = Number(bearing);
  if (!glyph || !Number.isFinite(deg)) return "";
  const turn = style === "needle" ? deg : deg + 180;
  return `<svg class="bearing-icon" viewBox="0 0 24 24" aria-hidden="true" style="transform: rotate(${Math.round(turn % 360)}deg)">${glyph}</svg>`;
}

// Value and unit of a wind direction chip in the chosen format. "cardinal"
// shows only the compass point, "both" puts it before the degree value.
export function formatBearingValue(raw, format, lang, formatted, unit) {
  const deg = typeof raw === "number" ? raw : parseFloat(raw);
  if (!Number.isFinite(deg) || (format !== "cardinal" && format !== "both"))
    return { formatted, unit };
  const point = compassPoint(deg, lang);
  if (format === "cardinal") return { formatted: point, unit: "" };
  // Home Assistant formats the wind_bearing attribute without a unit; next to
  // the compass point the number needs its degree sign.
  // The chip puts a space before its unit, so the sign goes onto the number.
  const hasDegree = /°\s*$/.test(String(formatted)) || /°/.test(unit || "");
  return hasDegree
    ? { formatted: `${point} ${formatted}`, unit }
    : { formatted: `${point} ${formatted}°`, unit };
}

// Text under or inside the compass, from the parts switched on.
export function compassLabel({ bearing, lang, speed, speedUnit, show }) {
  const parts = [];
  if (show.cardinal) parts.push(compassPoint(bearing, lang));
  if (show.degrees) parts.push(`${Math.round(((bearing % 360) + 360) % 360)}°`);
  if (show.speed && Number.isFinite(speed)) {
    const n = Number(speed).toLocaleString(lang, { maximumFractionDigits: 1 });
    parts.push(speedUnit ? `${n} ${speedUnit}` : n);
  }
  return parts;
}

// Pixels per degree on the compass band.
const BAND_PX = 2;
const BAND_W = 300;

function arrowSvg() {
  // Drawn pointing east; turned to where the wind blows.
  return `<svg class="cmp-svg" viewBox="0 0 80 40" width="80" height="40" aria-hidden="true">
  <g class="cmp-rot cmp-glow" data-cx="40" data-cy="20">
    <path class="cmp-line" d="M8 20 C 24 13, 44 27, 66 19"/>
    <path class="cmp-line" d="M58 12 L 68 19 L 58 26"/>
    <path class="cmp-thin" d="M14 31 C 26 27, 36 34, 48 30" opacity=".6"/>
  </g>
</svg>`;
}

function roseSvg(lang) {
  const n = pointsFor(lang)[0];
  return `<svg class="cmp-svg" viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
  <circle class="cmp-frost" cx="35" cy="35" r="30"/>
  <circle class="cmp-thin" cx="35" cy="35" r="24" opacity=".7"/>
  <g class="cmp-thin" opacity=".9"><path d="M35 8V13"/><path d="M62 35H57"/><path d="M35 62V57"/><path d="M8 35H13"/></g>
  <g class="cmp-thin" opacity=".5"><path d="M54 16L50.5 19.5"/><path d="M54 54L50.5 50.5"/><path d="M16 54L19.5 50.5"/><path d="M16 16L19.5 19.5"/></g>
  <text class="cmp-ink" x="35" y="21" font-size="8" font-weight="700" text-anchor="middle">${n}</text>
  <g class="cmp-rot" data-cx="35" data-cy="35">
    <path class="cmp-ink" d="M35 14L39 35L31 35Z" opacity=".9"/>
    <path class="cmp-alt" d="M35 56L38 35L32 35Z" opacity=".8"/>
    <circle class="cmp-alt" cx="35" cy="35" r="2.2"/>
  </g>
</svg>`;
}

function pillSvg() {
  return `<svg class="cmp-svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
  <circle class="cmp-thin" cx="12" cy="12" r="11" opacity=".85"/>
  <g class="cmp-rot" data-cx="12" data-cy="12">
    <path class="cmp-ink" d="M12 2L14.5 12L9.5 12Z"/>
    <path class="cmp-alt" d="M12 22L14 12L10 12Z" opacity=".8"/>
  </g>
</svg>`;
}

let bandId = 0;
function bandSvg(lang) {
  const id = `awc-cmp-band-${++bandId}`;
  const pts = pointsFor(lang);
  let ticks = "";
  let letters = "";
  // Enough strip for any unwrapped angle between -360° and 720°.
  for (let d = -450; d <= 810; d += 10) {
    const x = d * BAND_PX;
    const major = ((d % 90) + 90) % 90 === 0;
    ticks += `M${x} 24V${major ? 16 : 20}`;
  }
  for (let d = -450; d <= 810; d += 22.5) {
    const x = d * BAND_PX;
    const i = Math.round((((d % 360) + 360) % 360) / 22.5) % 16;
    const main = i % 4 === 0;
    const mid = i % 2 === 0;
    letters += `<text x="${x}" y="13" font-size="${main ? 11 : mid ? 10 : 8}" font-weight="${mid ? 700 : 500}" text-anchor="middle">${pts[i]}</text>`;
  }
  return `<svg class="cmp-svg" viewBox="0 0 ${BAND_W} 34" width="${BAND_W}" height="34" aria-hidden="true">
  <defs>
    <linearGradient id="${id}-g" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".2" stop-color="#fff"/><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="${id}-m"><rect width="${BAND_W}" height="34" fill="url(#${id}-g)"/></mask>
  </defs>
  <g mask="url(#${id}-m)" class="cmp-glow">
    <path class="cmp-thin" d="M0 24H${BAND_W}" opacity=".7"/>
    <g class="cmp-band">
      <path class="cmp-thin" d="${ticks}"/>
      <g class="cmp-ink">${letters}</g>
    </g>
  </g>
  <path class="cmp-ink cmp-glow" d="M${BAND_W / 2} 33L${BAND_W / 2 - 4} 28L${BAND_W / 2 + 4} 28Z"/>
</svg>`;
}

function vaneSvg(lang) {
  const p = pointsFor(lang);
  return `<svg class="cmp-svg" viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
  <g class="cmp-glow">
    <path class="cmp-line" d="M40 80V44" opacity=".9"/>
    <g class="cmp-thin" opacity=".9"><path d="M40 44V30"/><path d="M40 44H54"/><path d="M40 44V58"/><path d="M40 44H26"/></g>
    <g class="cmp-ink" font-size="8" font-weight="700" text-anchor="middle">
      <text x="40" y="27">${p[0]}</text><text x="60" y="47">${p[4]}</text><text x="40" y="66">${p[8]}</text><text x="20" y="47">${p[12]}</text>
    </g>
    <g class="cmp-rot" data-cx="40" data-cy="44">
      <path class="cmp-line" d="M40 44V18"/>
      <path class="cmp-paper" d="M40 12L44.5 22L35.5 22Z"/>
      <path class="cmp-line" d="M40 44V64"/>
      <path class="cmp-paper" d="M34 72L40 60L46 72L40 68Z" opacity=".85"/>
    </g>
    <circle class="cmp-paper" cx="40" cy="44" r="2.4"/>
  </g>
</svg>`;
}

// Markup for one compass. The rotating parts get their angle on update.
export function compassMarkup(style, position, lang, background = false) {
  const svg =
    style === "arrow"
      ? arrowSvg()
      : style === "rose"
        ? roseSvg(lang)
        : style === "pill"
          ? pillSvg()
          : style === "band"
            ? bandSvg(lang)
            : vaneSvg(lang);
  const label = `<div class="cmp-label"></div>`;
  // The chip has its own frosted background already.
  const bg = background && style !== "pill" ? " cmp-bg" : "";
  return `<div class="cmp cmp-style-${style} cmp-pos-${position}${bg}">${svg}${label}</div>`;
}

// Screen rotation for a style. The arrow points where the wind blows to; the
// needles point into the wind, where it comes from. North is up, east right,
// the same as the wind lines.
export function styleRotation(style, angle) {
  return style === "arrow" ? angle + 90 : angle;
}

// Applies an unwrapped angle to the rotating parts of a built compass.
export function applyCompassAngle(root, style, angle) {
  if (style === "band") {
    const band = root.querySelector(".cmp-band");
    if (band)
      band.style.transform = `translateX(${BAND_W / 2 - angle * BAND_PX}px)`;
    return;
  }
  const deg = styleRotation(style, angle);
  for (const g of root.querySelectorAll(".cmp-rot")) {
    // Single properties, so a transition set on the element stays in place.
    g.style.transformBox = "view-box";
    g.style.transformOrigin = `${g.dataset.cx}px ${g.dataset.cy}px`;
    g.style.transform = `rotate(${deg}deg)`;
  }
}
