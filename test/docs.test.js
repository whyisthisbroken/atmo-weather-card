import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { buildDocs } from "../scripts/build-docs.mjs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const DOCS = "https://whyisthisbroken.github.io/atmo-weather-card/";
const { version } = JSON.parse(read("package.json"));
const page = read("docs/index.html");
const pageIds = new Set([...page.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));

const build = (source, template = "{{CONTENT}}") =>
  buildDocs({ version, source, template, srcDir: new URL("../src", import.meta.url).pathname.replace(/^\/(\w:)/, "$1") });

test("the documentation page is built from docs-src", async () => {
  const { page: fresh, examples } = await buildDocs({
    version,
    source: read("docs-src/documentation.md"),
    template: read("docs-src/template.html"),
    srcDir: new URL("../src", import.meta.url).pathname.replace(/^\/(\w:)/, "$1"),
  });
  assert.equal(fresh.replace(/\r\n/g, "\n"), page.replace(/\r\n/g, "\n"), "run npm run build");
  assert.ok(examples >= 15, `only ${examples} live examples`);
  assert.ok(page.includes(`>${version}<`));
  assert.ok(page.includes("./atmo-weather-card.js"));
});

test("the live card of the documentation starts sunny without measured cloud cover", () => {
  // A fixed cloud_coverage in the demo data put clouds into every sunny sky.
  const script = page.slice(page.indexOf("function buildHass()"));
  assert.ok(!/cloud_coverage/.test(script.slice(0, script.indexOf("return {"))));
  assert.match(page, /const state = \{ condition: "sunny", night: false \};/);
});

test("the editor help links point at sections of the documentation", () => {
  const editor = read("src/atmo-weather-card-editor.js").replace(/\r\n/g, "\n");
  assert.ok(editor.includes(`const DOCS_URL = "${DOCS}";`));
  const anchors = [...editor.matchAll(/this\._renderIntro\(\n\s+"[a-z_]+",\n[\s\S]*?\n\s+"([a-z0-9-]+)",?\n\s+\)/g)].map((m) => m[1]);
  assert.ok(anchors.length >= 6);
  for (const anchor of anchors) assert.ok(pageIds.has(anchor), `#${anchor} is missing`);
});

test("README links into the documentation find their targets", () => {
  const readme = read("README.md");
  const links = [...readme.matchAll(/https:\/\/whyisthisbroken\.github\.io\/atmo-weather-card\/#([a-z0-9-]+)/g)].map((m) => m[1]);
  assert.ok(links.length >= 8);
  for (const id of links) assert.ok(pageIds.has(id), `#${id} is missing`);
  // Links inside the README stay inside the README.
  const own = new Set([...readme.matchAll(/<a name="([^"]+)">/g)].map((m) => m[1]));
  for (const m of readme.replace(/\r\n/g, "\n").matchAll(/^#+ (.+)$/gm))
    own.add(m[1].toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s/g, "-"));
  for (const m of readme.matchAll(/\]\(#([^)]+)\)/g)) assert.ok(own.has(m[1]), `README #${m[1]} is missing`);
});

test("the documentation build stops on a broken link or invalid YAML", async () => {
  const base = "## Setup\n\nText\n\n";
  const rest = ["Examples", "Appearance", "Guides", "Weather Data & Sky Light", "Color Mode", "Performance", "Troubleshooting"]
    .map((t) => `## ${t}\n\nText\n`)
    .join("\n");
  await assert.doesNotReject(build(base + rest));
  await assert.rejects(build(base + "[gone](#nowhere)\n\n" + rest), /Broken links/);
  await assert.rejects(build(base + "```yaml\na: [\n```\n\n" + rest), /Invalid YAML/);
  await assert.rejects(build(base + rest + "\n## Extra\n\nText\n"), /no navigation group/);
});

test("YAML examples get a live button with demo entities", async () => {
  const rest = ["Examples", "Appearance", "Guides", "Weather Data & Sky Light", "Color Mode", "Performance", "Troubleshooting"]
    .map((t) => `## ${t}\n\nText\n`)
    .join("\n");
  const { page: html, examples } = await build(
    "## Setup\n\n```yaml\ntype: custom:atmo-weather-card\nweather_entity: weather.your_weather_entity\nchips:\n  - entity: sensor.outside_humidity\n    icon_path: /local/x/\n```\n\n```yaml\nfoo: 1\n```\n\n" + rest,
    "{{CONTENT}}|{{ENTITIES}}",
  );
  assert.equal(examples, 1);
  const cfg = JSON.parse(html.match(/data-example="([^"]+)"/)[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  assert.deepEqual(cfg, { weather_entity: "weather.demo", chips: [{ entity: "sensor.outside_humidity" }] });
  assert.ok(html.endsWith('["sensor.outside_humidity","weather.demo"]'));
});
