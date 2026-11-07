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
  wind_style: "lines",
});

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
