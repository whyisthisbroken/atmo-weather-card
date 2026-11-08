// Collects every text the editor can show: the fixed tables, every t("...")
// in the source, and the texts requested while every control is used.
import { readFileSync } from "node:fs";

import { makeHass } from "./dom.js";
import { textRecorder } from "../../src/atmo-weather-i18n.js";

const { EDITOR_TEXT_TABLES } = await import("../../src/atmo-weather-card-editor.js");

const CHIPS = [
  { entity: "sensor.temperature", name: "Room", icon: "mdi:home" },
  { entity: "weather.home", attribute: "humidity", sub_value_entity: "sensor.temperature" },
  { entity: "weather.home", forecast: "daily", attribute: "temperature", forecast_offset: 3 },
  { entity: "weather.home", forecast: "hourly", attribute: "temperature", icon: "weather" },
  { entity: "sensor.temperature", type: "ring", ring_thresholds: [{ value: 10, color: "red" }] },
  { entity: "sensor.temperature", type: "bar" },
  { entity: "sensor.time", position: "custom", label_overflow: "marquee" },
  {},
];

const settle = async (editor) => {
  await editor.updateComplete;
  await Promise.resolve();
};

async function clickAll(editor, selector) {
  const count = editor.shadowRoot.querySelectorAll(selector).length;
  for (let i = 0; i < count; i++) {
    const el = editor.shadowRoot.querySelectorAll(selector)[i];
    if (!el) break;
    el.click();
    await settle(editor);
  }
}

async function visit(config, panel, setup) {
  const editor = document.createElement("atmo-weather-card-editor");
  editor.addEventListener("config-changed", (e) => editor.setConfig(e.detail.config));
  editor.hass = makeHass();
  editor.setConfig(config);
  document.body.append(editor);
  editor._openPanel = panel;
  if (setup) setup(editor);
  editor.requestUpdate();
  await settle(editor);
  await clickAll(editor, ".help-btn");
  await clickAll(editor, "button[data-field], button[data-value]");
  editor.remove();
}

export async function collectEditorTexts() {
  const texts = new Set();
  const add = (v) => {
    if (typeof v === "string" && v.trim()) texts.add(v);
  };
  const { LABELS, HELPERS, CHIP_LABELS, CHIP_HELPERS, OPT, FC_ATTRIBUTES } = EDITOR_TEXT_TABLES;
  for (const table of [LABELS, HELPERS, CHIP_LABELS, CHIP_HELPERS]) Object.values(table).forEach(add);
  for (const list of [...Object.values(OPT), FC_ATTRIBUTES])
    for (const o of list) {
      add(o.label);
      add(o.short);
    }
  const source = readFileSync(new URL("../../src/atmo-weather-card-editor.js", import.meta.url), "utf8");
  for (const m of source.matchAll(/\bt\(\s*"((?:[^"\\]|\\.)*)"/g)) add(JSON.parse(`"${m[1]}"`));
  // Every capitalized string in the editor code (after the styles) counts as
  // visible text, so texts behind rarely reached states are checked as well.
  const code = source.slice(source.indexOf("  setConfig(config) {"));
  for (const line of code.split(/\r?\n/)) {
    if (/^\s*(\/\/|\*)/.test(line)) continue;
    for (const m of line.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
      const text = m[1];
      if (/^[A-Z“„(]/.test(text) && /[a-z]{2}/.test(text) && !text.includes("${")) add(text);
    }
  }

  textRecorder.texts = texts;
  try {
    const base = {
      weather_entity: "weather.home",
      image_day: "/local/day.png",
      status_entity: "binary_sensor.door",
      card_style: "immersive",
      chip_area_layout: "grid",
      chip_area_grouped: true,
      chip_area_background: true,
      theme_entity: "sun.sun",
      perf_mode: "ultra",
      custom_cards: [{ type: "markdown", content: "x" }],
      chips: CHIPS,
    };
    for (const panel of ["sun_moon", "appearance", "chips", "image", "cards", "performance", "card_tap_action"])
      await visit(base, panel);
    await visit({ ...base, card_hide_text: true }, "chips");
    await visit({ ...base, perf_effects: 0, perf_fauna: 0 }, "performance");
    // Chip tabs only need rendering; one editor walks through all of them.
    const editor = document.createElement("atmo-weather-card-editor");
    editor.hass = makeHass();
    editor.setConfig(base);
    document.body.append(editor);
    editor._openPanel = "chips";
    for (let i = 0; i < CHIPS.length; i++) {
      editor._expandedChip = i;
      for (const tab of ["data", "text", "icon", "look", "position", "tap"]) {
        editor[`_acc_open_${i}`] = tab;
        editor.requestUpdate();
        await settle(editor);
      }
      editor[`_acc_open_${i}`] = "text";
      for (const sub of ["text_label", "text_value", "text_sub", "text_marquee"]) {
        editor[`_text_acc_${i}`] = sub;
        editor.requestUpdate();
        await settle(editor);
      }
    }
    editor.remove();
  } finally {
    textRecorder.texts = null;
  }
  // Pure numbers, units and placeholders need no translation.
  return [...texts].filter((s) => /[A-Za-z]{2}/.test(s) && s !== "auto" && !/^\+\d/.test(s) && !/^[\d.]+(px|em|%)?$/.test(s)).sort();
}
