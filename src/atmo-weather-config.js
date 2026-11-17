// Defaults shared by the card and the editor. The editor strips these values
// from saved configs, so the runtime must fall back to the same values.
export const CONFIG_DEFAULTS = Object.freeze({
  card_style: "standalone",
  card_color_mode: "auto",
  card_filter_clouds: "none",
  card_filter_sun: "none",
  image_alignment: "top-right",
  image_night_source: "sun",
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
  rain_density: 1,
  snow_density: 1,
  leaf_density: 1,
  effect_rain_splash: true,
  effect_snow_edge: true,
  effect_spill: false,
  effect_text_scrim: true,
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
  "card_layout",
  "card_color_mode",
  "card_background_style",
  "image_alignment",
  "image_night_source",
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

// Card layouts: a finished look in one option. Each value applies while the
// config does not set that option itself; the layout's chips apply while the
// card has no chips of its own.
export const CARD_LAYOUTS = Object.freeze(["standard", "compact", "wide"]);

const bigTemperature = (weather, size, x, y) => ({
  entity: weather,
  attribute: "temperature",
  position: "custom",
  position_anchor: "top-left",
  position_x: `${x}px`,
  position_y: `${y}px`,
  text_size: `${size}px`,
  hide_icon: true,
  hide_label: true,
  background: false,
  fancy_unit: true,
  value_weight: "300",
});
const conditionLine = (weather, size, x, y) => ({
  entity: weather,
  position: "custom",
  position_anchor: "top-left",
  position_x: `${x}px`,
  position_y: `${y}px`,
  hide_icon: true,
  hide_label: true,
  background: false,
  text_size: `${size}px`,
  value_weight: "600",
});
// A reading of the weather entity. Its label comes from Home Assistant in
// the user's language (name is only the fallback), and the chip stays away
// when the entity does not report the value.
const reading = (weather, attribute, name, icon) => ({
  entity: weather,
  attribute,
  ...(name ? { _layoutLabel: name } : {}),
  _layoutOptional: true,
  icon,
});
const tomorrow = (weather) => ({
  entity: weather,
  forecast: "daily",
  forecast_offset: 1,
  attribute: "temperature",
  icon: "weather",
  forecast_precision: 0,
  sub_value_attribute: "templow",
  sub_value_position: "beside",
});

export function layoutDefaults(layout, weather = "") {
  if (layout === "standard")
    return {
      card_height: 200,
      celestial_size: 56,
      celestial_position: "dynamic_both",
      celestial_alignment: "right",
      celestial_x: 45,
      chip_area_position: "bottom-left",
      chip_area_padding: "0px 0px 14px 10px",
      chip_area_gap: "14px",
      chip_style: "vertical",
      chip_padding: "4px 8px",
      chip_text_size: "15px",
      chip_label_size: "10px",
      chip_icon_size: "14px",
      chips: [
        bigTemperature(weather, 62, 18, 8),
        conditionLine(weather, 16, 21, 86),
        reading(weather, "humidity", "Humidity", "mdi:water-percent"),
        reading(weather, "wind_speed", "Wind", "mdi:weather-windy"),
        tomorrow(weather),
      ],
    };
  if (layout === "compact")
    return {
      card_height: 96,
      celestial_size: 40,
      celestial_position: "fixed",
      celestial_alignment: "right",
      celestial_x: 40,
      chip_area_position: "bottom-left",
      chip_area_padding: "0px 0px 12px 112px",
      chip_area_gap: "10px",
      chip_padding: "0px",
      chip_text_size: "13px",
      chip_icon_size: "14px",
      chips: [
        bigTemperature(weather, 44, 14, 14),
        conditionLine(weather, 15, 114, 18),
        reading(weather, "humidity", null, "mdi:water-percent"),
        reading(weather, "wind_speed", null, "mdi:weather-windy"),
      ],
    };
  if (layout === "wide")
    return {
      card_height: 260,
      celestial_size: 64,
      celestial_position: "dynamic_both",
      celestial_alignment: "center",
      celestial_x: 0,
      chip_area_position: "right",
      chip_area_layout: "grid",
      chip_area_columns: 2,
      chip_area_width: "34%",
      chip_area_padding: "0px 20px 0px 0px",
      chip_area_gap: "16px",
      chip_style: "vertical",
      chip_padding: "4px 8px",
      chip_text_size: "20px",
      chip_label_size: "11px",
      chip_icon_size: "16px",
      chips: [
        bigTemperature(weather, 96, 24, 14),
        conditionLine(weather, 18, 28, 132),
        reading(weather, "humidity", "Humidity", "mdi:water-percent"),
        reading(weather, "wind_speed", "Wind", "mdi:weather-windy"),
        reading(weather, "pressure", "Pressure", "mdi:gauge"),
        tomorrow(weather),
      ],
    };
  return null;
}

// Below this card width the wide layout has no room for its two columns and
// the card uses the standard layout instead.
export const WIDE_MIN_WIDTH = 600;

// The config the card runs: the layout's values under the card's own.
export function applyCardLayout(config, width = 0) {
  let layout = String(config.card_layout ?? "").trim().toLowerCase();
  if (layout === "wide" && width > 0 && width < WIDE_MIN_WIDTH) layout = "standard";
  const base = layoutDefaults(layout, config.weather_entity || "");
  if (!base) return config;
  const ownChips = Array.isArray(config.chips) && config.chips.length > 0;
  const out = { ...base, ...config };
  out.chips = ownChips ? config.chips : base.chips;
  return out;
}
