// Defaults shared by the card and the editor. The editor strips these values
// from saved configs, so the runtime must fall back to the same values.
export const CONFIG_DEFAULTS = Object.freeze({
  card_style: "standalone",
  card_color_mode: "auto",
  card_filter_clouds: "none",
  card_filter_sun: "none",
  image_alignment: "top-right",
  card_background_style: "frosted",
  chip_area_layout: "wrap",
  chip_style: "inline",
  chip_area_align: "start",
  perf_mode: "default",
  fauna_birds_at_night: true,
  fauna_birds: true,
  fauna_planes: true,
  fauna_plane_speed: 1,
  wind_style: "lines",
  wind_compass: "off",
  wind_compass_position: "auto",
  wind_compass_cardinal: true,
  wind_compass_degrees: false,
  wind_compass_speed: false,
  wind_compass_background: false,
  effect_blue_hour: true,
  effect_golden_hour: true,
  effect_sun_rays: true,
  effect_haze: true,
  effect_ground_mist: true,
  effect_cloud_coverage: true,
  effect_shooting_stars: true,
  effect_comets: true,
  shooting_star_rate: 1,
  comet_rate: 1,
});

// Performance presets. Every value applies while the config does not set
// that option itself; a value set in the editor or in YAML wins ("custom").
export const PERF_PRESETS = Object.freeze({
  low: Object.freeze({
    perf_fps: 20,
    perf_cloud_quality: 0.5,
    perf_effects: 0,
    perf_fauna: 0,
    perf_dpr: 1.0,
    animation_speed: 1.0,
    bird_animation_speed: 0.3,
    star_animation_speed: 0.5,
    fauna_bird_density: 0.5,
    fauna_plane_density: 0.5,
    fauna_bird_flock_size: 4,
    fauna_birds_at_night: true,
  }),
  default: Object.freeze({
    perf_fps: 30,
    perf_cloud_quality: 1.5,
    perf_effects: 1,
    perf_fauna: 2,
    perf_dpr: 2.0,
    animation_speed: 1.0,
    bird_animation_speed: 0.3,
    star_animation_speed: 0.5,
    fauna_bird_density: 1.0,
    fauna_plane_density: 1.0,
    fauna_bird_flock_size: 8,
    fauna_birds_at_night: true,
  }),
  ultra: Object.freeze({
    perf_fps: 60,
    perf_cloud_quality: 2.0,
    perf_effects: 2,
    perf_fauna: 2,
    perf_dpr: 2.0,
    animation_speed: 1.0,
    bird_animation_speed: 0.3,
    star_animation_speed: 0.5,
    fauna_bird_density: 1.5,
    fauna_plane_density: 1.5,
    fauna_bird_flock_size: 12,
    fauna_birds_at_night: true,
  }),
});
// The preset named in the config, or the default one.
export function perfPreset(config) {
  const name = config && config.perf_mode;
  return (typeof name === "string" && PERF_PRESETS[name]) || PERF_PRESETS.default;
}

// Reads a boolean option; "false", "0", "off" and "no" count as off.
export function readFlag(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "string")
    return !["false", "0", "off", "no"].includes(value.trim().toLowerCase());
  return value !== false && value !== 0;
}

// Reads a number option clamped to [min, max].
export function readNumber(value, fallback, min, max) {
  const n = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
}

// Read with string methods at runtime. A wrong YAML type falls back to the default.
const STRING_ONLY_KEYS = Object.freeze([
  "card_color_mode",
  "card_background_style",
  "image_alignment",
  "chip_area_position",
  "chip_style",
  "custom_cards_position",
  "custom_cards_css_class",
  "wind_style",
  "wind_compass",
  "wind_compass_position",
]);

function renameKey(obj, oldKey, newKey) {
  if (obj[oldKey] !== undefined && obj[newKey] === undefined) {
    obj[newKey] = obj[oldKey];
  }
  delete obj[oldKey];
}

// Migrations for keys in use since v7.0. Older keys are no longer supported.
export function migrateConfig(raw) {
  const c = { ...raw };
  const colorMode = String(c.card_color_mode ?? "").trim().toLowerCase();
  if (colorMode === "force_dark") c.card_color_mode = "dark";
  else if (colorMode === "force_light") c.card_color_mode = "light";
  else if (colorMode === "entity") delete c.card_color_mode;
  if (c.card_filter !== undefined) {
    if (c.card_filter_clouds === undefined)
      c.card_filter_clouds = c.card_filter;
    if (c.card_filter_sun === undefined) c.card_filter_sun = c.card_filter;
    delete c.card_filter;
  }
  delete c.celestial_moon_style;
  if (c.chip_area_layout === "scroll") c.chip_area_layout = "horizontal-scroll";
  // A 60 Hz screen shows whole frames only: 24 fps ran at 20 and 45 at 30.
  // The choice is 20, 30 or 60 now; old values keep the rate they really had.
  const fps = Number(c.perf_fps);
  if (fps === 24) c.perf_fps = 20;
  else if (fps === 45) c.perf_fps = 30;
  if (Array.isArray(c.chips)) {
    c.chips = c.chips.map((chip) => {
      if (!chip || typeof chip !== "object") return chip;
      const s = { ...chip };
      if (s.overflow === "marquee" && s.label_overflow === undefined)
        s.label_overflow = "marquee";
      renameKey(s, "card_tap_action", "tap_action");
      if (s.forecast_show_min && s.forecast && s.attribute === "temperature") {
        if (!s.sub_value_attribute) s.sub_value_attribute = "templow";
        if (s.forecast_low_position !== "below")
          s.sub_value_position = "beside";
      }
      delete s.forecast_show_min;
      delete s.forecast_low_position;
      return s;
    });
  }
  for (const key of STRING_ONLY_KEYS) {
    if (key in c && typeof c[key] !== "string") delete c[key];
  }
  return c;
}
