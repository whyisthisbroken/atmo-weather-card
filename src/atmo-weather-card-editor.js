/**
 * ATMO WEATHER CARD — VISUAL EDITOR
 * Visual editor for the atmo weather card.
 */
import { LitElement, html, css, svg } from "lit";
import {
  AREA2_DEFAULT_POSITION,
  CONFIG_DEFAULTS,
  PERF_PRESETS,
  chipArea,
  hasOwnImage,
  HOUSE_PLACEMENT,
  LAYOUT_LOOK_KEYS,
  arrangeChipsForLayout,
  houseImages,
  layoutDefaults,
  migrateConfig,
  perfPreset,
  usesBundledHouse,
  withoutLayoutNudges,
} from "./atmo-weather-config.js";
import { editorLanguage, makeTranslator } from "./atmo-weather-i18n.js";
import { isBearingChip } from "./atmo-weather-compass.js";
import { checkConditions } from "./atmo-weather-conditions.js";
import { folderImageCandidates } from "./atmo-weather-folder.js";
// Editor texts follow the Home Assistant language, see useLanguage().
let t = makeTranslator("en");
let tLang = "en";
function useLanguage(hass) {
  const lang = editorLanguage(hass);
  if (lang === tLang) return;
  tLang = lang;
  t = makeTranslator(lang);
}
const tOpts = (opts) => opts.map((o) => ({ ...o, label: t(o.label) }));
// Chip visibility: the condition types the editor offers. and/or/not groups
// work too, but only in YAML.
const VIS_TYPES = [
  { value: "state", label: "Entity state" },
  { value: "numeric_state", label: "Entity value" },
  { value: "screen", label: "Screen size" },
  { value: "time", label: "Time and weekday" },
  { value: "user", label: "User" },
];
// The same breakpoints as Home Assistant's own visibility editor.
const VIS_SCREENS = [
  { value: "mobile", label: "Phone", query: "(max-width: 767px)" },
  { value: "tablet", label: "Tablet", query: "(min-width: 768px) and (max-width: 1023px)" },
  { value: "desktop", label: "Desktop", query: "(min-width: 1024px) and (max-width: 1279px)" },
  { value: "wide", label: "Wide screen", query: "(min-width: 1280px)" },
];
const VIS_WEEKDAYS = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
];
const VIS_LABELS = {
  condition: "Type of condition",
  entity: "Entity",
  attribute: "Attribute (optional)",
  match: "Match",
  state: "States",
  above: "Greater than",
  below: "Less than",
  screens: "Screen sizes",
  media_query: "Media query",
  after: "From",
  before: "Until",
  weekdays: "Weekdays",
  users: "Users",
};
// The documentation page; the help buttons link into it.
const DOCS_URL = "https://whyisthisbroken.github.io/atmo-weather-card/";
// Help for the sections that bring none of their own: text and the place in
// the docs, or several places as [page#anchor, link text] pairs.
const SECTION_HELP = {
  colors: [
    "Automatic follows your Home Assistant theme, or the theme entity if you pick one: with sun.sun the card turns dark at sunset. Light and dark lock the colors. The filters tint the clouds and the sun glow.",
    "appearance.html#theme--filters",
  ],
  position: [
    "Matters when cards overlap: a higher layer puts the card in front of others, the offset moves it like a CSS margin, for example to tuck it under a header.",
    "guides.html#layout--layering",
  ],
  tap: [
    "What a tap on the card does, for example open the weather details or another dashboard. Without an action nothing happens. Every chip has a tap action of its own.",
    "appearance.html#card-style--layout",
  ],
  light: [
    "Golden and blue hour follow the height of the sun, sun rays shine through a partly cloudy sky, haze and ground mist come from the visibility, humidity and dew point of your weather, frost from the temperature and humidity. All of it works on its own.",
    [
      ["weather-data.html#weather-data", "Weather data"],
      ["weather-data.html#frost", "Frost"],
    ],
  ],
  wind: [
    "Wind lines and leaves follow the wind speed and direction of the weather entity and show in windy weather, and in rain, hail or snow from 40 km/h. The compass shows where the wind comes from.",
    [
      ["effects.html#wind", "Wind"],
      ["effects.html#wind-compass", "Wind compass"],
    ],
  ],
  precip: [
    "The amount follows the weather state, or your rain sensor under Your own sensors, and grows with the size of the card. The sliders turn it up or down.",
    "effects.html#rain--snow",
  ],
  night: [
    "Shooting stars and comets appear on clear nights only; rain, snow, storms and fog hide them. They need Effect Quality 1 or higher under Performance.",
    "effects.html#night-sky",
  ],
  fauna: [
    "Under Performance you set whether birds and planes may fly at all; here how often and how fast.",
    "effects.html#birds--planes",
  ],
  image_time: [
    "The night image comes with the sun, like the moon, or with the dark theme. The fade sets how many seconds one image takes to blend into the next; 0 switches at once.",
    [
      ["images.html#custom-images", "Day and night"],
      ["images.html#image-transition", "Blending between images"],
    ],
  ],
  image_place: [
    "The alignment picks the corner, the size scales the image and the offsets move it, in pixels or percent.",
    "images.html#custom-images",
  ],
};
// The same for the tabs of a chip.
const CHIP_TAB_HELP = {
  data: [
    "Pick an entity and, if you like, one of its attributes. With a weather entity the chip can also show the forecast for a later hour or day.",
    "chips.html#forecast-chips",
  ],
  text: [
    "Name, value and unit as the chip writes them. Dates and times take codes like %a or %H:%M, wind directions can show as WSW.",
    [
      ["chips.html#date-format", "Date format"],
      ["chips.html#per-chip-options", "All chip options"],
    ],
  ],
  icon: [
    "An icon like mdi:thermometer, the icon of the entity, or the weather icon of a forecast. Your own SVG icons work too.",
    "guides.html#weather-icons",
  ],
  look: [
    "Ring and bar show the value as a gauge. Sun path draws the arc of the sun and is offered for sun entities. The layout sets how icon, label and value sit.",
    [
      ["chips.html#ring--bar-gauges", "Ring & bar gauges"],
      ["chips.html#sun-path", "Sun path"],
      ["chips.html#per-chip-styling", "Per-chip styling"],
    ],
  ],
  position: [
    "A chip sits in a chip area. Free positioning takes it out and puts it anywhere on the card.",
    [
      ["chips.html#chip-area-2", "Two chip areas"],
      ["chips.html#free-positioning", "Free positioning"],
    ],
  ],
  tap: [
    "Without an action a tap opens the details of the entity.",
    "chips.html#per-chip-options",
  ],
  visibility: [
    "Shows the chip only while all conditions hold, like the visibility of Home Assistant cards.",
    "chips.html#chip-visibility",
  ],
};
// The values a card's layout brings (without its chips), as the card uses
// them: with the bundled house's placement, and without the layout's image
// nudges when the card has an image spot of its own.
function layoutLook(cfg) {
  const base =
    layoutDefaults(
      String(cfg.card_layout || "").trim().toLowerCase(),
      cfg.weather_entity || "",
      cfg.sun_entity || "sun.sun",
    ) || {};
  const { chips, ...rest } = base;
  return withoutLayoutNudges(usesBundledHouse(cfg) ? { ...rest, ...HOUSE_PLACEMENT } : rest, cfg);
}
// A deep copy of a config (plain JSON data), for Undo.
const cloneConfig = (config) => JSON.parse(JSON.stringify(config || {}));
// The same text for the same config, whatever the order of its keys.
function configKey(value) {
  if (Array.isArray(value)) return `[${value.map(configKey).join(",")}]`;
  if (value && typeof value === "object")
    return `{${Object.keys(value)
      .filter((k) => value[k] !== undefined)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${configKey(value[k])}`)
      .join(",")}}`;
  return JSON.stringify(value === undefined ? null : value);
}
// Rain rate units the precipitation picker accepts.
function isRainRateUnit(unit) {
  const u = String(unit || "").replace(/\s+/g, "").toLowerCase();
  return u === "mm/h" || u === "in/h";
}
// Which sensors each of your own readings accepts, by unit and device class.
const SPEED_UNITS = ["km/h", "mph", "m/s", "kn", "kt", "knots", "ft/s", "beaufort", "bft"];
const COMPASS_POINTS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
const OWN_SENSOR_FILTERS = Object.freeze({
  wind_speed_entity: (u, dc) => dc === "wind_speed" || SPEED_UNITS.includes(u.toLowerCase()),
  // Also text sensors that report a compass point like "NW".
  wind_bearing_entity: (u, dc, state) => dc === "wind_direction" || u === "°" || COMPASS_POINTS.includes(String(state || "").trim().toUpperCase()),
  temperature_entity: (u, dc) => dc === "temperature" || u === "°C" || u === "°F",
  humidity_entity: (u, dc) => dc === "humidity",
  dew_point_entity: (u, dc) => dc === "temperature" || u === "°C" || u === "°F",
  cloud_coverage_entity: (u, dc) => u === "%" && !dc,
  visibility_entity: (u, dc) => dc === "distance" || ["km", "mi", "m", "ft", "yd"].includes(u),
});
// Keeps a user path usable inside url("...").
function cssUrl(value) {
  return String(value || "").replace(/["\\\n\r]/g, "");
}
const LABELS = Object.freeze({
  weather_entity: "Weather Entity",
  sun_entity: "Sun Entity",
  moon_phase_entity: "Moon Phase Entity",
  precipitation_entity: "Precipitation Sensor",
  wind_speed_entity: "Wind speed",
  wind_bearing_entity: "Wind direction",
  temperature_entity: "Temperature",
  humidity_entity: "Humidity",
  dew_point_entity: "Dew point",
  cloud_coverage_entity: "Cloud cover",
  visibility_entity: "Visibility",
  theme_entity: "Theme Entity",
  _color_mode: "Color Mode",
  card_style: "Card Style",
  card_layout: "Layout",
  card_square: "Square Mode",
  card_height: "Card Height",
  card_padding: "Card Padding",
  card_offset: "Card Offset",
  card_stack_order: "Layer Order",
  card_tap_action: "Tap Action",
  css: "Own CSS",
  card_filter_clouds: "Cloud Filter",
  card_filter_sun: "Sun Filter",
  card_full_width: "Full Width",
  card_mask_vertical: "Fade Top & Bottom Edges",
  card_mask_horizontal: "Fade Left & Right Edges",
  card_hide_text: "Hide All Text",
  card_background_style: "Background Style",
  celestial_size: "Size (px)",
  celestial_position: "Position Mode",
  celestial_alignment: "Alignment",
  celestial_x: "X Offset",
  celestial_y: "Y Offset",
  image_day: "Day Image URL",
  image_night: "Night Image URL",
  image_night_source: "Night image shows",
  image_transition: "Fade time (s)",
  image_folder: "Picture folder",
  forecast_curve: "Temperature curve",
  forecast_curve_height: "Curve height (px)",
  image_folder_type: "File type",
  image_scale: "Image Scale (%)",
  image_max_width: "Max width (%)",
  image_alignment: "Image Position",
  image_x: "Horizontal Offset",
  image_y: "Vertical Offset",
  status_entity: "Status Entity",
  status_day: "Status Image (Day)",
  status_night: "Status Image (Night)",
  chip_area_hide: "Disable Chips",
  chip_area_position: "Position",
  chip_text_size: "Value text size",
  chip_label_size: "Label text size",
  chip_area_layout: "Layout",
  chip_style: "Chip style",
  chip_area_columns: "Columns",
  chip_area_scroll_count: "Show at once",
  chip_area_align: "Align content",
  chip_area_width: "Width",
  chip_area_height: "Height",
  chip_area_full_width: "Full width chips",
  chip_padding: "Chip padding",
  chip_area_padding: "Container padding",
  chip_area_gap: "Chips gap",
  chip_gap: "Icon/text gap",
  chip_text_gap: "Label/value gap",
  chip_icon_size: "Icon size",
  chip_area_background: "Background",
  chip_area_grouped: "One shared background",
  chip_area_separator: "Divider between chips",
  chip_icon_background: "Icon background",
  chip_icon_padding: "Padding around icon",
  custom_cards_position: "Embedded Cards Position",
  custom_cards_css_class: "Embedded Cards CSS Class",
  chip_area_background_color: "Container Background Color",
  perf_mode: "Performance Preset",
  perf_fps: "Frame Rate",
  perf_cloud_quality: "Cloud Detail",
  perf_effects: "Effect Quality",
  perf_fauna: "Fauna",
  perf_dpr: "Sharpness",
  animation_speed: "Animation Speed",
  bird_animation_speed: "Bird Animation Speed",
  star_animation_speed: "Star Twinkle Speed",
  fauna_birds_at_night: "Birds at night",
  fauna_plane_speed: "Plane speed",
  effect_blue_hour: "Blue hour",
  effect_golden_hour: "Golden hour",
  effect_sun_rays: "Sun rays",
  effect_haze: "Haze",
  effect_ground_mist: "Ground mist",
  effect_frost: "Frost",
  effect_cloud_coverage: "Cloud amount from data",
  effect_shooting_stars: "Shooting stars",
  effect_comets: "Comets",
  shooting_star_rate: "Frequency",
  comet_rate: "Frequency",
  wind_style: "Wind Display",
  leaf_density: "Amount of leaves",
  rain_density: "Amount of rain",
  snow_density: "Amount of snow",
  effect_rain_splash: "Splashes",
  effect_snow_edge: "Snow edge",
  effect_spill: "Fall out of the card",
  effect_text_scrim: "Veil behind the text",
  wind_compass: "Wind compass",
  wind_compass_position: "Compass position",
  wind_compass_cardinal: "Show compass point",
  wind_compass_degrees: "Show degrees",
  wind_compass_speed: "Show wind speed",
  wind_compass_background: "Frosted background",
});
const HELPERS = Object.freeze({
  weather_entity: "",
  sun_entity: "Used for the day/night cycle.",
  moon_phase_entity: "Optional. Without a sensor the card works out the moon phase from the date.",
  precipitation_entity:
    "Optional. Current rain intensity in mm/h or in/h, so rain and snow follow the measured amount. Only sensors with these units are listed.",
  wind_speed_entity: "Moves the sky, the wind lines and the compass. Sensors in km/h, mph, m/s, kn, ft/s or Beaufort.",
  wind_bearing_entity: "Where the wind comes from, in degrees or as a compass point like NW.",
  temperature_entity: "With the humidity it decides on ground mist.",
  humidity_entity: "Humid air makes haze and, near the dew point, ground mist.",
  dew_point_entity: "Empty: worked out from your temperature and humidity.",
  cloud_coverage_entity: "Sets the amount of clouds. A sensor in %.",
  visibility_entity: "Low visibility makes haze. Sensors in km, mi, m, ft or yd.",
  theme_entity: "An entity whose state switches between light and dark mode.",
  card_height: "In pixels, e.g. 220. Use 'auto' for dashboard grid layouts.",
  card_padding: "Inner padding, e.g. 16px or 12px 20px.",
  card_offset: "",
  card_tap_action: "What happens when the card is tapped.",
  css: "Styles inside the card, without card_mod. Classes and variables are listed in the docs.",
  card_full_width: "Removes side margins so the card fills edge to edge.",
  card_mask_vertical: "Adds a soft fade to the top and bottom edges.",
  card_mask_horizontal: "Adds a soft fade to the left and right edges.",
  card_hide_text: "Hides all text overlays in one toggle.",
  card_filter_clouds: "A color filter applied to clouds.",
  card_filter_sun: "A color filter applied to the sun.",
  celestial_x: "Horizontal offset from the alignment edge, in pixels.",
  celestial_y: "Vertical offset from the alignment edge, in pixels.",
  celestial_position: "",
  image_night: "Shown at night. Falls back to the day image if left empty.",
  image_night_source:
    "Applies to every image of the card, the state images too. Without a sun entity the color mode decides.",
  image_transition:
    "How long one image blends into the next when it changes, for example at sunset. 0 switches at once.",
  image_folder: "A folder like /local/house/ with one picture per weather: sunny.webp, rainy.webp, rainy-night.webp and so on.",
  image_folder_type: "The file ending of all pictures in the folder.",
  forecast_curve: "Drawn over the forecast chips in the chip area that show the temperature, at least two.",
  forecast_curve_height: "Room the curve takes above the chips.",
  image_scale: "Image height as a percentage of the card height.",
  image_max_width: "The most of the card width the image may take; on a narrower card it shrinks. 0 = no limit.",
  image_alignment: "",
  image_x: "Moves the image sideways from its spot, positive to the right. Pixels or CSS, e.g. -20 or 10% (of the card width).",
  image_y: "Moves the image away from the edge it sits at (up from the bottom). Pixels or CSS, e.g. 10 or -5% (of the card height).",
  status_entity:
    "Shows a different image when this entity is active, open, or home.",
  status_day: "Day image shown while the status entity is active.",
  status_night: "Night image shown while the status entity is active.",
  chip_area_columns: "Number of equal-width columns in grid layout.",
  chip_area_align: "Horizontal alignment of chips within the container.",
  card_background_style:
    "Frosted: translucent glass effect. Contrast: solid and readable. Theme: follows your HA theme colours.",
  custom_cards_css_class:
    "Adds a CSS class to the embedded cards container (useful with card_mod).",
  perf_mode: "Choose a preset or fine-tune each setting below.",
  animation_speed: "Global animation speed multiplier for all motion.",
  bird_animation_speed:
    "Bird-only speed multiplier applied on top of animation speed.",
  star_animation_speed: "Twinkle speed multiplier for night stars.",
  fauna_birds_at_night: "Turn off to let birds fly only during the day.",
  fauna_plane_speed:
    "Near planes fly faster than distant ones; the slider scales all of them.",
  effect_blue_hour: "Deep blue sky after sunset and before sunrise.",
  effect_golden_hour: "Warm light on the sky and clouds when the sun is low, orange to violet at sunset.",
  effect_sun_rays: "Beams of light through broken clouds.",
  effect_haze: "A veil with poor visibility or high humidity.",
  effect_ground_mist: "Mist near the dew point, at night and in the morning.",
  effect_frost: "Rime on the card below 0 °C, or just above it in very humid air. Colder air lets it reach further in.",
  effect_cloud_coverage:
    "The cloud cover of the weather entity sets the amount of clouds. Off: a fixed amount per weather state.",
  comet_rate:
    "1× is about one shooting star every 12 s and a comet about once a minute (Ultra, clear night).",
  card_stack_order: "Higher values sit in front of other cards.",
  wind_style:
    "Shows wind direction and strength in windy weather, and in rain, hail or snow from 40 km/h. Leaves are green in spring and summer and turn to autumn colours in autumn and winter.",
  rain_density: "1× is the usual amount for the weather. The rain sensor, if you have one, still sets how hard it rains.",
  effect_rain_splash: "Part of the drops splash on the bottom edge of the card.",
  snow_density:
    "Snow has no sensor of its own. A precipitation sensor that measures melted snow, like a weather service's or a heated gauge, sets it too; this slider scales it on top.",
  effect_snow_edge: "A thin edge of snow builds up along the bottom of the card.",
  effect_spill:
    "Rain and snow fall out of the bottom of the card onto the dashboard and fade there.",
  effect_text_scrim:
    "A soft veil behind the chip row keeps the text readable on any sky.",
  wind_compass:
    "Shows where the wind comes from, read from wind_bearing of the weather entity. The arrow points where it blows to.",
  wind_compass_position: "Automatic puts each style in its usual corner and moves it to a free place. With no free place, as in the Panel layout, the compass stays hidden: pick a position to show it anyway.",
  wind_compass_background: "A frosted box behind the compass, readable on any sky.",
});
const CHIP_LABELS = Object.freeze({
  entity: "Entity",
  attribute: "Attribute",
  name: "Label",
  name_sensor: "Label Entity",
  name_attribute: "Label Attribute",
  sub_value_entity: "Sub Value Entity",
  sub_value_attribute: "Sub Value Attribute",
  gauge_entity: "Value Entity",
  gauge_attribute: "Value Attribute",
  width: "Width",
  overflow: "Value overflow",
  label_overflow: "Label overflow",
  sub_value_overflow: "Sub value overflow",
  marquee_speed: "Scroll speed",
  marquee_rtl: "Right-to-left",
  icon: "Icon",
  icon_path: "Icon folder",
  tap_action: "Tap Action",
  unit_format: "Custom unit",
  date_format: "Date format",
  bearing_format: "Wind direction as",
  bearing_icon: "Wind direction icon",
  text_size: "Value text size",
  label_size: "Label text size",
  inner_gap: "Icon/text gap",
  text_gap: "Label/value gap",
  padding: "Chip padding",
});
const CHIP_HELPERS = Object.freeze({
  name_sensor: "Use a sensor value as the label instead.",
  width: "e.g. 200px or 60%. Constrains the chip width.",
  label_overflow: "How label text behaves when it is too long.",
  icon: "MDI icon, or type 'weather' for a dynamic icon.",
  icon_path: "e.g. /local/weather-icons/",
  forecast_offset: "0 = today/now, 1 = tomorrow/next hour, etc.",
  date_format: "Codes like %a (day), %d.%m. (date) or %H:%M (time). Empty shows the usual text.",
});
const KEY_ORDER = Object.freeze([
  "type",
  "name",
  "entity",
  "weather_entity",
  "precipitation_entity",
  "wind_speed_entity",
  "wind_bearing_entity",
  "temperature_entity",
  "humidity_entity",
  "dew_point_entity",
  "cloud_coverage_entity",
  "visibility_entity",
  "sun_entity",
  "moon_phase_entity",
  "color_mode",
  "card_color_mode",
  "theme_entity",
  "card_layout",
  "layout_chips",
  "card_style",
  "card_height",
  "card_padding",
  "card_square",
  "celestial_size",
  "celestial_position",
  "celestial_alignment",
  "celestial_x",
  "celestial_y",
  "image_day",
  "image_night",
  "image_night_source",
  "image_transition",
  "image_folder",
  "image_folder_type",
  "image_scale",
  "image_max_width",
  "image_alignment",
  "status_entity",
  "status_day",
  "status_night",
  "chip_area_position",
  "card_hide_text",
  "chip_area_hide",
  "chip_text_size",
  "chip_label_size",
  "chip_area_layout",
  "chip_area_columns",
  "chip_area_scroll_count",
  "chip_area_align",
  "chip_area_width",
  "chip_area_height",
  "chip_area_full_width",
  "chip_padding",
  "chip_area_padding",
  "chip_area_gap",
  "chip_gap",
  "chip_text_gap",
  "chip_icon_size",
  "chip_style",
  "chip_area_background",
  "chip_area_grouped",
  "chip_area_separator",
  "chip_background_color",
  "chip_icon_background_color",
  "chip_area_background_color",
  "card_background_style",
  "card_tap_action",
  "hold_action",
  "double_tap_action",
  "card_offset",
  "card_full_width",
  "card_mask_vertical",
  "card_mask_horizontal",
  "card_stack_order",
  "card_filter_clouds",
  "card_filter_sun",
  "chip_icon_background",
  "custom_cards_position",
  "custom_cards_css_class",
  "perf_mode",
  "perf_fps",
  "animation_speed",
  "bird_animation_speed",
  "star_animation_speed",
  "perf_cloud_quality",
  "perf_effects",
  "perf_fauna",
  "perf_dpr",
  "fauna_bird_density",
  "fauna_plane_density",
  "fauna_bird_flock_size",
  "fauna_birds_at_night",
  "fauna_birds",
  "fauna_planes",
  "fauna_plane_speed",
  "wind_style",
  "leaf_density",
  "wind_compass",
  "wind_compass_position",
  "wind_compass_cardinal",
  "wind_compass_degrees",
  "wind_compass_speed",
  "wind_compass_background",
  "effect_blue_hour",
  "effect_golden_hour",
  "effect_sun_rays",
  "effect_haze",
  "effect_ground_mist",
  "effect_frost",
  "effect_cloud_coverage",
  "effect_shooting_stars",
  "shooting_star_rate",
  "effect_comets",
  "comet_rate",
  "rain_density",
  "effect_rain_splash",
  "snow_density",
  "effect_snow_edge",
  "effect_spill",
  "effect_text_scrim",
  "forecast_curve",
  "forecast_curve_height",
  "chip_area_2",
  "chips",
  "css",
  "custom_cards",
]);
const CHIP_STYLE_OVERRIDE_KEYS = Object.freeze([
  "style",
  "align",
  "background",
  "icon_background",
  "background_color",
  "icon_background_color",
  "padding",
  "text_size",
  "label_size",
  "inner_gap",
  "text_gap",
  "icon_size",
  "icon_padding",
  "width",
  "height",
  "value_weight",
  "label_weight",
  "chip_round",
  "sub_value_size",
  "sub_value_weight",
]);
const TOP_LEVEL_NUMBER_FIELDS = Object.freeze([
  "card_stack_order",
  "celestial_size",
  "celestial_x",
  "celestial_y",
  "image_scale",
  "image_max_width",
  "image_transition",
  "forecast_curve_height",
  "chip_area_columns",
  "chip_area_scroll_count",
  "perf_fps",
  "animation_speed",
  "bird_animation_speed",
  "star_animation_speed",
  "perf_cloud_quality",
  "perf_effects",
  "perf_fauna",
  "perf_dpr",
  "fauna_bird_density",
  "fauna_plane_density",
  "fauna_bird_flock_size",
  "fauna_plane_speed",
  "shooting_star_rate",
  "comet_rate",
  "rain_density",
  "snow_density",
  "leaf_density",
]);
const TOP_LEVEL_BOOLEAN_FIELDS = Object.freeze([
  "layout_chips",
  "card_square",
  "card_hide_text",
  "chip_area_hide",
  "chip_area_full_width",
  "chip_area_background",
  "chip_area_grouped",
  "chip_area_separator",
  "card_full_width",
  "card_mask_vertical",
  "card_mask_horizontal",
  "chip_icon_background",
  "fauna_birds_at_night",
  "fauna_birds",
  "fauna_planes",
  "effect_blue_hour",
  "effect_golden_hour",
  "effect_sun_rays",
  "effect_haze",
  "effect_ground_mist",
  "effect_frost",
  "effect_cloud_coverage",
  "effect_shooting_stars",
  "effect_comets",
  "effect_rain_splash",
  "effect_snow_edge",
  "effect_spill",
  "effect_text_scrim",
]);
const CHIP_NUMBER_FIELDS = Object.freeze([
  "forecast_offset",
  "forecast_precision",
  "value_precision",
  "marquee_speed",
  "ring_min",
  "ring_max",
  "ring_width",
  "ring_gap",
  "bar_min",
  "bar_max",
  "bar_height",
  "bar_gap",
]);
const CHIP_BOOLEAN_FIELDS = Object.freeze([
  "hide_icon",
  "hide_label",
  "hide_value",
  "hide_sub_value",
  "marquee_rtl",
  "background",
  "icon_background",
  "fancy_unit",
  "chip_round",
  "behind_effects",
  "bearing_speed",
]);
const CHIP_CSS_SIZE_FIELDS = Object.freeze(["width", "height"]);
const OPT = Object.freeze({
  color_mode: [
    {
      value: "ha_theme",
      short: "HA theme",
      label: "Follow my Home Assistant theme",
    },
    {
      value: "entity",
      short: "Entity",
      label: "Follow another entity (e.g. the sun)",
    },
    { value: "force_light", short: "Light", label: "Force light mode" },
    { value: "force_dark", short: "Dark", label: "Force dark mode" },
  ],
  wind_compass: [
    { value: "off", label: "Off" },
    { value: "arrow", label: "Wind arrow" },
    { value: "rose", label: "Compass rose" },
    { value: "pill", label: "Compass chip" },
    { value: "band", label: "Compass band" },
    { value: "vane", label: "Wind vane" },
    { value: "ticks", label: "Tick ring" },
    { value: "badge", label: "Wind badge" },
  ],
  wind_compass_position: [
    { value: "auto", label: "Automatic" },
    { value: "top-left", label: "Top left" },
    { value: "top-center", label: "Top center" },
    { value: "top-right", label: "Top right" },
    { value: "bottom-left", label: "Bottom left" },
    { value: "bottom-center", label: "Bottom center" },
    { value: "bottom-right", label: "Bottom right" },
  ],
  image_night_source: [
    { value: "sun", label: "From sunset to sunrise" },
    { value: "theme", label: "While the card is dark (Color mode)" },
  ],
  image_folder_type: ["webp", "png", "jpg", "svg"].map((v) => ({ value: v, label: `.${v}` })),
  forecast_curve: [
    { value: "off", label: "Off" },
    { value: "line", label: "Line" },
    { value: "soft", label: "Soft line" },
    { value: "band", label: "Band from low to high" },
    { value: "color", label: "Colored by temperature" },
  ],
  card_filter_clouds: [
    { value: "none", label: "None" },
    { value: "darken", label: "Darken" },
    { value: "vivid", label: "Vivid" },
    { value: "muted", label: "Muted" },
    { value: "warm", label: "Warm" },
  ],
  card_filter_sun: [
    { value: "none", label: "None" },
    { value: "darken", label: "Darken" },
    { value: "vivid", label: "Vivid" },
    { value: "muted", label: "Muted" },
    { value: "warm", label: "Warm" },
  ],
  bearing_format: [
    { value: "degrees", label: "Degrees (250)" },
    { value: "cardinal", label: "Compass point (WSW)" },
    { value: "both", label: "Compass point and degrees (WSW 250°)" },
  ],
  bearing_icon: [
    { value: "icon", label: "Chip icon" },
    { value: "arrow", label: "Arrow, where the wind blows" },
    { value: "filled", label: "Filled arrow, where the wind blows" },
    { value: "needle", label: "Compass needle, where the wind comes from" },
  ],
  chip_overflow: [
    { value: "ellipsis", label: "Ellipsis (…)" },
    { value: "marquee", label: "Scrolling text" },
    { value: "clip", label: "Clip" },
    { value: "wrap", label: "Wrap" },
  ],
  chip_area_layout: [
    { value: "wrap", label: "Wrap" },
    { value: "grid", label: "Grid" },
    { value: "horizontal-scroll", label: "Scroll X" },
    { value: "vertical-scroll", label: "Scroll Y" },
  ],
  chip_area_align: [
    { value: "start", label: "Left" },
    { value: "center", label: "Center" },
    { value: "end", label: "Right" },
    { value: "spread", label: "Spread" },
  ],
});
const FC_ATTRIBUTES = Object.freeze([
  { value: "condition", label: "Condition" },
  { value: "temperature", label: "Temperature (high)" },
  { value: "templow", label: "Temperature (low)" },
  { value: "precipitation_probability", label: "Rain probability" },
  { value: "precipitation", label: "Precipitation" },
  { value: "humidity", label: "Humidity" },
  { value: "wind_speed", label: "Wind speed" },
  { value: "wind_bearing", label: "Wind bearing" },
  { value: "pressure", label: "Pressure" },
  { value: "cloud_coverage", label: "Cloud coverage" },
  { value: "uv_index", label: "UV index" },
]);
const POSITION_GRIDS = Object.freeze({
  image_alignment: {
    cells: [
      ["top-left", "top-center", "top-right"],
      ["left", "center", "right"],
      ["bottom-left", "bottom-center", "bottom-right"],
    ],
    valueMap: { left: "center-left", right: "center-right" },
  },
  custom_cards_position: {
    cells: [
      ["top-left", "top-center", "top-right"],
      ["left", "center", "right"],
      ["bottom-left", "bottom-center", "bottom-right"],
    ],
    valueMap: { left: "center-left", right: "center-right" },
  },
  celestial_alignment: {
    cells: [
      ["top-left", "top-center", "top-right"],
      ["left", "center", "right"],
      ["bottom-left", "bottom-center", "bottom-right"],
    ],
  },
  chip_area_position: {
    cells: [
      ["top-left", "top-center", "top-right"],
      ["left", "center", "right"],
      ["bottom-left", "bottom-center", "bottom-right"],
    ],
  },
});
const PREPARED_POSITION_GRIDS = Object.freeze(
  Object.fromEntries(
    Object.entries(POSITION_GRIDS).map(([field, def]) => {
      const valueMap = def.valueMap || {};
      const reverseMap = Object.fromEntries(
        Object.entries(valueMap).map(([k, v]) => [v, k]),
      );
      return [
        field,
        Object.freeze({
          ...def,
          valueMap,
          reverseMap,
          cellsFlat: def.cells.flat(),
          disabledSet: new Set(def.disabled || []),
        }),
      ];
    }),
  ),
);
// data-mode values consumed by _onChipToggleChange / _onChipSegmentedSelect.
// Runtime defaults of number options outside the performance presets.
const SLIDER_DEFAULTS = Object.freeze({
  image_scale: 100,
  image_max_width: 0,
  image_transition: CONFIG_DEFAULTS.image_transition,
  forecast_curve_height: 46,
  // The card sits at layer 1 when no order is set.
  card_stack_order: 1,
  // Sun and moon are drawn with a radius of 31 px when no size is set.
  celestial_size: 62,
});
const TOGGLE_MODE = Object.freeze({
  TRUE_DELETE: "true-delete",
  FALSE_DELETE: "false-delete",
  TRUE_FALSE_IF_DEFINED: "true-false-if-defined",
});
const SEGMENT_MODE = Object.freeze({
  SET_OR_DELETE_EMPTY: "set-or-delete-empty",
  TOGGLE_DELETE_IF_SAME: "toggle-delete-if-same",
  BESIDE_OR_DELETE: "beside-or-delete",
  SOLID_OR_DELETE: "solid-or-delete",
});
class AtmosphericWeatherCardEditor extends LitElement {
  static get properties() {
    return {
      _config: { type: Object, state: true },
      _colorModeState: { type: String, state: true },
      _expandedCard: { type: Number, state: true },
      _expandedImageRule: { type: Number, state: true },
      _expandedChip: { type: Number, state: true },
      _openPanel: { type: String, state: true },
      _openSection: { type: String, state: true },
      _cardHeightError: { type: String, state: true },
      _layoutSwitch: { type: Object, state: true },
    };
  }
  set hass(val) {
    const old = this._hass;
    this._hass = val;
    if (!old && val) {
      this.requestUpdate();
    } else if (old && val) {
      if (!this._hassThrottle) {
        this._hassThrottle = true;
        this._hassThrottleTimer = setTimeout(() => {
          this._hassThrottle = false;
          this._hassThrottleTimer = null;
          this.requestUpdate();
        }, 2000);
      }
    }
  }
  get hass() {
    return this._hass;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._hassThrottleTimer) {
      clearTimeout(this._hassThrottleTimer);
      this._hassThrottleTimer = null;
    }
  }
  static get styles() {
    return css`
      :host {
        --awc-e-s1: 4px;
        --awc-e-s2: 8px;
        --awc-e-s3: 12px;
        --awc-e-s4: 16px;
        --awc-e-r-box: 10px;
        --awc-e-r-ctrl: 8px;
        --awc-e-r-inline: 6px;
        --awc-e-f-meta: 12px;
        --awc-e-f-label: 13px;
        --awc-e-f-body: 14px;
        --awc-e-f-header: 15px;
        --awc-e-t: 150ms ease;
        --awc-e-field-fill: color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
        display: block;
      }
      /* ── Spacing ── */
      ha-form {
        display: block;
      }
      ha-expansion-panel {
        display: block;
        margin-top: var(--awc-e-s3);
        --ha-card-border-radius: var(--awc-e-r-box);
        & ha-form {
          margin-top: var(--awc-e-s2);
        }
      }
      ha-form + ha-form {
        margin-top: var(--awc-e-s1);
      }
      .chip-accordion-body > * + *,
      .settings-group > * + *,
      .disclosure-body > * + * {
        margin-top: var(--awc-e-s2);
      }
      .chip-accordion-body > :first-child,
      .settings-group > :first-child,
      .disclosure-body > :first-child {
        margin-top: 0;
      }
      .settings-group > .settings-group-label + *,
      .settings-group > .section-title + * {
        margin-top: 0;
      }
      /* ── Panel headers ── */
      .panel-header {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        font-size: var(--awc-e-f-header);
        font-weight: 500;
        color: var(--primary-text-color);
        & ha-icon {
          --mdc-icon-size: 20px;
          color: var(--secondary-text-color);
        }
      }
      /* ── Shared backgrounds ── */
      .info,
      .cards-empty,
      .card-row,
      details.disclosure {
        background: var(--secondary-background-color);
        border-radius: var(--awc-e-r-box);
      }
      details.disclosure details.disclosure,
      details.disclosure .card-row {
        background:
          linear-gradient(
            color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent),
            color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent)
          ),
          var(--secondary-background-color);
      }
      .composite,
      .grid-picker {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
        border-radius: var(--awc-e-r-box);
      }
      .composite:last-child,
      .grid-picker:last-child,
      .section-box:last-child {
        margin-bottom: 0;
      }
      .disclosure-body > :last-child {
        margin-bottom: 0;
      }
      /* ── Info blocks ── */
      .info {
        padding: var(--awc-e-s3) var(--awc-e-s4);
        margin: 0 0 var(--awc-e-s3) 0;
        font-size: var(--awc-e-f-label);
        line-height: 1.5;
        color: var(--secondary-text-color);
        & b {
          color: var(--primary-text-color);
          font-weight: 500;
        }
        & code {
          background: var(--primary-background-color);
          padding: 1px 6px;
          border-radius: 4px;
          font-size: var(--awc-e-f-meta);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        &.inline-action {
          display: flex;
          align-items: center;
          gap: var(--awc-e-s3);
          justify-content: space-between;
          & > span {
            flex: 1;
          }
        }
      }
      .inline-action-btn {
        flex-shrink: 0;
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 0;
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        transition: opacity var(--awc-e-t);
        &:hover {
          opacity: 0.85;
        }
        &.secondary {
          background: transparent;
          color: var(--primary-color);
          box-shadow: inset 0 0 0 1px var(--primary-color);
        }
      }
      .inline-action-btns {
        display: flex;
        flex-wrap: wrap;
        gap: var(--awc-e-s2);
        flex-shrink: 0;
      }
      .info.layout-ask {
        flex-wrap: wrap;
        border-radius: var(--awc-e-r-ctrl);
        background: color-mix(in srgb, var(--primary-color) 8%, transparent);
        border: 1px solid color-mix(in srgb, var(--primary-color) 30%, transparent);
        color: var(--primary-text-color);
      }
      /* ── Labels & helpers ── */
      .grid-picker-label,
      .composite-label {
        display: block;
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        margin-bottom: var(--awc-e-s2);
        color: var(--primary-text-color);
      }
      .grid-helper,
      .composite-helper {
        margin-top: var(--awc-e-s2);
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        line-height: 1.5;
      }
      .scope-note {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
        & ha-icon {
          --mdc-icon-size: 14px;
        }
      }
      /* ── Grid layouts ── */
      .card-size-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--awc-e-s2);
      }
      .grid-picker {
        margin: var(--awc-e-s3) 0 var(--awc-e-s4) 0;
        padding: var(--awc-e-s3) var(--awc-e-s4);
      }
      .section-box .grid-picker {
        margin: var(--awc-e-s2) 0 0 0;
        background: transparent;
        padding: 0;
      }
      .field-group .grid-picker {
        margin: 0;
        background: transparent;
        padding: 0;
      }
      .chips-pos-align-row .grid-picker {
        margin: 0;
        padding: 0;
        background: transparent;
        flex-shrink: 0;
      }
      .grid-3x3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--awc-e-s1);
        width: 144px;
        aspect-ratio: 1;
      }
      .grid-cell {
        border: 0;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 16%, transparent);
        border-radius: var(--awc-e-r-inline);
        cursor: pointer;
        padding: 0;
        transition: background var(--awc-e-t);
        &:hover:not(.disabled):not(.active) {
          background: color-mix(in srgb, var(--primary-text-color, #212121) 28%, transparent);
        }
        &.active {
          background: var(--primary-color);
        }
        &.empty {
          visibility: hidden;
          pointer-events: none;
        }
        &.disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: repeating-linear-gradient(
            45deg,
            color-mix(in srgb, var(--primary-text-color, #212121) 16%, transparent) 0 6px,
            var(--divider-color) 6px 7px
          );
        }
      }
      .grid-extras {
        display: flex;
        gap: var(--awc-e-s1);
        margin-top: var(--awc-e-s2);
        flex-wrap: wrap;
      }
      .grid-extra {
        flex: 1;
        min-width: 100px;
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 0;
        background: var(--secondary-background-color);
        border-radius: var(--awc-e-r-inline);
        color: var(--primary-text-color);
        font-size: var(--awc-e-f-label);
        cursor: pointer;
        transition:
          background var(--awc-e-t),
          color var(--awc-e-t);
        &:hover:not(.active) {
          background: var(--divider-color);
        }
        &.active {
          background: var(--primary-color);
          color: var(--text-primary-color, white);
        }
      }
      /* ── Composite field groups ── */
      .composite {
        margin: var(--awc-e-s3) 0 var(--awc-e-s4) 0;
        padding: var(--awc-e-s3) var(--awc-e-s4);
      }
      .composite-row {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        flex-wrap: wrap;
      }
      .composite-unit {
        font-size: var(--awc-e-f-label);
        color: var(--secondary-text-color);
      }
      .composite-number,
      .composite-grid-4 input {
        flex: 1;
        min-width: 120px;
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 1px solid transparent;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
        color: var(--primary-text-color);
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-body);
        box-sizing: border-box;
        transition: border-color var(--awc-e-t);
        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }
      .composite-number:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .composite-grid-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--awc-e-s2);
        & label {
          display: flex;
          flex-direction: column;
          gap: var(--awc-e-s1);
          font-size: var(--awc-e-f-meta);
          color: var(--secondary-text-color);
        }
        & input {
          flex: none;
          min-width: 0;
          width: 100%;
        }
      }
      /* ── Segmented controls ── */
      .segmented {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
        border-radius: var(--awc-e-r-ctrl);
        padding: 0;
        gap: 1px;
        box-sizing: border-box;
        & button {
          flex: 1 1 auto;
          min-width: 52px;
          padding: var(--awc-e-s2) var(--awc-e-s3);
          border: 0;
          background: transparent;
          color: var(--primary-text-color);
          font-size: var(--awc-e-f-body);
          cursor: pointer;
          transition:
            background var(--awc-e-t),
            color var(--awc-e-t);
          text-align: center;
          border-radius: var(--awc-e-r-ctrl);
          &:hover:not(.active) {
            background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
          }
          &.active {
            background: var(--primary-color);
            color: var(--text-primary-color, white);
          }
        }
        &.segmented-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }
      .composite-row .segmented {
        flex: 1;
        min-width: 0;
      }
      .segmented.segmented-compact {
        & button {
          min-width: 0;
          padding: var(--awc-e-s2) var(--awc-e-s1);
          font-size: var(--awc-e-f-meta);
        }
      }
      /* ── Disclosure / details ── */
      details.disclosure {
        margin-top: var(--awc-e-s3);
        overflow: hidden;
        & > summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--awc-e-s2);
          padding: var(--awc-e-s3) var(--awc-e-s4);
          font-size: var(--awc-e-f-label);
          font-weight: 500;
          color: var(--primary-text-color);
          user-select: none;
          transition: background var(--awc-e-t);
          &::-webkit-details-marker {
            display: none;
          }
          &:hover {
            background: var(--divider-color);
          }
          & ha-icon {
            --mdc-icon-size: 18px;
            color: var(--secondary-text-color);
          }
          & .chevron {
            transition: transform var(--awc-e-t);
          }
        }
        &[open] > summary .chevron {
          transform: rotate(90deg);
        }
        & > .disclosure-body {
          padding: var(--awc-e-s4) var(--awc-e-s4) var(--awc-e-s3)
            var(--awc-e-s4);
        }
      }
      /* ── Card rows (cards editor) ── */
      .cards-empty {
        padding: var(--awc-e-s4);
        text-align: center;
        font-size: var(--awc-e-f-label);
        color: var(--secondary-text-color);
        margin-bottom: var(--awc-e-s3);
      }
      .card-row {
        margin-bottom: var(--awc-e-s2);
        overflow: hidden;
        & .card-row-head {
          display: flex;
          align-items: center;
          gap: var(--awc-e-s2);
          padding: var(--awc-e-s3) var(--awc-e-s4);
          cursor: pointer;
          user-select: none;
          transition: background var(--awc-e-t);
          &:hover {
            background: color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent);
          }
          & > .chevron {
            --mdc-icon-size: 20px;
            color: var(--secondary-text-color);
            transition: transform var(--awc-e-t);
          }
        }
        &.expanded .card-row-head > .chevron {
          transform: rotate(90deg);
        }
        & .card-row-title {
          flex: 1;
          font-size: var(--awc-e-f-body);
          font-weight: 500;
          color: var(--primary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        & .card-row-actions {
          display: flex;
          gap: 2px;
          & button {
            width: 32px;
            height: 32px;
            border: 0;
            background: transparent;
            color: var(--secondary-text-color);
            border-radius: var(--awc-e-r-inline);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition:
              background var(--awc-e-t),
              color var(--awc-e-t);
            &:hover:not(:disabled) {
              background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
              color: var(--primary-text-color);
            }
            &:disabled {
              opacity: 0.3;
              cursor: not-allowed;
            }
          }
          & ha-icon {
            --mdc-icon-size: 18px;
          }
        }
        & .card-row-body {
          padding: var(--awc-e-s3) var(--awc-e-s4) var(--awc-e-s4);
          background: color-mix(in srgb, var(--primary-text-color, #212121) 3%, transparent);
        }
      }
      /* ── Add buttons ── */
      .add-card-btn,
      .add-chip-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--awc-e-s2);
        width: 100%;
        padding: var(--awc-e-s3);
        border: 1.5px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.4);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.06);
        color: var(--primary-color);
        border-radius: var(--awc-e-r-box);
        font-size: var(--awc-e-f-body);
        font-weight: 500;
        cursor: pointer;
        transition:
          background var(--awc-e-t),
          border-color var(--awc-e-t);
        &:hover {
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.12);
          border-color: var(--primary-color);
        }
        & ha-icon {
          --mdc-icon-size: 20px;
        }
      }
      .sensor-list {
        margin-top: 0;
        &:empty {
          display: none;
        }
      }
      /* ── Compact fields ── */
      .compact-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--awc-e-s2);
        margin: var(--awc-e-s3) 0;
      }
      .compact-field {
        display: flex;
        flex-direction: column;
        gap: 2px;
        & .compact-field-label {
          font-size: var(--awc-e-f-meta);
          color: var(--secondary-text-color);
          padding-left: 2px;
        }
        & input {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        & input {
          padding: var(--awc-e-s2) var(--awc-e-s3);
          border: 1px solid transparent;
          background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
          color: var(--primary-text-color);
          border-radius: var(--awc-e-r-ctrl);
          font-size: var(--awc-e-f-body);
          transition: border-color var(--awc-e-t);
          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
        }
      }
      .compact-field.invalid input {
        border-color: var(--error-color);
      }
      .compact-field-hint {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        padding-left: 2px;
        line-height: 1.3;
      }
      .compact-field-hint.error {
        color: var(--error-color);
      }
      /* ── Toggle groups ── */
      .toggle-group {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        margin: var(--awc-e-s2) 0;
      }
      .toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--awc-e-s3);
        padding: 10px var(--awc-e-s2) 10px var(--awc-e-s3);
        cursor: pointer;
        box-sizing: border-box;
        & + .toggle-row {
          border-top: 1px solid
            color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
        }
        & > span {
          font-size: var(--awc-e-f-body);
          color: var(--primary-text-color);
        }
        & ha-switch {
          flex-shrink: 0;
          margin: 0;
          padding: 0;
          --ha-switch-background-color: color-mix(in srgb, var(--primary-text-color, #212121) 12%, transparent);
          --ha-switch-thumb-background-color: color-mix(in srgb, var(--primary-text-color, #212121) 60%, transparent);
          /* A visible edge when off, also on themes with dark panels. */
          --ha-switch-border-color: color-mix(
            in srgb,
            var(--primary-text-color, #212121) 45%,
            transparent
          );
          --ha-switch-thumb-border-color: transparent;
          --ha-switch-checked-border-color: transparent;
          --ha-switch-checked-thumb-border-color: transparent;
          --ha-switch-checked-background-color: var(--primary-color);
          --ha-switch-checked-thumb-background-color: var(
            --text-primary-color,
            #fff
          );
          --switch-unchecked-track-color: color-mix(in srgb, var(--primary-text-color, #212121) 12%, transparent);
          --switch-unchecked-button-color: color-mix(in srgb, var(--primary-text-color, #212121) 60%, transparent);
          --switch-checked-track-color: var(--primary-color);
          --switch-checked-button-color: var(--text-primary-color, #fff);
        }
      }
      /* ── Section boxes ── */
      .section-box {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        margin: var(--awc-e-s3) 0 var(--awc-e-s4) 0;
        padding: var(--awc-e-s3) var(--awc-e-s4);
      }
      .section-box.no-pad {
        padding: var(--awc-e-s4);
      }
      .section-box.no-pad > .sensor-list {
        margin-top: 0;
      }
      .section-box .compact-fields {
        margin: 0;
      }
      .fc-box {
        margin: var(--awc-e-s3) 0;
        padding: var(--awc-e-s3) var(--awc-e-s4);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.08);
        border: 1px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.18);
        border-radius: var(--awc-e-r-box);
      }
      .fc-box ha-form {
        margin-top: var(--awc-e-s2);
      }
      /* ── Icon combo & weather icon ── */
      .icon-combo {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
        & ha-icon-picker {
          flex: 1;
          min-width: 0;
        }
        & .icon-weather-btn {
          flex-shrink: 0;
          padding: var(--awc-e-s2) var(--awc-e-s3);
          border: 0;
          border-radius: var(--awc-e-r-ctrl);
          font-size: var(--awc-e-f-meta);
          cursor: pointer;
          transition:
            background var(--awc-e-t),
            color var(--awc-e-t);
          &.active {
            background: var(--primary-color);
            color: var(--text-primary-color, white);
          }
          &:not(.active) {
            background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
            color: var(--primary-text-color);
          }
          &:hover:not(.active) {
            background: color-mix(in srgb, var(--primary-text-color, #212121) 16%, transparent);
          }
        }
      }
      .weather-icon-active {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.07);
        border: 1px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.18);
        border-radius: var(--awc-e-r-ctrl);
      }
      .weather-icon-active-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1px;
        & span:first-child {
          font-size: var(--awc-e-f-label);
          font-weight: 500;
          color: var(--primary-text-color);
        }
      }
      .weather-icon-active-sub {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
      }
      .weather-icon-active .icon-weather-btn {
        flex-shrink: 0;
        padding: var(--awc-e-s1) var(--awc-e-s2);
        border: 0;
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-meta);
        cursor: pointer;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
        color: var(--primary-text-color);
        transition: background var(--awc-e-t);
        &:hover {
          background: color-mix(in srgb, var(--primary-text-color, #212121) 16%, transparent);
        }
      }
      /* ── Chip type picker ── */
      .chip-type-picker {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--awc-e-s2);
        margin: 0 0 var(--awc-e-s3) 0;
      }
      .chip-type-btn {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 1.5px solid color-mix(in srgb, var(--primary-text-color, #212121) 12%, transparent);
        border-radius: var(--awc-e-r-box);
        background: transparent;
        color: var(--primary-text-color);
        text-align: left;
        cursor: pointer;
        transition:
          border-color var(--awc-e-t),
          background var(--awc-e-t);
        &:hover {
          border-color: var(--primary-color);
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.05);
        }
        &.active {
          border-color: var(--primary-color);
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.08);
        }
        & .chip-type-icon {
          --mdc-icon-size: 18px;
          color: var(--secondary-text-color);
          flex-shrink: 0;
        }
        & .chip-type-icon.active-icon {
          color: var(--primary-color);
        }
        & .chip-type-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        & .chip-type-name {
          font-size: var(--awc-e-f-label);
          font-weight: 500;
          line-height: 1.2;
        }
        & .chip-type-desc {
          font-size: var(--awc-e-f-meta);
          color: var(--secondary-text-color);
          line-height: 1.2;
        }
      }
      /* ── Chip header badges ── */
      .chip-badge-row {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
        color: var(--secondary-text-color);
        flex-shrink: 0;
        & ha-icon {
          --mdc-icon-size: 13px;
        }
      }
      .chip-badge-area {
        font-size: 11px;
        font-weight: 700;
        &.a1 {
          background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
          color: var(--primary-color, #03a9f4);
        }
        &.a2 {
          background: color-mix(in srgb, var(--warning-color, #ff9800) 22%, transparent);
          color: var(--warning-color, #ff9800);
        }
      }
      .chip-badge-free {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        background: var(--primary-color, rgba(76, 140, 110, 0.85));
        color: #fff;
        flex-shrink: 0;
        & ha-icon {
          --mdc-icon-size: 13px;
        }
      }
      /* ── Position grid + align ── */
      .chips-pos-align-row {
        display: flex;
        gap: var(--awc-e-s3);
        align-items: flex-start;
      }
      /* ── CSS value fields ── */
      .css-field-row {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        gap: var(--awc-e-s2);
        margin-top: var(--awc-e-s2);
      }
      .css-field-row.cols-2 {
        grid-template-columns: 1fr 1fr;
      }
      .css-field {
        display: flex;
        flex-direction: column;
        gap: 3px;
        & .css-field-label {
          font-size: var(--awc-e-f-meta);
          color: var(--secondary-text-color);
          font-weight: 500;
          padding-left: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        & input {
          width: 100%;
          box-sizing: border-box;
          height: 36px;
          padding: 0 10px;
          border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 18%, transparent);
          background: var(--awc-e-field-fill);
          color: var(--primary-text-color);
          border-radius: var(--awc-e-r-ctrl);
          font-size: var(--awc-e-f-body);
          font-family: inherit;
          transition: border-color var(--awc-e-t);
          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
          &::placeholder {
            color: var(--secondary-text-color);
            opacity: 0.7;
          }
        }
      }
      /* ── Section headings ── */
      .settings-group {
        margin-top: 16px;
      }
      .settings-group:first-child {
        margin-top: 0;
      }
      .settings-group-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        margin-bottom: var(--awc-e-s2);
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
      }
      .section-title {
        font-size: var(--awc-e-f-label);
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: var(--awc-e-s2);
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
      }
      .field-group {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent);
        border-radius: var(--awc-e-r-box);
        padding: var(--awc-e-s3);
        margin-top: var(--awc-e-s2);
      }
      .field-group > .toggle-group:first-child {
        margin-top: 0;
      }
      .field-group > .toggle-group:last-child {
        margin-bottom: 0;
      }
      .field-group-label {
        font-size: var(--awc-e-f-meta);
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-bottom: var(--awc-e-s2);
      }
      /* ── Chip accordions ── */
      .chip-accordion {
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        margin-top: var(--awc-e-s2);
        background: var(--secondary-background-color);
      }
      .chip-accordion + .chip-accordion {
        margin-top: var(--awc-e-s1);
      }
      .chip-accordion-head {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        cursor: pointer;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 3%, transparent);
        user-select: none;
        -webkit-user-select: none;
        & .chip-accordion-title {
          flex: 1;
          font-size: var(--awc-e-f-label);
          font-weight: 500;
          color: var(--primary-text-color);
        }
        & .chip-accordion-icon {
          --mdc-icon-size: 15px;
          color: var(--secondary-text-color);
          flex-shrink: 0;
        }
        & ha-icon.chevron {
          --mdc-icon-size: 16px;
          color: var(--secondary-text-color);
          transition: transform var(--awc-e-t);
          flex-shrink: 0;
        }
        &.open ha-icon.chevron {
          transform: rotate(90deg);
        }
        &:hover {
          background: color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
        }
      }
      .chip-accordion-body {
        padding: var(--awc-e-s3);
        border-top: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
      }
      .chip-accordion-body > .settings-group:first-child {
        margin-top: 0;
      }
      .chip-accordion-body .settings-group + .settings-group {
        margin-top: var(--awc-e-s3);
      }
      /* ── Chip nudge strips ── */
      .chip-nudge {
        display: flex;
        align-items: flex-start;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        margin: var(--awc-e-s1) 0;
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        line-height: 1.5;
        & code {
          background: color-mix(in srgb, var(--primary-text-color, #212121) 8%, transparent);
          padding: 0 4px;
          border-radius: 3px;
        }
      }
      .chip-nudge.warning {
        background: rgba(var(--rgb-warning-color, 255, 152, 0), 0.1);
        border: 1px solid rgba(var(--rgb-warning-color, 255, 152, 0), 0.25);
      }
      .chip-nudge.info {
        background: color-mix(in srgb, var(--primary-text-color, #212121) 4%, transparent);
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
      }
      /* ── Values a layout brings ── */
      .from-layout,
      .from-layout-area {
        opacity: 0.55;
        transition: opacity 0.15s;
      }
      .from-layout:hover,
      .from-layout-area:hover,
      .from-layout:focus-within {
        opacity: 0.9;
      }
      /* ── Chip visibility ── */
      .vis-status {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        margin: var(--awc-e-s2) 0;
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        --mdc-icon-size: 18px;
        &.on {
          color: var(--success-color, #43a047);
        }
        &.off {
          color: var(--secondary-text-color);
        }
      }
      .vis-cond {
        margin: var(--awc-e-s2) 0;
        padding: var(--awc-e-s2) var(--awc-e-s3) var(--awc-e-s3);
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
        border-radius: var(--awc-e-r-ctrl);
        background: color-mix(in srgb, var(--primary-text-color, #212121) 3%, transparent);
      }
      .vis-cond-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: var(--awc-e-f-meta);
        font-weight: 600;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: var(--awc-e-s1);
        & .clear-btn {
          display: inline-flex;
          border: 0;
          background: none;
          padding: 4px;
          border-radius: 50%;
          cursor: pointer;
          color: var(--secondary-text-color);
          --mdc-icon-size: 18px;
          &:hover {
            color: var(--error-color);
          }
        }
      }
      /* ── Chip color picker ── */
      .chip-color-box {
        margin-top: var(--awc-e-s2);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
        border-radius: var(--awc-e-r-ctrl);
        background: color-mix(in srgb, var(--primary-text-color, #212121) 3%, transparent);
      }
      .chip-color-row {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
      }
      .chip-color-label {
        flex: 1;
        font-size: var(--awc-e-f-label);
        color: var(--primary-text-color);
      }
      .chip-color-swatch {
        width: 36px;
        height: 28px;
        border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 18%, transparent);
        border-radius: var(--awc-e-r-inline);
        padding: 1px 2px;
        background: none;
        cursor: pointer;
        flex-shrink: 0;
      }
      .chip-color-clear {
        width: 24px;
        height: 24px;
        border: 0;
        border-radius: 50%;
        padding: 0;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 8%, transparent);
        color: var(--secondary-text-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background var(--awc-e-t);
        &:hover {
          background: rgba(var(--rgb-error-color, 211, 47, 47), 0.15);
          color: var(--error-color);
        }
      }
      .chip-color-opacity-row {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        margin-top: var(--awc-e-s2);
      }
      .chip-color-opacity-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      .chip-color-opacity {
        flex: 1;
        height: 4px;
        accent-color: var(--primary-color);
        cursor: pointer;
      }
      .chip-color-opacity-val {
        font-size: 11px;
        color: var(--secondary-text-color);
        width: 32px;
        text-align: right;
        flex-shrink: 0;
      }
      /* ── Sliders ── */
      .awc-slider {
        display: flex;
        flex-direction: column;
        gap: var(--awc-e-s1);
        padding: var(--awc-e-s3);
        background: color-mix(in srgb, var(--primary-text-color, #212121) 5%, transparent);
        border-radius: var(--awc-e-r-box);
      }
      .awc-slider-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--awc-e-s2);
        margin-bottom: var(--awc-e-s1);
      }
      .awc-slider-label {
        font-size: var(--awc-e-f-label);
        color: var(--primary-text-color);
        font-weight: 400;
        flex: 1;
      }
      .awc-slider-num {
        width: 48px;
        flex-shrink: 0;
        text-align: right;
        border: none;
        background: none;
        color: var(--primary-color);
        font-size: var(--awc-e-f-label);
        font-weight: 600;
        font-family: inherit;
        padding: 0;
        outline: none;
        -moz-appearance: textfield;
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
      .awc-slider-range {
        width: 100%;
        height: 4px;
        accent-color: var(--primary-color);
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        display: block;
        background: linear-gradient(
          to right,
          var(--primary-color) 0%,
          var(--primary-color) var(--awc-slider-pct, 50%),
          color-mix(in srgb, var(--primary-text-color, #212121) 18%, transparent)
            var(--awc-slider-pct, 50%)
        );
        border-radius: 2px;
        border: none;
        outline: none;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        }
        &::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        }
      }
      .awc-slider-helper {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        margin-top: var(--awc-e-s1);
        line-height: 1.4;
      }
      /* ── Free chip positioning ── */
      .free-pos-layout {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--awc-e-s3);
        align-items: start;
      }
      .offset-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--awc-e-s2);
      }
      .offset-field {
        display: flex;
        flex-direction: column;
        gap: 3px;
        & .offset-field-label {
          font-size: 11px;
          color: var(--secondary-text-color);
          font-weight: 500;
          padding-left: 2px;
        }
        & input {
          width: 100%;
          box-sizing: border-box;
          height: 36px;
          padding: 0 10px;
          border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 18%, transparent);
          background: var(--awc-e-field-fill);
          color: var(--primary-text-color);
          border-radius: var(--awc-e-r-ctrl);
          font-size: var(--awc-e-f-body);
          font-family: inherit;
          &:focus {
            outline: none;
            border-color: var(--primary-color);
          }
          &::placeholder {
            color: var(--secondary-text-color);
            opacity: 0.7;
          }
        }
      }
      .free-mode-box {
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.05);
        border: 1px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.14);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
      }
      .free-mode-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--awc-e-s2) var(--awc-e-s3);
      }
      .free-mode-label {
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
      }
      .free-pos-subpanel {
        padding: 0 var(--awc-e-s3) var(--awc-e-s3);
      }
      .free-pos-subpanel::before {
        content: "";
        display: block;
        height: 10px;
      }
      .anchor-grid {
        display: grid;
        grid-template-columns: repeat(3, 30px);
        grid-template-rows: repeat(3, 30px);
        gap: 4px;
      }
      .anchor-cell {
        width: 30px;
        height: 30px;
        border: 1.5px solid color-mix(in srgb, var(--primary-text-color, #212121) 15%, transparent);
        border-radius: var(--awc-e-r-ctrl);
        background: transparent;
        cursor: pointer;
        transition:
          border-color var(--awc-e-t),
          background var(--awc-e-t);
        &:hover:not(.active) {
          border-color: var(--primary-color);
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.07);
        }
        &.active {
          border-color: var(--primary-color);
          background: var(--primary-color);
        }
      }
      .clearable-field {
        position: relative;
        & ha-form {
          padding-right: 0;
        }
        & .clear-btn {
          position: absolute;
          top: 8px;
          right: 4px;
          width: 24px;
          height: 24px;
          padding: 0;
          margin: 0;
          border: none;
          background: transparent;
          color: var(--secondary-text-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          opacity: 0.6;
          transition:
            opacity var(--awc-e-t),
            color var(--awc-e-t);
          z-index: 1;
          &:hover {
            opacity: 1;
            color: var(--error-color);
          }
          & ha-icon {
            --mdc-icon-size: 16px;
          }
        }
      }
      /* ── Forecast special box ── */
      .chip-forecast-box {
        border: 1px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.18);
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        margin-top: var(--awc-e-s3);
      }
      .chip-forecast-header {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s1);
        padding: var(--awc-e-s1) var(--awc-e-s3) 0;
        font-size: 11px;
        font-weight: 600;
        color: var(--primary-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .chip-forecast-header ha-icon {
        --mdc-icon-size: 13px;
      }
      .chip-forecast-body {
        padding: var(--awc-e-s2) var(--awc-e-s3) var(--awc-e-s3);
      }
      .chip-forecast-body > * + * {
        margin-top: var(--awc-e-s2);
      }
      /* ── Ring threshold rows ── */
      .ring-threshold-row {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        padding: var(--awc-e-s2) 0;
        & + .ring-threshold-row {
          border-top: 1px solid
            color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
          padding-top: var(--awc-e-s2);
        }
      }
      .ring-threshold-row .chip-color-swatch {
        width: 28px;
        height: 22px;
        flex-shrink: 0;
      }
      .ring-threshold-row input[type="text"] {
        flex: 1;
        min-width: 0;
        height: 30px;
        padding: 0 8px;
        border: 1px solid transparent;
        background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent);
        color: var(--primary-text-color);
        border-radius: var(--awc-e-r-ctrl);
        font-size: var(--awc-e-f-body);
        font-family: inherit;
        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }
      .ring-threshold-row .threshold-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      .ring-threshold-del {
        width: 22px;
        height: 22px;
        border: 0;
        border-radius: 50%;
        padding: 0;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition:
          background var(--awc-e-t),
          color var(--awc-e-t);
        &:hover {
          background: rgba(var(--rgb-error-color, 211, 47, 47), 0.12);
          color: var(--error-color);
        }
      }
      .ring-threshold-add {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--awc-e-s2);
        width: 100%;
        padding: var(--awc-e-s2);
        margin-top: var(--awc-e-s2);
        border: 1.5px solid rgba(var(--rgb-primary-color, 0, 120, 212), 0.4);
        border-radius: var(--awc-e-r-ctrl);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.06);
        color: var(--primary-color);
        font-size: var(--awc-e-f-label);
        font-weight: 500;
        cursor: pointer;
        transition:
          background var(--awc-e-t),
          border-color var(--awc-e-t);
        &:hover {
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.12);
          border-color: var(--primary-color);
        }
        & ha-icon {
          --mdc-icon-size: 16px;
        }
      }
      /* ── Panel titles with a subtitle ── */
      .panel-title {
        display: flex;
        flex-direction: column;
        min-width: 0;
        line-height: 1.25;
      }
      .panel-sub {
        font-size: var(--awc-e-f-meta);
        font-weight: 400;
        color: var(--secondary-text-color);
      }
      /* ── Sections inside a panel ── */
      details.section {
        border-radius: var(--awc-e-r-box);
        & + details.section {
          margin-top: 2px;
        }
        & > summary {
          display: flex;
          align-items: center;
          gap: var(--awc-e-s3);
          padding: var(--awc-e-s2);
          border-radius: var(--awc-e-r-box);
          cursor: pointer;
          list-style: none;
          user-select: none;
          &::-webkit-details-marker {
            display: none;
          }
          &:hover {
            background: var(--awc-e-field-fill);
          }
        }
        & > summary .chevron {
          margin-left: auto;
          flex-shrink: 0;
          --mdc-icon-size: 20px;
          color: var(--secondary-text-color);
          transition: transform var(--awc-e-t);
        }
        &[open] {
          background: var(--awc-e-field-fill);
          & > summary .chevron {
            transform: rotate(180deg);
          }
        }
      }
      .section-icon,
      .layout-art {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border-radius: var(--awc-e-r-ctrl);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.12);
        color: var(--primary-color);
      }
      .section-icon {
        width: 36px;
        height: 36px;
        & ha-icon {
          --mdc-icon-size: 20px;
        }
      }
      .section-text,
      .layout-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
        line-height: 1.3;
        text-align: start;
      }
      .section-name,
      .layout-name {
        font-size: var(--awc-e-f-body);
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .section-sub,
      .layout-desc {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
      }
      .section-body {
        padding: var(--awc-e-s1) var(--awc-e-s3) var(--awc-e-s3);
        & > * + * {
          margin-top: var(--awc-e-s2);
        }
        & > .help-row:first-child {
          margin-top: 0;
        }
        & .editor-group:first-child {
          margin-top: 0;
          padding-top: 0;
          border-top: 0;
        }
      }
      /* ── Layout tiles ── */
      .layout-tiles {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-top: var(--awc-e-s2);
      }
      .layout-tile {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s3);
        width: 100%;
        padding: var(--awc-e-s2);
        border: 1px solid transparent;
        border-radius: var(--awc-e-r-box);
        background: none;
        color: inherit;
        font: inherit;
        cursor: pointer;
        &:hover {
          background: var(--awc-e-field-fill);
        }
        &.active {
          border-color: var(--primary-color);
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.08);
        }
      }
      .layout-art {
        width: 56px;
        height: 42px;
        & svg {
          width: 44px;
          height: 33px;
          fill: currentColor;
        }
        & .lt-card {
          fill: currentColor;
          fill-opacity: 0.14;
          stroke: currentColor;
          stroke-opacity: 0.5;
          stroke-width: 1;
        }
        & .lt-dashed {
          fill-opacity: 0;
          stroke-dasharray: 3 2;
        }
        & .lt-sun {
          fill: #f5b000;
        }
      }
      .layout-tiles + .tip-box {
        margin-bottom: var(--awc-e-s2);
      }
      .layout-check {
        margin-left: auto;
        flex-shrink: 0;
        --mdc-icon-size: 20px;
        color: var(--primary-color);
      }
      /* ── Help ── */
      .help-row {
        display: flex;
        justify-content: flex-end;
        margin: 0 0 var(--awc-e-s2);
      }
      .help-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: 0;
        background: none;
        color: var(--primary-color);
        font-size: var(--awc-e-f-meta);
        cursor: pointer;
        padding: 2px 4px;
        border-radius: var(--awc-e-r-inline);
        & ha-icon {
          --mdc-icon-size: 16px;
        }
        &.active,
        &:hover {
          background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.1);
        }
      }
      .help-box {
        margin: 0 0 var(--awc-e-s3);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        border-left: 3px solid var(--primary-color);
        border-radius: var(--awc-e-r-inline);
        background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.08);
        font-size: var(--awc-e-f-label);
        line-height: 1.5;
        color: var(--primary-text-color);
        & a {
          color: var(--primary-color);
        }
      }
      /* ── Groups inside a panel ── */
      .editor-group {
        margin-top: var(--awc-e-s4);
        padding-top: var(--awc-e-s3);
        border-top: 1px solid var(--divider-color);
      }
      .editor-group-title {
        font-size: var(--awc-e-f-meta);
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        margin-bottom: var(--awc-e-s2);
      }
      .toggle-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .toggle-helper {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        line-height: 1.35;
        margin-top: 2px;
      }
      .indent {
        margin: 0 0 var(--awc-e-s2) var(--awc-e-s3);
        padding-left: var(--awc-e-s3);
        border-left: 2px solid var(--divider-color);
      }
      .sub-box {
        background: var(--secondary-background-color);
        border-radius: var(--awc-e-r-box);
        padding: 0 var(--awc-e-s3) var(--awc-e-s2);
        margin-bottom: var(--awc-e-s2);
      }
      .sub-box-head {
        padding-left: 0;
        padding-right: 0;
        & > span {
          display: inline-flex;
          align-items: center;
          gap: var(--awc-e-s2);
          font-weight: 500;
        }
        & ha-icon {
          --mdc-icon-size: 18px;
          color: var(--secondary-text-color);
        }
      }
      /* ── Image ── */
      .image-thumbs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--awc-e-s2);
      }
      .image-thumb {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .image-thumb-pic {
        height: 72px;
        border-radius: var(--awc-e-r-ctrl);
        border: 1px dashed var(--divider-color);
        display: grid;
        place-items: center;
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        background: center / contain no-repeat
          color-mix(in srgb, var(--primary-text-color, #212121) 4%, transparent);
        margin-bottom: var(--awc-e-s1);
        &.has {
          border-style: solid;
        }
      }
      .image-thumb-label {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        margin-top: 2px;
      }
      .image-place {
        display: flex;
        gap: var(--awc-e-s3);
        align-items: stretch;
        flex-wrap: wrap;
        & .grid-picker {
          margin: 0;
        }
      }
      .image-preview {
        position: relative;
        flex: 1;
        min-width: 160px;
        min-height: 96px;
        border-radius: var(--awc-e-r-box);
        overflow: hidden;
        background: linear-gradient(#5b9fd6, #a9d2ef);
      }
      .image-preview-img {
        position: absolute;
        aspect-ratio: 1;
        background: center / contain no-repeat;
        &.v-top {
          top: 6%;
        }
        &.v-middle {
          top: 50%;
          transform: translateY(-50%);
        }
        &.v-bottom {
          bottom: 0;
        }
        &.h-left {
          left: 4%;
        }
        &.h-center {
          left: 50%;
          translate: -50% 0;
        }
        &.h-right {
          right: 4%;
        }
      }
      .rule-thumb {
        flex: none;
        width: 36px;
        height: 28px;
        border-radius: 6px;
        border: 1px dashed var(--divider-color);
        background: center / contain no-repeat
          color-mix(in srgb, var(--primary-text-color, #212121) 4%, transparent);
        &.has {
          border-style: solid;
        }
      }
      .rule-images {
        margin-top: var(--awc-e-s3);
      }
      .status-sentence {
        font-size: var(--awc-e-f-body);
        line-height: 1.5;
        margin-bottom: var(--awc-e-s2);
      }
      /* ── Chips ── */
      .chip-area-top {
        display: flex;
        gap: var(--awc-e-s3);
        flex-wrap: wrap;
        align-items: flex-start;
        & .grid-picker {
          margin: 0;
        }
      }
      .chip-area-layout {
        flex: 1;
        min-width: 180px;
      }
      .layout-picker {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--awc-e-s1);
        & button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: var(--awc-e-s2) 2px;
          border: 1px solid var(--divider-color);
          border-radius: var(--awc-e-r-ctrl);
          background: none;
          color: var(--primary-text-color);
          font-size: var(--awc-e-f-meta);
          cursor: pointer;
          &.active {
            border-color: var(--primary-color);
            background: rgba(var(--rgb-primary-color, 0, 120, 212), 0.1);
          }
        }
        & svg {
          width: 44px;
          height: 24px;
          fill: currentColor;
          opacity: 0.7;
        }
      }
      .quick-add {
        display: flex;
        flex-wrap: wrap;
        gap: var(--awc-e-s1);
        align-items: center;
        margin-top: var(--awc-e-s2);
      }
      .quick-add-label {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        margin-right: 2px;
      }
      .quick-add-btn {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        border: 1px solid var(--divider-color);
        border-radius: 999px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: var(--awc-e-f-meta);
        padding: 4px 10px 4px 6px;
        cursor: pointer;
        & ha-icon {
          --mdc-icon-size: 14px;
          color: var(--primary-color);
        }
        &:hover {
          border-color: var(--primary-color);
        }
      }
      .chip-tabs {
        /* All tabs stay in sight: on a narrow editor they wrap to a second
           line instead of scrolling behind the edge. */
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
        border-bottom: 1px solid var(--divider-color);
        margin-bottom: var(--awc-e-s3);
      }
      .chip-tab {
        flex-shrink: 0;
        border: 0;
        border-bottom: 2px solid transparent;
        background: none;
        color: var(--secondary-text-color);
        font-size: var(--awc-e-f-label);
        padding: var(--awc-e-s2) var(--awc-e-s3);
        cursor: pointer;
        &.active {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }
      }
      .card-row-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
        flex: 1;
      }
      .card-row-sub {
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tip-box {
        display: flex;
        align-items: center;
        gap: var(--awc-e-s2);
        margin-top: var(--awc-e-s3);
        font-size: var(--awc-e-f-meta);
        color: var(--secondary-text-color);
        & ha-icon {
          --mdc-icon-size: 16px;
          flex-shrink: 0;
        }
        & a {
          color: var(--primary-color);
        }
      }
      .card-picker-box {
        margin-top: var(--awc-e-s2);
        max-height: 520px;
        overflow: auto;
        border: 1px solid var(--divider-color);
        border-radius: var(--awc-e-r-box);
        padding: var(--awc-e-s2);
      }
    `;
  }
  setConfig(config) {
    config = migrateConfig(config);
    const c = { ...config };
    this._normalizeConfigTypes(c);
    let autofilled = false;
    if (!c.weather_entity && this.hass && this.hass.states) {
      const firstWeather = Object.keys(this.hass.states).find((id) =>
        id.startsWith("weather."),
      );
      if (firstWeather) {
        c.weather_entity = firstWeather;
        autofilled = true;
      }
    }
    if (
      !c.sun_entity &&
      this.hass &&
      this.hass.states &&
      this.hass.states["sun.sun"]
    ) {
      c.sun_entity = "sun.sun";
      autofilled = true;
    }
    const cleaned = this._cleanConfig(c);
    // A change from outside (YAML, undo in Home Assistant) ends a layout step.
    if (this._layoutSwitch && configKey(cleaned) !== configKey(this._config)) this._layoutSwitch = null;
    this._config = cleaned;
    if (c.card_color_mode === "light") this._colorModeState = "force_light";
    else if (c.card_color_mode === "dark") this._colorModeState = "force_dark";
    else if (c.theme_entity) this._colorModeState = "entity";
    else this._colorModeState = "ha_theme";
    if (autofilled) Promise.resolve().then(() => this._emit());
  }
  get _formData() {
    if (
      this._cachedFormData &&
      this._cachedFormConfig === this._config &&
      this._cachedFormColorMode === this._colorModeState
    ) {
      return this._cachedFormData;
    }
    // What the card shows: defaults, then the layout's values, then your own.
    const c = { ...CONFIG_DEFAULTS, ...this._layoutValues(), ...(this._config || {}) };
    c._color_mode =
      this._colorModeState ||
      (c.card_color_mode === "light"
        ? "force_light"
        : c.card_color_mode === "dark"
          ? "force_dark"
          : c.theme_entity
            ? "entity"
            : "ha_theme");
    this._cachedFormData = c;
    this._cachedFormConfig = this._config;
    this._cachedFormColorMode = this._colorModeState;
    return c;
  }
  // The values the chosen layout brings (without its chips), for showing them.
  _layoutValues() {
    const cfg = this._config || {};
    if (this._layoutValuesFor === cfg) return this._layoutValuesCache;
    const values = layoutLook(cfg);
    this._layoutValuesFor = cfg;
    this._layoutValuesCache = values;
    return values;
  }
  // True while a field shows the layout's value, not one of your own.
  _fromLayout(field) {
    return (
      !!field &&
      Object.prototype.hasOwnProperty.call(this._layoutValues(), field) &&
      !Object.prototype.hasOwnProperty.call(this._config || {}, field)
    );
  }
  _colorModeSchema() {
    const c = this._formData,
      showThemeEntity = c._color_mode === "entity";
    return [
      {
        name: "_color_mode",
        selector: { select: { mode: "dropdown", options: OPT.color_mode } },
      },
      ...(showThemeEntity
        ? [{ name: "theme_entity", selector: { entity: {} } }]
        : []),
    ];
  }
  _renderToggleGroup(toggles) {
    return html`<div class="toggle-group">
      ${toggles.map(
        (tg) =>
          html`<label class="toggle-row">
            <span>${t(tg.label)}</span>
            <ha-switch
              data-key=${tg.key}
              .checked=${this._formData[tg.key] === true}
              @change=${this._onToggleGroupChange}
            ></ha-switch
          ></label> `,
      )}
    </div>`;
  }
  _onToggleGroupChange(e) {
    const key = e.target && e.target.dataset && e.target.dataset.key;
    if (!key) return;
    this._updateField(key, e.target.checked === true);
  }
  _getChips() {
    const chips = (this._config || {}).chips;
    if (!Array.isArray(chips) || chips.length === 0) return [];
    if (chips.every((s) => s && typeof s === "object")) return chips;
    return chips.map((s) => (s && typeof s === "object" ? s : {}));
  }
  // A copy: Home Assistant freezes the config it hands to the editor.
  _getCustomCards() {
    const cards = this._config && this._config.custom_cards;
    return Array.isArray(cards) ? [...cards] : [];
  }
  // A copy: Home Assistant freezes the config it hands to the editor.
  _getImageConditions() {
    const list = this._config && this._config.image_conditions;
    return Array.isArray(list)
      ? list.map((r) => (r && typeof r === "object" ? { ...r } : {}))
      : [];
  }
  _imageRuleStates(rule) {
    const v = rule.state;
    if (v === undefined || v === null || v === "") return [];
    return (Array.isArray(v) ? v : [v]).map((x) => String(x));
  }
  // Choices for the state field: the usual states of the entity's domain plus
  // its current state; any other value can be typed in.
  _imageRuleStateOptions(rule) {
    const id = String(rule.entity || "");
    const st = this.hass && this.hass.states && this.hass.states[id];
    const domain = id.split(".")[0];
    const byDomain = {
      weather: ["sunny", "clear-night", "partlycloudy", "cloudy", "fog", "rainy", "pouring", "lightning", "lightning-rainy", "snowy", "snowy-rainy", "hail", "windy", "windy-variant", "exceptional"],
      binary_sensor: ["on", "off"], input_boolean: ["on", "off"], switch: ["on", "off"], light: ["on", "off"], fan: ["on", "off"],
      cover: ["open", "closed", "opening", "closing"], lock: ["locked", "unlocked"],
      person: ["home", "not_home"], device_tracker: ["home", "not_home"], sun: ["above_horizon", "below_horizon"],
    };
    let values = rule.attribute ? [] : [...(byDomain[domain] || [])];
    if (!rule.attribute && st && Array.isArray(st.attributes && st.attributes.options))
      values = [...st.attributes.options];
    const current = st
      ? rule.attribute
        ? st.attributes && st.attributes[rule.attribute]
        : st.state
      : undefined;
    if (current !== undefined && current !== null && !["unavailable", "unknown"].includes(String(current)))
      values.push(String(current));
    for (const v of this._imageRuleStates(rule)) values.push(v);
    const label = (v) => {
      if (rule.attribute || !st || !this.hass.formatEntityState) return v;
      try {
        return this.hass.formatEntityState(st, v) || v;
      } catch (e) {
        return v;
      }
    };
    return [...new Set(values)].map((v) => ({ value: v, label: label(v) }));
  }
  _imageRuleSchema(rule) {
    return [
      { name: "entity", selector: { entity: {} } },
      ...(rule.entity
        ? [
            { name: "attribute", selector: { attribute: {} }, context: { filter_entity: "entity" } },
            {
              name: "state",
              selector: {
                select: { multiple: true, custom_value: true, mode: "dropdown", options: this._imageRuleStateOptions(rule) },
              },
            },
          ]
        : []),
    ];
  }
  static _imageRuleImageSchema = [
    {
      type: "grid",
      name: "",
      schema: [
        { name: "image_day", selector: { text: {} } },
        { name: "image_night", selector: { text: {} } },
      ],
    },
  ];
  _imageRuleLabel = (schema) =>
    schema && schema.name
      ? t(
          {
            entity: "Entity",
            attribute: "Attribute (optional)",
            state: "States",
            image_day: "Day image",
            image_night: "Night image",
          }[schema.name] || schema.name,
        )
      : "";
  _imageRuleHelper = (schema) =>
    schema && schema.name === "state"
      ? t("Leave empty to show the image while the entity is on, open, home, unlocked or active.")
      : schema && schema.name === "attribute"
        ? t("Compares this attribute instead of the state.")
        : undefined;
  _renderImageConditions() {
    const list = this._getImageConditions();
    return html`${list.length === 0
        ? html`<div class="cards-empty">${t("No images by state yet.")}</div>`
        : ""}
      ${list.map((rule, idx) => this._renderImageRuleRow(rule, idx, list.length))}
      <button type="button" class="add-card-btn" @click=${this._addImageRule}>
        <ha-icon icon="mdi:plus"></ha-icon>
        <span>${t("Add image")}</span>
      </button>`;
  }
  _renderImageRuleRow(rule, idx, total) {
    const st = rule.entity && this.hass && this.hass.states[rule.entity];
    const name =
      (st && st.attributes && st.attributes.friendly_name) || rule.entity || t("New image");
    const states = this._imageRuleStates(rule);
    const labels = this._imageRuleStateOptions(rule);
    const shown = states.map((v) => (labels.find((o) => o.value === v) || { label: v }).label);
    const subtitle = rule.entity
      ? (rule.attribute ? rule.attribute + ": " : "") +
        (shown.length ? shown.join(", ") : t("on, open, home or active"))
      : t("Pick an entity");
    const pic = rule.image_day || rule.image_night;
    const badge = html`<span
      class="rule-thumb ${pic ? "has" : ""}"
      style=${pic ? `background-image:url("${cssUrl(pic)}")` : ""}
    ></span>`;
    const data = { ...rule, state: states };
    const preview = (field) =>
      html`<div class="image-thumb-pic ${rule[field] ? "has" : ""}"
        style=${rule[field] ? `background-image:url("${cssUrl(rule[field])}")` : ""}
      >${rule[field] ? "" : t("No image")}</div>`;
    const body = html`<ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._imageRuleSchema(rule)}
        .computeLabel=${this._imageRuleLabel}
        .computeHelper=${this._imageRuleHelper}
        @value-changed=${(e) => this._onImageRuleChanged(idx, e)}
      ></ha-form>
      <div class="image-thumbs rule-images">${preview("image_day")} ${preview("image_night")}</div>
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this.constructor._imageRuleImageSchema}
        .computeLabel=${this._imageRuleLabel}
        @value-changed=${(e) => this._onImageRuleChanged(idx, e)}
      ></ha-form>`;
    return this._renderListRow({
      idx,
      total,
      expanded: this._expandedImageRule === idx,
      title: name,
      subtitle,
      badge,
      body,
      onToggle: () => (this._expandedImageRule = this._expandedImageRule === idx ? null : idx),
      onMoveUp: () => this._moveImageRule(idx, -1),
      onMoveDown: () => this._moveImageRule(idx, 1),
      onRemove: () => this._removeImageRule(idx),
    });
  }
  _onImageRuleChanged(idx, e) {
    e.stopPropagation();
    const list = this._getImageConditions();
    const old = list[idx] || {};
    // Two forms edit one entry: each sends only its own fields.
    const v = { ...old, state: this._imageRuleStates(old), ...((e.detail && e.detail.value) || {}) };
    const rule = {};
    const text = (x) => (typeof x === "string" ? x.trim() : "");
    if (text(v.entity)) rule.entity = text(v.entity);
    // Another entity: its attribute and states no longer fit.
    const sameEntity = rule.entity === old.entity;
    if (sameEntity && text(v.attribute)) rule.attribute = text(v.attribute);
    const states = sameEntity
      ? [].concat(v.state ?? []).map((x) => String(x).trim()).filter(Boolean)
      : [];
    if (states.length === 1) rule.state = states[0];
    else if (states.length > 1) rule.state = [...new Set(states)];
    for (const k of ["image_day", "image_night"]) if (text(v[k])) rule[k] = text(v[k]);
    list[idx] = rule;
    this._updateField("image_conditions", list);
  }
  _addImageRule() {
    const list = this._getImageConditions();
    list.push({});
    this._expandedImageRule = list.length - 1;
    this._updateField("image_conditions", list);
  }
  _moveImageRule(idx, delta) {
    const list = this._getImageConditions();
    const target = idx + delta;
    if (target < 0 || target >= list.length) return;
    [list[idx], list[target]] = [list[target], list[idx]];
    if (this._expandedImageRule === idx) this._expandedImageRule = target;
    else if (this._expandedImageRule === target) this._expandedImageRule = idx;
    this._updateField("image_conditions", list);
  }
  _removeImageRule(idx) {
    const list = this._getImageConditions();
    list.splice(idx, 1);
    this._expandedImageRule = null;
    this._updateField("image_conditions", list.length ? list : undefined);
  }
  _imageStatusSchema() {
    const c = this._formData,
      hasStatus = !!c.status_entity;
    return [
      { name: "status_entity", selector: { entity: {} } },
      ...(hasStatus
        ? [
            {
              type: "grid",
              name: "",
              schema: [
                { name: "status_day", selector: { text: {} } },
                { name: "status_night", selector: { text: {} } },
              ],
            },
          ]
        : []),
    ];
  }
  _computeLabel = (schema) => {
    if (!schema || !schema.name) return "";
    return t(LABELS[schema.name] || schema.name);
  };
  _computeHelper = (schema) => {
    if (!schema || !schema.name) return undefined;
    const own = HELPERS[schema.name] ? t(HELPERS[schema.name]) : undefined;
    if (!this._fromLayout(schema.name)) return own;
    const note = t("From the layout. Pick a value to set your own.");
    return own ? `${note} ${own}` : note;
  };
  _isValidCardHeight(value) {
    if (value === null || value === undefined) return true;
    const raw = String(value).trim();
    if (!raw) return true;
    if (raw.toLowerCase() === "auto") return true;
    if (/^-?\d+(?:\.\d+)?$/.test(raw)) return true;
    return /^-?\d+(?:\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/i.test(
      raw,
    );
  }
  _normalizeCardHeight(value) {
    if (value === null || value === undefined) return value;
    const raw = String(value).trim();
    if (!raw) return "";
    if (raw.toLowerCase() === "auto") return "auto";
    if (/^-?\d+(?:\.\d+)?$/.test(raw)) {
      const n = Number(raw);
      return Number.isFinite(n) ? n : "";
    }
    if (
      /^-?\d+(?:\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/i.test(
        raw,
      )
    )
      return raw;
    return this._config && this._config.card_height
      ? this._config.card_height
      : "";
  }
  _normalizeCssSizeValue(value) {
    if (value === null || value === undefined) return value;
    if (typeof value === "number" && Number.isFinite(value))
      return `${value}px`;
    const raw = String(value).trim();
    if (!raw) return "";
    const m = raw.match(/^-?\d+(?:\.\d+)?/);
    if (m) return `${m[0]}px`;
    return "";
  }
  _coerceNumberLike(value) {
    if (typeof value !== "string") return value;
    const raw = value.trim();
    if (!/^-?\d+(?:\.\d+)?$/.test(raw)) return value;
    const n = Number(raw);
    return Number.isFinite(n) ? n : value;
  }
  _coerceBooleanLike(value) {
    if (typeof value === "boolean") return value;
    if (typeof value !== "string") return value;
    const raw = value.trim().toLowerCase();
    if (raw === "true") return true;
    if (raw === "false") return false;
    return value;
  }
  _normalizeChipTypes(chip) {
    if (!chip || typeof chip !== "object" || Array.isArray(chip)) return chip;
    const out = { ...chip };
    for (const key of CHIP_NUMBER_FIELDS) {
      if (key in out) out[key] = this._coerceNumberLike(out[key]);
    }
    for (const key of CHIP_CSS_SIZE_FIELDS) {
      if (key in out) out[key] = this._normalizeCssSizeValue(out[key]);
    }
    for (const key of CHIP_BOOLEAN_FIELDS) {
      if (key in out) out[key] = this._coerceBooleanLike(out[key]);
    }
    for (const tKey of ["ring_thresholds", "bar_thresholds"]) {
      if (!Array.isArray(out[tKey])) continue;
      out[tKey] = out[tKey].map((t) => {
        if (!t || typeof t !== "object" || Array.isArray(t)) return t;
        const n = { ...t };
        if ("value" in n) n.value = this._coerceNumberLike(n.value);
        return n;
      });
    }
    return out;
  }
  _normalizeConfigTypes(obj) {
    if (!obj || typeof obj !== "object") return obj;
    for (const key of TOP_LEVEL_NUMBER_FIELDS) {
      if (key in obj) obj[key] = this._coerceNumberLike(obj[key]);
    }
    for (const key of TOP_LEVEL_BOOLEAN_FIELDS) {
      if (key in obj) obj[key] = this._coerceBooleanLike(obj[key]);
    }
    if ("card_height" in obj)
      obj.card_height = this._normalizeCardHeight(obj.card_height);
    if (Array.isArray(obj.chips))
      obj.chips = obj.chips.map((chip) => this._normalizeChipTypes(chip));
    return obj;
  }
  _valueChanged(ev) {
    ev.stopPropagation();
    if (!this._config) return;
    const prev = this._config;
    const incoming = { ...((ev.detail && ev.detail.value) || {}) };
    const strip = [];
    if (Object.prototype.hasOwnProperty.call(incoming, "card_height")) {
      this._cardHeightError = this._isValidCardHeight(incoming.card_height)
        ? ""
        : t("Invalid height. Use auto, 160, 160px, 40vh, or 80%.");
      incoming.card_height = this._normalizeCardHeight(incoming.card_height);
    }
    if (incoming._color_mode !== undefined) {
      this._colorModeState = incoming._color_mode;
      switch (incoming._color_mode) {
        case "ha_theme":
          strip.push("theme_entity", "card_color_mode");
          break;
        case "entity":
          strip.push("card_color_mode");
          if (!incoming.theme_entity) {
            incoming.theme_entity =
              incoming.sun_entity ||
              (this.hass && this.hass.states && this.hass.states["sun.sun"]
                ? "sun.sun"
                : "");
          }
          break;
        case "force_light":
          strip.push("theme_entity");
          incoming.card_color_mode = "light";
          break;
        case "force_dark":
          strip.push("theme_entity");
          incoming.card_color_mode = "dark";
          break;
      }
    }
    delete incoming._color_mode;
    // A form sends all its shown values back; the layout's stay unsaved
    // until you change them.
    const layout = this._layoutValues();
    for (const [k, v] of Object.entries(layout))
      if (!Object.prototype.hasOwnProperty.call(prev, k) && incoming[k] === v) delete incoming[k];
    if (incoming.status_entity && !prev.status_entity) {
      if (!incoming.status_day && incoming.image_day)
        incoming.status_day = incoming.image_day;
      if (!incoming.status_night && incoming.image_night)
        incoming.status_night = incoming.image_night;
    }
    if (incoming.card_square === true && prev.card_square !== true)
      strip.push("card_height");
    this._patch(incoming, { replace: true, strip });
  }
  _patch(changes, opts) {
    const options = opts || {};
    const base = options.replace ? {} : { ...(this._config || {}) };
    const next = { ...base, ...changes };
    if (Array.isArray(options.strip)) {
      for (const k of options.strip) delete next[k];
    }
    // Any change outside a layout step ends that step: its Undo would
    // otherwise take this change back too.
    if (!options.layoutStep) this._layoutSwitch = null;
    this._config = this._cleanConfig(next);
    this._emit();
  }
  _computeInactiveKeys(c) {
    const out = new Set();
    if (c.card_color_mode === "light" || c.card_color_mode === "dark")
      out.add("theme_entity");
    const chipLayout = c.chip_area_layout || "wrap";
    if (chipLayout !== "grid") out.add("chip_area_columns");
    if (!c.forecast_curve || c.forecast_curve === "off") out.add("forecast_curve_height");
    if (chipLayout !== "horizontal-scroll" && chipLayout !== "vertical-scroll")
      out.add("chip_area_scroll_count");
    const isScroll =
      chipLayout === "horizontal-scroll" || chipLayout === "vertical-scroll";
    if (!isScroll) {
      out.add("chip_area_height");
      out.add("chip_area_full_width");
    }
    if (!c.chip_area_grouped) out.add("chip_area_separator");
    if (!c.wind_compass || c.wind_compass === "off") {
      out.add("wind_compass_position");
      out.add("wind_compass_cardinal");
      out.add("wind_compass_degrees");
      out.add("wind_compass_speed");
    }
    if (!c.wind_compass || c.wind_compass === "off" || c.wind_compass === "pill")
      out.add("wind_compass_background");
    if (c.wind_style !== "leaves") out.add("leaf_density");
    if (!c.card_layout || !Array.isArray(c.chips) || c.chips.length === 0) out.add("layout_chips");
    return out;
  }
  _cleanConfig(config) {
    const out = { ...config };
    this._normalizeConfigTypes(out);
    for (const key of Object.keys(out)) {
      const v = out[key];
      if (v === "" || v === null || v === undefined) {
        delete out[key];
        continue;
      }
      if (Array.isArray(v) && v.length === 0) {
        delete out[key];
        continue;
      }
      if (
        typeof v === "object" &&
        !Array.isArray(v) &&
        Object.keys(v).length === 0
      )
        delete out[key];
    }
    // A value equal to the default goes, because the card falls back to the
    // default anyway. Not where the layout brings another value: there the
    // default is your choice against the layout (wind_compass: off in Home),
    // and without it the layout's value would come back.
    const look = layoutLook(out);
    for (const [k, defVal] of Object.entries(CONFIG_DEFAULTS)) {
      const layoutDiffers = Object.prototype.hasOwnProperty.call(look, k) && look[k] !== defVal;
      if (out[k] === defVal && !layoutDiffers) delete out[k];
    }
    // Settings without effect go, judged by what the card shows: the
    // layout's values under your own.
    const inactive = this._computeInactiveKeys({ ...look, ...out });
    for (const k of inactive) delete out[k];
    delete out._color_mode;
    const ordered = {};
    for (const k of KEY_ORDER) {
      if (k === "custom_cards") continue;
      if (k in out) ordered[k] = out[k];
    }
    for (const k of Object.keys(out)) {
      if (k === "custom_cards") continue;
      if (!(k in ordered)) ordered[k] = out[k];
    }
    if ("custom_cards" in out) ordered.custom_cards = out.custom_cards;
    return ordered;
  }
  _emit() {
    const config = { ...(this._config || {}) };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }
  _renderForm(schema) {
    if (!schema || schema.length === 0) return "";
    return html`<ha-form
      .hass=${this.hass}
      .data=${this._formData}
      .schema=${schema}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }
  _renderClearableText(name) {
    const val = (this._formData || {})[name];
    return html`<div class="clearable-field">
      ${this._renderForm([{ name, selector: { text: {} } }])}
      ${val
        ? html`<button
            type="button"
            class="clear-btn"
            title=${t("Clear")}
            data-field=${name}
            @click=${this._onClearFieldClick}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>`
        : ""}
    </div>`;
  }
  _onClearFieldClick(e) {
    const field = this._ds(e, "field");
    if (!field) return;
    this._updateField(field, "");
  }
  _ds(e, key) {
    return e.currentTarget && e.currentTarget.dataset
      ? e.currentTarget.dataset[key]
      : "";
  }
  _renderDisclosure(label, content) {
    const isAdvanced = label === "Advanced options";
    return html`<details class="disclosure" @toggle=${this._onDisclosureToggle}>
      <summary>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        ${isAdvanced ? html`<ha-icon icon="mdi:cog-outline"></ha-icon>` : ""}
        <span>${t(label)}</span>
      </summary>
      <div class="disclosure-body">${content}</div>
    </details>`;
  }
  _onDisclosureToggle(e) {
    const el = e.currentTarget;
    if (!el.open) return;
    const parent = el.parentElement;
    if (!parent) return;
    parent
      .querySelectorAll(":scope > details.disclosure[open]")
      .forEach((d) => {
        if (d !== el) d.open = false;
      });
  }
  _renderPositionGrid(field, gridDef) {
    const prepared = PREPARED_POSITION_GRIDS[field];
    const { valueMap, reverseMap, cellsFlat: cells, disabledSet } = prepared;
    const stored = this._formData[field] || "",
      value = reverseMap[stored] || stored,
      helper = HELPERS[field] ? t(HELPERS[field]) : "",
      labelText = t(LABELS[field] || field);
    return html`<div class="grid-picker">
      <div class="grid-picker-label">${labelText}</div>
      <div class="grid-3x3" role="radiogroup" aria-label=${labelText}>
        ${cells.map((val) => {
          if (val === null) return html`<div class="grid-cell empty"></div>`;
          const isDisabled = disabledSet.has(val);
          const mappedValue = valueMap[val] || val;
          return html`<button
            type="button"
            role="radio"
            class="grid-cell ${value === val ? "active" : ""} ${isDisabled
              ? "disabled"
              : ""}"
            ?disabled=${isDisabled}
            data-field=${field}
            data-value=${mappedValue}
            title=${isDisabled ? t("{value} (not supported here)", { value: val }) : val}
            aria-label=${val}
            @click=${this._onPositionGridSelect}
          ></button>`;
        })}
      </div>
      ${gridDef.extras
        ? html`<div class="grid-extras">
            ${gridDef.extras.map(
              (ex) =>
                html`<button
                  type="button"
                  class="grid-extra ${value === ex.value ? "active" : ""}"
                  aria-pressed=${value === ex.value ? "true" : "false"}
                  data-field=${field}
                  data-value=${ex.value}
                  @click=${this._onPositionGridSelect}
                >
                  ${t(ex.label)}
                </button>`,
            )}
          </div>`
        : ""}
      ${helper ? html`<div class="grid-helper">${helper}</div>` : ""}
    </div>`;
  }
  _onPositionGridSelect(e) {
    const target = e.currentTarget;
    if (!target || target.disabled) return;
    const field = target.dataset && target.dataset.field;
    const value = target.dataset && target.dataset.value;
    if (!field || value === undefined) return;
    this._setField(field, value);
  }
  _setField(field, value) {
    const current = this._config || {};
    if (current[field] === value) {
      this._patch({}, { strip: [field] });
      return;
    }
    this._patch({ [field]: value });
  }
  _updateField(field, value) {
    if (field === "card_height") {
      this._cardHeightError = this._isValidCardHeight(value)
        ? ""
        : t("Invalid height. Use auto, 160, 160px, 40vh, or 80%.");
      value = this._normalizeCardHeight(value);
    }
    const isEmpty = value === null || value === undefined || value === "";
    if (isEmpty) {
      this._patch({}, { strip: [field] });
      return;
    }
    this._patch({ [field]: value });
  }
  _setCardStyle(value) {
    if (value === "standalone") {
      this._patch(
        { card_style: value },
        {
          strip: [
            "card_full_width",
            "card_mask_vertical",
            "card_mask_horizontal",
          ],
        },
      );
      return;
    }
    this._patch({ card_style: value });
  }
  _onPanelToggle(id, expanded) {
    if (expanded) this._openPanel = id;
    else if (this._openPanel === id) this._openPanel = null;
  }
  _onPanelExpandedChanged(e) {
    const panel = this._ds(e, "panel");
    if (!panel) return;
    this._onPanelToggle(panel, !!(e.detail && e.detail.expanded));
  }
  _onTrimmedFieldChange(e) {
    const field = this._ds(e, "field");
    if (!field) return;
    this._updateField(field, (e.target.value || "").trim());
  }
  _onRawFieldChange(e) {
    const field = this._ds(e, "field");
    if (!field) return;
    this._updateField(field, e.target.value || "");
  }
  _onOffsetPartChange(e) {
    const indexRaw = this._ds(e, "offsetIndex");
    const index = Number(indexRaw);
    if (!Number.isInteger(index)) return;
    this._setOffsetPart(index, e.target.value);
  }
  _onSegmentedFieldSelect(e) {
    const field = this._ds(e, "field");
    if (!field) return;
    const value = this._ds(e, "value");
    const valueType = this._ds(e, "valueType") || "string";
    if (valueType === "number") {
      const n = Number(value);
      if (!Number.isFinite(n)) return;
      this._updateField(field, n);
      return;
    }
    if (valueType === "boolean") {
      this._updateField(field, value === "true");
      return;
    }
    if (field === "card_layout") {
      this._pickLayout(valueType === "empty" ? "" : value);
      return;
    }
    if (valueType === "empty") {
      this._updateField(field, "");
      return;
    }
    this._updateField(field, value);
  }
  // Picking a layout is one step you can take back as a whole. It drops your
  // own values for the settings the layout brings, so it looks as intended
  // (an old image_scale: 0 would hide the house), and with chips of your own
  // it asks what to do with them. Undo puts back the card exactly as it was
  // before the pick: layout, values and chips. Any other change ends the step.
  _pickLayout(value) {
    const prev = this._config || {};
    const to = String(value || "").trim().toLowerCase();
    if (to === String(prev.card_layout || "").trim().toLowerCase()) return;
    const base = layoutDefaults(to, prev.weather_entity || "", prev.sun_entity || "sun.sun");
    const keys = base
      ? [...new Set([...Object.keys(base), ...LAYOUT_LOOK_KEYS])].filter(
          (k) => k !== "chips" && Object.prototype.hasOwnProperty.call(prev, k),
        )
      : [];
    // Another tile right after the first: Undo still goes back to the start.
    const open = this._layoutSwitch;
    const before = open ? open.before : cloneConfig(prev);
    const reset = (open ? open.reset : 0) + keys.length;
    // A second pick starts again from your own chips.
    const ownBefore = open && Array.isArray(open.before.chips) && open.before.chips.length ? open.before.chips : null;
    const chips = ownBefore ? { chips: cloneConfig(ownBefore) } : {};
    const restoreLayoutChips = open && open.before.layout_chips === true;
    this._layoutSwitch = {
      layout: to,
      before,
      reset,
      ask: to && Array.isArray(before.chips) && before.chips.length ? "keep" : null,
      chips: null,
    };
    this._patch(
      { card_layout: to, ...chips, ...(restoreLayoutChips ? { layout_chips: true } : {}) },
      {
        strip: [...(to ? keys : ["card_layout"]), ...(open && !restoreLayoutChips ? ["layout_chips"] : [])],
        layoutStep: true,
      },
    );
  }
  // Undo: the card as it was before the layout was picked.
  _undoLayoutSwitch() {
    const step = this._layoutSwitch;
    if (!step) return;
    this._layoutSwitch = null;
    this._patch(cloneConfig(step.before), { replace: true });
  }
  // "Keep your chips?" No: the layout's chips replace yours.
  _dropOwnChips() {
    const step = this._layoutSwitch;
    if (!step) return;
    this._layoutSwitch = { ...step, ask: null, chips: "layout" };
    this._patch({}, { strip: ["chips", "layout_chips"], layoutStep: true });
  }
  _keepOwnChips() {
    const step = this._layoutSwitch;
    if (step) this._layoutSwitch = { ...step, ask: "arrange" };
  }
  _keepChipPositions() {
    const step = this._layoutSwitch;
    if (step) this._layoutSwitch = { ...step, ask: null, chips: "kept" };
  }
  // "Arrange them?" Yes: your chips join the layout's chips and take the look
  // of its chip row. A chip that shows what a layout chip already shows goes.
  _arrangeOwnChips() {
    const step = this._layoutSwitch;
    const c = this._config || {};
    const base = layoutDefaults(
      String(c.card_layout || "").trim().toLowerCase(),
      c.weather_entity || "",
      c.sun_entity || "sun.sun",
    );
    if (!step || !base) return;
    this._layoutSwitch = { ...step, ask: null, chips: "arranged" };
    const chips = arrangeChipsForLayout(this._getChips(), base.chips || []);
    this._patch(chips.length ? { chips, layout_chips: true } : {}, {
      strip: chips.length ? [] : ["chips", "layout_chips"],
      layoutStep: true,
    });
  }
  // Change: your own chips back as they were, and the question again. Outside
  // a layout step it starts one, so Undo has a card to go back to.
  _askAboutChips() {
    const c = this._config || {};
    const layout = String(c.card_layout || "");
    if (!layout) return;
    const step = this._layoutSwitch;
    if (!step) {
      this._layoutSwitch = { layout, before: cloneConfig(c), reset: 0, ask: "keep", chips: null };
      return;
    }
    const own = step.before;
    const ownChips = Array.isArray(own.chips) && own.chips.length ? cloneConfig(own.chips) : null;
    this._layoutSwitch = { ...step, ask: ownChips ? "keep" : null, chips: null };
    this._patch(
      { ...(ownChips ? { chips: ownChips } : {}), ...(own.layout_chips === true ? { layout_chips: true } : {}) },
      {
        strip: [...(ownChips ? [] : ["chips"]), ...(own.layout_chips === true ? [] : ["layout_chips"])],
        layoutStep: true,
      },
    );
  }
  _onChipAreaBackgroundModeSelect(e) {
    const mode = this._ds(e, "bgMode");
    if (!mode) return;
    if (mode === "off") {
      this._updateField("chip_area_background", false);
      return;
    }
    this._updateField("chip_area_background", true);
    this._updateField("card_background_style", mode);
  }
  _renderCardStyleSegmented() {
    const c = this._formData,
      isSquare = c.card_square === true,
      current = c.card_style || "standalone";
    const opts = [
      { value: "immersive", label: "Immersive" },
      { value: "standalone", label: "Standalone" },
    ];
    return html`<div class="grid-picker">
      <div class="segmented" role="radiogroup" aria-label=${t(LABELS.card_style)}>
        ${opts.map(
          (o) =>
            html`<button
              type="button"
              role="radio"
              data-value=${o.value}
              class=${current === o.value ? "active" : ""}
              @click=${this._onCardStyleSelect}
            >
              ${t(o.label)}
            </button>`,
        )}
      </div>
      <div class="composite-helper">
        ${current === "immersive"
          ? t("The card uses no background at all.")
          : t("Background color based on the weather.")}
      </div>
      <div class="compact-fields">
        ${isSquare
          ? ""
          : this._renderCompactField("card_height", "e.g. 220 or auto")}
        ${this._renderCompactField("card_padding", "e.g. 16px")}
      </div>
      ${current === "standalone"
        ? html`<div class="toggle-group">${this._renderSwitch("effect_text_scrim", true)}</div>`
        : ""}
    </div>`;
  }
  _onCardStyleSelect(e) {
    const value = this._ds(e, "value");
    if (!value) return;
    this._setCardStyle(value);
  }
  _renderCelestialOffsetPicker() {
    return html`<div class="composite">
      <div class="composite-label">${t("Offset from edge")}</div>
      ${this._renderOffsetXYRow(
        "celestial_x",
        "celestial_y",
        (field, val) =>
          html`<input
            type="text"
            class="composite-number"
            placeholder="0"
            style="flex:1;min-width:0"
            data-field=${field}
            .value=${String(val || "")}
            @change=${this._onTrimmedFieldChange}
          />`,
      )}
    </div>`;
  }
  _renderOffsetXYRow(xField, yField, renderInput) {
    const c = this._formData;
    return html`<div class="composite-row" style="flex-wrap:nowrap">
      <span class="composite-unit">X</span>
      ${renderInput(xField, c[xField])}
      <span class="composite-unit">Y</span>
      ${renderInput(yField, c[yField])}
    </div>`;
  }
  _parseOffset(raw) {
    if (!raw || typeof raw !== "string") return [0, 0, 0, 0];
    const parts = raw
      .trim()
      .split(/\s+/)
      .map((p) => parseInt(p, 10) || 0);
    switch (parts.length) {
      case 0:
        return [0, 0, 0, 0];
      case 1:
        return [parts[0], parts[0], parts[0], parts[0]];
      case 2:
        return [parts[0], parts[1], parts[0], parts[1]];
      case 3:
        return [parts[0], parts[1], parts[2], parts[1]];
      default:
        return [parts[0], parts[1], parts[2], parts[3]];
    }
  }
  _serializeOffset(arr) {
    if (arr.every((v) => v === 0)) return "";
    return arr.map((v) => `${v}px`).join(" ");
  }
  _setOffsetPart(index, rawValue) {
    const parts = this._parseOffset(this._formData.card_offset);
    parts[index] = parseInt(rawValue, 10) || 0;
    this._updateField("card_offset", this._serializeOffset(parts));
  }
  _renderImageOffsetPicker() {
    const c = this._formData;
    if (!c.image_day && !c.image_night) return "";
    return html`<div class="composite">
      <div class="composite-label">${t("Image Offset")}</div>
      ${this._renderOffsetXYRow(
        "image_x",
        "image_y",
        (field, val) =>
          html`<input
            type="text"
            class="composite-number"
            placeholder="0"
            style="flex:1;min-width:0"
            data-field=${field}
            .value=${String(val || "")}
            @change=${this._onTrimmedFieldChange}
          />`,
      )}
      <div class="composite-helper">
        ${t("Fine-tune image position. Pixels or CSS values, e.g. -20 or 10%.")}
      </div>
    </div>`;
  }
  _renderOffsetPicker() {
    const parts = this._parseOffset(this._formData.card_offset),
      edges = ["Top", "Right", "Bottom", "Left"].map((e) => t(e));
    return html`<div class="composite">
      <div class="composite-label">${t(LABELS.card_offset)}</div>
      <div class="composite-grid-4">
        ${edges.map(
          (label, i) =>
            html`<label>
              <span>${label}</span>
              <input
                type="number"
                step="1"
                data-offset-index=${String(i)}
                .value=${String(parts[i])}
                @change=${this._onOffsetPartChange}
            /></label>`,
        )}
      </div>
      ${HELPERS.card_offset
        ? html`<div class="composite-helper">${HELPERS.card_offset}</div>`
        : ""}
    </div>`;
  }
  _renderCustomCardsEditor() {
    const cards = this._getCustomCards();
    if (this._openPanel === "cards" && this._cardEditorsReady === undefined)
      this._loadCardEditors();
    const picker =
      this._cardPickerOpen && this._cardEditorsReady
        ? html`<div class="card-picker-box">
            <hui-card-picker
              .hass=${this.hass}
              .lovelace=${this._lovelace()}
              @config-changed=${this._onCardPicked}
            ></hui-card-picker>
          </div>`
        : "";
    return html`${cards.length === 0
        ? html`<div class="cards-empty">${t("No cards yet.")}</div>`
        : cards.map((card, idx) =>
            this._renderCardRow(card, idx, cards.length),
          )}
      <button type="button" class="add-card-btn" @click=${this._addBlankCard}>
        <ha-icon icon=${this._cardPickerOpen ? "mdi:close" : "mdi:plus"}></ha-icon>
        <span>${this._cardPickerOpen ? t("Cancel") : t("Add card")}</span>
      </button>
      ${picker}`;
  }
  // Home Assistant loads its card editors on demand. Creating a stack card
  // editor pulls in hui-card-picker and hui-card-element-editor.
  async _loadCardEditors() {
    if (this._cardEditorsLoading) return this._cardEditorsLoading;
    this._cardEditorsLoading = (async () => {
      try {
        if (!customElements.get("hui-card-element-editor")) {
          const helpers =
            typeof window.loadCardHelpers === "function"
              ? await window.loadCardHelpers()
              : null;
          const stack =
            helpers &&
            (await helpers.createCardElement({
              type: "vertical-stack",
              cards: [],
            }));
          const ctor = stack && stack.constructor;
          if (ctor && typeof ctor.getConfigElement === "function")
            await ctor.getConfigElement();
        }
        return (
          !!customElements.get("hui-card-element-editor") &&
          !!customElements.get("hui-card-picker")
        );
      } catch (e) {
        return false;
      }
    })();
    this._cardEditorsReady = await this._cardEditorsLoading;
    this.requestUpdate();
    return this._cardEditorsReady;
  }
  // The card picker needs the dashboard config. Home Assistant does not hand
  // it to card editors, so take it from the dashboard view (hui-root).
  _lovelace() {
    if (this.lovelace) return this.lovelace;
    if (this._foundLovelace) return this._foundLovelace;
    const find = (root, depth) => {
      if (!root || depth > 12) return null;
      for (const el of root.querySelectorAll("*")) {
        if (el.localName === "hui-root") return el;
        if (el.shadowRoot) {
          const hit = find(el.shadowRoot, depth + 1);
          if (hit) return hit;
        }
      }
      return null;
    };
    const root = typeof document !== "undefined" ? find(document, 0) : null;
    // The picker wants the dashboard config (with views), not the Lovelace object.
    const config = root && root.lovelace && root.lovelace.config;
    if (config) {
      this._foundLovelace = config;
      return config;
    }
    return { views: [] };
  }
  _onCardPicked(e) {
    e.stopPropagation();
    const config = e.detail && e.detail.config;
    if (!config || typeof config !== "object") return;
    const cards = [...this._getCustomCards(), config];
    this._cardPickerOpen = false;
    this._expandedCard = cards.length - 1;
    this._updateField("custom_cards", cards);
  }
  _renderListRow({
    idx,
    total,
    expanded,
    title,
    subtitle,
    badge,
    onToggle,
    onMoveUp,
    onMoveDown,
    onRemove,
    onDuplicate,
    body,
  }) {
    return html`<div class="card-row ${expanded ? "expanded" : ""}">
      <div class="card-row-head" @click=${onToggle}>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        ${badge ? badge : ""}
        <span class="card-row-text"
          ><span class="card-row-title">${title}</span>${subtitle
            ? html`<span class="card-row-sub">${subtitle}</span>`
            : ""}</span
        >
        <div class="card-row-actions" @click=${this._onStopPropagation}>
          <button
            type="button"
            title=${t("Move up")}
            ?disabled=${idx === 0}
            @click=${onMoveUp}
          >
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button
            type="button"
            title=${t("Move down")}
            ?disabled=${idx === total - 1}
            @click=${onMoveDown}
          >
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          ${onDuplicate
            ? html`<button
                type="button"
                title=${t("Duplicate")}
                @click=${onDuplicate}
              >
                <ha-icon icon="mdi:content-copy"></ha-icon>
              </button>`
            : ""}
          <button type="button" title=${t("Delete")} @click=${onRemove}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
      </div>
      ${expanded ? html`<div class="card-row-body">${body}</div>` : ""}
    </div>`;
  }
  _onStopPropagation(e) {
    e.stopPropagation();
  }
  _onCustomCardSizeChange(e) {
    const idx = Number(this._ds(e, "cardIdx") || NaN);
    const key = this._ds(e, "cardKey");
    if (this._badIdx(idx) || !key) return;
    const cards = this._getCustomCards();
    const card = cards[idx] && typeof cards[idx] === "object" ? cards[idx] : {};
    const next = { ...card };
    const v = (e.target.value || "").trim();
    if (v) next[key] = v;
    else delete next[key];
    this._updateCardAt(idx, next);
  }
  _onCustomCardFormValueChanged(e) {
    e.stopPropagation();
    const idx = Number(this._ds(e, "cardIdx") || NaN);
    if (this._badIdx(idx)) return;
    this._updateCardAt(
      idx,
      (e.detail && e.detail.value && e.detail.value._card) || {},
    );
  }
  // The card config without our own size keys, for Home Assistant's editor.
  _innerCard(card) {
    const cache = this._innerCardCache || (this._innerCardCache = new WeakMap());
    if (cache.has(card)) return cache.get(card);
    const inner = { ...card };
    delete inner.custom_width;
    delete inner.custom_height;
    cache.set(card, inner);
    return inner;
  }
  _onCustomCardEditorChanged(e) {
    e.stopPropagation();
    const idx = Number(this._ds(e, "cardIdx") || NaN);
    const config = e.detail && e.detail.config;
    if (this._badIdx(idx) || !config || typeof config !== "object") return;
    const prev = this._getCustomCards()[idx] || {};
    const next = { ...config };
    if (prev.custom_width) next.custom_width = prev.custom_width;
    if (prev.custom_height) next.custom_height = prev.custom_height;
    this._updateCardAt(idx, next);
  }
  _renderCardRow(card, idx, total) {
    const expanded = this._expandedCard === idx;
    const title =
      card && card.type ? String(card.type).replace(/^custom:/, "") : "card";
    const body = html`<div class="card-size-row">
        <div class="offset-field">
          <span class="offset-field-label">${t("Width")}</span>
          <input
            type="text"
            placeholder=${t("e.g. 140px or 60%")}
            data-card-idx=${String(idx)}
            data-card-key="custom_width"
            .value=${card.custom_width || ""}
            @change=${this._onCustomCardSizeChange}
          />
        </div>
        <div class="offset-field">
          <span class="offset-field-label">${t("Height")}</span>
          <input
            type="text"
            placeholder=${t("e.g. 110px")}
            data-card-idx=${String(idx)}
            data-card-key="custom_height"
            .value=${card.custom_height || ""}
            @change=${this._onCustomCardSizeChange}
          />
        </div>
      </div>
      ${this._cardEditorsReady
        ? html`<hui-card-element-editor
            .hass=${this.hass}
            .lovelace=${this._lovelace()}
            .value=${this._innerCard(card)}
            data-card-idx=${String(idx)}
            @config-changed=${this._onCustomCardEditorChanged}
          ></hui-card-element-editor>`
        : html`<ha-form
            .hass=${this.hass}
            .data=${{ _card: card }}
            .schema=${[{ name: "_card", selector: { object: {} } }]}
            data-card-idx=${String(idx)}
            .computeLabel=${() => ""}
            @value-changed=${this._onCustomCardFormValueChanged}
          ></ha-form>`}`;
    return this._renderListRow({
      idx,
      total,
      expanded,
      title,
      body,
      onToggle: () => this._toggleCardExpanded(idx),
      onMoveUp: () => this._moveCard(idx, -1),
      onMoveDown: () => this._moveCard(idx, 1),
      onRemove: () => this._removeCard(idx),
    });
  }
  _toggleCardExpanded(idx) {
    this._expandedCard = this._expandedCard === idx ? null : idx;
  }
  _moveCard(idx, delta) {
    const cards = this._getCustomCards();
    const target = idx + delta;
    if (target < 0 || target >= cards.length) return;
    [cards[idx], cards[target]] = [cards[target], cards[idx]];
    if (this._expandedCard === idx) this._expandedCard = target;
    else if (this._expandedCard === target) this._expandedCard = idx;
    this._updateField("custom_cards", cards);
  }
  _removeCard(idx) {
    const cards = this._getCustomCards();
    cards.splice(idx, 1);
    if (this._expandedCard === idx) this._expandedCard = null;
    else if (
      typeof this._expandedCard === "number" &&
      this._expandedCard > idx
    ) {
      this._expandedCard = this._expandedCard - 1;
    }
    this._updateField("custom_cards", cards);
  }
  _updateCardAt(idx, newCard) {
    const cards = this._getCustomCards();
    cards[idx] = newCard;
    this._updateField("custom_cards", cards);
  }
  _addBlankCard = () => {
    if (this._cardEditorsReady) {
      this._cardPickerOpen = !this._cardPickerOpen;
      this._foundLovelace = null;
      this.requestUpdate();
      return;
    }
    const cards = [
      ...this._getCustomCards(),
      { type: "entity", entity: "", custom_width: "100%" },
    ];
    this._expandedCard = cards.length - 1;
    this._updateField("custom_cards", cards);
  };
  _chipTitle(chip) {
    const name = ((chip && chip.name) || "").toString().trim(),
      entity = ((chip && chip.entity) || "").toString().trim();
    const attribute = ((chip && chip.attribute) || "").toString().trim();
    if (!entity)
      return name ? `${name} — ${t("(no entity)")}` : t("(choose an entity)");
    const st = this.hass && this.hass.states && this.hass.states[entity],
      friendly = st && st.attributes && st.attributes.friendly_name;
    const label = friendly || entity;
    if (chip.forecast) {
      const type = chip.forecast === "hourly" ? t("Hourly") : t("Daily"),
        offset = parseInt(chip.forecast_offset, 10) || 0;
      const offsetLabel =
        chip.forecast === "hourly"
          ? offset === 0
            ? t("now")
            : `+${offset}h`
          : offset === 0
            ? t("today")
            : offset === 1
              ? t("tomorrow")
              : `+${offset}d`;
      const attrLabel = attribute || "condition";
      const base = `${label} · ${type} ${offsetLabel} [${attrLabel}]`;
      return name ? `${name} — ${base}` : base;
    }
    const withAttr = attribute ? `${label} [${attribute}]` : label;
    return name ? `${name} — ${withAttr}` : withAttr;
  }
  // The live value shown under the chip title in the list.
  _chipValuePreview(chip) {
    if (!chip || !chip.entity) return "";
    if (chip.forecast) return t("Forecast");
    const st = this.hass && this.hass.states && this.hass.states[chip.entity];
    if (!st) return t("Entity not found");
    if (chip.attribute) {
      const v = st.attributes ? st.attributes[chip.attribute] : undefined;
      return v === undefined || v === null || typeof v === "object"
        ? ""
        : String(v);
    }
    const unit = (st.attributes && st.attributes.unit_of_measurement) || "";
    return unit ? `${st.state} ${unit}` : String(st.state);
  }
  _cleanChip(chip) {
    const out = { ...chip };
    if (!out.entity) {
      delete out.attribute;
      delete out.forecast;
      delete out.forecast_offset;
    }
    if (!out.forecast) {
      delete out.forecast_offset;
      delete out.forecast_precision;
    }
    if (out.forecast_offset === 0) delete out.forecast_offset;
    // Only the second area is written; a freely placed chip sits in none.
    if (Number(out.area) !== 2 || String(out.position || "").toLowerCase() === "custom") delete out.area;
    // Degrees is the default. Drop the format when the chip no longer shows a
    // wind direction, but keep it while a sensor's state is not loaded yet.
    const bearingKnown =
      !!out.attribute ||
      !out.entity ||
      !!(this.hass && this.hass.states && this.hass.states[out.entity]);
    if (
      out.bearing_format === "degrees" ||
      (bearingKnown && !isBearingChip(out, this.hass))
    )
      delete out.bearing_format;
    if (bearingKnown && !isBearingChip(out, this.hass)) {
      delete out.bearing_icon;
      delete out.bearing_speed;
    }
    // The speed comes from the weather entity next to wind_bearing.
    if (out.attribute !== "wind_bearing") delete out.bearing_speed;
    if (!out.sub_value_entity && !out.sub_value_attribute) {
      delete out.sub_value_format;
      delete out.sub_value_position;
      delete out.sub_value_size;
      delete out.sub_value_weight;
      delete out.hide_sub_value;
    }
    if (out.type !== "ring" && out.type !== "bar") {
      delete out.gauge_entity;
      delete out.gauge_attribute;
    }
    if (out.type !== "ring") {
      delete out.ring_min;
      delete out.ring_max;
      delete out.ring_color;
      delete out.ring_width;
      delete out.ring_gap;
      delete out.ring_thresholds;
      delete out.ring_threshold_mode;
    }
    if (out.type !== "bar") {
      delete out.bar_min;
      delete out.bar_max;
      delete out.bar_color;
      delete out.bar_height;
      delete out.bar_gap;
      delete out.bar_thresholds;
      delete out.bar_threshold_mode;
    }
    for (const k of Object.keys(out)) {
      const v = out[k];
      if (k === "unit_format" || k === "ring_min" || k === "bar_min") {
        if (v === null || v === undefined) delete out[k];
        continue;
      }
      if (k === "background" && v === false) continue;
      if (k === "icon_background" && v === false) continue;
      if (v === "" || v === null || v === undefined || v === false)
        delete out[k];
    }
    return out;
  }
  _updateChipAt(idx, newChip) {
    const list = this._getChips().map((c, i) =>
      i === idx ? this._cleanChip(newChip) : c,
    );
    this._commitChips(list);
  }
  _addChip = () => {
    const list = this._getChips();
    const next = [...list, {}];
    this._expandedChip = next.length - 1;
    this._commitChips(next);
  };
  _moveChip(idx, delta) {
    const list = [...this._getChips()],
      target = idx + delta;
    if (target < 0 || target >= list.length) return;
    [list[idx], list[target]] = [list[target], list[idx]];
    if (this._expandedChip === idx) this._expandedChip = target;
    else if (this._expandedChip === target) this._expandedChip = idx;
    this._commitChips(list);
  }
  _removeChip(idx) {
    const list = [...this._getChips()];
    list.splice(idx, 1);
    delete this[`_acc_open_${idx}`];
    delete this[`_text_acc_${idx}`];
    for (let i = idx; i < list.length; i++) {
      this[`_acc_open_${i}`] = this[`_acc_open_${i + 1}`] || null;
      this[`_text_acc_${i}`] = this[`_text_acc_${i + 1}`] || null;
    }
    delete this[`_acc_open_${list.length}`];
    delete this[`_text_acc_${list.length}`];
    if (this._expandedChip === idx) this._expandedChip = null;
    else if (
      typeof this._expandedChip === "number" &&
      this._expandedChip > idx
    ) {
      this._expandedChip = this._expandedChip - 1;
    }
    this._commitChips(list);
  }
  _duplicateChip(idx) {
    const list = [...this._getChips()];
    list.splice(idx + 1, 0, { ...list[idx] });
    this._expandedChip = idx + 1;
    this._commitChips(list);
  }
  _toggleChipExpanded(idx) {
    this._expandedChip = this._expandedChip === idx ? null : idx;
  }
  _getChipByIndex(idx) {
    const i = Number(idx);
    if (this._badIdx(i)) return null;
    const list = this._getChips();
    return list[i] && typeof list[i] === "object" ? list[i] : null;
  }
  _badIdx(n) {
    return !Number.isInteger(n) || n < 0;
  }
  _onChipAccordionToggle(e) {
    const idx = Number(this._ds(e, "chipIdx") || NaN);
    const key = this._ds(e, "accKey");
    const kind = this._ds(e, "accKind") || "main";
    if (this._badIdx(idx) || !key) return;
    const prop = kind === "text" ? `_text_acc_${idx}` : `_acc_open_${idx}`;
    if (kind === "main") this[prop] = key;
    else this[prop] = this[prop] === key ? null : key;
    this.requestUpdate();
  }
  _onChipTypeModeSelect(e) {
    const idx = Number(this._ds(e, "chipIdx") || NaN);
    const mode = this._ds(e, "mode");
    if (this._badIdx(idx) || !mode) return;
    const chip = this._getChipByIndex(idx);
    if (!chip) return;
    if (mode === "sensor") {
      const n = { ...chip };
      delete n.forecast;
      delete n.forecast_offset;
      delete n.forecast_precision;
      this._updateChipAt(idx, n);
      return;
    }
    if (mode === "forecast") {
      const cur = (chip.entity || "").toString().trim();
      const cardWeatherEntity =
        (this._config && this._config.weather_entity) || "";
      const ent =
        cur && cur.startsWith("weather.") ? cur : cardWeatherEntity || cur;
      const n = {
        ...chip,
        forecast: "daily",
        attribute: "temperature",
        forecast_offset: 1,
      };
      if (ent) n.entity = ent;
      this._updateChipAt(idx, n);
    }
  }
  _onChipForecastTypeSelect(e) {
    const idx = Number(this._ds(e, "chipIdx") || NaN);
    const forecast = this._ds(e, "forecastType");
    if (this._badIdx(idx) || !forecast) return;
    const chip = this._getChipByIndex(idx);
    if (!chip) return;
    this._updateChipAt(idx, {
      ...chip,
      forecast,
      forecast_offset: 0,
    });
  }
  _onChipAnchorSelect(e) {
    const idx = Number(this._ds(e, "chipIdx") || NaN);
    const anchor = this._ds(e, "anchor");
    if (this._badIdx(idx) || !anchor) return;
    const chip = this._getChipByIndex(idx);
    if (!chip) return;
    this._updateChipAt(idx, { ...chip, position_anchor: anchor });
  }
  _onChipToggleChange(e) {
    const idx = Number(this._ds(e, "chipIdx") || NaN);
    const key = this._ds(e, "key");
    const mode = this._ds(e, "mode") || TOGGLE_MODE.TRUE_DELETE;
    if (this._badIdx(idx) || !key) return;
    const chip = this._getChipByIndex(idx);
    if (!chip) return;
    const next = { ...chip };
    const checked = e.target && e.target.checked === true;
    if (mode === TOGGLE_MODE.TRUE_DELETE) {
      if (checked) next[key] = true;
      else delete next[key];
    } else if (mode === TOGGLE_MODE.FALSE_DELETE) {
      if (!checked) next[key] = false;
      else delete next[key];
    } else if (mode === TOGGLE_MODE.TRUE_FALSE_IF_DEFINED) {
      if (checked) next[key] = true;
      else {
        if (chip[key] !== undefined) next[key] = false;
        else delete next[key];
      }
    }
    this._updateChipAt(idx, next);
  }
  _onChipActionClick(e) {
    const idx = Number(this._ds(e, "chipIdx") || NaN);
    const action = this._ds(e, "action");
    if (this._badIdx(idx) || !action) return;
    const chip = this._getChipByIndex(idx);
    if (!chip) return;
    const next = { ...chip };
    if (action === "remove-icon") {
      delete next.icon;
    } else if (action === "set-weather-icon") {
      next.icon = "weather";
    } else if (action === "clear-icon-path") {
      delete next.icon_path;
    } else if (action === "reset-styles") {
      for (const k of CHIP_STYLE_OVERRIDE_KEYS) delete next[k];
    } else {
      return;
    }
    this._updateChipAt(idx, next);
  }
  _onChipSegmentedSelect(e) {
    const idx = Number(this._ds(e, "chipIdx") || NaN);
    const key = this._ds(e, "key");
    const mode = this._ds(e, "mode") || "set";
    const valueType = this._ds(e, "valueType") || "string";
    const raw = this._ds(e, "value");
    if (this._badIdx(idx) || !key) return;
    const chip = this._getChipByIndex(idx);
    if (!chip) return;
    const next = { ...chip };
    let value = raw;
    if (valueType === "number") {
      const n = Number(raw);
      if (!Number.isFinite(n)) return;
      value = n;
    } else if (valueType === "boolean") {
      value = raw === "true";
    }
    if (mode === SEGMENT_MODE.SET_OR_DELETE_EMPTY) {
      if (value === "") delete next[key];
      else next[key] = value;
    } else if (mode === SEGMENT_MODE.TOGGLE_DELETE_IF_SAME) {
      if (chip[key] === value) delete next[key];
      else next[key] = value;
    } else if (mode === SEGMENT_MODE.BESIDE_OR_DELETE) {
      if (value === "beside") next[key] = "beside";
      else delete next[key];
    } else if (mode === SEGMENT_MODE.SOLID_OR_DELETE) {
      if (value === "solid") delete next[key];
      else next[key] = value;
    } else {
      next[key] = value;
    }
    this._updateChipAt(idx, next);
  }
  _commitChips(list) {
    if (!Array.isArray(list) || list.length === 0) {
      this._patch({}, { strip: ["chips"] });
      return;
    }
    this._patch({ chips: list });
  }
  // A chip whose value is a point in time, like the next sunrise.
  _chipShowsTimestamp(chip) {
    const st = this.hass && this.hass.states && this.hass.states[chip.entity];
    if (!st) return false;
    const raw = chip.attribute ? (st.attributes || {})[chip.attribute] : st.state;
    return typeof raw === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(raw);
  }
  _chipLabel = (schema) => {
    if (!schema || !schema.name) return "";
    return t(CHIP_LABELS[schema.name] || schema.name);
  };
  _chipHelper = (schema) => {
    if (!schema || !schema.name) return undefined;
    return CHIP_HELPERS[schema.name] ? t(CHIP_HELPERS[schema.name]) : undefined;
  };
  /* ── Chip visibility ── */
  _visScreens(query) {
    const parts = String(query || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const found = parts.map((p) => VIS_SCREENS.find((s) => s.query === p));
    return found.every(Boolean) ? found.map((s) => s.value) : null;
  }
  // Form data for one condition: lists for the multi selects, is / is not.
  _visFormData(c) {
    const list = (v) => (v === undefined || v === null || v === "" ? [] : [].concat(v).map(String));
    if (c.condition === "state" || !("condition" in c))
      return {
        condition: "state",
        entity: c.entity || c.entity_id || "",
        attribute: c.attribute || "",
        match: c.state_not != null && c.state == null ? "not" : "is",
        state: list(c.state != null ? c.state : c.state_not),
      };
    if (c.condition === "screen")
      return { ...c, screens: this._visScreens(c.media_query) || [] };
    return { ...c, weekdays: list(c.weekdays), users: list(c.users) };
  }
  _visSchema(c) {
    const type = { name: "condition", selector: { select: { mode: "dropdown", options: tOpts(VIS_TYPES) } } };
    const entityFields = (data) => [
      { name: "entity", selector: { entity: {} } },
      ...(data.entity
        ? [{ name: "attribute", selector: { attribute: {} }, context: { filter_entity: "entity" } }]
        : []),
    ];
    const data = this._visFormData(c);
    switch (data.condition) {
      case "state":
        return [
          type,
          ...entityFields(data),
          ...(data.entity
            ? [
                {
                  name: "match",
                  selector: {
                    select: {
                      mode: "box",
                      options: tOpts([
                        { value: "is", label: "Is" },
                        { value: "not", label: "Is not" },
                      ]),
                    },
                  },
                },
                {
                  name: "state",
                  selector: {
                    select: {
                      multiple: true,
                      custom_value: true,
                      mode: "dropdown",
                      options: this._imageRuleStateOptions({ entity: data.entity, attribute: data.attribute, state: data.state }),
                    },
                  },
                },
              ]
            : []),
        ];
      case "numeric_state":
        return [
          type,
          ...entityFields(data),
          {
            type: "grid",
            name: "",
            schema: [
              { name: "above", selector: { number: { mode: "box", step: "any" } } },
              { name: "below", selector: { number: { mode: "box", step: "any" } } },
            ],
          },
        ];
      case "screen":
        return [
          type,
          { name: "screens", selector: { select: { multiple: true, mode: "list", options: tOpts(VIS_SCREENS) } } },
          { name: "media_query", selector: { text: {} } },
        ];
      case "time":
        return [
          type,
          {
            type: "grid",
            name: "",
            schema: [
              { name: "after", selector: { time: {} } },
              { name: "before", selector: { time: {} } },
            ],
          },
          { name: "weekdays", selector: { select: { multiple: true, mode: "list", options: tOpts(VIS_WEEKDAYS) } } },
        ];
      case "user":
        return [
          type,
          {
            name: "users",
            selector: {
              select: {
                multiple: true,
                mode: "list",
                options: this._visUserOptions(),
              },
            },
          },
        ];
      default:
        return [type];
    }
  }
  // Users come from Home Assistant (admins only); otherwise just you.
  _visUserOptions() {
    if (this._haUsers === undefined && this.hass && this.hass.callWS) {
      this._haUsers = null;
      this.hass
        .callWS({ type: "config/auth/list" })
        .then((users) => {
          this._haUsers = (Array.isArray(users) ? users : [])
            .filter((u) => u && !u.system_generated && u.is_active !== false)
            .map((u) => ({ value: u.id, label: u.name || u.username || u.id }));
          this.requestUpdate();
        })
        .catch(() => {
          this._haUsers = [];
          this.requestUpdate();
        });
    }
    const opts = [...(this._haUsers || [])];
    const me = this.hass && this.hass.user;
    if (me && me.id && !opts.some((o) => o.value === me.id))
      opts.unshift({ value: me.id, label: me.name || me.id });
    return opts;
  }
  // Back from the form: the condition as Home Assistant writes it.
  _visFromForm(old, v) {
    const text = (x) => (typeof x === "string" ? x.trim() : "");
    const type = v.condition || "state";
    const prevType = old.condition || "state";
    if (type !== prevType) return { condition: type };
    const out = { condition: type };
    if (type === "state" || type === "numeric_state") {
      if (text(v.entity)) out.entity = text(v.entity);
      const sameEntity = out.entity === (old.entity || old.entity_id || undefined);
      if (sameEntity && text(v.attribute)) out.attribute = text(v.attribute);
      if (type === "state") {
        const states = sameEntity
          ? [].concat(v.state ?? []).map((x) => String(x).trim()).filter(Boolean)
          : [];
        const key = v.match === "not" ? "state_not" : "state";
        if (states.length) out[key] = states.length === 1 ? states[0] : [...new Set(states)];
      } else {
        for (const k of ["above", "below"])
          if (v[k] !== undefined && v[k] !== null && v[k] !== "" && Number.isFinite(Number(v[k])))
            out[k] = Number(v[k]);
      }
    } else if (type === "screen") {
      const before = this._visScreens(old.media_query) || [];
      const picked = [].concat(v.screens || []);
      const changed = picked.length !== before.length || picked.some((x) => !before.includes(x));
      const query = changed
        ? VIS_SCREENS.filter((s) => picked.includes(s.value)).map((s) => s.query).join(", ")
        : text(v.media_query);
      if (query) out.media_query = query;
    } else if (type === "time") {
      // The time picker writes seconds; minutes are enough here.
      const hm = (x) => text(x).replace(/^(\d{1,2}:\d{2}):00$/, "$1");
      if (hm(v.after)) out.after = hm(v.after);
      if (hm(v.before)) out.before = hm(v.before);
      const days = VIS_WEEKDAYS.map((d) => d.value).filter((d) => [].concat(v.weekdays || []).includes(d));
      if (days.length) out.weekdays = days;
    } else if (type === "user") {
      const users = [].concat(v.users || []).filter(Boolean);
      if (users.length) out.users = users;
    } else return { ...old };
    return out;
  }
  _renderChipVisibility(chip, update) {
    const list = Array.isArray(chip.visibility) ? chip.visibility : [];
    const write = (next) => {
      const n = { ...chip };
      if (next.length) n.visibility = next;
      else delete n.visibility;
      update(n);
    };
    const shown = checkConditions(list, this.hass);
    return html`<div class="chip-nudge info">
        <ha-icon icon="mdi:eye-outline" style="--mdc-icon-size:14px;flex-shrink:0"></ha-icon>
        ${t("Show this chip only when all conditions are met.")}
      </div>
      ${list.length
        ? html`<div class="vis-status ${shown ? "on" : "off"}">
            <ha-icon icon=${shown ? "mdi:eye" : "mdi:eye-off"}></ha-icon>
            <span>${shown ? t("Shown right now") : t("Hidden right now")}</span>
          </div>`
        : ""}
      ${list.map((c, i) => {
        const cond = c && typeof c === "object" ? c : {};
        const group = ["and", "or", "not"].includes(cond.condition);
        return html`<div class="vis-cond">
          <div class="vis-cond-head">
            <span>${group ? t("Group of conditions") : t("Visibility condition")} ${i + 1}</span>
            <button
              type="button"
              class="clear-btn"
              title=${t("Remove")}
              @click=${() => write(list.filter((_, j) => j !== i))}
            >
              <ha-icon icon="mdi:delete-outline"></ha-icon>
            </button>
          </div>
          ${group
            ? html`<div class="chip-nudge info">
                ${t("This group (and, or, not) can be changed in the YAML editor.")}
              </div>`
            : html`<ha-form
                .hass=${this.hass}
                .data=${this._visFormData(cond)}
                .schema=${this._visSchema(cond)}
                .computeLabel=${(s) => (s && s.name ? t(VIS_LABELS[s.name] || s.name) : "")}
                .computeHelper=${(s) =>
                  s && s.name === "media_query"
                    ? t("Filled in from the sizes above, or write your own CSS media query.")
                    : s && s.name === "state"
                      ? t("Pick one or more states, or type any value.")
                      : undefined}
                @value-changed=${(e) => {
                  e.stopPropagation();
                  const v = (e.detail && e.detail.value) || {};
                  write(list.map((x, j) => (j === i ? this._visFromForm(cond, v) : x)));
                }}
              ></ha-form>`}
        </div>`;
      })}
      <button
        type="button"
        class="add-card-btn"
        @click=${() => {
          // A new condition starts on the chip's own entity.
          const c = { condition: "state" };
          if (chip.entity && !chip.forecast) c.entity = chip.entity;
          write([...list, c]);
        }}
      >
        <ha-icon icon="mdi:plus"></ha-icon>
        <span>${t("Add condition")}</span>
      </button>`;
  }
  _renderChipRow(chip, idx, total) {
    const expanded = this._expandedChip === idx;
    const isFree = (chip.position || "").toString().toLowerCase() === "custom";
    const isFc = !!chip.forecast;
    const chipType = chip.type || "";
    const area = chipArea(chip);
    const posBadge = isFree
      ? html`<span class="chip-badge-free"
          ><ha-icon icon="mdi:cursor-move"></ha-icon
        ></span>`
      : this._hasAreaTwo()
        ? html`<span class="chip-badge-row chip-badge-area a${area}" title=${t("Chip area {n}", { n: area })}
            >${area}</span
          >`
        : html`<span class="chip-badge-row"
            ><ha-icon icon="mdi:view-grid-outline"></ha-icon
          ></span>`;
    const badge = posBadge;
    if (!expanded) {
      return this._renderListRow({
        idx,
        total,
        expanded,
        body: "",
        badge,
        title: this._chipTitle(chip),
        subtitle: this._chipValuePreview(chip),
        onToggle: () => this._toggleChipExpanded(idx),
        onMoveUp: () => this._moveChip(idx, -1),
        onMoveDown: () => this._moveChip(idx, 1),
        onDuplicate: () => this._duplicateChip(idx),
        onRemove: () => this._removeChip(idx),
      });
    }
    const hasEntity = !!(chip.entity || "").toString().trim(),
      entityId = (chip.entity || "").toString().trim();
    const nameSensorId = (chip.name_sensor || "").toString().trim();
    const fcEntityMissing =
      isFc && entityId && !entityId.startsWith("weather.");
    const accOpen = this[`_acc_open_${idx}`] || null;
    const update = (next) => this._updateChipAt(idx, next);
    const chipForm = (schema) =>
      html`<ha-form
        .hass=${this.hass}
        .data=${chip}
        .schema=${schema}
        .computeLabel=${this._chipLabel}
        .computeHelper=${this._chipHelper}
        @value-changed=${(e) => {
          e.stopPropagation();
          update((e.detail && e.detail.value) || {});
        }}
      ></ha-form>`;
    const entityResetForm = (entityKey, attrKey, selector) =>
      html`<ha-form
        .hass=${this.hass}
        .data=${chip}
        .schema=${[{ name: entityKey, selector }]}
        .computeLabel=${this._chipLabel}
        .computeHelper=${this._chipHelper}
        @value-changed=${(e) => {
          e.stopPropagation();
          const value = (e.detail && e.detail.value) || {};
          const next = { ...value };
          if (next[entityKey] !== chip[entityKey]) delete next[attrKey];
          update(next);
        }}
      ></ha-form>`;
    const cssField = (key, label, placeholder) =>
      html`<div class="css-field">
        <span class="css-field-label">${t(label)}</span>
        <input
          type="text"
          placeholder=${t(placeholder)}
          .value=${chip[key] !== undefined ? String(chip[key]) : ""}
          @change=${(e) => {
            const v = e.target.value;
            const next = { ...chip };
            if (key === "unit_format" || key === "sub_value_format") {
              next[key] = v;
            } else if (v.trim()) next[key] = v.trim();
            else delete next[key];
            update(next);
          }}
        />
      </div>`;
    /* ── Data source (always visible) ── */
    const typePicker = html`<div class="chip-type-picker">
      <button
        type="button"
        class="chip-type-btn ${!isFc ? "active" : ""}"
        data-chip-idx=${idx}
        data-mode="sensor"
        @click=${this._onChipTypeModeSelect}
      >
        <ha-icon
          class="chip-type-icon ${!isFc ? "active-icon" : ""}"
          icon="mdi:gauge"
        ></ha-icon>
        <div class="chip-type-text">
          <span class="chip-type-name">${t("Sensor")}</span
          ><span class="chip-type-desc">${t("Live entity value")}</span>
        </div>
      </button>
      <button
        type="button"
        class="chip-type-btn ${isFc ? "active" : ""}"
        data-chip-idx=${idx}
        data-mode="forecast"
        @click=${this._onChipTypeModeSelect}
      >
        <ha-icon
          class="chip-type-icon ${isFc ? "active-icon" : ""}"
          icon="mdi:calendar-clock"
        ></ha-icon>
        <div class="chip-type-text">
          <span class="chip-type-name">${t("Forecast")}</span
          ><span class="chip-type-desc">${t("Weather forecast")}</span>
        </div>
      </button>
    </div>`;
    const entitySection = isFc
      ? chipForm([
          { name: "entity", selector: { entity: { domain: "weather" } } },
        ])
      : html`${entityResetForm("entity", "attribute", { entity: {} })}
        ${entityId
          ? chipForm([
              {
                name: "attribute",
                selector: { attribute: { entity_id: entityId } },
              },
            ])
          : ""}`;
    const emptyNudge = !hasEntity
      ? html`<div class="chip-nudge info">
          <ha-icon
            icon="mdi:information-outline"
            style="--mdc-icon-size:14px;flex-shrink:0"
          ></ha-icon>
          ${t("Pick an entity for this chip.")}
        </div>`
      : "";
    const fcWarning = fcEntityMissing
      ? html`<div class="chip-nudge warning">
          <ha-icon
            icon="mdi:alert-circle-outline"
            style="--mdc-icon-size:14px;flex-shrink:0"
          ></ha-icon>
          ${t("Forecast requires a weather entity.")}
        </div>`
      : "";
    const fcAttr = chip.attribute || "condition";
    const fcOff = parseInt(chip.forecast_offset, 10) || 0;
    /* ── Icon accordion ── */
    const isWeatherIcon =
      (chip.icon || "").toString().trim().toLowerCase() === "weather";
    const iconSection = html`<div class="toggle-group">
        <label class="toggle-row">
          <span>${t("Hide icon")}</span>
          <ha-switch
            data-chip-idx=${idx}
            data-key="hide_icon"
            data-mode=${TOGGLE_MODE.TRUE_DELETE}
            .checked=${chip.hide_icon === true}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${!chip.hide_icon
        ? html`${isWeatherIcon
              ? html`<div class="weather-icon-active">
                  <ha-icon
                    icon="mdi:weather-partly-cloudy"
                    style="--mdc-icon-size:20px;color:var(--primary-color)"
                  ></ha-icon>
                  <div class="weather-icon-active-text">
                    <span>${t("Weather icon")}</span>
                    <span class="weather-icon-active-sub"
                      >${isFc ? t("Matches forecast") : t("Matches weather")}</span
                    >
                  </div>
                  <button
                    type="button"
                    class="icon-weather-btn"
                    data-chip-idx=${idx}
                    data-action="remove-icon"
                    @click=${this._onChipActionClick}
                  >
                    ${t("Remove")}
                  </button>
                </div>`
              : html`<div class="icon-combo">
                  <ha-form
                    style="flex:1;min-width:0"
                    .hass=${this.hass}
                    .data=${{ icon: chip.icon || "" }}
                    .schema=${[{ name: "icon", selector: { icon: {} } }]}
                    .computeLabel=${() => ""}
                    @value-changed=${(e) => {
                      e.stopPropagation();
                      update({
                        ...chip,
                        icon:
                          (e.detail && e.detail.value && e.detail.value.icon) ||
                          "",
                      });
                    }}
                  ></ha-form>
                  <button
                    type="button"
                    class="icon-weather-btn"
                    title=${t("Use dynamic weather icon")}
                    data-chip-idx=${idx}
                    data-action="set-weather-icon"
                    @click=${this._onChipActionClick}
                  >
                    <ha-icon
                      icon="mdi:weather-partly-cloudy"
                      style="--mdc-icon-size:18px"
                    ></ha-icon>
                  </button>
                </div>`}
            <div class="clearable-field">
              ${chipForm([{ name: "icon_path", selector: { text: {} } }])}
              ${chip.icon_path
                ? html`<button
                    type="button"
                    class="clear-btn"
                    title=${t("Clear")}
                    data-chip-idx=${idx}
                    data-action="clear-icon-path"
                    @click=${this._onChipActionClick}
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>`
                : ""}
            </div>
            <div class="css-field-row cols-2">
              ${cssField("icon_size", "Size", "auto")}
              ${cssField("icon_padding", "Padding", "auto")}
            </div>
            <div class="toggle-group">
              <label class="toggle-row">
                <span>${t("Icon background")}</span>
                <ha-switch
                  data-chip-idx=${idx}
                  data-key="icon_background"
                  data-mode=${TOGGLE_MODE.TRUE_FALSE_IF_DEFINED}
                  .checked=${chip.icon_background === true}
                  @change=${this._onChipToggleChange}
                ></ha-switch
              ></label>
            </div>
            ${chip.icon_background === true
              ? this._renderColorPicker(
                  "Icon background color",
                  chip.icon_background_color || "",
                  (h, o) => {
                    const next = { ...chip };
                    if (!h) delete next.icon_background_color;
                    else
                      next.icon_background_color = this._serializeColor(h, o);
                    update(next);
                  },
                )
              : ""}`
        : ""}`;
    /* ── Text accordion ── */
    const isValueMarquee = (chip.overflow || "").toLowerCase() === "marquee";
    const isLabelMarquee =
      (chip.label_overflow || "").toLowerCase() === "marquee";
    const hasSubValue = !!(chip.sub_value_entity || chip.sub_value_attribute);
    const subEntityId = (chip.sub_value_entity || "").toString().trim();
    const textAccOpen = this[`_text_acc_${idx}`] || null;
    const textAcc = (tKey, title, content) => {
      const isOpen = textAccOpen === tKey;
      return html`<div class="chip-accordion">
        <div
          class="chip-accordion-head ${isOpen ? "open" : ""}"
          data-chip-idx=${idx}
          data-acc-kind="text"
          data-acc-key=${tKey}
          @click=${this._onChipAccordionToggle}
        >
          <span class="chip-accordion-title">${t(title)}</span>
          <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        </div>
        ${isOpen ? html`<div class="chip-accordion-body">${content}</div>` : ""}
      </div>`;
    };
    const labelContent = html`<div class="toggle-group">
        <label class="toggle-row">
          <span>${t("Hide")}</span>
          <ha-switch
            data-chip-idx=${idx}
            data-key="hide_label"
            data-mode=${TOGGLE_MODE.TRUE_DELETE}
            .checked=${chip.hide_label === true}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${chip.hide_label !== true
        ? html`${chipForm([{ name: "name", selector: { text: {} } }])}
            ${entityResetForm("name_sensor", "name_attribute", { entity: {} })}
            ${nameSensorId
              ? chipForm([
                  {
                    name: "name_attribute",
                    selector: { attribute: { entity_id: nameSensorId } },
                  },
                ])
              : isFc && !chip.name
                ? html`<ha-form
                    .hass=${this.hass}
                    .data=${{ name_attribute: chip.name_attribute || "" }}
                    .schema=${[
                      {
                        name: "name_attribute",
                        selector: {
                          select: { mode: "dropdown", options: tOpts(FC_ATTRIBUTES) },
                        },
                      },
                    ]}
                    .computeLabel=${() => t("Forecast attribute")}
                    @value-changed=${(e) => {
                      e.stopPropagation();
                      const v =
                        e.detail &&
                        e.detail.value &&
                        e.detail.value.name_attribute;
                      const n = { ...chip };
                      if (v) n.name_attribute = v;
                      else delete n.name_attribute;
                      update(n);
                    }}
                  ></ha-form>`
                : ""}
            ${isFc && !chip.name && !nameSensorId && !chip.name_attribute
              ? chipForm([{ name: "date_format", selector: { text: {} } }])
              : ""}
            <div class="css-field-row cols-2">
              ${cssField("label_size", "Size", "auto")}
            </div>
            <div
              class="segmented segmented-compact"
              role="radiogroup"
              aria-label=${t("Weight")}
            >
              ${[
                { value: "", label: "Normal" },
                { value: "500", label: "Light" },
                { value: "600", label: "Medium" },
                { value: "700", label: "Bold" },
              ].map(
                (o) =>
                  html`<button
                    type="button"
                    role="radio"
                    class=${(chip.label_weight || "") === o.value
                      ? "active"
                      : ""}
                    data-chip-idx=${idx}
                    data-key="label_weight"
                    data-mode=${SEGMENT_MODE.SET_OR_DELETE_EMPTY}
                    data-value=${o.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${t(o.label)}
                  </button>`,
              )}
            </div>
            ${chipForm([
              {
                name: "label_overflow",
                selector: {
                  select: { mode: "dropdown", options: tOpts(OPT.chip_overflow) },
                },
              },
            ])}`
        : ""}`;
    const valueContent = html`<div class="toggle-group">
        <label class="toggle-row">
          <span>${t("Hide")}</span>
          <ha-switch
            data-chip-idx=${idx}
            data-key="hide_value"
            data-mode=${TOGGLE_MODE.TRUE_DELETE}
            .checked=${chip.hide_value === true}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
        ${!chip.hide_value &&
        !isFc &&
        this.hass &&
        this.hass.states[entityId] &&
        this.hass.states[entityId].attributes &&
        (this.hass.states[entityId].attributes.temperature_unit ||
          (
            this.hass.states[entityId].attributes.unit_of_measurement || ""
          ).match(/^°/))
          ? html`<label class="toggle-row">
              <span>${t("Fancy unit")}</span>
              <ha-switch
                data-chip-idx=${idx}
                data-key="fancy_unit"
                data-mode=${TOGGLE_MODE.TRUE_DELETE}
                .checked=${chip.fancy_unit === true}
                @change=${this._onChipToggleChange}
              ></ha-switch
            ></label>`
          : ""}
      </div>
      ${chip.hide_value !== true
        ? html`${isBearingChip(chip, this.hass)
              ? html`<ha-form
                  .hass=${this.hass}
                  .data=${{
                    bearing_format: chip.bearing_format || "degrees",
                    bearing_icon: chip.bearing_icon || "icon",
                  }}
                  .schema=${[
                    {
                      name: "bearing_format",
                      selector: {
                        select: {
                          mode: "dropdown",
                          options: tOpts(OPT.bearing_format),
                        },
                      },
                    },
                    {
                      name: "bearing_icon",
                      selector: {
                        select: {
                          mode: "dropdown",
                          options: tOpts(OPT.bearing_icon),
                        },
                      },
                    },
                  ]}
                  .computeLabel=${this._chipLabel}
                  @value-changed=${(e) => {
                    e.stopPropagation();
                    const v = (e.detail && e.detail.value) || {};
                    const n = {
                      ...chip,
                      bearing_format: v.bearing_format || "degrees",
                    };
                    if (v.bearing_icon && v.bearing_icon !== "icon")
                      n.bearing_icon = v.bearing_icon;
                    else delete n.bearing_icon;
                    update(n);
                  }}
                ></ha-form>
                ${chip.attribute === "wind_bearing"
                  ? html`<div class="toggle-group">
                      <label class="toggle-row">
                        <span>${t("Show wind speed")}</span>
                        <ha-switch
                          data-chip-idx=${idx}
                          data-key="bearing_speed"
                          data-mode=${TOGGLE_MODE.TRUE_DELETE}
                          .checked=${chip.bearing_speed === true}
                          @change=${this._onChipToggleChange}
                        ></ha-switch>
                      </label>
                    </div>`
                  : ""}`
              : ""}
            ${!isFc && this._chipShowsTimestamp(chip)
              ? chipForm([{ name: "date_format", selector: { text: {} } }])
              : chipForm([{ name: "unit_format", selector: { text: {} } }])}
            ${!isFc && entityId
              ? html`${(() => {
                  const hasManualPrecision =
                    chip.value_precision !== undefined &&
                    chip.value_precision !== null;
                  const prec = hasManualPrecision
                    ? Math.min(
                        2,
                        Math.max(0, parseInt(chip.value_precision, 10) || 0),
                      )
                    : 1;
                  const pct = Math.round((prec / 2) * 100);
                  return html`<div class="toggle-group">
                      <label class="toggle-row">
                        <span>${t("Auto (Home Assistant)")}</span>
                        <ha-switch
                          .checked=${!hasManualPrecision}
                          @change=${(e) => {
                            if (e.target.checked) {
                              const n = { ...chip };
                              delete n.value_precision;
                              update(n);
                            } else {
                              update({ ...chip, value_precision: prec });
                            }
                          }}
                        ></ha-switch>
                      </label>
                    </div>
                    <div class="awc-slider">
                      <div class="awc-slider-head">
                        <span class="awc-slider-label">${t("Decimal places")}</span>
                        <input
                          type="number"
                          class="awc-slider-num"
                          min="0"
                          max="2"
                          step="1"
                          placeholder=${hasManualPrecision ? "" : t("Auto")}
                          .value=${hasManualPrecision ? String(prec) : ""}
                          @change=${(e) => {
                            const raw = e.target.value.trim();
                            if (raw === "") {
                              const n = { ...chip };
                              delete n.value_precision;
                              update(n);
                              return;
                            }
                            const v = Math.min(
                              2,
                              Math.max(0, parseInt(raw, 10) || 0),
                            );
                            const range = e.target
                              .closest(".awc-slider")
                              .querySelector(".awc-slider-range");
                            if (range) {
                              range.value = v;
                              range.style.setProperty(
                                "--awc-slider-pct",
                                Math.round((v / 2) * 100) + "%",
                              );
                            }
                            update({ ...chip, value_precision: v });
                          }}
                        />
                      </div>
                      <input
                        type="range"
                        class="awc-slider-range"
                        min="0"
                        max="2"
                        step="1"
                        .value=${String(prec)}
                        style="--awc-slider-pct:${pct}%"
                        @input=${(e) => {
                          const v = parseInt(e.target.value, 10);
                          const p = Math.round((v / 2) * 100);
                          e.target.style.setProperty(
                            "--awc-slider-pct",
                            p + "%",
                          );
                          const n = e.target
                            .closest(".awc-slider")
                            .querySelector(".awc-slider-num");
                          if (n) n.value = v;
                        }}
                        @change=${(e) =>
                          update({
                            ...chip,
                            value_precision: parseInt(e.target.value, 10),
                          })}
                      />
                      <div class="awc-slider-helper">
                        ${hasManualPrecision
                          ? t("Manual override")
                          : t("Following Home Assistant display precision")}
                      </div>
                    </div>`;
                })()}`
              : ""}
            <div class="css-field-row cols-2">
              ${cssField("text_size", "Size", "auto")}
            </div>
            <div
              class="segmented segmented-compact"
              role="radiogroup"
              aria-label=${t("Weight")}
            >
              ${[
                { value: "", label: "Normal" },
                { value: "500", label: "Light" },
                { value: "600", label: "Medium" },
                { value: "700", label: "Bold" },
              ].map(
                (o) =>
                  html`<button
                    type="button"
                    role="radio"
                    class=${(chip.value_weight || "") === o.value
                      ? "active"
                      : ""}
                    data-chip-idx=${idx}
                    data-key="value_weight"
                    data-mode=${SEGMENT_MODE.SET_OR_DELETE_EMPTY}
                    data-value=${o.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${t(o.label)}
                  </button>`,
              )}
            </div>
            ${chipForm([
              {
                name: "overflow",
                selector: {
                  select: { mode: "dropdown", options: tOpts(OPT.chip_overflow) },
                },
              },
            ])}`
        : ""}`;
    // Hide only means something once there is a second value: without one the
    // switch flipped back at once (the editor drops hide_sub_value then).
    const subValueContent = html`${hasSubValue
        ? html`<div class="toggle-group">
            <label class="toggle-row">
              <span>${t("Hide")}</span>
              <ha-switch
                data-chip-idx=${idx}
                data-key="hide_sub_value"
                data-mode=${TOGGLE_MODE.TRUE_DELETE}
                .checked=${chip.hide_sub_value === true}
                @change=${this._onChipToggleChange}
              ></ha-switch
            ></label>
          </div>`
        : ""}
      ${chip.hide_sub_value !== true
        ? html`${entityResetForm("sub_value_entity", "sub_value_attribute", {
            entity: {},
          })}
          ${subEntityId
            ? chipForm([
                {
                  name: "sub_value_attribute",
                  selector: { attribute: { entity_id: subEntityId } },
                },
              ])
            : isFc
              ? html`<ha-form
                  .hass=${this.hass}
                  .data=${{
                    sub_value_attribute: chip.sub_value_attribute || "",
                  }}
                  .schema=${[
                    {
                      name: "sub_value_attribute",
                      selector: {
                        select: { mode: "dropdown", options: tOpts(FC_ATTRIBUTES) },
                      },
                    },
                  ]}
                  .computeLabel=${() => t("Forecast attribute")}
                  @value-changed=${(e) => {
                    e.stopPropagation();
                    const v =
                      e.detail &&
                      e.detail.value &&
                      e.detail.value.sub_value_attribute;
                    const n = { ...chip };
                    if (v) n.sub_value_attribute = v;
                    else delete n.sub_value_attribute;
                    update(n);
                  }}
                ></ha-form>`
              : ""}
          ${hasSubValue
            ? html`<div class="css-field-row cols-2">
                  ${cssField("sub_value_format", "Unit", "")}
                  ${cssField("sub_value_size", "Size", "auto")}
                </div>
                <div
                  class="segmented segmented-compact"
                  role="radiogroup"
                  aria-label=${t("Weight")}
                >
                  ${[
                    { value: "", label: "Normal" },
                    { value: "500", label: "Light" },
                    { value: "600", label: "Medium" },
                    { value: "700", label: "Bold" },
                  ].map(
                    (o) =>
                      html`<button
                        type="button"
                        role="radio"
                        class=${(chip.sub_value_weight || "") === o.value
                          ? "active"
                          : ""}
                        data-chip-idx=${idx}
                        data-key="sub_value_weight"
                        data-mode=${SEGMENT_MODE.SET_OR_DELETE_EMPTY}
                        data-value=${o.value}
                        @click=${this._onChipSegmentedSelect}
                      >
                        ${t(o.label)}
                      </button>`,
                  )}
                </div>
                <div class="segmented" role="radiogroup" aria-label="Position">
                  ${[
                    { value: "below", label: "Below" },
                    { value: "beside", label: "Beside value" },
                  ].map((o) => {
                    const cur =
                      chip.sub_value_position === "beside" ? "beside" : "below";
                    return html`<button
                      type="button"
                      role="radio"
                      class=${cur === o.value ? "active" : ""}
                      data-chip-idx=${idx}
                      data-key="sub_value_position"
                      data-mode=${SEGMENT_MODE.BESIDE_OR_DELETE}
                      data-value=${o.value}
                      @click=${this._onChipSegmentedSelect}
                    >
                      ${t(o.label)}
                    </button>`;
                  })}
                </div>
                ${chipForm([
                  {
                    name: "sub_value_overflow",
                    selector: {
                      select: { mode: "dropdown", options: tOpts(OPT.chip_overflow) },
                    },
                  },
                ])}`
            : ""}`
        : ""}`;
    const isSubValueMarquee =
      (chip.sub_value_overflow || "").toLowerCase() === "marquee";
    const marqueeContent =
      isValueMarquee || isLabelMarquee || isSubValueMarquee
        ? html`<div class="toggle-group">
              <label class="toggle-row">
                <span>${t("Right-to-left")}</span>
                <ha-switch
                  data-chip-idx=${idx}
                  data-key="marquee_rtl"
                  data-mode=${TOGGLE_MODE.TRUE_DELETE}
                  .checked=${chip.marquee_rtl === true}
                  @change=${this._onChipToggleChange}
                ></ha-switch
              ></label>
            </div>
            ${(() => {
              const spd = parseFloat(chip.marquee_speed) || 30;
              return this._renderChipSlider(
                chip,
                update,
                "marquee_speed",
                "Scroll speed",
                5,
                100,
                5,
                spd,
                30,
              );
            })()}`
        : null;
    const textSection = html`${textAcc("text_label", "Label", labelContent)}
    ${textAcc("text_value", "Value", valueContent)}
    ${textAcc("text_sub", "Sub value", subValueContent)}
    ${marqueeContent
      ? textAcc("text_marquee", "Scrolling", marqueeContent)
      : ""}`;
    /* ── Layout accordion ── */
    const layoutSection = html`<div
        class="segmented"
        role="radiogroup"
        aria-label=${t("Chip layout")}
      >
        ${[
          { value: "inline", label: "Inline" },
          { value: "stacked", label: "Stacked" },
          { value: "vertical", label: "Vertical" },
        ].map(
          (o) =>
            html`<button
              type="button"
              role="radio"
              class=${chip.style === o.value ? "active" : ""}
              data-chip-idx=${idx}
              data-key="style"
              data-mode=${SEGMENT_MODE.TOGGLE_DELETE_IF_SAME}
              data-value=${o.value}
              @click=${this._onChipSegmentedSelect}
            >
              ${t(o.label)}
            </button>`,
        )}
      </div>
      <div class="segmented" role="radiogroup" aria-label="Alignment">
        ${[
          { value: "start", label: "Left" },
          { value: "center", label: "Center" },
          { value: "end", label: "Right" },
          { value: "spread", label: "Spread" },
        ].map(
          (o) =>
            html`<button
              type="button"
              role="radio"
              class=${chip.align === o.value ? "active" : ""}
              data-chip-idx=${idx}
              data-key="align"
              data-mode=${SEGMENT_MODE.TOGGLE_DELETE_IF_SAME}
              data-value=${o.value}
              @click=${this._onChipSegmentedSelect}
            >
              ${t(o.label)}
            </button>`,
        )}
      </div>
      <div class="toggle-group">
        <label class="toggle-row">
          <span>${t("Round shape")}</span>
          <ha-switch
            data-chip-idx=${idx}
            data-key="chip_round"
            data-mode=${TOGGLE_MODE.TRUE_DELETE}
            .checked=${chip.chip_round === true}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
        <label class="toggle-row">
          <span>${t("Background")}</span>
          <ha-switch
            data-chip-idx=${idx}
            data-key="background"
            data-mode=${TOGGLE_MODE.FALSE_DELETE}
            .checked=${chip.background !== false}
            @change=${this._onChipToggleChange}
          ></ha-switch
        ></label>
      </div>
      ${chip.background !== false
        ? this._renderColorPicker(
            "Background color",
            chip.background_color || "",
            (h, o) => {
              const next = { ...chip };
              if (!h) delete next.background_color;
              else next.background_color = this._serializeColor(h, o);
              update(next);
            },
          )
        : ""}
      <div class="settings-group">
        <div class="settings-group-label">${t("Chip Layout")}</div>
        <div class="css-field-row cols-2">
          ${cssField("width", "Width", "e.g. 200px")}
          ${cssField("height", "Height", "e.g. 40px")}
        </div>
        <div class="css-field-row cols-2">
          ${cssField("padding", "Padding", "auto")}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${t("Gaps")}</div>
        <div class="css-field-row cols-2">
          ${cssField("inner_gap", "Icon/text gap", "auto")}
          ${cssField("text_gap", "Label/value gap", "auto")}
        </div>
      </div>`;
    /* ── Type accordion (ring / bar gauge) ── */
    const gaugeFields = (prefix) => {
      const p = prefix + "_";
      const thresholds = Array.isArray(chip[p + "thresholds"])
        ? chip[p + "thresholds"]
        : [];
      const sizeFields =
        prefix === "ring"
          ? html`<div class="css-field-row cols-2">
              ${cssField("ring_width", "Thickness", "4")}
              ${cssField("ring_gap", "Gap", "3")}
            </div>`
          : html`<div class="css-field-row cols-2">
              ${cssField("bar_height", "Thickness", "4")}
              ${cssField("bar_gap", "Gap", "4")}
            </div>`;
      const gaugeEntityId = (chip.gauge_entity || "").toString().trim();
      return html`<div class="css-field-row cols-2">
          ${cssField(p + "min", "Min", "0")}
          ${cssField(p + "max", "Max", "100")}
        </div>
        ${sizeFields}
        ${this._renderColorPicker(
          prefix === "ring" ? "Ring color" : "Bar color",
          chip[p + "color"] || "",
          (h, o) => {
            const next = { ...chip };
            if (!h) delete next[p + "color"];
            else next[p + "color"] = this._serializeColor(h, o);
            update(next);
          },
        )}
        <details class="disclosure" @toggle=${this._onDisclosureToggle}>
          <summary>
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            <ha-icon icon="mdi:cog-outline"></ha-icon>
            <span>${t(prefix === "ring" ? "Ring entity" : "Bar entity")}</span>
          </summary>
          <div class="disclosure-body">
            <div
              style="font-size:var(--awc-e-f-meta);color:var(--secondary-text-color);line-height:1.4"
            >
              ${t(
                prefix === "ring"
                  ? "Use a different entity for the ring value instead of the chip's main entity."
                  : "Use a different entity for the bar value instead of the chip's main entity.",
              )}
            </div>
            ${entityResetForm("gauge_entity", "gauge_attribute", {
              entity: {},
            })}
            ${gaugeEntityId
              ? chipForm([
                  {
                    name: "gauge_attribute",
                    selector: { attribute: { entity_id: gaugeEntityId } },
                  },
                ])
              : isFc
                ? html`<ha-form
                    .hass=${this.hass}
                    .data=${{ gauge_attribute: chip.gauge_attribute || "" }}
                    .schema=${[
                      {
                        name: "gauge_attribute",
                        selector: {
                          select: { mode: "dropdown", options: tOpts(FC_ATTRIBUTES) },
                        },
                      },
                    ]}
                    .computeLabel=${() => t("Forecast attribute")}
                    @value-changed=${(e) => {
                      e.stopPropagation();
                      const v =
                        e.detail &&
                        e.detail.value &&
                        e.detail.value.gauge_attribute;
                      const n = { ...chip };
                      if (v) n.gauge_attribute = v;
                      else delete n.gauge_attribute;
                      update(n);
                    }}
                  ></ha-form>`
                : ""}
          </div>
        </details>
        <details class="disclosure" @toggle=${this._onDisclosureToggle}>
          <summary>
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            <ha-icon icon="mdi:cog-outline"></ha-icon>
            <span>${t("Color thresholds")}</span>
          </summary>
          <div class="disclosure-body">
            <div
              class="segmented"
              role="radiogroup"
              aria-label=${t("Threshold mode")}
            >
              ${[
                { value: "solid", label: "Solid" },
                { value: "segments", label: "Segments" },
                { value: "gradient", label: "Gradient" },
              ].map(
                (o) =>
                  html`<button
                    type="button"
                    role="radio"
                    class=${(chip[p + "threshold_mode"] || "solid") === o.value
                      ? "active"
                      : ""}
                    data-chip-idx=${idx}
                    data-key=${p + "threshold_mode"}
                    data-mode=${SEGMENT_MODE.SOLID_OR_DELETE}
                    data-value=${o.value}
                    @click=${this._onChipSegmentedSelect}
                  >
                    ${t(o.label)}
                  </button>`,
              )}
            </div>
            ${thresholds.map(
              (th, ti) =>
                html`<div class="ring-threshold-row">
                  <span class="threshold-label">≥</span>
                  <input
                    type="text"
                    placeholder=${t("value")}
                    .value=${String(th.value != null ? th.value : "")}
                    @change=${(e) => {
                      const arr = [...thresholds];
                      arr[ti] = { ...arr[ti], value: e.target.value.trim() };
                      update({ ...chip, [p + "thresholds"]: arr });
                    }}
                  />
                  <input
                    type="color"
                    class="chip-color-swatch"
                    .value=${th.color || "#ff0000"}
                    @input=${(e) => {
                      const arr = [...thresholds];
                      arr[ti] = { ...arr[ti], color: e.target.value };
                      update({ ...chip, [p + "thresholds"]: arr });
                    }}
                  />
                  <button
                    type="button"
                    class="ring-threshold-del"
                    title="Remove"
                    @click=${() => {
                      const arr = [...thresholds];
                      arr.splice(ti, 1);
                      update({
                        ...chip,
                        [p + "thresholds"]: arr.length ? arr : undefined,
                      });
                    }}
                  >
                    <ha-icon
                      icon="mdi:close"
                      style="--mdc-icon-size:14px"
                    ></ha-icon>
                  </button>
                </div>`,
            )}
            <button
              type="button"
              class="ring-threshold-add"
              @click=${() => {
                const arr = [...thresholds, { value: "", color: "#ff9800" }];
                update({ ...chip, [p + "thresholds"]: arr });
              }}
            >
              <ha-icon icon="mdi:plus" style="--mdc-icon-size:14px"></ha-icon>
              ${t("Add threshold")}
            </button>
          </div>
        </details>`;
    };
    const GAUGE_SUFFIXES = [
      "min",
      "max",
      "color",
      "thresholds",
      "threshold_mode",
    ];
    const ringSection = html`<div
        class="segmented"
        role="radiogroup"
        aria-label=${t("Chip type")}
      >
        ${[
          { value: "", label: "Default" },
          { value: "ring", label: "Ring" },
          { value: "bar", label: "Bar" },
          // The sun's arc needs the sun's rising and setting times.
          ...(String(chip.entity || "").startsWith("sun.") || chipType === "sun_path"
            ? [{ value: "sun_path", label: "Sun path" }]
            : []),
        ].map(
          (o) =>
            html`<button
              type="button"
              role="radio"
              class=${chipType === o.value ? "active" : ""}
              @click=${() => {
                const n = { ...chip };
                const prev = chipType;
                if (o.value) n.type = o.value;
                else delete n.type;
                // Ring and bar share their gauge settings; the sun path has none.
                const gauges = ["ring", "bar"];
                if (gauges.includes(prev) && gauges.includes(o.value) && prev !== o.value) {
                  for (const s of GAUGE_SUFFIXES) {
                    const src = prev + "_" + s,
                      dst = o.value + "_" + s;
                    if (n[src] !== undefined && n[dst] === undefined)
                      n[dst] = n[src];
                  }
                }
                update(n);
              }}
            >
              ${t(o.label)}
            </button>`,
        )}
      </div>
      ${chipType === "ring" ? gaugeFields("ring") : ""}
      ${chipType === "bar" ? gaugeFields("bar") : ""}`;
    /* ── Position accordion ── */
    const ANCHORS = [
      "top-left",
      "top-center",
      "top-right",
      "left",
      "center",
      "right",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ];
    const currentAnchor = chip.position_anchor || "top-left";
    // Where the chip sits: in the first or second chip area, or freely.
    const place = isFree ? "free" : String(chipArea(chip));
    const setPlace = (value) => {
      const n = { ...chip };
      if (value === "free") {
        n.position = "custom";
        if (!n.position_anchor) n.position_anchor = "top-left";
        delete n.area;
      } else {
        ["position", "position_anchor", "position_x", "position_y"].forEach(
          (k) => delete n[k],
        );
        if (value === "2") n.area = 2;
        else delete n.area;
      }
      update(n);
    };
    const positionSection = html`<div class="settings-group">
        <div class="settings-group-label">${t("Where the chip sits")}</div>
        <div class="segmented" role="radiogroup" aria-label=${t("Where the chip sits")}>
          ${[
            ["1", "Chip area 1"],
            ["2", "Chip area 2"],
            ["free", "Free positioning"],
          ].map(
            ([value, label]) =>
              html`<button
                type="button"
                role="radio"
                aria-checked=${place === value ? "true" : "false"}
                class=${place === value ? "active" : ""}
                data-place=${value}
                @click=${() => setPlace(value)}
              >
                ${t(label)}
              </button>`,
          )}
        </div>
      </div>
      <div class="toggle-group">
        <label class="toggle-row">
          <span>${t("Behind animations")}</span>
          <ha-switch
            .checked=${chip.behind_effects === true}
            @change=${(e) => {
              const n = { ...chip };
              if (e.target.checked) n.behind_effects = true;
              else delete n.behind_effects;
              update(n);
            }}
          ></ha-switch
        ></label>
      </div>
      ${isFree
        ? html`<div>
            <div class="free-pos-layout">
              <div>
                <div class="settings-group-label">${t("Position")}</div>
                <div
                  class="anchor-grid"
                  role="radiogroup"
                  aria-label="Position"
                >
                  ${ANCHORS.map(
                    (v) =>
                      html`<button
                        type="button"
                        role="radio"
                        class="anchor-cell ${currentAnchor === v
                          ? "active"
                          : ""}"
                        title=${v}
                        aria-label=${v}
                        data-chip-idx=${idx}
                        data-anchor=${v}
                        @click=${this._onChipAnchorSelect}
                      ></button>`,
                  )}
                </div>
              </div>
              <div>
                <div class="settings-group-label">${t("Offset")}</div>
                <div class="offset-fields">
                  <div class="offset-field">
                    <span class="offset-field-label">X</span>
                    <input
                      type="text"
                      placeholder="0"
                      .value=${String(chip.position_x || "")}
                      @change=${(e) => {
                        const n = { ...chip };
                        const v = e.target.value.trim();
                        if (v) n.position_x = v;
                        else delete n.position_x;
                        update(n);
                      }}
                    />
                  </div>
                  <div class="offset-field">
                    <span class="offset-field-label">Y</span>
                    <input
                      type="text"
                      placeholder="0"
                      .value=${String(chip.position_y || "")}
                      @change=${(e) => {
                        const n = { ...chip };
                        const v = e.target.value.trim();
                        if (v) n.position_y = v;
                        else delete n.position_y;
                        update(n);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> `
        : ""}`;
    /* ── Tap action accordion ── */
    const tapSection = html`${chipForm([
      { name: "tap_action", selector: { ui_action: {} } },
    ])}`;
    /* ── Forecast special box (outside accordions) ── */
    const forecastBox =
      isFc && !fcEntityMissing
        ? html`<div class="chip-forecast-box">
            <div class="chip-forecast-header">
              <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon> ${t("Forecast")}
            </div>
            <div class="chip-forecast-body">
              <div
                class="segmented"
                role="radiogroup"
                aria-label=${t("Forecast type")}
              >
                ${[
                  { value: "daily", label: "Daily" },
                  { value: "hourly", label: "Hourly" },
                ].map(
                  (o) =>
                    html`<button
                      type="button"
                      role="radio"
                      class=${chip.forecast === o.value ? "active" : ""}
                      data-chip-idx=${idx}
                      data-forecast-type=${o.value}
                      @click=${this._onChipForecastTypeSelect}
                    >
                      ${t(o.label)}
                    </button>`,
                )}
              </div>
              ${(() => {
                const fcMax = chip.forecast === "hourly" ? 23 : 6;
                const fcLabel =
                  chip.forecast === "hourly" ? t("Hours ahead") : t("Days ahead");
                const fcHelper =
                  chip.forecast === "hourly"
                    ? fcOff === 0
                      ? t("Now")
                      : `+${fcOff}h`
                    : fcOff === 0
                      ? t("Today")
                      : fcOff === 1
                        ? t("Tomorrow")
                        : t("+{n} days", { n: fcOff });
                return this._renderChipSlider(
                  chip,
                  update,
                  "forecast_offset",
                  fcLabel,
                  0,
                  fcMax,
                  1,
                  fcOff,
                  0,
                  fcHelper,
                );
              })()}
              <ha-form
                .hass=${this.hass}
                .data=${{ attribute: fcAttr }}
                .schema=${[
                  {
                    name: "attribute",
                    selector: {
                      select: { mode: "dropdown", options: tOpts(FC_ATTRIBUTES) },
                    },
                  },
                ]}
                .computeLabel=${() => t("Show")}
                @value-changed=${(e) => {
                  e.stopPropagation();
                  const v =
                    e.detail && e.detail.value && e.detail.value.attribute;
                  if (v !== undefined) update({ ...chip, attribute: v });
                }}
              ></ha-form>
              ${fcAttr !== "condition" && !chip.hide_value
                ? html`${(() => {
                    const prec =
                      chip.forecast_precision !== undefined
                        ? chip.forecast_precision
                        : 1;
                    return this._renderChipSlider(
                      chip,
                      update,
                      "forecast_precision",
                      "Decimal places",
                      0,
                      2,
                      1,
                      prec,
                      0,
                    );
                  })()}`
                : ""}
            </div>
          </div>`
        : null;
    /* ── Style reset ── */
    const hasStyleOverrides = CHIP_STYLE_OVERRIDE_KEYS.some(
      (k) => chip[k] !== undefined && chip[k] !== "",
    );
    /* ── Assemble body ── */
    const TABS = [
      {
        key: "data",
        title: "Data",
        body: html`${typePicker} ${entitySection} ${emptyNudge} ${fcWarning}
        ${forecastBox || ""}`,
      },
      { key: "text", title: "Text", body: textSection },
      { key: "icon", title: "Icon", body: iconSection },
      {
        key: "look",
        title: "Look",
        body: html`<div class="settings-group-label">${t("Type")}</div>
          ${ringSection}
          <div class="settings-group-label">${t("Layout")}</div>
          ${layoutSection}`,
      },
      { key: "position", title: "Position", body: positionSection },
      { key: "tap", title: "Tap", body: tapSection },
      {
        key: "visibility",
        title: "Conditions",
        body: this._renderChipVisibility(chip, update),
      },
    ];
    const activeTab = TABS.find((x) => x.key === accOpen) || TABS[0];
    const body = html`<div class="chip-tabs" role="tablist">
        ${TABS.map(
          (x) =>
            html`<button
              type="button"
              role="tab"
              class="chip-tab ${x === activeTab ? "active" : ""}"
              aria-selected=${x === activeTab ? "true" : "false"}
              data-chip-idx=${idx}
              data-acc-kind="main"
              data-acc-key=${x.key}
              @click=${this._onChipAccordionToggle}
            >
              ${t(x.title)}
            </button>`,
        )}
      </div>
      <div class="chip-tab-body">
        ${CHIP_TAB_HELP[activeTab.key]
          ? this._renderIntro(`chip_${activeTab.key}`, ...CHIP_TAB_HELP[activeTab.key])
          : ""}${activeTab.body}
      </div>
    ${hasStyleOverrides
      ? html`<button
          type="button"
          class="add-card-btn"
          style="border-style:solid;border-color:rgba(var(--rgb-error-color,211,47,47),0.35);color:var(--error-color);margin-top:var(--awc-e-s3)"
          data-chip-idx=${idx}
          data-action="reset-styles"
          @click=${this._onChipActionClick}
        >
          <ha-icon icon="mdi:restore"></ha-icon><span>${t("Reset all styles")}</span>
        </button>`
      : ""}`;
    return this._renderListRow({
      idx,
      total,
      expanded,
      body,
      badge,
      title: this._chipTitle(chip),
      subtitle: this._chipValuePreview(chip),
      onToggle: () => this._toggleChipExpanded(idx),
      onMoveUp: () => this._moveChip(idx, -1),
      onMoveDown: () => this._moveChip(idx, 1),
      onDuplicate: () => this._duplicateChip(idx),
      onRemove: () => this._removeChip(idx),
    });
  }
  _parseColor(raw) {
    const s = (raw || "").toString().trim();
    const m = s.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
    if (m) {
      const hex = `#${parseInt(m[1]).toString(16).padStart(2, "0")}${parseInt(m[2]).toString(16).padStart(2, "0")}${parseInt(m[3]).toString(16).padStart(2, "0")}`;
      return {
        hex,
        opacity: m[4] !== undefined ? parseFloat(m[4]) : 1,
        hasColor: true,
      };
    }
    if (/^#[0-9a-f]{3,8}$/i.test(s))
      return { hex: s.slice(0, 7), opacity: 1, hasColor: true };
    return { hex: "#ffffff", opacity: 0, hasColor: false };
  }
  _serializeColor(hex, opacity) {
    if (opacity >= 1) return hex;
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${parseFloat(opacity.toFixed(2))})`;
  }
  _renderColorPicker(label, raw, onWrite) {
    const { hex, opacity, hasColor } = this._parseColor(raw);
    return html`<div class="chip-color-box">
      <div class="chip-color-row">
        <ha-icon
          icon="mdi:palette-outline"
          style="--mdc-icon-size:15px;color:var(--secondary-text-color);flex-shrink:0"
        ></ha-icon>
        <span class="chip-color-label">${t(label)}</span>
        <input
          type="color"
          class="chip-color-swatch"
          .value=${hex}
          @input=${(e) => onWrite(e.target.value, opacity || 1)}
        />
        ${hasColor
          ? html`<button
              type="button"
              class="chip-color-clear"
              title=${t("Clear color")}
              @click=${() => onWrite("", 1)}
            >
              <ha-icon icon="mdi:close" style="--mdc-icon-size:14px"></ha-icon>
            </button>`
          : ""}
      </div>
      ${hasColor
        ? html`<div class="chip-color-opacity-row">
            <span class="chip-color-opacity-label">${t("Opacity")}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              class="chip-color-opacity"
              .value=${String(opacity)}
              @input=${(e) => onWrite(hex, parseFloat(e.target.value))}
            />
            <span class="chip-color-opacity-val"
              >${Math.round(opacity * 100)}%</span
            >
          </div> `
        : ""}
    </div>`;
  }
  _renderGlobalColorPicker(key, label) {
    const raw = (this._config[key] || "").toString().trim();
    return this._renderColorPicker(label, raw, (h, o) => {
      this._updateField(key, h ? this._serializeColor(h, o) : "");
    });
  }
  _renderSlider(field, label, min, max, step, helper) {
    const markup = this._renderSliderInner(field, label, min, max, step, helper);
    return this._fromLayout(field)
      ? html`<div class="from-layout" title=${t("From the layout")}>${markup}</div>`
      : markup;
  }
  _renderSliderInner(field, label, min, max, step, helper) {
    // Without a saved value the slider shows what the card uses.
    const preset = perfPreset(this._config);
    const raw =
      this._formData[field] != null
        ? this._formData[field]
        : preset[field] != null
          ? preset[field]
          : SLIDER_DEFAULTS[field] != null
            ? SLIDER_DEFAULTS[field]
            : min;
    const parsed = parseFloat(raw);
    const val = Number.isFinite(parsed) ? parsed : min,
      pct = Math.round(((val - min) / (max - min)) * 100);
    return this._renderSliderMarkup({
      label,
      min,
      max,
      step,
      val,
      pct,
      helper,
      onNumChange: (e) => {
        const v = Math.min(
          max,
          Math.max(min, parseFloat(e.target.value) || min),
        );
        this._syncSliderRange(e, v, min, max);
        this._updateField(field, v);
      },
      onRangeInput: (e) => {
        this._syncSliderNum(e, parseFloat(e.target.value), min, max);
      },
      onRangeChange: (e) =>
        this._updateField(field, parseFloat(e.target.value)),
    });
  }
  /* Shared range-slider markup for per-chip numeric fields (e.g. marquee
   * speed, forecast offset/precision). `val` and `fallback` are computed by
   * the caller so each field keeps its own default-value semantics. */
  _renderChipSlider(
    chip,
    update,
    field,
    label,
    min,
    max,
    step,
    val,
    fallback,
    helper,
  ) {
    const pct = Math.round(((val - min) / (max - min)) * 100);
    return this._renderSliderMarkup({
      label,
      min,
      max,
      step,
      val,
      pct,
      helper,
      onNumChange: (e) => {
        const v = Math.min(
          max,
          Math.max(min, parseInt(e.target.value, 10) || fallback),
        );
        this._syncSliderRange(e, v, min, max);
        update({ ...chip, [field]: v });
      },
      onRangeInput: (e) => {
        this._syncSliderNum(e, parseInt(e.target.value, 10), min, max);
      },
      onRangeChange: (e) =>
        update({ ...chip, [field]: parseInt(e.target.value, 10) }),
    });
  }
  _syncSliderRange(e, v, min, max) {
    const range = e.target
      .closest(".awc-slider")
      .querySelector(".awc-slider-range");
    if (range) {
      range.value = v;
      range.style.setProperty(
        "--awc-slider-pct",
        Math.round(((v - min) / (max - min)) * 100) + "%",
      );
    }
  }
  _syncSliderNum(e, v, min, max) {
    e.target.style.setProperty(
      "--awc-slider-pct",
      Math.round(((v - min) / (max - min)) * 100) + "%",
    );
    const numInput = e.target
      .closest(".awc-slider")
      .querySelector(".awc-slider-num");
    if (numInput) numInput.value = v;
  }
  _renderSliderMarkup({
    label,
    min,
    max,
    step,
    val,
    pct,
    onNumChange,
    onRangeInput,
    onRangeChange,
    helper,
  }) {
    return html`<div class="awc-slider">
      <div class="awc-slider-head">
        <span class="awc-slider-label">${t(label)}</span>
        <input
          type="number"
          class="awc-slider-num"
          min=${min}
          max=${max}
          step=${step}
          .value=${String(val)}
          @change=${onNumChange}
        />
      </div>
      <input
        type="range"
        class="awc-slider-range"
        min=${min}
        max=${max}
        step=${step}
        .value=${String(val)}
        style="--awc-slider-pct:${pct}%"
        @input=${onRangeInput}
        @change=${onRangeChange}
      />
      ${helper ? html`<div class="awc-slider-helper">${t(helper)}</div>` : ""}
    </div>`;
  }
  _renderCompactField(field, placeholder) {
    const current = String(this._formData[field] || ""),
      label = t(LABELS[field] || field);
    const isCardHeight = field === "card_height";
    const hasError = isCardHeight && !!this._cardHeightError;
    return html`<div class="compact-field ${hasError ? "invalid" : ""}">
      <span class="compact-field-label">${label}</span>
      <input
        type="text"
        placeholder=${t(placeholder)}
        data-field=${field}
        .value=${current}
        @change=${this._onRawFieldChange}
      />
      ${hasError
        ? html`<div class="compact-field-hint error">
            ${this._cardHeightError}
          </div>`
        : ""}
    </div>`;
  }
  _renderChipsEditor() {
    const c = this._formData,
      list = this._getChips();
    let layout = (c.chip_area_layout || "wrap").toString().toLowerCase();
    const isGrid = layout === "grid";
    const isScroll =
      layout === "horizontal-scroll" || layout === "vertical-scroll";
    const align = (c.chip_area_align || "start").toString().toLowerCase();
    const chipFormat = (c.chip_style || "inline").toString().toLowerCase();
    const bgStyle = c.card_background_style || "frosted",
      bgActive = !!c.chip_area_background;
    const sf = (key, label, placeholder) =>
      html`<div class="css-field">
        <span class="css-field-label">${t(label)}</span>
        <input
          type="text"
          placeholder=${t(placeholder)}
          data-field=${key}
          .value=${String(c[key] || "")}
          @change=${this._onRawFieldChange}
        />
      </div>`;
    const layoutIcon = {
      wrap: svg`<rect x="2" y="4" width="10" height="6" rx="2"/><rect x="15" y="4" width="10" height="6" rx="2"/><rect x="28" y="4" width="10" height="6" rx="2"/><rect x="2" y="14" width="10" height="6" rx="2"/>`,
      grid: svg`<rect x="2" y="4" width="12" height="6" rx="2"/><rect x="16" y="4" width="12" height="6" rx="2"/><rect x="30" y="4" width="12" height="6" rx="2"/><rect x="2" y="14" width="12" height="6" rx="2"/><rect x="16" y="14" width="12" height="6" rx="2"/>`,
      "horizontal-scroll": svg`<rect x="2" y="10" width="10" height="6" rx="2"/><rect x="15" y="10" width="10" height="6" rx="2"/><rect x="28" y="10" width="10" height="6" rx="2"/><rect x="41" y="10" width="3" height="6" rx="1"/>`,
      "vertical-scroll": svg`<rect x="16" y="2" width="12" height="6" rx="2"/><rect x="16" y="10" width="12" height="6" rx="2"/><rect x="16" y="18" width="12" height="3" rx="1"/>`,
    };
    const areaContent = html`<div class="chip-area-top">
        ${this._renderPositionGrid(
          "chip_area_position",
          POSITION_GRIDS.chip_area_position,
        )}
        <div class="chip-area-layout">
          <div class="grid-picker-label">${t(LABELS.chip_area_layout)}</div>
          <div class="layout-picker" role="radiogroup">
            ${OPT.chip_area_layout.map(
              (o) =>
                html`<button
                  type="button"
                  role="radio"
                  class=${layout === o.value ? "active" : ""}
                  data-field="chip_area_layout"
                  data-value=${o.value}
                  @click=${this._onSegmentedFieldSelect}
                >
                  <svg viewBox="0 0 44 24" aria-hidden="true">
                    ${layoutIcon[o.value]}
                  </svg>
                  <span>${t(o.label)}</span>
                </button>`,
            )}
          </div>
        </div>
      </div>
      ${isGrid
        ? this._renderSlider(
            "chip_area_columns",
            LABELS.chip_area_columns,
            1,
            12,
            1,
          )
        : ""}
      ${isScroll
        ? this._renderSlider(
            "chip_area_scroll_count",
            LABELS.chip_area_scroll_count,
            1,
            10,
            1,
          )
        : ""}
      <div class="settings-group">
        <div class="settings-group-label">${t(LABELS.chip_style)}</div>
        <div class="segmented" role="radiogroup" aria-label=${t("Chip style")}>
          ${[
            { value: "inline", label: "Inline" },
            { value: "stacked", label: "Stacked" },
            { value: "vertical", label: "Vertical" },
          ].map(
            (o) =>
              html`<button
                type="button"
                role="radio"
                class=${chipFormat === o.value ? "active" : ""}
                data-field="chip_style"
                data-value=${o.value}
                @click=${this._onSegmentedFieldSelect}
              >
                ${t(o.label)}
              </button>`,
          )}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${t("Chip background")}</div>
        <div class="segmented" role="radiogroup" aria-label=${t("Background")}>
          <button
            type="button"
            role="radio"
            class=${!bgActive ? "active" : ""}
            data-bg-mode="off"
            @click=${this._onChipAreaBackgroundModeSelect}
          >
            ${t("Off")}
          </button>
          ${[
            { value: "frosted", label: "Frosted" },
            { value: "contrast", label: "Contrast" },
            { value: "theme", label: "Theme" },
          ].map(
            (o) =>
              html`<button
                type="button"
                role="radio"
                class=${bgActive && bgStyle === o.value ? "active" : ""}
                data-bg-mode=${o.value}
                @click=${this._onChipAreaBackgroundModeSelect}
              >
                ${t(o.label)}
              </button>`,
          )}
        </div>
        <div class="composite-helper">${t(HELPERS.card_background_style)}</div>
      </div>`;
    const fineContent = html`<div class="settings-group">
        <div class="section-title">${t("Size")}</div>
        <div class="css-field-row cols-2">
          ${sf("chip_area_width", LABELS.chip_area_width, "auto")}
          ${isScroll
            ? sf("chip_area_height", LABELS.chip_area_height, "auto")
            : ""}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${t("Arrangement")}</div>
        <div class="field-group">
          ${this._renderToggleGroup([
            { key: "chip_area_grouped", label: LABELS.chip_area_grouped },
            ...(isScroll
              ? [
                  {
                    key: "chip_area_full_width",
                    label: LABELS.chip_area_full_width,
                  },
                ]
              : []),
          ])}
          ${c.chip_area_grouped === true
            ? this._renderToggleGroup([
                {
                  key: "chip_area_separator",
                  label: LABELS.chip_area_separator,
                },
              ])
            : ""}
        </div>
        <div class="settings-group-label">${t("Content alignment")}</div>
        <div
          class="segmented"
          role="radiogroup"
          aria-label=${t("Content alignment")}
          style="flex-wrap:nowrap"
        >
          ${OPT.chip_area_align.map(
            (o) =>
              html`<button
                type="button"
                role="radio"
                class=${align === o.value ? "active" : ""}
                data-field="chip_area_align"
                data-value=${o.value}
                @click=${this._onSegmentedFieldSelect}
              >
                ${t(o.label)}
              </button>`,
          )}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${t("Gaps")}</div>
        <div class="css-field-row cols-2">
          ${sf("chip_area_gap", LABELS.chip_area_gap, "8px")}
          ${sf("chip_area_padding", LABELS.chip_area_padding, "0")}
        </div>
        <div class="css-field-row cols-2">
          ${sf("chip_gap", LABELS.chip_gap, "6px")}
          ${sf("chip_text_gap", LABELS.chip_text_gap, "0.35em")}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${t("Sizes")}</div>
        <div class="css-field-row cols-2">
          ${sf("chip_text_size", LABELS.chip_text_size, "auto")}
          ${sf("chip_label_size", LABELS.chip_label_size, "auto")}
        </div>
        <div class="css-field-row cols-2">
          ${sf("chip_icon_size", LABELS.chip_icon_size, "auto")}
          ${sf("chip_icon_padding", LABELS.chip_icon_padding, "auto")}
        </div>
        <div class="css-field-row cols-2">
          ${sf("chip_padding", LABELS.chip_padding, "auto")}
        </div>
      </div>
      <div class="settings-group">
        <div class="section-title">${t("Colors")}</div>
        <div class="settings-group-label">${t(LABELS.chip_icon_background)}</div>
        <div
          class="segmented"
          role="radiogroup"
          aria-label=${t(LABELS.chip_icon_background)}
        >
          ${[
            { value: undefined, label: "Default" },
            { value: true, label: "On" },
            { value: false, label: "Off" },
          ].map(
            (o) =>
              html`<button
                type="button"
                role="radio"
                class=${c.chip_icon_background === o.value ||
                (o.value === undefined && c.chip_icon_background === undefined)
                  ? "active"
                  : ""}
                data-field="chip_icon_background"
                data-value=${o.value === undefined ? "" : String(o.value)}
                data-value-type=${o.value === undefined ? "empty" : "boolean"}
                @click=${this._onSegmentedFieldSelect}
              >
                ${t(o.label)}
              </button>`,
          )}
        </div>
        ${this._renderGlobalColorPicker(
          "chip_background_color",
          "Background color (all chips)",
        )}
        ${this._renderGlobalColorPicker(
          "chip_icon_background_color",
          "Icon background color (all chips)",
        )}
        ${c.chip_area_grouped === true && c.chip_area_background === true
          ? this._renderGlobalColorPicker(
              "chip_area_background_color",
              "Container background color",
            )
          : ""}
      </div>`;
    const weather = (this._config && this._config.weather_entity) || "";
    const QUICK = [
      {
        label: "Temperature",
        chip: { entity: weather, attribute: "temperature", icon: "mdi:thermometer" },
      },
      {
        label: "Humidity",
        chip: { entity: weather, attribute: "humidity", icon: "mdi:water-percent" },
      },
      {
        label: "Wind",
        chip: { entity: weather, attribute: "wind_speed", icon: "mdi:weather-windy" },
      },
      {
        label: "Rain chance",
        chip: {
          entity: weather,
          forecast: "daily",
          attribute: "precipitation_probability",
          icon: "mdi:umbrella-outline",
        },
      },
      {
        label: "Tomorrow",
        chip: {
          entity: weather,
          forecast: "daily",
          forecast_offset: 1,
          attribute: "temperature",
          sub_value_attribute: "templow",
          icon: "weather",
        },
      },
    ];
    return html`${this._formData.card_layout && !list.length
        ? html`<div class="info">${t("The card shows the chips of its layout. Add a chip to use your own instead.")}</div>`
        : this._formData.card_layout && this._formData.layout_chips === true
          ? html`<div class="info">${t("The card also shows the chips of its layout, before your own.")}</div>`
          : ""}
      <div class="sensor-list">
        ${list.map((chip, idx) => this._renderChipRow(chip, idx, list.length))}
      </div>
      <button type="button" class="add-chip-btn" @click=${this._addChip}>
        <ha-icon icon="mdi:plus"></ha-icon> <span>${t("Add chip")}</span>
      </button>
      ${weather
        ? html`<div class="quick-add">
            <span class="quick-add-label">${t("Quick add:")}</span>
            ${QUICK.map(
              (q) =>
                html`<button
                  type="button"
                  class="quick-add-btn"
                  @click=${() =>
                    this._addQuickChip({ name: t(q.label), ...q.chip })}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>${t(q.label)}
                </button>`,
            )}
          </div>`
        : ""}
      ${this._renderGroup(
        this._hasAreaTwo() ? "Chip area 1" : "Chip area",
        html`${this._renderIntro(
            "chip_area",
            "Where the chips sit and how they line up: in a row, in a grid with columns or as a strip that scrolls. Style, size and background apply to all chips; single chips can change them under Look.",
            "chips.html#row-options",
          )}${areaContent}`,
      )}
      ${this._hasAreaTwo()
        ? this._renderGroup(
            "Chip area 2",
            html`${this._renderIntro(
                "chip_area_2",
                "A second place for chips with its own position and layout, for example the values at the top and the forecast at the bottom. A chip moves here under Position.",
                "chips.html#chip-area-2",
              )}${this._renderAreaTwo(layoutIcon)}`,
          )
        : html`<button type="button" class="add-card-btn add-area-two" @click=${this._addAreaTwo}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>${t("Add second chip area")}</span>
          </button>`}
      ${this._renderGroup(
        "Temperature curve",
        html`${this._renderIntro(
            "forecast_curve",
            "Draws the temperature as a curve over the forecast chips of a chip area that show the temperature, at least two of them.",
            "chips.html#forecast-curve",
          )}${this._renderForm([
            {
              name: "forecast_curve",
              selector: { select: { mode: "dropdown", options: tOpts(OPT.forecast_curve) } },
            },
          ])}
          ${this._formData.forecast_curve
            ? this._renderSlider(
                "forecast_curve_height",
                t(LABELS.forecast_curve_height),
                24,
                120,
                2,
                t(HELPERS.forecast_curve_height),
              )
            : ""}`,
      )}
      ${this._renderDisclosure("Fine tuning (gaps, sizes, colors)", fineContent)}
      <div class="tip-box">
        <ha-icon icon="mdi:lightbulb-outline"></ha-icon>
        <span
          >${t("SVG icons:")}
          <a
            href="${DOCS_URL}docs/guides.html#weather-icons"
            target="_blank"
            rel="noopener"
            >${t("How to add them")}</a
          ></span
        >
      </div>`;
  }
  _addQuickChip(chip) {
    const next = [...this._getChips(), chip];
    this._expandedChip = null;
    this._commitChips(next);
  }
  _renderPerformancePanel() {
    const PRESETS = PERF_PRESETS;
    const cfg = this._config || {};
    const keys = [
      "perf_fps",
      "animation_speed",
      "bird_animation_speed",
      "star_animation_speed",
      "perf_cloud_quality",
      "perf_effects",
      "perf_fauna",
      "perf_dpr",
      "fauna_bird_density",
      "fauna_plane_density",
      "fauna_bird_flock_size",
      "fauna_birds_at_night",
    ];
    const presetName =
      typeof cfg.perf_mode === "string" && PRESETS[cfg.perf_mode]
        ? cfg.perf_mode
        : "default";
    const activePreset = PRESETS[presetName];
    const val = (k) => {
      const raw = cfg[k] !== undefined ? cfg[k] : activePreset[k];
      const num = typeof raw === "number" ? raw : parseFloat(raw);
      return Number.isFinite(num) ? num : activePreset[k];
    };
    const matched =
      ["low", "default", "ultra"].find((p) =>
        keys.every((k) => val(k) === PRESETS[p][k]),
      ) || "custom";
    // A preset writes only perf_mode; the card takes every value from it.
    // Own values are removed, and birds and planes come back on.
    const onPreset = (name) => {
      this._patch(
        { perf_mode: name },
        { strip: [...keys, "fauna_birds", "fauna_planes"] },
      );
    };
    const DESCS = {
      perf_fps: {
        20: "Battery saver",
        30: "Balanced",
        60: "Maximum smoothness",
      },
      perf_cloud_quality: {
        0.5: "Simple clouds",
        1: "Moderate detail",
        1.5: "Detailed clouds",
        2: "Maximum detail",
      },
      perf_effects: {
        0: "The weather only, without extra effects",
        1: "Haze, ground mist, sun rays, fog banks, shooting stars and comets",
        2: "Plus more comets, clouds lit by the sun and more wind lines",
      },
      perf_dpr: {
        0.5: "Low resolution",
        1: "Standard resolution",
        1.5: "Sharp rendering",
        2: "Native resolution",
      },
    };
    const perfButtons = (field, label, options) => {
      const v = val(field);
      const desc = (DESCS[field] && DESCS[field][v]) || "";
      return html`<div class="settings-group">
        <div class="settings-group-label">${t(label)}</div>
        <div class="segmented" role="radiogroup" aria-label=${t(label)}>
          ${options.map(
            (o) =>
              html`<button
                type="button"
                role="radio"
                class=${v === o.value ? "active" : ""}
                data-field=${field}
                data-value=${String(o.value)}
                data-value-type="number"
                @click=${this._onSegmentedFieldSelect}
              >
                ${t(o.label)}
              </button>`,
          )}
        </div>
        ${desc ? html`<div class="composite-helper">${t(desc)}</div>` : ""}
      </div>`;
    };
    return html`${this._renderIntro(
        "performance",
        "“Low” saves battery and helps older tablets, “Ultra” shows everything at full quality. Every effect can be switched off on its own under Sky & weather; anything that is off costs nothing.",
        "effects.html#performance",
      )}
      <div class="grid-picker">
        <div class="grid-picker-label">${t(LABELS.perf_mode)}</div>
        <div class="segmented">
          ${[
            { v: "low", l: "Low" },
            { v: "default", l: "Default" },
            { v: "ultra", l: "Ultra" },
          ].map(
            (o) =>
              html`<button
                type="button"
                class=${matched === o.v ? "active" : ""}
                @click=${() => onPreset(o.v)}
              >
                ${t(o.l)}
              </button>`,
          )}
        </div>
        <div class="composite-helper">
          ${matched === "custom"
            ? t("Custom: you changed values of the preset.")
            : t(HELPERS.perf_mode)}
        </div>
      </div>
      ${this._renderGroup(
        "Graphics",
        html`${perfButtons("perf_fps", LABELS.perf_fps, [
          { value: 20, label: "20" },
          { value: 30, label: "30" },
          { value: 60, label: "60" },
        ])}
        ${perfButtons("perf_cloud_quality", LABELS.perf_cloud_quality, [
          { value: 0.5, label: "Low" },
          { value: 1, label: "Medium" },
          { value: 1.5, label: "High" },
          { value: 2, label: "Ultra" },
        ])}
        ${perfButtons("perf_effects", LABELS.perf_effects, [
          { value: 0, label: "Off" },
          { value: 1, label: "Default" },
          { value: 2, label: "Ultra" },
        ])}
        ${perfButtons("perf_dpr", LABELS.perf_dpr, [
          { value: 0.5, label: "Low" },
          { value: 1, label: "Medium" },
          { value: 1.5, label: "High" },
          { value: 2, label: "Full" },
        ])}`,
      )}
      ${this._renderGroup(
        "Animation",
        this._renderSlider(
          "animation_speed",
          t(LABELS.animation_speed),
          0.0,
          3.0,
          0.1,
          t(HELPERS.animation_speed),
        ),
      )}`;
  }
  // Birds and planes: perf_fauna sets what may fly at all, fauna_birds and
  // fauna_planes switch each one off on its own.
  _onFaunaToggle(e) {
    const which = this._ds(e, "fauna");
    const on = e.target.checked === true;
    const cfg = this._config || {};
    const raw = parseInt(cfg.perf_fauna, 10);
    const level = Number.isFinite(raw) ? raw : perfPreset(cfg).perf_fauna;
    const birdsOn = level >= 1 && cfg.fauna_birds !== false;
    const changes = {},
      strip = [];
    if (which === "birds") {
      if (on) {
        strip.push("fauna_birds");
        if (level < 1) changes.perf_fauna = 1;
      } else changes.fauna_birds = false;
    } else if (which === "planes") {
      if (on) {
        strip.push("fauna_planes");
        if (level < 2) {
          changes.perf_fauna = 2;
          if (!birdsOn) changes.fauna_birds = false;
        }
      } else changes.fauna_planes = false;
    } else return;
    this._patch(changes, { strip });
  }
  _renderSwitch(key, defaultOn) {
    const v = this._formData[key];
    const checked = defaultOn ? v !== false : v === true;
    const helper = HELPERS[key];
    return html`<label class="toggle-row">
      <span class="toggle-text"
        ><span>${t(LABELS[key] || key)}</span>${helper
          ? html`<span class="toggle-helper">${t(helper)}</span>`
          : ""}</span
      >
      <ha-switch
        data-key=${key}
        .checked=${checked}
        @change=${this._onToggleGroupChange}
      ></ha-switch>
    </label>`;
  }
  /* ── Second chip area ── */
  // A copy: Home Assistant freezes the config it hands to the editor.
  _areaTwo() {
    const a = this._config && this._config.chip_area_2;
    return a && typeof a === "object" && !Array.isArray(a) ? { ...a } : {};
  }
  _hasAreaTwo() {
    if (this._config && this._config.chip_area_2) return true;
    // The layout's second area, while the layout's chips are in use.
    if (this._layoutValues().chip_area_2 && this._getChips().length === 0) return true;
    return this._getChips().some(
      (c) => chipArea(c) === 2 && String(c.position || "").toLowerCase() !== "custom",
    );
  }
  _setAreaTwo(key, value) {
    // The first own change starts from the layout's second area.
    const a = this._config && this._config.chip_area_2 ? this._areaTwo() : { ...(this._layoutValues().chip_area_2 || {}) };
    if (value === undefined || value === null || value === "" || value === false) delete a[key];
    else a[key] = value;
    // Kept while chips use it, even with nothing set.
    this._patch({ chip_area_2: Object.keys(a).length ? a : { position: AREA2_DEFAULT_POSITION } });
  }
  _addAreaTwo = () => {
    this._patch({ chip_area_2: { position: AREA2_DEFAULT_POSITION } });
  };
  // Removes the second area; its chips go back to the first.
  _removeAreaTwo = () => {
    const chips = this._getChips().map((c) => {
      if (c.area === undefined) return c;
      const n = { ...c };
      delete n.area;
      return n;
    });
    this._patch(chips.length ? { chips } : {}, { strip: ["chip_area_2"] });
  };
  _renderAreaTwo(layoutIcon) {
    const fromLayout = !(this._config && this._config.chip_area_2) && !!this._layoutValues().chip_area_2;
    const a = fromLayout ? { ...this._layoutValues().chip_area_2 } : this._areaTwo();
    const grid = PREPARED_POSITION_GRIDS.chip_area_position;
    const pos = String(a.position || AREA2_DEFAULT_POSITION);
    const current = grid.reverseMap[pos] || pos;
    const layout = String(a.layout || CONFIG_DEFAULTS.chip_area_layout);
    const style = String(a.style || this._formData.chip_style || CONFIG_DEFAULTS.chip_style);
    const bgMode = a.background === true
      ? String(a.background_style || this._formData.card_background_style || CONFIG_DEFAULTS.card_background_style)
      : "off";
    const field = (key, label, placeholder, type = "text") =>
      html`<div class="css-field">
        <span class="css-field-label">${t(label)}</span>
        <input
          type=${type}
          min="1"
          placeholder=${placeholder}
          data-area-key=${key}
          .value=${a[key] !== undefined ? String(a[key]) : ""}
          @change=${(e) => {
            const v = e.target.value.trim();
            const n = type === "number" ? parseInt(v, 10) : v;
            this._setAreaTwo(key, type === "number" ? (Number.isFinite(n) && n > 0 ? n : undefined) : v);
          }}
        />
      </div>`;
    return html`<div class="composite-helper">
        ${t("Chips with Chip area 2 in their Position tab sit here, with this place and look.")}
        ${fromLayout ? html` ${t("Grey values come from the layout.")}` : ""}
      </div>
      <div class=${fromLayout ? "from-layout-area" : ""}>
      <div class="chip-area-top">
        <div class="grid-picker">
          <div class="grid-picker-label">${t(LABELS.chip_area_position)}</div>
          <div class="grid-3x3 area-two-grid" role="radiogroup" aria-label=${t(LABELS.chip_area_position)}>
            ${grid.cellsFlat.map((val) =>
              val === null
                ? html`<div class="grid-cell empty"></div>`
                : html`<button
                    type="button"
                    role="radio"
                    class="grid-cell ${current === val ? "active" : ""}"
                    ?disabled=${grid.disabledSet.has(val)}
                    title=${val}
                    aria-label=${val}
                    data-value=${grid.valueMap[val] || val}
                    @click=${() => this._setAreaTwo("position", grid.valueMap[val] || val)}
                  ></button>`,
            )}
          </div>
        </div>
        <div class="chip-area-layout">
          <div class="grid-picker-label">${t(LABELS.chip_area_layout)}</div>
          <div class="layout-picker area-two-layout" role="radiogroup">
            ${OPT.chip_area_layout.map(
              (o) =>
                html`<button
                  type="button"
                  role="radio"
                  class=${layout === o.value ? "active" : ""}
                  data-value=${o.value}
                  @click=${() => this._setAreaTwo("layout", o.value === CONFIG_DEFAULTS.chip_area_layout ? undefined : o.value)}
                >
                  <svg viewBox="0 0 44 24" aria-hidden="true">${layoutIcon[o.value]}</svg>
                  <span>${t(o.label)}</span>
                </button>`,
            )}
          </div>
        </div>
      </div>
      <div class="css-field-row cols-2">
        ${layout === "grid" ? field("columns", "Columns", "1", "number") : ""}
        ${layout.endsWith("scroll") ? field("scroll_count", "Visible chips", "auto", "number") : ""}
        ${field("gap", "Gap", "8px")}
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${t(LABELS.chip_style)}</div>
        <div class="segmented area-two-style" role="radiogroup" aria-label=${t("Chip style")}>
          ${[
            { value: "inline", label: "Inline" },
            { value: "stacked", label: "Stacked" },
            { value: "vertical", label: "Vertical" },
          ].map(
            (o) =>
              html`<button
                type="button"
                role="radio"
                class=${style === o.value ? "active" : ""}
                data-value=${o.value}
                @click=${() => this._setAreaTwo("style", o.value)}
              >
                ${t(o.label)}
              </button>`,
          )}
        </div>
      </div>
      <div class="settings-group">
        <div class="settings-group-label">${t("Chip background")}</div>
        <div class="segmented area-two-bg" role="radiogroup" aria-label=${t("Background")}>
          ${[
            { value: "off", label: "Off" },
            { value: "frosted", label: "Frosted" },
            { value: "contrast", label: "Contrast" },
            { value: "theme", label: "Theme" },
          ].map(
            (o) =>
              html`<button
                type="button"
                role="radio"
                class=${bgMode === o.value ? "active" : ""}
                data-value=${o.value}
                @click=${() => {
                  const n = this._config && this._config.chip_area_2 ? this._areaTwo() : { ...(this._layoutValues().chip_area_2 || {}) };
                  if (o.value === "off") {
                    delete n.background;
                    delete n.background_style;
                  } else {
                    n.background = true;
                    n.background_style = o.value;
                  }
                  this._patch({ chip_area_2: Object.keys(n).length ? n : { position: AREA2_DEFAULT_POSITION } });
                }}
              >
                ${t(o.label)}
              </button>`,
          )}
        </div>
      </div>
      </div>
      <button type="button" class="add-card-btn remove-area-two" @click=${this._removeAreaTwo}>
        <ha-icon icon="mdi:minus"></ha-icon>
        <span>${t("Remove second chip area")}</span>
      </button>`;
  }
  _renderGroup(title, body) {
    return html`<div class="editor-group">
      <div class="editor-group-title">${t(title)}</div>
      ${body}
    </div>`;
  }
  // A short help text behind an (i) button, with a link into the documentation.
  _renderIntro(id, text, anchor) {
    const open = !!(this._helpOpen && this._helpOpen[id]);
    return html`<div class="help-row">
        <button
          type="button"
          class="help-btn ${open ? "active" : ""}"
          data-help=${id}
          aria-expanded=${open ? "true" : "false"}
          @click=${this._onHelpToggle}
        >
          <ha-icon icon="mdi:information-outline"></ha-icon>
          <span>${t("Help")}</span>
        </button>
      </div>
      ${open
        ? html`<div class="help-box">
            ${t(text)}
            ${(Array.isArray(anchor) ? anchor : anchor ? [[anchor, "More in the docs"]] : []).map(
              ([href, label]) =>
                html` <a href="${DOCS_URL}docs/${href}" target="_blank" rel="noopener"
                    >${t(label)} →</a
                  >`,
            )}
          </div>`
        : ""}`;
  }
  _onHelpToggle(e) {
    const id = this._ds(e, "help");
    if (!id) return;
    this._helpOpen = { ...(this._helpOpen || {}), [id]: !this._helpOpen?.[id] };
    this.requestUpdate();
  }
  // A topic inside a panel: a row with icon, title and a line about what is
  // in it, open one at a time so the panel stays short.
  _section(id, icon, title, sub, body) {
    return html`<details
      class="section"
      data-section=${id}
      ?open=${this._openSection === id}
      @toggle=${this._onSectionToggle}
    >
      <summary>
        <span class="section-icon"><ha-icon icon=${icon}></ha-icon></span>
        <span class="section-text">
          <span class="section-name">${t(title)}</span>
          <span class="section-sub">${t(sub)}</span>
        </span>
        <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
      </summary>
      <div class="section-body">
        ${SECTION_HELP[id] ? this._renderIntro(id, ...SECTION_HELP[id]) : ""}${body}
      </div>
    </details>`;
  }
  _onSectionToggle(e) {
    const id = this._ds(e, "section");
    if (!id) return;
    if (e.currentTarget.open) this._openSection = id;
    else if (this._openSection === id) this._openSection = null;
  }
  _renderLayoutsPanel() {
    const current = this._formData.card_layout || "";
    const TILES = [
      {
        value: "standard",
        title: "Standard",
        desc: "A big temperature, the condition and a quiet row with humidity, wind and tomorrow",
        art: svg`<rect class="lt-card" x="2" y="4" width="44" height="28" rx="4"/><circle class="lt-sun" cx="37" cy="11" r="3.5"/><rect x="7" y="9" width="14" height="6" rx="1.5"/><rect x="7" y="17" width="10" height="2.5" rx="1"/><rect x="7" y="25" width="9" height="3" rx="1.5"/><rect x="18" y="25" width="9" height="3" rx="1.5"/><rect x="29" y="25" width="9" height="3" rx="1.5"/>`,
      },
      {
        value: "compact",
        title: "Compact",
        desc: "One slim strip with the temperature, the condition and two values",
        art: svg`<rect class="lt-card" x="2" y="11" width="44" height="14" rx="4"/><circle class="lt-sun" cx="9" cy="18" r="3"/><rect x="15" y="15" width="10" height="6" rx="1.5"/><rect x="29" y="16.5" width="6" height="3" rx="1.5"/><rect x="37" y="16.5" width="6" height="3" rx="1.5"/>`,
      },
      {
        value: "wide",
        title: "Wide",
        desc: "The weather now on the left, values and tomorrow in two columns on the right. Needs a wide spot",
        art: svg`<rect class="lt-card" x="1" y="7" width="46" height="22" rx="4"/><circle class="lt-sun" cx="8" cy="13" r="2.5"/><rect x="5" y="18" width="11" height="5" rx="1.5"/><rect x="22" y="12" width="4" height="12" rx="1.5"/><rect x="28" y="12" width="4" height="12" rx="1.5"/><rect x="34" y="12" width="4" height="12" rx="1.5"/><rect x="40" y="12" width="4" height="12" rx="1.5"/>`,
      },
      {
        value: "home",
        title: "Home",
        desc: "A house with the weather beside it, the bundled one or yours, a wind ring and a frosted bar for values like your rooms",
        art: svg`<rect class="lt-card" x="2" y="4" width="44" height="28" rx="4"/><path class="lt-sun" d="M26 21 L33 14 L40 21 L40 27 L26 27 Z"/><circle cx="40" cy="9" r="3.2" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="1 1"/><rect x="6" y="18" width="10" height="6" rx="1.5"/><rect x="6" y="26" width="7" height="2" rx="1"/><rect x="24" y="28.5" width="18" height="2.5" rx="1.25"/>`,
      },
      {
        value: "panel",
        title: "Panel",
        desc: "A tall card: the weather on top, tiles with values and the next hours under a soft curve. Needs a tall spot",
        art: svg`<rect class="lt-card" x="11" y="1" width="26" height="34" rx="3.5"/><rect x="14" y="4" width="7" height="4" rx="1"/><rect x="28" y="4" width="6" height="2" rx="1"/><rect x="14" y="11" width="9.5" height="5" rx="1.2"/><rect x="24.5" y="11" width="9.5" height="5" rx="1.2"/><rect x="14" y="17.5" width="9.5" height="5" rx="1.2"/><rect x="24.5" y="17.5" width="9.5" height="5" rx="1.2"/><path d="M15 27 Q20 25 24 27 T33 27" fill="none" stroke="currentColor" stroke-width="0.9"/><rect x="14" y="29.5" width="3" height="3" rx="1"/><rect x="19.5" y="29.5" width="3" height="3" rx="1"/><rect x="25" y="29.5" width="3" height="3" rx="1"/><rect x="30.5" y="29.5" width="3" height="3" rx="1"/>`,
      },
      {
        value: "",
        title: "Free",
        desc: "No finished look: you choose chips, sizes and positions yourself",
        art: svg`<rect class="lt-card lt-dashed" x="2" y="4" width="44" height="28" rx="4"/><rect x="10" y="11" width="28" height="2" rx="1"/><circle cx="17" cy="12" r="2.5"/><rect x="10" y="17" width="28" height="2" rx="1"/><circle cx="30" cy="18" r="2.5"/><rect x="10" y="23" width="28" height="2" rx="1"/><circle cx="22" cy="24" r="2.5"/>`,
      },
    ];
    return html`${this._renderIntro(
        "layouts",
        "Each layout is a finished look for one kind of spot: Standard for a normal column, Compact as a slim strip, Wide for a broad spot, Home with a house, the bundled one or yours, Panel as a tall wall panel with the next hours.",
        "appearance.html#card-layouts",
      )}
      <div class="layout-tiles" role="radiogroup" aria-label=${t(LABELS.card_layout)}>
        ${TILES.map(
          (o) =>
            html`<button
              type="button"
              role="radio"
              aria-checked=${current === o.value ? "true" : "false"}
              class="layout-tile ${current === o.value ? "active" : ""}"
              data-field="card_layout"
              data-value=${o.value}
              data-value-type=${o.value ? "string" : "empty"}
              @click=${this._onSegmentedFieldSelect}
            >
              <span class="layout-art"
                ><svg viewBox="0 0 48 36" aria-hidden="true">${o.art}</svg></span
              >
              <span class="layout-text">
                <span class="layout-name">${t(o.title)}</span>
                <span class="layout-desc">${t(o.desc)}</span>
              </span>
              ${current === o.value
                ? html`<ha-icon class="layout-check" icon="mdi:check-circle"></ha-icon>`
                : ""}
            </button>`,
        )}
      </div>
      ${this._renderLayoutNotices(current)}
      <div class="tip-box">
        <ha-icon icon="mdi:lightbulb-outline"></ha-icon>
        <span
          >${t(
            "Picking a layout resets your own values for its look: size, image placement and the chip row. Your chips stay. Values you change afterwards win over the layout.",
          )}</span
        >
      </div>`;
  }
  _renderLayoutNotices(current) {
    const s = this._layoutSwitch;
    const step = s && s.layout === current ? s : null;
    const c = this._config || {};
    // Own chips outside a layout step: offer the questions again.
    const ownChips = current && !step && this._getChips().length > 0 && c.layout_chips !== true;
    const btn = (label, handler, secondary) =>
      html`<button type="button" class="inline-action-btn ${secondary ? "secondary" : ""}" @click=${handler}>
        ${t(label)}
      </button>`;
    const CHIP_NOTES = {
      arranged: "Your chips were arranged for the layout.",
      layout: "The card now shows the chips of the layout.",
      kept: "Your own chips replace the chips of this layout.",
    };
    const lines = [];
    if (step && step.reset === 1) lines.push(t("One own value was reset so the layout looks as intended."));
    else if (step && step.reset > 1)
      lines.push(t("{n} own values were reset so the layout looks as intended.", { n: step.reset }));
    if (step && step.chips) lines.push(t(CHIP_NOTES[step.chips]));
    return html`${lines.length
        ? html`<div class="info inline-action layout-reset">
            <span>${lines.map((l, i) => html`${i ? html`<br />` : ""}${l}`)}</span>
            <span class="inline-action-btns">
              ${btn("Undo", this._undoLayoutSwitch)} ${step.chips ? btn("Change", this._askAboutChips, true) : ""}
            </span>
          </div>`
        : ""}
      ${step && step.ask === "keep"
        ? html`<div class="info inline-action layout-ask" data-step="keep">
            <span>${t("Keep your own chips? Without them the card shows the chips of the layout.")}</span>
            <span class="inline-action-btns">
              ${btn("Keep", this._keepOwnChips)} ${btn("Use the layout's chips", this._dropOwnChips, true)}
            </span>
          </div>`
        : ""}
      ${step && step.ask === "arrange"
        ? html`<div class="info inline-action layout-ask" data-step="arrange">
            <span
              >${t("Arrange them for the layout? Your chips join the chips of the layout and take the look of its chip row.")}</span
            >
            <span class="inline-action-btns">
              ${btn("Arrange", this._arrangeOwnChips)} ${btn("Keep positions", this._keepChipPositions, true)}
            </span>
          </div>`
        : ""}
      ${ownChips
        ? html`<div class="info inline-action layout-chips">
            <span>${t("Your own chips replace the chips of this layout.")}</span>
            ${btn("Change", this._askAboutChips)}
          </div>`
        : ""}`;
  }
  _panel(id, icon, title, sub, body) {
    return html`<ha-expansion-panel
      outlined
      data-panel=${id}
      .expanded=${this._openPanel === id}
      @expanded-changed=${this._onPanelExpandedChanged}
    >
      <div slot="header" class="panel-header">
        <ha-icon icon=${icon}></ha-icon>
        <div class="panel-title">
          <span>${t(title)}</span>
          <span class="panel-sub">${t(sub)}</span>
        </div>
      </div>
      ${body}
    </ha-expansion-panel>`;
  }
  // Sensors that report a rain rate (mm/h or in/h). The picker shows only these.
  _precipitationSensors() {
    const states = (this.hass && this.hass.states) || {};
    const current = (this._config && this._config.precipitation_entity) || "";
    const cache = this._precipCache;
    if (cache && cache.states === states && cache.current === current)
      return cache.list;
    const list = Object.keys(states).filter(
      (id) =>
        id.startsWith("sensor.") &&
        isRainRateUnit(
          states[id] &&
            states[id].attributes &&
            states[id].attributes.unit_of_measurement,
        ),
    );
    if (current && !list.includes(current)) list.push(current);
    this._precipCache = { states, current, list };
    return list;
  }
  // Sensors that fit one of your own readings. The current choice always stays
  // in the list, so a sensor that changed its unit can still be cleared.
  _ownSensors(field) {
    const states = (this.hass && this.hass.states) || {};
    const current = (this._config && this._config[field]) || "";
    this._ownSensorCache = this._ownSensorCache || {};
    const cache = this._ownSensorCache[field];
    if (cache && cache.states === states && cache.current === current)
      return cache.list;
    const fits = OWN_SENSOR_FILTERS[field];
    const list = Object.keys(states).filter((id) => {
      if (!id.startsWith("sensor.")) return false;
      const a = (states[id] && states[id].attributes) || {};
      return fits(String(a.unit_of_measurement || "").trim(), a.device_class || "", states[id] && states[id].state);
    });
    if (current && !list.includes(current)) list.push(current);
    this._ownSensorCache[field] = { states, current, list };
    return list;
  }
  _renderOwnSensors() {
    const fields = ["precipitation_entity", ...Object.keys(OWN_SENSOR_FILTERS)];
    const open = fields.some((f) => this._config && this._config[f]);
    const picker = (name, include) => ({
      name,
      selector: { entity: { domain: "sensor", include_entities: include } },
    });
    return html`<details class="disclosure own-sensors" ?open=${open}>
      <summary>
        <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
        <ha-icon icon="mdi:weather-cloudy-arrow-right"></ha-icon>
        <span>${t("Your own sensors (optional)")}</span>
      </summary>
      <div class="disclosure-body">
        ${this._renderIntro(
          "own_sensors",
          "Each sensor replaces one value of the weather entity: rain sets the amount of rain and snow, wind moves the sky and the compass, temperature, humidity and dew point bring mist, cloud cover and visibility shape the clouds and the haze.",
          "weather-data.html#your-own-sensors",
        )}
        <div class="info">
          ${t("Empty fields and unavailable sensors use the weather entity. The weather itself (sunny, rain, storm) always comes from it.")}
        </div>
        ${this._renderForm(
          fields.map((f) =>
            picker(f, f === "precipitation_entity" ? this._precipitationSensors() : this._ownSensors(f)),
          ),
        )}
      </div>
    </details>`;
  }
  _setColorMode(mode) {
    this._valueChanged({
      stopPropagation() {},
      detail: { value: { ...this._formData, _color_mode: mode } },
    });
  }
  _renderSunMoonPanel() {
    const mode = this._formData.celestial_position || "fixed";
    return html`${this._renderIntro(
        "sun_moon",
        "The sun entity (sun.sun) decides between day and night and provides the elevation for twilight, blue hour and sun rays. With “Fixed” the sun or moon stays where you put it.",
        "appearance.html#sun--moon",
      )}
      ${this._renderForm([
        { name: "sun_entity", selector: { entity: { domain: "sun" } } },
        {
          name: "moon_phase_entity",
          selector: { entity: { domain: "sensor" } },
        },
      ])}
      ${this._renderGroup(
        "Position & size",
        html`<div class="settings-group">
            <div class="segmented" role="radiogroup">
              ${[
                { v: "fixed", l: "Fixed" },
                { v: "dynamic_sun", l: "Moving sun" },
                { v: "dynamic_both", l: "Moving sun & moon" },
              ].map(
                (o) =>
                  html`<button
                    type="button"
                    role="radio"
                    class=${mode === o.v ? "active" : ""}
                    data-field="celestial_position"
                    data-value=${o.v}
                    @click=${this._onSegmentedFieldSelect}
                  >
                    ${t(o.l)}
                  </button>`,
              )}
            </div>
            <div class="composite-helper">
              ${t(
                "“Moving” follows the real position of the sun throughout the day.",
              )}
            </div>
          </div>
          ${mode === "fixed" || mode === "dynamic_sun"
            ? html`<div class="field-group">
                ${this._renderPositionGrid(
                  "celestial_alignment",
                  POSITION_GRIDS.celestial_alignment,
                )}
                ${this._renderCelestialOffsetPicker()}
              </div>`
            : ""}
          ${this._renderSlider(
            "celestial_size",
            t(LABELS.celestial_size),
            20,
            200,
            1,
          )}`,
      )}`;
  }
  _renderCardPanel() {
    const c = this._formData;
    const immersive = (c.card_style || "standalone") !== "standalone";
    return html`${this._section(
        "style",
        "mdi:card-outline",
        "Style & size",
        "With its own sky or as a header, height and padding",
        html`${this._renderIntro(
            "appearance",
            "In the “Immersive” style the card has no sky or background of its own and works as a dashboard header. Full width and edge fades are only available there.",
            "appearance.html#appearance",
          )}
          ${this._renderCardStyleSegmented()}
          ${this._renderToggleGroup([
            { key: "card_square", label: LABELS.card_square },
            { key: "card_hide_text", label: LABELS.card_hide_text },
          ])}`,
      )}
      ${this._section(
        "colors",
        "mdi:palette-outline",
        "Colors",
        "Light or dark look and color filters",
        html`<div class="settings-group">
            <div class="settings-group-label">${t("Color mode")}</div>
            <div class="segmented" role="radiogroup" aria-label=${t("Color mode")}>
              ${OPT.color_mode.map(
                (o) =>
                  html`<button
                    type="button"
                    role="radio"
                    class=${c._color_mode === o.value ? "active" : ""}
                    @click=${() => this._setColorMode(o.value)}
                  >
                    ${t(o.short)}
                  </button>`,
              )}
            </div>
            <div class="composite-helper">
              ${t(
                (OPT.color_mode.find((o) => o.value === c._color_mode) || {})
                  .label || "",
              )}
            </div>
          </div>
          ${c._color_mode === "entity"
            ? this._renderForm([
                { name: "theme_entity", selector: { entity: {} } },
              ])
            : ""}
          ${this._renderForm([
            {
              name: "card_filter_clouds",
              selector: {
                select: { mode: "dropdown", options: tOpts(OPT.card_filter_clouds) },
              },
            },
            {
              name: "card_filter_sun",
              selector: {
                select: { mode: "dropdown", options: tOpts(OPT.card_filter_sun) },
              },
            },
          ])}`,
      )}
      ${this._section(
        "position",
        "mdi:arrange-bring-forward",
        "Position & layers",
        immersive
          ? "Full width, edge fades, stacking and offset"
          : "Stacking order and offset",
        html`${immersive
            ? this._renderToggleGroup([
                { key: "card_full_width", label: LABELS.card_full_width },
                { key: "card_mask_vertical", label: LABELS.card_mask_vertical },
                {
                  key: "card_mask_horizontal",
                  label: LABELS.card_mask_horizontal,
                },
              ])
            : ""}
          ${this._renderSlider(
            "card_stack_order",
            t(LABELS.card_stack_order),
            -10,
            10,
            1,
            t(HELPERS.card_stack_order),
          )}
          ${this._renderOffsetPicker()}`,
      )}
      ${this._section(
        "tap",
        "mdi:gesture-tap",
        "Tap action",
        "What happens when the card is tapped",
        this._renderForm([
          { name: "card_tap_action", selector: { ui_action: {} } },
        ]),
      )}
      ${this._section(
        "css",
        "mdi:language-css3",
        "Own CSS",
        "Your own styles inside the card",
        html`${this._renderIntro(
            "css",
            "Works like card_mod, but built in: the styles go straight into the card. Use :host for the whole card, CSS variables such as --awc-bottom-font-size, or the parts like .chip and #chips-row.",
            "appearance.html#own-css",
          )}
          ${this._renderForm([
            { name: "css", selector: { text: { multiline: true } } },
          ])}`,
      )}`;
  }
  // Everything drawn in the sky, one section per topic.
  _renderSkyPanel() {
    const cfg = this._config || {};
    const c = this._formData;
    const preset = perfPreset(cfg);
    const num = (k) => {
      const n = typeof cfg[k] === "number" ? cfg[k] : parseFloat(cfg[k]);
      return Number.isFinite(n) ? n : preset[k];
    };
    const effectsOff = num("perf_effects") < 1;
    const fauna = num("perf_fauna");
    const birdsOn = fauna >= 1 && cfg.fauna_birds !== false;
    const planesOn = fauna >= 2 && cfg.fauna_planes !== false;
    return html`${this._section(
        "sun_moon",
        "mdi:theme-light-dark",
        "Sun & moon",
        "Day and night, moon phase, position and size",
        this._renderSunMoonPanel(),
      )}
      ${this._section(
        "light",
        "mdi:weather-sunset-up",
        "Light & clouds",
        "Blue and golden hour, sun rays, haze, mist and frost",
        html`${effectsOff
            ? html`<div class="info">
                ${t(
                  "Effect Quality is Off: sun rays, haze, ground mist and frost are not drawn. Blue hour, golden hour and cloud amount still work.",
                )}
              </div>`
            : ""}
          <div class="toggle-group">
            ${[
              "effect_blue_hour",
              "effect_golden_hour",
              "effect_sun_rays",
              "effect_haze",
              "effect_ground_mist",
              "effect_frost",
              "effect_cloud_coverage",
            ].map((k) => this._renderSwitch(k, true))}
          </div>`,
      )}
      ${this._section(
        "wind",
        "mdi:weather-windy",
        "Wind",
        "Wind lines, leaves and the compass",
        html`<div class="settings-group">
            <div class="settings-group-label">${t(LABELS.wind_style)}</div>
            <div
              class="segmented"
              role="radiogroup"
              aria-label=${t(LABELS.wind_style)}
            >
              ${[
                { v: "lines", l: "Wind lines" },
                { v: "flow", l: "Flow field" },
                { v: "leaves", l: "Leaves" },
                { v: "off", l: "Off" },
              ].map(
                (o) =>
                  html`<button
                    type="button"
                    role="radio"
                    class=${(cfg.wind_style || "lines") === o.v
                      ? "active"
                      : ""}
                    data-field="wind_style"
                    data-value=${o.v}
                    @click=${this._onSegmentedFieldSelect}
                  >
                    ${t(o.l)}
                  </button>`,
              )}
            </div>
            <div class="composite-helper">${t(HELPERS.wind_style)}</div>
          </div>
          ${cfg.wind_style === "leaves"
            ? html`<div class="indent">
                ${this._renderSlider(
                  "leaf_density",
                  t(LABELS.leaf_density),
                  0.25,
                  3,
                  0.25,
                )}
              </div>`
            : ""}
          ${this._renderForm([
            {
              name: "wind_compass",
              selector: {
                select: { mode: "dropdown", options: tOpts(OPT.wind_compass) },
              },
            },
            ...(cfg.wind_compass && cfg.wind_compass !== "off"
              ? [
                  {
                    name: "wind_compass_position",
                    selector: {
                      select: {
                        mode: "dropdown",
                        options: tOpts(OPT.wind_compass_position),
                      },
                    },
                  },
                ]
              : []),
          ])}
          ${cfg.wind_compass && cfg.wind_compass !== "off"
            ? html`<div class="toggle-group indent">
                ${this._renderSwitch("wind_compass_cardinal", true)}
                ${this._renderSwitch("wind_compass_degrees", false)}
                ${this._renderSwitch("wind_compass_speed", false)}
                ${cfg.wind_compass !== "pill"
                  ? this._renderSwitch("wind_compass_background", false)
                  : ""}
              </div>`
            : ""}
          <div class="composite-helper">
            ${t(
              "Wind direction chips can show the compass point too: open the chip under Chips, then Text ▸ Value ▸ Wind direction as.",
            )}
          </div>`,
      )}
      ${this._section(
        "precip",
        "mdi:weather-snowy-rainy",
        "Rain & snow",
        "How much falls, splashes and snow on the edge",
        html`${this._renderSlider(
            "rain_density",
            t(LABELS.rain_density),
            0.25,
            3,
            0.25,
            t(HELPERS.rain_density),
          )}
          <div class="toggle-group">
            ${this._renderSwitch("effect_rain_splash", true)}
          </div>
          ${this._renderSlider(
            "snow_density",
            t(LABELS.snow_density),
            0.25,
            3,
            0.25,
            t(HELPERS.snow_density),
          )}
          <div class="toggle-group">
            ${this._renderSwitch("effect_snow_edge", true)}
            ${this._renderSwitch("effect_spill", false)}
          </div>`,
      )}
      ${this._section(
        "night",
        "mdi:weather-night",
        "Night sky",
        "Stars, shooting stars and comets",
        html`${effectsOff
            ? html`<div class="info">
                ${t(
                  "Effect Quality is Off, so there are no shooting stars or comets.",
                )}
              </div>`
            : ""}
          <div class="toggle-group">
            ${this._renderSwitch("effect_shooting_stars", true)}
          </div>
          ${c.effect_shooting_stars !== false
            ? html`<div class="indent">
                ${this._renderSlider(
                  "shooting_star_rate",
                  t(LABELS.shooting_star_rate),
                  0.25,
                  3,
                  0.25,
                )}
              </div>`
            : ""}
          <div class="toggle-group">
            ${this._renderSwitch("effect_comets", true)}
          </div>
          ${c.effect_comets !== false
            ? html`<div class="indent">
                ${this._renderSlider(
                  "comet_rate",
                  t(LABELS.comet_rate),
                  0.25,
                  3,
                  0.25,
                  t(HELPERS.comet_rate),
                )}
              </div>`
            : ""}
          ${this._renderSlider(
            "star_animation_speed",
            t(LABELS.star_animation_speed),
            0.0,
            2.0,
            0.1,
          )}`,
      )}
      ${this._section(
        "fauna",
        "mdi:bird",
        "Birds & planes",
        "How often they fly and how fast",
        html`<div class="sub-box">
            <label class="toggle-row sub-box-head">
              <span
                ><ha-icon icon="mdi:bird"></ha-icon> ${t("Birds")}</span
              >
              <ha-switch
                data-fauna="birds"
                .checked=${birdsOn}
                @change=${this._onFaunaToggle}
              ></ha-switch>
            </label>
            ${birdsOn
              ? html`${this._renderSlider(
                  "fauna_bird_density",
                  t("Frequency"),
                  0.5,
                  2.0,
                  0.1,
                )}
                ${this._renderSlider(
                  "bird_animation_speed",
                  t("Speed"),
                  0.0,
                  3.0,
                  0.1,
                  t(HELPERS.bird_animation_speed),
                )}
                ${this._renderSlider(
                  "fauna_bird_flock_size",
                  t("Birds per flock"),
                  1,
                  20,
                  1,
                )}
                <div class="toggle-group">
                  ${this._renderSwitch("fauna_birds_at_night", true)}
                </div>`
              : ""}
          </div>
          <div class="sub-box">
            <label class="toggle-row sub-box-head">
              <span
                ><ha-icon icon="mdi:airplane"></ha-icon> ${t("Planes")}</span
              >
              <ha-switch
                data-fauna="planes"
                .checked=${planesOn}
                @change=${this._onFaunaToggle}
              ></ha-switch>
            </label>
            ${planesOn
              ? html`${this._renderSlider(
                  "fauna_plane_density",
                  t("Frequency"),
                  0.5,
                  2.0,
                  0.1,
                )}
                ${this._renderSlider(
                  "fauna_plane_speed",
                  t("Speed"),
                  0.25,
                  3,
                  0.05,
                  t(HELPERS.fauna_plane_speed),
                )}`
              : ""}
          </div>`,
      )}
`;
  }
  _renderImagePanel() {
    const c = this._formData;
    // image_day: none means no picture, not a file called none.
    const pic = (v) => (v && String(v).trim().toLowerCase() !== "none" ? v : "");
    const thumb = (field) =>
      html`<div class="image-thumb">
        <div
          class="image-thumb-pic ${pic(c[field]) ? "has" : ""}"
          style=${pic(c[field]) ? `background-image:url("${cssUrl(c[field])}")` : ""}
        >
          ${pic(c[field]) ? "" : t("No image")}
        </div>
        ${this._renderClearableText(field)}
      </div>`;
    const [v, h] = (c.image_alignment || "top-right").split("-");
    const vPos = v === "top" ? "top" : v === "bottom" ? "bottom" : "middle";
    const hPos = (h || v) === "left" ? "left" : (h || v) === "right" ? "right" : "center";
    const rawScale = parseFloat(c.image_scale);
    const scale = Math.max(0, Math.min(200, Number.isFinite(rawScale) ? rawScale : 100));
    // Home without an own picture shows the bundled house: its placement and
    // blend can be set like for an own picture.
    const src =
      pic(c.image_day) ||
      pic(c.image_night) ||
      (c.image_folder
        ? folderImageCandidates(c.image_folder, c.image_folder_type, "sunny", false)[0]
        : "") ||
      (usesBundledHouse(this._config) ? houseImages("").image_day : "");
    return html`${this._renderIntro(
        "image",
        "Put your images in /config/www/ and enter them as /local/house-day.png. Transparent PNGs look best. Without a night image the day image is used.",
        "images.html#custom-images",
      )}
      ${String(c.card_layout || "").toLowerCase() === "home" &&
      !hasOwnImage(c) &&
      String(c.image_day || "").trim().toLowerCase() !== "none"
        ? html`<div class="info">${t("Home shows the house that comes with the card, wet in the rain and snowy in the snow, until you enter your own picture. Enter none as the day image for no picture.")}</div>`
        : ""}
      <div class="image-thumbs">
        ${thumb("image_day")} ${thumb("image_night")}
      </div>
      ${src
        ? this._section(
            "image_time",
            "mdi:theme-light-dark",
            "Day & night",
            "When the night image shows, and the fade between images",
            html`${this._renderForm([
                {
                  name: "image_night_source",
                  selector: {
                    select: { mode: "dropdown", options: tOpts(OPT.image_night_source) },
                  },
                },
              ])}
              ${this._renderSlider(
                "image_transition",
                t(LABELS.image_transition),
                0,
                5,
                0.1,
                t(HELPERS.image_transition),
              )}`,
          )
        : ""}
      ${src
        ? this._section(
            "image_place",
            "mdi:image-move",
            "Placement",
            "Where the image sits and how big it is",
            html`<div class="image-place">
                ${this._renderPositionGrid(
                  "image_alignment",
                  POSITION_GRIDS.image_alignment,
                )}
                <div class="image-preview" aria-hidden="true">
                  <div
                    class="image-preview-img v-${vPos} h-${hPos}"
                    style="height:${scale}%;background-image:url(&quot;${cssUrl(
                      src,
                    )}&quot;)"
                  ></div>
                </div>
              </div>
              ${this._renderSlider(
                "image_scale",
                t(LABELS.image_scale),
                0,
                200,
                1,
                t(HELPERS.image_scale),
              )}
              ${this._renderSlider(
                "image_max_width",
                t(LABELS.image_max_width),
                0,
                100,
                1,
                t(HELPERS.image_max_width),
              )}
              ${this._renderImageOffsetPicker()}`,
          )
        : ""}
      ${this._section(
        "image_folder",
        "mdi:folder-image",
        "Pictures by weather",
        "A folder with one picture per weather state",
        html`${this._renderIntro(
            "image_folder",
            "Name the pictures after the weather state: sunny, partlycloudy, cloudy, fog, rainy, pouring, lightning, lightning-rainy, snowy, snowy-rainy, hail, windy, clear-night, exceptional. Add -night for the night picture, like rainy-night. A missing picture falls back to a close one (pouring to rainy) and then to the images above. Every missing file shows once as a 404 in the browser console.",
            "images.html#image-folder",
          )}
          ${this._renderForm([
            { name: "image_folder", selector: { text: {} } },
            ...(c.image_folder
              ? [
                  {
                    name: "image_folder_type",
                    selector: { select: { mode: "dropdown", options: OPT.image_folder_type } },
                  },
                ]
              : []),
          ])}`,
      )}
      ${this._section(
        "image_states",
        "mdi:image-multiple-outline",
        "Images by state",
        "Other pictures for snow, rain or an open door",
        this._renderImageStatesPanel(),
      )}
`;
  }
  _renderImageStatesPanel() {
    const c = this._formData;
    // The older single status entity: only for cards that already use it.
    const legacy = c.status_entity
      ? this._renderGroup(
          "Status entity",
          html`<div class="status-sentence">
              ${t("When this entity is on, open or home, the card shows other images:")}
            </div>
            ${this._renderForm(this._imageStatusSchema())}
            <div class="composite-helper">
              ${t("Checked before the list below.")}
            </div>`,
        )
      : "";
    return html`${this._renderIntro(
        "image_states",
        "Show another picture while an entity has a certain state, for example snow on the roof, a wet house in the rain or the open garage door. The first entry that matches wins; without a match the normal images stay.",
        "images.html#image-conditions",
      )}
      ${legacy}
      ${this._renderImageConditions()}`;
  }
  _renderCardsPanel() {
    return html`${this._renderIntro(
        "cards",
        "Add any Home Assistant card, for example an entities or history card. The cards are shown on top of the sky. Grids and stacks work too.",
        "appearance.html#embedded-cards",
      )}
      ${this._renderPositionGrid(
        "custom_cards_position",
        POSITION_GRIDS.custom_cards_position,
      )}
      ${this._renderCustomCardsEditor()}
      ${this._renderDisclosure(
        "Advanced options",
        this._renderClearableText("custom_cards_css_class"),
      )}`;
  }
  _renderChipsPanel() {
    const c = this._formData;
    if (c.card_hide_text === true)
      return html`<div class="info inline-action">
        <span
          >${t(
            "Chips are hidden by Hide all text under Card, Style & size. Your settings are kept.",
          )}</span
        >
        <button
          type="button"
          class="inline-action-btn"
          data-field="card_hide_text"
          @click=${this._onClearFieldClick}
        >
          ${t("Show again")}
        </button>
      </div>`;
    return html`${this._renderIntro(
        "chips",
        "A chip shows one value, for example the temperature, the wind or tomorrow's forecast. All chips share one area whose position and layout you set below. Single chips can be placed freely.",
        "chips.html#chips-in-the-editor",
      )}
      ${this._renderChipsEditor()}`;
  }
  updated() {
    // Controls that show a layout's value turn grey.
    for (const el of this.renderRoot.querySelectorAll("[data-field]")) {
      const from = this._fromLayout(el.dataset.field);
      if (el.classList.contains("from-layout") !== from) el.classList.toggle("from-layout", from);
      if (from) el.title = el.title || t("From the layout");
    }
  }
  render() {
    if (!this.hass || !this._config) return html``;
    useLanguage(this.hass);
    return html`${this._renderForm([
        { name: "weather_entity", selector: { entity: { domain: "weather" } } },
      ])}
      ${this._renderOwnSensors()}
      ${this._panel(
        "layouts",
        "mdi:view-dashboard-outline",
        "Layouts",
        "A finished look with one tap",
        this._renderLayoutsPanel(),
      )}
      ${this._panel(
        "card",
        "mdi:card-outline",
        "Card",
        "Style, size, colors, position and tap action",
        this._renderCardPanel(),
      )}
      ${this._panel(
        "chips",
        "mdi:label-multiple-outline",
        "Chips",
        "Small info tiles with sensor values or the forecast",
        this._renderChipsPanel(),
      )}
      ${this._panel(
        "sky",
        "mdi:weather-partly-cloudy",
        "Sky & weather",
        "Sun and moon, light, wind, rain and snow, night sky, birds",
        this._renderSkyPanel(),
      )}
      ${this._panel(
        "image",
        "mdi:image-outline",
        "Images",
        "Your own picture for day and night, also by state",
        this._renderImagePanel(),
      )}
      ${this._panel(
        "cards",
        "mdi:card-multiple-outline",
        "Embedded cards",
        "Other Home Assistant cards inside this card",
        this._renderCardsPanel(),
      )}
      ${this._panel(
        "performance",
        "mdi:speedometer",
        "Performance",
        "Preset, frame rate, detail and speed",
        this._renderPerformancePanel(),
      )}`;
  }
}
// Every fixed text of the editor, for the translation tests.
export const EDITOR_TEXT_TABLES = Object.freeze({
  LABELS,
  HELPERS,
  CHIP_LABELS,
  CHIP_HELPERS,
  OPT,
  FC_ATTRIBUTES,
});
if (!customElements.get("atmo-weather-card-editor")) {
  customElements.define(
    "atmo-weather-card-editor",
    AtmosphericWeatherCardEditor,
  );
}
