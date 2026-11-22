/**
 * ATMO WEATHER CARD
 */
import {
  advanceWindAndPulse,
  CloudShapeGenerator,
  cometColors,
  cometRate,
  drawBirds,
  planeSpeedForScale,
  drawCelestialClouds,
  drawComets,
  drawClouds,
  drawFog,
  drawHail,
  drawLightning,
  drawMoon,
  drawPlanes,
  drawRain,
  drawShootingStars,
  drawStars,
  drawSnow,
  drawWindVapor,
  renderAnimationFrame,
  shouldSkipFrame,
  trailPoints,
  TWO_PI,
  fillCircle,
  hslToRgb,
} from "./atmo-weather-animations.js";
import {
  adjustParams,
  computeAtmosphere,
  mergeWeatherSensors,
  readWeatherData,
  SENSOR_OPTIONS,
  windSpeedKmh,
} from "./atmo-weather-atmosphere.js";
import {
  applyCardLayout,
  areaTwoConfig,
  chipArea,
  WIDE_MIN_WIDTH,
  CONFIG_DEFAULTS,
  migrateConfig,
  readFlag,
  readNumber,
} from "./atmo-weather-config.js";
import { checkConditions, conditionNeeds } from "./atmo-weather-conditions.js";
import { FOLDER_BASE, folderImageCandidates } from "./atmo-weather-folder.js";
import {
  FrostLayer,
  frostLevel,
  FROST_GROW_PER_S,
  FROST_REDRAW_MS,
  FROST_THAW_PER_S,
} from "./atmo-weather-frost.js";
import { curveHeight, curveMarkup, curveMode, toCelsius } from "./atmo-weather-curve.js";
let _curveIds = 0;
import {
  ATMOSPHERE_CSS,
  BAD_WEATHER_TYPES,
  CELESTIAL_CLOUD_PALETTES,
  CLOUD_ATLAS_MAX,
  CLOUD_ATLAS_SIZE_DEFAULT,
  CLOUD_PALETTES,
  CLOUD_TYPES,
  CONTRAIL_OFFSETS,
  FALLBACK_WEATHER,
  FILTER_PRESETS,
  FORECAST_ATTR_ICONS,
  LIGHT_BAD_BOOST_TYPES,
  LIMITS,
  MOON_CRATERS,
  MOON_PHASES,
  MOON_STYLE_COLORS,
  NIGHT_MODES,
  OVERCAST_STATES,
  PARTICLE_ARRAYS,
  PERFORMANCE_CONFIG,
  PERF_PRESETS,
  PLANE_PATH,
  POS_CLASSES,
  STAR_PALETTE_GLOW,
  STAR_PALETTE_GOLDEN,
  STAR_TIER_PROPS,
  STORM_TYPES,
  SUN_LIGHT,
  TRAIL_CAP_COMET,
  TRAIL_CAP_PLANE,
  TRAIL_CAP_SHOOTING_STAR,
  WEATHER_ATTR_ICONS,
  WEATHER_CLASSES,
  WEATHER_ICONS,
  WEATHER_MAP,
  _FC_UNIT_FALLBACK,
  _FC_UNIT_MAP,
} from "./atmo-weather-data.js";
import {
  applyCompassAngle,
  COMPASS_STYLES,
  compassLabel,
  COMPASS_MIN_SCALE,
  compassMarkup,
  compassPoint,
  BEARING_ICONS,
  bearingIconSvg,
  formatBearingValue,
  isBearingChip,
  resolveCompassPosition,
  compassCandidates,
  COMPASS_POSITIONS,
  isFullWidth,
  wholeRow,
  unwrapAngle,
} from "./atmo-weather-compass.js";
import { editorLanguage, makeTranslator } from "./atmo-weather-i18n.js";
import { sunPathState, sunPathSvg, sunPathTime } from "./atmo-weather-sunpath.js";
import {
  buildImageRules,
  computeGauge,
  escapeHtml,
  escapeHtmlAttr,
  fcFilterPast,
  fcFingerprint,
  fcLabel,
  formatDateCodes,
  hasDateCodes,
  moonPhaseAt,
  timeFormatOptions,
  forecastUnavailableText,
  imageMaxWidth,
  cssLengths,
  layoutChipLabel,
  imageRuleMatches,
  imageRuleValue,
  loadFigtreeFont,
  parseAnchor,
  parseCSSVal,
  resolveBackgroundStyle,
  stripTrailingUnit,
  thresholdSig,
} from "./atmo-weather-helpers.js";
import { buildStyles } from "./atmo-weather-styles.js";
import {
  MAX_DENSITY,
  precipCounts,
  rainKind,
  setupDrop,
  setupFlake,
} from "./atmo-weather-precip.js";

// Injected by build.mjs from package.json.
const CARD_VERSION =
  typeof __AWC_VERSION__ === "string" ? __AWC_VERSION__ : "dev";
// Fingerprint of the editor bundle, injected by build.mjs: the editor URL
// changes whenever the editor does, so no browser keeps an old one.
const EDITOR_HASH =
  typeof __AWC_EDITOR_HASH__ === "string" ? __AWC_EDITOR_HASH__ : CARD_VERSION;
console.info(
  `%c ATMO WEATHER CARD ${CARD_VERSION} `,
  "color: white; font-weight: 700; background: linear-gradient(90deg, #355C7D 0%, #6C5B7B 50%, #C06C84 100%); padding: 6px 12px; border-radius: 6px; font-family: sans-serif; letter-spacing: 0.5px; text-shadow: 0 1px 2px rgba(0,0,0,0.2);",
);
try {
  CSS.registerProperty({
    name: "--awc-ring-pct",
    syntax: "<percentage>",
    inherits: true,
    initialValue: "0%",
  });
} catch (_) {}
// Weather attributes behind the measured effects, see atmo-weather-atmosphere.js.
const atmoSignature = (a) =>
  [a.cloud_coverage, a.visibility, a.humidity, a.dew_point].join("|");
// Blur radius in atlas pixels used while baking clouds, see _cloudBakeFilter.
const CLOUD_BAKE_SMOOTH = 1.35;
// Share of the card width the ring of drifting clouds extends beyond the card.
const CLOUD_RING_OVERHANG = 0.3;
// How far rain and snow fall below the card with effect_spill, in CSS px.
const SPILL_HEIGHT = 90;

// A new card: the weather entity, the sun, the moon phase when there is a
// sensor for it, and a layout.
function stubConfig(weatherEntity, hass, layout) {
  const moon =
    hass && hass.states
      ? Object.keys(hass.states).find((e) => e === "sensor.moon_phase" || /^sensor\..*moon_phase/.test(e))
      : undefined;
  return {
    weather_entity: weatherEntity,
    sun_entity: "sun.sun",
    ...(moon ? { moon_phase_entity: moon } : {}),
    theme_entity: "sun.sun",
    card_layout: layout,
  };
}
// Breathing moves each puff by up to this share of its radius.
const CLOUD_BREATH_AMOUNT = 0.04;
// Puffs re-baked per frame while clouds breathe, see _processPendingCloudBakes.
const CLOUD_REBAKE_PUFFS_PER_FRAME = 120;
// Forecast helpers
const _fcCache = new Map(); // module-level: survives HA editor destroy/recreate cycles
// Picture folder: which files exist (true/false), and probes still loading.
// Shared by all cards, each file is asked once per page load.
const _folderSeen = new Map();
const _folderWait = new Map();
class AtmosphericWeatherCard extends HTMLElement {
  // CONSTRUCTOR & LIFECYCLE
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._animID = null;
    this._lastFrameTime = 0;
    this._frameScale = 1;
    this._boundAnimate = this._animate.bind(this);
    for (const key of PARTICLE_ARRAYS) this[key] = [];
    this._params = WEATHER_MAP["default"];
    this._flashOpacity = 0;
    this._flashHold = 0;
    this._isTimeNight = false;
    this._isThemeDark = false;
    this._lastState = null;
    this._stateInitialized = false;
    this._hasReceivedFirstHass = false;
    this._renderState = null;
    this._celestialSize = null;
    this._moonPhaseState = "full_moon";
    this._moonPhaseConfig = MOON_PHASES["full_moon"];
    this._windGust = 0;
    this._gustPhase = 0;
    this._windSpeed = 0.1;
    this._animationSpeed = 1.0;
    this._birdAnimationSpeed = 0.3;
    this._starAnimationSpeed = 0.5;
    this._windKmh = 0;
    // Screen direction of the wind, -1 left to 1 right, eased on a turn.
    this._windDir = null;
    this._windDirTarget = 1;
    this._microGustPhase = 0;
    this._layerFadeProgress = {
      stars: 1,
      clouds: 1,
      precipitation: 1,
      effects: 1,
    };
    this._sunPulsePhase = 0;
    this._initialized = false;
    this._initializationComplete = false;
    this._isVisible = false;
    this._intersectionObserver = null;
    this._renderGate = {
      hasValidDimensions: false,
      hasFirstHass: false,
      isRevealed: false,
    };
    this._resizeDebounceTimer = null;
    this._pendingResize = false;
    this._needsReinit = false;
    this._cachedDimensions = { width: 0, height: 0, dpr: 1 };
    this._perfCloudRes = CLOUD_ATLAS_SIZE_DEFAULT;
    this._perfFps = 30;
    this._perfCloudQuality = 1.5;
    this._perfEffects = 1;
    this._perfFauna = 2;
    this._cloudSunAngleLighting = false;
    this._cloudBreathingShapes = false;
    this._lastSunAngleBucket = null;
    this._lastBakeTime = null;
    this._pendingCloudBakes = new Set();
    this._pendingBakeRequested = false;
    this._pendingBakeTimer = null;
    this._cloudBreathingTimer = null;
    this._faunaBirdsAtNight = true;
    this._perfDpr = PERFORMANCE_CONFIG.MAX_DPR;
    this._lastInitWidth = 0;
    this._lastLocStr = null;
    this._lastSnapshot = null;
    this._prevStyleSig = this._prevPosSig = this._prevCcSig = null;
    this._lastRowSigs = null;
    this._entityErrors = new Map();
    this._lastErrorLog = 0;
    this._customCardElements = [];
    this._hass = null;
    this._prevCustomCssClasses = null;
    this._boundVisibilityChange = this._handleVisibilityChange.bind(this);
    this._boundTap = this._handleTap.bind(this);
    this._fcData = new Map(_fcCache);
    this._fcSubs = new Map();
    this._precisionFmtCache = null;
  }
  get _isLightBackground() {
    return !this._isThemeDark;
  }
  get _isNight() {
    return this._isTimeNight;
  }
  get _isImmersive() {
    return (
      (this._config.card_style || CONFIG_DEFAULTS.card_style) === "immersive"
    );
  }
  get _isDarkDayImmersive() {
    return this._isImmersive && this._isThemeDark && !this._isTimeNight;
  }
  // HOME ASSISTANT LIFECYCLE
  connectedCallback() {
    loadFigtreeFont();
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver((entries) => {
        if (!entries.length) return;
        // Use borderBoxSize to capture the full visual dimension including
        // padding. contentRect strips padding, which breaks full-width mode
        // where negative margins + positive padding create edge-to-edge bleed.
        const { inlineSize, blockSize } = entries[0].borderBoxSize[0];
        // The wide layout turns into the standard one on a narrow card.
        if (this._layoutNeedsWidth(inlineSize)) {
          this._layoutWidth = inlineSize;
          this.setConfig(this._sourceConfig);
        }
        this._layoutWidth = inlineSize;
        const changed = this._updateCanvasDimensions(inlineSize, blockSize);
        this._scheduleCurve();
        this._scheduleCompassFit();
        if (!this._initializationComplete) {
          this._tryInitialize();
        } else if (changed) {
          this._scheduleParticleReinit();
        }
      });
    }
    if (!this._intersectionObserver) {
      this._intersectionObserver = new IntersectionObserver(
        this._boundVisibilityChange,
        {
          threshold: PERFORMANCE_CONFIG.VISIBILITY_THRESHOLD,
          rootMargin: "200px",
        },
      );
    }
    if (this._elements && this._elements.root) {
      this._resizeObserver.observe(this._elements.root);
      this.addEventListener("click", this._boundTap);
      this._intersectionObserver.observe(this._elements.root);
    }
    if (this._initializationComplete) {
      this._startAnimation();
      this._configureCloudBreathingTimer();
    } else if (this._renderGate.hasFirstHass) {
      this._tryInitialize();
    }
    // disconnectedCallback ends all forecast subscriptions.
    this._syncFc();
    this._watchVisibility();
  }
  // Chip conditions on the screen size or the clock change without a state
  // change, so the card listens to those itself.
  _watchVisibility() {
    this._unwatchVisibility();
    const needs = this._visNeeds;
    if (!needs) return;
    const refresh = () => {
      if (!this._hass) return;
      const vis = this._chipVisibility(this._hass).join();
      if (this._chipVis && vis === this._chipVis.join()) return;
      this._lastSnapshot = null;
      this.hass = this._hass;
    };
    this._visQueries = [];
    if (typeof matchMedia === "function") {
      for (const q of needs.queries) {
        try {
          const mql = matchMedia(q);
          if (mql && mql.addEventListener) {
            mql.addEventListener("change", refresh);
            this._visQueries.push(mql);
          }
        } catch (e) {
          // A broken media query simply never matches.
        }
      }
    }
    this._visRefresh = refresh;
    if (needs.time) {
      // Every full minute, the way time conditions are written.
      const tick = () => {
        refresh();
        this._visTimer = setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
      };
      this._visTimer = setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
    }
    // The screen or the clock may have changed while the card was away (Home
    // Assistant moves cards between columns when the window is resized).
    if (this._visQueries.length || needs.time) refresh();
  }
  _unwatchVisibility() {
    if (this._visQueries)
      for (const mql of this._visQueries)
        mql.removeEventListener("change", this._visRefresh);
    this._visQueries = [];
    if (this._visTimer) clearTimeout(this._visTimer);
    this._visTimer = null;
  }
  disconnectedCallback() {
    this._stopAnimation();
    this._finishImageFade();
    // An image still loading is dropped; the next hass update asks again.
    this._imgToken = (this._imgToken || 0) + 1;
    this._imgPending = null;
    if (this._resizeObserver) this._resizeObserver.disconnect();
    if (this._intersectionObserver) this._intersectionObserver.disconnect();
    if (this._marqueeObserver) this._marqueeObserver.disconnect();
    this._marqueeObserver = null;
    for (const unsub of this._fcSubs.values()) unsub();
    this._fcSubs.clear();
    if (this._resizeDebounceTimer) {
      clearTimeout(this._resizeDebounceTimer);
      this._resizeDebounceTimer = null;
    }
    this._clearCloudBreathingTimer();
    this._unwatchVisibility();
    if (this._pendingBakeTimer) {
      clearTimeout(this._pendingBakeTimer);
      this._pendingBakeTimer = null;
    }
    this._pendingCloudBakes.clear();
    this._isVisible = false;
    this.removeEventListener("click", this._boundTap);
    this._clearAllParticles();
    this._customCardElements = [];
    this._initializationComplete = false;
  }
  setConfig(config) {
    const previousConfig = this._config;
    const previousCloudSunAngleLighting = this._cloudSunAngleLighting;
    const previousCloudBreathingShapes = this._cloudBreathingShapes;
    // Kept so a resize can apply the layout again for the new width.
    this._sourceConfig = config;
    config = applyCardLayout(migrateConfig(config), this._layoutWidth || 0);
    const filtersChanged =
      previousConfig &&
      (previousConfig.card_filter_clouds !== config.card_filter_clouds ||
        previousConfig.card_filter_sun !== config.card_filter_sun);
    this._config = config;
    this._chips = this._deriveChips(this._config);
    this._area2Config = areaTwoConfig(this._config);
    this._visNeeds = conditionNeeds(this._chips.map((c) => c.visibility).filter(Boolean).flat());
    if (this.isConnected) this._watchVisibility();
    this._initDOM();
    this._applyOwnCss(config.css);
    if (config.card_stack_order !== undefined) {
      this.style.setProperty("--awc-stack-order", config.card_stack_order);
    } else {
      this.style.removeProperty("--awc-stack-order");
    }
    if (config.card_square) {
      this.style.height = "auto";
      this.style.minHeight = "0";
      this.style.aspectRatio = "1 / 1";
    } else if (String(config.card_height).toLowerCase() === "auto") {
      this.style.height = "100%";
      this.style.minHeight = "0";
      this.style.aspectRatio = "auto";
    } else {
      const heightConfig = config.card_height;
      const rawHeight =
        heightConfig == null || String(heightConfig).trim() === ""
          ? "200px"
          : String(heightConfig).trim();
      const cssHeight = /^-?\d+(?:\.\d+)?$/.test(rawHeight)
        ? `${rawHeight}px`
        : rawHeight;
      this.style.height = cssHeight;
      this.style.minHeight = cssHeight;
      this.style.aspectRatio = "auto";
    }
    if (this._elements && this._elements.imageSlot) {
      const slot = this._elements.imageSlot;
      const scale = config.image_scale !== undefined ? config.image_scale : 100;
      const align = (
        config.image_alignment || CONFIG_DEFAULTS.image_alignment
      ).toLowerCase();
      const padH =
        "var(--_awc-pad-h, var(--awc-card-padding, var(--ha-space-4, 16px)))";
      const padV =
        "var(--_awc-pad-v, var(--awc-card-padding, var(--ha-space-4, 16px)))";
      const [v, h] = parseAnchor(align);
      // image_max_width: the most of the card width the picture may take. The
      // whole picture shrinks (height follows its shape), so it keeps its spot.
      const maxWidth = imageMaxWidth(config.image_max_width);
      const maxW = maxWidth.endsWith("%") ? `${parseFloat(maxWidth)}cqw` : maxWidth;
      slot.style.height = maxW
        ? `min(${scale}%, calc(${maxW} / var(--_awc-img-ar, 0.0001)))`
        : `${scale}%`;
      slot.style.maxWidth = maxWidth;
      slot.style.setProperty("--_awc-img-pos", maxWidth ? `${h === "left" ? "left" : h === "center" ? "center" : "right"} bottom` : "");
      // image_x / image_y move the picture from its spot; % is of the card.
      const len = (raw) => {
        const s = raw !== undefined ? String(raw).trim() : "";
        if (!s) return "0px";
        return /[%a-z]/i.test(s) ? s : `${s}px`;
      };
      const ox = len(config.image_x),
        oy = len(config.image_y);
      slot.style.top = slot.style.bottom = slot.style.left = slot.style.right = "auto";
      const t = [];
      if (h === "left") slot.style.left = `calc(${padH} + (${ox}))`;
      else if (h === "center") {
        slot.style.left = `calc(50% + (${ox}))`;
        t.push("translateX(-50%)");
      } else slot.style.right = `calc(${padH} - (${ox}))`;
      // Positive image_y moves away from the edge the picture sits at.
      if (v === "top") slot.style.top = `calc(${padV} + (${oy}))`;
      else if (v === "center") {
        slot.style.top = `calc(50% + (${oy}))`;
        t.push("translateY(-50%)");
      } else slot.style.bottom = `calc(${padV} + (${oy}))`;
      slot.style.transform = t.join(" ");
    }
    const root = this._elements.root;
    root.classList.toggle("no-mask-v", config.card_mask_vertical === false);
    root.classList.toggle("no-mask-h", config.card_mask_horizontal === false);
    const hasTapAction =
      config.card_tap_action &&
      config.card_tap_action.action &&
      config.card_tap_action.action !== "none";
    root.classList.toggle("clickable", !!hasTapAction);
    this._imageRules = buildImageRules(config);
    const csz =
      config.celestial_size != null
        ? parseInt(config.celestial_size, 10)
        : null;
    this._celestialSize = csz && csz > 0 ? csz : null;
    this._customCardElements = [];
    this._prevCcSig = null;
    if (this._elements && this._elements.customCardsWrapper) {
      this._elements.customCardsWrapper.innerHTML = "";
      this._elements.customCardsWrapper.classList.toggle("has-cards", false);
      if (this._prevCustomCssClasses && this._prevCustomCssClasses.length)
        this._elements.customCardsWrapper.classList.remove(
          ...this._prevCustomCssClasses,
        );
      const userClasses = (config.custom_cards_css_class || "")
        .split(" ")
        .filter(Boolean);
      this._prevCustomCssClasses = userClasses.length ? userClasses : null;
      if (userClasses.length)
        this._elements.customCardsWrapper.classList.add(...userClasses);
    }
    const customCards = this._config.custom_cards;
    // Home Assistant provides loadCardHelpers; without it (another frontend)
    // the embedded cards stay empty instead of breaking the whole card.
    if (
      Array.isArray(customCards) &&
      customCards.length > 0 &&
      this._elements &&
      this._elements.customCardsWrapper &&
      typeof window.loadCardHelpers === "function"
    ) {
      this._elements.customCardsWrapper.classList.add("has-cards");
      const expectedConfig = this._config;
      window.loadCardHelpers().then((helpers) => {
        const wrapper = this._elements && this._elements.customCardsWrapper;
        if (!wrapper) return;
        if (this._config !== expectedConfig) return;
        for (const cardConfig of customCards) {
          if (!cardConfig || !cardConfig.type) continue;
          const el = helpers.createCardElement(cardConfig);
          if (cardConfig.custom_width) {
            el.style.width = cardConfig.custom_width;
            el.style.flex = "none";
          }
          if (cardConfig.custom_height !== undefined) {
            let ch = String(cardConfig.custom_height).trim();
            if (!isNaN(ch) && ch !== "") ch += "px";
            el.style.height = ch;
          }
          this._customCardElements.push(el);
          wrapper.appendChild(el);
          if (this._hass) el.hass = this._hass;
        }
      }, () => {});
    }
    this._lastSnapshot =
      this._prevRowOverflow =
      this._prevRowWidth =
      this._prevRowHeight =
      this._prevFullWidth =
      this._prevChipPad =
      this._prevContainerPad =
      this._prevChipsGap =
      this._prevChipGap =
      this._prevRowCols =
      this._prevChipAlign =
      this._prevConfigSig =
      this._prevGrouped =
      this._prevVisKey =
      this._lastFreeSig =
      this._prevCardPadding =
      this._prevCardPadParsed =
      this._prevBottomFS =
      this._prevChipNameFS =
      this._prevChipIconWidth =
      this._prevChipIconPad =
      this._prevImageOffset =
      this._prevContainerBgColor =
      this._prevChipTextGap =
        null;
    this._nativeIconCache = null;
    this._prevHadVertVis = false;
    this._area2Cache = {};
    this._syncFc();
    const preset =
      PERF_PRESETS[config.perf_mode] || PERF_PRESETS[CONFIG_DEFAULTS.perf_mode];
    this._perfMaxPixels =
      config.perf_mode === "ultra"
        ? PERFORMANCE_CONFIG.MAX_PIXELS_ULTRA
        : PERFORMANCE_CONFIG.MAX_PIXELS;
    const rawFps = config.perf_fps != null ? config.perf_fps : preset.perf_fps;
    const parsedFps = parseInt(rawFps, 10);
    this._perfFps = Number.isFinite(parsedFps)
      ? Math.max(15, Math.min(120, parsedFps))
      : 30;
    const rawCloudQuality =
      config.perf_cloud_quality != null
        ? config.perf_cloud_quality
        : preset.perf_cloud_quality;
    const parsedCloudQuality = parseFloat(rawCloudQuality);
    this._perfCloudQuality = Number.isFinite(parsedCloudQuality)
      ? Math.max(0.5, Math.min(2.0, parsedCloudQuality))
      : preset.perf_cloud_quality;
    this._perfCloudRes =
      this._perfCloudQuality <= 1.0 ? 1024 : CLOUD_ATLAS_SIZE_DEFAULT;
    const rawEffects =
      config.perf_effects != null ? config.perf_effects : preset.perf_effects;
    this._perfEffects =
      rawEffects === true
        ? 2
        : rawEffects === false
          ? 0
          : parseInt(rawEffects, 10) || 0;
    this._cloudSunAngleLighting =
      this._config.cloud_sun_angle_lighting != null
        ? this._config.cloud_sun_angle_lighting
        : this._perfEffects >= 2;
    this._cloudBreathingShapes =
      this._config.cloud_breathing_shapes != null
        ? this._config.cloud_breathing_shapes
        : this._perfEffects >= 2;
    const rawFauna =
      config.perf_fauna != null ? config.perf_fauna : preset.perf_fauna;
    this._perfFauna =
      rawFauna === true
        ? 2
        : rawFauna === false
          ? 0
          : parseInt(rawFauna, 10) || 0;
    const windStyle = String(config.wind_style ?? CONFIG_DEFAULTS.wind_style);
    this._windStyle = ["lines", "flow", "leaves", "off"].includes(windStyle)
      ? windStyle
      : CONFIG_DEFAULTS.wind_style;
    const compassStyle = String(
      config.wind_compass ?? CONFIG_DEFAULTS.wind_compass,
    );
    const compassPosition = String(
      config.wind_compass_position ?? CONFIG_DEFAULTS.wind_compass_position,
    );
    const compassTaken = this._chipCorners(config);
    this._compass = {
      // "auto" (or an unknown value): the card measures the chips and moves
      // the compass to a free place, or hides it when there is none.
      auto: !COMPASS_POSITIONS.includes(compassPosition) || compassPosition === "auto",
      candidates: compassCandidates(compassStyle, compassTaken),
      style: COMPASS_STYLES.includes(compassStyle)
        ? compassStyle
        : CONFIG_DEFAULTS.wind_compass,
      position: resolveCompassPosition(compassStyle, compassPosition, compassTaken),
      show: {
        cardinal: config.wind_compass_cardinal !== false,
        degrees: config.wind_compass_degrees === true,
        speed: config.wind_compass_speed === true,
      },
      background: config.wind_compass_background === true,
    };
    this._compassScale = null;
    this._compassNoRoom = false;
    // Rebuild the compass markup with the next update.
    this._compassSig = null;
    const rawAnimSpeed =
      config.animation_speed != null
        ? parseFloat(config.animation_speed)
        : preset.animation_speed;
    this._animationSpeed = Number.isFinite(rawAnimSpeed)
      ? Math.max(0, Math.min(3.0, rawAnimSpeed))
      : 1.0;
    const rawBirdAnimSpeed =
      config.bird_animation_speed != null
        ? parseFloat(config.bird_animation_speed)
        : preset.bird_animation_speed;
    this._birdAnimationSpeed = Number.isFinite(rawBirdAnimSpeed)
      ? Math.max(0, Math.min(3.0, rawBirdAnimSpeed))
      : 0.3;
    const rawStarAnimSpeed =
      config.star_animation_speed != null
        ? parseFloat(config.star_animation_speed)
        : preset.star_animation_speed;
    this._starAnimationSpeed = Number.isFinite(rawStarAnimSpeed)
      ? Math.max(0, Math.min(2.0, rawStarAnimSpeed))
      : 0.5;
    // Fauna amounts: the preset unless the config sets its own value.
    this._faunaBirdDensity = readNumber(
      config.fauna_bird_density,
      preset.fauna_bird_density,
      0.5,
      2.0,
    );
    this._faunaPlaneDensity = readNumber(
      config.fauna_plane_density,
      preset.fauna_plane_density,
      0.5,
      2.0,
    );
    this._faunaBirdFlockSize = Math.round(
      readNumber(
        config.fauna_bird_flock_size,
        preset.fauna_bird_flock_size,
        1,
        20,
      ),
    );
    const rawBirdsAtNight = config.fauna_birds_at_night;
    if (rawBirdsAtNight === undefined || rawBirdsAtNight === null) {
      this._faunaBirdsAtNight = CONFIG_DEFAULTS.fauna_birds_at_night;
    } else if (typeof rawBirdsAtNight === "string") {
      const normalizedBirdsAtNight = rawBirdsAtNight.trim().toLowerCase();
      this._faunaBirdsAtNight = !["false", "0", "off", "no"].includes(
        normalizedBirdsAtNight,
      );
    } else {
      this._faunaBirdsAtNight = rawBirdsAtNight !== false;
    }
    this._faunaBirds = readFlag(config.fauna_birds, true);
    this._faunaPlanes = readFlag(config.fauna_planes, true);
    this._faunaPlaneSpeed = readNumber(config.fauna_plane_speed, 1, 0.25, 3);
    // Single effects, each can be switched off.
    this._fx = {
      blueHour: readFlag(config.effect_blue_hour, true),
      goldenHour: readFlag(config.effect_golden_hour, true),
      sunRays: readFlag(config.effect_sun_rays, true),
      haze: readFlag(config.effect_haze, true),
      mist: readFlag(config.effect_ground_mist, true),
      frost: readFlag(config.effect_frost, true),
      cloudCoverage: readFlag(config.effect_cloud_coverage, true),
      shootingStars: readFlag(config.effect_shooting_stars, true),
      comets: readFlag(config.effect_comets, true),
      shootingStarRate: readNumber(config.shooting_star_rate, 1, 0.25, 3),
      cometRate: readNumber(config.comet_rate, 1, 0.25, 3),
    };
    this._precip = {
      rainDensity: readNumber(config.rain_density, 1, 0.25, MAX_DENSITY),
      snowDensity: readNumber(config.snow_density, 1, 0.25, MAX_DENSITY),
      leafDensity: readNumber(config.leaf_density, 1, 0.25, MAX_DENSITY),
      rainSplash: readFlag(config.effect_rain_splash, true),
      snowEdge: readFlag(config.effect_snow_edge, true),
    };
    // Rain and snow may fall out of the card onto the dashboard below.
    this._spillOn = readFlag(config.effect_spill, false);
    if (this.classList) this.classList.toggle("spill", this._spillOn);
    if (this._elements && this._elements.spill)
      this._elements.spill.hidden = !this._spillOn;
    if (!this._spillOn) this._spill = null;
    // A soft veil behind the chip row keeps text readable on any sky.
    if (this._elements && this._elements.root) {
      const scrim = readFlag(config.effect_text_scrim, true);
      const area = String(config.chip_area_position || CONFIG_DEFAULTS.chip_area_position || "bottom-left");
      this._elements.root.classList.toggle("scrim", scrim);
      this._elements.root.classList.toggle("scrim-top", scrim && area.startsWith("top"));
    }
    const rawDpr = config.perf_dpr != null ? config.perf_dpr : preset.perf_dpr;
    const parsedDpr = parseFloat(rawDpr);
    this._perfDpr = Number.isFinite(parsedDpr)
      ? Math.max(0.5, Math.min(PERFORMANCE_CONFIG.MAX_DPR, parsedDpr))
      : preset.perf_dpr;
    this._applyConfigStyles();
    const advancedCloudSettingsChanged =
      previousCloudSunAngleLighting !== this._cloudSunAngleLighting ||
      previousCloudBreathingShapes !== this._cloudBreathingShapes;
    this._configureCloudBreathingTimer();
    if (filtersChanged && this._renderState) {
      this._bakeAllClouds();
    } else if (advancedCloudSettingsChanged && this._renderState) {
      this._requestAdvancedCloudBake();
    }
    // Apply the new options right away instead of at the next state change.
    if (this._hass) this.hass = this._hass;
  }
  set hass(hass) {
    if (!hass || !this._config) return;
    this._hass = hass;
    if (this._customCardElements.length > 0) {
      for (const child of this._customCardElements) child.hass = hass;
    }
    const cfg = this._config;
    const wObj =
      (cfg.weather_entity && hass.states[cfg.weather_entity]) || null;
    const sunObj = cfg.sun_entity ? hass.states[cfg.sun_entity] : null;
    const moonObj = cfg.moon_phase_entity
      ? hass.states[cfg.moon_phase_entity]
      : null;
    const themeObj = cfg.theme_entity ? hass.states[cfg.theme_entity] : null;
    const imageRules = this._imageRules || [];
    const ruleObjs = imageRules.map((r) => hass.states[r.entity] || null);
    const precipObj = cfg.precipitation_entity
      ? hass.states[cfg.precipitation_entity]
      : null;
    // Readings of your own sensors, by the weather attribute they replace.
    const readings = {};
    for (const [opt, attr] of Object.entries(SENSOR_OPTIONS))
      if (cfg[opt]) readings[attr] = hass.states[cfg[opt]] || null;
    const sensorObjs = Object.values(readings);
    if (this._lastSnapshot) {
      let changed =
        wObj !== this._refW ||
        sensorObjs.length !== (this._refSensors || []).length ||
        sensorObjs.some((o, i) => o !== this._refSensors[i]) ||
        sunObj !== this._refSun ||
        moonObj !== this._refMoon ||
        themeObj !== this._refTheme ||
        ruleObjs.length !== (this._refImageRules || []).length ||
        ruleObjs.some((o, i) => o !== this._refImageRules[i]) ||
        precipObj !== this._refPrecip ||
        (hass.themes && hass.themes.darkMode) !== this._refSysDark;
      if (!changed) {
        for (const s of this._chips) {
          if (
            s.entity &&
            hass.states[s.entity] !==
              (this._refChipEnts ? this._refChipEnts.get(s.entity) : undefined)
          ) {
            changed = true;
            break;
          }
          if (
            s.name_sensor &&
            hass.states[s.name_sensor] !==
              (this._refChipEnts
                ? this._refChipEnts.get(s.name_sensor)
                : undefined)
          ) {
            changed = true;
            break;
          }
          if (
            s.sub_value_entity &&
            hass.states[s.sub_value_entity] !==
              (this._refChipEnts
                ? this._refChipEnts.get(s.sub_value_entity)
                : undefined)
          ) {
            changed = true;
            break;
          }
        }
      }
      if (!changed && this._visNeeds && this._refVisEnts) {
        for (const [id, obj] of this._refVisEnts)
          if (hass.states[id] !== obj) {
            changed = true;
            break;
          }
      }
      if (!changed && this._visNeeds && this._visNeeds.users && hass.user !== this._refUser)
        changed = true;
      if (!changed) return;
    }
    this._refW = wObj;
    this._refSun = sunObj;
    this._refMoon = moonObj;
    this._refTheme = themeObj;
    this._refImageRules = ruleObjs;
    this._refPrecip = precipObj;
    this._refSensors = sensorObjs;
    this._refSysDark = hass.themes && hass.themes.darkMode;
    const refs = new Map();
    for (const s of this._chips) {
      if (s.entity) refs.set(s.entity, hass.states[s.entity]);
      if (s.name_sensor) refs.set(s.name_sensor, hass.states[s.name_sensor]);
      if (s.sub_value_entity)
        refs.set(s.sub_value_entity, hass.states[s.sub_value_entity]);
    }
    this._refChipEnts = refs;
    const visRefs = new Map();
    if (this._visNeeds)
      for (const id of this._visNeeds.entities) visRefs.set(id, hass.states[id]);
    this._refVisEnts = visRefs;
    this._refUser = hass.user;
    // Chips whose visibility conditions fail are left out.
    this._chipVis = this._chipVisibility(hass);
    if (
      this._moonRotationRad === undefined &&
      (hass.config && hass.config.latitude) !== undefined
    ) {
      this._moonRotationRad = (51 - hass.config.latitude) * (Math.PI / 180);
    }
    const wBase = wObj || FALLBACK_WEATHER;
    const wEntity = sensorObjs.length
      ? { ...wBase, attributes: mergeWeatherSensors(wBase.attributes, readings) }
      : wBase;
    // Live chips that show the wind speed next to the direction read it too.
    this._sceneAttrs = wEntity.attributes;
    const sunEntity = this._config.sun_entity
      ? hass.states[this._config.sun_entity]
      : null;
    const moonEntity = this._config.moon_phase_entity
      ? hass.states[this._config.moon_phase_entity]
      : null;
    const themeEntity = this._config.theme_entity
      ? hass.states[this._config.theme_entity]
      : null;
    const precipEntity = this._config.precipitation_entity
      ? hass.states[this._config.precipitation_entity]
      : null;
    const botSig = this._chips
      .map((s, i) => {
        if (!s.entity) return "";
        if (this._chipVis[i] === false) return "hidden";
        if (s.forecast) {
          const t = s.forecast === "hourly" ? "hourly" : "daily";
          const fd = this._fcData.get(`${s.entity}|${t}`);
          return `fc:${s.entity}|${t}:${s.forecast_offset || 0}:${s.attribute || ""}:${(fd && fd.fp) || ""}`;
        }
        const e = hass.states[s.entity];
        let sig;
        if (!e) sig = "|";
        else if (s.attribute)
          sig = `${e.attributes[s.attribute] != null ? e.attributes[s.attribute] : ""}|${e.attributes[`${s.attribute}_unit`] != null ? e.attributes[`${s.attribute}_unit`] : ""}`;
        else sig = `${e.state}|${e.attributes.unit_of_measurement || ""}`;
        if (s.name_sensor) {
          const ns = hass.states[s.name_sensor];
          if (ns)
            sig += `|ns:${s.name_attribute ? (ns.attributes[s.name_attribute] != null ? ns.attributes[s.name_attribute] : "") : ns.state}`;
        }
        if (s.sub_value_entity) {
          const sv = hass.states[s.sub_value_entity];
          if (sv)
            sig += `|sv:${s.sub_value_attribute ? (sv.attributes[s.sub_value_attribute] != null ? sv.attributes[s.sub_value_attribute] : "") : sv.state}`;
        }
        return sig;
      })
      .join("||");
    const sysDark = hass.themes && hass.themes.darkMode,
      lang = (hass.locale && hass.locale.language) || "en";
    const snapshot = {
      weather: (wEntity && wEntity.state) || "",
      temp:
        wEntity && wEntity.attributes && wEntity.attributes.temperature != null
          ? wEntity.attributes.temperature
          : "",
      windSpeed:
        wEntity && wEntity.attributes && wEntity.attributes.wind_speed != null
          ? wEntity.attributes.wind_speed
          : "",
      windUnit:
        (wEntity && wEntity.attributes && wEntity.attributes.wind_speed_unit) ||
        "",
      windBearing:
        wEntity && wEntity.attributes && wEntity.attributes.wind_bearing != null
          ? wEntity.attributes.wind_bearing
          : "",
      sun: (sunEntity && sunEntity.state) || "",
      sunElev:
        sunEntity &&
        sunEntity.attributes &&
        sunEntity.attributes.elevation != null
          ? sunEntity.attributes.elevation
          : "",
      moon: (moonEntity && moonEntity.state) || "",
      theme: (themeEntity && themeEntity.state) || "",
      status: imageRules
        .map((r, i) => imageRuleValue(r, ruleObjs[i]))
        .join("|"),
      botSig,
      sysDark: !!sysDark,
      lang,
      atmo:
        (wEntity && wEntity.attributes
          ? atmoSignature(wEntity.attributes)
          : "") +
        "|" +
        (precipEntity ? precipEntity.state : ""),
    };
    if (
      this._lastSnapshot &&
      !this._hasSnapshotChanged(this._lastSnapshot, snapshot)
    )
      return;
    this._lastSnapshot = snapshot;
    if (this._elements && this._elements.root)
      this._elements.root.classList.toggle(
        "full-width",
        this._config.card_full_width === true,
      );
    if (!wEntity) return;
    this._updateMoonPhase(moonEntity);
    const axes = this._resolveAxes(sunEntity, themeEntity, sysDark),
      isTimeNight = axes.isTimeNight,
      isThemeDark = axes.isThemeDark;
    const hasNightChanged =
      this._isTimeNight !== isTimeNight || this._isThemeDark !== isThemeDark;
    this._isTimeNight = isTimeNight;
    this._isThemeDark = isThemeDark;
    let weatherState = (wEntity.state || "default").toLowerCase();
    if (isTimeNight && weatherState === "sunny") weatherState = "clear-night";
    if (!isTimeNight && weatherState === "clear-night") weatherState = "sunny";
    let newParams = {
      ...(WEATHER_MAP[weatherState] || WEATHER_MAP["default"]),
    };
    if (
      isTimeNight &&
      (weatherState === "sunny" || weatherState === "clear-night")
    ) {
      newParams.type = "stars";
      newParams.count = 280;
    }
    // Measured weather data refines the scene and drives the sky light.
    const weatherData = readWeatherData(wEntity.attributes, precipEntity);
    // "Cloud amount from data" off keeps the fixed clouds of the weather state;
    // the sky light still knows the real cover (no sun rays under a closed deck).
    const sceneData =
      this._fx && !this._fx.cloudCoverage
        ? { ...weatherData, coverage: null }
        : weatherData;
    newParams = adjustParams(newParams, sceneData);
    const sunElev =
      sunEntity && sunEntity.attributes
        ? parseFloat(sunEntity.attributes.elevation)
        : NaN;
    this._atmo = computeAtmosphere(weatherData, {
      state: weatherState,
      isTimeNight,
      sunElev: Number.isFinite(sunElev) ? sunElev : null,
      effects: this._fx,
    });
    // Rime on the card from temperature and humidity; the light it takes
    // follows the weather: sun (clear or broken clouds), matte, or night.
    const frost = frostLevel(weatherData.temperature, weatherData.humidity, weatherState);
    const matte = newParams.overcast || weatherState === "fog";
    this._frostTarget = {
      ...frost,
      night: isTimeNight,
      mode: isTimeNight ? "night" : matte ? "matte" : "sun",
      strength: isTimeNight
        ? weatherState === "clear-night" ? 1 : 0.3
        : weatherState === "sunny" ? 1 : 0.6,
    };
    this._updateStandaloneStyles(isTimeNight, newParams);
    this._updateSunLight(
      sunEntity || hass.states["sun.sun"],
      weatherState,
      newParams.atmosphere,
    );
    this._updateTextElements(hass, wEntity, lang, weatherState);
    const windSpeedRaw = this._getEntityAttribute(wEntity, "wind_speed", 0);
    const windSpeed =
      typeof windSpeedRaw === "number"
        ? windSpeedRaw
        : parseFloat(windSpeedRaw) || 0;
    this._windKmh = windSpeedKmh(
      windSpeed,
      wEntity && wEntity.attributes && wEntity.attributes.wind_speed_unit,
    );
    // Drift of clouds and slant of rain, in km/h whatever the unit: 10 km/h
    // per step, at most 2.
    this._windSpeed = Math.min(Math.max(this._windKmh / 10, 0), 2);
    const bearing = parseFloat(
      this._getEntityAttribute(wEntity, "wind_bearing", NaN),
    );
    // Where the wind comes from; without a value it blows left to right.
    this._windBearing = Number.isFinite(bearing) ? bearing : 270;
    this._updateWindCompass(hass, {
      bearing: Number.isFinite(bearing) ? bearing : null,
      speed: windSpeed,
      unit:
        (wEntity && wEntity.attributes && wEntity.attributes.wind_speed_unit) ||
        "",
    });
    const imageNight = axes.isImageNight;
    this._updateImage(hass, imageNight, weatherState);
    // Golden hour: warm glow + ambient wash (after base styles are set)
    this._applyGoldenHour(sunEntity || hass.states["sun.sun"], newParams);
    if (!this._hasReceivedFirstHass) {
      this._hasReceivedFirstHass = true;
      this._renderGate.hasFirstHass = true;
      this._lastState = weatherState;
      this._params = newParams;
      this._stateInitialized = true;
      this._buildRenderState();
      this._syncFc();
      this._tryInitialize();
      return;
    }
    this._handleWeatherChange(weatherState, newParams, hasNightChanged);
  }
  static async getConfigElement() {
    if (!customElements.get("atmo-weather-card-editor")) {
      const editorUrl = new URL(
        "./atmo-weather-card-editor.js",
        import.meta.url,
      );
      editorUrl.searchParams.set("v", EDITOR_HASH);
      await import(editorUrl.href);
    }
    return document.createElement("atmo-weather-card-editor");
  }
  static getStubConfig(hass) {
    const weatherEntity = hass
      ? Object.keys(hass.states).find((e) => e.startsWith("weather.")) || ""
      : "";
    return stubConfig(weatherEntity, hass, "standard");
  }
  getCardSize() {
    return 4;
  }
  getGridOptions() {
    return {
      columns: 12,
      rows: "auto",
      min_columns: 2,
      min_rows: 2,
    };
  }
  // CONFIGURATION HELPERS
  _chipVisibility(hass) {
    return this._chips.map(
      (c) => !Array.isArray(c.visibility) || checkConditions(c.visibility, hass),
    );
  }
  _deriveChips(config) {
    const arr = config && config.chips;
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.map((s) => (s && typeof s === "object" ? s : {}));
    }
    return [{}];
  }
  // Corners taken by chips: the chip area and freely placed chips. A full
  // width chip area takes its whole edge.
  _chipCorners(config) {
    const chips = (Array.isArray(config.chips) ? config.chips : []).filter(
      (c) => c && typeof c === "object" && c.entity,
    );
    const taken = [];
    if (
      config.chip_area_hide !== true &&
      chips.some((c) => String(c.position || "").toLowerCase() !== "custom")
    ) {
      const area = String(config.chip_area_position || "bottom-left");
      taken.push(area);
      if (config.chip_area_full_width === true || isFullWidth(config.chip_area_width))
        taken.push(...wholeRow(area));
    }
    for (const c of chips)
      if (String(c.position || "").toLowerCase() === "custom")
        taken.push(String(c.position_anchor || "top-left"));
    if (chips.some((c) => String(c.position || "").toLowerCase() !== "custom" && chipArea(c) === 2)) {
      const two = areaTwoConfig(config);
      const area = String(two.chip_area_position);
      taken.push(area);
      if (isFullWidth(two.chip_area_width)) taken.push(...wholeRow(area));
    }
    return taken;
  }
  _resolveChipPosition() {
    return (this._config && this._config.chip_area_position) || "bottom-left";
  }
  _resolveAxes(sunEntity, themeEntity, sysDark) {
    const mode = this._config.card_color_mode
      ? this._config.card_color_mode.toLowerCase()
      : null;
    const themeValid =
      themeEntity &&
      themeEntity.state !== "unavailable" &&
      themeEntity.state !== "unknown";
    const themeIsNight =
      themeValid && NIGHT_MODES.includes(themeEntity.state.toLowerCase());
    const sunState = sunEntity ? sunEntity.state.toLowerCase() : null,
      sunIsBelowHorizon = sunState === "below_horizon";
    const sunIsNight =
      sunIsBelowHorizon ||
      (sunState !== null && NIGHT_MODES.includes(sunState));
    const isTimeNight =
      mode === "night"
        ? true
        : mode === "day"
          ? false
          : sunEntity
            ? sunIsBelowHorizon
            : themeValid
              ? themeIsNight
              : false;
    // sysDark (hass.themes.darkMode) outranks sun so the card respects
    // the HA system/profile dark-mode setting. Sun is the fallback
    // for setups where hass.themes is unavailable.
    const isThemeDark =
      mode === "dark"
        ? true
        : mode === "light"
          ? false
          : themeValid
            ? themeIsNight
            : sysDark !== undefined
              ? !!sysDark
              : sunEntity
                ? sunIsNight
                : false;
    // image_night_source: "sun" (default) shows the night images while the
    // sky is at night; "theme" follows the color mode like the card colors.
    // Without a sun entity both follow the theme.
    const imageFollowsSun =
      String(this._config.image_night_source || "sun").toLowerCase() !==
      "theme";
    const isImageNight =
      imageFollowsSun && sunEntity
        ? isTimeNight
        : mode === "dark" || mode === "night"
          ? true
          : mode === "light" || mode === "day"
            ? false
            : themeValid
              ? themeIsNight
              : sysDark !== undefined
                ? !!sysDark
                : sunEntity
                  ? sunIsNight
                  : false;
    return { isTimeNight, isThemeDark, isImageNight };
  }
  // ENTITY & STATE HELPERS
  _getEntityState(hass, entityId, defaultValue = null) {
    if (!hass || !entityId) return defaultValue;
    const entity = hass.states[entityId];
    if (!entity) {
      this._trackEntityError(entityId, "not_found");
      return defaultValue;
    }
    if (entity.state === "unavailable" || entity.state === "unknown") {
      this._trackEntityError(entityId, entity.state);
      return defaultValue;
    }
    this._entityErrors.delete(entityId);
    return entity;
  }
  _getEntityAttribute(entity, attribute, defaultValue = null) {
    if (!entity || !entity.attributes) return defaultValue;
    const value = entity.attributes[attribute];
    return value !== undefined && value !== null ? value : defaultValue;
  }
  // A moon sensor wins; without one, or while it reports nothing useful, the
  // card works out the phase from today's date.
  _updateMoonPhase(moonEntity, now = new Date()) {
    const known = moonEntity && MOON_PHASES[moonEntity.state];
    if (known) {
      if (moonEntity.state === this._moonPhaseState && !this._moonPhaseAuto)
        return;
      this._moonPhaseAuto = false;
      this._moonPhaseState = moonEntity.state;
      this._moonPhaseConfig = known;
      return;
    }
    const p = moonPhaseAt(now);
    const prev = this._moonPhaseConfig;
    if (
      this._moonPhaseAuto &&
      prev &&
      prev.illumination === p.illumination &&
      prev.direction === p.direction
    )
      return;
    this._moonPhaseAuto = true;
    this._moonPhaseState = p.state;
    this._moonPhaseConfig = { illumination: p.illumination, direction: p.direction };
  }
  // Where the sun stands and how strong its light is, as CSS variables and
  // attributes on the card, for card_mod styles such as a shadow under your
  // own house image that follows the sun.
  _updateSunLight(sunEntity, weatherState, atmosphere) {
    if (!this.style || !this.dataset) return;
    const a = (sunEntity && sunEntity.attributes) || {};
    const elev = parseFloat(a.elevation);
    const az = (parseFloat(a.azimuth) * Math.PI) / 180;
    const known = Number.isFinite(elev) && Number.isFinite(az);
    const up = known && elev > 0;
    const light = up
      ? Math.min(1, elev / 10) * (SUN_LIGHT[atmosphere] ?? 0.5)
      : 0;
    const shadow = up ? Math.min(3, 1 / Math.tan((elev * Math.PI) / 180)) : 0;
    const fmt = (v) => (known ? v.toFixed(3) : "");
    this._cssVar(this, "--awc-sun-x", fmt(Math.sin(az)), "_prevSunX");
    this._cssVar(this, "--awc-sun-y", fmt(Math.cos(az)), "_prevSunY");
    this._cssVar(this, "--awc-sun-elevation", known ? elev.toFixed(1) : "", "_prevSunElev");
    this._cssVar(this, "--awc-sun-shadow", fmt(shadow), "_prevSunShadow");
    this._cssVar(this, "--awc-sun-light", fmt(light), "_prevSunLight");
    if (this.dataset.condition !== weatherState)
      this.dataset.condition = weatherState;
    const daytime = this._isTimeNight ? "night" : "day";
    if (this.dataset.daytime !== daytime) this.dataset.daytime = daytime;
  }
  _trackEntityError(entityId, errorType) {
    const now = Date.now(),
      existing = this._entityErrors.get(entityId);
    if (!existing || existing.type !== errorType) {
      this._entityErrors.set(entityId, { type: errorType, since: now });
      if (now - this._lastErrorLog > 60000) {
        console.warn(`ATMO-WEATHER-CARD: Entity "${entityId}" is ${errorType}`);
        this._lastErrorLog = now;
      }
    }
  }
  _resolveSensorValue(hass, entityId, attribute, dateFormat) {
    let value,
      haFormatted = false,
      rawNumeric = null;
    const sensor = hass.states[entityId];
    if (!sensor) {
      value = "N/A";
    } else if (attribute) {
      const raw = sensor.attributes[attribute];
      if (raw === undefined || raw === null) {
        value = "N/A";
      } else {
        value = hass.formatEntityAttributeValue(sensor, attribute);
        haFormatted = true;
        rawNumeric = raw;
      }
    } else {
      value = hass.formatEntityState(sensor);
      haFormatted = true;
      rawNumeric = sensor.state;
    }
    let formatted = value;
    const isoSource = attribute
      ? sensor && sensor.attributes && sensor.attributes[attribute]
      : sensor && sensor.state;
    if (
      typeof isoSource === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(isoSource)
    ) {
      const d = new Date(isoSource);
      if (!isNaN(d) && hasDateCodes(dateFormat)) {
        formatted = formatDateCodes(
          d,
          dateFormat,
          (hass.locale && hass.locale.language) || undefined,
        );
        haFormatted = true;
      } else if (!isNaN(d)) {
        const locale = (hass.locale && hass.locale.language) || undefined;
        const now = new Date();
        const todayStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        );
        const targetStart = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate(),
        );
        const dayDiff = Math.round((targetStart - todayStart) / 86400000);
        const timePart = d.toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "2-digit",
          ...timeFormatOptions(hass.locale),
        });
        if (dayDiff === 0) {
          formatted = timePart;
        } else if (dayDiff >= -1 && dayDiff <= 6) {
          formatted = `${d.toLocaleDateString(locale, { weekday: "short" })}, ${timePart}`;
        } else {
          formatted = d.toLocaleDateString(locale, {
            weekday: "short",
            day: "numeric",
            month: "short",
          });
        }
        haFormatted = true;
      }
    }
    return { formatted, unit: "", sensor, haFormatted, rawNumeric };
  }
  _resolveChipValueFormatted(
    chip,
    lang,
    rawValue,
    fallbackFormatted,
    haFormatted = false,
  ) {
    if (rawValue === null || rawValue === undefined) return fallbackFormatted;
    const isNumeric =
      rawValue !== "" && !isNaN(parseFloat(rawValue)) && isFinite(rawValue);
    if (!isNumeric) return fallbackFormatted;
    const precisionRaw = chip && chip.value_precision;
    if (precisionRaw !== undefined && precisionRaw !== null) {
      const parsed = parseInt(precisionRaw, 10);
      if (Number.isFinite(parsed)) {
        const precision = Math.max(0, Math.min(2, parsed));
        const fmt = this._getFixedPrecisionFmt(lang, precision);
        if (fmt) return fmt.format(rawValue);
      }
    }
    if (haFormatted) return fallbackFormatted;
    if (this._numFmt) return this._numFmt.format(rawValue);
    return String(rawValue);
  }
  _getFixedPrecisionFmt(lang, precision) {
    const key = `${lang}|${precision}`;
    if (
      (this._fixedPrecisionFmtCache && this._fixedPrecisionFmtCache[0]) === key
    )
      return this._fixedPrecisionFmtCache[1];
    const fmt = new Intl.NumberFormat(lang, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
    this._fixedPrecisionFmtCache = [key, fmt];
    return fmt;
  }
  // FORECAST DATA LAYER
  _syncFc() {
    if (!(this._hass && this._hass.connection)) return;
    const needed = new Set();
    for (const c of this._chips)
      if (c.forecast && c.entity)
        needed.add(
          `${c.entity}|${c.forecast === "hourly" ? "hourly" : "daily"}`,
        );
    for (const [k, unsub] of this._fcSubs)
      if (!needed.has(k)) {
        unsub();
        this._fcSubs.delete(k);
        this._fcData.delete(k);
        _fcCache.delete(k);
      }
    for (const k of needed) if (!this._fcSubs.has(k)) this._startFcSub(k);
  }
  _startFcSub(key) {
    const [entity, type] = key.split("|"),
      hass = this._hass;
    if (!(hass && hass.connection)) return;
    const isStillNeeded = () =>
      this.isConnected &&
      this._chips.some(
        (c) =>
          c.forecast &&
          c.entity === entity &&
          (c.forecast === "hourly" ? "hourly" : "daily") === type,
      );
    hass.connection
      .subscribeMessage(
        (msg) =>
          this._onFcData(
            key,
            msg.forecast != null ? msg.forecast : [],
            type === "daily",
          ),
        {
          type: "weather/subscribe_forecast",
          forecast_type: type,
          entity_id: entity,
        },
      )
      .then((unsub) => {
        if (!this._fcSubs.has(key) && !isStillNeeded()) {
          unsub();
          return;
        }
        this._fcSubs.set(key, unsub);
      })
      .catch(() => {
        if (isStillNeeded()) this._onFcData(key, [], type === "daily");
      });
  }
  _onFcData(key, raw, daily) {
    const processed = fcFilterPast(raw, daily),
      fp = fcFingerprint(processed);
    const _existing = this._fcData.get(key);
    if (_existing && _existing.fp === fp) return;
    const entry = { processed, fp };
    this._fcData.set(key, entry);
    _fcCache.set(key, entry);
    this._lastSnapshot = null;
    // Forecast data arrives between state changes, so render it right away.
    if (this._hass) this.hass = this._hass;
  }
  _resolveFcValue(hass, chip, lang) {
    const type = chip.forecast === "hourly" ? "hourly" : "daily",
      offset = Math.max(0, parseInt(chip.forecast_offset, 10) || 0);
    const _fcEntry = this._fcData.get(`${chip.entity}|${type}`);
    const fc = _fcEntry && _fcEntry.processed;
    if (!fc)
      return {
        formatted: "",
        unit: "",
        condition: null,
        datetime: null,
        loading: true,
      };
    if (!fc.length)
      return {
        formatted: forecastUnavailableText(lang),
        unit: "",
        condition: null,
        datetime: null,
      };
    const entry = fc[Math.min(offset, fc.length - 1)];
    const attr = chip.attribute;
    if (!attr || attr === "condition") {
      let label = entry.condition || "—";
      if (entry.condition)
        label =
          hass.localize(
            `component.weather.entity_component._.state.${entry.condition}`,
          ) || label;
      return {
        formatted: label,
        unit: "",
        condition: entry.condition,
        datetime: entry.datetime,
        entry,
      };
    }
    const raw = entry[attr];
    if (raw == null)
      return {
        formatted: "N/A",
        unit: "",
        condition: entry.condition,
        datetime: entry.datetime,
        entry,
      };
    const _chipState = hass.states[chip.entity];
    const w = _chipState && _chipState.attributes;
    const unit =
      (w && w[`${attr}_unit`]) ||
      (_FC_UNIT_MAP[attr] && w && w[_FC_UNIT_MAP[attr]]) ||
      _FC_UNIT_FALLBACK[attr] ||
      "";
    let formatted = raw;
    if (raw !== "" && !isNaN(parseFloat(raw)) && isFinite(raw)) {
      const precision = chip.forecast_precision;
      const fmt =
        precision !== undefined && precision !== null
          ? this._getPrecisionFmt(lang, precision)
          : this._numFmt;
      if (fmt) formatted = fmt.format(raw);
    }
    return {
      formatted,
      unit,
      condition: entry.condition,
      datetime: entry.datetime,
      entry,
    };
  }
  _getPrecisionFmt(lang, precision) {
    const key = `${lang}|${precision}`;
    if ((this._precisionFmtCache && this._precisionFmtCache[0]) === key)
      return this._precisionFmtCache[1];
    const fmt = new Intl.NumberFormat(lang, {
      maximumFractionDigits: precision,
      minimumFractionDigits: 0,
    });
    this._precisionFmtCache = [key, fmt];
    return fmt;
  }
  _cssVar(el, prop, val, key) {
    if (this[key] === val) return;
    this[key] = val;
    if (val) el.style.setProperty(prop, val);
    else el.style.removeProperty(prop);
  }
  _hasSnapshotChanged(prev, next) {
    return (
      prev.weather !== next.weather ||
      prev.temp !== next.temp ||
      prev.windSpeed !== next.windSpeed ||
      prev.windUnit !== next.windUnit ||
      prev.windBearing !== next.windBearing ||
      prev.sun !== next.sun ||
      prev.sunElev !== next.sunElev ||
      prev.moon !== next.moon ||
      prev.theme !== next.theme ||
      prev.status !== next.status ||
      prev.botSig !== next.botSig ||
      prev.sysDark !== next.sysDark ||
      prev.lang !== next.lang ||
      prev.atmo !== next.atmo
    );
  }
  _calculateStatusImage(hass, isNight) {
    for (const rule of this._imageRules || []) {
      if (imageRuleMatches(rule, this._getEntityState(hass, rule.entity)))
        return isNight ? rule.night : rule.day;
    }
    return null;
  }
  // STATE COMPUTATION
  _buildRenderState() {
    const p = this._params,
      isDark = this._isThemeDark,
      isNight = this._isTimeNight;
    const isLight = !isDark; // === this._isLightBackground
    const type = (p && p.type) || "none",
      atm = (p && p.atmosphere) || "",
      state = (this._lastState || "").toLowerCase();
    const isBadWeatherForComets =
      type === "rain" ||
      type === "hail" ||
      type === "lightning" ||
      type === "pouring" ||
      type === "snow" ||
      type === "mix" ||
      OVERCAST_STATES.includes(state);
    const isSevereWeather =
      !!(p && p.thunder) || type === "hail" || type === "pouring";
    const goodWeather =
      state === "sunny" ||
      state === "partlycloudy" ||
      state === "clear-night" ||
      state === "exceptional";
    const isStandalone = !this._isImmersive;
    const isDarkDayImmersive = this._isDarkDayImmersive;
    const glow = this._computeGlowParams(
      state,
      type,
      atm,
      p,
      goodWeather,
      isDark,
      isNight,
      isStandalone,
      isDarkDayImmersive,
    );
    // Dark drops on a light sky; the storm sky is dark by day too.
    const darkSkyByDay = isStandalone && !!(p && p.thunder);
    const rainRgb =
      isLight && !darkSkyByDay ? "58, 72, 100" : "210, 225, 255";
    let starMode = "hidden";
    if (isNight) {
      if (isDark) {
        starMode = "glow";
      } else if (!isStandalone) {
        starMode = "golden";
      }
    }
    const cp = this._computeCloudPalette(
      isDark,
      isNight,
      isLight,
      p,
      type,
      atm,
      isStandalone,
    );
    const cloudGlobalOp = isDark ? 0.7 : 0.84;
    let celestialCloudPalette;
    if (isNight) celestialCloudPalette = isDark ? "moon" : "moonLight";
    else if (isDark) celestialCloudPalette = isStandalone ? "darkDay" : "moon";
    else celestialCloudPalette = p && p.sunCloudWarm ? "warm" : "cool";
    this._sunDiscGrad = this._sunDiscGradR = null;
    this._haloGrad = this._haloGradR = this._haloGradColor = null;
    this._sunAuraCache = null;
    this._diffuseGlowCache = null;
    this._breathGlowCache = null;
    this._moonCache = this._rainGrad = null;
    this._renderState = {
      isBadWeatherForComets,
      isSevereWeather,
      glow,
      rainRgb,
      cloudGlobalOp,
      starMode,
      celestialCloudPalette,
      cp,
    };
    this._buildTextures();
  }
  _computeGlowParams(
    state,
    type,
    atm,
    p,
    goodWeather,
    isDark,
    isNight,
    isStandalone,
    isDarkDayImmersive,
  ) {
    if (isNight) return null; // moon system handles night
    const isBad = !!(p && p.dark) || BAD_WEATHER_TYPES.has(type);
    const isOvercastType =
      state === "cloudy" ||
      state === "windy" ||
      state === "windy-variant" ||
      state === "fog";
    let active, showDisc, showHalo, drawPhase;
    if (goodWeather) {
      active = true;
      showDisc = true;
      showHalo = true;
      drawPhase = "bg";
    } else if (isStandalone) {
      active = !isDark && isOvercastType && !isBad;
      showDisc = false;
      showHalo = false;
      drawPhase = "mid-post";
    } else {
      active = true;
      showDisc = false;
      showHalo = false;
      drawPhase = isDark ? "mid-pre" : "mid-post";
    }
    if (!active) return null;
    const prof = p.glow || WEATHER_MAP["default"].glow;
    let color = [prof[0], prof[1], prof[2]];
    let intensity = prof[3];
    const breathAmp = prof[4];
    const breathPeriodMul = prof[5];
    let sizeMul = prof[6],
      glowBoost = 1.0,
      auraSizeMul = 1.0,
      auraOpacityMul = 1.0;
    if (isDarkDayImmersive) {
      color = [225, 200, 150];
      intensity *= 0.7;
      sizeMul *= 1.7;
    } else if (isStandalone && isDark && !isNight && goodWeather) {
      color = [225, 200, 150];
      intensity *= 0.7;
    } else if (!isStandalone && !isDark && goodWeather) {
      color = [255, 195, 105];
      intensity *= 1.3;
      glowBoost = 1.3;
    } else if (!isStandalone && !showDisc) {
      intensity *= 1.4;
    }
    if (atm === "mist" || atm === "fog" || (p && p.foggy)) {
      auraSizeMul = 1.25;
      auraOpacityMul = 0.62;
    } else if (atm === "overcast" || atm === "cloudy") {
      auraSizeMul = 1.12;
      auraOpacityMul = 0.78;
    }
    auraOpacityMul *= isStandalone ? 1.08 : 0.78;
    const compOp = showDisc ? null : isDark ? "screen" : "source-over";
    const cacheKey = showDisc
      ? null
      : `${color[0]}_${color[1]}_${color[2]}_${sizeMul.toFixed(2)}`;
    return {
      active: true,
      showDisc,
      showHalo,
      drawPhase,
      color,
      intensity,
      breathAmp,
      breathPeriodMul,
      sizeMul,
      compOp,
      cacheKey,
      glowBoost,
      auraSizeMul,
      auraOpacityMul,
    };
  }
  _computeCloudPalette(isDark, isNight, isLight, p, type, atm, isStandalone) {
    let mood;
    if (isDark && isNight) {
      mood = "darkNight";
    } else if (isDark) {
      mood = isStandalone ? "darkDay" : "darkNight";
    } else if ((p && p.dark) || BAD_WEATHER_TYPES.has(type) || (p && p.foggy)) {
      mood =
        p && p.thunder
          ? "lightThunder"
          : STORM_TYPES.has(type)
            ? "lightStorm"
            : "lightRain";
    } else if (atm === "fair" || atm === "clear") {
      mood = "lightFair";
    } else if (atm === "overcast" || atm === "cloudy") {
      mood = "lightOvercast";
    } else {
      mood = "lightDefault";
    }
    const pal = CLOUD_PALETTES[mood];
    const litR = pal[0],
      litG = pal[1],
      litB = pal[2],
      midR = pal[3],
      midG = pal[4],
      midB = pal[5];
    const shadowR = pal[6],
      shadowG = pal[7],
      shadowB = pal[8],
      ambient = pal[9],
      highlightOffsetBase = pal[10],
      hOffset = pal[11];
    const isBadType = LIGHT_BAD_BOOST_TYPES.has(type) || (p && p.foggy);
    const isRainyBoost = isLight && !isDark && isBadType;
    const isStormOverride =
      isRainyBoost && ((p && p.thunder) || STORM_TYPES.has(type));
    const rainyOpacityMul =
      isRainyBoost && !isStormOverride && !this._isImmersive ? 1.1 : 1.0;
    return {
      litR,
      litG,
      litB,
      midR,
      midG,
      midB,
      shadowR,
      shadowG,
      shadowB,
      ambient,
      highlightOffsetBase,
      hOffset,
      rainyOpacityMul,
    };
  }
  _handleWeatherChange(weatherState, newParams, hasNightChanged) {
    const oldParams = this._params,
      typeChanged = !oldParams || oldParams.type !== newParams.type,
      stateChanged = this._lastState !== weatherState,
      // New measured cloud cover or precipitation needs a new scene.
      amountChanged =
        !!oldParams &&
        (oldParams.cloud !== newParams.cloud ||
          oldParams.count !== newParams.count ||
          oldParams.overcast !== newParams.overcast);
    this._lastState = weatherState;
    if (typeChanged || stateChanged || hasNightChanged || amountChanged) {
      this._params = newParams;
      this._buildRenderState();
      if (this.isConnected) {
        // Defer heavy _initParticles (includes _bakeAllClouds) when the
        // card is off-screen. The dirty flag is consumed by
        // _handleVisibilityChange when the card scrolls into view.
        if (this._isVisible) {
          setTimeout(() => {
            try {
              this._initParticles();
            } catch (e) {
              console.error("ATMO-WEATHER-CARD: _initParticles failed", e);
            }
            if (this._width > 0) this._lastInitWidth = this._width;
            this._startAnimation();
          }, 0);
        } else {
          this._needsReinit = true;
        }
      }
    } else {
      this._params = newParams;
    }
  }
  _applyGoldenHour(sunEntity, params) {
    if (!(this._elements && this._elements.root)) return;
    const root = this._elements.root;
    const atm = (params && params.atmosphere) || "";
    const inactive =
      this._isTimeNight ||
      (this._fx && this._fx.goldenHour === false) ||
      (atm !== "clear" && atm !== "fair" && atm !== "exceptional");
    if (inactive) {
      this._cssVar(root, "--gh-wash", "0", "_prevGhWash");
      this._cssVar(root, "--ambient-dim", "0", "_prevAmbDim");
      return;
    }
    let t = 0;
    if (
      sunEntity &&
      sunEntity.attributes &&
      sunEntity.attributes.elevation !== undefined
    ) {
      const e = parseFloat(sunEntity.attributes.elevation);
      if (e <= 18 && e > 2) {
        const s = 1 - (e - 2) / 16;
        t = s * s * s;
      } else if (e <= 2 && e >= -6) {
        t = (e + 6) / 8;
      }
    }
    if (t < 0.01) {
      root.style.setProperty("--gh-wash", "0");
      root.style.setProperty("--ambient-dim", "0");
      return;
    }
    const i = Math.min(1, t);
    const ghRgb = `255, ${Math.round(250 - 60 * i)}, ${Math.round(240 - 160 * i)}`;
    this._cssVar(root, "--g-rgb", ghRgb, "_prevGRgb");
    const baseOp = parseFloat(this._prevGOp || "0.45") || 0.45;
    this._cssVar(
      root,
      "--g-op",
      Math.min(0.95, baseOp + 0.25 * i).toFixed(3),
      "_prevGOp",
    );
    const cw = this._cachedDimensions.width / (this._cachedDimensions.dpr || 1);
    const ch =
      this._cachedDimensions.height / (this._cachedDimensions.dpr || 1);
    if (cw > 0 && ch > 0) {
      const cel = this._getCelestialPosition(cw, ch),
        dx = Math.max(cel.x, cw - cel.x),
        dy = Math.max(cel.y, ch - cel.y);
      const baseR = Math.ceil(Math.sqrt(dx * dx + dy * dy) * 0.3);
      this._cssVar(
        root,
        "--c-r",
        `${Math.round(baseR * (1 + 0.8 * i))}px`,
        "_prevCr",
      );
    }
    this._cssVar(root, "--gh-wash", (0.34 * i).toFixed(3), "_prevGhWash");
    this._cssVar(root, "--ambient-dim", (0.14 * i).toFixed(3), "_prevAmbDim");
  }
  _getCelestialPosition(w, h) {
    const mode = this._config.celestial_position;
    if (mode === "dynamic_sun" || mode === "dynamic_both") {
      const dyn = this._computeDynamicCelestial(mode);
      if (dyn) {
        const bodyR = this._celestialSize ? this._celestialSize / 2 : 31;
        return {
          x: bodyR + (w - 2 * bodyR) * dyn.t,
          y: bodyR + (h * 0.85 - bodyR) * (1 - dyn.y01),
        };
      }
    }
    const align = (
      this._config.celestial_alignment || "top-left"
    ).toLowerCase();
    const [vSide, hSide] = parseAnchor(align);
    const ox = parseInt(this._config.celestial_x, 10) || 0;
    const oy = parseInt(this._config.celestial_y, 10) || 0,
      bodyR = this._celestialSize ? this._celestialSize / 2 : 31;
    let x, y;
    if (hSide === "center") x = w / 2 + ox;
    else if (hSide === "right") x = w - ox - bodyR;
    else x = ox + bodyR;
    if (vSide === "center") y = h / 2 + oy;
    else if (vSide === "bottom") y = h - oy - bodyR;
    else y = oy + bodyR;
    return { x, y };
  }
  _computeDynamicCelestial(mode) {
    const isNight = this._isTimeNight;
    if (mode === "dynamic_sun" && isNight) return null;
    const _hassStates = this._hass && this._hass.states;
    const sunEntity =
      _hassStates && _hassStates[this._config.sun_entity || "sun.sun"];
    const attrs = sunEntity && sunEntity.attributes;
    if (!attrs) return null;
    const nextRise = Date.parse(attrs.next_rising);
    const nextSet = Date.parse(attrs.next_setting);
    if (!isFinite(nextRise) || !isFinite(nextSet)) return null;
    const now = Date.now();
    const dayMs = 86400000;
    // Home Assistant moves next_rising / next_setting to the next day at the
    // event, but the sun state can follow a few minutes later. In that window
    // the events come in the wrong order, so keep the body at the horizon it
    // is about to leave or has just reached instead of counting back 24 h.
    const nearHorizon = 6 * 3600000;
    let t;
    if (isNight) {
      if (nextRise > nextSet) t = nextSet - now < nearHorizon ? 0 : 1;
      else {
        const thisSet = nextSet - dayMs;
        t = (now - thisSet) / (nextRise - thisSet);
      }
    } else if (nextSet > nextRise) {
      t = nextRise - now < nearHorizon ? 0 : 1;
    } else {
      const thisRise = nextRise - dayMs;
      t = (now - thisRise) / (nextSet - thisRise);
    }
    if (!isFinite(t)) return null;
    if (t < 0) t = 0;
    else if (t > 1) t = 1;
    let y01;
    if (isNight) {
      y01 = Math.sin(Math.PI * t);
    } else {
      const elev = parseFloat(attrs.elevation);
      y01 = isFinite(elev)
        ? Math.max(0, Math.min(1, elev / 60))
        : Math.sin(Math.PI * t);
    }
    return { t, y01 };
  }
  // Optional wind compass over the scene. Hidden without a bearing.
  _updateWindCompass(hass, data) {
    const el = this._elements && this._elements.compass;
    const cfg = this._compass;
    if (!el || !cfg) return;
    if (data) this._compassData = data;
    const d = this._compassData;
    if (cfg.style === "off" || !d || d.bearing == null) {
      el.hidden = true;
      return;
    }
    const lang = editorLanguage(hass || this._hass);
    const sig = `${cfg.style}|${cfg.position}|${lang}|${cfg.background}`;
    let angle = unwrapAngle(this._compassAngle, d.bearing);
    if (sig !== this._compassSig) {
      this._compassSig = sig;
      el.innerHTML = compassMarkup(cfg.style, cfg.position, lang, cfg.background);
      this._scheduleCompassFit();
      // A new compass starts at the current bearing instead of turning to it.
      angle = d.bearing;
    } else if (Math.abs(angle) > 360) {
      // Keep the unwrapped angle near zero: shift the current position by
      // whole turns without a transition, which looks the same, then ease on.
      const shift = Math.round(angle / 360) * 360;
      const rotating = el.querySelectorAll(".cmp-rot, .cmp-band");
      for (const g of rotating) g.style.transition = "none";
      applyCompassAngle(el, cfg.style, this._compassAngle - shift);
      void el.offsetWidth;
      for (const g of rotating) g.style.transition = "";
      angle -= shift;
    }
    this._compassAngle = angle;
    applyCompassAngle(el, cfg.style, angle);
    const parts = compassLabel({
      bearing: d.bearing,
      lang,
      speed: d.speed,
      speedUnit: d.unit,
      show: cfg.show,
    });
    const label = el.querySelector(".cmp-label");
    if (label) {
      const text = parts.join("|");
      if (label.dataset.text !== text) {
        label.dataset.text = text;
        const span = (txt, cls) => {
          const s = document.createElement("span");
          s.textContent = txt;
          if (cls) s.className = cls;
          return s;
        };
        // The tick ring shows the speed as a number with its unit below.
        label.replaceChildren(
          ...parts.flatMap((p) =>
            cfg.style === "ticks" && /^[\d.,]+ \S+$/.test(p)
              ? [span(p.split(" ")[0]), span(p.split(" ")[1], "cmp-unit")]
              : [span(p)],
          ),
        );
      }
    }
    const box = el.firstElementChild;
    if (box)
      box.setAttribute(
        "aria-label",
        `${compassPoint(d.bearing, lang)} ${Math.round(d.bearing)}°`,
      );
    this._updateCompassScale();
    el.hidden = this._compassNoRoom;
  }
  // wind_compass_position "auto": after the chips are laid out, try the
  // places in order and keep the first where the compass covers no chip.
  // With none free (a card full of chips, like the panel layout) the compass
  // stays hidden; a position you pick yourself is always kept.
  _scheduleCompassFit() {
    if (this._compassFitFrame || !this._compass || !this._compass.auto) return;
    this._compassFitFrame = requestAnimationFrame(() => {
      this._compassFitFrame = null;
      this._fitCompass();
    });
  }
  _fitCompass() {
    const el = this._elements && this._elements.compass;
    const cfg = this._compass;
    const box = el && el.firstElementChild;
    if (!box || !cfg || !cfg.auto || !this.shadowRoot) return;
    const d = this._compassData;
    if (cfg.style === "off" || !d || d.bearing == null) return;
    const pad = 2;
    const chips = [...this.shadowRoot.querySelectorAll(".chip, .chip-ring-wrap")]
      .filter((c) => !el.contains(c))
      .map((c) => c.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.height > 0);
    const covers = (r) =>
      chips.some((c) => r.left < c.right - pad && r.right > c.left + pad && r.top < c.bottom - pad && r.bottom > c.top + pad);
    const place = (pos) => {
      for (const cls of [...box.classList]) if (cls.startsWith("cmp-pos-")) box.classList.remove(cls);
      box.classList.add(`cmp-pos-${pos}`);
    };
    el.hidden = false;
    let found = null;
    for (const pos of cfg.candidates) {
      place(pos);
      const r = box.getBoundingClientRect();
      // Nothing to measure (no layout yet): keep the place from the config.
      if (!r.width || !r.height) {
        found = cfg.position;
        break;
      }
      if (!covers(r)) {
        found = pos;
        break;
      }
    }
    place(found || cfg.position);
    this._compassNoRoom = !found;
    el.hidden = this._compassNoRoom;
  }
  // The compass grows with the card height, within limits.
  _updateCompassScale() {
    const el = this._elements && this._elements.compass;
    if (!el) return;
    const dims = this._cachedDimensions;
    const h = dims && dims.height ? dims.height / (dims.dpr || 1) : 0;
    const style = this._compass && this._compass.style;
    const min = COMPASS_MIN_SCALE[style] || 0.7;
    const scale = h ? Math.min(1.15, Math.max(min, h / 300)) : Math.max(1, min);
    if (scale !== this._compassScale) {
      this._compassScale = scale;
      el.style.setProperty("--_cmp-scale", scale.toFixed(3));
    }
  }
  // DOM & STYLES
  // The `css` option: own styles inside the card, without card_mod. They come
  // last, so they win over the card's own rules of the same weight.
  _applyOwnCss(css) {
    const text = typeof css === "string" ? css.trim() : "";
    let el = this._ownCssEl;
    if (!text) {
      if (el) el.remove();
      this._ownCssEl = null;
      return;
    }
    if (!el) {
      el = document.createElement("style");
      el.id = "awc-own-css";
      this._ownCssEl = el;
    }
    if (el.textContent !== text) el.textContent = text;
    if (el.parentNode !== this.shadowRoot || el !== this.shadowRoot.lastElementChild)
      this.shadowRoot.append(el);
  }
  _initDOM() {
    if (this._initialized) return;
    this._initialized = true;
    if (this._config.card_offset) this.style.margin = this._config.card_offset;
    const style = document.createElement("style");
    style.textContent = buildStyles();
    const root = document.createElement("div");
    root.id = "card-root";
    root.innerHTML = `<canvas id="bg-canvas"></canvas><canvas id="mid-canvas"></canvas><div id="image-slot"><img /></div><canvas id="fg-canvas"></canvas><div id="frost"></div><div id="text-scrim"></div><div id="wind-compass" hidden></div><div id="text-wrapper"><div id="chips-group"><div id="chips-row"></div></div><div id="chips-group-2" style="display:none"><div id="chips-row-2"></div></div></div><div id="custom-cards-wrapper"></div>`;
    // Below the card, outside its rounded corners: rain and snow that fall
    // out of it (effect_spill).
    const spill = document.createElement("canvas");
    spill.id = "spill-canvas";
    spill.hidden = true;
    this.shadowRoot.append(style, root, spill);
    const q = (sel) => root.querySelector(sel);
    const bg = q("#bg-canvas"),
      mid = q("#mid-canvas"),
      fg = q("#fg-canvas");
    const img = q("#image-slot > img");
    this._wireImage(img);
    const chipsRow = q("#chips-row");
    chipsRow.addEventListener("click", (e) => this._handleChipClick(e));
    // A scrolling chip row takes the curve along.
    chipsRow.addEventListener("scroll", () => this._scheduleCurve(), { passive: true });
    const chipsRow2 = q("#chips-row-2");
    chipsRow2.addEventListener("click", (e) => this._handleChipClick(e));
    chipsRow2.addEventListener("scroll", () => this._scheduleCurve(), { passive: true });
    this._elements = {
      root,
      bg,
      mid,
      fg,
      img,
      imageSlot: q("#image-slot"),
      chipsGroup: q("#chips-group"),
      chipsRow,
      chipsGroup2: q("#chips-group-2"),
      chipsRow2,
      textWrapper: q("#text-wrapper"),
      customCardsWrapper: q("#custom-cards-wrapper"),
      compass: q("#wind-compass"),
      frost: q("#frost"),
      spill,
    };
    const ctxOpts = { alpha: true, willReadFrequently: false };
    const bgCtx = bg.getContext("2d", ctxOpts),
      midCtx = mid.getContext("2d", ctxOpts),
      fgCtx = fg.getContext("2d", ctxOpts);
    if (!bgCtx || !midCtx || !fgCtx) {
      console.error("ATMO-WEATHER-CARD: Failed to get canvas context");
      return;
    }
    bgCtx.imageSmoothingQuality =
      midCtx.imageSmoothingQuality =
      fgCtx.imageSmoothingQuality =
        "high";
    this._ctxs = { bg: bgCtx, mid: midCtx, fg: fgCtx };
  }
  // The spill canvas: as wide as the card, SPILL_HEIGHT below it.
  // True when the card crossed the width where the wide layout changes.
  _layoutNeedsWidth(width) {
    const src = this._sourceConfig;
    if (!src || String(src.card_layout || "").trim().toLowerCase() !== "wide") return false;
    const before = (this._layoutWidth || 0) > 0 && this._layoutWidth < WIDE_MIN_WIDTH;
    const now = width > 0 && width < WIDE_MIN_WIDTH;
    return before !== now;
  }
  _prepareSpill(w, dpr) {
    const canvas = this._elements && this._elements.spill;
    if (!this._spillOn || !canvas) {
      this._spill = null;
      return;
    }
    const pw = Math.max(1, Math.floor(w * dpr)),
      ph = Math.max(1, Math.floor(SPILL_HEIGHT * dpr));
    if (!this._spill || canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${SPILL_HEIGHT}px`;
      this._spill = { ctx: canvas.getContext("2d"), h: SPILL_HEIGHT };
    }
    const ctx = this._spill.ctx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, SPILL_HEIGHT);
  }
  _clearAllParticles() {
    if (this._cloudAtlases) {
      for (let i = 0; i < this._cloudAtlases.length; i++) {
        const a = this._cloudAtlases[i];
        a.canvas.width = 0;
        a.canvas.height = 0;
      }
      this._cloudAtlases = null;
    }
    this._cloudScratch = null;
    this._atmoCache = null;
    this._mistBanks = null;
    for (const key of PARTICLE_ARRAYS) this[key] = [];
    this._flashHold = 0;
    if (this._milkyWay) {
      this._milkyWay.width = 0;
      this._milkyWay = null;
    }
  }
  // DOM UPDATES
  _updateStandaloneStyles(isNight, newParams) {
    const root = this._elements.root,
      atm = newParams.atmosphere || "";
    const w = this._cachedDimensions.width / (this._cachedDimensions.dpr || 1);
    // === GLOW VARIABLES — all modes (standalone + immersive) ===
    // Default --g-op: 0 in CSS; nothing shows until JS sets values.
    if (w > 0) {
      const h =
        this._cachedDimensions.height / (this._cachedDimensions.dpr || 1);
      const celestial = this._getCelestialPosition(w, h);
      this._cssVar(root, "--c-x", `${celestial.x}px`, "_prevCx");
      this._cssVar(root, "--c-y", `${celestial.y}px`, "_prevCy");
      if (h > 0) {
        const dx = Math.max(celestial.x, w - celestial.x),
          dy = Math.max(celestial.y, h - celestial.y);
        this._cssVar(
          root,
          "--c-r",
          `${Math.ceil(Math.sqrt(dx * dx + dy * dy) * 0.3)}px`,
          "_prevCr",
        );
      }
    }
    if (this._isTimeNight) {
      const _mpcIllum =
        this._moonPhaseConfig && this._moonPhaseConfig.illumination;
      const illum = _mpcIllum != null ? _mpcIllum : 1.0;
      const nightWeatherOp = {
        storm: 0.08,
        pouring: 0.1,
        rain: 0.14,
        snow: 0.22,
        overcast: 0.28,
        windy: 0.28,
        mist: 0.2,
        fog: 0.2,
        fair: 0.8,
      };
      const weatherFactor =
          nightWeatherOp[atm] != null ? nightWeatherOp[atm] : 1.0,
        nightOp = (0.2 + illum * 0.3) * weatherFactor,
        forcedLight = !this._isThemeDark;
      let moonRgb;
      if (forcedLight) {
        moonRgb = "100,125,175";
      } else {
        moonRgb = this._isLightBackground ? "218,228,255" : "190,210,255";
      }
      this._cssVar(root, "--g-rgb", moonRgb, "_prevGRgb");
      this._cssVar(root, "--g-op", nightOp.toFixed(3), "_prevGOp");
    } else {
      const dayWeatherOp = {
        storm: 0.06,
        pouring: 0.08,
        rain: 0.1,
        snow: 0.16,
        mist: 0.16,
        fog: 0.16,
        overcast: 0.26,
        windy: 0.24,
        fair: 0.38,
        clear: 0.55,
        exceptional: 0.55,
      };
      const dayOp = dayWeatherOp[atm] != null ? dayWeatherOp[atm] : 0.45;
      const coolGlow =
        atm === "overcast" ||
        atm === "mist" ||
        atm === "windy" ||
        atm === "fog";
      const badGlow =
        atm === "storm" ||
        atm === "pouring" ||
        atm === "rain" ||
        atm === "snow";
      const dayRgb = badGlow
        ? "232, 240, 252"
        : coolGlow
          ? "240, 245, 255"
          : "255, 248, 232";
      this._cssVar(root, "--g-rgb", dayRgb, "_prevGRgb");
      this._cssVar(root, "--g-op", dayOp.toFixed(3), "_prevGOp");
    }
    const isDarkScheme = this._isThemeDark;
    root.classList.toggle("scheme-night", isDarkScheme);
    root.classList.toggle("scheme-day", !isDarkScheme);
    root.classList.toggle("time-day", !this._isTimeNight);
    if (this._isImmersive) {
      if (this._prevStyleSig !== null) {
        root.classList.remove("standalone", ...WEATHER_CLASSES);
        this._prevStyleSig = null;
      }
      return;
    }
    const styleSig = `${isDarkScheme}_${this._isTimeNight}_${atm}_${this._moonPhaseState}`;
    if (this._prevStyleSig === styleSig) return;
    this._prevStyleSig = styleSig;
    root.classList.add("standalone");
    root.classList.remove(...WEATHER_CLASSES);
    const weatherClass = ATMOSPHERE_CSS[atm];
    if (weatherClass) root.classList.add(weatherClass);
  }
  _applyConfigStyles() {
    if (!this._elements || !this._elements.chipsRow) return;
    const cfg = this._config;
    const showText = cfg.card_hide_text !== true;
    const showBottom = cfg.chip_area_hide !== true;
    const bgStyle = resolveBackgroundStyle(cfg);
    const root = this._elements.root;
    this._cssVar(
      root,
      "--awc-bottom-font-size",
      cfg.chip_text_size || "",
      "_prevBottomFS",
    );
    this._cssVar(
      root,
      "--awc-chip-name-font-size",
      cfg.chip_label_size || "",
      "_prevChipNameFS",
    );
    // A bare number is pixels: "0" alone is fine in CSS, but not inside the
    // calc() that places the image, where it made the image jump to the
    // top-left corner (and card_padding: 0 as a number counted as unset).
    const padRaw = cssLengths(cfg.card_padding);
    this._cssVar(root, "--awc-card-padding", padRaw, "_prevCardPadding");
    if (padRaw && this._prevCardPadParsed !== padRaw) {
      this._prevCardPadParsed = padRaw;
      const parts = padRaw.split(/\s+/);
      root.style.setProperty("--_awc-pad-v", parts[0] || "");
      root.style.setProperty("--_awc-pad-h", parts[1] || parts[0] || "");
    } else if (!padRaw && this._prevCardPadParsed) {
      this._prevCardPadParsed = "";
      root.style.removeProperty("--_awc-pad-v");
      root.style.removeProperty("--_awc-pad-h");
    }
    const configSig = `${showText}|${showBottom}|${bgStyle}`;
    if (this._prevConfigSig !== configSig) {
      this._prevConfigSig = configSig;
      this._elements.textWrapper.style.display = showText ? "" : "none";
      this._elements.chipsRow.style.display = showBottom ? "" : "none";
      this._elements.chipsGroup.style.display = showBottom ? "" : "none";
    }
    for (const [prop, key, cache] of [
      ["--awc-chips-padding", "chip_padding", "_prevChipPad"],
      ["--awc-chip-gap", "chip_gap", "_prevChipGap"],
      ["--awc-chip-text-gap", "chip_text_gap", "_prevChipTextGap"],
      ["--awc-icon-size", "chip_icon_size", "_prevChipIconWidth"],
      ["--awc-icon-padding", "chip_icon_padding", "_prevChipIconPad"],
    ])
      this._cssVar(root, prop, (cfg[key] || "").toString().trim(), cache);
    // The first area keeps its values on the card, as before.
    this._applyAreaStyles(
      cfg,
      this._elements.chipsRow,
      this._elements.chipsGroup,
      this,
      (prop, val, key) => this._cssVar(root, prop, val, key),
    );
    // The second area sets its own; an unset value must not fall back to the
    // first area's value on the card, so it becomes "initial".
    const c2 = this._area2Cache || (this._area2Cache = {});
    const cg2 = this._elements.chipsGroup2;
    this._applyAreaStyles(
      this._area2Config || areaTwoConfig(cfg),
      this._elements.chipsRow2,
      cg2,
      c2,
      (prop, val, key) => {
        if (c2[key] === val) return;
        c2[key] = val;
        cg2.style.setProperty(prop, val || "initial");
      },
    );
  }
  // Layout and look of one chip area. c holds the values set last time (the
  // card itself for the first area), setVar sets a CSS variable.
  _applyAreaStyles(cfg, bt, cg, c, setVar) {
    for (const [prop, key, cache] of [
      ["--awc-row-width", "chip_area_width", "_prevRowWidth"],
      ["--awc-row-height", "chip_area_height", "_prevRowHeight"],
      ["--awc-container-padding", "chip_area_padding", "_prevContainerPad"],
      [
        "--awc-container-bg-color",
        "chip_area_background_color",
        "_prevContainerBgColor",
      ],
      ["--awc-bottom-gap", "chip_area_gap", "_prevChipsGap"],
    ])
      setVar(prop, (cfg[key] || "").toString().trim(), cache);
    const cols = parseInt(cfg.chip_area_columns, 10);
    setVar(
      "--awc-row-columns",
      Number.isFinite(cols) && cols > 0 ? String(cols) : "",
      "_prevRowCols",
    );
    const showBottomBg = cfg.chip_area_background === true;
    const bgStyle = resolveBackgroundStyle(cfg);
    let rowLayout = (cfg.chip_area_layout || CONFIG_DEFAULTS.chip_area_layout)
      .toString()
      .toLowerCase();
    const isGrouped = cfg.chip_area_grouped === true;
    if (c._prevRowOverflow !== rowLayout) {
      c._prevRowOverflow = rowLayout;
      for (const m of ["horizontal-scroll", "wrap", "grid", "vertical-scroll"])
        bt.classList.toggle("row-" + m, rowLayout === m);
      for (const m of ["horizontal-scroll", "wrap", "vertical-scroll"])
        cg.classList.toggle("has-row-" + m, rowLayout === m);
    }
    const visCount = parseInt(cfg.chip_area_scroll_count, 10),
      hasVis = Number.isFinite(visCount) && visCount > 0;
    const visKey = `${hasVis}|${visCount}|${rowLayout}`;
    if (c._prevVisKey !== visKey) {
      c._prevVisKey = visKey;
      bt.classList.toggle("has-visible-count", hasVis);
      if (hasVis) {
        const gapVal = (cfg.chip_area_gap || "8px").toString().trim() || "8px";
        bt.style.setProperty(
          "--awc-chip-basis",
          `calc((100% - ${visCount - 1} * ${gapVal}) / ${visCount})`,
        );
        if (rowLayout === "vertical-scroll") {
          bt.style.setProperty(
            "--awc-chip-basis-v",
            `calc((100% - ${visCount - 1} * ${gapVal}) / ${visCount})`,
          );
        } else {
          bt.style.removeProperty("--awc-chip-basis-v");
        }
      } else {
        bt.style.removeProperty("--awc-chip-basis");
        bt.style.removeProperty("--awc-chip-basis-v");
      }
      if (!hasVis && rowLayout === "vertical-scroll") {
        requestAnimationFrame(() => this._computeVerticalVisHeight(bt, cfg));
      } else if (rowLayout !== "vertical-scroll" || hasVis) {
        bt.style.removeProperty("--awc-row-max-height");
      }
    }
    const hasSeparator = cfg.chip_area_separator === true;
    const groupedKey = `${isGrouped}|${showBottomBg}|${bgStyle}|${hasSeparator}`;
    if (c._prevGrouped !== groupedKey) {
      c._prevGrouped = groupedKey;
      cg.classList.toggle("grouped", isGrouped);
      bt.classList.toggle("has-separator", hasSeparator);
      if (isGrouped && showBottomBg) {
        cg.classList.add("with-bg");
        for (const s of ["contrast", "frosted", "theme"])
          cg.classList.toggle(s, bgStyle === s);
      } else {
        cg.classList.remove("with-bg", "contrast", "frosted", "theme");
      }
    }
    const fullWidth = cfg.chip_area_full_width === true;
    if (c._prevFullWidth !== fullWidth) {
      c._prevFullWidth = fullWidth;
      bt.classList.toggle("full-width", fullWidth);
    }
    const align = (cfg.chip_area_align || CONFIG_DEFAULTS.chip_area_align)
      .toString()
      .toLowerCase();
    if (c._prevChipAlign !== align) {
      c._prevChipAlign = align;
      for (const a of ["start", "center", "end", "spread"])
        bt.classList.toggle(`align-${a}`, align === a);
    }
  }
  _patchRowChipsIncremental(container, rowChips, c = this) {
    const nextSigs = rowChips.map((r) => r.sig);
    const prevSigs = c._lastRowSigs;
    const canPatch =
      Array.isArray(prevSigs) &&
      prevSigs.length === nextSigs.length &&
      container.children.length === nextSigs.length;
    if (!canPatch) {
      container.innerHTML = rowChips.map((r) => r.html).join("");
      c._lastRowSigs = nextSigs;
      return true;
    }
    let changed = false;
    for (let i = 0; i < nextSigs.length; i++) {
      if (prevSigs[i] === nextSigs[i]) continue;
      const tpl = document.createElement("template");
      tpl.innerHTML = rowChips[i].html;
      const nextEl = tpl.content.firstElementChild;
      const prevEl = container.children[i];
      if (!nextEl || !prevEl) {
        container.innerHTML = rowChips.map((r) => r.html).join("");
        c._lastRowSigs = nextSigs;
        return true;
      }
      container.replaceChild(nextEl, prevEl);
      changed = true;
    }
    c._lastRowSigs = nextSigs;
    return changed;
  }
  // Puts one area's chips into its row. True when the row was rebuilt.
  _renderAreaRow(a, rowChips) {
    const { cfg, bt, c } = a;
    const rowLayout = (cfg.chip_area_layout || CONFIG_DEFAULTS.chip_area_layout)
      .toString()
      .toLowerCase();
    const visCount = parseInt(cfg.chip_area_scroll_count, 10),
      hasVis = Number.isFinite(visCount) && visCount > 0;
    const rowSig = rowChips.map((r) => r.sig).join("§");
    const rowRebuilt = c._lastLocStr !== rowSig;
    if (rowRebuilt) {
      c._lastLocStr = rowSig;
      this._patchRowChipsIncremental(bt, rowChips, c);
      this._animateRings(bt, a.n === 2 ? "a2" : "");
      const hasEnhanced = rowChips.some(
        (r) =>
          r.html.includes("format-stacked") ||
          r.html.includes("format-vertical"),
      );
      bt.classList.toggle("has-enhanced-child", hasEnhanced);
      if (!hasVis && rowLayout === "vertical-scroll") {
        requestAnimationFrame(() => this._computeVerticalVisHeight(bt, cfg));
      }
      this._nativeIconCache = null;
    }
    if (rowLayout !== "vertical-scroll" || hasVis) {
      if (c._prevHadVertVis) {
        bt.style.removeProperty("--awc-row-max-height");
        c._prevHadVertVis = false;
      }
    } else {
      c._prevHadVertVis = true;
    }
    return rowRebuilt;
  }
  _updateTextElements(hass, wEntity, lang, weatherState = "default") {
    if (!wEntity) return;
    if (!this._elements || !this._elements.chipsRow) return;
    this._applyConfigStyles();
    const cfg = this._config;
    const bt = this._elements.chipsRow;
    // Each area brings its own background and chip style.
    const areaArgs = (acfg) => {
      const raw = (acfg.chip_style || CONFIG_DEFAULTS.chip_style).toLowerCase();
      return {
        rowBg: acfg.chip_area_background === true,
        bgStyle: resolveBackgroundStyle(acfg),
        chipFormat:
          raw === "stacked" ? "stacked" : raw === "vertical" ? "vertical" : CONFIG_DEFAULTS.chip_style,
      };
    };
    const areas = [
      { n: 1, cfg, bt, cg: this._elements.chipsGroup, c: this },
      {
        n: 2,
        cfg: this._area2Config || areaTwoConfig(cfg),
        bt: this._elements.chipsRow2,
        cg: this._elements.chipsGroup2,
        c: this._area2Cache || (this._area2Cache = {}),
      },
    ];
    for (const a of areas) a.args = areaArgs(a.cfg);
    if (this._numFmtLang !== lang) {
      this._numFmtLang = lang;
      this._numFmt = new Intl.NumberFormat(lang, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0,
      });
    }
    // A layout can offer more tiles than it shows (_layoutMax): the first ones
    // with a value fill the places, so a missing value leaves no gap.
    const shownInGroup = {};
    const rendered = this._chips.map((chip, idx) => {
      const a = areas[chipArea(chip) - 1].args;
      const render = (c) =>
        this._renderChip(c, idx, hass, weatherState, lang, a.rowBg, a.bgStyle, a.chipFormat);
      const r = render(chip);
      const group = chip._layoutGroup;
      if (group && r.html) {
        shownInGroup[group] = (shownInGroup[group] || 0) + 1;
        if (shownInGroup[group] > chip._layoutMax) return render({ ...chip, entity: "" });
      }
      return r;
    });
    const freeChips = rendered.filter((r) => r.isFree);
    let rowRebuilt = false;
    for (const a of areas) {
      a.rowChips = rendered.filter(
        (r, i) => !r.isFree && chipArea(this._chips[i]) === a.n,
      );
      if (a.n === 2) {
        // The second area shows only while it holds a chip.
        const show =
          a.rowChips.some((r) => r.html) &&
          a.cfg.chip_area_hide !== true &&
          cfg.chip_area_hide !== true;
        const display = show ? "" : "none";
        if (a.cg.style.display !== display) a.cg.style.display = display;
      }
      rowRebuilt = this._renderAreaRow(a, a.rowChips) || rowRebuilt;
    }
    const rowChips = areas[0].rowChips;
    const freeSig = freeChips.map((r) => r.sig).join("§"),
      freeRebuilt = this._lastFreeSig !== freeSig;
    if (freeRebuilt) {
      this._lastFreeSig = freeSig;
      const tw = this._elements.textWrapper;
      tw.querySelectorAll(".chip-free").forEach((el) => el.remove());
      for (const r of freeChips) {
        const wrapper = document.createElement("div");
        wrapper.className = r.isBehind ? "chip-free behind" : "chip-free";
        const [anchorV, anchorH] = parseAnchor(r.posAnchor || "top-left");
        const padH = "var(--_awc-pad-h, var(--awc-card-padding, 16px))";
        const padV = "var(--_awc-pad-v, var(--awc-card-padding, 16px))",
          ox = r.posX === "pad" ? padH : parseCSSVal(r.posX);
        const oy = r.posY === "pad" ? padV : parseCSSVal(r.posY),
          tx = [];
        if (anchorH === "left") wrapper.style.left = ox;
        else if (anchorH === "right") wrapper.style.right = ox;
        else {
          // A centered chip moves by its offset too: right and down.
          wrapper.style.left = r.posX === "pad" ? "50%" : `calc(50% + ${ox})`;
          tx.push("translateX(-50%)");
        }
        if (anchorV === "top") wrapper.style.top = oy;
        else if (anchorV === "bottom") wrapper.style.bottom = oy;
        else {
          wrapper.style.top = r.posY === "pad" ? "50%" : `calc(50% + ${oy})`;
          tx.push("translateY(-50%)");
        }
        if (tx.length) wrapper.style.transform = tx.join(" ");
        if (r.width) {
          wrapper.style.width = `calc(${r.width})`;
          wrapper.style.maxWidth = `calc(100% - var(--_awc-pad-h, var(--awc-card-padding, 16px)) * 2)`;
        }
        wrapper.innerHTML = r.html;
        this._animateRings(wrapper, "f");
        wrapper.addEventListener("click", (e) => this._handleChipClick(e));
        tw.appendChild(wrapper);
      }
      this._nativeIconCache = null;
    }
    if (rowRebuilt || freeRebuilt) this._refreshMarqueeObservation();
    const hasNativeIcons = rendered.some(
      (r) => r.showIcon && r.iconStrategy === "native",
    );
    if (hasNativeIcons) {
      if (!this._nativeIconCache || rowRebuilt || freeRebuilt) {
        const allContainers = [
          bt,
          this._elements.chipsRow2,
          ...this._elements.textWrapper.querySelectorAll(".chip-free"),
        ];
        this._nativeIconCache = [];
        for (let i = 0; i < rendered.length; i++) {
          const r = rendered[i];
          if (!r.showIcon || r.iconStrategy !== "native") continue;
          for (const container of allContainers) {
            const iconEl = container.querySelector(
              `.chip[data-idx="${i}"] ha-state-icon`,
            );
            if (iconEl) this._nativeIconCache.push({ idx: i, el: iconEl });
          }
        }
      }
      for (let j = 0; j < this._nativeIconCache.length; j++) {
        const entry = this._nativeIconCache[j],
          r = rendered[entry.idx];
        if (entry.el.hass !== hass || entry.el.stateObj !== r.sensorObj) {
          entry.el.hass = hass;
          entry.el.stateObj = r.sensorObj;
        }
      }
    }
    const curveOf = (list) =>
      list
        .filter((r) => r.fcEntry && r.attribute === "temperature")
        .map((r) => ({
          idx: r.idx,
          hi: Number(r.fcEntry.temperature),
          lo: r.fcEntry.templow == null ? NaN : Number(r.fcEntry.templow),
          unit: r.fcUnit,
        }));
    const firstCurve = curveOf(rowChips);
    this._curveArea = firstCurve.length >= 2 ? areas[0] : areas[1];
    this._curvePoints = firstCurve.length >= 2 ? firstCurve : curveOf(areas[1].rowChips);
    this._scheduleCurve();
    this._scheduleCompassFit();
    const pos2 = String(areas[1].cfg.chip_area_position);
    if (this._prevPos2 !== pos2) {
      this._prevPos2 = pos2;
      for (const el of [areas[1].bt, areas[1].cg]) {
        el.classList.remove(...POS_CLASSES);
        el.classList.add(`pos-${pos2}`);
      }
    }
    const chipsPos = this._resolveChipPosition();
    if (this._prevPosSig !== chipsPos) {
      this._prevPosSig = chipsPos;
      const bt2 = this._elements.chipsRow;
      const cg2 = this._elements.chipsGroup;
      bt2.classList.remove(...POS_CLASSES);
      cg2.classList.remove(...POS_CLASSES);
      bt2.classList.add(`pos-${chipsPos}`);
      cg2.classList.add(`pos-${chipsPos}`);
    }
    if (this._elements && this._elements.customCardsWrapper) {
      const ccPos = (this._config.custom_cards_position || "")
        .toLowerCase()
        .trim();
      const ccSig = `${ccPos}|${chipsPos}`;
      if (this._prevCcSig !== ccSig) {
        this._prevCcSig = ccSig;
        const ccw = this._elements.customCardsWrapper;
        const allCcClasses = [
          "cc-text-left",
          "cc-text-right",
          "cc-text-hcenter",
          "cc-align-top",
          "cc-align-center",
          "cc-align-bottom",
        ];
        ccw.classList.remove(...allCcClasses);
        if (ccPos) {
          const hClass = ccPos.includes("left")
            ? "cc-text-left"
            : ccPos.includes("right")
              ? "cc-text-right"
              : ccPos.includes("center")
                ? "cc-text-hcenter"
                : null;
          const vClass = ccPos.includes("top")
            ? "cc-align-top"
            : ccPos.includes("bottom")
              ? "cc-align-bottom"
              : ccPos.includes("center")
                ? "cc-align-center"
                : "cc-align-bottom";
          if (hClass) ccw.classList.add(hClass);
          ccw.classList.add(vClass);
        } else {
          ccw.classList.add("cc-align-bottom");
          const chipsIsLeft = chipsPos.includes("left");
          const chipsIsRight = chipsPos.includes("right");
          ccw.classList.add(
            chipsIsLeft
              ? "cc-text-right"
              : chipsIsRight
                ? "cc-text-left"
                : "cc-text-hcenter",
          );
        }
      }
    }
  }
  // forecast_curve: a temperature curve over the forecast chips of the chip
  // area. Drawn a frame later, once the chips have their size.
  _scheduleCurve() {
    if (this._curveFrame || !this._elements) return;
    this._curveFrame = requestAnimationFrame(() => {
      this._curveFrame = null;
      this._drawCurve();
    });
  }
  _drawCurve() {
    const els = this._elements;
    if (!els || !els.chipsGroup || !this._config) return;
    const area = this._curveArea || { cg: els.chipsGroup, bt: els.chipsRow, cfg: this._config };
    const group = area.cg;
    const mode = curveMode(this._config.forecast_curve);
    const pts = mode ? this._curvePoints || [] : [];
    let svg = this._curveSvg;
    const gb = group.getBoundingClientRect();
    const xs = [];
    for (const p of pts) {
      const el = area.bt.querySelector(`[data-idx="${p.idx}"]`);
      if (!el) continue;
      const b = el.getBoundingClientRect();
      xs.push(b.left + b.width / 2 - gb.left);
    }
    const height = curveHeight(this._config.forecast_curve_height);
    const below = String(area.cfg.chip_area_position || "bottom").startsWith("top");
    const sig = `${mode}|${height}|${below}|${gb.width.toFixed(0)}|${xs.map((x) => x.toFixed(0)).join(",")}|${pts.map((p) => `${p.hi}/${p.lo}/${p.unit}`).join(",")}`;
    if (sig === this._curveSig && (!svg || svg.isConnected)) return;
    this._curveSig = sig;
    if (!this._curveId) this._curveId = `awc-curve-${++_curveIds}`;
    const markup =
      gb.width && xs.length === pts.length
        ? curveMarkup({
            mode,
            xs,
            his: pts.map((p) => p.hi),
            los: pts.map((p) => p.lo),
            celsius: pts.map((p) => toCelsius(p.hi, p.unit)),
            height,
            id: this._curveId,
          })
        : "";
    if (!markup) {
      if (svg) svg.remove();
      this._curveSvg = null;
      return;
    }
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.id = "forecast-curve";
      svg.setAttribute("aria-hidden", "true");
      this._curveSvg = svg;
    }
    if (svg.parentNode !== group) group.appendChild(svg);
    svg.classList.toggle("below", below);
    svg.setAttribute("height", String(height));
    svg.setAttribute("viewBox", `0 0 ${gb.width.toFixed(1)} ${height}`);
    svg.innerHTML = markup;
  }
  _animateRings(container, prefix) {
    if (!this._ringPrevPct) this._ringPrevPct = new Map();
    const pfx = prefix || "";
    for (const wrap of container.querySelectorAll(".chip-ring-wrap")) {
      const key = pfx + wrap.dataset.idx;
      const target = (
        wrap.style.getPropertyValue("--awc-ring-pct") || "0%"
      ).trim();
      const prev = this._ringPrevPct.get(key);
      wrap.style.setProperty(
        "--awc-ring-pct",
        prev !== undefined ? prev : "0%",
      );
      requestAnimationFrame(() => {
        wrap.style.setProperty("--awc-ring-pct", target);
      });
      this._ringPrevPct.set(key, target);
    }
    for (const fill of container.querySelectorAll(".chip-bar-fill")) {
      const key = "b" + pfx + fill.dataset.barIdx;
      const target = (
        fill.style.getPropertyValue("--awc-bar-scale") || "0"
      ).trim();
      const prev = this._ringPrevPct.get(key);
      fill.style.setProperty(
        "--awc-bar-scale",
        prev !== undefined ? prev : "0",
      );
      requestAnimationFrame(() => {
        fill.style.setProperty("--awc-bar-scale", target);
      });
      this._ringPrevPct.set(key, target);
    }
  }
  _renderChip(chip, idx, hass, weatherState, lang, rowBg, bgStyle, chipFormat) {
    // A layout's reading the weather entity does not report stays away.
    if (chip._layoutOptional && chip.entity && chip.attribute && !chip.forecast) {
      const st = hass && hass.states && hass.states[chip.entity];
      const raw = st && st.attributes ? st.attributes[chip.attribute] : undefined;
      if (raw === undefined || raw === null) chip = { ...chip, entity: "" };
    }
    if (chip.entity && chip.forecast) {
      const type = chip.forecast === "hourly" ? "hourly" : "daily";
      const fc = this._fcData.get(`${chip.entity}|${type}`);
      const list = fc && fc.processed;
      if (list && list.length) {
        const offset = Math.max(0, parseInt(chip.forecast_offset, 10) || 0);
        // A forecast shorter than the chip asks for has no entry for it: the
        // chip stays away instead of showing the last entry a second time.
        if (offset >= list.length) chip = { ...chip, entity: "" };
        // A layout's forecast value stays away too when the weather service
        // does not send it, like the rain probability.
        else if (chip._layoutOptional && chip.attribute) {
          const v = list[offset][chip.attribute];
          if (v === undefined || v === null) chip = { ...chip, entity: "" };
        }
      }
    }
    if (this._chipVis && this._chipVis[idx] === false) chip = { ...chip, entity: "" };
    if (!chip.entity)
      return {
        html: "",
        sig: `skip-${idx}`,
        sensorObj: null,
        iconStrategy: "static",
        showIcon: false,
        isFree: false,
        posAnchor: "",
        posX: "0",
        posY: "0",
      };
    // type: sun_path draws the sun's arc; the arc is its icon.
    const isSunPath = chip.type === "sun_path";
    const showIcon = chip.hide_icon !== true && !isSunPath,
      showLabel = chip.hide_label !== true,
      showValue = chip.hide_value !== true;
    const effectiveFormatRaw = (chip.style ? chip.style : chipFormat)
      .toString()
      .toLowerCase()
      .trim();
    const effectiveFormat = ["inline", "stacked", "vertical"].includes(
      effectiveFormatRaw,
    )
      ? effectiveFormatRaw
      : "inline";
    const isEnhanced =
      effectiveFormat === "stacked" || effectiveFormat === "vertical";
    const isRingType = chip.type === "ring";
    let sensorObj = null,
      iconStrategy = "static",
      iconValue = "mdi:information-outline",
      formatted,
      unit;
    let mainHaFormatted = false,
      mainRawNumeric = null;
    const isForecast = !!chip.forecast;
    let fcCondition = null,
      fcDatetime = null,
      fcLoading = false,
      fcEntry = null;
    if (isForecast) {
      const fc = this._resolveFcValue(hass, chip, lang);
      formatted = fc.formatted;
      unit = fc.unit;
      fcCondition = fc.condition;
      fcDatetime = fc.datetime;
      fcLoading = !!fc.loading;
      fcEntry = fc.entry || null;
      iconValue = fcCondition
        ? WEATHER_ICONS[fcCondition] || WEATHER_ICONS["default"]
        : iconValue;
      if (chip.attribute && chip.attribute !== "condition")
        iconValue = FORECAST_ATTR_ICONS[chip.attribute] || iconValue;
    } else {
      const resolved = this._resolveSensorValue(
        hass,
        chip.entity,
        chip.attribute,
        chip.date_format,
      );
      mainHaFormatted = resolved.haFormatted === true;
      mainRawNumeric = resolved.rawNumeric;
      formatted = this._resolveChipValueFormatted(
        chip,
        lang,
        mainRawNumeric,
        resolved.formatted,
        mainHaFormatted,
      );
      unit = resolved.unit;
      const hasManualValuePrecision =
        chip.value_precision !== undefined && chip.value_precision !== null;
      if (hasManualValuePrecision && mainHaFormatted && !unit) {
        const unitSensor = hass.states[chip.entity];
        if (unitSensor) {
          unit = chip.attribute
            ? unitSensor.attributes[`${chip.attribute}_unit`] ||
              unitSensor.attributes.unit_of_measurement ||
              ""
            : unitSensor.attributes.unit_of_measurement || "";
        }
      }
      const sensor = hass.states[chip.entity];
      if (sensor) {
        if (chip.attribute)
          iconValue =
            WEATHER_ATTR_ICONS[chip.attribute] || "mdi:information-outline";
        else {
          sensorObj = sensor;
          iconStrategy = "native";
        }
      }
    }
    // Wind direction chips: compass point, a turning icon and the wind speed.
    let bearingIcon = "";
    if (
      (chip.bearing_format || chip.bearing_icon || chip.bearing_speed) &&
      isBearingChip(chip, hass)
    ) {
      const lang = editorLanguage(hass);
      const raw = isForecast
        ? fcEntry && fcEntry.wind_bearing
        : mainRawNumeric;
      if (chip.bearing_format)
        ({ formatted, unit } = formatBearingValue(
          raw,
          chip.bearing_format,
          lang,
          formatted,
          unit,
        ));
      if (BEARING_ICONS.includes(chip.bearing_icon))
        bearingIcon = bearingIconSvg(chip.bearing_icon, parseFloat(raw));
      // Home Assistant formats wind_bearing without a unit. Plain degree chips
      // keep the bare number as before; next to the turning icon or the speed
      // it gets its degree sign.
      if (
        (bearingIcon || chip.bearing_speed === true) &&
        chip.bearing_format !== "cardinal" &&
        chip.bearing_format !== "both" &&
        !unit &&
        Number.isFinite(parseFloat(raw)) &&
        !/°\s*$/.test(String(formatted))
      )
        formatted = `${formatted}°`;
      // The speed comes from the same weather entity, with its own unit. Live
      // chips use your own wind speed sensor when one is set, then also on a
      // wind direction sensor chip.
      const wEnt = hass.states[chip.entity];
      const ownSpeed = !isForecast && !!this._config.wind_speed_entity && this._sceneAttrs;
      const speedAttrs = ownSpeed ? this._sceneAttrs : wEnt && wEnt.attributes;
      // Only next to a known direction, never after N/A.
      const speed = chip.bearing_speed === true && (chip.attribute === "wind_bearing" || ownSpeed) && Number.isFinite(parseFloat(raw))
        ? parseFloat(isForecast ? fcEntry && fcEntry.wind_speed : speedAttrs && speedAttrs.wind_speed)
        : NaN;
      if (Number.isFinite(speed)) {
        const speedUnit = (speedAttrs && speedAttrs.wind_speed_unit) || "km/h";
        const value = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }).format(speed);
        const u = unit ? (/^[°%]/.test(unit) ? unit : ` ${unit}`) : "";
        formatted = `${formatted}${u} · ${value} ${speedUnit}`;
        unit = "";
      }
    }
    const configIcon = chip.icon,
      configPath = chip.icon_path;
    if (configIcon) {
      const resolvedBase =
        configIcon === "weather"
          ? isForecast && fcCondition
            ? fcCondition
            : weatherState
          : configIcon;
      if (configPath) {
        iconStrategy = "image";
        const basePath = configPath.endsWith("/")
          ? configPath
          : configPath + "/";
        const ext = resolvedBase.includes(".") ? "" : ".svg";
        iconValue = `${basePath}${resolvedBase}${ext}`;
      } else {
        iconStrategy = "static";
        iconValue =
          configIcon === "weather"
            ? WEATHER_ICONS[resolvedBase] || WEATHER_ICONS["default"]
            : configIcon;
      }
    }
    // A turning wind icon replaces the chip icon.
    if (bearingIcon) {
      iconStrategy = "bearing";
      iconValue = bearingIcon;
    }
    const resolvedUnitFormat =
      chip.unit_format !== undefined && chip.unit_format !== null
        ? String(chip.unit_format).trim()
        : "";
    const hasUnitFormat = resolvedUnitFormat !== "";
    if (hasUnitFormat) unit = resolvedUnitFormat;
    const overflowRaw = (chip.overflow || "ellipsis")
      .toString()
      .toLowerCase()
      .trim();
    const labelOverflowRaw = (chip.label_overflow || "ellipsis")
      .toString()
      .toLowerCase()
      .trim();
    const overflowMode = ["ellipsis", "marquee", "clip", "wrap"].includes(
      overflowRaw,
    )
      ? overflowRaw
      : "ellipsis";
    const labelOverflow = ["ellipsis", "marquee", "clip", "wrap"].includes(
      labelOverflowRaw,
    )
      ? labelOverflowRaw
      : "ellipsis";
    const isValueMarquee = overflowMode === "marquee",
      isLabelMarquee = labelOverflow === "marquee";
    const subOverflowRaw = (chip.sub_value_overflow || "ellipsis")
      .toString()
      .toLowerCase()
      .trim();
    const subOverflow = ["ellipsis", "marquee", "clip", "wrap"].includes(
      subOverflowRaw,
    )
      ? subOverflowRaw
      : "ellipsis";
    const isSubMarquee = subOverflow === "marquee";
    const hasAnyMarquee = isValueMarquee || isLabelMarquee || isSubMarquee;
    const marqueeSpeed = Math.max(5, parseFloat(chip.marquee_speed) || 30);
    const normalizeCssSize = (v) => {
      if (v === null || v === undefined) return "";
      const raw = String(v).trim();
      if (!raw) return "";
      if (/^-?\d+(?:\.\d+)?$/.test(raw)) return `${raw}px`;
      return raw;
    };
    const marqueeRtl = chip.marquee_rtl === true,
      width = normalizeCssSize(chip.width),
      height = normalizeCssSize(chip.height);
    let name = (chip.name || "").toString().trim(),
      nameSig = name;
    if (!name && chip._layoutLabel) {
      const st = hass && hass.states && hass.states[chip.entity];
      name = layoutChipLabel(
        st && typeof hass.formatEntityAttributeName === "function"
          ? hass.formatEntityAttributeName(st, chip.attribute)
          : "",
        chip.attribute,
        chip._layoutLabel,
        lang,
        makeTranslator(lang),
      );
      nameSig = name;
    }
    const sunPath =
      isSunPath && hass && hass.states ? sunPathState(hass.states[chip.entity]) : null;
    if (sunPath && !name) {
      name = makeTranslator(lang)(sunPath.night ? "Night" : "Daylight");
      nameSig = `sp:${name}`;
    }
    if (!name && !chip.name_sensor && isForecast && fcDatetime) {
      name = fcLabel(
        fcDatetime,
        chip.forecast !== "hourly",
        lang,
        hass && hass.locale,
        chip.date_format,
      );
      nameSig = `fc:${fcDatetime}|${chip.date_format || ""}`;
    }
    if (chip.name_sensor) {
      const nameResolved = this._resolveSensorValue(
        hass,
        chip.name_sensor,
        chip.name_attribute,
      );
      const nameUnit = nameResolved.unit;
      name = nameUnit
        ? `${nameResolved.formatted} ${nameUnit}`
        : `${nameResolved.formatted}`;
      nameSig = `ns:${chip.name_sensor}|${chip.name_attribute || ""}|${name}`;
    } else if (isForecast && chip.name_attribute && fcEntry) {
      const nRaw = fcEntry[chip.name_attribute];
      if (nRaw != null) {
        if (nRaw !== "" && !isNaN(parseFloat(nRaw)) && isFinite(nRaw)) {
          const _cs = hass.states[chip.entity],
            _w = _cs && _cs.attributes;
          const nUnit =
            (_w && _w[`${chip.name_attribute}_unit`]) ||
            (_FC_UNIT_MAP[chip.name_attribute] &&
              _w &&
              _w[_FC_UNIT_MAP[chip.name_attribute]]) ||
            _FC_UNIT_FALLBACK[chip.name_attribute] ||
            "";
          const nFmt = this._resolveChipValueFormatted(
            chip,
            lang,
            nRaw,
            String(nRaw),
            false,
          );
          name = nUnit ? `${nFmt} ${nUnit}` : `${nFmt}`;
        } else {
          name = String(nRaw);
        }
        nameSig = `ns-fc:${chip.name_attribute}|${name}`;
      }
    }
    const showSubValue =
      chip.hide_sub_value !== true &&
      (chip.sub_value_entity || chip.sub_value_attribute);
    let subValue = "",
      subValueSig = "";
    if (showSubValue) {
      const hasSubFormat = chip.sub_value_format !== undefined;
      if (chip.sub_value_entity) {
        const svResolved = this._resolveSensorValue(
          hass,
          chip.sub_value_entity,
          chip.sub_value_attribute,
        );
        const svUnit = hasSubFormat ? chip.sub_value_format : svResolved.unit;
        subValue = hasSubFormat
          ? `${svResolved.formatted}${svUnit}`
          : svUnit
            ? `${svResolved.formatted} ${svUnit}`
            : `${svResolved.formatted}`;
        subValueSig = `sv:${chip.sub_value_entity}|${chip.sub_value_attribute || ""}|${subValue}`;
      } else if (isForecast && chip.sub_value_attribute && fcEntry) {
        const svRaw = fcEntry[chip.sub_value_attribute];
        if (svRaw != null) {
          let svFmt = svRaw;
          if (svRaw !== "" && !isNaN(parseFloat(svRaw)) && isFinite(svRaw)) {
            const precision = chip.forecast_precision;
            const fmt =
              precision !== undefined && precision !== null
                ? this._getPrecisionFmt(lang, precision)
                : this._numFmt;
            if (fmt) svFmt = fmt.format(svRaw);
          }
          if (hasSubFormat) {
            subValue = `${svFmt}${chip.sub_value_format}`;
          } else {
            const _chipState = hass.states[chip.entity];
            const w = _chipState && _chipState.attributes;
            const svUnit =
              (w && w[`${chip.sub_value_attribute}_unit`]) ||
              (_FC_UNIT_MAP[chip.sub_value_attribute] &&
                w &&
                w[_FC_UNIT_MAP[chip.sub_value_attribute]]) ||
              _FC_UNIT_FALLBACK[chip.sub_value_attribute] ||
              "";
            subValue = svUnit ? `${svFmt} ${svUnit}` : `${svFmt}`;
          }
          subValueSig = `sv-fc:${chip.sub_value_attribute}|${subValue}`;
        }
      }
    }
    const subValueBeside = chip.sub_value_position === "beside";
    let iconHtml = "";
    const safeIconValue = escapeHtmlAttr(iconValue);
    if (showIcon) {
      let inner;
      if (iconStrategy === "bearing") {
        // Built in the compass module from fixed markup and a rounded angle.
        inner = iconValue;
      } else if (iconStrategy === "native") {
        inner = "<ha-state-icon></ha-state-icon>";
      } else if (iconStrategy === "image") {
        inner = `<img src="${safeIconValue}" class="custom-bottom-icon" />`;
      } else {
        inner = `<ha-icon icon="${safeIconValue}"></ha-icon>`;
      }
      iconHtml = `<span class="chip-icon">${inner}</span>`;
    }
    const safeName = escapeHtml(name);
    const nameHtml =
      showLabel && (name || isEnhanced)
        ? isLabelMarquee
          ? `<span class="chip-name awc-marquee-host" data-speed="${marqueeSpeed}" data-rtl="${marqueeRtl ? 1 : 0}"><span class="awc-marquee-track"><span class="awc-marquee-text">${safeName}</span></span></span>`
          : `<span class="chip-name">${safeName}</span>`
        : "";
    const useFancyUnit =
      !isForecast &&
      chip.fancy_unit === true &&
      (!chip.attribute || chip.attribute === "temperature");
    let inner;
    // Home Assistant formats a live value with its unit ("12 °C"); unit_format
    // replaces that unit instead of adding a second one ("12°").
    if (hasUnitFormat && !isForecast && mainHaFormatted && !useFancyUnit) {
      const s = hass.states[chip.entity];
      const a = (s && s.attributes) || {};
      const haUnit = chip.attribute
        ? a[`${chip.attribute}_unit`] ||
          (/temp|dew_point/.test(chip.attribute) ? a.temperature_unit : "") ||
          (/humidity|cloud_coverage|probability/.test(chip.attribute)
            ? "%"
            : "")
        : a.unit_of_measurement || "";
      formatted = stripTrailingUnit(formatted, haUnit);
    }
    const safeFormatted = escapeHtml(formatted);
    const safeUnit = escapeHtml(unit);
    const safeSubValue = escapeHtml(subValue);
    if (useFancyUnit) {
      const sensor = hass.states[chip.entity];
      const isWeather =
        sensor &&
        sensor.attributes &&
        sensor.attributes.temperature !== undefined;
      const rawTempCandidate = isWeather
        ? sensor.attributes.temperature
        : mainRawNumeric;
      const rawTempIsNumeric =
        rawTempCandidate !== null &&
        rawTempCandidate !== "" &&
        !isNaN(parseFloat(rawTempCandidate)) &&
        isFinite(rawTempCandidate);
      const rawTemp = rawTempIsNumeric ? rawTempCandidate : null;
      const attrUnitKey = chip.attribute ? `${chip.attribute}_unit` : null;
      const rawUnit = isWeather
        ? sensor.attributes.temperature_unit ||
          (attrUnitKey && sensor.attributes[attrUnitKey]) ||
          sensor.attributes.unit_of_measurement ||
          ""
        : (sensor &&
            sensor.attributes &&
            sensor.attributes.unit_of_measurement) ||
          "";
      const hasManualPrecision =
        chip.value_precision !== undefined && chip.value_precision !== null;
      const fancyBaseFormatted = isWeather
        ? hass.formatEntityAttributeValue(sensor, "temperature")
        : formatted;
      const fancyHaFormatted = isWeather || mainHaFormatted;
      const fancyVal = stripTrailingUnit(
        rawTemp != null
          ? this._resolveChipValueFormatted(
              chip,
              lang,
              rawTemp,
              fancyBaseFormatted,
              fancyHaFormatted,
            )
          : formatted,
        rawUnit,
      );
      const systemTempUnit =
        hass && hass.config && hass.config.unit_system
          ? hass.config.unit_system.temperature || ""
          : "";
      const fancyUnitStr = hasUnitFormat
        ? unit
        : rawUnit || (hasManualPrecision ? systemTempUnit : "");
      inner = `${escapeHtml(fancyVal)}<span class="fancy-unit">${escapeHtml(fancyUnitStr)}</span>`;
    } else {
      inner = hasUnitFormat
        ? `${safeFormatted}${safeUnit}`
        : unit
          ? `${safeFormatted} ${safeUnit}`
          : `${safeFormatted}`;
    }
    if (subValue && subValueBeside) {
      inner = `${safeSubValue} - ${inner}`;
    }
    let subBelowHtml = "";
    if (showValue && subValue && !subValueBeside) {
      if (isSubMarquee) {
        subBelowHtml = `<span class="chip-sub awc-marquee-host" data-speed="${marqueeSpeed}" data-rtl="${marqueeRtl ? 1 : 0}"><span class="awc-marquee-track"><span class="awc-marquee-text">${safeSubValue}</span></span></span>`;
      } else {
        subBelowHtml = `<span class="chip-sub">${safeSubValue}</span>`;
      }
    }
    const sunPathHtml = sunPath
      ? `<span class="chip-val chip-sunpath">${sunPathSvg(sunPath.t, sunPath.night)}<span class="sp-times"><span>${escapeHtml(sunPathTime(sunPath.from, chip.date_format, hass.locale))}</span><span>${escapeHtml(sunPathTime(sunPath.to, chip.date_format, hass.locale))}</span></span></span>`
      : "";
    const valHtml = !showValue
      ? ""
      : sunPathHtml
        ? sunPathHtml
        : isValueMarquee
        ? `<span class="chip-val awc-marquee-host" data-speed="${marqueeSpeed}" data-rtl="${marqueeRtl ? 1 : 0}"><span class="awc-marquee-track"><span class="awc-marquee-text">${inner}</span></span></span>`
        : `<span class="chip-val">${inner}${subBelowHtml}</span>`;
    const isFree = (chip.position || "").toString().toLowerCase() === "custom";
    const posAnchor = isFree ? chip.position_anchor || "top-left" : "",
      posX = isFree ? String(chip.position_x || 0).trim() : "0";
    const posY = isFree ? String(chip.position_y || 0).trim() : "0";
    const effectiveBg = chip.background !== undefined ? chip.background : rowBg;
    const classes = ["chip", `overflow-${overflowMode}`];
    if (hasAnyMarquee) {
      classes.push("overflow-marquee");
      if (isLabelMarquee && isValueMarquee) classes.push("marquee-both");
      else if (isLabelMarquee) classes.push("marquee-label");
      else if (isValueMarquee) classes.push("marquee-value");
    }
    if (fcLoading) classes.push("chip-loading");
    if (subValue && !subValueBeside && showValue) classes.push("has-sub");
    if (!showIcon) classes.push("no-icon");
    if (!nameHtml) classes.push("no-name");
    else if (isEnhanced && !name) classes.push("empty-name");
    if (!showLabel && !showValue) classes.push("icon-only");
    if (effectiveFormat === "stacked") classes.push("format-stacked");
    else if (effectiveFormat === "vertical") classes.push("format-vertical");
    if (isRingType) classes.push("chip-ring");
    if (sunPath) classes.push("chip-sunpath-type");
    const iconBg =
      chip.icon_background !== undefined
        ? chip.icon_background
        : this._config.chip_icon_background;
    if (iconBg === true) classes.push("has-icon-bg");
    else if (iconBg === false) classes.push("no-icon-bg");
    if (effectiveBg) {
      classes.push("with-bg");
      if (
        bgStyle === "contrast" ||
        bgStyle === "frosted" ||
        bgStyle === "theme"
      )
        classes.push(bgStyle);
    } else if (
      iconBg === true ||
      (iconBg !== false && this._config.chip_icon_background === true)
    ) {
      if (
        bgStyle === "contrast" ||
        bgStyle === "frosted" ||
        bgStyle === "theme"
      )
        classes.push(bgStyle);
    }
    const effectiveBgColor =
      chip.background_color || this._config.chip_background_color || "";
    const effectiveIconBgColor =
      chip.icon_background_color ||
      this._config.chip_icon_background_color ||
      "";
    const inlineStyles = [];
    if (width && !isFree) {
      inlineStyles.push(`width:${width};max-width:${width}`);
    }
    if (width && isFree) {
      inlineStyles.push(`width:100%;max-width:100%`);
    }
    if (height) {
      inlineStyles.push(`height:${height}`);
    }
    if (effectiveBgColor)
      inlineStyles.push(`--awc-bottom-bg-color:${effectiveBgColor}`);
    if (effectiveIconBgColor)
      inlineStyles.push(`--awc-stacked-icon-bg:${effectiveIconBgColor}`);
    if (chip.padding !== undefined && chip.padding !== "")
      inlineStyles.push(`padding:${chip.padding}`);
    if (chip.text_size)
      inlineStyles.push(
        `font-size:${chip.text_size};--awc-bottom-font-size:${chip.text_size}`,
      );
    if (chip.label_size)
      inlineStyles.push(`--awc-chip-name-font-size:${chip.label_size}`);
    if (chip.inner_gap) inlineStyles.push(`--awc-chip-gap:${chip.inner_gap}`);
    if (chip.text_gap)
      inlineStyles.push(`--awc-chip-text-gap:${chip.text_gap}`);
    if (chip.icon_size) inlineStyles.push(`--awc-icon-size:${chip.icon_size}`);
    if (chip.icon_padding)
      inlineStyles.push(`--awc-icon-padding:${chip.icon_padding}`);
    if (chip.value_weight)
      inlineStyles.push(
        `--awc-chip-value-weight:${chip.value_weight};--awc-stacked-value-weight:${chip.value_weight}`,
      );
    if (chip.label_weight)
      inlineStyles.push(`--awc-chip-name-weight:${chip.label_weight}`);
    if (chip.sub_value_size)
      inlineStyles.push(`--awc-sub-size:${chip.sub_value_size}`);
    if (chip.sub_value_weight)
      inlineStyles.push(`--awc-sub-weight:${chip.sub_value_weight}`);
    if (subOverflow === "clip") inlineStyles.push("--awc-sub-overflow:clip");
    else if (subOverflow === "wrap")
      inlineStyles.push(
        "--awc-sub-overflow:clip;--awc-sub-wrap:normal;--awc-sub-visible:visible",
      );
    const isBarType = chip.type === "bar";
    let gaugeVal = parseFloat(formatted),
      gaugeSig = "";
    if ((isRingType || isBarType) && chip.gauge_entity) {
      const gr = this._resolveSensorValue(
        hass,
        chip.gauge_entity,
        chip.gauge_attribute,
      );
      gaugeVal = parseFloat(
        gr.rawNumeric != null ? gr.rawNumeric : gr.formatted,
      );
      gaugeSig = `${chip.gauge_entity}|${chip.gauge_attribute || ""}|${gaugeVal}`;
    } else if (
      (isRingType || isBarType) &&
      !chip.gauge_entity &&
      isForecast &&
      chip.gauge_attribute &&
      fcEntry
    ) {
      const gRaw = fcEntry[chip.gauge_attribute];
      if (gRaw != null) gaugeVal = parseFloat(gRaw);
      gaugeSig = `fc-g:${chip.gauge_attribute}|${gaugeVal}`;
    }
    let ringHtml = "",
      ringWrapStyle = "",
      hasSegments = false,
      barHtml = "";
    if (isRingType) {
      const ringMin = parseFloat(chip.ring_min) || 0,
        ringMax = parseFloat(chip.ring_max) || 100;
      const ringW = parseFloat(chip.ring_width) || 4,
        ringGap = parseFloat(chip.ring_gap) || 3;
      const g = computeGauge(
        gaugeVal,
        ringMin,
        ringMax,
        (chip.ring_color || "").trim(),
        Array.isArray(chip.ring_thresholds) ? chip.ring_thresholds : [],
        chip.ring_threshold_mode || "solid",
      );
      hasSegments = g.hasSegments;
      ringHtml = '<div class="chip-ring-track"></div>';
      const styleParts = [
        `--awc-ring-pct:${g.pct}%`,
        `--awc-ring-w:${ringW}px`,
        `--awc-ring-gap:${ringGap}px`,
      ];
      if (g.gradient)
        styleParts.push(`--awc-ring-gradient:conic-gradient(${g.gradient})`);
      else if (g.effectiveColor)
        styleParts.push(`--awc-ring-color:${g.effectiveColor}`);
      ringWrapStyle = styleParts.join(";");
    }
    if (isBarType) {
      const barMin = parseFloat(chip.bar_min) || 0,
        barMax = parseFloat(chip.bar_max) || 100;
      const barH = parseFloat(chip.bar_height) || 4,
        barGap = parseFloat(chip.bar_gap) || 4;
      const g = computeGauge(
        gaugeVal,
        barMin,
        barMax,
        (chip.bar_color || "").trim(),
        Array.isArray(chip.bar_thresholds) ? chip.bar_thresholds : [],
        chip.bar_threshold_mode || "solid",
      );
      classes.push("chip-bar-type");
      const scale = (parseFloat(g.pct) / 100).toFixed(4);
      const fillStyles = [`--awc-bar-scale:${scale}`];
      if (g.barGradient)
        fillStyles.push(
          `--awc-bar-gradient:linear-gradient(to right, ${g.barGradient})`,
        );
      else if (g.effectiveColor)
        fillStyles.push(`--awc-bar-color:${g.effectiveColor}`);
      barHtml = `<div class="chip-bar" style="--awc-bar-h:${barH}px;--awc-bar-gap:${barGap}px"><div class="chip-bar-track"></div><div class="chip-bar-fill" data-bar-idx="${idx}" style="${escapeHtmlAttr(fillStyles.join(";"))}"></div></div>`;
    }
    const chipAlignRaw = (chip.align || "").toString().toLowerCase().trim();
    const chipAlignClass = ["start", "center", "end", "spread"].includes(
      chipAlignRaw,
    )
      ? chipAlignRaw
      : "";
    if (chipAlignClass) classes.push(`align-${chipAlignClass}`);
    const isBehind = chip.behind_effects === true;
    if (isBehind) classes.push("behind");
    if (chip.chip_round === true) classes.push("chip-round");
    const style = inlineStyles.length
      ? ` style="${escapeHtmlAttr(inlineStyles.join(";"))}"`
      : "";
    const loaderHtml = fcLoading
      ? '<div class="chip-loader"><span></span><span></span><span></span></div>'
      : "";
    let chipHtml = `<div class="${classes.join(" ")}" data-idx="${idx}"${style}>${loaderHtml}${iconHtml}${nameHtml}${valHtml}${barHtml}</div>`;
    if (isRingType) {
      chipHtml = `<div class="chip-ring-wrap${hasSegments ? " has-segments" : ""}${fcLoading ? " chip-loading" : ""}" data-idx="${idx}" style="${escapeHtmlAttr(ringWrapStyle)}">${ringHtml}${chipHtml}</div>`;
    }
    const sig = `${idx}|${formatted}|${unit}|${iconValue}|${iconStrategy}|${showIcon}|${showLabel}|${showValue}|${overflowMode}|${labelOverflow}|${marqueeSpeed}|${marqueeRtl}|${width}|${height}|${nameSig}|${effectiveBg}|${bgStyle}|${effectiveFormat}|${iconBg != null ? iconBg : ""}|${isFree}|${posAnchor}|${posX}|${posY}|${effectiveBgColor}|${effectiveIconBgColor}|${chip.padding != null ? chip.padding : ""}|${chip.text_size || ""}|${chip.label_size || ""}|${chip.inner_gap || ""}|${chip.text_gap || ""}|${chip.icon_size || ""}|${chip.icon_padding || ""}|${chipAlignClass}|${subValueSig}|${chip.sub_value_position || ""}|${chip.sub_value_format != null ? chip.sub_value_format : ""}|${chip.sub_value_size || ""}|${chip.sub_value_weight || ""}|${chip.sub_value_overflow || ""}|${chip.hide_sub_value || ""}|${isBehind}|${useFancyUnit}|${chip.value_weight || ""}|${chip.label_weight || ""}|${chip.chip_round || ""}|${chip.type || ""}|${chip.ring_min != null ? chip.ring_min : ""}|${chip.ring_max != null ? chip.ring_max : ""}|${chip.ring_color || ""}|${chip.ring_width || ""}|${chip.ring_gap || ""}|${chip.ring_threshold_mode || ""}|${thresholdSig(chip.ring_thresholds)}|${chip.bar_min != null ? chip.bar_min : ""}|${chip.bar_max != null ? chip.bar_max : ""}|${chip.bar_color || ""}|${chip.bar_height || ""}|${chip.bar_gap || ""}|${chip.bar_threshold_mode || ""}|${thresholdSig(chip.bar_thresholds)}|${gaugeSig}|${sunPath ? `sp:${sunPath.night}|${sunPath.t.toFixed(3)}|${+sunPath.from}|${+sunPath.to}|${chip.date_format || ""}` : ""}`;
    return {
      html: chipHtml,
      sig,
      sensorObj,
      iconStrategy,
      showIcon,
      isFree,
      isBehind,
      posAnchor,
      posX,
      posY,
      width,
      idx,
      // For the temperature curve over the forecast chips.
      fcEntry: isForecast ? fcEntry : null,
      fcUnit: isForecast ? unit : "",
      attribute: chip.attribute || "",
    };
  }
  // image_folder: the first picture of the folder that exists for this
  // weather. undefined while a file is still being asked for, null for none.
  _folderImage(state, isNight) {
    const cfg = this._config;
    const list = folderImageCandidates(cfg.image_folder, cfg.image_folder_type, state, isNight);
    for (const url of list) {
      if (url === FOLDER_BASE) {
        if (cfg.image_night) return null;
        continue;
      }
      const seen = _folderSeen.get(url);
      if (seen === true) return url;
      if (seen === false) continue;
      let wait = _folderWait.get(url);
      if (!wait) {
        wait = this._probeImage(url).then((ok) => {
          _folderSeen.set(url, ok === true);
          _folderWait.delete(url);
        });
        _folderWait.set(url, wait);
      }
      wait.then(() => {
        const a = this._imageArgs;
        if (a && this.isConnected) this._updateImage(this._hass || a[0], a[1], a[2]);
      });
      return undefined;
    }
    return null;
  }
  // True when the picture loads. A missing file shows up as a 404 in the
  // browser console once; that is how a browser tells.
  _probeImage(url) {
    return new Promise((resolve) => {
      const probe = new Image();
      probe.onload = () => resolve(true);
      probe.onerror = () => resolve(false);
      probe.src = url;
    });
  }
  _updateImage(hass, isNight, state) {
    if (!this._elements || !this._elements.img || !this._elements.imageSlot)
      return;
    this._imageArgs = [hass, isNight, state];
    const img = this._elements.img;
    const slot = this._elements.imageSlot;
    let statusSrc = this._calculateStatusImage(hass, isNight);
    if (!statusSrc && this._config.image_folder) {
      const found = this._folderImage(state || this._lastState || "", isNight);
      // Still asking: the shown image stays until the answer is in.
      if (found === undefined) {
        if (!img.getAttribute("src")) slot.hidden = true;
        return;
      }
      statusSrc = found;
    }
    const baseSrc = isNight ? this._config.image_night : this._config.image_day;
    const src = statusSrc || baseSrc || this._config.image_day || "";
    if ((img.getAttribute("src") || "") === src) {
      // Back to the shown image before the next one had loaded: drop that one.
      if (this._imgPending != null) {
        this._imgToken = (this._imgToken || 0) + 1;
        this._imgPending = null;
      }
      slot.hidden = !src;
      return;
    }
    if (this._imgPending === src) return;
    // image_transition: seconds the old image takes to blend into the new
    // one, 0 switches at once. No blend for the first image, before the card
    // has faded in, or with reduced motion.
    const ms =
      readNumber(this._config.image_transition, CONFIG_DEFAULTS.image_transition, 0, 10) * 1000;
    const reduceMotion =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (
      !ms ||
      reduceMotion ||
      !img.getAttribute("src") ||
      !(this._renderGate && this._renderGate.isRevealed) ||
      typeof img.animate !== "function"
    ) {
      this._finishImageFade();
      this._imgToken = (this._imgToken || 0) + 1;
      this._imgPending = null;
      if (src) img.src = src;
      else img.removeAttribute("src");
      slot.hidden = !src;
      return;
    }
    this._startImageFade(src, ms);
  }
  _wireImage(img) {
    img.onerror = () => {
      img.style.opacity = "0";
    };
    img.onload = () => {
      img.style.opacity = "1";
      // The picture's shape: under image_max_width the slot keeps the whole
      // picture instead of a box with the picture shrunk inside it.
      const slot = this._elements && this._elements.imageSlot;
      if (slot && img.naturalWidth > 0 && img.naturalHeight > 0)
        slot.style.setProperty("--_awc-img-ar", (img.naturalWidth / img.naturalHeight).toFixed(4));
    };
  }
  // Loads the next image next to the shown one and blends them once it is
  // ready, so the slot never shows a gap.
  _startImageFade(src, ms) {
    this._finishImageFade();
    const token = (this._imgToken = (this._imgToken || 0) + 1);
    this._imgPending = src;
    const next = this._elements.img.cloneNode(false);
    next.removeAttribute("style");
    this._wireImage(next);
    if (src) next.src = src;
    else next.removeAttribute("src");
    const ready =
      src && typeof next.decode === "function"
        ? next.decode().then(
            () => true,
            () => false,
          )
        : Promise.resolve(true);
    ready.then((loaded) => {
      if (token !== this._imgToken || !this._elements) return;
      this._imgPending = null;
      const slot = this._elements.imageSlot;
      const old = this._elements.img;
      // A path that does not load: no blend, it is hidden like before.
      if (!loaded) {
        old.replaceWith(next);
        this._elements.img = next;
        next.style.opacity = "0";
        slot.hidden = false;
        return;
      }
      // The old image leaves the flow and lies on top of the new one.
      old.classList.add("awc-img-layer");
      slot.insertBefore(next, old);
      this._elements.img = next;
      slot.hidden = false;
      // The new image comes in under the old one first, the old one only
      // lets go in the second half: the picture never turns see-through.
      const opts = { duration: ms, fill: "forwards", easing: "ease-in-out" };
      const anims = [
        next.animate(
          [{ opacity: 0 }, { opacity: 1, offset: 0.6 }, { opacity: 1 }],
          opts,
        ),
        old.animate(
          [{ opacity: 1 }, { opacity: 1, offset: 0.4 }, { opacity: 0 }],
          opts,
        ),
      ];
      this._imgFade = { old, anims };
      // cancel() rejects finished; a cut-short blend is no error.
      anims[1].finished.catch(() => {});
      anims[0].finished.then(
        () => {
          if (this._imgFade && this._imgFade.old === old) this._finishImageFade();
        },
        () => {},
      );
    });
  }
  // Ends a running blend at once: the old image goes, the new one stays.
  _finishImageFade() {
    const fade = this._imgFade;
    if (!fade) return;
    this._imgFade = null;
    fade.anims.forEach((a) => a.cancel());
    fade.old.remove();
    if (this._elements && this._elements.imageSlot)
      this._elements.imageSlot.hidden = !this._elements.img.getAttribute("src");
  }
  _refreshMarqueeObservation() {
    if (!this._marqueeObserver) {
      this._marqueeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          entry.target
            .querySelectorAll(".awc-marquee-host")
            .forEach((host) => this._measureMarqueeOne(host));
        }
      });
    }
    this._marqueeObserver.disconnect();
    for (const bt of [this._elements && this._elements.chipsRow, this._elements && this._elements.chipsRow2]) {
      if (!bt) continue;
      bt.querySelectorAll(".chip.overflow-marquee").forEach((chip) =>
        this._marqueeObserver.observe(chip),
      );
    }
    const tw = this._elements && this._elements.textWrapper;
    if (tw) {
      tw.querySelectorAll(".chip-free .chip.overflow-marquee").forEach((chip) =>
        this._marqueeObserver.observe(chip),
      );
    }
  }
  _measureMarqueeOne(host) {
    const track = host.querySelector(".awc-marquee-track");
    if (!track) return;
    const rtl = host.dataset.rtl === "1";
    host.classList.toggle("awc-marquee-rtl", rtl);
    if (host.clientWidth === 0) return;
    const firstText = track.querySelector(".awc-marquee-text");
    if (!firstText) return;
    const naturalWidth = firstText.offsetWidth;
    const hostWidth = host.clientWidth;
    const shouldAnimate = naturalWidth > hostWidth + 1;
    if (shouldAnimate) {
      if (track.childElementCount === 1) {
        const sep1 = document.createElement("span");
        sep1.className = "awc-marquee-sep";
        const text2 = firstText.cloneNode(true);
        const sep2 = document.createElement("span");
        sep2.className = "awc-marquee-sep";
        track.append(sep1, text2, sep2);
      }
      const loopWidth = track.scrollWidth / 2,
        speed = Math.max(5, parseFloat(host.dataset.speed) || 30),
        duration = Math.max(2, loopWidth / speed);
      host.style.setProperty(
        "--awc-marquee-duration",
        `${duration.toFixed(2)}s`,
      );
      host.classList.add("is-animating");
    } else {
      while (track.childElementCount > 1) track.lastElementChild.remove();
      host.classList.remove("is-animating");
      host.style.removeProperty("--awc-marquee-duration");
    }
  }
  _computeVerticalVisHeight(
    bt = this._elements && this._elements.chipsRow,
    cfg = this._config,
  ) {
    if (!bt || !bt.children.length) return;
    const visCount = parseInt(cfg.chip_area_scroll_count, 10);
    if (!Number.isFinite(visCount) || visCount < 1) return;
    const firstChip = bt.children[0];
    if (!firstChip || firstChip.offsetHeight < 1) return;
    const gap = parseFloat(getComputedStyle(bt).gap) || 8;
    bt.style.setProperty(
      "--awc-row-max-height",
      `${firstChip.offsetHeight * visCount + gap * (visCount - 1)}px`,
    );
  }
  // VISIBILITY, EVENTS & INITIALIZATION
  _handleVisibilityChange(entries) {
    const entry = entries[0],
      wasVisible = this._isVisible;
    this._isVisible = entry.isIntersecting;
    if (this._elements && this._elements.root)
      this._elements.root.classList.toggle("is-offscreen", !this._isVisible);
    if (this._isVisible && !wasVisible) {
      if (this._needsReinit) {
        this._needsReinit = false;
        try {
          this._initParticles();
        } catch (e) {
          console.error("ATMO-WEATHER-CARD: _initParticles failed", e);
        }
        if (this._width > 0) this._lastInitWidth = this._width;
      }
      this._startAnimation();
    } else if (!this._isVisible && wasVisible) {
      this._stopAnimation();
    }
  }
  _handleTap(e) {
    e.stopPropagation();
    const cfg = this._config;
    const event = new CustomEvent("hass-action", {
      bubbles: true,
      composed: true,
      detail: {
        config: { entity: cfg.weather_entity, tap_action: cfg.card_tap_action },
        action: "tap",
      },
    });
    this.dispatchEvent(event);
  }
  _handleChipClick(e) {
    const chipEl = e.target.closest(".chip");
    if (!chipEl) return;
    const idx = parseInt(chipEl.dataset.idx, 10);
    const chip = this._chips && this._chips[idx];
    if (!chip || !chip.entity) return;
    e.stopPropagation();
    const tapAction = chip.tap_action || { action: "more-info" };
    const event = new CustomEvent("hass-action", {
      bubbles: true,
      composed: true,
      detail: {
        config: { entity: chip.entity, tap_action: tapAction },
        action: "tap",
      },
    });
    this.dispatchEvent(event);
  }
  _tryInitialize() {
    if (this._initializationComplete) return;
    if (!this._renderGate.hasFirstHass) return;
    if (!this._renderGate.hasValidDimensions) return;
    if (!this._cachedDimensions.width || !this._cachedDimensions.height) return;
    this._initializationComplete = true;
    const w = this._cachedDimensions.width / this._cachedDimensions.dpr;
    const h = this._cachedDimensions.height / this._cachedDimensions.dpr;
    this._width = w;
    this._lastInitWidth = w;
    requestAnimationFrame(() => {
      if (!this.isConnected) return;
      try {
        this._initParticles(w, h);
      } catch (e) {
        console.error("ATMO-WEATHER-CARD: _initParticles failed", e);
      }
      this._configureCloudBreathingTimer();
      this._checkRenderGate();
    });
  }
  _updateCanvasDimensions(forceW = null, forceH = null) {
    if (!this._elements || !this._elements.root || !this._ctxs) return false;
    if (this._config.card_square && forceW === null) {
      const currentW = this._elements.root.clientWidth;
      if (currentW > 0 && Math.abs(this.clientHeight - currentW) > 1)
        this.style.height = `${currentW}px`;
    }
    let scaledWidth,
      scaledHeight,
      dpr,
      rawW = forceW !== null ? forceW : this._elements.root.clientWidth;
    let rawH = forceH !== null ? forceH : this._elements.root.clientHeight;
    if (rawW === 0 || rawH === 0) return false;
    dpr = Math.min(window.devicePixelRatio || 1, this._perfDpr);
    scaledWidth = rawW * dpr;
    scaledHeight = rawH * dpr;
    const totalPixels = scaledWidth * scaledHeight;
    const maxPixels = this._perfMaxPixels || PERFORMANCE_CONFIG.MAX_PIXELS;
    if (totalPixels > maxPixels) {
      const scaleDown = Math.sqrt(maxPixels / totalPixels);
      scaledWidth *= scaleDown;
      scaledHeight *= scaleDown;
      dpr *= scaleDown; // Lowers internal render res while keeping physical CSS size accurate
    }
    scaledWidth = Math.floor(scaledWidth);
    scaledHeight = Math.floor(scaledHeight);
    const widthChanged = this._cachedDimensions.width !== scaledWidth,
      dprChanged = this._cachedDimensions.dpr !== dpr;
    const heightDiff = Math.abs(this._cachedDimensions.height - scaledHeight);
    if (!widthChanged && !dprChanged && heightDiff === 0) return false;
    this._cachedDimensions = { width: scaledWidth, height: scaledHeight, dpr };
    this._updateCompassScale();
    for (const k of ["bg", "mid", "fg"]) {
      const canvas = this._elements[k],
        ctx = this._ctxs[k];
      if (
        !canvas ||
        !ctx ||
        (canvas.width === scaledWidth && canvas.height === scaledHeight)
      )
        continue;
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
      canvas.style.width = `${forceW !== null ? forceW : scaledWidth / dpr}px`;
      canvas.style.height = `${forceH !== null ? forceH : scaledHeight / dpr}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingQuality = "high";
    }
    if (scaledWidth > 0 && scaledHeight > 0) {
      const cssW = scaledWidth / dpr,
        cssH = scaledHeight / dpr,
        celestial = this._getCelestialPosition(cssW, cssH);
      const dx2 = Math.max(celestial.x, cssW - celestial.x),
        dy2 = Math.max(celestial.y, cssH - celestial.y);
      const glowRadius = Math.ceil(Math.sqrt(dx2 * dx2 + dy2 * dy2) * 0.3);
      this._elements.root.style.setProperty("--c-x", `${celestial.x}px`);
      this._elements.root.style.setProperty("--c-y", `${celestial.y}px`);
      this._elements.root.style.setProperty("--c-r", `${glowRadius}px`);
      this._renderGate.hasValidDimensions = true;
      this._checkRenderGate();
    }
    // The canvases always follow the card; the scene is only rebuilt for a
    // real size change, not when a chip row wraps.
    return widthChanged || dprChanged || heightDiff >= 60 * dpr;
  }
  _scheduleParticleReinit() {
    this._pendingResize = true;
    if (this._resizeDebounceTimer) clearTimeout(this._resizeDebounceTimer);
    this._resizeDebounceTimer = setTimeout(() => {
      this._resizeDebounceTimer = null;
      if (this._lastInitWidth > 0 && this._cachedDimensions.width > 0) {
        const currentCSSWidth =
          this._cachedDimensions.width / this._cachedDimensions.dpr;
        const diff = Math.abs(currentCSSWidth - this._lastInitWidth);
        const heightDiff = Math.abs(
          this._cachedDimensions.height / this._cachedDimensions.dpr -
            (this._lastInitHeight || 0),
        );
        if (diff < 100 && heightDiff < 60) {
          this._pendingResize = false;
          return;
        }
      }
      if (this._pendingResize && this._stateInitialized) {
        this._pendingResize = false;
        if (this._elements && this._elements.root)
          this._lastInitWidth = this._elements.root.clientWidth;
        try {
          this._initParticles();
        } catch (e) {
          console.error("ATMO-WEATHER-CARD: _initParticles failed", e);
        }
      }
    }, PERFORMANCE_CONFIG.RESIZE_DEBOUNCE_MS);
  }
  _checkRenderGate() {
    if (this._renderGate.isRevealed) return;
    const canReveal =
      this._renderGate.hasValidDimensions &&
      this._renderGate.hasFirstHass &&
      this._stateInitialized;
    if (canReveal) {
      this._renderGate.isRevealed = true;
      requestAnimationFrame(() => {
        if (this._elements && this._elements.root)
          this._elements.root.classList.add("revealed");
      });
    }
  }
  // TEXTURE BUILDING
  _buildTextures() {
    const isLight = this._isLightBackground,
      rs = this._renderState;
    if (!rs) return;
    // --- Hail sprite (32x32 hexagonal ice pellet) ---
    if (!this._hailTex || this._hailTexLight !== isLight) {
      this._hailTexLight = isLight;
      const hc = document.createElement("canvas");
      hc.width = 32;
      hc.height = 32;
      const hcCtx = hc.getContext("2d", { willReadFrequently: false });
      const center = 16,
        size = 14;
      const iceGradient = hcCtx.createRadialGradient(
        center,
        center - size * 0.3,
        0,
        center,
        center,
        size,
      );
      if (isLight) {
        iceGradient.addColorStop(0, "rgba(240,250,255,1)");
        iceGradient.addColorStop(0.5, "rgba(210,230,250,0.85)");
        iceGradient.addColorStop(1, "rgba(170,200,240,0.5)");
      } else {
        iceGradient.addColorStop(0, "rgba(255,255,255,1)");
        iceGradient.addColorStop(0.5, "rgba(230,245,255,0.85)");
        iceGradient.addColorStop(1, "rgba(200,225,250,0.5)");
      }
      hcCtx.fillStyle = iceGradient;
      hcCtx.beginPath();
      for (let j = 0; j < 6; j++) {
        const angle = (Math.PI * 2 * j) / 6,
          x = center + Math.cos(angle) * size,
          y = center + Math.sin(angle) * size;
        if (j === 0) hcCtx.moveTo(x, y);
        else hcCtx.lineTo(x, y);
      }
      hcCtx.closePath();
      hcCtx.fill();
      hcCtx.fillStyle = "rgba(255,255,255,0.6)";
      hcCtx.beginPath();
      hcCtx.arc(
        center - size * 0.3,
        center - size * 0.3,
        size * 0.3,
        0,
        Math.PI * 2,
      );
      hcCtx.fill();
      this._hailTex = hc;
    }
    // --- Wind vapor sprite (128x24 streaked wisp) ---
    const isDark = this._isThemeDark,
      cp = rs.cp;
    const colorKey = isDark
      ? `${cp.litR},${cp.litG},${cp.litB}`
      : `${cp.midR},${cp.midG},${cp.midB}`;
    if (
      !this._vaporTex ||
      this._vaporTexColor !== colorKey ||
      this._vaporTexDark !== isDark
    ) {
      this._vaporTexColor = colorKey;
      this._vaporTexDark = isDark;
      const vc = document.createElement("canvas");
      vc.width = 128;
      vc.height = 24;
      const vCtx = vc.getContext("2d", { willReadFrequently: false });
      const peakAlpha = isDark ? 0.4 : 0.55,
        hGrad = vCtx.createLinearGradient(0, 12, 128, 12);
      hGrad.addColorStop(0, `rgba(${colorKey}, 0)`);
      hGrad.addColorStop(0.04, `rgba(${colorKey}, ${peakAlpha * 0.18})`);
      hGrad.addColorStop(0.1, `rgba(${colorKey}, ${peakAlpha * 0.88})`);
      hGrad.addColorStop(0.16, `rgba(${colorKey}, ${peakAlpha})`);
      hGrad.addColorStop(0.26, `rgba(${colorKey}, ${peakAlpha * 0.82})`);
      hGrad.addColorStop(0.4, `rgba(${colorKey}, ${peakAlpha * 0.52})`);
      hGrad.addColorStop(0.58, `rgba(${colorKey}, ${peakAlpha * 0.26})`);
      hGrad.addColorStop(0.76, `rgba(${colorKey}, ${peakAlpha * 0.1})`);
      hGrad.addColorStop(0.92, `rgba(${colorKey}, ${peakAlpha * 0.02})`);
      hGrad.addColorStop(1, `rgba(${colorKey}, 0)`);
      vCtx.fillStyle = hGrad;
      vCtx.fillRect(0, 0, 128, 24);
      vCtx.globalCompositeOperation = "destination-in";
      const vGrad = vCtx.createLinearGradient(0, 0, 0, 24);
      vGrad.addColorStop(0, "rgba(255,255,255,0)");
      vGrad.addColorStop(0.3, "rgba(255,255,255,0.75)");
      vGrad.addColorStop(0.42, "rgba(255,255,255,1)");
      vGrad.addColorStop(0.58, "rgba(255,255,255,1)");
      vGrad.addColorStop(0.7, "rgba(255,255,255,0.75)");
      vGrad.addColorStop(1, "rgba(255,255,255,0)");
      vCtx.fillStyle = vGrad;
      vCtx.fillRect(0, 0, 128, 24);
      this._vaporTex = vc;
    }
  }
  // PARTICLE FACTORY
  _initParticles(forceW = null, forceH = null) {
    if (!this._elements || !this._elements.root) return;
    let w, h;
    if (forceW !== null && forceH !== null) {
      w = forceW;
      h = forceH;
    } else {
      w = this._elements.root.clientWidth;
      h = this._elements.root.clientHeight;
    }
    const p = this._params;
    if (w === 0 || h === 0 || !p) return;
    this._lastInitHeight = h;
    this._clearAllParticles();
    const fx = this._perfEffects,
      isUltra = fx >= 2;
    if (
      fx >= 1 &&
      this._isNight &&
      p.type === "stars" &&
      Math.random() < (isUltra ? 0.0028 : 0.00154) * cometRate(this)
    )
      this._comets.push(this._createComet(w, h));
    if (this._perfFauna >= 2 && this._faunaPlanes && Math.random() < 0.25)
      this._planes.push(this._createPlane(w, h));
    if (p.type === "fog" || p.foggy) this._initFogBanks(w, h);
    if ((p.count || 0) > 0 && p.type !== "stars" && p.type !== "fog")
      this._initPrecipitation(w, h, p);
    if ((p.cloud || 0) > 0) this._initClouds(w, h, p);
    if (
      this._isNight &&
      (p.cloud || 0) < 5 &&
      p.atmosphere !== "night" &&
      !p.foggy
    )
      this._initNightClouds(w, h);
    const celestialDecor = !this._isNight ? p.celestial : null;
    const wantsCelestialClouds =
      fx >= 1 &&
      (p.sunCloudWarm ||
        celestialDecor ||
        (this._isNight &&
          !p.thunder &&
          !p.foggy &&
          p.type !== "hail" &&
          p.atmosphere !== "night"));
    if (wantsCelestialClouds)
      this._initCelestialClouds(w, h, p.sunCloudWarm ? null : celestialDecor);
    const starBase =
      this._renderState && this._renderState.starMode !== "hidden"
        ? p.stars || 0
        : 0;
    const starCount = p.overcast ? Math.min(starBase, 15) : starBase;
    if (starCount > 0) this._initStars(w, h, starCount);
    const ws = (this._lastState || "").toLowerCase();
    if (
      fx >= 1 &&
      starCount > 150 &&
      (ws === "clear-night" || ws === "sunny" || ws === "exceptional")
    ) {
      this._bakeMilkyWay(w, h);
    }
    const vaporFlat = p.windVapor === true || (this._windKmh || 0) >= 20;
    if (fx >= 1 && p.vapor !== 0 && !(p.flow && this._windStyle !== "off"))
      this._initWindVapor(w, h, p.vapor || 24, p.vaporScale || 1.0, vaporFlat);
    this._bakeAllClouds();
  }
  _createComet(w, h) {
    return {
      x: w * 0.15,
      y: h * 0.08,
      vx: -2.2 - Math.random() * 1.2,
      vy: 0.8 + Math.random() * 0.4,
      life: 1.0,
      tailBuf: new Float32Array(trailPoints(this, TRAIL_CAP_COMET) * 2),
      _trailCap: trailPoints(this, TRAIL_CAP_COMET),
      tailHead: 0,
      tailLen: 0,
      size: 3 + Math.random() * 2,
      // Without colors the comet glow fails and stops every frame.
      ...cometColors(this),
    };
  }
  _createPlane(w, h) {
    const goingRight = Math.random() > 0.5,
      dir = goingRight ? 1 : -1;
    // Near (bigger) planes cross the sky faster than distant ones.
    const scale = 0.5 + Math.random() * 0.4,
      baseSpeed = planeSpeedForScale(scale) * (0.94 + Math.random() * 0.12);
    const climbAngle =
      Math.random() < 0.33 ? (1 + Math.random() * 4) * (Math.PI / 180) : 0;
    return {
      x: goingRight ? -100 : w + 100,
      y: h * 0.15 + Math.random() * (h * 0.52),
      vx: dir * Math.cos(climbAngle) * baseSpeed,
      vy: -Math.sin(climbAngle) * baseSpeed,
      climbAngle,
      scale,
      blinkPhase: Math.random() * 10,
      histBuf: new Float32Array(TRAIL_CAP_PLANE * 3),
      histHead: 0,
      histLen: 0,
      gapTimer: 0,
      _lastRecX: -9999,
      _lastRecY: -9999,
    };
  }
  _initFogBanks(w, h) {
    for (let i = 0; i < 10; i++) {
      const layer = i / 10;
      this._fogBanks.push({
        x: Math.random() * w,
        y: h - Math.random() * (h * 0.7),
        w: w * (1.2 + Math.random() * 0.8),
        h: 40 + Math.random() * 50,
        speed: (Math.random() * 0.15 + 0.03) * (Math.random() > 0.5 ? 1 : -1),
        opacity: this._isLightBackground
          ? 0.35 + layer * 0.2 + Math.random() * 0.1
          : 0.12 + layer * 0.1 + Math.random() * 0.08,
        layer: layer,
        phase: Math.random() * TWO_PI,
      });
    }
  }
  _initPrecipitation(w, h, p) {
    // Rain and snow are created for the highest density; the density
    // options decide how many are drawn (see atmo-weather-precip.js).
    const counts = precipCounts(p.type, p.count || 0, w, h);
    const kind = rainKind(p);
    this._snowPile = null;
    for (let i = 0; i < counts.rain; i++) {
      const pt = { type: "rain", _fadeIn: 1 };
      setupDrop(pt, kind, w, h, true);
      this._rain.push(pt);
    }
    for (let i = 0; i < counts.snow; i++) {
      const pt = { type: "snow", _fadeIn: 1 };
      setupFlake(pt, w, h, true);
      this._snow.push(pt);
    }
    for (let i = 0; i < counts.hail; i++) {
      const z = 0.5 + Math.random();
      this._hail.push({
        type: "hail",
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        turbulence: Math.random() * TWO_PI,
        _fadeIn: 1,
        speedY: (12 + Math.random() * 8) * z,
        size: (2 + Math.random() * 2) * z,
        rotation: Math.random() * TWO_PI,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        op: this._isLightBackground
          ? 0.5 + Math.random() * 0.4
          : 0.4 + Math.random() * 0.4,
      });
    }
  }
  _initClouds(w, h, p) {
    const isStandalone = !this._isImmersive;
    // Immersive dark-day has no sky layer, so clouds must cover more vertical space.
    const isDarkDayImmersive = this._isDarkDayImmersive;
    const heightLimit = isStandalone ? 0.75 : isDarkDayImmersive ? 0.72 : 0.55;
    if ((p.cloud || 0) <= 0) return;
    // The clouds fill a ring wider than the card, see CLOUD_RING_OVERHANG. The
    // count grows with it, so the card itself stays as full as before.
    const ringStart = -w * CLOUD_RING_OVERHANG;
    const ringW = w * (1 + CLOUD_RING_OVERHANG);
    const totalClouds = Math.round(p.cloud * (1 + CLOUD_RING_OVERHANG));
    const configScale = p.scale || 1.0;
    const isHeavy = p.cloud >= 18;
    const pq = Math.max(0.3, this._perfCloudQuality / 1.5);
    // Per-session size bias (~±0.13). Shifts rollLarge/rollMedium so reloads
    // yield visibly different size mixes.
    this._sessionSizeBias = (Math.random() - 0.5) * 0.26;
    // Height-proportional puff anatomy — sub-linear so short cards aren't dominated
    const REFERENCE_HEIGHT = 350;
    const baseUnit = Math.max(
      100 * Math.pow(Math.max(h, 80) / REFERENCE_HEIGHT, 0.7),
      70,
    );
    // Silhouette compression — wide+flat shape, puffs stay round
    const baseVCompress = 0.55;
    // Cluster placement — fewer clusters = visible banks with open sky gaps
    const overcast = p.overcast === true;
    const clusterCount = overcast
      ? Math.max(6, Math.floor(totalClouds / 5))
      : isHeavy
        ? Math.max(3, Math.floor(totalClouds / 6))
        : 2 + Math.floor(Math.random() * 2);
    const clusters = [];
    for (let c = 0; c < clusterCount; c++) {
      const baseX = ringStart + ringW * ((c + 0.5) / clusterCount);
      clusters.push(
        overcast
          ? {
              x: baseX + (Math.random() - 0.5) * (ringW / clusterCount),
              y: h * (0.04 + Math.random() * (heightLimit * 1.1)),
              spreadX: w * (0.16 + Math.random() * 0.12),
              spreadY: h * (0.08 + Math.random() * 0.08),
              weight: 0.8 + Math.random() * 0.4,
            }
          : {
              x: baseX + (Math.random() - 0.5) * (ringW / clusterCount) * 0.4,
              y: h * (0.11 + Math.random() * (heightLimit - 0.16)),
              spreadX: (ringW / clusterCount) * (0.3 + Math.random() * 0.2),
              spreadY: h * (0.06 + Math.random() * 0.1),
              weight: 0.5 + Math.random(),
            },
      );
    }
    // Clouds go to the banks in turn, so every bank gets the same share.
    let nextCluster = 0;
    const pickCluster = () => clusters[nextCluster++ % clusters.length];
    // Approximate Gaussian via Irwin-Hall (sum of 3 uniforms)
    const gaussRand = () =>
      (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    // ── Filler wisps (background haze) ──
    const fillerRatio = overcast ? 0.3 : isHeavy ? 0.12 : 0.06,
      fillerCount = Math.floor(totalClouds * fillerRatio);
    for (let i = 0; i < fillerCount; i++) {
      const seed = Math.random() * 10000;
      this._clouds.push({
        x: ringStart + Math.random() * ringW,
        y: overcast
          ? h * (0.02 + Math.random() * heightLimit * 0.35)
          : h * (0.08 + Math.random() * (heightLimit * 0.6 - 0.08)),
        scale:
          (0.55 + Math.random() * 0.4) * configScale * (overcast ? 2.0 : 1.6),
        speed: 0.002 + Math.random() * 0.002,
        puffs: CloudShapeGenerator.generateWispyPuffs(seed, baseUnit, pq),
        cloudType: "stratus",
        layer: 0,
        opacity: 0.3 + Math.random() * 0.18,
        seed,
        breathPhase: Math.random() * TWO_PI,
        breathSpeed: 0.001,
        _hStretch: 1.0,
        _vCompress: baseVCompress,
      });
    }
    // ── Main clouds ──
    const mainCount = totalClouds - fillerCount,
      companions = [];
    // Pick a sky composition for this session — drives variety across reloads
    const compositions = p.types || WEATHER_MAP["default"].types;
    const typePool =
      compositions[Math.floor(Math.random() * compositions.length)];
    for (let i = 0; i < mainCount; i++) {
      const seed = Math.random() * 10000,
        type = typePool[Math.floor(Math.random() * typePool.length)];
      // ── Cluster-based X/Y with type-aware loner escape ──
      // Cumulus/cirrus have enough internal structure to stand alone.
      // Organic/stratus/storm are blobs — they need neighbors to look volumetric.
      let xPos, yPos;
      const hasStructure = type === "cumulus" || type === "cirrus";
      const lonerChance = hasStructure
        ? isHeavy
          ? 0.4
          : 0.2
        : isHeavy
          ? 0.12
          : 0.08;
      const isLoner = Math.random() < lonerChance,
        cluster = pickCluster();
      if (isLoner) {
        xPos = ringStart + Math.random() * ringW;
      } else {
        xPos = cluster.x + gaussRand() * cluster.spreadX;
      }
      let layer;
      const spec = CLOUD_TYPES[type] || CLOUD_TYPES.organic;
      layer = Math.random() < 0.5 ? spec.layers[0] : spec.layers[1];
      // Puff generation
      let puffs,
        isUncinus = false;
      if (type === "storm")
        puffs = CloudShapeGenerator.generateOrganicPuffs(
          true,
          seed,
          baseUnit,
          pq,
        );
      else if (type === "organic")
        puffs = CloudShapeGenerator.generateOrganicPuffs(
          false,
          seed,
          baseUnit,
          pq,
        );
      else if (type === "cirrus") {
        isUncinus = spec.uncinus && Math.random() < spec.uncinus[0];
        puffs = isUncinus
          ? CloudShapeGenerator.generateCirrusUncinusPuffs(seed, baseUnit, pq)
          : CloudShapeGenerator.generateCirrusLayeredPuffs(seed, baseUnit, pq);
      } else {
        puffs = CloudShapeGenerator.generateMixedPuffs(
          seed,
          type === "stratus" ? "stratus" : "cumulus",
          baseUnit,
          pq,
        );
      }
      const scaleX = spec.jitterX[0] + Math.random() * spec.jitterX[1];
      const scaleY = spec.jitterY[0] + Math.random() * spec.jitterY[1];
      if (puffs) {
        for (let k = 0; k < puffs.length; k++) {
          puffs[k].offsetX *= scaleX;
          puffs[k].offsetY *= scaleY;
        }
      }
      let hStretch, vCompress;
      if (isUncinus) {
        hStretch = spec.uncinus[1] + Math.random() * spec.uncinus[2];
        vCompress = baseVCompress * spec.uncinus[3];
      } else {
        hStretch = spec.stretch[0] + Math.random() * spec.stretch[1];
        vCompress = baseVCompress * spec.flattenMul;
      }
      let cloudScale;
      const sizeRoll = Math.random();
      const layerSizeBias = 0.85 + layer * 0.05;
      const rollLarge = isHeavy
        ? 0.4 + this._sessionSizeBias
        : 0.25 + this._sessionSizeBias;
      const rollMedium = isHeavy
        ? 0.88 + this._sessionSizeBias * 0.5
        : 0.5 + this._sessionSizeBias * 0.5;
      if (sizeRoll < rollLarge) {
        cloudScale = (1.2 + Math.random() * 0.9) * configScale * layerSizeBias;
      } else if (sizeRoll < rollMedium) {
        const base = isHeavy ? 0.7 : 0.5,
          range = isHeavy ? 0.35 : 0.22;
        cloudScale =
          (base + Math.random() * range) * configScale * layerSizeBias;
      } else {
        const base = isHeavy ? 0.62 : 0.4,
          range = isHeavy ? 0.14 : 0.18;
        cloudScale =
          (base + Math.random() * range) * configScale * layerSizeBias;
      }
      cloudScale = Math.min(cloudScale, 2.8);
      let yMin = spec.yBand[0];
      let yMax =
        spec.yBand[1] < 0 ? heightLimit + spec.yBand[1] : spec.yBand[1];
      if (isDarkDayImmersive) {
        if (type === "stratus") yMax = 0.48;
        else if (type === "cirrus") yMax = 0.35;
      }
      if (isLoner) {
        yPos = h * (yMin + Math.random() * (yMax - yMin));
      } else {
        const typeY = h * (yMin + Math.random() * (yMax - yMin)),
          clusterBias = cluster.y + gaussRand() * cluster.spreadY * 0.3;
        const clamped = Math.max(h * yMin, Math.min(h * yMax, clusterBias));
        yPos = typeY * 0.6 + clamped * 0.4;
      }
      yPos = Math.max(h * 0.08, yPos);
      this._clouds.push({
        x: xPos,
        y: yPos,
        scale: cloudScale,
        speed: (0.02 + Math.random() * 0.03) * (layer * 0.4 + 1),
        puffs,
        cloudType: type,
        layer,
        opacity: 1 - layer * 0.12,
        seed,
        breathPhase: Math.random() * TWO_PI,
        breathSpeed: 0.002 + Math.random() * 0.004,
        _hStretch: hStretch,
        _vCompress: vCompress,
      });
      if (
        !p.dark &&
        (type === "cumulus" || type === "organic") &&
        cloudScale > 0.75 * configScale &&
        Math.random() < 0.15
      ) {
        const cSeed = Math.random() * 10000;
        const cPuffs = CloudShapeGenerator.generateMixedPuffs(
          cSeed,
          "stratus",
          baseUnit,
          pq,
        );
        const cScaleX = 0.95 + Math.random() * 0.15,
          cScaleY = 0.92 + Math.random() * 0.12;
        for (let k = 0; k < cPuffs.length; k++) {
          cPuffs[k].offsetX *= cScaleX;
          cPuffs[k].offsetY *= cScaleY;
          cPuffs[k].rad *= 0.75;
        }
        const compOffX = baseUnit * 0.6,
          compOffY = baseUnit * 0.2;
        companions.push({
          x: xPos + (Math.random() - 0.5) * compOffX,
          y: yPos + (Math.random() - 0.5) * compOffY,
          scale: cloudScale * (0.7 + Math.random() * 0.3),
          speed: 0.01 + Math.random() * 0.02,
          puffs: cPuffs,
          cloudType: "stratus",
          layer: Math.max(0, layer - 1),
          opacity: 0.45 + Math.random() * 0.2,
          seed: cSeed,
          breathPhase: Math.random() * TWO_PI,
          breathSpeed: 0.002,
          _hStretch: 1.4 + Math.random() * 0.5,
          _vCompress: baseVCompress * 0.85,
        });
      }
    }
    for (let c = 0; c < companions.length; c++) {
      this._clouds.push(companions[c]);
    }
    const cirrusAtmos =
      p.atmosphere === "fair" ||
      p.atmosphere === "clear" ||
      p.atmosphere === "windy";
    if (!p.dark && totalClouds >= 12 && cirrusAtmos) {
      const accentCount = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < accentCount; i++) {
        const seed = Math.random() * 10000,
          cSpec = CLOUD_TYPES.cirrus,
          useUncinus = cSpec.uncinus && Math.random() < cSpec.uncinus[0];
        const cPuffs = useUncinus
          ? CloudShapeGenerator.generateCirrusUncinusPuffs(seed, baseUnit, pq)
          : CloudShapeGenerator.generateCirrusLayeredPuffs(seed, baseUnit, pq);
        const cScaleX = cSpec.jitterX[0] + Math.random() * cSpec.jitterX[1],
          cScaleY = cSpec.jitterY[0] + Math.random() * cSpec.jitterY[1];
        for (let k = 0; k < cPuffs.length; k++) {
          cPuffs[k].offsetX *= cScaleX;
          cPuffs[k].offsetY *= cScaleY;
        }
        const aHStretch = useUncinus
          ? cSpec.uncinus[1] + Math.random() * cSpec.uncinus[2]
          : cSpec.stretch[0] + Math.random() * cSpec.stretch[1];
        const aVCompress =
          baseVCompress * (useUncinus ? cSpec.uncinus[3] : cSpec.flattenMul);
        this._clouds.push({
          x: Math.random() * w,
          y: h * (0.05 + Math.random() * 0.12),
          scale: (1.0 + Math.random() * 0.4) * configScale,
          speed: 0.015 + Math.random() * 0.01,
          puffs: cPuffs,
          cloudType: "cirrus",
          layer: Math.floor(Math.random() * 2),
          opacity: 0.55 + Math.random() * 0.2,
          seed,
          breathPhase: Math.random() * TWO_PI,
          breathSpeed: 0.002,
          _hStretch: aHStretch,
          _vCompress: aVCompress,
        });
      }
    }
    if (!p.dark && p.atmosphere === "overcast") {
      const seed = Math.random() * 10000;
      const puffs = CloudShapeGenerator.generateMixedPuffs(
        seed,
        "cumulus",
        baseUnit,
        pq,
      );
      const scX = 0.92 + Math.random() * 0.12,
        scY = 0.9 + Math.random() * 0.14;
      for (let k = 0; k < puffs.length; k++) {
        puffs[k].offsetX *= scX;
        puffs[k].offsetY *= scY;
      }
      this._clouds.push({
        x: w * (0.2 + Math.random() * 0.6),
        y: h * (0.18 + Math.random() * 0.22),
        scale: 2.0 + Math.random() * 0.5,
        speed: 0.015 + Math.random() * 0.015,
        puffs,
        cloudType: "cumulus",
        layer: 2,
        opacity: 0.9,
        seed,
        breathPhase: Math.random() * TWO_PI,
        breathSpeed: 0.002 + Math.random() * 0.002,
        _hStretch: 1.0,
        _vCompress: baseVCompress * 1.2,
      });
    }
    this._clouds.sort((a, b) => a.layer - b.layer);
    if (totalClouds > 0) {
      const scudCount = isDarkDayImmersive
        ? 4 + Math.floor(Math.random() * 3)
        : 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < scudCount; i++) {
        const seed = Math.random() * 10000;
        this._fgClouds.push({
          x: Math.random() * w,
          y: isDarkDayImmersive
            ? h * 0.3 + Math.random() * (h * 0.45)
            : Math.random() * (h * heightLimit) - 40,
          scale: (0.8 + Math.random() * 0.4) * configScale * 1.8,
          speed: 0.1 + Math.random() * 0.06,
          puffs: CloudShapeGenerator.generateMixedPuffs(
            seed,
            "cumulus",
            baseUnit,
            pq,
          ),
          cloudType: "scud",
          layer: 5,
          opacity: isDarkDayImmersive ? 0.45 : 0.65,
          seed,
          breathPhase: Math.random() * TWO_PI,
          breathSpeed: 0.004,
          _hStretch: 1.0,
          _vCompress: baseVCompress,
        });
      }
    }
  }
  _initNightClouds(w, h) {
    const pq = Math.max(0.3, this._perfCloudQuality / 1.5);
    for (let i = 0; i < 4; i++) {
      const seed = Math.random() * 10000,
        puffs = CloudShapeGenerator.generateMixedPuffs(
          seed,
          "stratus",
          100,
          pq,
        );
      this._clouds.push({
        x: Math.random() * w,
        y: Math.random() * (h * 0.35),
        scale: 0.85 + Math.random() * 0.3,
        speed: 0.02 + Math.random() * 0.02,
        puffs,
        cloudType: "stratus",
        layer: 4,
        opacity: 0.35,
        seed,
        breathPhase: Math.random() * TWO_PI,
        breathSpeed: 0.002,
      });
    }
  }
  _initCelestialClouds(w, h, decorStyle = null) {
    const celestial = this._getCelestialPosition(w, h),
      cx = celestial.x,
      cy = celestial.y,
      isExceptional = (this._params.cloud || 0) === 0;
    // Where the sun stood when the clouds were placed; they follow it from there.
    this._celestialCloudAnchor = { x: cx, y: cy };
    const isNight = this._isNight,
      isDarkDay = !isNight && this._isThemeDark,
      isDarkDayImmersive = this._isDarkDayImmersive;
    const pq = Math.max(0.3, this._perfCloudQuality / 1.5);
    const opMul = isNight
      ? this._isThemeDark
        ? 0.4
        : 0.62
      : isDarkDayImmersive
        ? 0.75
        : isDarkDay
          ? 0.45
          : 1.0;
    // Sun-proportional unit so cluster scales with sun_moon_size, not card size.
    // Default sun (r=31) → sunUnit=1.0, celestialBaseUnit≈100 (generator default).
    const sunBaseR = this._celestialSize ? this._celestialSize / 2 : 31,
      sunUnit = sunBaseR / 31,
      celestialBaseUnit = sunBaseR * 3.2;
    if (!isNight) {
      this._celestialClouds.push({
        x: cx,
        y: cy,
        scale: decorStyle ? 2.2 : 1.8,
        speed: 0.002,
        puffs: CloudShapeGenerator.generateWispyPuffs(
          Math.random() * 10000,
          celestialBaseUnit,
          pq,
        ),
        opacity: isDarkDayImmersive
          ? 0.22
          : isDarkDay
            ? 0.1
            : decorStyle
              ? 0.2
              : 0.15,
        seed: Math.random(),
        breathPhase: 0,
        breathSpeed: 0.001,
        baseX: cx,
        baseY: cy,
        driftPhase: 0,
        _vSquash: 1.0,
        _sunUnit: sunUnit,
      });
    }
    const scatterBase = decorStyle ? Math.max(3, decorStyle.count) : 7;
    const scatterCount = isExceptional
      ? 2
      : isNight
        ? 5
        : isDarkDay
          ? 4
          : scatterBase;
    const scatterOpMul = decorStyle ? opMul * 0.7 : opMul,
      isWarm = !decorStyle && !isNight && !isDarkDay;
    const heroCount = scatterCount >= 5 ? 2 : 1;
    const topCount = isExceptional
      ? 1
      : Math.max(1, Math.floor(scatterCount * 0.28));
    const sideCount = Math.max(1, scatterCount - heroCount - topCount);
    const pushCelestial = (ox, oy, scale, vSquash, opBase) => {
      this._celestialClouds.push({
        x: cx + ox,
        y: cy + oy,
        scale,
        speed: 0.004 + Math.random() * 0.004,
        puffs: CloudShapeGenerator.generateSunDecorationPuffs(
          Math.random() * 10000,
          celestialBaseUnit,
          pq,
        ),
        opacity: opBase * scatterOpMul,
        seed: Math.random(),
        breathPhase: Math.random() * TWO_PI,
        breathSpeed: 0.002 + Math.random() * 0.002,
        baseX: cx + ox,
        baseY: cy + oy,
        driftPhase: Math.random() * TWO_PI,
        _vSquash: vSquash,
        _sunUnit: sunUnit,
      });
    };
    for (let i = 0; i < heroCount; i++) {
      const side =
        heroCount === 1 ? (Math.random() < 0.5 ? -1 : 1) : i === 0 ? -1 : 1;
      const ox = side * (20 + Math.random() * 40) * sunUnit,
        oy = (35 + Math.random() * 45) * sunUnit;
      const heroScale = isWarm
        ? 0.85 + Math.random() * 0.45
        : 1.0 + Math.random() * 0.6;
      pushCelestial(
        ox,
        oy,
        heroScale,
        0.7 + Math.random() * 0.08,
        0.55 + Math.random() * 0.2,
      );
    }
    for (let i = 0; i < sideCount; i++) {
      const angleBias =
        (Math.random() < 0.5 ? -1 : 1) * (0.9 + Math.random() * 0.6);
      const radBase = isWarm ? 42 : 55,
        radRange = isWarm ? 28 : 35;
      const ox =
        Math.cos(angleBias) * (radBase + Math.random() * radRange) * sunUnit;
      const oy =
        (Math.abs(Math.sin(angleBias)) * (20 + Math.random() * 40) - 5) *
        sunUnit;
      const sideScale = isWarm
        ? 0.6 + Math.random() * 0.4
        : 0.48 + Math.random() * 0.4;
      pushCelestial(
        ox,
        oy,
        sideScale,
        0.74 + Math.random() * 0.1,
        0.4 + Math.random() * 0.25,
      );
    }
    for (let i = 0; i < topCount; i++) {
      const spread = isWarm ? 100 : 130,
        ox = (Math.random() - 0.5) * spread * sunUnit,
        oy = (-30 - Math.random() * 28) * sunUnit;
      const topScale = isWarm
        ? 0.42 + Math.random() * 0.28
        : 0.32 + Math.random() * 0.25;
      pushCelestial(
        ox,
        oy,
        topScale,
        0.7 + Math.random() * 0.1,
        0.32 + Math.random() * 0.18,
      );
    }
  }
  _initStars(w, h, count) {
    const tier1Count = Math.floor(count * 0.7),
      tier2Count = Math.floor(count * 0.285);
    const isUltra = this._perfEffects >= 2;
    const isGolden =
      this._renderState && this._renderState.starMode === "golden";
    const palette = isGolden ? STAR_PALETTE_GOLDEN : STAR_PALETTE_GLOW;
    for (let i = 0; i < count; i++) {
      const isCluster = Math.random() < 0.3;
      let x = Math.random() * w;
      let y = Math.random() * h * 0.85;
      if (isCluster) {
        x += (Math.random() - 0.5) * 90;
        y += (Math.random() - 0.5) * 60;
      }
      const tier =
        i < tier1Count ? "bg" : i < tier1Count + tier2Count ? "mid" : "hero";
      const tp = STAR_TIER_PROPS[tier],
        size = tp[0] + Math.random() * tp[1],
        brightness = tp[2] + Math.random() * tp[3];
      const twinkleSpeed = tp[4] + Math.random() * tp[5],
        k = Math.random();
      const pc =
        k < palette[0][0]
          ? palette[0]
          : k > palette[1][0]
            ? palette[2]
            : palette[1];
      const rgb = hslToRgb(pc[1], pc[2], pc[3]);
      const fillStr = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      const star = {
        x,
        y,
        baseSize: size,
        phase: Math.random() * TWO_PI,
        rate: twinkleSpeed,
        brightness,
        tier,
        _fill: fillStr,
        _stroke: fillStr,
        _r: rgb[0],
        _g: rgb[1],
        _b: rgb[2],
      };
      if (tier === "hero") {
        const isFeature = i >= count - 2;
        if (isGolden) {
          star._bodyAlphaRatio = 0.85;
          star._haloInnerR = 0.6;
          star._haloOuterR = isFeature ? 2.8 : 2.2;
          star._bodyR = 0.65;
          star._spikeRatio = isFeature ? 0.28 : 0.22;
          star._spikeLen = isFeature ? 2.0 : 1.4;
        } else {
          const haloBoost = isUltra ? 1.25 : 1.0;
          star._bodyAlphaRatio = 1.0;
          star._haloInnerR = 0.6;
          star._haloOuterR = (isFeature ? 3.8 : 3.0) * haloBoost;
          star._bodyR = 0.6;
          star._spikeRatio = isFeature ? 0.38 : 0.3;
          star._spikeLen = (isFeature ? 1.8 : 1.3) * haloBoost;
          star._crownRatio = isFeature ? 0.34 : 0.28;
          star._crownLen = (isFeature ? 2.0 : 1.6) * haloBoost;
        }
        const haloDpr = isUltra ? 2 : 1;
        const haloSize = Math.ceil(size * star._haloOuterR * 2 + 2) * haloDpr,
          hc = document.createElement("canvas");
        hc.width = haloSize;
        hc.height = haloSize;
        const hCtx = hc.getContext("2d", { willReadFrequently: false });
        const cx = haloSize / 2;
        const refSize = size * haloDpr;
        const haloAlpha = isGolden
          ? isFeature
            ? 0.45
            : 0.35
          : isFeature
            ? 0.35
            : 0.25;
        const hg = hCtx.createRadialGradient(
          cx,
          cx,
          refSize * star._haloInnerR,
          cx,
          cx,
          refSize * star._haloOuterR,
        );
        if (isUltra && !isGolden) {
          hg.addColorStop(
            0,
            `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${haloAlpha})`,
          );
          hg.addColorStop(
            0.25,
            `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${haloAlpha * 0.6})`,
          );
          hg.addColorStop(
            0.55,
            `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${haloAlpha * 0.2})`,
          );
          hg.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
        } else {
          hg.addColorStop(
            0,
            `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${haloAlpha})`,
          );
          hg.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
        }
        hCtx.fillStyle = hg;
        hCtx.beginPath();
        hCtx.arc(cx, cx, refSize * star._haloOuterR, 0, TWO_PI);
        hCtx.fill();
        star._haloTex = hc;
        star._haloTexSize = haloSize;
        star._haloRefSize = refSize;
      }
      this._stars.push(star);
    }
  }
  _bakeMilkyWay(w, h) {
    const isGolden =
      this._renderState && this._renderState.starMode === "golden";
    const palette = isGolden ? STAR_PALETTE_GOLDEN : STAR_PALETTE_GLOW,
      c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d", { willReadFrequently: false });
    const lat =
      this._hass && this._hass.config ? this._hass.config.latitude : 50;
    const angle = -0.35 - Math.abs(lat) * 0.004 + (Math.random() - 0.5) * 0.45;
    const cosA = Math.cos(angle),
      sinA = Math.sin(angle),
      perpX = -sinA,
      perpY = cosA,
      scale = 0.25 + Math.random() * 1.05;
    const diag = Math.sqrt(w * w + h * h),
      bandW = h * 0.14 * scale,
      moon = this._getCelestialPosition(w, h);
    let cx = w * 0.5,
      cy = h * 0.42;
    const dxM = cx - moon.x,
      dyM = cy - moon.y;
    if (Math.sqrt(dxM * dxM + dyM * dyM) < h * 0.3) {
      cx += perpX * h * 0.18 * (moon.x < w * 0.5 ? 1 : -1);
      cy += perpY * h * 0.18 * (moon.x < w * 0.5 ? 1 : -1);
    }
    cx += (Math.random() - 0.5) * w * 0.15;
    cy += (Math.random() - 0.5) * h * 0.12;
    const hazeRgb = isGolden ? "180,140,50" : "160,175,210";
    const hazeSpan = diag * 0.35 * scale;
    for (let n = 0; n < 6; n++) {
      const along = (n - 2.5) * hazeSpan * 0.4,
        hx = cx + cosA * along,
        hy = cy + sinA * along;
      if (hy < -bandW || hy > h + bandW) continue;
      const hr = bandW * (1.4 + Math.random() * 0.8);
      const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr),
        hazeOp = 0.06 + Math.random() * 0.04;
      hg.addColorStop(0, `rgba(${hazeRgb},${hazeOp})`);
      hg.addColorStop(0.5, `rgba(${hazeRgb},${hazeOp * 0.45})`);
      hg.addColorStop(1, `rgba(${hazeRgb},0)`);
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(hx, hy, hr, 0, TWO_PI);
      ctx.fill();
    }
    const dustCount = Math.floor((350 + Math.random() * 150) * scale),
      dustBatches = new Map();
    for (let i = 0; i < dustCount; i++) {
      const along = (Math.random() - 0.5) * diag * 1.1 * scale;
      const spread =
        (Math.random() + Math.random() + Math.random() + Math.random()) / 4 -
        0.5;
      const across = spread * bandW * 1.6,
        dx = cx + cosA * along + perpX * across,
        dy = cy + sinA * along + perpY * across;
      if (dx < -1 || dx > w + 1 || dy < 0 || dy > h * 0.9) continue;
      const dist = Math.abs(spread) * 2;
      const falloff = Math.max(0, 1 - dist * dist);
      const op = (0.22 + falloff * 0.28) * (0.7 + Math.random() * 0.3),
        qOp = ((op * 20 + 0.5) | 0) / 20,
        k = Math.random();
      const pc =
        k < palette[0][0]
          ? palette[0]
          : k > palette[1][0]
            ? palette[2]
            : palette[1];
      const rgb = hslToRgb(pc[1], pc[2], pc[3]);
      const fillStr = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      const key = fillStr + "|" + qOp;
      let batch = dustBatches.get(key);
      if (!batch) {
        batch = { fill: fillStr, op: qOp, items: [] };
        dustBatches.set(key, batch);
      }
      batch.items.push(dx, dy, 0.45 + Math.random() * 0.4);
    }
    for (const batch of dustBatches.values()) {
      ctx.globalAlpha = batch.op;
      ctx.fillStyle = batch.fill;
      ctx.beginPath();
      const items = batch.items;
      for (let j = 0; j < items.length; j += 3) {
        ctx.moveTo(items[j] + items[j + 2], items[j + 1]);
        ctx.arc(items[j], items[j + 1], items[j + 2], 0, TWO_PI);
      }
      ctx.fill();
    }
    const dotR = isGolden ? 0.55 : 0.5,
      count = Math.floor((180 + Math.random() * 50) * scale),
      batches = new Map();
    for (let i = 0; i < count; i++) {
      const along = (Math.random() - 0.5) * diag * 1.2 * scale;
      const spread = (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
      const across = spread * bandW * 2,
        dx = cx + cosA * along + perpX * across,
        dy = cy + sinA * along + perpY * across;
      if (dx < -2 || dx > w + 2 || dy < 0 || dy > h * 0.9) continue;
      const dist = Math.abs(spread) * 2;
      const falloff = Math.max(0, 1 - dist * dist);
      const k = Math.random();
      const pc =
        k < palette[0][0]
          ? palette[0]
          : k > palette[1][0]
            ? palette[2]
            : palette[1];
      const rgb = hslToRgb(pc[1], pc[2], pc[3]);
      const fillStr = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      const size = 0.8 + Math.random() * 0.6 + falloff * 0.6;
      const op = Math.min(
        1,
        (0.45 + falloff * 0.4) * (0.8 + Math.random() * 0.2),
      );
      const qOp = ((op * 20 + 0.5) | 0) / 20,
        key = fillStr + "|" + qOp;
      let batch = batches.get(key);
      if (!batch) {
        batch = { fill: fillStr, op: qOp, items: [] };
        batches.set(key, batch);
      }
      batch.items.push(dx, dy, size * dotR);
    }
    for (const batch of batches.values()) {
      ctx.globalAlpha = batch.op;
      ctx.fillStyle = batch.fill;
      ctx.beginPath();
      const items = batch.items;
      for (let j = 0; j < items.length; j += 3) {
        ctx.moveTo(items[j] + items[j + 2], items[j + 1]);
        ctx.arc(items[j], items[j + 1], items[j + 2], 0, TWO_PI);
      }
      ctx.fill();
    }
    this._milkyWay = c;
  }
  _initWindVapor(w, h, count = 24, scale = 1.0, flat = false) {
    const isImm = this._isDarkDayImmersive,
      yTop = h * (isImm ? 0.18 : 0.25),
      yBottom = h * (isImm ? 0.78 : 0.65);
    const yBand = Math.max(16, yBottom - yTop),
      sibGap = Math.max(8, yBand * 0.12),
      rotLimit = flat ? 0.008 : 1.0;
    let placed = 0;
    while (placed < count) {
      const gSize = Math.min(2 + Math.floor(Math.random() * 2), count - placed);
      const gY = yTop + Math.random() * yBand,
        gX = Math.random() * w,
        gRot = (Math.random() - 0.5) * 0.06 * rotLimit;
      for (let k = 0; k < gSize; k++) {
        const yOff =
          (k - (gSize - 1) * 0.5) * sibGap + (Math.random() - 0.5) * 2;
        const finalY = Math.min(yBottom, Math.max(yTop, gY + yOff)),
          yNorm = yBand > 0 ? (finalY - yTop) / yBand : 0.5;
        const tier = yNorm < 0.33 ? 0 : yNorm < 0.66 ? 1 : 2,
          depthScale = 0.5 + tier * 0.25,
          sizeRoll = Math.random(),
          isHero = sizeRoll > 0.92;
        const isThin = sizeRoll < 0.15,
          thickMul = isHero ? 1.5 : isThin ? 0.7 : 1.0,
          isOrganic = flat ? false : Math.random() < 0.2;
        const vw =
          w *
          (0.18 + Math.random() * 0.45) *
          scale *
          depthScale *
          (isHero ? 1.3 : isOrganic ? 0.75 : 1.0);
        this._windVapor.push({
          x: gX + (Math.random() - 0.5) * w * 0.15,
          y: finalY,
          w: vw,
          speed: (0.8 + Math.random() * 1.4) * depthScale,
          tier,
          phase: Math.random() * TWO_PI,
          phaseSpeed: 0.005 + Math.random() * 0.005,
          drift: flat ? 0.5 + Math.random() * 1.0 : 1.5 + Math.random() * 2.5,
          gustWeight: 0.5 + Math.random() * 0.5,
          squash:
            (0.038 + Math.random() * 0.025) *
            thickMul *
            (isOrganic ? 1.35 : 1.0),
          baseRotation:
            (gRot + (Math.random() - 0.5) * (isOrganic ? 0.06 : 0.02)) *
            rotLimit,
          taperDir: Math.random() < 0.5 ? -1 : 1,
          depthNorm: yNorm,
          curvature: isOrganic ? (Math.random() - 0.5) * 0.15 : 0,
        });
        placed++;
      }
    }
  }
  // CLOUD & MOON BAKING
  _allocCloudAtlas(width = this._perfCloudRes, height = this._perfCloudRes) {
    let canvas;
    try {
      canvas = new OffscreenCanvas(width, height);
    } catch (e) {
      canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
    }
    return {
      canvas,
      ctx: canvas.getContext("2d", { willReadFrequently: false }),
    };
  }
  _bakeAllClouds() {
    // A full bake repacks the atlases, so queued single-cloud re-bakes are void.
    this._pendingCloudBakes.clear();
    const now = performance.now();
    const minInterval = 2000;
    if (this._lastBakeTime != null && now - this._lastBakeTime < minInterval) {
      this._pendingBakeRequested = true;
      if (!this._pendingBakeTimer) {
        const remaining = minInterval - (now - this._lastBakeTime);
        this._pendingBakeTimer = setTimeout(() => {
          this._pendingBakeTimer = null;
          if (this._pendingBakeRequested) {
            this._pendingBakeRequested = false;
            this._bakeAllClouds();
          }
        }, remaining);
      }
      return;
    }
    this._lastBakeTime = now;
    this._doBakeAllClouds();
  }
  _doBakeAllClouds() {
    const rs = this._renderState;
    if (!rs) return;
    if (!this._cloudAtlases) this._cloudAtlases = [];
    if (this._cloudAtlases.length === 0)
      this._cloudAtlases.push(this._allocCloudAtlas());
    for (let i = 0; i < this._cloudAtlases.length; i++) {
      this._cloudAtlases[i].ctx.clearRect(
        0,
        0,
        this._perfCloudRes,
        this._perfCloudRes,
      );
    }
    const atlases = this._cloudAtlases,
      res = this._perfCloudRes,
      alloc = () => this._allocCloudAtlas();
    const packer = {
      atlases,
      index: 0,
      x: 0,
      y: 0,
      rowHeight: 0,
      get ctx() {
        return atlases[this.index].ctx;
      },
      get canvas() {
        return atlases[this.index].canvas;
      },
      advance() {
        if (this.index + 1 >= atlases.length) {
          if (atlases.length >= CLOUD_ATLAS_MAX) return false;
          atlases.push(alloc());
        }
        this.index++;
        this.x = 0;
        this.y = 0;
        this.rowHeight = 0;
        return true;
      },
      reserve(physW, physH, cellGap) {
        if (this.x + physW + cellGap > res) {
          this.x = 0;
          this.y += this.rowHeight + cellGap;
          this.rowHeight = 0;
        }
        if (this.y + physH > res && !this.advance()) return null;
        const cell = { x: this.x, y: this.y };
        this.x += physW + cellGap;
        if (physH > this.rowHeight) this.rowHeight = physH;
        return cell;
      },
    };
    for (let i = 0; i < this._clouds.length; i++) {
      try {
        this._bakeCloud(this._clouds[i], packer);
      } catch (e) {
        console.error("ATMO-WEATHER-CARD: failed to bake cloud", e);
      }
    }
    for (let i = 0; i < this._fgClouds.length; i++) {
      try {
        this._bakeCloud(this._fgClouds[i], packer);
      } catch (e) {
        console.error("ATMO-WEATHER-CARD: failed to bake fg cloud", e);
      }
    }
    const palette = rs.celestialCloudPalette;
    const cpCelestial =
      CELESTIAL_CLOUD_PALETTES[palette] || CELESTIAL_CLOUD_PALETTES.cool;
    for (let i = 0; i < this._celestialClouds.length; i++) {
      try {
        this._bakeCelestialCloud(this._celestialClouds[i], cpCelestial);
      } catch (e) {
        console.error("ATMO-WEATHER-CARD: failed to bake celestial cloud", e);
      }
    }
    // The clouds now carry the current light direction.
    this._updateLastSunAngleBucket();
  }
  _getCloudSunAngleBucket(w, h) {
    if (!this._cloudSunAngleLighting || !w || !h) return null;
    const celestial = this._getCelestialPosition(w, h);
    const angle =
      (Math.atan2(celestial.y - h / 2, celestial.x - w / 2) * 180) / Math.PI;
    return Math.round(angle / 10) * 10;
  }
  _getCloudSunDirection() {
    const dpr = this._cachedDimensions.dpr || 1;
    const w = this._cachedDimensions.width / dpr;
    const h = this._cachedDimensions.height / dpr;
    if (!w || !h) return null;
    const celestial = this._getCelestialPosition(w, h);
    const dx = celestial.x - w / 2;
    const dy = celestial.y - h / 2;
    const length = Math.hypot(dx, dy);
    if (!length) return null;
    return { x: dx / length, y: dy / length };
  }
  _updateLastSunAngleBucket() {
    const dpr = this._cachedDimensions.dpr || 1;
    this._lastSunAngleBucket = this._getCloudSunAngleBucket(
      this._cachedDimensions.width / dpr,
      this._cachedDimensions.height / dpr,
    );
  }
  _trackCloudSunAngle(w, h) {
    if (!this._cloudSunAngleLighting) {
      this._lastSunAngleBucket = null;
      return;
    }
    const bucket = this._getCloudSunAngleBucket(w, h);
    if (bucket === null || bucket === this._lastSunAngleBucket) return;
    this._lastSunAngleBucket = bucket;
    // The light direction does not change a cloud's size, so every cloud is
    // re-baked in its own cell over the next frames.
    this._requestAdvancedCloudBake([...this._clouds, ...this._fgClouds]);
  }
  // With a cloud list, only those clouds are re-baked in their own atlas cells,
  // spread over the next frames. Without one, everything is baked again.
  _requestAdvancedCloudBake(clouds) {
    if (clouds) {
      // Clouds too large for the atlas were never baked and stay that way.
      for (const cloud of clouds)
        if (cloud._bakedCanvas) this._pendingCloudBakes.add(cloud);
      return;
    }
    this._bakeAllClouds();
  }
  // Re-bakes queued clouds a few per frame, at least one, so breathing never
  // stalls a frame. Puffs set the cost; the GPU work behind them only shows up
  // later, so a time budget measured here would not see it.
  _processPendingCloudBakes() {
    let puffs = 0;
    for (const cloud of this._pendingCloudBakes) {
      this._pendingCloudBakes.delete(cloud);
      if (!this._rebakeCloudInPlace(cloud)) {
        this._bakeAllClouds();
        return;
      }
      puffs += cloud.puffs ? cloud.puffs.length : 0;
      if (puffs >= CLOUD_REBAKE_PUFFS_PER_FRAME) return;
    }
  }
  // Bakes a cloud again into the atlas cell it already owns. Returns false
  // when the cell is gone or too small, then the caller falls back to a full bake.
  _rebakeCloudInPlace(cloud) {
    const atlas = (this._cloudAtlases || []).find(
      (a) => a.canvas === cloud._bakedCanvas,
    );
    if (!atlas || !this._renderState) return false;
    const cellX = cloud._atlasX,
      cellY = cloud._atlasY,
      cellW = cloud._atlasW,
      cellH = cloud._atlasH;
    return this._bakeCloud(cloud, {
      canvas: atlas.canvas,
      ctx: atlas.ctx,
      reserve(physW, physH) {
        if (physW > cellW || physH > cellH) return null;
        atlas.ctx.clearRect(cellX, cellY, cellW, cellH);
        return { x: cellX, y: cellY };
      },
    });
  }
  _clearCloudBreathingTimer() {
    if (!this._cloudBreathingTimer) return;
    clearTimeout(this._cloudBreathingTimer);
    this._cloudBreathingTimer = null;
  }
  _configureCloudBreathingTimer() {
    this._clearCloudBreathingTimer();
    if (!this._cloudBreathingShapes || !this.isConnected) return;
    const scheduleNext = () => {
      this._cloudBreathingTimer = setTimeout(
        () => {
          this._cloudBreathingTimer = null;
          if (
            this._cloudBreathingShapes &&
            this._isVisible &&
            this._stateInitialized
          ) {
            const dpr = this._cachedDimensions.dpr || 1;
            const w = this._cachedDimensions.width / dpr;
            const h = this._cachedDimensions.height / dpr;
            const changedClouds = [];
            for (const cloud of [...this._clouds, ...this._fgClouds]) {
              if (!this._isCloudVisible(cloud, w, h)) continue;
              this._breatheCloudShape(cloud);
              changedClouds.push(cloud);
            }
            if (changedClouds.length)
              this._requestAdvancedCloudBake(changedClouds);
          }
          if (this._cloudBreathingShapes && this.isConnected) scheduleNext();
        },
        8000 + Math.random() * 7000,
      );
    };
    scheduleNext();
  }
  _isCloudVisible(cloud, w, h) {
    const scale = cloud.scale || 1;
    const x = cloud.x + (cloud._bakeOffX || 0) * scale;
    const y = cloud.y + (cloud._bakeOffY || 0) * scale;
    const cloudW = (cloud._bakeLogicalW || 0) * scale;
    const cloudH = (cloud._bakeLogicalH || 0) * scale;
    return x + cloudW > 0 && x < w && y + cloudH > 0 && y < h;
  }
  _breatheCloudShape(cloud) {
    for (const puff of cloud.puffs || []) {
      if (puff._breathBaseX === undefined) {
        puff._breathBaseX = puff.offsetX;
        puff._breathBaseY = puff.offsetY;
      }
      const offset = puff.rad * CLOUD_BREATH_AMOUNT;
      puff.offsetX = puff._breathBaseX + (Math.random() * 2 - 1) * offset;
      puff.offsetY = puff._breathBaseY + (Math.random() * 2 - 1) * offset;
    }
  }
  _drawNoisyPuff(ctx, radius, segments, seed) {
    const hash = (index) => {
      let mixed = (index | 0) ^ (seed | 0);
      mixed = Math.imul(mixed ^ (mixed >>> 16), 0x45d9f3b);
      mixed = Math.imul(mixed ^ (mixed >>> 16), 0x45d9f3b);
      return ((mixed ^ (mixed >>> 16)) >>> 0) / 0xffffffff;
    };
    ctx.beginPath();
    for (let segment = 0; segment <= segments; segment++) {
      const index = segment % segments;
      const angle = (index / segments) * TWO_PI;
      const noisyRadius = radius * (0.88 + hash(index) * 0.24);
      const x = Math.cos(angle) * noisyRadius;
      const y = Math.sin(angle) * noisyRadius;
      if (segment === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
  // Browsers dither canvas gradients in a fixed 4x4 pixel pattern. Stacked
  // cloud layers, scaled onto the card, line it up into a visible grid, so a
  // slight blur while baking smooths it away. The pattern sits in atlas pixels,
  // so the blur does too; low-res atlases need less. Baking is rare, so this
  // costs nothing per frame.
  _cloudBakeFilter(dpr) {
    const preset =
      FILTER_PRESETS[(this._config.card_filter_clouds || "").toLowerCase()];
    const smooth = `blur(${CLOUD_BAKE_SMOOTH * Math.min(1, dpr)}px)`;
    return preset ? `${smooth} ${preset}` : smooth;
  }
  // Reusable canvas a cloud is drawn on before it is blurred into the atlas.
  _getCloudScratch(width, height) {
    const scratch = this._cloudScratch;
    if (
      scratch &&
      scratch.canvas.width >= width &&
      scratch.canvas.height >= height
    )
      return scratch;
    this._cloudScratch = this._allocCloudAtlas(
      Math.max(width, scratch ? scratch.canvas.width : 0),
      Math.max(height, scratch ? scratch.canvas.height : 0),
    );
    return this._cloudScratch;
  }
  // Returns false only when the packer has no room for the cloud.
  _bakeCloud(cloud, packer) {
    const puffs = cloud.puffs;
    if (!puffs || puffs.length === 0) return true;
    const rs = this._renderState;
    const cp = rs.cp,
      isLightBg = this._isLightBackground,
      isThemeDark = this._isThemeDark,
      isTimeNight = this._isTimeNight;
    const dpr = Math.min(this._perfCloudQuality, this._cachedDimensions.dpr),
      globalOpacity = rs.cloudGlobalOp,
      highlightOffsetBase = cp.highlightOffsetBase;
    const hOffset = cp.hOffset,
      rainyOpacityMul = cp.rainyOpacityMul,
      ambient = cp.ambient;
    const hStretch = cloud._hStretch !== undefined ? cloud._hStretch : 1.0;
    const vCompress = cloud._vCompress !== undefined ? cloud._vCompress : 0.55;
    const sunDirection = this._cloudSunAngleLighting
      ? this._getCloudSunDirection()
      : null;
    const layerHighlightOffset =
      cloud.layer === 5 && !isThemeDark ? 0.5 : highlightOffsetBase;
    const spec = CLOUD_TYPES[cloud.cloudType] || CLOUD_TYPES.organic,
      prof = spec.profile;
    const shadowCut = prof[0],
      surfaceCut = prof[1],
      hlMul = prof[2],
      shadowRad = prof[3],
      surfaceRad = prof[4];
    const maxRadMul = Math.max(shadowRad, surfaceRad, 1.0);
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    // Breathing clouds are measured around their rest shape plus the breathing
    // range, so the box stays the same and a re-bake fits into the old cell.
    const breath = this._cloudBreathingShapes ? CLOUD_BREATH_AMOUNT : 0;
    for (let j = 0; j < puffs.length; j++) {
      const p = puffs[j],
        px =
          (p._breathBaseX !== undefined ? p._breathBaseX : p.offsetX) *
          hStretch,
        py =
          (p._breathBaseY !== undefined ? p._breathBaseY : p.offsetY) *
          vCompress,
        sq = p.squash !== undefined ? p.squash : 1.0;
      const a = p.rad * hStretch * maxRadMul,
        b = p.rad * sq * vCompress * maxRadMul,
        theta = p.rotation || 0,
        cosT = Math.cos(theta),
        sinT = Math.sin(theta);
      // Rotated-ellipse AABB — must include rotation or the bake box undershoots
      // and later crops the puff (or bleeds into the neighboring atlas cell).
      const radH =
          Math.sqrt((a * cosT) ** 2 + (b * sinT) ** 2) +
          p.rad * breath * hStretch,
        radV =
          Math.sqrt((a * sinT) ** 2 + (b * cosT) ** 2) +
          p.rad * breath * vCompress;
      if (px - radH < minX) minX = px - radH;
      if (px + radH > maxX) maxX = px + radH;
      if (py - radV < minY) minY = py - radV;
      if (py + radV > maxY) maxY = py + radV;
    }
    const margin = 8;
    minX -= margin;
    minY -= margin;
    maxX += margin;
    maxY += margin;
    const bakeW = Math.ceil(maxX - minX),
      bakeH = Math.ceil(maxY - minY);
    if (bakeW <= 0 || bakeH <= 0) return true;
    const physW = Math.ceil(bakeW * dpr);
    const physH = Math.ceil(bakeH * dpr);
    if (physW > this._perfCloudRes || physH > this._perfCloudRes) return true;
    const cell = packer.reserve(physW, physH, Math.max(2, Math.ceil(2 * dpr)));
    if (!cell) return false;
    const atlasX = cell.x,
      atlasY = cell.y;
    // Puffs are drawn unfiltered on a scratch canvas, then the whole cloud is
    // blurred into the atlas in one pass. Filtering every puff on its own
    // costs several times as much.
    const scratch = this._getCloudScratch(physW, physH);
    const oc = scratch.ctx;
    oc.setTransform(1, 0, 0, 1, 0, 0);
    oc.clearRect(0, 0, physW, physH);
    oc.save();
    oc.scale(dpr, dpr);
    const t = spec.tint;
    const litR = cp.litR + t[0],
      litG = cp.litG + t[1],
      litB = cp.litB + t[2];
    const midR = cp.midR + t[3],
      midG = cp.midG + t[4],
      midB = cp.midB + t[5];
    const shadowR = cp.shadowR + t[6],
      shadowG = cp.shadowG + t[7],
      shadowB = cp.shadowB + t[8];
    const shadeH = bakeH || 1,
      bodyHlScale = hlMul * 0.5 + 0.1,
      baseOpacity = globalOpacity * cloud.opacity * ambient;
    // Immersive-light differentiation: inner gradient stops pull in tighter (see below)
    // and a quadratic bottom-fade is applied post-modifier to prevent stacked-halo mush.
    const isImmersiveLight = isLightBg && this._isImmersive;
    const simpleGrad = this._perfCloudQuality <= 1.0;
    for (let j = 0; j < puffs.length; j++) {
      const puff = puffs[j],
        sq = puff.squash !== undefined ? puff.squash : 1.0,
        drawX = puff.offsetX * hStretch - minX;
      const drawY = puff.offsetY * vCompress - minY,
        normalizedY = drawY / shadeH,
        posFactor = Math.max(0.2, 1 - normalizedY * 0.68);
      const depth = puff.depth,
        isShadow = depth < shadowCut,
        isSurface = !isShadow && depth > surfaceCut;
      let pR,
        pG,
        pB,
        finalOpacity,
        pRadius,
        pHlX = 0,
        pHlY = 0;
      if (isShadow) {
        const sf = posFactor * 0.3;
        pR = (midR * sf + shadowR * (1 - sf)) | 0;
        pG = (midG * sf + shadowG * (1 - sf)) | 0;
        pB = (midB * sf + shadowB * (1 - sf)) | 0;
        finalOpacity = baseOpacity * 0.72;
        pRadius = puff.rad * shadowRad;
        pHlY = -puff.rad * layerHighlightOffset * 0.15;
      } else if (isSurface) {
        const sf = posFactor * (0.55 + puff.shade * 0.45);
        pR = (litR * sf + midR * (1 - sf)) | 0;
        pG = (litG * sf + midG * (1 - sf)) | 0;
        pB = (litB * sf + midB * (1 - sf)) | 0;
        finalOpacity = baseOpacity * (0.68 + puff.shade * 0.3);
        pRadius = puff.rad * surfaceRad;
        const diffuse = normalizedY * normalizedY * 0.65;
        pHlX = -puff.rad * hOffset * hlMul * (1 - diffuse);
        pHlY = -puff.rad * layerHighlightOffset * hlMul * (1 - diffuse * 0.5);
      } else {
        const sf = posFactor * (0.4 + puff.shade * 0.5);
        pR = (litR * sf + midR * (1 - sf)) | 0;
        pG = (litG * sf + midG * (1 - sf)) | 0;
        pB = (litB * sf + midB * (1 - sf)) | 0;
        finalOpacity = baseOpacity * (0.55 + puff.shade * 0.35);
        pRadius = puff.rad;
        const diffuse = normalizedY * normalizedY * 0.65;
        pHlX = -puff.rad * hOffset * bodyHlScale * (1 - diffuse);
        pHlY =
          -puff.rad * layerHighlightOffset * bodyHlScale * (1 - diffuse * 0.5);
      }
      if (rainyOpacityMul !== 1.0)
        finalOpacity = Math.min(1.0, finalOpacity * rainyOpacityMul);
      if (isLightBg) {
        const bottomFade = isImmersiveLight ? 0.5 : 0.3;
        finalOpacity *= 1 - normalizedY * normalizedY * bottomFade;
      }
      let dR = pR,
        dG = pG,
        dB = pB,
        dMidR = midR,
        dMidG = midG,
        dMidB = midB,
        dShadR = shadowR,
        dShadG = shadowG,
        dShadB = shadowB;
      if (isThemeDark && finalOpacity < 0.2) {
        const dim = isTimeNight ? 0.4 : 0.75;
        finalOpacity = Math.min(1.0, finalOpacity * (isTimeNight ? 2.5 : 2.0));
        dR = (dR * dim) | 0;
        dG = (dG * dim) | 0;
        dB = (dB * dim) | 0;
        dMidR = (dMidR * dim) | 0;
        dMidG = (dMidG * dim) | 0;
        dMidB = (dMidB * dim) | 0;
        dShadR = (dShadR * dim) | 0;
        dShadG = (dShadG * dim) | 0;
        dShadB = (dShadB * dim) | 0;
      }
      if (sunDirection) {
        const highlightDistance = Math.hypot(pHlX, pHlY);
        pHlX = sunDirection.x * highlightDistance;
        pHlY = sunDirection.y * highlightDistance;
      }
      if (finalOpacity < 0.005) continue;
      oc.save();
      oc.translate(drawX, drawY);
      if (puff.rotation) oc.rotate(puff.rotation);
      oc.scale(hStretch, sq * vCompress);
      const grad = oc.createRadialGradient(pHlX, pHlY, 0, 0, 0, pRadius);
      if (simpleGrad) {
        grad.addColorStop(0, `rgba(${dR},${dG},${dB},${finalOpacity})`);
        grad.addColorStop(1, `rgba(${dShadR},${dShadG},${dShadB},0)`);
      } else if (isShadow) {
        grad.addColorStop(0, `rgba(${dR},${dG},${dB},${finalOpacity})`);
        grad.addColorStop(
          0.45,
          `rgba(${dShadR},${dShadG},${dShadB},${finalOpacity * 0.55})`,
        );
        grad.addColorStop(1.0, `rgba(${dShadR},${dShadG},${dShadB},0)`);
      } else if (isSurface) {
        grad.addColorStop(0, `rgba(${dR},${dG},${dB},${finalOpacity})`);
        grad.addColorStop(
          0.22,
          `rgba(${dR},${dG},${dB},${finalOpacity * 0.9})`,
        );
        if (isLightBg) {
          grad.addColorStop(
            0.45,
            `rgba(${dMidR},${dMidG},${dMidB},${finalOpacity * (isImmersiveLight ? 0.52 : 0.46)})`,
          );
          grad.addColorStop(
            isImmersiveLight ? 0.62 : 0.7,
            `rgba(${dShadR},${dShadG},${dShadB},${finalOpacity * (isImmersiveLight ? 0.09 : 0.12)})`,
          );
          grad.addColorStop(
            isImmersiveLight ? 0.82 : 0.9,
            `rgba(${dShadR},${dShadG},${dShadB},${finalOpacity * 0.01})`,
          );
        } else {
          grad.addColorStop(
            0.4,
            `rgba(${dMidR},${dMidG},${dMidB},${finalOpacity * 0.42})`,
          );
          grad.addColorStop(
            0.65,
            `rgba(${dShadR},${dShadG},${dShadB},${finalOpacity * 0.1})`,
          );
        }
        grad.addColorStop(1.0, `rgba(${dShadR},${dShadG},${dShadB},0)`);
      } else {
        const midStop = 0.28 + puff.softness * 0.22;
        grad.addColorStop(0, `rgba(${dR},${dG},${dB},${finalOpacity})`);
        if (isLightBg) {
          grad.addColorStop(
            midStop,
            `rgba(${dMidR},${dMidG},${dMidB},${finalOpacity * (isImmersiveLight ? 0.74 : 0.68)})`,
          );
          const shelf = midStop + (1.0 - midStop) * 0.42;
          grad.addColorStop(
            shelf,
            `rgba(${dShadR},${dShadG},${dShadB},${finalOpacity * (isImmersiveLight ? 0.14 : 0.18)})`,
          );
          grad.addColorStop(
            shelf + (1.0 - shelf) * (isImmersiveLight ? 0.42 : 0.55),
            `rgba(${dShadR},${dShadG},${dShadB},${finalOpacity * 0.02})`,
          );
          grad.addColorStop(1.0, `rgba(${dShadR},${dShadG},${dShadB},0)`);
        } else {
          grad.addColorStop(
            midStop,
            `rgba(${dMidR},${dMidG},${dMidB},${finalOpacity * 0.78})`,
          );
          grad.addColorStop(
            0.65,
            `rgba(${dShadR},${dShadG},${dShadB},${finalOpacity * 0.28})`,
          );
          grad.addColorStop(0.85, `rgba(${dShadR},${dShadG},${dShadB},0)`);
        }
      }
      oc.fillStyle = grad;
      if (this._perfEffects >= 1)
        this._drawNoisyPuff(oc, pRadius, 20, (cloud.seed || 0) + j * 101);
      else {
        oc.beginPath();
        oc.arc(0, 0, pRadius, 0, TWO_PI);
      }
      oc.fill();
      oc.restore();
    }
    oc.restore();
    const atlasCtx = packer.ctx;
    atlasCtx.save();
    // Hard confinement so the blur can't bleed into neighbor cells.
    atlasCtx.beginPath();
    atlasCtx.rect(atlasX, atlasY, physW, physH);
    atlasCtx.clip();
    atlasCtx.filter = this._cloudBakeFilter(dpr);
    atlasCtx.drawImage(
      scratch.canvas,
      0,
      0,
      physW,
      physH,
      atlasX,
      atlasY,
      physW,
      physH,
    );
    atlasCtx.restore();
    cloud._bakedCanvas = packer.canvas;
    cloud._atlasX = atlasX;
    cloud._atlasY = atlasY;
    cloud._atlasW = physW;
    cloud._atlasH = physH;
    cloud._bakeOffX = minX;
    cloud._bakeOffY = minY;
    cloud._bakeLogicalW = bakeW;
    cloud._bakeLogicalH = bakeH;
    return true;
  }
  _bakeCelestialCloud(cloud, cp) {
    const puffs = cloud.puffs;
    if (!puffs || puffs.length === 0) return;
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    for (let j = 0; j < puffs.length; j++) {
      const p = puffs[j],
        a = p.rad * 1.08,
        b = a * (p.squash !== undefined ? p.squash : 1.0),
        theta = p.rotation || 0,
        cosT = Math.cos(theta),
        sinT = Math.sin(theta);
      // Rotated-ellipse AABB — matches the rotate()+scale(1,squash) applied below,
      // otherwise the puff gets hard-clipped at this canvas's own edge.
      const radH = Math.sqrt((a * cosT) ** 2 + (b * sinT) ** 2),
        radV = Math.sqrt((a * sinT) ** 2 + (b * cosT) ** 2);
      if (p.offsetX - radH < minX) minX = p.offsetX - radH;
      if (p.offsetX + radH > maxX) maxX = p.offsetX + radH;
      if (p.offsetY - radV < minY) minY = p.offsetY - radV;
      if (p.offsetY + radV > maxY) maxY = p.offsetY + radV;
    }
    const pad = 6;
    minX -= pad;
    minY -= pad;
    maxX += pad;
    maxY += pad;
    const bakeW = Math.ceil(maxX - minX);
    const bakeH = Math.ceil(maxY - minY);
    if (bakeW <= 0 || bakeH <= 0) return;
    const shadeH = bakeH || 1;
    const oc = document.createElement("canvas");
    oc.width = bakeW;
    oc.height = bakeH;
    const oCtx = oc.getContext("2d", { willReadFrequently: false });
    oCtx.filter =
      FILTER_PRESETS[(this._config.card_filter_clouds || "").toLowerCase()] ||
      "none";
    for (let j = 0; j < puffs.length; j++) {
      const puff = puffs[j],
        drawX = puff.offsetX - minX,
        drawY = puff.offsetY - minY,
        normY = drawY / shadeH;
      const posFactor = Math.max(0.2, 1 - normY * 0.55),
        depth = puff.depth,
        isShadow = depth < 0.3,
        isSurface = depth > 0.65;
      let pR, pG, pB, opMul, radMul, hlYOff;
      if (isShadow) {
        const sf = posFactor * 0.3;
        pR = (cp.midR * sf + cp.shadowR * (1 - sf)) | 0;
        pG = (cp.midG * sf + cp.shadowG * (1 - sf)) | 0;
        pB = (cp.midB * sf + cp.shadowB * (1 - sf)) | 0;
        opMul = 0.72;
        radMul = 0.88;
        hlYOff = 0;
      } else if (isSurface) {
        const sf = posFactor * (0.55 + puff.shade * 0.45);
        pR = (cp.litR * sf + cp.midR * (1 - sf)) | 0;
        pG = (cp.litG * sf + cp.midG * (1 - sf)) | 0;
        pB = (cp.litB * sf + cp.midB * (1 - sf)) | 0;
        opMul = 0.7 + puff.shade * 0.28;
        radMul = 1.05;
        hlYOff = -puff.rad * 0.42;
      } else {
        const sf = posFactor * (0.42 + puff.shade * 0.48);
        pR = (cp.litR * sf + cp.midR * (1 - sf)) | 0;
        pG = (cp.litG * sf + cp.midG * (1 - sf)) | 0;
        pB = (cp.litB * sf + cp.midB * (1 - sf)) | 0;
        opMul = 0.58 + puff.shade * 0.32;
        radMul = 1.0;
        hlYOff = -puff.rad * 0.22;
      }
      const finalOp = cloud.opacity * puff.shade * opMul;
      if (finalOp < 0.005) continue;
      const pRadius = puff.rad * radMul;
      const grad = oCtx.createRadialGradient(0, hlYOff, 0, 0, 0, pRadius);
      if (isShadow) {
        grad.addColorStop(0, `rgba(${pR},${pG},${pB},${finalOp})`);
        grad.addColorStop(
          0.45,
          `rgba(${cp.shadowR},${cp.shadowG},${cp.shadowB},${finalOp * 0.55})`,
        );
        grad.addColorStop(
          1.0,
          `rgba(${cp.shadowR},${cp.shadowG},${cp.shadowB},0)`,
        );
      } else if (isSurface) {
        grad.addColorStop(0, `rgba(${pR},${pG},${pB},${finalOp})`);
        grad.addColorStop(0.22, `rgba(${pR},${pG},${pB},${finalOp * 0.9})`);
        grad.addColorStop(
          0.48,
          `rgba(${cp.midR},${cp.midG},${cp.midB},${finalOp * 0.52})`,
        );
        grad.addColorStop(
          0.72,
          `rgba(${cp.shadowR},${cp.shadowG},${cp.shadowB},${finalOp * 0.14})`,
        );
        grad.addColorStop(
          1.0,
          `rgba(${cp.shadowR},${cp.shadowG},${cp.shadowB},0)`,
        );
      } else {
        const midStop = 0.3 + puff.softness * 0.18;
        grad.addColorStop(0, `rgba(${pR},${pG},${pB},${finalOp})`);
        grad.addColorStop(
          midStop,
          `rgba(${cp.midR},${cp.midG},${cp.midB},${finalOp * 0.72})`,
        );
        grad.addColorStop(
          midStop + 0.3,
          `rgba(${cp.shadowR},${cp.shadowG},${cp.shadowB},${finalOp * 0.2})`,
        );
        grad.addColorStop(
          1.0,
          `rgba(${cp.shadowR},${cp.shadowG},${cp.shadowB},0)`,
        );
      }
      oCtx.save();
      oCtx.translate(drawX, drawY);
      if (puff.rotation) oCtx.rotate(puff.rotation);
      if (puff.squash !== 1.0) oCtx.scale(1, puff.squash);
      oCtx.fillStyle = grad;
      if (this._perfEffects >= 1)
        this._drawNoisyPuff(oCtx, pRadius, 20, (cloud.seed || 0) + j * 101);
      else {
        oCtx.beginPath();
        oCtx.arc(0, 0, pRadius, 0, TWO_PI);
      }
      oCtx.fill();
      oCtx.restore();
    }
    oCtx.filter = "none";
    cloud._bakedCanvas = oc;
    cloud._bakeOffX = minX;
    cloud._bakeOffY = minY;
    cloud._bakeW = bakeW;
    cloud._bakeH = bakeH;
  }
  _buildMoonCache(ctx, moonRadius, moonScale, w, h, useLightColors, styleKey) {
    const mc = {};
    const applyStops = (grad, cfg, peak) => {
      for (let si = 0; si < cfg.length; si++) {
        const stop = cfg[si];
        grad.addColorStop(
          stop[0],
          stop[2] === 0
            ? `rgba(${stop[1]}, 0)`
            : `rgba(${stop[1]}, ${stop[2] / peak})`,
        );
      }
    };
    if (useLightColors) {
      const lightGlowR = Math.min(h, w) * 0.336 * moonScale,
        glow = ctx.createRadialGradient(0, 0, 0, 0, 0, lightGlowR);
      const cfg = MOON_STYLE_COLORS.glow[styleKey];
      applyStops(glow, cfg.stops, cfg.peak);
      mc.glow = glow;
      mc.glowR = lightGlowR;
      mc.glowPeak = cfg.peak;
    }
    {
      const g = ctx.createRadialGradient(
        -moonRadius * 0.3,
        -moonRadius * 0.3,
        0,
        0,
        0,
        moonRadius,
      );
      const cfg = MOON_STYLE_COLORS.fullDisc[styleKey];
      applyStops(g, cfg.stops, cfg.peak);
      mc.fullDisc = g;
      mc.fullDiscPeak = cfg.peak;
    }
    {
      const g = ctx.createRadialGradient(
        -moonRadius * 0.2,
        -moonRadius * 0.2,
        0,
        0,
        0,
        moonRadius,
      );
      const cfg = MOON_STYLE_COLORS.partDisc[styleKey];
      applyStops(g, cfg.stops, cfg.peak);
      mc.partDisc = g;
      mc.partDiscPeak = cfg.peak;
    }
    {
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, moonRadius),
        limbAlpha = useLightColors ? 0.12 : 0.22;
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.55, "rgba(0,0,0,0)");
      g.addColorStop(1, `rgba(0,0,0,${limbAlpha})`);
      mc.limbDark = g;
    }
    return mc;
  }
  // RENDERING (PER-FRAME)
  // One blurred sprite per corona tongue, rebuilt when size, color, filter or
  // pixel density change.
  _getCoronaSprites(specs, auraR, color, sunFilter) {
    const dpr = this._cachedDimensions.dpr || 1;
    const key = `${auraR}|${color}|${sunFilter}|${dpr}`;
    if (this._coronaSprites && this._coronaSprites.key === key)
      return this._coronaSprites.list;
    const [gR, gG, gB] = color;
    // The main canvas is scaled by dpr but filter lengths are not, so the blur
    // is given in physical pixels here as it was on the card.
    const blur = Math.max(2, auraR * 0.06);
    const pad = Math.ceil(blur * 3);
    const filter =
      sunFilter === "none" ? `blur(${blur}px)` : `blur(${blur}px) ${sunFilter}`;
    const list = specs.map(([angle, lengthRatio, widthRatio, alpha]) => {
      const length = auraR * lengthRatio,
        width = auraR * widthRatio;
      const physW = Math.ceil(length * 2 * dpr) + pad * 2,
        physH = Math.ceil(width * 2 * dpr) + pad * 2;
      const { canvas, ctx } = this._allocCloudAtlas(physW, physH);
      ctx.filter = filter;
      ctx.translate(physW / 2, physH / 2);
      ctx.scale(dpr, dpr);
      const gradient = ctx.createLinearGradient(-length, 0, length, 0);
      gradient.addColorStop(0, `rgba(${gR},${gG},${gB},0)`);
      gradient.addColorStop(0.28, `rgba(${gR},${gG},${gB},${alpha * 0.7})`);
      gradient.addColorStop(0.58, `rgba(${gR},${gG},${gB},${alpha})`);
      gradient.addColorStop(1, `rgba(${gR},${gG},${gB},0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, length, width, 0, 0, TWO_PI);
      ctx.fill();
      return {
        canvas,
        angle,
        lengthRatio,
        width: physW / dpr,
        height: physH / dpr,
      };
    });
    this._coronaSprites = { key, list };
    return list;
  }
  _drawCelestialGlow(ctx, w, h) {
    const glow = this._renderState.glow;
    if (!glow) return;
    const fadeOpacity = this._layerFadeProgress.effects;
    const { x: cx, y: cy } = this._getCelestialPosition(w, h);
    const sunBaseR = this._celestialSize ? this._celestialSize / 2 : 31,
      sizeCap = Math.min(w, h) * 0.9;
    const [gR, gG, gB] = glow.color;
    ctx.save();
    const sunFilter =
      FILTER_PRESETS[(this._config.card_filter_sun || "").toLowerCase()] ||
      "none";
    ctx.filter = sunFilter;
    if (glow.compOp) ctx.globalCompositeOperation = glow.compOp;
    ctx.translate(cx, cy);
    if (glow.showDisc) {
      const auraR = Math.min(sunBaseR * 5.8 * (glow.auraSizeMul || 1), sizeCap);
      const coronaSpecs = [
        [-2.82, 0.82, 0.12, 0.14],
        [-2.25, 0.58, 0.16, 0.1],
        [-1.72, 0.92, 0.1, 0.12],
        [-1.08, 0.66, 0.14, 0.09],
        [-0.42, 0.8, 0.12, 0.13],
        [0.18, 0.56, 0.17, 0.1],
        [0.82, 0.88, 0.11, 0.12],
        [1.46, 0.64, 0.15, 0.09],
        [2.16, 0.78, 0.12, 0.11],
        [2.78, 0.52, 0.18, 0.08],
      ];
      const auraPhase = this._sunPulsePhase / glow.breathPeriodMul;
      const auraX =
          Math.sin(auraPhase * 1.55) * sunBaseR * 0.065 +
          Math.sin(auraPhase * 2.8 + 1.2) * sunBaseR * 0.028,
        auraY = Math.cos(auraPhase * 1.2 + 0.8) * sunBaseR * 0.045,
        auraScale = 1 + Math.sin(auraPhase * 1.9 + 2.1) * 0.028;
      ctx.globalAlpha =
        fadeOpacity *
        Math.min(1, glow.intensity * 0.82 * (glow.auraOpacityMul || 1));
      // The corona tongues are blurred once into sprites; each frame only
      // moves, turns and stretches them. Low mode keeps only the disc.
      if (this._perfEffects >= 1) {
        const sprites = this._getCoronaSprites(
          coronaSpecs,
          auraR,
          glow.color,
          sunFilter,
        );
        ctx.filter = "none";
        for (const sprite of sprites) {
          const tonguePhase = auraPhase * 1.35 + sprite.angle * 1.7;
          const tongueScale = 1 + Math.sin(tonguePhase) * 0.075;
          const centerOffset =
            auraR * (0.2 + sprite.lengthRatio * 0.28) * auraScale * tongueScale;
          ctx.save();
          ctx.translate(
            Math.cos(sprite.angle) * centerOffset + auraX,
            Math.sin(sprite.angle) * centerOffset + auraY,
          );
          ctx.rotate(sprite.angle);
          ctx.scale(
            auraScale * tongueScale,
            auraScale * (1 + Math.cos(tonguePhase) * 0.04),
          );
          ctx.drawImage(
            sprite.canvas,
            -sprite.width / 2,
            -sprite.height / 2,
            sprite.width,
            sprite.height,
          );
          ctx.restore();
        }
        ctx.filter = sunFilter;
      }
      if (!this._sunDiscGrad || this._sunDiscGradR !== sunBaseR) {
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, sunBaseR * 3.0);
        if (this._isLightBackground) {
          g.addColorStop(0.0, "rgba(255, 255, 255, 1)");
          g.addColorStop(0.1, "rgba(255, 255, 240, 0.98)");
          g.addColorStop(0.28, "rgba(255, 242, 170, 0.94)");
          g.addColorStop(0.33, "rgba(255, 210, 90, 0.82)");
          g.addColorStop(0.36, "rgba(255, 198, 65, 0.60)");
          g.addColorStop(0.42, "rgba(255, 188, 52, 0.38)");
          g.addColorStop(0.7, "rgba(255, 178, 42, 0.20)");
          g.addColorStop(1.0, "rgba(255, 162, 32, 0)");
        } else {
          g.addColorStop(0.0, "rgba(255, 238, 200, 1)");
          g.addColorStop(0.1, "rgba(255, 230, 178, 0.96)");
          g.addColorStop(0.28, "rgba(255, 214, 130, 0.90)");
          g.addColorStop(0.33, "rgba(255, 188, 72, 0.78)");
          g.addColorStop(0.36, "rgba(255, 176, 54, 0.56)");
          g.addColorStop(0.42, "rgba(255, 188, 52, 0.38)");
          g.addColorStop(0.7, "rgba(255, 178, 42, 0.20)");
          g.addColorStop(1.0, "rgba(255, 162, 32, 0)");
        }
        this._sunDiscGrad = g;
        this._sunDiscGradR = sunBaseR;
      }
      ctx.fillStyle = this._sunDiscGrad;
      fillCircle(ctx, 0, 0, sunBaseR * 3.0);
      // A low sun turns gold, and orange just before it sets.
      const gl = this._golden;
      if (gl && gl.g > 0.01) {
        const s = gl.s,
          a = Math.min(0.85, 0.4 * gl.g + 0.4 * s);
        const rgb = [255, Math.round(196 - 76 * s), Math.round(96 - 46 * s)];
        const warm = ctx.createRadialGradient(0, 0, 0, 0, 0, sunBaseR * 1.15);
        warm.addColorStop(0, `rgba(${rgb}, ${a * 0.7})`);
        warm.addColorStop(0.75, `rgba(${rgb}, ${a})`);
        warm.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = warm;
        fillCircle(ctx, 0, 0, sunBaseR * 1.15);
        ctx.restore();
      }
    } else {
      // ---- DIFFUSE MODE (sun-behind-clouds backlight) ----
      const csGlowScale = sunBaseR / 26,
        outerR = Math.min(
          92 * csGlowScale * glow.sizeMul * (glow.auraSizeMul || 1),
          sizeCap,
        );
      const coreR = Math.min(42 * csGlowScale * glow.sizeMul, sizeCap * 0.45);
      if (
        !this._diffuseGlowCache ||
        this._diffuseGlowCache.key !== glow.cacheKey ||
        this._diffuseGlowCache.outerR !== outerR
      ) {
        const outer = ctx.createRadialGradient(0, 0, 0, 0, 0, outerR);
        outer.addColorStop(0, `rgba(${gR},${gG},${gB},0.58)`);
        outer.addColorStop(0.14, `rgba(${gR},${gG},${gB},0.32)`);
        outer.addColorStop(0.32, `rgba(${gR},${gG},${gB},0.12)`);
        outer.addColorStop(0.6, `rgba(${gR},${gG},${gB},0.025)`);
        outer.addColorStop(1, `rgba(${gR},${gG},${gB},0)`);
        const core = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR);
        core.addColorStop(0, `rgba(${gR},${gG},${gB},0.48)`);
        core.addColorStop(0.35, `rgba(${gR},${gG},${gB},0.18)`);
        core.addColorStop(1, `rgba(${gR},${gG},${gB},0)`);
        this._diffuseGlowCache = {
          outer,
          core,
          outerR,
          coreR,
          key: glow.cacheKey,
        };
      }
      // Subtle opacity breath — slow pulse matches heavy atmosphere
      const breathPhase = this._sunPulsePhase / glow.breathPeriodMul,
        t = (Math.sin(breathPhase) + 1) / 2,
        breathMod = 1.0 + (t - 0.5) * 0.2 * glow.breathAmp,
        dc = this._diffuseGlowCache;
      ctx.globalAlpha = Math.min(
        1.0,
        fadeOpacity * glow.intensity * breathMod * (glow.auraOpacityMul || 1),
      );
      ctx.fillStyle = dc.outer;
      fillCircle(ctx, 0, 0, dc.outerR);
      ctx.fillStyle = dc.core;
      fillCircle(ctx, 0, 0, dc.coreR);
    }
    ctx.filter = "none";
    ctx.restore();
  }
  _drawCelestialClouds(ctx, w, h, effectiveWind) {
    drawCelestialClouds(this, ctx, w, h, effectiveWind);
  }
  _drawClouds(ctx, cloudList, w, h, effectiveWind) {
    drawClouds(this, ctx, cloudList, w, h, effectiveWind);
  }
  _drawStars(ctx, w, h, dpr) {
    drawStars(this, ctx, w, h, dpr);
  }
  _drawShootingStars(ctx, w, h) {
    drawShootingStars(this, ctx, w, h, LIMITS, TRAIL_CAP_SHOOTING_STAR);
  }
  _drawComets(ctx, w, h) {
    drawComets(this, ctx, w, h, TRAIL_CAP_COMET);
  }
  _drawMoon(ctx, w, h) {
    drawMoon(this, ctx, w, h, MOON_STYLE_COLORS, MOON_CRATERS);
  }
  _drawRain(ctx, w, h, effectiveWind) {
    drawRain(this, ctx, w, h, effectiveWind);
  }
  _drawSnow(ctx, w, h, effectiveWind) {
    drawSnow(this, ctx, w, h, effectiveWind);
  }
  _drawHail(ctx, w, h, effectiveWind) {
    drawHail(this, ctx, w, h, effectiveWind);
  }
  _drawLightning(ctx, w, h, boltCtx) {
    drawLightning(this, ctx, w, h, boltCtx);
  }
  _drawFog(ctx, w) {
    drawFog(this, ctx, w);
  }
  _drawWindVapor(ctx, w, h, effectiveWind) {
    drawWindVapor(this, ctx, w, h, effectiveWind);
  }
  _drawBirds(ctx, w, h) {
    drawBirds(this, ctx, w, h);
  }
  _drawPlanes(ctx, w, h) {
    drawPlanes(this, ctx, w, h, CONTRAIL_OFFSETS, PLANE_PATH, TRAIL_CAP_PLANE);
  }
  // ANIMATION LOOP
  _animate(timestamp) {
    if (!this.isConnected || this._animID === null || !this._isVisible) {
      this._stopAnimation();
      return;
    }
    if (shouldSkipFrame(this, timestamp)) {
      this._animID = requestAnimationFrame(this._boundAnimate);
      return;
    }
    if (!this._ctxs) {
      this._animID = requestAnimationFrame(this._boundAnimate);
      return;
    }
    const { bg, mid, fg } = this._ctxs;
    const dpr = this._cachedDimensions.dpr || window.devicePixelRatio || 1;
    const w = this._elements.bg.width / dpr,
      h = this._elements.bg.height / dpr,
      p = this._params;
    if (!p || w === 0 || h === 0) {
      this._animID = requestAnimationFrame(this._boundAnimate);
      return;
    }
    bg.clearRect(0, 0, w, h);
    mid.clearRect(0, 0, w, h);
    fg.clearRect(0, 0, w, h);
    this._prepareSpill(w, dpr);
    if (!this._stateInitialized || !this._renderGate.isRevealed) {
      this._animID = requestAnimationFrame(this._boundAnimate);
      return;
    }
    if (this._pendingCloudBakes.size) this._processPendingCloudBakes();
    const effectiveWind = advanceWindAndPulse(this);
    try {
      renderAnimationFrame(this, bg, mid, fg, w, h, dpr, effectiveWind);
      this._tickFrost(timestamp);
    } catch (e) {
      // A single rendering error must never permanently stop the RAF loop.
      console.error("ATMO-WEATHER-CARD: render frame failed", e);
    }
    this._animID = requestAnimationFrame(this._boundAnimate);
  }
  // Rime on the card (effect_frost). Only on a card with its own background:
  // the immersive style has no pane for it. It appears with a soft fade at
  // the measured amount, then grows and thaws slowly when the readings
  // change. Redrawn at most once a second, and when size or light change.
  _tickFrost(now) {
    const el = this._elements && this._elements.frost;
    if (!el) return;
    let f = this._frost;
    // Switched off, no effects, or the immersive style: gone at once.
    if (!this._fx.frost || this._perfEffects < 1 || this._isImmersive) {
      if (f) f.layer.destroy();
      this._frost = null;
      return;
    }
    const target = this._frostTarget;
    const on = !!target && target.amount > 0;
    const goal = on ? target.amount : 0;
    if (!f) {
      if (!on) return;
      f = this._frost = {
        layer: new FrostLayer(el),
        shown: goal,
        drawn: -1,
        key: "",
        lastDraw: 0,
        last: now,
        fresh: true,
      };
    }
    const dt = Math.max(0, Math.min(1, (now - f.last) / 1000));
    f.last = now;
    const d = goal - f.shown;
    const step = (d > 0 ? FROST_GROW_PER_S : FROST_THAW_PER_S) * dt;
    f.shown = Math.abs(d) <= step ? goal : f.shown + Math.sign(d) * step;
    if (f.shown <= 0 && !on) {
      f.layer.destroy();
      this._frost = null;
      return;
    }
    // The card size in CSS pixels, from the last resize (no layout read here).
    const dims = this._cachedDimensions;
    const dpr = dims.dpr || 1;
    const resized = f.layer.resize(dims.width / dpr, dims.height / dpr);
    if (!f.layer.w) return;
    const t = target || { density: 0, night: false, mode: "matte", strength: 0 };
    const sun = this._getCelestialPosition(f.layer.w, f.layer.h);
    const light = {
      mode: t.mode,
      strength: t.strength,
      x: Math.round(sun.x / 8) * 8,
      y: Math.round(sun.y / 8) * 8,
    };
    const key = `${t.density.toFixed(2)}|${t.night}|${light.mode}|${light.strength}|${light.x}|${light.y}`;
    const grown = Math.abs(f.shown - f.drawn) > 0.005 && now - f.lastDraw >= FROST_REDRAW_MS;
    if (resized || key !== f.key || grown || f.drawn < 0) {
      f.layer.draw(f.shown, t.density, t.night, light);
      f.drawn = f.shown;
      f.key = key;
      f.lastDraw = now;
    }
    if (f.fresh) {
      // Shown in the next frame, so the fade runs from 0.
      f.fresh = false;
      requestAnimationFrame(() => this._frost && this._frost.layer.setVisible(true));
    }
  }
  _startAnimation() {
    if (this._animID === null && this._isVisible) {
      this._lastFrameTime = performance.now();
      this._frameScale = 1;
      this._animID = requestAnimationFrame(this._boundAnimate);
    }
  }
  _stopAnimation() {
    if (this._animID !== null) {
      cancelAnimationFrame(this._animID);
      this._animID = null;
    }
  }
}
const CARD_NAME = "atmo-weather-card";
// Offered in the card picker. Home brings its own house until you add yours.
const LAYOUT_LABELS = Object.freeze({ standard: "Standard", compact: "Compact", wide: "Wide", home: "Home", panel: "Panel" });
window.customCards = window.customCards || [];

if (!customElements.get(CARD_NAME)) {
  customElements.define(CARD_NAME, AtmosphericWeatherCard);
  window.customCards.push({
    type: CARD_NAME,
    name: "Atmo Weather Card",
    description:
      "An animated sky built from your weather data: clouds, rain, snow, wind, sun and moon",
    preview: true,
    documentationURL: "https://whyisthisbroken.github.io/atmo-weather-card/",
    // Home Assistant suggests it for a weather entity, in each layout.
    getEntitySuggestion: (hass, entityId) =>
      typeof entityId === "string" && entityId.startsWith("weather.")
        ? Object.keys(LAYOUT_LABELS).map((layout) => ({
            label: LAYOUT_LABELS[layout],
            config: { type: `custom:${CARD_NAME}`, ...stubConfig(entityId, hass, layout) },
          }))
        : null,
  });
}
