import { build } from "esbuild";
import { copyFile, cp, mkdir, readFile, rm } from "node:fs/promises";
import { writeDocs } from "./scripts/build-docs.mjs";

const FONT_DIR = "node_modules/@fontsource-variable/figtree";
const FONT_FILES = [
  "figtree-latin-wght-normal.woff2",
  "figtree-latin-ext-wght-normal.woff2",
];

const { version } = JSON.parse(await readFile("package.json", "utf8"));

await rm("dist", { recursive: true, force: true });
await mkdir("dist");

// The editor stays a separate entry point so it only loads when a dashboard
// is edited. The card imports it by URL with the version as cache buster.
await build({
  entryPoints: ["src/atmo-weather-card.js", "src/atmo-weather-card-editor.js"],
  outdir: "dist",
  bundle: true,
  format: "esm",
  minify: true,
  legalComments: "eof",
  define: { __AWC_VERSION__: JSON.stringify(version) },
  banner: { js: `/* Atmo Weather Card ${version} */` },
});

await Promise.all(
  FONT_FILES.map((file) =>
    copyFile(`${FONT_DIR}/files/${file}`, `dist/${file}`),
  ),
);
await copyFile(`${FONT_DIR}/LICENSE`, "dist/figtree-LICENSE.txt");

// docs/ is the GitHub Pages site. index.html (the landing page) and docs/*.html
// (the documentation) are built from docs-src/; demo.html (the live demo) is
// written by hand. site.css and site.js are shared by all of them.
await cp("dist", "docs", { recursive: true });
await Promise.all(["site.css", "site.js"].map((f) => copyFile(`docs-src/${f}`, `docs/${f}`)));
await writeDocs(version);
