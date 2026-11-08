import { test } from "node:test";
import assert from "node:assert/strict";

import { makeHass } from "./helpers/dom.js";
import { collectEditorTexts } from "./helpers/editor-texts.js";
import { editorLanguage, makeTranslator } from "../src/atmo-weather-i18n.js";
import { TRANSLATION_ROWS } from "../src/atmo-weather-i18n-strings.js";

const placeholders = (s) => (s.match(/\{\w+\}/g) || []).sort().join();

test("the editor language follows Home Assistant and falls back to English", () => {
  assert.equal(editorLanguage({ locale: { language: "de" } }), "de");
  assert.equal(editorLanguage({ locale: { language: "de-CH" } }), "de");
  assert.equal(editorLanguage({ language: "de" }), "de");
  assert.equal(editorLanguage({ language: "nl" }), "en");
  assert.equal(editorLanguage({ locale: { language: "pt-BR" } }), "en");
  assert.equal(editorLanguage(undefined), "en");
});

test("translations fill placeholders and fall back to the English text", () => {
  const de = makeTranslator("de");
  assert.equal(de("Add chip"), "Chip hinzufügen");
  assert.equal(de("+{n} days", { n: 3 }), "+3 Tage");
  assert.equal(de("Not translated yet"), "Not translated yet");
  assert.equal(makeTranslator("en")("+{n} days", { n: 2 }), "+2 days");
});

test("every translation row is complete and keeps its placeholders", () => {
  const seen = new Set();
  for (const row of TRANSLATION_ROWS) {
    assert.equal(row.length, 2, row[0]);
    assert.ok(!seen.has(row[0]), `duplicate row ${row[0]}`);
    seen.add(row[0]);
    for (const text of row) {
      assert.ok(typeof text === "string" && text.trim(), `empty text in ${row[0]}`);
      assert.equal(placeholders(text), placeholders(row[0]), `placeholder in ${text}`);
    }
  }
});

test("every text of the editor is translated", async () => {
  const keys = new Set(TRANSLATION_ROWS.map((row) => row[0]));
  const missing = (await collectEditorTexts()).filter((text) => !keys.has(text));
  assert.deepEqual(missing, []);
});

test("the editor templates have no visible text outside t()", async () => {
  const { readFile } = await import("node:fs/promises");
  const src = (await readFile(new URL("../src/atmo-weather-card-editor.js", import.meta.url), "utf8")).replace(/\r\n/g, "\n");
  const cssStart = src.indexOf("static get styles()");
  const code = src.slice(0, cssStart) + src.slice(src.indexOf("`;", cssStart));
  const bare = [];
  // Text between two tags inside html`` templates.
  for (const m of code.matchAll(/>([^<>`]*)</g)) {
    const text = m[1].replace(/\$\{[^}]*\}/g, " ").replace(/\s+/g, " ").trim();
    if (/[A-Za-z]{2,}/.test(text) && !/[=;{}]|=>|\b(this|const|return)\b/.test(text)) bare.push(text);
  }
  // Labels built from a translated word plus English, e.g. `${label} color`.
  for (const m of code.matchAll(/`\$\{\w+\} [a-z][a-z ]+`/g)) bare.push(m[0]);
  assert.deepEqual(bare, []);
});

test("the editor shows German texts in a German Home Assistant", async () => {
  await import("../src/atmo-weather-card-editor.js");
  const editor = document.createElement("atmo-weather-card-editor");
  editor.hass = makeHass({ language: "de" });
  editor.setConfig({ weather_entity: "weather.home" });
  document.body.append(editor);
  await editor.updateComplete;
  const text = editor.shadowRoot.textContent;
  assert.ok(text.includes("Leistung & Effekte"));
  assert.ok(text.includes("Sonne & Mond"));
  const form = editor.shadowRoot.querySelector("ha-form");
  assert.equal(form.computeLabel({ name: "precipitation_entity" }), "Niederschlagssensor");
  editor.remove();

  // A Home Assistant in English switches the texts back.
  const english = document.createElement("atmo-weather-card-editor");
  english.hass = makeHass({ language: "en" });
  english.setConfig({ weather_entity: "weather.home" });
  document.body.append(english);
  await english.updateComplete;
  assert.ok(english.shadowRoot.textContent.includes("Performance & effects"));
  english.remove();
});
