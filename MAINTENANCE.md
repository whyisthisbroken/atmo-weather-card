## Project Status

**Maintenance:** Actively maintained, with fixes and new features added on a best-effort basis.

**Availability:** Available as a custom repository in the [Home Assistant Marketplace](README.md#installation) for easy installation and updates. See the [Installation Guide](README.md#installation) for setup instructions.

## Project History

**Atmo Weather Card** began as a preserved copy of the original `atmospheric-weather-card`, created by `shpongledsummer`.

After the original author stepped away and deleted both their GitHub account and the original repository, this project kept the original work available to the community.

Since then, it has evolved into **Atmo Weather Card**: an independently maintained project built on the original foundation.

The original creator is now active again as [hazymorning](https://github.com/hazymorning) and continues their work with [Origami Weather](https://github.com/hazymorning/origami_weather).

## Development

Source code lives in `src/`. `dist/` is generated and committed, because the Marketplace and manual installs use it. The build also copies it to `docs/`, the GitHub Pages live demo. Only `docs/index.html` is written by hand. Do not edit `dist/` by hand.

```bash
npm ci          # install dependencies
npm test        # run the tests
npm run build   # regenerate dist/ and docs/
```

The version lives in `package.json`, and the build writes it into `dist/`. Run `npm run build` before committing any change to `src/` or the version. The Tests workflow fails if `dist/` or `docs/` is out of date.

Keep `hacs.json` in the repository root, because the Marketplace requires it for custom repositories. Do not attach files to GitHub releases: as soon as a release has an asset, the Marketplace downloads only the assets and skips `dist/`.
