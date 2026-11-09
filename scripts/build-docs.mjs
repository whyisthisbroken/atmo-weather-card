// Builds the documentation page docs/index.html from docs-src/documentation.md.
// Every YAML example that configures the card gets a "Show live" button that
// loads it into the real card on the page. The build fails on a broken link
// or an example that is no valid YAML.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { marked } from "marked";
import YAML from "yaml";
import * as mdi from "@mdi/js";

const README = "https://github.com/whyisthisbroken/atmo-weather-card";

// Navigation groups, by level 2 heading.
const GROUPS = [
  ["Getting started", ["Setup", "Examples"]],
  ["Customization", ["Appearance"]],
  ["Guides", ["Guides"]],
  ["Reference", ["Weather Data & Sky Light", "Color Mode", "Performance"]],
  ["Help", ["Troubleshooting"]],
];

// Demo entities: the placeholder names of the examples run on demo data.
const ENTITY_MAP = {
  "weather.your_weather_entity": "weather.demo",
  "weather.home": "weather.demo",
};

// Same anchors as on GitHub.
export const slug = (text) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;|&#39;/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s/g, "-");

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (s) => escapeHtml(s).replace(/'/g, "&#39;").replace(/"/g, "&quot;");

// GitHub alerts (> [!NOTE]) as styled boxes.
function alerts(md) {
  return md.replace(
    /^> \[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\n((?:>.*\n?)*)/gm,
    (_, kind, body) =>
      `<div class="alert alert-${kind.toLowerCase()}"><p class="alert-title">${kind[0] + kind.slice(1).toLowerCase()}</p>\n\n${body.replace(/^> ?/gm, "")}\n</div>\n`,
  );
}

// Turns a YAML example into a config for the live card, or null when it is
// not about the card (for example a theme snippet).
function liveConfig(obj, entities) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return null;
  const isCard = obj.type === "custom:atmo-weather-card";
  const isFragment =
    !isCard &&
    Object.keys(obj).some((k) =>
      /^(chips|chip_|card_|celestial_|perf_|fauna_|effect_|wind_|custom_cards|image_|shooting|comet|animation|bird_|star_)/.test(k),
    );
  if (!isCard && !isFragment) return null;
  const walk = (v) => {
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") {
      const o = {};
      for (const [k, x] of Object.entries(v)) {
        // Image folders and card-mod styles do not exist on this page.
        if (k === "icon_path" || k === "card_mod") continue;
        o[k] = walk(x);
      }
      return o;
    }
    if (typeof v === "string" && /^(weather|sensor|binary_sensor)\.[a-z0-9_]+$/.test(v)) {
      const id = ENTITY_MAP[v] || v;
      entities.add(id);
      return id;
    }
    return v;
  };
  const cfg = walk(obj);
  delete cfg.type;
  if (Array.isArray(cfg.custom_cards))
    cfg.custom_cards = cfg.custom_cards.map((c) => ({
      type: "placeholder",
      label: c.type,
      custom_width: c.custom_width,
    }));
  return cfg;
}

export async function buildDocs({ version, source, template, srcDir }) {
  const md = source.replace(/\r\n/g, "\n").replace(/<!--[\s\S]*?-->\n*/g, "");
  const entities = new Set();
  const ids = new Map();
  let examples = 0;
  let toc = null;

  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    let id = slug(text);
    // Repeated headings get -1, -2 like on GitHub.
    const n = ids.get(id) || 0;
    ids.set(id, n + 1);
    if (n) id = `${id}-${n}`;
    if (level <= 3 && toc) toc.push({ level, id, text: text.replace(/<[^>]+>/g, "") });
    return `<h${level} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${text}</h${level}>\n`;
  };
  renderer.code = (code, lang) => {
    let live = "";
    if (lang === "yaml") {
      let parsed;
      try {
        parsed = YAML.parse(code);
      } catch (e) {
        throw new Error(`Invalid YAML example in the documentation: ${e.message}\n${code}`);
      }
      const cfg = liveConfig(parsed, entities);
      if (cfg) {
        examples++;
        live = `<button type="button" class="try" data-example="${escapeAttr(JSON.stringify(cfg))}">Show live</button>`;
      }
    }
    return `<div class="code"><div class="code-bar"><span>${escapeHtml(lang || "text")}</span><span class="code-actions">${live}<button type="button" class="copy">Copy</button></span></div><pre><code>${escapeHtml(code)}</code></pre></div>`;
  };
  // Option names in the first table column get their own anchor (#opt-perf_mode).
  renderer.tablecell = (content, flags) => {
    const tag = flags.header ? "th" : "td";
    const m = !flags.header && /^<code>([a-z][a-z0-9_]*)<\/code>/.exec(content);
    const id = m && !ids.has(`opt-${m[1]}`) ? ` id="opt-${m[1]}"` : "";
    if (id) ids.set(`opt-${m[1]}`, 1);
    const align = flags.align ? ` style="text-align:${flags.align}"` : "";
    return `<${tag}${id}${align}>${content}</${tag}>\n`;
  };

  // Split into level 2 sections.
  const sections = new Map();
  let current = null;
  let inCode = false;
  for (const line of md.split("\n")) {
    if (/^```/.test(line)) inCode = !inCode;
    const h = !inCode && /^## (.+)$/.exec(line);
    if (h) {
      current = [];
      sections.set(h[1].trim(), current);
    }
    if (current) current.push(line);
  }
  const grouped = GROUPS.flatMap(([, titles]) => titles);
  for (const title of sections.keys())
    if (!grouped.includes(title)) throw new Error(`Section "${title}" is in no navigation group`);

  let content = "";
  const nav = [];
  for (const [group, titles] of GROUPS) {
    const items = [];
    for (const title of titles) {
      if (!sections.has(title)) throw new Error(`Missing section "${title}"`);
      toc = [];
      content += `<section class="doc-section">${marked.parse(alerts(sections.get(title).join("\n")), { gfm: true, renderer })}</section>\n`;
      items.push(...toc);
    }
    nav.push(
      `<div class="nav-group"><div class="nav-title">${group}</div>${items
        .map((h) => `<a class="nav-l${h.level}" href="#${h.id}">${h.text}</a>`)
        .join("")}</div>`,
    );
  }
  // Old README anchors (<a name="...">) keep working on this page.
  // Skip the ones a heading already carries.
  content = content.replace(/<a name="([^"]+)"><\/a>\n?/g, (all, name) =>
    ids.has(name) ? "" : `<span id="${name}"></span>`,
  );
  // Column titles go onto every cell, so narrow screens can show a table row as a labeled block.
  content = content.replace(/<table>[\s\S]*?<\/table>/g, (table) => {
    const labels = [...table.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim().replace(/"/g, "&quot;"));
    return table.replace(/<tr>([\s\S]*?)<\/tr>/g, (row, cells) => {
      let i = 0;
      return `<tr>${cells.replace(/<td(?=[\s>])/g, () => `<td data-label="${labels[i++] ?? ""}"`)}</tr>`;
    });
  });
  const allIds = [...content.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
  const twice = allIds.filter((id, i) => allIds.indexOf(id) !== i);
  if (twice.length) throw new Error(`Duplicate ids in the documentation: ${twice.join(", ")}`);

  // Every link inside the page must find its target.
  const pageIds = new Set([...content.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
  const broken = [...new Set([...content.matchAll(/href="#([^"]*)"/g)].map((m) => m[1]))].filter(
    (id) => !pageIds.has(id),
  );
  if (broken.length) throw new Error(`Broken links in the documentation: #${broken.join(", #")}`);

  // Icons: the ones the documentation and the card use, plus the weather states.
  const names = new Set([...md.matchAll(/mdi:([a-z0-9-]+)/g)].map((m) => m[1]));
  for (const file of await readdir(srcDir))
    for (const m of (await readFile(`${srcDir}/${file}`, "utf8")).matchAll(/mdi:([a-z0-9-]+)/g)) names.add(m[1]);
  for (const n of [
    "weather-sunny", "weather-night", "weather-partly-cloudy", "weather-cloudy", "weather-rainy",
    "weather-pouring", "weather-lightning-rainy", "weather-lightning", "weather-snowy", "weather-snowy-rainy",
    "weather-hail", "weather-fog", "weather-windy", "weather-windy-variant", "thermometer", "water-percent",
    "help-circle-outline",
  ])
    names.add(n);
  const icons = {};
  for (const n of [...names].sort()) {
    const key = "mdi" + n.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
    if (mdi[key]) icons[n] = mdi[key];
  }

  // Function replacers: the content contains "$" signs.
  const values = {
    VERSION: version,
    README,
    NAV: nav.join(""),
    CONTENT: content,
    ICONS: JSON.stringify(icons),
    ENTITIES: JSON.stringify([...entities].sort()),
  };
  // LF everywhere, so Windows and the CI build the same page.
  const page = template.replace(/\r\n/g, "\n").replace(/\{\{(\w+)\}\}/g, (all, key) => {
    if (!(key in values)) throw new Error(`Unknown placeholder ${all}`);
    return values[key];
  });
  return { page, examples, ids: pageIds };
}

// npm run build calls this; it can also run on its own.
export async function writeDocs(version) {
  const [source, template] = await Promise.all([
    readFile("docs-src/documentation.md", "utf8"),
    readFile("docs-src/template.html", "utf8"),
  ]);
  const { page, examples } = await buildDocs({ version, source, template, srcDir: "src" });
  await writeFile("docs/index.html", page);
  return examples;
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/").replace(/^(?=\w:)/, "/")}`) {
  const { version } = JSON.parse(await readFile("package.json", "utf8"));
  console.log(`docs/index.html: ${await writeDocs(version)} live examples`);
}
