import { build } from "esbuild";
import { copyFile, cp, mkdir, readFile, rm } from "node:fs/promises";

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

// docs/ is the GitHub Pages live demo. index.html is written by hand.
await cp("dist", "docs", { recursive: true });
