<div align="center">
<img width="700" height="394" alt="Atmo Weather Card" src="https://github.com/user-attachments/assets/6a7884e9-9fff-4ded-a9e1-ebf9217998d6" />

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Lovelace%20Card-41BDF5.svg)](https://www.home-assistant.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/whyisthisbroken/atmo-weather-card/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/whyisthisbroken/atmo-weather-card)](https://github.com/whyisthisbroken/atmo-weather-card/commits/main)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20in%20Browser-2ea44f.svg)](https://whyisthisbroken.github.io/atmo-weather-card/)

<h2>The sky over your dashboard, built from your weather.</h2>

<img width="640" height="200" alt="atmo-weather-preview" src="https://github.com/user-attachments/assets/d6965c83-7d50-4cd5-a5c6-a4772be923fd" />


An animated weather card for Home Assistant. It reads your weather entity and your sensors and builds a live sky from them, by day and by night.

**[Try it live in your browser](https://whyisthisbroken.github.io/atmo-weather-card/)** · [Full demo](https://whyisthisbroken.github.io/atmo-weather-card/demo.html) · [Documentation](https://whyisthisbroken.github.io/atmo-weather-card/docs/)

</div>

## Built from your weather.

The card does not play a fixed animation per weather state. Cloud cover sets the number of clouds, a rain sensor sets how hard it rains, low visibility adds haze and the dew point brings ground mist. Every reading can come from your own weather station.

<p align="center"><img src="https://whyisthisbroken.github.io/atmo-weather-card/images/example-rain.webp" alt="Rain driven by a rain sensor" width="480" /></p>

## Rain that lands, snow that settles.

Rain falls at a steady pace and splashes on the bottom edge of the card. Snow swings softly on its way down and builds a thin edge of snow. In a thunderstorm the sky turns dark, by day too. On request, rain and snow fall out of the card onto the dashboard below.

## Wind you can see.

Clouds, rain and snow drift with the real wind direction and speed. Show the wind as long lines, as a flow field or as leaves blowing across the card, green in spring and summer and in autumn colours in autumn and winter. A compass on the card shows where it comes from.

<p align="center"><img src="https://whyisthisbroken.github.io/atmo-weather-card/images/wind-compass-styles.webp" alt="Wind compass styles" width="480" /></p>

## The sun, the moon and the stars.

The sun follows its real path, with a golden hour before sunset and a blue hour after it. The moon shows its live phase, tilted for your latitude. At night the stars come out one by one, with shooting stars and the odd comet. Birds and planes cross the sky by day.

<p align="center"><img src="https://whyisthisbroken.github.io/atmo-weather-card/images/example-stars.webp" alt="A clear night with stars and the moon" width="480" /></p>

## Ready in one option, yours in every detail.

New cards start with a finished layout: `standard`, a slim `compact` strip, `wide` for wall tablets, `home` with a house of its own (or yours) or the tall `panel` with tiles and the next hours. From there, chips show any entity, attribute or forecast as text, ring or bar, in two chip areas or anywhere on the card, only when they matter, with a temperature curve over the forecast. Put your own house in the sky, by day and with lit windows at night, or let a folder of pictures follow the weather. Your own CSS goes straight into the card.

<p align="center"><img src="https://whyisthisbroken.github.io/atmo-weather-card/images/example-layouts.webp" alt="card_layout standard, compact and wide" width="480" /></p>

## Light on old tablets, smooth on new ones.

Three presets run from Low for older tablets to Ultra for smooth 60 fps on large wall displays, and every effect can be switched off on its own. The card pauses when it is off screen and sends nothing to other servers. Everything is set in the visual editor, in English or German, with full YAML control.

<details>
<summary><b>Gallery: every weather condition</b></summary>

**Day**

<p align="center"><img src="https://github.com/user-attachments/assets/ba18e486-d087-4451-9fd8-9dae9c0b3cd8" alt="All weather conditions by day" width="760" /></p>

**Night**

<p align="center"><img src="https://github.com/user-attachments/assets/6621b22b-8b00-43ea-9cf2-d14d714dfabd" alt="Weather conditions at night" width="760" /></p>

</details>

---

## Documentation

Every option, with examples you can run live in your browser, is on the **[documentation site](https://whyisthisbroken.github.io/atmo-weather-card/)**.

| Topic | What you find there |
| :---- | :------------------ |
| <a name="setup"></a>[Getting started](https://whyisthisbroken.github.io/atmo-weather-card/docs/setup.html) | The entities the card uses (weather, sun, moon phase, precipitation sensor) and where the options live in the editor |
| <a name="examples"></a>[Examples](https://whyisthisbroken.github.io/atmo-weather-card/docs/examples.html) | Complete layouts to copy, each one running live on the page |
| <a name="appearance"></a><a name="color-mode"></a><a name="css-variables"></a>[Appearance](https://whyisthisbroken.github.io/atmo-weather-card/docs/appearance.html) | Layouts, card style, light and dark look, sun and moon, embedded cards and CSS variables |
| <a name="images"></a><a name="custom-images"></a><a name="custom-house-image"></a>[Images & house](https://whyisthisbroken.github.io/atmo-weather-card/docs/images.html) | The house of the Home layout, your own house picture by day and at night, pictures by weather or by any entity, the blend between them, and a guide to draw your house with AI |
| <a name="chips"></a><a name="chip-editor-structure"></a>[Chips & forecasts](https://whyisthisbroken.github.io/atmo-weather-card/docs/chips.html) | Values, forecasts, wind direction, ring and bar gauges, in two chip areas or anywhere on the card, visibility conditions and the temperature curve |
| <a name="weather-data"></a><a name="weather-data--sky-light"></a>[Weather data & sky light](https://whyisthisbroken.github.io/atmo-weather-card/docs/weather-data.html) | How cloud cover, visibility, humidity and rain shape the sky, and the effect switches |
| <a name="performance"></a>[Effects & performance](https://whyisthisbroken.github.io/atmo-weather-card/docs/effects.html) | Presets, frame rate, wind and compass, night sky, birds and planes |
| <a name="guides"></a><a name="layout-layering"></a><a name="weather-icons"></a>[Guides](https://whyisthisbroken.github.io/atmo-weather-card/docs/guides.html) | Layout and layering, weather icons |
| <a name="troubleshooting"></a><a name="editor-preview-stutters-or-fps-looks-wrong-after-installupdate"></a><a name="card-shows-red-error-card-or-module-not-found"></a><a name="changes-are-not-visible-after-update"></a><a name="editor-values-differ-from-runtime-defaults"></a><a name="card-always-stays-in-front-of-other-cards"></a><a name="card-appears-behind-other-cards-or-becomes-hard-to-see"></a><a name="attribute-shows-na-after-changing-a-chips-sensor"></a><a name="forecast-chip-shows-please-check-your-weather-provider"></a><a name="weather-entity-is-unavailable-or-values-look-wrong"></a><a name="no-birds-or-planes-are-visible"></a><a name="no-night-effects-starscomets-are-visible"></a><a name="chip-value-shows-no-decimal-places-or-the-unit-disappeared"></a><a name="performance-is-weak-on-older-devices"></a>[Troubleshooting](https://whyisthisbroken.github.io/atmo-weather-card/docs/troubleshooting.html) | Installation problems, layout, missing data or effects, weak devices |

> [!NOTE]
> Parts of the development use AI-assisted coding to move faster than doing everything by hand would allow.

## Installation

Requires Home Assistant 2026.11 or newer.

### Method 1: Marketplace (Recommended)

[![Open your Home Assistant instance and open this repository in the Marketplace.](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=whyisthisbroken&repository=atmo-weather-card&category=plugin)

Easiest way to install and manage updates. The card is added as a custom repository. Existing HACS installs moved to the Marketplace automatically with Home Assistant 2026.11.

<details>
<summary>Installation Steps</summary>

1. Go to **Settings** → **Marketplace** and select **Add from link** (top right).
2. Connect GitHub if you are asked to. Custom repositories require this connection.
3. Under **GitHub link**, enter `whyisthisbroken/atmo-weather-card` and select **Add**.
4. If you are asked for a **Type**, select **Dashboard** and select **Add** again.
5. Open Atmo Weather Card and select **Install**.
6. Reload your dashboard (clear browser cache if the card doesn't appear).

The Marketplace checks custom repositories for new versions every 48 hours.

</details>

### Method 2: Manual Import

[![Open your Home Assistant instance and navigate to your lovelace resources.](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)

For manual installation without the Marketplace. [Download the latest files from the releases page.](https://github.com/whyisthisbroken/atmo-weather-card/releases)

<details>
<summary>Installation Steps</summary>

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

3. **Add resource** in Home Assistant:
   - Navigate to **Settings** → **Dashboards** → **⋮** → **Resources**
   - Add a new resource:
     - **URL:** `/local/atmo-weather-card/atmo-weather-card.js`
     - **Type:** JavaScript Module

4. **Reload dashboard** with a hard-refresh:
   - **Chrome/Edge:** `Ctrl+Shift+R`
   - **Firefox:** `Ctrl+Shift+R`
   - **Safari:** `Cmd+Shift+R`

> Note: If you run into preview/FPS/load issues after install or update, see [Troubleshooting](https://whyisthisbroken.github.io/atmo-weather-card/docs/troubleshooting.html) in the documentation.

</details>

## Quick Start

Add a card from the card picker and pick your weather entity, or paste this and replace the entity IDs with your own:

```yaml
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
moon_phase_entity: sensor.moon_phase
card_layout: standard
```

`card_layout` can also be `compact` or `wide`. Add chips in the visual editor to make the card your own, browse the [examples](https://whyisthisbroken.github.io/atmo-weather-card/docs/examples.html) for complete cards, or the [documentation](https://whyisthisbroken.github.io/atmo-weather-card/docs/) for every option.

## Maintenance

Atmo Weather Card is an independent, actively maintained Lovelace card project. See [Maintenance & Archive Info](MAINTENANCE.md) for maintenance status and historical background.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

Atmo Weather Card is based on the original `atmospheric-weather-card` by `shpongledsummer`, see [Maintenance & Archive Info](MAINTENANCE.md).
