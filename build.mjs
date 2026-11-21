import { build } from "esbuild";
import { copyFile, cp, mkdir, readFile, rm } from "node:fs/promises";
import { writeDocs } from "./scripts/build-docs.mjs";

const FONT_DIR = "node_modules/@fontsource-variable/figtree";
const FONT_FILES = [
  "figtree-latin-wght-normal.woff2",
  "figtree-latin-ext-wght-normal.woff2",
];

const { version } = JSON.parse(await readFile("package.json", "utf8"));
// The MIT license asks for its copyright notice in every copy, and the
// Marketplace installs only the files in dist, so each bundle carries it.
const copyright = (await readFile("LICENSE", "utf8"))
  .split(/\r?\n/)
  .filter((line) => line.startsWith("Copyright"));
const banner = [
  `/* Atmo Weather Card ${version}`,
  ` * MIT License, https://github.com/whyisthisbroken/atmo-weather-card`,
  ...copyright.map((line) => ` * ${line}`),
  ` */`,
].join("\n");

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
  banner: { js: banner },
});

await Promise.all(
  FONT_FILES.map((file) =>
    copyFile(`${FONT_DIR}/files/${file}`, `dist/${file}`),
  ),
);
await copyFile(`${FONT_DIR}/LICENSE`, "dist/figtree-LICENSE.txt");
// The house of the Home layout (src/atmo-weather-config.js, HOUSE_FILES).
await cp("assets/house", "dist", { recursive: true });

// docs/ is the GitHub Pages site. index.html (the landing page) and docs/*.html
// (the documentation) are built from docs-src/; demo.html (the live demo) is
// written by hand. site.css and site.js are shared by all of them.
await cp("dist", "docs", { recursive: true });
// Fraunces sets the headlines of the landing page. The card does not use it,
// so it goes to docs/ only.
const FRAUNCES = "node_modules/@fontsource-variable/fraunces";
await mkdir("docs/fonts", { recursive: true });
await Promise.all([
  ...["fraunces-latin-full-normal.woff2", "fraunces-latin-full-italic.woff2"].map((file) =>
    copyFile(`${FRAUNCES}/files/${file}`, `docs/fonts/${file}`),
  ),
  copyFile(`${FRAUNCES}/LICENSE`, "docs/fonts/fraunces-LICENSE.txt"),
]);
await Promise.all(["site.css", "site.js"].map((f) => copyFile(`docs-src/${f}`, `docs/${f}`)));
await writeDocs(version);
