// Kept apart from the helpers, so the editor can use it without the data tables.

const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

// Picture folder (image_folder): file names by weather state. A state without
// its own picture falls back along this list, the base images come last.
const FOLDER_FALLBACK = {
  pouring: ["rainy"],
  "lightning-rainy": ["lightning", "rainy"],
  "snowy-rainy": ["snowy", "rainy"],
  hail: ["rainy"],
  // A thunderstorm nearly always brings rain.
  lightning: ["rainy"],
  "windy-variant": ["windy"],
  "clear-night": ["sunny"],
};
export const FOLDER_BASE = "\u0000base";

export function folderImageType(value) {
  const ext = String(value || "").trim().toLowerCase().replace(/^\./, "");
  return /^[a-z0-9]{2,5}$/.test(ext) ? ext : "webp";
}

// The files to try in order. At night first the -night pictures, then the
// night base image (FOLDER_BASE), then the day pictures.
export function folderImageCandidates(folder, type, state, isNight) {
  const dir = cleanText(folder);
  const name = String(state || "").trim().toLowerCase();
  if (!dir || !/^[a-z-]+$/.test(name)) return [];
  const base = dir.endsWith("/") ? dir : `${dir}/`;
  const ext = folderImageType(type);
  const names = [name, ...(FOLDER_FALLBACK[name] || [])];
  const file = (n) => `${base}${n}.${ext}`;
  if (!isNight) return names.filter((n) => n !== "clear-night").map(file);
  const night = names.map((n) => file(n === "clear-night" ? n : `${n}-night`));
  const day = names.filter((n) => n !== "clear-night").map(file);
  return [...new Set([...night, FOLDER_BASE, ...day])];
}
