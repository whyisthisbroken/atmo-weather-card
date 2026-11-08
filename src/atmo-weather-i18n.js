// Editor translations. Keys are the English texts; a missing entry falls back
// to English, so the editor never shows an empty label.
import { TRANSLATIONS } from "./atmo-weather-i18n-strings.js";

export const EDITOR_LANGUAGES = Object.freeze(["en", "de"]);

// Picks the editor language from Home Assistant ("de-CH" -> "de").
export function editorLanguage(hass) {
  const raw =
    (hass && ((hass.locale && hass.locale.language) || hass.language)) || "en";
  const base = String(raw).toLowerCase().split(/[-_]/)[0];
  return EDITOR_LANGUAGES.includes(base) ? base : "en";
}

// Tests collect every requested text here to check the translations.
export const textRecorder = { texts: null };

// Returns t(text, vars) for one language. {name} placeholders are filled from vars.
export function makeTranslator(lang) {
  const table = TRANSLATIONS[lang] || null;
  return (text, vars) => {
    if (textRecorder.texts && text) textRecorder.texts.add(text);
    let out = (table && table[text]) || text;
    if (vars) {
      for (const [k, v] of Object.entries(vars))
        out = out.split(`{${k}}`).join(String(v));
    }
    return out;
  };
}
