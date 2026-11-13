import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const { version } = JSON.parse(read("package.json"));
const { filename, homeassistant } = JSON.parse(read("hacs.json"));
const card = read("dist/atmo-weather-card.js");
const editor = read("dist/atmo-weather-card-editor.js");

test("hacs.json points the Marketplace at the dist bundle", () => {
  assert.ok(existsSync(new URL(`../dist/${filename}`, import.meta.url)));
  assert.equal(existsSync(new URL(`../${filename}`, import.meta.url)), false);
  assert.match(homeassistant, /^\d{4}\.\d{1,2}\.\d+$/);
});

test("dist carries the package version", () => {
  assert.ok(card.startsWith(`/* Atmo Weather Card ${version}\n`));
  assert.ok(card.includes(`"${version}"`));
  assert.ok(!card.includes("__AWC_VERSION__"));
});

test("dist carries the license and every copyright line of LICENSE", () => {
  // The Marketplace installs only dist, without the LICENSE file.
  const lines = read("LICENSE").split(/\r?\n/).filter((l) => l.startsWith("Copyright"));
  assert.ok(lines.some((l) => l.includes("shpongledsummer")));
  for (const bundle of [card, editor]) {
    const head = bundle.slice(0, bundle.indexOf("*/"));
    assert.ok(head.includes("MIT License"));
    for (const line of lines) assert.ok(head.includes(line), `${line} is missing in dist`);
  }
});

test("dist loads nothing from third-party hosts at runtime", () => {
  for (const bundle of [card, editor]) {
    assert.ok(!bundle.includes("esm.sh"));
    assert.ok(!bundle.includes("fonts.googleapis.com"));
  }
});

test("the font files referenced by the card are shipped", () => {
  const fonts = card.match(/figtree-[a-z-]+\.woff2/g);

  assert.ok(fonts && fonts.length >= 2);
  for (const font of fonts) {
    assert.ok(existsSync(new URL(`../dist/${font}`, import.meta.url)), font);
  }
});

test("the live demo in docs uses the current bundle", () => {
  assert.equal(read("docs/atmo-weather-card.js"), card);
  assert.equal(read("docs/atmo-weather-card-editor.js"), editor);
  assert.ok(read("docs/demo.html").includes("./atmo-weather-card.js"));
  assert.ok(read("docs/index.html").includes("./atmo-weather-card.js"));
  for (const old of ["animations", "config", "fauna"]) {
    assert.equal(
      existsSync(new URL(`../docs/atmo-weather-${old}.js`, import.meta.url)),
      false,
    );
  }
});
