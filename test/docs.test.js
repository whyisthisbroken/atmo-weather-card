import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import { PAGES, buildDocs, buildLanding, renderDocs } from "../scripts/build-docs.mjs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const DOCS = "https://whyisthisbroken.github.io/atmo-weather-card/";
const SRC = new URL("../src", import.meta.url).pathname.replace(/^\/(\w:)/, "$1");
const { version } = JSON.parse(read("package.json"));
const landing = read("docs/index.html");
const docPages = Object.fromEntries(PAGES.map((p) => [p.file, read(`docs/docs/${p.file}.html`)]));
const allDocs = Object.values(docPages).join("\n");
// Where each id lives now; old links to index.html#id are forwarded with this map.
const redirects = JSON.parse(landing.match(/const to = (\{.*?\});/s)[1]);
const landingIds = new Set([...landing.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));

// A documentation source with every page heading, plus extra text on the first page.
const skeleton = (first = "Text\n") =>
  PAGES.map((p, i) => `## ${p.heading}\n\n${i === 0 ? first : "Text\n"}`).join("\n");

test("the site is built from docs-src", async () => {
  const { pages, where, examples } = await buildDocs({
    version,
    source: read("docs-src/documentation.md"),
    template: read("docs-src/template.html"),
    overview: read("docs-src/overview.html"),
    srcDir: SRC,
  });
  for (const p of PAGES)
    assert.equal(pages.get(`${p.file}.html`), docPages[p.file].replace(/\r\n/g, "\n"), `run npm run build (${p.file})`);
  assert.equal(pages.get("index.html"), read("docs/docs/index.html").replace(/\r\n/g, "\n"));
  const fresh = await buildLanding({ version, template: read("docs-src/landing.html"), where, srcDir: SRC });
  assert.equal(fresh, landing.replace(/\r\n/g, "\n"), "run npm run build (landing)");
  assert.ok(examples >= 15, `only ${examples} live examples`);
  for (const html of [landing, ...Object.values(docPages)]) assert.ok(html.includes(`${version}`));
  assert.ok(landing.includes('import("./atmo-weather-card.js")'));
  assert.ok(docPages.setup.includes('import("../atmo-weather-card.js")'));
  // The build writes them with LF whatever the checkout uses.
  for (const f of ["site.css", "site.js"]) {
    assert.equal(read(`docs/${f}`), read(`docs-src/${f}`).replace(/\r\n/g, "\n"), `run npm run build (${f})`);
    assert.ok(!read(`docs/${f}`).includes("\r"), `${f} has LF line ends`);
  }
});

test("the live card of the documentation starts sunny without measured cloud cover", () => {
  // A fixed cloud_coverage in the demo data put clouds into every sunny sky.
  const script = docPages.setup.slice(docPages.setup.indexOf("function buildHass()"));
  assert.ok(!/cloud_coverage/.test(script.slice(0, script.indexOf("return {"))));
  assert.match(docPages.setup, /const state = \{ condition: "sunny", night: false, frost: false \};/);
});

test("the editor help links point at sections of the documentation", () => {
  const editor = read("src/atmo-weather-card-editor.js").replace(/\r\n/g, "\n");
  assert.ok(editor.includes(`const DOCS_URL = "${DOCS}";`));
  assert.ok(editor.includes('href="${DOCS_URL}docs/${href}"'));
  // Every help box has a link: a direct call names its page, the tables of
  // the sections and chip tabs give theirs.
  const direct = [...editor.matchAll(/this\._renderIntro\(\n\s+"[a-z_0-9]+",\n[\s\S]*?\n\s+"([a-z-]+)\.html#([a-z0-9-]+)",?\n\s+\)/g)];
  const fromTables = editor.match(/this\._renderIntro\([^()]*\.\.\.(SECTION_HELP|CHIP_TAB_HELP)\[/g) || [];
  assert.equal(direct.length + fromTables.length, (editor.match(/this\._renderIntro\(/g) || []).length);
  assert.equal(fromTables.length, 2);
  const links = [...editor.matchAll(/"([a-z-]+)\.html#([a-z0-9-]+)"/g)];
  assert.ok(links.length >= 30);
  // Each section and each chip tab has help: from the table or a call of its own.
  const table = (name) => {
    const body = editor.match(new RegExp(`const ${name} = \\{([\\s\\S]*?)\\n\\};`))[1];
    return [...body.matchAll(/^  ([a-z_]+): \[/gm)].map((m) => m[1]);
  };
  const sections = [...editor.matchAll(/this\._section\(\n\s+"([a-z_]+)",/g)].map((m) => m[1]);
  const ownHelp = ["style", "css", "sun_moon", "image_folder", "image_states"];
  assert.deepEqual(sections.filter((id) => !table("SECTION_HELP").includes(id) && !ownHelp.includes(id)), []);
  assert.deepEqual(table("CHIP_TAB_HELP").sort(), ["data", "icon", "look", "position", "tap", "text", "visibility"]);
  // Each help link opens the page that holds its section.
  // Fixed links like the SVG icons tip go the same way.
  const fixed = [...editor.matchAll(/href="\$\{DOCS_URL\}docs\/([a-z-]+)\.html#([a-z0-9-]+)"/g)];
  assert.ok(fixed.length >= 1);
  for (const [, file, id] of [...links, ...fixed]) {
    assert.ok(docPages[file], `${file}.html does not exist`);
    assert.ok(docPages[file].includes(` id="${id}"`), `#${id} is not on ${file}.html`);
  }
  // No link leads to another repository.
  assert.deepEqual([...editor.matchAll(/https:\/\/github\.com\/[^"'`\s]+/g)].map((m) => m[0]), []);
});

test("the documentation search finds options and sections", () => {
  const indexOf = (html) => JSON.parse(html.match(/<script type="application\/json" id="search-index">(.*?)<\/script>/s)[1]);
  const search = indexOf(docPages.chips);
  // Every docs page, the overview too, carries the same index and the shared search.
  for (const html of [...Object.values(docPages), read("docs/docs/index.html")]) {
    assert.deepEqual(indexOf(html), search);
    assert.ok(html.includes('<script type="module" src="../site.js"></script>'));
    assert.ok(!html.includes("SEARCH.filter"), "search code is in site.js only");
  }
  assert.ok(read("docs-src/site.js").includes('getElementById("search-index")'));
  const options = search.filter((o) => o.k === "option");
  assert.ok(options.length >= 150, `only ${options.length} options in the search`);
  assert.ok(search.some((o) => o.k === "section"));
  // The troubleshooting questions can be searched too.
  assert.ok(search.some((o) => o.k === "question" && o.n === "Clouds, rain or the sun cover a chip"));
  for (const name of ["bearing_icon", "bearing_speed", "wind_compass", "behind_effects"])
    assert.ok(options.some((o) => o.n === name), `${name} is not in the search`);
  for (const o of search) {
    const [file, id] = o.u.split("#");
    assert.ok(docPages[file.replace(".html", "")].includes(` id="${id}"`), `search target ${o.u} is missing`);
  }
});

test("README links into the documentation find their targets", () => {
  const readme = read("README.md");
  // The README opens the pages directly, not the start page with an anchor.
  assert.ok(!readme.includes(`${DOCS}#`), "README links to the start page with an anchor");
  const links = [...readme.matchAll(/https:\/\/whyisthisbroken\.github\.io\/atmo-weather-card\/docs\/(?:([a-z-]+)\.html)?(?:#([a-z0-9_-]+))?/g)];
  assert.ok(links.length >= 9);
  for (const [url, file = "index", id] of links) {
    const page = file === "index" ? read("docs/docs/index.html") : docPages[file];
    assert.ok(page, `${url}: page is missing`);
    if (id) assert.ok(page.includes(` id="${id}"`), `${url}: section is missing`);
  }
  // Every page of the documentation has a row in the README table.
  for (const p of PAGES) assert.ok(readme.includes(`${DOCS}docs/${p.file}.html`), `${p.file} is missing in the README`);
  // Links inside the README stay inside the README.
  const own = new Set([...readme.matchAll(/<a name="([^"]+)">/g)].map((m) => m[1]));
  for (const m of readme.replace(/\r\n/g, "\n").matchAll(/^#+ (.+)$/gm))
    own.add(m[1].toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s/g, "-"));
  for (const m of readme.matchAll(/\]\(#([^)]+)\)/g)) assert.ok(own.has(m[1]), `README #${m[1]} is missing`);
  // The old anchors of a table row name sections of the page that row opens.
  for (const row of readme.split(/\r?\n/).filter((l) => l.startsWith("| <a name="))) {
    const file = /\/docs\/([a-z-]+)\.html\)/.exec(row)[1];
    for (const [, id] of row.matchAll(/<a name="([^"]+)"><\/a>/g))
      assert.equal(redirects[id], file, `README #${id} sits in the ${file} row`);
  }
});

test("old links into the single docs page open the page that holds the section", () => {
  assert.equal(redirects.wind, "effects");
  assert.equal(redirects["color-mode"], "appearance");
  assert.equal(redirects["opt-perf_mode"], "effects");
  assert.equal(redirects["weather-icons"], "guides");
  assert.equal(redirects["weather-data"], "weather-data");
  // The landing page keeps its own sections.
  assert.ok(!("install" in redirects) && landingIds.has("install"));
  assert.match(landing, /location\.replace\(`docs\/\$\{to\[id\]\}\.html#\$\{id\}`\)/);
});

test("the documentation build stops on a broken link, invalid YAML or a page without a section", async () => {
  await assert.doesNotReject(renderDocs({ source: skeleton() }));
  await assert.rejects(renderDocs({ source: skeleton("[gone](#nowhere)\n") }), /Broken links/);
  await assert.rejects(renderDocs({ source: skeleton("```yaml\na: [\n```\n") }), /Invalid YAML/);
  await assert.rejects(renderDocs({ source: skeleton() + "\n## Extra\n\nText\n" }), /no navigation group/);
  await assert.rejects(renderDocs({ source: "## Setup\n\nText\n" }), /Missing section/);
});

test("links to another page get its file name", async () => {
  const source = PAGES.map((p, i) => `## ${p.heading}\n\n${i === 0 ? "[Wind](#wind-here) [Top](#setup)" : p.file === "effects" ? "### Wind here\n" : "Text"}\n`).join("\n");
  const { pages } = await renderDocs({ source });
  assert.match(pages[0].html, /href="effects\.html#wind-here"/);
  assert.match(pages[0].html, /href="#setup"/);
});

test("YAML examples get a live button with demo entities", async () => {
  const { pages, examples } = await buildDocs({
    version,
    source: skeleton("```yaml\ntype: custom:atmo-weather-card\nweather_entity: weather.your_weather_entity\nchips:\n  - entity: sensor.outside_humidity\n    icon_path: /local/x/\n```\n\n```yaml\nfoo: 1\n```\n"),
    template: "{{CONTENT}}|{{ENTITIES}}",
    srcDir: SRC,
  });
  assert.equal(examples, 1);
  const html = pages.get("setup.html");
  const cfg = JSON.parse(html.match(/data-example="([^"]+)"/)[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  assert.deepEqual(cfg, { weather_entity: "weather.demo", chips: [{ entity: "sensor.outside_humidity" }] });
  assert.ok(html.endsWith('["sensor.outside_humidity","weather.demo"]'));
});

test("tables and the demo stay readable on phones", () => {
  assert.match(docPages.setup, /@media \(max-width: 900px\) \{\s*table, tbody, tr, td \{ display: block; \}/);
  const cells = [...allDocs.matchAll(/<td(?=[\s>])[^>]*>/g)].map((m) => m[0]);
  assert.ok(cells.length > 100);
  for (const cell of cells) assert.match(cell, /data-label="[^"]+"/);
  // The card window stays in view above the settings, on a solid background so the
  // settings scrolling under it never show through. Phones drop its tab bar.
  const demo = read("docs/demo.html").replace(/\r\n/g, "\n");
  assert.match(demo, /\.stage \.window \{ position: sticky; top: [^;]+; z-index: \d+; background: var\(--panel\);[^}]*\}/);
  assert.match(demo, /@media \(max-width: 760px\) \{\s*\.stage \.window \{ top: 8px; \}\s*\.stage \.window \.window-bar \{ display: none; \}/);
});

test("every image the site uses exists", () => {
  const docImgs = [...allDocs.matchAll(/<img[^>]+src="\.\.\/(images\/[^"]+)"/g)].map((m) => m[1]);
  const landingImgs = [...landing.matchAll(/<img[^>]+src="(images\/[^"]+)"/g)].map((m) => m[1]);
  assert.ok(docImgs.length > 0 && landingImgs.length >= 2);
  // No page in docs/docs/ points at images/ next to itself.
  assert.ok(!/<img[^>]+src="images\//.test(allDocs));
  // The image_transition demo builds six paths from one base name.
  const fadeBases = [...allDocs.matchAll(/class="fade-demo" data-images="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(fadeBases.length, 1);
  const fadeImgs = fadeBases.flatMap((b) => ["day", "night", "rain-day", "rain-night", "snow-day", "snow-night"].map((v) => `${b}-${v}.webp`));
  for (const src of [...docImgs, ...landingImgs, ...fadeImgs])
    assert.ok(existsSync(new URL(`../docs/${src}`, import.meta.url)), src);
  // The house of the demo and the landing page: the one that comes with the card.
  const demoHtml = read("docs/demo.html");
  const housePaths = [...(demoHtml + landing).matchAll(/["'](house-[a-z-]+\.webp)["']/g)].map((m) => m[1]);
  assert.ok(housePaths.length >= 6, housePaths.join());
  for (const src of housePaths) assert.ok(existsSync(new URL(`../docs/${src}`, import.meta.url)), src);
  // Till890's sample house is gone from the site.
  assert.ok(!/state-house/.test(allDocs + landing + demoHtml));
});

test("live examples run in the scene they need", () => {
  const button = (page, id) => {
    const html = docPages[page];
    const at = html.indexOf(`id="${id}"`);
    return html.slice(at).match(/<button type="button" class="try"[^>]*>/)[0];
  };
  assert.match(button("effects", "night-sky"), /data-scene="night"/);
  assert.match(button("effects", "wind-compass"), /data-scene="windy"/);
  // card_mod variables reach the live card; embedded cards keep their config for the stand-in.
  const decode = (b) => JSON.parse(b.match(/data-example="([^"]+)"/)[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&"));
  assert.match(decode(button("appearance", "card-mod-example"))._host_style, /--awc-text-day: #ffffff/);
  const cards = decode(button("appearance", "embedded-cards")).custom_cards;
  assert.deepEqual(cards[0], { type: "placeholder", label: "weather-forecast", custom_width: "100%", entity: "weather.demo" });
});

test("a nolive example shows its code without a Show live button", () => {
  const html = docPages.images;
  const section = html.slice(html.indexOf('id="image-conditions"'), html.indexOf('id="blending-between-images"'));
  assert.ok(section.includes("binary_sensor.snow_on_roof"));
  assert.ok(!section.includes('class="try"'));
  assert.ok(!section.includes("nolive"));
});

test("the demo has an icon for every icon the layouts use", () => {
  // demo.html is written by hand, so its stand-in icon list misses new layout icons
  // unless this checks it; a missing one shows as a question mark.
  const demo = read("docs/demo.html");
  const icons = JSON.parse(demo.match(/const ICONS = (\{.*?\});/)[1]);
  const used = new Set([...read("src/atmo-weather-config.js").matchAll(/mdi:([a-z0-9-]+)/g)].map((m) => m[1]));
  assert.deepEqual([...used].filter((n) => !icons[n]), []);
});
