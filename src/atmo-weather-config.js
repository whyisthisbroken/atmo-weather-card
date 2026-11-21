// Defaults shared by the card and the editor. The editor strips these values
// from saved configs, so the runtime must fall back to the same values.
export const CONFIG_DEFAULTS = Object.freeze({
  card_style: "standalone",
  card_color_mode: "auto",
  card_filter_clouds: "none",
  card_filter_sun: "none",
  image_alignment: "top-right",
  image_night_source: "sun",
  // Seconds one image takes to blend into the next, 0 = switch at once.
  image_transition: 1,
  // File type of the pictures in image_folder.
  image_folder_type: "webp",
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
  effect_frost: true,
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
  "css",
  "image_folder",
  "image_folder_type",
  "forecast_curve",
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
// The second chip area (chip_area_2): its own place, layout and look, set
// with the same names as the chip_area_* options without the prefix. Chips
// join it with area: 2. Unset values use the defaults, not the first area's.
const AREA_STRING_KEYS = ["position", "layout", "align", "width", "height", "padding", "gap", "background_color"];
const AREA_NUMBER_KEYS = ["columns", "scroll_count"];
const AREA_FLAG_KEYS = ["grouped", "full_width", "background", "separator", "hide"];
export const AREA2_DEFAULT_POSITION = "top-left";

export function areaTwoConfig(config) {
  const raw = config && config.chip_area_2;
  const a = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const text = (v) => (typeof v === "string" || typeof v === "number" ? String(v).trim() : "");
  const out = { ...config };
  for (const k of AREA_STRING_KEYS) out[`chip_area_${k}`] = text(a[k]) || undefined;
  for (const k of AREA_NUMBER_KEYS) out[`chip_area_${k}`] = a[k];
  for (const k of AREA_FLAG_KEYS) out[`chip_area_${k}`] = a[k] === true;
  out.chip_area_position = out.chip_area_position || AREA2_DEFAULT_POSITION;
  if (text(a.style)) out.chip_style = text(a.style);
  if (text(a.background_style)) out.card_background_style = text(a.background_style);
  return out;
}

// The chip area a chip sits in: 2 for area: 2, else 1. Freely placed chips
// belong to no area, but they are never asked.
export function chipArea(chip) {
  return chip && Number(chip.area) === 2 ? 2 : 1;
}

export const CARD_LAYOUTS = Object.freeze(["standard", "compact", "wide", "home", "panel"]);

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

// A chip placed freely, without icon, label or background.
const freeChip = (anchor, x, y, chip) => ({
  position: "custom",
  position_anchor: anchor,
  position_x: `${x}px`,
  position_y: `${y}px`,
  hide_icon: true,
  hide_label: true,
  background: false,
  ...chip,
});
// Today's high or low with an arrow.
const todayRange = (weather, attribute, icon, x) =>
  freeChip("top-right", x, 58, {
    entity: weather,
    forecast: "daily",
    forecast_offset: 0,
    attribute,
    icon,
    hide_icon: false,
    unit_format: "°",
    forecast_precision: 0,
    text_size: "16px",
    style: "inline",
  });

export function layoutDefaults(layout, weather = "", sun = "sun.sun") {
  if (layout === "standard")
    return {
      card_height: 200,
      celestial_size: 56,
      celestial_position: "dynamic_both",
      celestial_alignment: "right",
      celestial_x: 45,
      chip_area_position: "bottom-left",
      chip_area_padding: "0px 0px 2px 10px",
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
      chip_area_padding: "0px 0px 2px 112px",
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
      chip_area_width: "38%",
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
        // The low below the high, so the chip fits a column of a 600 px card,
        // both with the short degree sign.
        { ...tomorrow(weather), unit_format: "°", sub_value_format: "°", sub_value_position: "below" },
      ],
    };
  // A house on the right (the bundled one until the card has a picture of
  // its own, see applyCardLayout), the weather on the left, a frosted bar with
  // values at the bottom.
  if (layout === "home")
    return {
      card_height: 300,
      celestial_size: 44,
      celestial_position: "fixed",
      celestial_alignment: "top-center",
      celestial_x: 0,
      celestial_y: 22,
      image_alignment: "top-right",
      image_scale: 70,
      // Out by the card padding, so the house meets the right edge.
      image_x: "16",
      image_y: "16%",
      // On a narrow card the house shrinks instead of running into the
      // temperature on the left.
      image_max_width: 58,
      wind_compass: "ticks",
      wind_compass_position: "top-right",
      wind_compass_speed: true,
      wind_compass_cardinal: false,
      chip_area_position: "bottom-right",
      chip_area_grouped: true,
      chip_area_background: true,
      card_background_style: "frosted",
      chip_style: "inline",
      // Text and gaps shrink with the card width, so three values stay on one
      // line in the bar of a narrow card (cqw = 1 % of the card width).
      chip_area_gap: "clamp(6px, 3.2cqw, 16px)",
      chip_area_padding: "2px clamp(4px, 2cqw, 10px)",
      chip_padding: "8px 6px",
      chip_text_size: "clamp(13px, 4.2cqw, 17px)",
      chip_icon_size: "clamp(14px, 4.2cqw, 17px)",
      chips: [
        freeChip("top-left", 20, 18, {
          entity: sun,
          attribute: "next_setting",
          icon: "mdi:weather-sunset-down",
          hide_icon: false,
          date_format: "%H:%M",
          text_size: "15px",
          value_weight: "700",
          style: "inline",
        }),
        // Above the height of the bar, so a narrow card has room for both.
        freeChip("bottom-left", 18, 84, {
          entity: weather,
          attribute: "temperature",
          unit_format: "°",
          text_size: "72px",
          value_weight: "700",
        }),
        freeChip("bottom-left", 21, 62, {
          entity: weather,
          text_size: "16px",
          value_weight: "500",
        }),
        { ...reading(weather, "humidity", null, "mdi:water-percent"), hide_label: true },
        { ...reading(weather, "wind_speed", null, "mdi:weather-windy"), hide_label: true },
        { ...reading(weather, "pressure", null, "mdi:gauge"), hide_label: true },
      ],
    };
  // A tall card: the weather on top, tiles with values in the middle, the
  // next hours at the bottom in a second chip area under a soft curve.
  if (layout === "panel")
    return {
      card_height: 440,
      celestial_size: 40,
      celestial_position: "fixed",
      celestial_alignment: "top-center",
      celestial_x: 0,
      celestial_y: 22,
      chip_area_position: "top-left",
      chip_area_padding: "96px 0px 0px 0px",
      chip_area_layout: "grid",
      chip_area_columns: 2,
      chip_area_width: "100%",
      chip_area_gap: "10px",
      chip_area_background: true,
      card_background_style: "frosted",
      chip_style: "stacked",
      chip_padding: "10px",
      chip_text_size: "17px",
      chip_label_size: "12px",
      chip_icon_size: "16px",
      chip_area_2: { position: "bottom-left", layout: "grid", columns: 5, width: "100%", gap: "4px", style: "vertical" },
      forecast_curve: "soft",
      forecast_curve_height: 40,
      chips: [
        freeChip("top-left", 16, 2, {
          entity: weather,
          attribute: "temperature",
          unit_format: "°",
          text_size: "68px",
          value_weight: "300",
        }),
        freeChip("top-right", 20, 20, {
          entity: weather,
          text_size: "22px",
          value_weight: "700",
        }),
        todayRange(weather, "templow", "mdi:arrow-down-thin", 20),
        todayRange(weather, "temperature", "mdi:arrow-up-thin", 76),
        // Four tiles, two rows: the first four with a value show, so a weather
        // service without UV or rain probability leaves no gap.
        ...[
          {
            ...reading(weather, "wind_bearing", "Wind", "mdi:weather-windy"),
            bearing_icon: "arrow",
            bearing_format: "cardinal",
            // The speed below the direction, so both fit a narrow tile.
            sub_value_entity: weather,
            sub_value_attribute: "wind_speed",
          },
          {
            ...reading(weather, "humidity", "Humidity", "mdi:water-percent"),
            type: "bar",
            bar_min: 0,
            bar_max: 100,
            bar_height: "4px",
            bar_color: "#7fc8ff",
          },
          {
            ...reading(weather, "uv_index", "UV index", "mdi:weather-sunny-alert"),
            type: "bar",
            bar_min: 0,
            bar_max: 11,
            bar_height: "4px",
            bar_threshold_mode: "segments",
            bar_thresholds: [
              { value: 0, color: "#7bd88f" },
              { value: 3, color: "#ffd166" },
              { value: 6, color: "#ff9f43" },
              { value: 8, color: "#ff5e57" },
            ],
          },
          {
            entity: weather,
            forecast: "daily",
            forecast_offset: 0,
            attribute: "precipitation_probability",
            _layoutLabel: "Rain",
            _layoutOptional: true,
            icon: "mdi:umbrella-outline",
            forecast_precision: 0,
          },
          reading(weather, "pressure", "Pressure", "mdi:gauge"),
          {
            entity: sun,
            attribute: "next_setting",
            _layoutLabel: "Sunset",
            icon: "mdi:weather-sunset-down",
            date_format: "%H:%M",
          },
        ].map((c) => ({ ...c, _layoutGroup: "tiles", _layoutMax: 4 })),
        ...[1, 2, 3, 4, 5].map((offset) => ({
          entity: weather,
          forecast: "hourly",
          forecast_offset: offset,
          attribute: "temperature",
          icon: "weather",
          unit_format: "°",
          forecast_precision: 0,
          value_weight: "700",
          // Narrow columns: room for times like 10:00 AM.
          label_size: "11px",
          padding: "4px 2px",
          area: 2,
        })),
      ],
    };
  return null;
}

// Below this card width the wide layout has no room for its two columns and
// the card uses the standard layout instead.
export const WIDE_MIN_WIDTH = 600;

// The house the Home layout shows while the card has no picture of its own:
// six pictures in dist/ next to the card, one for day and night, each also wet
// and snowy. Rendered for the card, an invented house.
export const HOUSE_FILES = Object.freeze({
  day: "house-day.webp",
  night: "house-night.webp",
  rainDay: "house-rain-day.webp",
  rainNight: "house-rain-night.webp",
  snowDay: "house-snow-day.webp",
  snowNight: "house-snow-night.webp",
});
// The bundled house is wide: smaller and a bit lower than an own picture, it
// stays clear of the temperature and of the wind ring. Your own values win.
export const HOUSE_PLACEMENT = Object.freeze({ image_scale: 55, image_y: "28%" });
// A thunderstorm without reported rain still wets the house: it nearly always rains.
export const HOUSE_RAIN_STATES = Object.freeze(["rainy", "pouring", "lightning-rainy", "lightning", "hail"]);
export const HOUSE_SNOW_STATES = Object.freeze(["snowy", "snowy-rainy"]);

const isNoImage = (value) => typeof value === "string" && value.trim().toLowerCase() === "none";
const filled = (value) => typeof value === "string" && value.trim() !== "";

// True when the card has a picture of its own, or turns pictures off with
// image_day: none. Then the Home layout leaves its house out.
export function hasOwnImage(config) {
  if (!config) return false;
  return (
    filled(config.image_day) ||
    filled(config.image_night) ||
    filled(config.image_folder) ||
    filled(config.status_entity) ||
    (Array.isArray(config.image_conditions) && config.image_conditions.length > 0)
  );
}

// The image keys of the bundled house. Snow and rain follow the weather
// entity; day and night follow the sun like any own picture.
export function houseImages(weather, base = import.meta.url) {
  const url = (file) => new URL(`./${file}`, base).href;
  const rules = weather
    ? [
        { entity: weather, state: [...HOUSE_SNOW_STATES], image_day: url(HOUSE_FILES.snowDay), image_night: url(HOUSE_FILES.snowNight) },
        { entity: weather, state: [...HOUSE_RAIN_STATES], image_day: url(HOUSE_FILES.rainDay), image_night: url(HOUSE_FILES.rainNight) },
      ]
    : [];
  return { image_day: url(HOUSE_FILES.day), image_night: url(HOUSE_FILES.night), image_conditions: rules };
}

// True when the card shows the bundled house: the home layout without any
// picture of its own and without image_day: none.
export function usesBundledHouse(config) {
  if (!config) return false;
  const layout = String(config.card_layout ?? "").trim().toLowerCase();
  return (
    layout === "home" &&
    !isNoImage(config.image_day) &&
    !isNoImage(config.image_night) &&
    !hasOwnImage(config)
  );
}

// The config the card runs: the layout's values under the card's own.
export function applyCardLayout(config, width = 0) {
  // image_day / image_night: none means no picture, not a file called none.
  const noImage = isNoImage(config.image_day) || isNoImage(config.image_night);
  if (noImage) {
    config = { ...config };
    if (isNoImage(config.image_day)) config.image_day = "";
    if (isNoImage(config.image_night)) config.image_night = "";
  }
  let layout = String(config.card_layout ?? "").trim().toLowerCase();
  if (layout === "wide" && width > 0 && width < WIDE_MIN_WIDTH) layout = "standard";
  const base = layoutDefaults(layout, config.weather_entity || "", config.sun_entity || "sun.sun");
  if (!base) return config;
  const ownChips = Array.isArray(config.chips) && config.chips.length > 0;
  const house =
    layout === "home" && !noImage && !hasOwnImage(config)
      ? houseImages(config.weather_entity || "")
      : null;
  // The pictures go over the card's own values (those are only empty image
  // keys here); the house's placement stays under them.
  const out = { ...base, ...(house ? HOUSE_PLACEMENT : null), ...config, ...house };
  out.chips = ownChips ? config.chips : base.chips;
  return out;
}
