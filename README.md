<div align="center">

<img width="700" alt="Atmo Weather Card" src="https://whyisthisbroken.github.io/atmo-weather-card/images/readme-hero.webp" />

### The sky over your dashboard, built from your weather.

An animated weather card for Home Assistant. It reads your weather entity and your sensors<br>and builds a live sky from them, by day and by night.

<a href="https://whyisthisbroken.github.io/atmo-weather-card/"><img height="38" alt="Try it live in your browser" src="https://img.shields.io/badge/Try_it_live-in_your_browser-2ea44f?style=for-the-badge" /></a>&nbsp;<a href="https://whyisthisbroken.github.io/atmo-weather-card/demo.html"><img height="38" alt="Full demo" src="https://img.shields.io/badge/Full_demo-every_effect-1f6feb?style=for-the-badge" /></a>&nbsp;<a href="https://whyisthisbroken.github.io/atmo-weather-card/docs/"><img height="38" alt="Documentation" src="https://img.shields.io/badge/Documentation-every_option-6e40c9?style=for-the-badge" /></a>

<img width="640" alt="The card from a sunny day through wind, rain, a storm and snow to a clear night" src="https://whyisthisbroken.github.io/atmo-weather-card/images/readme-preview.avif" />

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2026.11+-41BDF5.svg)](https://www.home-assistant.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/whyisthisbroken/atmo-weather-card/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/whyisthisbroken/atmo-weather-card)](https://github.com/whyisthisbroken/atmo-weather-card/commits/main)

</div>

## Installation

Requires Home Assistant 2026.11 or newer.

[![Open your Home Assistant instance and open this repository in the Marketplace.](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=whyisthisbroken&repository=atmo-weather-card&category=plugin)

1. Go to **Settings** → **Marketplace** and search for **Atmo Weather Card**, or use the button above.
2. Open Atmo Weather Card and select **Install**.
3. Reload your dashboard (clear the browser cache if the card does not appear).

<details>
<summary>The search does not find the card</summary>

Add it as a custom repository instead:

1. In the Marketplace, select **Add from link** (top right).
2. Connect GitHub if you are asked to. Custom repositories require this connection.
3. Under **GitHub link**, enter `whyisthisbroken/atmo-weather-card` and select **Add**.
4. If you are asked for a **Type**, select **Dashboard** and select **Add** again.
5. Continue with step 2 above.

If the Marketplace replies that the repository is already in the Marketplace, the card is in your catalog: search for it as in step 1. Existing HACS installs moved to the Marketplace automatically with Home Assistant 2026.11.

</details>

<details>
<summary>Manual installation without the Marketplace</summary>

1. **Download the source archive** from the [latest release](https://github.com/whyisthisbroken/atmo-weather-card/releases) and open its `dist` folder.

2. **Copy everything from `dist`** to your Home Assistant config folder:

   ```
   config/www/atmo-weather-card/
   ├── atmo-weather-card.js
   ├── atmo-weather-card-editor.js
   ├── figtree-latin-wght-normal.woff2
   ├── figtree-latin-ext-wght-normal.woff2
   └── figtree-LICENSE.txt
   ```

3. **Add the resource** under **Settings** → **Dashboards** → **⋮** → **Resources** ([open in your Home Assistant](https://my.home-assistant.io/redirect/lovelace_resources/)):
   - **URL:** `/local/atmo-weather-card/atmo-weather-card.js`
   - **Type:** JavaScript Module

4. **Reload the dashboard** with a hard refresh (`Ctrl+Shift+R`, on a Mac `Cmd+Shift+R`).

If you run into preview, frame rate or loading issues after an install or update, see [Troubleshooting](https://whyisthisbroken.github.io/atmo-weather-card/docs/troubleshooting.html).

</details>

## Quick start

Add a card from the card picker and pick your weather entity, or paste this and replace the entity IDs with your own:

```yaml
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
moon_phase_entity: sensor.moon_phase
card_layout: standard
```

`card_layout` can also be `compact`, `wide`, `home` or `panel`. Everything else is set in the visual editor, or copy a finished card from the [examples](https://whyisthisbroken.github.io/atmo-weather-card/docs/examples.html).

## What it does

- **Built from your weather.** No fixed animation per state: cloud cover sets the clouds, a rain sensor sets how hard it rains, low visibility adds haze and the dew point brings ground mist.
- **Rain that lands, snow that settles.** Rain splashes on the bottom edge, snow builds a thin layer, a thunderstorm darkens the sky by day too.
- **Wind you can see.** Clouds, rain and snow drift with the real wind, shown as lines, a flow field or blowing leaves, with a compass if you like.
- **The real sun, moon and stars.** The sun follows its path with golden and blue hour, the moon shows its live phase, shooting stars and the odd comet at night.
- **Ready in one option, yours in every detail.** Five layouts, chips for any entity as text, ring or bar, your own house in the sky, your own CSS.
- **Light on old tablets, smooth on new ones.** Presets from Low to Ultra 60 fps, pauses off screen, sends nothing to other servers. Editor in English and German.

<p align="center"><img width="640" alt="The Home layout and its house through the day: wet in the rain, snowed in, lit windows at night" src="https://whyisthisbroken.github.io/atmo-weather-card/images/readme-home.avif" /></p>

<details>
<summary><b>Gallery: every weather condition, by day and by night</b></summary>

<p align="center"><img src="https://github.com/user-attachments/assets/ba18e486-d087-4451-9fd8-9dae9c0b3cd8" alt="All weather conditions by day" width="760" /></p>

<p align="center"><img src="https://github.com/user-attachments/assets/6621b22b-8b00-43ea-9cf2-d14d714dfabd" alt="Weather conditions at night" width="760" /></p>

<p align="center"><img src="https://whyisthisbroken.github.io/atmo-weather-card/images/example-layouts.webp" alt="card_layout standard, compact and wide" width="480" /></p>

</details>

## Documentation

Every option, with examples that run live in your browser, is on the **[documentation site](https://whyisthisbroken.github.io/atmo-weather-card/docs/)**.

| Page | Covers |
| :--- | :----- |
| <a name="setup"></a>[Getting started](https://whyisthisbroken.github.io/atmo-weather-card/docs/setup.html) | Entities the card uses, where options live in the editor |
| <a name="examples"></a>[Examples](https://whyisthisbroken.github.io/atmo-weather-card/docs/examples.html) | Complete cards to copy, each running live |
| <a name="appearance"></a><a name="color-mode"></a><a name="css-variables"></a>[Appearance](https://whyisthisbroken.github.io/atmo-weather-card/docs/appearance.html) | Layouts, style, light and dark, sun and moon, CSS |
| <a name="images"></a><a name="custom-images"></a><a name="custom-house-image"></a>[Images & house](https://whyisthisbroken.github.io/atmo-weather-card/docs/images.html) | The house, your own pictures, drawing your house with AI |
| <a name="chips"></a><a name="chip-editor-structure"></a>[Chips & forecasts](https://whyisthisbroken.github.io/atmo-weather-card/docs/chips.html) | Values, forecasts, gauges, conditions, temperature curve |
| <a name="weather-data"></a><a name="weather-data--sky-light"></a>[Weather data & sky light](https://whyisthisbroken.github.io/atmo-weather-card/docs/weather-data.html) | How your sensors shape the sky, effect switches |
| <a name="performance"></a>[Effects & performance](https://whyisthisbroken.github.io/atmo-weather-card/docs/effects.html) | Presets, frame rate, wind, night sky, birds and planes |
| <a name="guides"></a><a name="layout-layering"></a><a name="weather-icons"></a>[Guides](https://whyisthisbroken.github.io/atmo-weather-card/docs/guides.html) | Layout and layering, weather icons |
| <a name="troubleshooting"></a><a name="editor-preview-stutters-or-fps-looks-wrong-after-installupdate"></a><a name="card-shows-red-error-card-or-module-not-found"></a><a name="changes-are-not-visible-after-update"></a><a name="editor-values-differ-from-runtime-defaults"></a><a name="card-always-stays-in-front-of-other-cards"></a><a name="card-appears-behind-other-cards-or-becomes-hard-to-see"></a><a name="attribute-shows-na-after-changing-a-chips-sensor"></a><a name="forecast-chip-shows-please-check-your-weather-provider"></a><a name="weather-entity-is-unavailable-or-values-look-wrong"></a><a name="no-birds-or-planes-are-visible"></a><a name="no-night-effects-starscomets-are-visible"></a><a name="chip-value-shows-no-decimal-places-or-the-unit-disappeared"></a><a name="performance-is-weak-on-older-devices"></a>[Troubleshooting](https://whyisthisbroken.github.io/atmo-weather-card/docs/troubleshooting.html) | Installation problems, layout, missing data or effects |

---

<sub>MIT License, see [LICENSE](./LICENSE). Based on the original `atmospheric-weather-card` by `shpongledsummer`, see [Maintenance & Archive Info](MAINTENANCE.md). Parts of the development use AI-assisted coding.</sub>
