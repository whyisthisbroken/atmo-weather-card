// Builds the GitHub Pages site from docs-src/:
// - docs/index.html, the landing page (docs-src/landing.html)
// - docs/docs/<page>.html, one documentation page per level 2 heading of
//   docs-src/documentation.md, plus docs/docs/index.html as an overview.
// Every YAML example that configures the card gets a "Show live" button that
// loads it into the real card on the page. The build fails on a broken link
// or an example that is no valid YAML. Links between pages are rewritten, and
// the landing page sends old links (index.html#wind) to the right page.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { marked } from "marked";
import YAML from "yaml";
import * as mdi from "@mdi/js";

const README = "https://github.com/whyisthisbroken/atmo-weather-card";

// One page per level 2 heading, in this order, grouped in the navigation.
export const PAGES = [
  { file: "setup", heading: "Setup", label: "Getting started", group: "Start", blurb: "Entities, the first card and where the options live." },
  { file: "examples", heading: "Examples", label: "Examples", group: "Start", blurb: "Complete cards to copy, each one runs live." },
  { file: "appearance", heading: "Appearance", label: "Appearance", group: "Customize", blurb: "Card style, colors, sun and moon, images and embedded cards." },
  { file: "chips", heading: "Chips", label: "Chips & forecasts", group: "Customize", blurb: "Values, forecasts, rings and bars, in a row or anywhere." },
  { file: "weather-data", heading: "Weather Data & Sky Light", label: "Weather data & sky light", group: "Sky & effects", blurb: "How cloud cover, rain, haze and mist shape the sky." },
  { file: "effects", heading: "Performance", label: "Effects & performance", group: "Sky & effects", blurb: "Presets, wind and compass, night sky, birds and planes." },
  { file: "guides", heading: "Guides", label: "Guides", group: "Help", blurb: "Layering, weather icons and your own house picture." },
  { file: "troubleshooting", heading: "Troubleshooting", label: "Troubleshooting", group: "Help", blurb: "When something looks wrong after an install or update." },
];

// Demo entities: the placeholder names of the examples run on demo data.
const ENTITY_MAP = {
  "weather.your_weather_entity": "weather.demo",
  "weather.home": "weather.demo",
};

// Demo images: the placeholder image paths of the examples show the sample house.
const IMAGE_MAP = {
  "/local/images/my-house-day.png": "../images/house-day.webp",
  "/local/images/my-house-night.png": "../images/house-night.webp",
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
    if (typeof v === "string" && IMAGE_MAP[v]) return IMAGE_MAP[v];
    if (typeof v === "string" && /^(weather|sensor|binary_sensor)\.[a-z0-9_]+$/.test(v)) {
      const id = ENTITY_MAP[v] || v;
      entities.add(id);
      return id;
    }
    return v;
  };
  const cfg = walk(obj);
  delete cfg.type;
  // Other cards cannot run here; the page draws a small stand-in from their config.
  if (Array.isArray(cfg.custom_cards))
    cfg.custom_cards = cfg.custom_cards.map((c) => ({ ...c, type: "placeholder", label: c.type }));
  // card_mod: the page applies the CSS variables of the :host block to the live card.
  const mod = obj.card_mod && typeof obj.card_mod.style === "string" && /:host\s*\{([^}]*)\}/.exec(obj.card_mod.style);
  if (mod) cfg._host_style = mod[1].trim();
  return cfg;
}

// The MDI icons a page may need: the ones the docs and the card use, plus the weather states.
async function iconSet(text, srcDir, extra = []) {
  const names = new Set([...text.matchAll(/mdi:([a-z0-9-]+)/g)].map((m) => m[1]));
  for (const file of await readdir(srcDir))
    for (const m of (await readFile(`${srcDir}/${file}`, "utf8")).matchAll(/mdi:([a-z0-9-]+)/g)) names.add(m[1]);
  for (const n of [
    "weather-sunny", "weather-night", "weather-partly-cloudy", "weather-cloudy", "weather-rainy",
    "weather-pouring", "weather-lightning-rainy", "weather-lightning", "weather-snowy", "weather-snowy-rainy",
    "weather-hail", "weather-fog", "weather-windy", "weather-windy-variant", "thermometer", "water-percent",
    "help-circle-outline", ...extra,
  ])
    names.add(n);
  const icons = {};
  for (const n of [...names].sort()) {
    const key = "mdi" + n.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
    if (mdi[key]) icons[n] = mdi[key];
  }
  return icons;
}

// Fills {{KEY}} placeholders; LF everywhere, so Windows and the CI build the same page.
function fill(template, values) {
  return template.replace(/\r\n/g, "\n").replace(/\{\{(\w+)\}\}/g, (all, key) => {
    if (!(key in values)) throw new Error(`Unknown placeholder ${all}`);
    return values[key];
  });
}

// Renders the documentation into one HTML fragment per page.
export async function renderDocs({ source }) {
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
    if (level === 3 && toc) toc.push({ level, id, text: text.replace(/<[^>]+>/g, "") });
    return `<h${level} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${text}</h${level}>\n`;
  };
  // A fence can name the scene its example needs, like "yaml scene=night" (GitHub only reads the first word).
  renderer.code = (code, info) => {
    const [lang, ...opts] = String(info || "").split(/\s+/);
    const scene = (opts.find((o) => o.startsWith("scene=")) || "").slice(6);
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
        live = `<button type="button" class="try"${scene ? ` data-scene="${escapeAttr(scene)}"` : ""} data-example="${escapeAttr(JSON.stringify(cfg))}">Show live</button>`;
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
  for (const title of sections.keys())
    if (!PAGES.some((p) => p.heading === title)) throw new Error(`Section "${title}" is in no navigation group`);

  const pages = [];
  for (const page of PAGES) {
    if (!sections.has(page.heading)) throw new Error(`Missing section "${page.heading}"`);
    toc = [];
    let html = marked.parse(alerts(sections.get(page.heading).join("\n")), { gfm: true, renderer });
    // Column titles go onto every cell, so narrow screens can show a table row as a labeled block.
    html = html.replace(/<table>[\s\S]*?<\/table>/g, (table) => {
      const labels = [...table.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim().replace(/"/g, "&quot;"));
      const rows = table.replace(/<tr>([\s\S]*?)<\/tr>/g, (row, cells) => {
        let i = 0;
        return `<tr>${cells.replace(/<td(?=[\s>])/g, () => `<td data-label="${labels[i++] ?? ""}"`)}</tr>`;
      });
      return `<div class="table">${rows}</div>`;
    });
    pages.push({ ...page, html, toc });
  }
  // Old README anchors (<a name="...">) keep working. Skip the ones a heading already carries.
  // The pages sit in docs/docs/, the images in docs/images/.
  for (const p of pages)
    p.html = p.html
      .replace(/<a name="([^"]+)"><\/a>\n?/g, (all, name) => (ids.has(name) ? "" : `<span id="${name}"></span>`))
      .replace(/(<img[^>]+src=")images\//g, "$1../images/");

  // Which page holds which id; ids stay unique over the whole site.
  const where = new Map();
  for (const p of pages)
    for (const m of p.html.matchAll(/ id="([^"]+)"/g)) {
      if (where.has(m[1])) throw new Error(`Duplicate ids in the documentation: ${m[1]}`);
      where.set(m[1], p.file);
    }
  // Links into another page get its file name; every link must find its target.
  const broken = new Set();
  for (const p of pages)
    p.html = p.html.replace(/href="#([^"]*)"/g, (all, id) => {
      if (!where.has(id)) {
        broken.add(id);
        return all;
      }
      return where.get(id) === p.file ? all : `href="${where.get(id)}.html#${id}"`;
    });
  if (broken.size) throw new Error(`Broken links in the documentation: #${[...broken].join(", #")}`);

  return { pages, where, examples, entities, md };
}

// Search entries: every option row, every level 3 heading and every question of the troubleshooting page.
function searchIndex(pages) {
  const out = [];
  const seen = new Set();
  for (const p of pages) {
    let section = p.label;
    const parts = p.html.split(/(<h[34] id="[^"]+">[\s\S]*?<\/h[34]>|<td[^>]* id="opt-[^"]+")/);
    for (const part of parts) {
      const h = /^<h([34]) id="([^"]+)">(?:<a[^>]*>#<\/a>)?([\s\S]*?)<\/h[34]>/.exec(part);
      if (h && h[1] === "3") {
        section = h[3].replace(/<[^>]+>/g, "");
        out.push({ n: section, k: "section", u: `${p.file}.html#${h[2]}`, w: p.label });
        continue;
      }
      if (h) {
        if (p.file === "troubleshooting")
          out.push({ n: h[3].replace(/<[^>]+>/g, ""), k: "question", u: `${p.file}.html#${h[2]}`, w: p.label });
        continue;
      }
      const o = /^<td[^>]* id="opt-([^"]+)"/.exec(part);
      if (o && !seen.has(o[1])) {
        seen.add(o[1]);
        out.push({ n: o[1], k: "option", u: `${p.file}.html#opt-${o[1]}`, w: section });
      }
    }
  }
  return out;
}

// Sidebar: all pages by group, the current one opened to its sections.
function sideNav(pages, currentFile) {
  const groups = [...new Set(pages.map((p) => p.group))];
  // Phones get a short row of page links instead of the full list.
  const short = `<div class="pages-s">${pages.map((p) => `<a href="${p.file}.html"${p.file === currentFile ? ' class="here"' : ""}>${p.label}</a>`).join("")}</div>`;
  return short + groups
    .map((g) => {
      const items = pages
        .filter((p) => p.group === g)
        .map((p) => {
          const here = p.file === currentFile;
          const sub = here && p.toc.length
            ? `<div class="nav-sub">${p.toc.map((h) => `<a href="#${h.id}">${h.text}</a>`).join("")}</div>`
            : "";
          return `<a class="nav-page${here ? " here" : ""}" href="${p.file}.html"${here ? ' aria-current="page"' : ""}>${p.label}</a>${sub}`;
        })
        .join("");
      return `<div class="nav-group"><div class="nav-title">${g}</div>${items}</div>`;
    })
    .join("");
}

export async function buildDocs({ version, source, template, overview, srcDir }) {
  const { pages, where, examples, entities, md } = await renderDocs({ source });
  // The small dashboard behind immersive examples uses these too.
  const icons = await iconSet(md, srcDir, ["sofa", "lightbulb-group", "door"]);
  const common = {
    VERSION: version,
    README,
    ICONS: JSON.stringify(icons),
    ENTITIES: JSON.stringify([...entities].sort()),
    // Inside a <script> tag, so no "<" may end it early.
    SEARCH: JSON.stringify(searchIndex(pages)).replace(/</g, "\\u003c"),
  };
  const out = new Map();
  pages.forEach((p, i) => {
    const prev = pages[i - 1], next = pages[i + 1];
    const pager = `<nav class="pager">${prev ? `<a class="prev" href="${prev.file}.html"><span>Previous</span>${prev.label}</a>` : "<span></span>"}${next ? `<a class="next" href="${next.file}.html"><span>Next</span>${next.label}</a>` : "<span></span>"}</nav>`;
    out.set(`${p.file}.html`, fill(template, {
      ...common,
      TITLE: p.label,
      BLURB: p.blurb,
      NAV: sideNav(pages, p.file),
      CONTENT: `<section class="doc-section">${p.html}</section>${pager}`,
    }));
  });
  if (overview) {
    const cards = pages
      .map((p) => `<a class="doc-card" href="${p.file}.html"><span class="doc-group">${p.group}</span><b>${p.label}</b><span>${p.blurb}</span></a>`)
      .join("");
    out.set("index.html", fill(overview, { ...common, NAV: sideNav(pages, ""), CARDS: cards }));
  }
  return { pages: out, where, examples };
}

// The landing page; old links into the single docs page get forwarded.
export async function buildLanding({ version, template, where, srcDir }) {
  const own = new Set([...template.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
  const redirects = Object.fromEntries([...where].filter(([id]) => !own.has(id)));
  const icons = await iconSet(template, srcDir, ["weather-partly-rainy", "weather-sunset", "chart-donut", "tune-variant", "weather-snowy-heavy", "home-thermometer-outline", "home-variant-outline", "tablet-dashboard"]);
  return fill(template, {
    VERSION: version,
    README,
    ICONS: JSON.stringify(icons),
    REDIRECTS: JSON.stringify(redirects),
  });
}

// npm run build calls this; it can also run on its own.
export async function writeDocs(version) {
  const [source, template, overview, landing] = await Promise.all([
    readFile("docs-src/documentation.md", "utf8"),
    readFile("docs-src/template.html", "utf8"),
    readFile("docs-src/overview.html", "utf8"),
    readFile("docs-src/landing.html", "utf8"),
  ]);
  const { pages, where, examples } = await buildDocs({ version, source, template, overview, srcDir: "src" });
  await mkdir("docs/docs", { recursive: true });
  for (const [file, html] of pages) await writeFile(`docs/docs/${file}`, html);
  await writeFile("docs/index.html", await buildLanding({ version, template: landing, where, srcDir: "src" }));
  return examples;
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/").replace(/^(?=\w:)/, "/")}`) {
  const { version } = JSON.parse(await readFile("package.json", "utf8"));
  console.log(`docs: ${await writeDocs(version)} live examples`);
}
