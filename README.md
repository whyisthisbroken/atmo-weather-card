<div align="center">
<img width="700" height="394" alt="atmo-min1" src="https://github.com/user-attachments/assets/6a7884e9-9fff-4ded-a9e1-ebf9217998d6" />

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Lovelace%20Card-41BDF5.svg)](https://www.home-assistant.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/whyisthisbroken/atmo-weather-card/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/whyisthisbroken/atmo-weather-card)](https://github.com/whyisthisbroken/atmo-weather-card/commits/main)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20in%20Browser-2ea44f.svg)](https://whyisthisbroken.github.io/atmo-weather-card/)

<h2>Animated weather card for Home Assistant Lovelace dashboards</h2>
<img width="560" alt="Atmo Weather Card cycling through sunny, cloudy, rain, thunderstorm, snow, fog, wind and night scenes" src="https://github.com/user-attachments/assets/83dbed24-03a5-411c-a9ae-c470280d7208" />

*Sun, clouds, rain, thunderstorms, snow, fog, wind and starry nights — all drawn live from your weather entity.
A GIF can only hint at it: in the dashboard every scene runs smoothly and keeps changing.*

### 👉 [**See it live in your browser — no video, real-time animation**](https://whyisthisbroken.github.io/atmo-weather-card/)
The documentation runs every example live, and the [demo](https://whyisthisbroken.github.io/atmo-weather-card/demo.html) lets you switch the weather, the time of day and every effect.

</div>

### Features

- **Live weather scenes** for every Home Assistant condition, by day and by night — layered clouds, rain, hail, snow, fog, thunderstorms with lightning, and overcast skies
- **Wind you can see** — direction and strength from your weather entity, drawn as wind lines or a flow field; clouds, rain and snow drift the same way, and an optional compass on the card or a chip with a turning arrow shows where it comes from
- **Sun and moon** that follow the real sun position, with sunrise and sunset colors, live moon phases and a moon tilted for your latitude
- **Night sky** with stars, shooting stars and comets, and **birds and planes** passing by; near planes fly faster than distant ones
- **Real weather data** shapes the sky: the measured cloud cover sets the clouds, low visibility or humid air adds haze, ground mist forms near the dew point, and an optional precipitation sensor sets how hard it rains
- **Sky light** with a blue hour after sunset and before sunrise, stars that come out one by one, and soft sun rays through broken clouds
- **Every effect can be switched off** on its own, and shooting stars, comets, birds and planes have their own frequency
- **Chips** for any entity or attribute, weather forecasts, ring and bar gauges, free positioning and many styles
- **Visual editor** for everything, with built-in help, in English or German following your Home Assistant language, plus full YAML control
- **Performance presets** from Low (older tablets) to Ultra (smooth 60 fps, sharp on large wall displays)

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
| <a name="appearance"></a><a name="color-mode"></a><a name="css-variables"></a>[Appearance](https://whyisthisbroken.github.io/atmo-weather-card/docs/appearance.html) | Card style, light and dark look, sun and moon, images, embedded cards and CSS variables |
| <a name="chips"></a><a name="chip-editor-structure"></a>[Chips & forecasts](https://whyisthisbroken.github.io/atmo-weather-card/docs/chips.html) | Values, forecasts, wind direction, ring and bar gauges, in the chip row or anywhere on the card |
| <a name="weather-data"></a><a name="weather-data--sky-light"></a>[Weather data & sky light](https://whyisthisbroken.github.io/atmo-weather-card/docs/weather-data.html) | How cloud cover, visibility, humidity and rain shape the sky, and the effect switches |
| <a name="performance"></a>[Effects & performance](https://whyisthisbroken.github.io/atmo-weather-card/docs/effects.html) | Presets, frame rate, wind and compass, night sky, birds and planes |
| <a name="guides"></a><a name="layout-layering"></a><a name="weather-icons"></a><a name="custom-house-image"></a>[Guides](https://whyisthisbroken.github.io/atmo-weather-card/docs/guides.html) | Layout and layering, weather icons, your own house image |
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

Add this card to a dashboard after installation, then replace the example entity IDs with your own:

```yaml
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
moon_phase_entity: sensor.moon_phase
chips:
  - entity: weather.home
    attribute: temperature
    icon: weather
  - entity: weather.home
    attribute: humidity
    icon: mdi:water-percent
```

Use the visual editor to add or rearrange chips. Browse the [examples](https://whyisthisbroken.github.io/atmo-weather-card/docs/examples.html) for complete layouts, or the [documentation](https://whyisthisbroken.github.io/atmo-weather-card/docs/) for every option.

## Maintenance

Atmo Weather Card is an independent, actively maintained Lovelace card project. See [Maintenance & Archive Info](MAINTENANCE.md) for maintenance status and historical background.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
