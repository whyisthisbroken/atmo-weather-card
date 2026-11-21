// Temperature curve over the forecast chips (forecast_curve): line, soft,
// band or color. Pure helpers that build the SVG content; the card measures the chips.

export const CURVE_MODES = ["line", "soft", "band", "color"];
export const CURVE_HEIGHT = 46;

export function curveMode(value) {
  const v = String(value || "").trim().toLowerCase();
  return CURVE_MODES.includes(v) ? v : "";
}

export function curveHeight(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? Math.max(24, Math.min(120, n)) : CURVE_HEIGHT;
}

// A smooth path through the points that never overshoots them (monotone
// cubic), so a curve between 12° and 14° never dips below 12°.
export function monotonePath(xs, ys) {
  const n = xs.length;
  if (n < 2) return "";
  const f = (v) => (Math.round(v * 10) / 10).toString();
  const d = [];
  for (let i = 0; i < n - 1; i++) d.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i] || 1));
  const m = [d[0]];
  for (let i = 1; i < n - 1; i++) m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);
  m.push(d[n - 2]);
  let out = `M${f(xs[0])},${f(ys[0])}`;
  for (let i = 0; i < n - 1; i++) {
    const h = (xs[i + 1] - xs[i]) / 3;
    out += ` C${f(xs[i] + h)},${f(ys[i] + m[i] * h)} ${f(xs[i + 1] - h)},${f(ys[i + 1] - m[i + 1] * h)} ${f(xs[i + 1])},${f(ys[i + 1])}`;
  }
  return out;
}

// Colors by the real temperature in °C: cold blue, mild green, warm orange,
// hot red.
const COLOR_STOPS = [
  [-10, [122, 162, 255]],
  [0, [125, 211, 255]],
  [10, [140, 230, 190]],
  [17, [255, 214, 102]],
  [24, [255, 159, 67]],
  [32, [255, 94, 87]],
];
export function curveColor(celsius) {
  const t = Number(celsius);
  if (!Number.isFinite(t) || t <= COLOR_STOPS[0][0]) return `rgb(${COLOR_STOPS[0][1].join(",")})`;
  for (let i = 1; i < COLOR_STOPS.length; i++) {
    const [b, cb] = COLOR_STOPS[i];
    if (t <= b) {
      const [a, ca] = COLOR_STOPS[i - 1];
      const k = (t - a) / (b - a);
      return `rgb(${ca.map((c, j) => Math.round(c + (cb[j] - c) * k)).join(",")})`;
    }
  }
  return `rgb(${COLOR_STOPS[COLOR_STOPS.length - 1][1].join(",")})`;
}

export function toCelsius(value, unit) {
  return /F/i.test(String(unit || "")) ? ((Number(value) - 32) * 5) / 9 : Number(value);
}

const HIGH = "#ffb15c";
const LOW = "#8cc8ff";

// SVG content for the curve. xs: chip centers; his/los: highs and lows (los
// may hold NaN, then band falls back to a line); celsius: highs in °C for the
// colors; id: unique per card for the gradients.
export function curveMarkup({ mode, xs, his, los = [], celsius = his, height = CURVE_HEIGHT, id = "awc" }) {
  if (!mode || xs.length < 2 || xs.length !== his.length) return "";
  if (!his.every(Number.isFinite)) return "";
  const band = mode === "band" && los.length === his.length && los.every(Number.isFinite);
  const vals = band ? [...his, ...los] : his;
  const min = Math.min(...vals),
    max = Math.max(...vals);
  const pad = 9;
  const y = (v) => pad + (max === min ? 0.5 : 1 - (v - min) / (max - min)) * (height - 2 * pad);
  const hiY = his.map(y);
  const hiPath = monotonePath(xs, hiY);
  const dot = (x, yy, r, fill, ring = "") =>
    `<circle cx="${x.toFixed(1)}" cy="${yy.toFixed(1)}" r="${r}" fill="${fill}"${ring} />`;
  if (band) {
    const loY = los.map(y);
    const back = monotonePath([...xs].reverse(), [...loY].reverse()).replace(/^M/, "L");
    return (
      `<path d="${hiPath} ${back} Z" fill="#fff" opacity="0.3" />` +
      `<path d="${hiPath}" fill="none" stroke="${HIGH}" stroke-width="2" stroke-linecap="round" />` +
      `<path d="${monotonePath(xs, loY)}" fill="none" stroke="${LOW}" stroke-width="2" stroke-linecap="round" />` +
      xs.map((x, i) => dot(x, hiY[i], 2.8, HIGH) + dot(x, loY[i], 2.8, LOW)).join("")
    );
  }
  // A quiet line: thin and see-through, hollow points, a faint fill below.
  if (mode === "soft") {
    const x0 = xs[0],
      x1 = xs[xs.length - 1];
    return (
      `<defs><linearGradient id="${id}-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.16" /><stop offset="1" stop-color="#fff" stop-opacity="0" /></linearGradient></defs>` +
      `<path d="${hiPath} L${x1.toFixed(1)},${height} L${x0.toFixed(1)},${height} Z" fill="url(#${id}-s)" />` +
      `<path d="${hiPath}" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="1.4" stroke-linecap="round" />` +
      xs.map((x, i) => dot(x, hiY[i], 2.6, "none", ' stroke="#fff" stroke-opacity="0.8" stroke-width="1.3"')).join("")
    );
  }
  if (mode === "color") {
    const x0 = xs[0],
      x1 = xs[xs.length - 1];
    const stops = xs
      .map((x, i) => `<stop offset="${((x - x0) / (x1 - x0 || 1)).toFixed(3)}" stop-color="${curveColor(celsius[i])}" />`)
      .join("");
    return (
      `<defs><linearGradient id="${id}-c" x1="${x0.toFixed(1)}" y1="0" x2="${x1.toFixed(1)}" y2="0" gradientUnits="userSpaceOnUse">${stops}</linearGradient>` +
      `<linearGradient id="${id}-f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.55" /><stop offset="1" stop-color="#fff" stop-opacity="0" /></linearGradient>` +
      `<mask id="${id}-m"><rect x="0" y="0" width="100%" height="${height}" fill="url(#${id}-f)" /></mask></defs>` +
      `<path d="${hiPath} L${x1.toFixed(1)},${height} L${x0.toFixed(1)},${height} Z" fill="url(#${id}-c)" mask="url(#${id}-m)" />` +
      `<path d="${hiPath}" fill="none" stroke="url(#${id}-c)" stroke-width="3" stroke-linecap="round" />` +
      xs.map((x, i) => dot(x, hiY[i], 4, curveColor(celsius[i]), ' stroke="#fff" stroke-width="1.5"')).join("")
    );
  }
  return (
    `<path d="${hiPath}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.95" />` +
    xs.map((x, i) => dot(x, hiY[i], 3.6, "#fff")).join("")
  );
}
