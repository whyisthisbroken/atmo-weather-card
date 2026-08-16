<div align="center">
<img width="700" height="394" alt="atmo-min1" src="https://github.com/user-attachments/assets/6a7884e9-9fff-4ded-a9e1-ebf9217998d6" />
   
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Lovelace%20Card-41BDF5.svg)](https://www.home-assistant.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/whyisthisbroken/atmo-weather-card/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/whyisthisbroken/atmo-weather-card)](https://github.com/whyisthisbroken/atmo-weather-card/commits/main)
<h2>Animated weather card for Home Assistant Lovelace dashboards</h2>
<img width="480" height="160" alt="atmo-weather-card-preview" src="https://github.com/user-attachments/assets/ac0efcb4-c520-4ec1-a713-2991cab33c50" />

*This is only a GIF preview (very standard configuration) — you can do so much more with it...
and it looks a lot prettier in the dashboard, try it out*
</div>

### Features

- Animated weather display
- Current conditions
- Forecast support
- Dashboard-friendly layout / editor

---

## Contents

**Getting Started** · [Installation](#installation) · [Quick Start](#quick-start) · [Setup](#setup) · [Examples](#examples)

**Customization** · [Appearance](#appearance) · [CSS Variables](#css-variables)

**Guides** · [Chips](#chips) · [Layout & Layering](#layout-layering) · [Icons](#weather-icons)

**Reference** · [Color Mode](#color-mode) · [Performance](#performance)

**Help** · [Troubleshooting](#troubleshooting)

**Maintenance** · [Maintenance & Archive Info](MAINTENANCE.md)

> [!NOTE]
> Parts of the development use AI-assisted coding to move faster than doing everything by hand would allow.

## Installation

### Method 1: HACS (Recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=whyisthisbroken&repository=atmo-weather-card&category=plugin)

Easiest way to install and manage updates. HACS handles everything for you.

<details>
<summary>Installation Steps</summary>

1. Open HACS in Home Assistant.
2. Click the three-dot menu (top right) → Custom repositories.
3. Add the repository URL: https://github.com/whyisthisbroken/atmo-weather-card
4. Select category: Dashboard
5. Click Add.
6. HACS will scan the repository and redirect you to it automatically. If not, go to HACS and search for Atmo Weather Card.
7. Click Download.
8. Reload your dashboard (clear browser cache if the card doesn't appear).

</details>

### Method 2: Manual Import

[![Open your Home Assistant instance and navigate to your lovelace resources.](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)

For manual installation without HACS. [Download the latest files from the releases page.](https://github.com/whyisthisbroken/atmo-weather-card/releases)

<details>
<summary>Installation Steps</summary>

1. **Download files** from the [latest release](https://github.com/whyisthisbroken/atmo-weather-card/releases):
   - `atmo-weather-card.js`
   - `atmo-weather-card-editor.js`
   - `atmo-weather-animations.js`
   - `atmo-weather-config.js`
   - `atmo-weather-fauna.js`

2. **Place files** in your Home Assistant config folder:

   ```
   config/www/atmo-weather-card/
   ├── atmo-weather-card.js
   ├── atmo-weather-card-editor.js
   ├── atmo-weather-animations.js
   ├── atmo-weather-config.js
   └── atmo-weather-fauna.js
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

> Note: If you run into preview/FPS/load issues after install or update, see the [Troubleshooting](#troubleshooting) section below.

</details>

## Setup

| Option               | Type     | Default | Description                                                                                                                                                                                                                             |
| :------------------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`weather_entity`** | `string` | —       | **Required.** Your weather integration entity (e.g., `weather.your_weather_entity`). See [Troubleshooting: Weather entity is unavailable or values look wrong](#weather-entity-is-unavailable-or-values-look-wrong).                    |
| **`sun_entity`**     | `string` | —       | **Required.** Tracks the sun to auto-switch between day and night. Without this, the card will default to permanent day. See [Troubleshooting: No night effects (stars/comets) are visible](#no-night-effects-starscomets-are-visible). |
| `moon_phase_entity`  | `string` | —       | _Recommended._ Displays the correct moon phase (e.g., `sensor.moon_phase`).                                                                                                                                                             |

> [!NOTE]
> The `sun_entity` controls the timing of the sun and moon. Without it, the card defaults to permanent day. Additionally, card colors change based on your [configuration](#color-mode).

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

Use the visual editor to add or rearrange chips. Browse the [examples](#examples) for complete layouts, or jump to [Appearance](#appearance) for the full configuration reference.

## Examples

The card is meant to be pretty flexible. You can customize these examples however you like, mix different elements, or combine them with other Home Assistant cards. If you want the exact look from the screenshots, use the [weather icons](#weather-icons) guide.

<details>
<summary><b>Forecast Slider</b></summary>
<img width="481" height="181" alt="image" src="https://github.com/user-attachments/assets/6dc47298-5827-4243-a232-67532d41099e" />

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
sun_entity: sun.sun
moon_phase_entity: sensor.moon_phase
card_style: standalone
card_height: 160px
card_padding: 16px
celestial_size: 50
celestial_alignment: left
celestial_x: "60"
chip_area_position: top-right
chip_text_size: 14px
chip_label_size: 11px
chip_area_layout: horizontal-scroll
chip_area_scroll_count: 3
chip_area_align: center
chip_area_width: 180px
chip_area_height: 100%
chip_padding: 0px
chip_area_padding: 16px
chip_area_gap: 2px
chip_gap: 6px
chip_icon_size: 32px
chip_style: vertical
chip_area_background: true
chip_area_grouped: true
chip_area_separator: true
chip_icon_background_color: rgba(255,255,255,0.55)
card_offset: 40px 0px 40px 0px
chip_icon_background: false
custom_cards_position: bottom-left
perf_fps: 60
perf_cloud_quality: 2
perf_effects: 2
perf_dpr: 2
chips:
  - entity: weather.your_weather_entity
    position: custom
    position_anchor: top-left
    position_y: 16px
    text_size: 32px
    hide_icon: true
    hide_label: true
    attribute: temperature
    background: false
    position_x: 16px
    padding: 0px 8px
    fancy_unit: true
    value_weight: "700"
  - attribute: uv_index
    entity: weather.your_weather_entity
    position: custom
    position_anchor: bottom-left
    position_x: 20px
    position_y: 20px
    style: vertical
    icon_size: 14px
    padding: 6px
    ring_width: 4px
    text_size: 13px
    type: ring
    align: center
    forecast: daily
    hide_icon: true
    label_size: 8px
    ring_gap: 4px
    ring_min: 0
    ring_max: 11
    ring_color: "#ffffff"
    height: 50px
    marquee_speed: 55
    forecast_precision: 1
    name: UV
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    forecast_show_min: true
    forecast_low_position: below
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 1
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    forecast_show_min: true
    forecast_low_position: below
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 2
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    forecast_show_min: true
    forecast_low_position: below
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 3
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    forecast_show_min: true
    forecast_low_position: below
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 4
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    forecast_show_min: true
    forecast_low_position: below
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 5
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    forecast_show_min: true
    forecast_low_position: below
grid_options:
  rows: auto
```

</details>

<details>
<summary><b>Forecast & Mini-graph</b></summary>
<img width="486" height="182" alt="image" src="https://github.com/user-attachments/assets/5c7df2ef-5054-4ad8-82f5-f76342662eba" />

This example embeds a mini-graph-card with a bit of card-mod styling. For extra drama, the large header text is layered behind the weather elements.

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
sun_entity: sun.sun
moon_phase_entity: sensor.moon_phase
card_style: standalone
card_height: 160px
card_padding: 16px
card_square: false
celestial_size: 50
celestial_alignment: left
celestial_x: "50"
celestial_y: 0
chip_area_position: top-right
card_hide_text: false
chip_text_size: 14px
chip_label_size: 12px
chip_area_layout: horizontal-scroll
chip_area_scroll_count: 1
chip_area_width: 160px
chip_padding: 12px 14px 12px 12px
chip_area_padding: 0px
chip_area_gap: 8px
chip_gap: 12px
chip_text_gap: 5px
chip_icon_size: 32px
chip_style: stacked
chip_area_background: true
chip_area_grouped: false
chip_icon_background_color: rgba(255,255,255,0.1)
card_offset: 40px 0px 40px 0px
card_stack_order: 1
chip_icon_background: true
custom_cards_position: bottom-left
perf_fps: 30
perf_cloud_quality: 2
perf_effects: 2
perf_dpr: 2
chips:
  - entity: weather.your_weather_entity
    position: custom
    position_anchor: top-left
    position_y: 16px
    text_size: 36px
    hide_icon: true
    hide_label: true
    attribute: temperature
    background: false
    position_x: 16px
    padding: 0px 8px
    fancy_unit: true
    behind_effects: true
    value_weight: "700"
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_show_min: true
    forecast_precision: 0
    name: Today
    icon: weather
    label_overflow: marquee
    icon_path: /local/your-icon-folder/
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_show_min: true
    forecast_precision: 0
    forecast_offset: 1
    icon: weather
    label_overflow: marquee
    name: Tomorrow
    icon_path: /local/your-icon-folder/
chip_icon_padding: 0px
grid_options:
  rows: auto
custom_cards:
  - type: custom:mini-graph-card
    custom_width: 100%
    entities:
      - entity: sensor.your_temperature_sensor
    show:
      icon: false
      name: false
      state: false
      labels: true
      fill: false
      labels_secondary: true
      points: false
      legend: false
    animate: false
    height: 70
    line_width: 4
    hours_to_show: 24
    points_per_hour: 2
    color_thresholds:
      - value: -10
        color: rgba(84, 136, 199, 0.6)
      - value: -5
        color: rgba(105, 169, 209, 0.6)
      - value: 0
        color: rgba(131, 196, 207, 0.6)
      - value: 5
        color: rgba(156, 217, 198, 0.6)
      - value: 10
        color: rgba(189, 230, 185, 0.6)
      - value: 15
        color: rgba(224, 237, 171, 0.6)
      - value: 20
        color: rgba(242, 219, 145, 0.6)
      - value: 25
        color: rgba(235, 182, 115, 0.6)
      - value: 30
        color: rgba(224, 143, 94, 0.6)
      - value: 35
        color: rgba(214, 100, 84, 0.6)
    card_mod:
      style: |
        ha-card {
          z-index: -1 !important;
          border-radius: 0px;
          box-shadow: none;
          background-color: transparent;
        }

        .graph__labels {
            opacity: 1 !important;
            align-items: flex-end !important;
            flex-direction: row-reverse !important;
            margin: 0px 14px 0px 0px !important;
            padding: 2px 4px !important;
            gap: 8px !important;
            font-size: 12px !important;
            font-weight: 700 !important;
        }

        .graph__labels span {
            background-color: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, var(--primary-background-color))) 20%, transparent) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            padding: 4px 8px !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.18), inset 0 -1px 1px rgba(0,0,0,0.10) !important;
            border-radius: calc(var(--ha-card-border-radius, 12px) - 5px) !important;
        }

        .graph__labels span:after {
            content: " °C";
            opacity: 0.6;
        }
```

</details>

<details>
<summary><b>Forecast & Ring Chip</b></summary>
<img width="478" height="133" alt="image" src="https://github.com/user-attachments/assets/427bfe78-0bf4-4f40-b966-64aad1eeba81" />

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
sun_entity: sun.sun
moon_phase_entity: sensor.moon_phase
card_style: standalone
card_height: 120px
card_padding: 16px
celestial_size: 50
celestial_alignment: center
chip_area_position: bottom-left
chip_text_size: 12px
chip_label_size: 8px
chip_area_layout: horizontal-scroll
chip_area_scroll_count: 1
chip_area_align: center
chip_area_width: 160px
chip_padding: 0px
chip_area_padding: 0px
chip_area_gap: 8px
chip_gap: 6px
chip_text_gap: 4px
chip_icon_size: 22px
chip_style: vertical
chip_area_background: true
chip_icon_background_color: rgba(255,255,255,0.55)
chip_icon_background: false
custom_cards_position: bottom-left
perf_fps: 30
perf_cloud_quality: 2
perf_effects: 2
perf_dpr: 2
chips:
  - entity: weather.your_weather_entity
    position: custom
    position_anchor: top-left
    position_y: 16px
    text_size: 30px
    hide_icon: true
    hide_label: true
    attribute: temperature
    background: false
    position_x: 16px
    padding: 0px 8px
    behind_effects: true
    fancy_unit: true
    value_weight: "700"
  - attribute: precipitation_probability
    entity: weather.your_weather_entity
    style: vertical
    icon_size: 16px
    padding: 12px
    ring_width: 6px
    type: ring
    align: center
    forecast: daily
    name: Rain
    ring_gap: 6px
    ring_min: 0
    ring_max: 100
    ring_threshold_mode: gradient
    ring_thresholds:
      - value: 0
        color: rgba(142, 164, 188, 0.9)
      - value: 10
        color: rgba(119, 149, 180, 0.9)
      - value: 20
        color: rgba(96, 134, 172, 0.9)
      - value: 30
        color: rgba(74, 118, 163, 0.9)
      - value: 40
        color: rgba(87, 133, 161, 0.9)
      - value: 50
        color: rgba(68, 126, 156, 0.9)
      - value: 60
        color: rgba(50, 119, 151, 0.9)
      - value: 70
        color: rgba(102, 107, 153, 0.9)
      - value: 80
        color: rgba(86, 88, 138, 0.9)
      - value: 90
        color: rgba(70, 69, 122, 0.9)
    marquee_speed: 55
    forecast_offset: 0
    position: custom
    position_anchor: top-right
    position_x: 16px
    position_y: 16px
    forecast_precision: 0
    height: 78px
  - forecast: daily
    attribute: temperature
    entity: weather.your_weather_entity
    style: inline
    icon: weather
    icon_path: /local/your-icon-folder/
    padding: 6px 10px
    text_size: 13px
    label_size: 13px
    text_gap: 4px
    name: Today
    value_weight: "600"
    overflow: marquee
    label_overflow: ellipsis
    forecast_show_min: true
  - forecast: daily
    attribute: temperature
    forecast_offset: 1
    entity: weather.your_weather_entity
    style: inline
    icon: weather
    icon_path: /local/your-icon-folder/
    padding: 6px 10px
    text_size: 13px
    label_size: 13px
    text_gap: 4px
    value_weight: "600"
    name: Tomorrow
    overflow: marquee
    label_overflow: ellipsis
    forecast_show_min: true
grid_options:
  rows: auto
```

</details>

## Appearance

The card has a visual editor for setting up layouts. All YAML settings are listed below.

<details>
<summary><strong>Where to find things in the editor</strong></summary>

The visual editor groups settings into collapsible panels, top to bottom:

```
Card editor
├─ weather_entity                          (always visible, top)
├─ Sun & Moon
│  ├─ sun_entity, moon_phase_entity
│  ├─ Position & Size ▸ celestial_position, celestial_alignment,
│  │                    celestial_x, celestial_y, celestial_size
│  └─ Moon Style ▸ celestial_moon_style
├─ Color Mode
│  ├─ card_color_mode, theme_entity
│  └─ Advanced options ▸ card_filter
├─ Card Style
│  ├─ card_style, card_height, card_padding
│  └─ Advanced options ▸ card_hide_text, card_square, card_full_width,
│                        card_mask_vertical, card_mask_horizontal,
│                        card_stack_order, card_offset
├─ Overlays
│  ├─ Chips ▸ the chips list, row styles, card_background_style
│  ├─ Image ▸ image_day, image_night, image_scale, image_alignment,
│  │          image_x, image_y, Status Override ▸ status_entity,
│  │          status_day, status_night
│  └─ Cards ▸ custom_cards_position, custom_cards_css_class, custom_cards
├─ Performance
│  └─ perf_mode, perf_fps, perf_cloud_quality, perf_effects, perf_dpr,
│     perf_fauna, fauna_bird_density, fauna_plane_density,
│     fauna_bird_flock_size, fauna_birds_at_night, animation_speed,
│     bird_animation_speed, star_animation_speed
└─ Tap Action                              (bottom)
   └─ card_tap_action
```

The sections below document every option, including type, default, and behavior.

</details>

<details>
<summary><strong>Card Style & Layout</strong></summary>

| Option             | Type                | Default     | Description                                                                                                                                                                                                                                                                                                                                                                     |
| :----------------- | :------------------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `card_style`       | `string`            | `immersive` | Set to `standalone` for a solid background with dynamic weather visuals, or `immersive` for a transparent background.                                                                                                                                                                                                                                                           |
| `card_height`      | `number` · `string` | `200`       | Height in pixels. Numbers are automatically treated as px (e.g., `110` becomes `110px`). **Set to `auto`** to dynamically fill the available height (for grid layouts).                                                                                                                                                                                                         |
| `card_padding`     | `string`            | `16px`      | Inner padding around the text. Accepts any CSS padding value (e.g., `8px`, `12px 20px`).                                                                                                                                                                                                                                                                                        |
| `card_hide_text`   | `boolean`           | `false`     | Hides all text overlays, including chips. The card's weather animations and configured chip settings remain available if you enable it again.                                                                                                                                                                                                                                   |
| `card_square`      | `boolean`           | `false`     | Forces the card into a perfect square. Highly useful for grid layouts.                                                                                                                                                                                                                                                                                                          |
| `card_full_width`  | `boolean`           | `false`     | Stretches the card edge-to-edge by removing side margins.                                                                                                                                                                                                                                                                                                                       |
| `card_offset`      | `string`            | `0px`       | Shifts the card using CSS margin (e.g., `"-50px 0px 0px 0px"`). Useful when layering cards.                                                                                                                                                                                                                                                                                     |
| `card_stack_order` | `number`            | _auto_      | Manually sets the z-index (e.g., `1`, `0`, `-1`). Useful for forcing an immersive card to display in front of cards with solid backgrounds. See [Troubleshooting: Card always stays in front of other cards](#card-always-stays-in-front-of-other-cards) and [Card appears behind other cards or becomes hard to see](#card-appears-behind-other-cards-or-becomes-hard-to-see). |
| `card_tap_action`  | `object`            | —           | A standard Home Assistant [tap action](https://www.home-assistant.io/dashboards/actions/).                                                                                                                                                                                                                                                                                      |

</details>

<details>
<summary><strong>Theme & Filters</strong></summary>

| Option                 | Type      | Default   | Description                                                                                                                                                                                                                                                            |
| :--------------------- | :-------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card_color_mode`      | `string`  | `auto`    | Controls the card's color scheme. By default, it follows your Home Assistant theme. Set to `entity` to follow a `theme_entity`, or `force_dark` / `force_light` to lock the look. Also accepts `night` / `day` to override the sky content. See [Colors](#color-mode). |
| `card_filter`          | `string`  | `none`    | Applies a visual filter preset to the weather canvas. Options: `darken`, `vivid`, `muted`, `warm`.                                                                                                                                                                     |
| `celestial_moon_style` | `string`  | `default` | The moon's glow color. `default` follows the theme (muted blue in light mode, white in dark mode). Other options: `blue`, `yellow`, `purple`, `grey`.                                                                                                                  |
| `card_mask_vertical`   | `boolean` | `true`    | _(Immersive only)_ Fades the top and bottom edges. Set to `false` to disable.                                                                                                                                                                                          |
| `card_mask_horizontal` | `boolean` | `true`    | _(Immersive only)_ Fades the left and right edges. Set to `false` to disable.                                                                                                                                                                                          |
| `theme_entity`         | `string`  | —         | Drives the card's color scheme from any entity's state instead of your HA theme. Commonly set to `sun.sun` to sync the card with sunrise/sunset. See [Colors](#color-mode).                                                                                            |

</details>

<details>
<summary><strong>Sun & Moon</strong></summary>

The sun and moon share a single position and the card swaps them based on your `sun_entity`. See [Colors](#color-mode) for the full details. The card also automatically generates a dynamic **sunrise and sunset effect** based on the sun's elevation, and **rotates the moon** accurately based on your Home Assistant latitude setting.

| Option                | Type     | Default    | Description                                                                                                                                                                                                                                                             |
| :-------------------- | :------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `celestial_size`      | `number` | _auto_     | Overrides the sun/moon diameter in pixels.                                                                                                                                                                                                                              |
| `celestial_position`  | `string` | `fixed`    | How the sun and moon are positioned. `fixed` uses the `celestial_alignment`, `celestial_x`, and `celestial_y` values. `dynamic_sun` animates the sun across the sky following the real solar arc (moon stays fixed). `dynamic_both` animates both the sun and the moon. |
| `celestial_alignment` | `string` | `top-left` | Where the sun and moon anchor inside the card. Uses a 9-cell grid (e.g., `top-left`, `center`, `bottom-right`). Also accepts `left`, `right` as shorthand.                                                                                                              |
| `celestial_x`         | `number` | `0`        | Horizontal offset in pixels from the anchored position.                                                                                                                                                                                                                 |
| `celestial_y`         | `number` | `0`        | Vertical offset in pixels from the anchored position.                                                                                                                                                                                                                   |

</details>

<a name="chip-editor-structure"></a>

<details>
<summary><strong>Chips: editor structure</strong></summary>

Chips are the main layout element of this card. Each chip can show live entity data or forecast data, and you can add as many as you want. For a walkthrough on how to set them up, see the [Chips guide](#chips).

Each chip card in the editor is organized like this, top to bottom:

```
Chip
├─ Sensor / Forecast toggle
├─ Data source                    (always visible)
│  ├─ entity
│  └─ attribute
├─ Forecast box                   (Forecast mode only, not in an accordion)
│  ├─ forecast, forecast_offset
│  ├─ attribute ("Show")
│  └─ forecast_precision
├─ Type                           (Ring/Bar chips only)
│  ├─ type, ring_min/bar_min, ring_max/bar_max,
│  │  ring_width/bar_height, ring_gap/bar_gap, ring_color/bar_color,
│  │  ring_threshold_mode/bar_threshold_mode, ring_thresholds/bar_thresholds
│  └─ Ring/Bar entity ▸ gauge_entity, gauge_attribute
├─ Layout
│  └─ style, align, chip_round, background, background_color,
│     width, height, padding, inner_gap, text_gap
├─ Text
│  ├─ Label ▸ hide_label, name, name_sensor, name_attribute,
│  │          label_size, label_weight, label_overflow
│  ├─ Value ▸ hide_value, fancy_unit, unit_format, value_precision,
│  │          text_size, value_weight, overflow
│  ├─ Sub value ▸ hide_sub_value, sub_value_entity, sub_value_attribute,
│  │              sub_value_format, sub_value_size, sub_value_weight,
│  │              sub_value_position, sub_value_overflow
│  └─ Scrolling ▸ marquee_rtl, marquee_speed  (only when overflow: marquee)
├─ Icon
│  └─ hide_icon, icon, icon_path, icon_size, icon_padding,
│     icon_background, icon_background_color
├─ Position
│  └─ position, position_anchor, position_x, position_y, behind_effects
└─ Tap Action
   └─ card_tap_action              (scoped to this chip)
```

> [!TIP]
> Changing the entity in **Data source**, **Label** (`name_sensor`), **Sub value** (`sub_value_entity`), or the **Ring/Bar entity** disclosure (`gauge_entity`) automatically clears that field's attribute, since the previously selected attribute may not exist on the new entity.

</details>

<details>
<summary><strong>Row options</strong></summary>

| Option                       | Type      | Default       | Description                                                                                                                                                                                                                                                                                           |
| :--------------------------- | :-------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chips`                      | `list`    | —             | The list of chips to display. Each entry is an object with its own settings (see below).                                                                                                                                                                                                              |
| `chip_area_position`         | `string`  | `bottom-left` | Where the chips row is positioned.                                                                                                                                                                                                                                                                    |
| `chip_area_layout`           | `string`  | `wrap`        | Row behavior. `wrap` moves overflowing chips to a new line, `horizontal-scroll` keeps them on one line with a hidden scrollbar and edge fades, `vertical-scroll` stacks them in a scrollable column, `grid` arranges them in equal columns. `scroll` is accepted as an alias for `horizontal-scroll`. |
| `chip_area_columns`          | `number`  | `3`           | Number of equal-width columns when `chip_area_layout: grid` is active.                                                                                                                                                                                                                                |
| `chip_area_align`            | `string`  | `start`       | How each chip aligns inside its grid cell. Options: `start`, `center`, `end`. Grid layout only.                                                                                                                                                                                                       |
| `chip_area_width`            | `string`  | —             | Limits the full row width (e.g., `60%` or `200px`). Useful to place the chips row next to the top text instead of spanning the card.                                                                                                                                                                  |
| `chip_area_height`           | `string`  | —             | Sets the height of the chips row (e.g., `120px`).                                                                                                                                                                                                                                                     |
| `chip_padding`               | `string`  | `5px 10px`    | Inner padding of each chip (e.g., `5px 10px`).                                                                                                                                                                                                                                                        |
| `chip_area_padding`          | `string`  | —             | Padding of the outer chips container (the wrapper around all chips).                                                                                                                                                                                                                                  |
| `chip_area_gap`              | `string`  | `8px`         | Space between chips.                                                                                                                                                                                                                                                                                  |
| `chip_gap`                   | `string`  | `6px`         | Space between the icon and text inside each chip.                                                                                                                                                                                                                                                     |
| `chip_style`                 | `string`  | `inline`      | Controls the chip layout style. `inline` is the default horizontal layout with icon and text side by side. `stacked` arranges the icon, name, and value in a compact two-column grid. `vertical` stacks icon, name, and value in a centered column.                                                   |
| `chip_area_scroll_count`     | `number`  | —             | Number of chips visible at once when using a scroll layout. Enables snap-scrolling through pages of chips.                                                                                                                                                                                            |
| `chip_area_grouped`          | `boolean` | `false`       | Wraps all chips into a single shared background container instead of styling each chip individually. Requires `chip_area_background: true`.                                                                                                                                                           |
| `chip_area_full_width`       | `boolean` | `false`       | Stretches each chip to fill the available row width. Useful in combination with `chip_area_scroll_count` or grid layouts.                                                                                                                                                                             |
| `chip_text_size`             | `string`  | —             | Font size of the chip value text. Accepts any CSS size value (e.g., `16px`, `1.2em`).                                                                                                                                                                                                                 |
| `chip_label_size`            | `string`  | —             | Font size of the chip name label.                                                                                                                                                                                                                                                                     |
| `chip_icon_size`             | `string`  | —             | Global icon size for all chips.                                                                                                                                                                                                                                                                       |
| `chip_icon_padding`          | `string`  | —             | Global padding around the icon for all chips.                                                                                                                                                                                                                                                         |
| `chip_icon_background`       | `boolean` | `false`       | Adds a background behind the icon area of each chip.                                                                                                                                                                                                                                                  |
| `chip_area_background`       | `boolean` | `false`       | Adds a styled background behind each chip (the style is controlled by `card_background_style`).                                                                                                                                                                                                       |
| `card_background_style`      | `string`  | `frosted`     | Visual treatment used when chip backgrounds are enabled. Options: `frosted` (translucent glass), `contrast` (solid and readable), `theme` (uses Home Assistant theme colors).                                                                                                                         |
| `chip_area_separator`        | `boolean` | `false`       | Adds a thin divider line between chips. Only visible when `chip_area_grouped` is enabled.                                                                                                                                                                                                             |
| `chip_background_color`      | `string`  | —             | Custom background color applied to all chips. Accepts any CSS color value, including `rgba()`.                                                                                                                                                                                                        |
| `chip_icon_background_color` | `string`  | —             | Custom background color for the icon area of all chips.                                                                                                                                                                                                                                               |
| `chip_area_background_color` | `string`  | —             | Custom background color for the grouped container when `chip_area_grouped` is enabled.                                                                                                                                                                                                                |
| `chip_text_gap`              | `string`  | `0.35em`      | Gap between the name label and the value text inside each chip.                                                                                                                                                                                                                                       |
| `chip_area_hide`             | `boolean` | `false`       | Hides the chips row entirely.                                                                                                                                                                                                                                                                         |

</details>

<details>
<summary><strong>Per-chip options</strong></summary>

Each entry inside the `chips` list accepts the following keys.

| Option                  | Type      | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------- | :-------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity`                | `string`  | —           | **Required.** Any sensor, binary_sensor, or weather entity. Pointing it at the weather entity shows the current state (e.g., `Sunny`).                                                                                                                                                                                                                                                         |
| `attribute`             | `string`  | —           | Read a specific attribute of the entity instead of its state (e.g., `humidity` on a weather entity).                                                                                                                                                                                                                                                                                           |
| `forecast`              | `string`  | —           | Set to `daily` or `hourly` to show forecast data instead of live entity data. The chip's name is generated automatically (day names for daily, time for hourly). Requires the entity to be a weather entity.                                                                                                                                                                                   |
| `forecast_offset`       | `number`  | `0`         | Which forecast entry to display. `0` = today/now, `1` = tomorrow/next hour, and so on. Daily goes up to 6, hourly up to 23.                                                                                                                                                                                                                                                                    |
| `forecast_precision`    | `number`  | —           | Maximum number of decimal places for forecast values (0–2). Only limits the number shown; trailing zero decimals are trimmed (e.g. a whole number stays without a decimal point even at precision `1` or `2`).                                                                                                                                                                                 |
| `value_precision`       | `number`  | —           | Forces the chip's main value to always show exactly this many decimal places (0–2), padding with zeros if needed (e.g. `22` becomes `22.0` at precision `1`). Leave unset to use Home Assistant's own display precision for the entity/attribute ("Auto"). Does not apply to forecast chips — use `forecast_precision` for those.                                                              |
| `forecast_show_min`     | `boolean` | `false`     | Shows the low/high temperature range (e.g., `8 – 18`) instead of only the high. Only works with `attribute: temperature` on daily forecasts. In the editor this is internally mapped to sub-value options (`sub_value_attribute: templow` and `sub_value_position`).                                                                                                                           |
| `unit_format`           | `string`  | —           | Replaces the unit shown after the value. Placed directly after the value with no space, e.g. `°` turns `12 °C` into `12°`.                                                                                                                                                                                                                                                                     |
| `name`                  | `string`  | —           | Optional label shown before the value (e.g., `Wind`). For forecast chips, this overrides the auto-generated day/time name.                                                                                                                                                                                                                                                                     |
| `icon`                  | `string`  | _auto_      | An `mdi:` icon (e.g., `mdi:water-percent`), the keyword `weather` to automatically show the icon matching the current weather state (or the forecasted condition when using `forecast`), or empty to inherit the sensor's own icon.                                                                                                                                                            |
| `icon_path`             | `string`  | —           | Folder for custom SVG icons (e.g., `/local/weather-icons/`). When set, the value of `icon` resolves to an image file instead of an MDI icon. For example, `icon: weather` combined with `icon_path: /local/weather-icons/` loads `/local/weather-icons/rainy.svg` for rainy weather. You can find the animated SVG icons from the examples [here](https://github.com/basmilius/weather-icons). |
| `hide_icon`             | `boolean` | `false`     | Hides the icon for this chip.                                                                                                                                                                                                                                                                                                                                                                  |
| `hide_label`            | `boolean` | `false`     | Hides the name label for this chip.                                                                                                                                                                                                                                                                                                                                                            |
| `hide_value`            | `boolean` | `false`     | Hides the value text for this chip.                                                                                                                                                                                                                                                                                                                                                            |
| `fancy_unit`            | `boolean` | `false`     | Renders the temperature unit as a small superscript next to the value. Only works when reading a `temperature` attribute from a weather entity.                                                                                                                                                                                                                                                |
| `width`                 | `string`  | —           | Limits the chip's width in pixels. Use `200px` (or `200`, which is normalized to `200px`). Required for marquee overflow.                                                                                                                                                                                                                                                                      |
| `height`                | `string`  | —           | Sets the chip height in pixels. Use `40px` (or `40`, which is normalized to `40px`).                                                                                                                                                                                                                                                                                                           |
| `overflow`              | `string`  | `ellipsis`  | How text exceeding `width` is handled. Options: `ellipsis` (cuts off with `…`), `clip` (cuts off without indicator), `wrap` (breaks onto a second line), `marquee` (scrolls horizontally).                                                                                                                                                                                                     |
| `label_overflow`        | `string`  | `ellipsis`  | How the name label handles overflow. Same options as `overflow`.                                                                                                                                                                                                                                                                                                                               |
| `marquee_speed`         | `number`  | `30`        | Scroll speed in pixels per second when any overflow mode is `marquee` (`overflow`, `label_overflow`, or `sub_value_overflow`). Minimum `5`.                                                                                                                                                                                                                                                    |
| `marquee_rtl`           | `boolean` | `false`     | Reverses marquee direction (scrolls right-to-left) for all marquee-based text overflows.                                                                                                                                                                                                                                                                                                       |
| `card_tap_action`       | `object`  | `more-info` | A standard Home Assistant [tap action](https://www.home-assistant.io/dashboards/actions/) scoped to this chip.                                                                                                                                                                                                                                                                                 |
| `name_sensor`           | `string`  | —           | An entity whose state (or attribute) is used as the chip's dynamic name label. Updates in real time.                                                                                                                                                                                                                                                                                           |
| `name_attribute`        | `string`  | —           | Reads a specific attribute from the `name_sensor` entity instead of its state.                                                                                                                                                                                                                                                                                                                 |
| `hide_sub_value`        | `boolean` | `false`     | Hides the optional secondary value.                                                                                                                                                                                                                                                                                                                                                            |
| `sub_value_entity`      | `string`  | —           | Entity used for the secondary value.                                                                                                                                                                                                                                                                                                                                                           |
| `sub_value_attribute`   | `string`  | —           | Attribute read from `sub_value_entity` instead of its state.                                                                                                                                                                                                                                                                                                                                   |
| `sub_value_format`      | `string`  | —           | Optional text format for the secondary value.                                                                                                                                                                                                                                                                                                                                                  |
| `sub_value_position`    | `string`  | —           | Where to display the secondary value. Use `beside` or `below`.                                                                                                                                                                                                                                                                                                                                 |
| `sub_value_overflow`    | `string`  | `ellipsis`  | How the secondary value handles overflow. Uses the same options as `overflow`.                                                                                                                                                                                                                                                                                                                 |
| `position`              | `string`  | —           | Set to `custom` to detach this chip from the row and place it freely on the card using `position_anchor`, `position_x`, and `position_y`.                                                                                                                                                                                                                                                      |
| `position_anchor`       | `string`  | `top-left`  | Anchor point for a free-positioned chip. Uses a 9-cell grid (e.g., `top-left`, `center`, `bottom-right`).                                                                                                                                                                                                                                                                                      |
| `position_x`            | `string`  | `0`         | Horizontal offset for a free-positioned chip (e.g., `20px`, `10%`).                                                                                                                                                                                                                                                                                                                            |
| `position_y`            | `string`  | `0`         | Vertical offset for a free-positioned chip (e.g., `20px`, `10%`).                                                                                                                                                                                                                                                                                                                              |
| `behind_effects`        | `boolean` | `false`     | Places the chip behind the weather animations. Only works on free-positioned chips.                                                                                                                                                                                                                                                                                                            |
| `forecast_low_position` | `string`  | —           | Where to show the low temperature when `forecast_show_min` is active. `beside` places it inline (e.g., `8 – 18`). `below` renders it on a second line under the high. In the editor this is internally mapped to `sub_value_position` (`beside`/`below`).                                                                                                                                      |

</details>

<details>
<summary><strong>Per-chip style overrides</strong></summary>

Every chip can override the global row styles individually. This is what makes it possible to mix completely different-looking chips in a single card, for example a large stacked forecast chip next to a small inline live sensor.

| Option                  | Type      | Default | Description                                                                                                                                                                               |
| :---------------------- | :-------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `style`                 | `string`  | —       | Overrides the global `chip_style` for this chip. Accepts `inline`, `stacked`, or `vertical`.                                                                                              |
| `background`            | `boolean` | —       | Overrides the global `chip_area_background` for this chip. Set to `false` to hide the background on a specific chip even when backgrounds are globally enabled (or the other way around). |
| `background_color`      | `string`  | —       | Custom background color for this chip. Accepts any CSS color value, including `rgba()` for transparency.                                                                                  |
| `padding`               | `string`  | —       | Overrides the chip padding for this chip only.                                                                                                                                            |
| `text_size`             | `string`  | —       | Overrides the value text size for this chip.                                                                                                                                              |
| `label_size`            | `string`  | —       | Overrides the name label text size for this chip.                                                                                                                                         |
| `label_weight`          | `string`  | —       | Font weight of the name label (e.g., `500`, `600`, `700`).                                                                                                                                |
| `inner_gap`             | `string`  | —       | Overrides the icon/text gap for this chip.                                                                                                                                                |
| `icon_size`             | `string`  | —       | Overrides the icon size for this chip.                                                                                                                                                    |
| `icon_padding`          | `string`  | —       | Overrides the icon padding for this chip.                                                                                                                                                 |
| `icon_background`       | `boolean` | —       | Overrides the global `chip_icon_background` for this chip.                                                                                                                                |
| `icon_background_color` | `string`  | —       | Custom background color for the icon area. Accepts any CSS color value, including `rgba()`.                                                                                               |
| `align`                 | `string`  | —       | Content alignment within this chip. Options: `start`, `center`, `end`.                                                                                                                    |
| `value_weight`          | `string`  | —       | Font weight of the value text (e.g., `500`, `600`, `700`).                                                                                                                                |
| `sub_value_size`        | `string`  | —       | Overrides the secondary value text size for this chip.                                                                                                                                    |
| `sub_value_weight`      | `string`  | —       | Font weight of the secondary value (e.g., `500`, `600`, `700`).                                                                                                                           |
| `text_gap`              | `string`  | —       | Overrides the gap between the name label and value for this chip.                                                                                                                         |
| `chip_round`            | `boolean` | `false` | Forces a fully rounded (pill) shape on this chip.                                                                                                                                         |

</details>

<details>
<summary><strong>Ring & Bar gauge options</strong></summary>

Setting `type` to `ring` or `bar` turns a chip into a circular or linear gauge instead of standard text. Works well for battery levels, humidity, CPU usage, or any numeric sensor. See the [Chips guide](#chips) for usage examples and threshold configuration.

| Option                                       | Type     | Default         | Description                                                                                                                                                                |
| :------------------------------------------- | :------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                                       | `string` | —               | Set to `ring` or `bar` to enable the gauge.                                                                                                                                |
| `ring_min` / `bar_min`                       | `number` | `0`             | Minimum value for the gauge range.                                                                                                                                         |
| `ring_max` / `bar_max`                       | `number` | `100`           | Maximum value for the gauge range.                                                                                                                                         |
| `ring_width` / `bar_height`                  | `number` | `4`             | Thickness of the ring stroke, or height of the bar, in pixels.                                                                                                             |
| `ring_gap` / `bar_gap`                       | `number` | `3`             | Gap between the gauge and the chip content in pixels.                                                                                                                      |
| `ring_color` / `bar_color`                   | `string` | _theme primary_ | Color of the filled portion. Accepts any CSS color.                                                                                                                        |
| `ring_threshold_mode` / `bar_threshold_mode` | `string` | —               | How thresholds are applied. `solid` fills the whole gauge with the matched color. `segments` draws each range as a separate arc/segment. `gradient` blends between colors. |
| `ring_thresholds` / `bar_thresholds`         | `list`   | —               | A list of `{ value, color }` entries. The gauge changes color once the value passes a threshold.                                                                           |
| `gauge_entity`                               | `string` | —               | Optional secondary entity that drives the gauge fill, independent of the chip's main `entity`/`attribute`.                                                                 |
| `gauge_attribute`                            | `string` | —               | Reads a specific attribute from `gauge_entity` instead of its state.                                                                                                       |

</details>

<details>
<summary><strong>Custom Images</strong></summary>

You can add your own images (such as a house image) to the card. This works in both standalone and immersive modes. See the [Custom House Image](#custom-house-image) tutorial for a step-by-step guide.

| Option            | Type     | Default     | Description                                                                                                                                               |
| :---------------- | :------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image_day`       | `string` | —           | File path for the daytime image (e.g., `/local/house-day.png`).                                                                                           |
| `image_night`     | `string` | —           | File path for the nighttime image. Falls back to the day image if left empty.                                                                             |
| `image_scale`     | `number` | `100`       | Image size as a percentage of the total card height.                                                                                                      |
| `image_alignment` | `string` | `top-right` | Image placement. Options: `top-left`, `top-center`, `top-right`, `center-left`, `center`, `center-right`, `bottom-left`, `bottom-center`, `bottom-right`. |
| `image_x`         | `string` | `0`         | Horizontal offset from the selected image alignment. Accepts pixels or CSS values such as `-20` or `10%`.                                                 |
| `image_y`         | `string` | `0`         | Vertical offset from the selected image alignment. Accepts pixels or CSS values such as `10` or `-5%`.                                                    |
| `status_entity`   | `string` | —           | Entity to monitor for a status-specific image (for example a door sensor).                                                                                |
| `status_day`      | `string` | —           | Day image to show while `status_entity` is active, open, or home.                                                                                         |
| `status_night`    | `string` | —           | Night image to show while `status_entity` is active, open, or home.                                                                                       |

</details>

<details>
<summary><strong>Embedded Cards</strong></summary>

You can embed other Home Assistant cards directly inside this card. This is useful for adding buttons, specific sensors, weather forecasts, graphs and more.

| Option                   | Type     | Default  | Description                                                                                                 |
| :----------------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------- |
| `custom_cards`           | `list`   | —        | A list of cards to display. You can use standard Home Assistant cards or custom ones.                       |
| `custom_cards_position`  | `string` | `bottom` | Where to place the container holding your custom cards (e.g., `bottom`, `top`, `bottom-right`).             |
| `custom_cards_css_class` | `string` | —        | Assigns a custom CSS class to the container, making it easy to style with `card_mod`.                       |
| `custom_width`           | `string` | —        | _Used directly on the nested cards._ Forces a specific width for an individual card (e.g., `100%`, `50px`). |
| `custom_height`          | `string` | —        | _Used directly on the nested cards._ Forces a specific height for an individual card (e.g., `150px`).       |

**Basic Example:**

```yaml
custom_cards_position: bottom
custom_cards:
  - type: weather-forecast
    custom_width: 100%
    entity: weather.your_weather_entity
```

</details>

<a name="css-variables"></a>

<details>
<summary><strong>CSS Variables</strong></summary>

> Most users won't need these. The options above cover all common use cases. These CSS variables are here for fine-tuning specific details like font sizes, shadows, and spacing, either in your theme or via `card_mod`.

<details>
<summary><b>Card Variables</b></summary>

| Variable                       | Default      | Description                                                                                               |
| :----------------------------- | :----------- | :-------------------------------------------------------------------------------------------------------- |
| `--awc-card-border-radius`     | `12px`       | Adjusts the corner radius.                                                                                |
| `--awc-card-border-width`      | _HA theme_   | Overrides the card's border width. Inherits from the Home Assistant theme by default.                     |
| `--awc-card-padding`           | `16px`       | Padding space around the text.                                                                            |
| `--awc-canvas-filter`          | `none`       | Applies a custom CSS filter to the canvas (this overrides the `card_filter` config option).               |
| `--awc-stack-order`            | `-1` / `1`   | Controls the stacking order (z-index) of the card. Defaults to `-1` for immersive and `1` for standalone. |
| `--awc-custom-cards-direction` | `row`        | Flex direction of the custom cards container.                                                             |
| `--awc-custom-cards-gap`       | `8px`        | Gap between items in the custom cards container.                                                          |
| `--awc-custom-cards-justify`   | `flex-start` | Horizontal justification of the custom cards container.                                                   |
| `--awc-custom-cards-align`     | `flex-start` | Vertical alignment of the custom cards container.                                                         |

</details>

<details>
<summary><b>Text Variables</b></summary>

| Variable                   | Default                                    | Description                                                                                       |
| :------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `--awc-text-day`           | `#2c2c2e`                                  | Text color during the daytime.                                                                    |
| `--awc-text-night`         | `#FFFFFF`                                  | Text color during the nighttime.                                                                  |
| `--awc-text-color`         | _auto_                                     | Resolved text color for the current scheme. Overrides both day and night colors at once.          |
| `--awc-text-shadow-day`    | _soft white glow_                          | Text shadow effect for daytime.                                                                   |
| `--awc-text-shadow-night`  | _soft dark glow_                           | Text shadow effect for nighttime.                                                                 |
| `--awc-text-shadow-active` | _auto_                                     | Resolved text shadow for the current scheme. Overrides both day and night shadows at once.        |
| `--awc-chip-text-shadow`   | `0 1px 2px rgba(0,0,0,0.35)`               | Text shadow applied to the chip name label.                                                       |
| `--awc-bottom-font-size`   | `clamp(15px, 5cqmin, 26px)`                | Chip text size (dynamically responsive).                                                          |
| `--awc-bottom-font-weight` | `500`                                      | Chip text weight.                                                                                 |
| `--awc-bottom-gap`         | `8px`                                      | Gap between chips in the row.                                                                     |
| `--awc-bottom-opacity`     | `0.7`                                      | Opacity of chips without a background.                                                            |
| `--awc-chip-name-weight`   | `700`                                      | Font weight of the chip name label.                                                               |
| `--awc-chip-name-opacity`  | `0.7`                                      | Opacity of the chip name label.                                                                   |
| `--awc-chip-name-color`    | `inherit`                                  | Color of the chip name label.                                                                     |
| `--awc-chip-gap`           | `6px`                                      | Gap between the icon and text inside each chip.                                                   |
| `--awc-chips-padding`      | `0` (`5px 10px` with background)           | Inner padding of each chip.                                                                       |
| `--awc-row-width`          | `calc(100% - padding)`                     | Width of the chips row. Overrides the `chip_area_width` option.                                   |
| `--awc-row-height`         | `auto`                                     | Height of the chips row. Overrides the `chip_area_height` option.                                 |
| `--awc-row-columns`        | `3`                                        | Number of columns when `chip_area_layout: grid` is active.                                        |
| `--awc-row-fade-l`         | _auto_                                     | Left edge fade width for the scrolling chip row.                                                  |
| `--awc-row-fade-r`         | _auto_                                     | Right edge fade width for the scrolling chip row.                                                 |
| `--awc-bottom-bg-color`    | _auto_                                     | Background color when `chip_area_background` is enabled. Defaults to the active background style. |
| `--awc-bottom-bg-radius`   | _card radius_                              | Border radius for the chip background.                                                            |
| `--awc-bottom-bg-filter`   | `blur(10px)`                               | Backdrop filter for the chip background (only used by the `frosted` style).                       |
| `--awc-bg-shadow`          | _auto_                                     | Overrides the shadow used by `frosted` and `contrast` chip backgrounds.                           |
| `--awc-bg-border`          | `1px solid …`                              | Overrides the border used by the `frosted` background style.                                      |
| `--awc-icon-size`          | `1.1em`                                    | Size of the chip icon.                                                                            |
| `--awc-icon-drop-shadow`   | `drop-shadow(0px 3px 6px rgba(0,0,0,0.3))` | Drop shadow filter applied to custom image icons set via `icon_path`.                             |
| `--awc-marquee-duration`   | `20s`                                      | Animation duration for the marquee overflow mode. Longer = slower.                                |
| `--awc-marquee-fade`       | `12px`                                     | Edge fade width on either side of a marquee chip.                                                 |
| `--awc-marquee-separator`  | `"•"`                                      | Character inserted between marquee repetitions.                                                   |
| `--awc-marquee-sep-gap`    | `0.4em`                                    | Padding around the marquee separator character.                                                   |

</details>

<details>
<summary><b>Stacked & Vertical Chip Variables</b></summary>

These variables only apply when `chip_style` is set to `stacked` or `vertical`.

| Variable                      | Default   | Description                                                                                 |
| :---------------------------- | :-------- | :------------------------------------------------------------------------------------------ |
| `--awc-stacked-icon-bg`       | _auto_    | Background color of the icon area in stacked/vertical chips.                                |
| `--awc-stacked-icon-radius`   | _auto_    | Border radius of the icon area.                                                             |
| `--awc-stacked-icon-inset`    | `3px`     | Inset used to calculate the icon area's border radius relative to the chip's border radius. |
| `--awc-stacked-name-size`     | `0.85em`  | Font size of the name label in stacked/vertical chips.                                      |
| `--awc-stacked-name-weight`   | `500`     | Font weight of the name label in stacked/vertical chips.                                    |
| `--awc-stacked-name-tracking` | `0.03em`  | Letter spacing of the name label in stacked/vertical chips.                                 |
| `--awc-stacked-name-opacity`  | `0.6`     | Opacity of the name label in stacked/vertical chips.                                        |
| `--awc-stacked-name-color`    | `inherit` | Color of the name label in stacked/vertical chips.                                          |
| `--awc-stacked-value-weight`  | `700`     | Font weight of the value in stacked/vertical chips.                                         |
| `--awc-stacked-column-gap`    | `10px`    | Horizontal gap between the icon and text columns in stacked chips.                          |
| `--awc-stacked-row-gap`       | `4px`     | Vertical gap between the name and value rows in stacked/vertical chips.                     |
| `--awc-vertical-icon-gap`     | `6px`     | Bottom margin of the icon in vertical chips.                                                |

</details>

<details>
  <summary><b>Card Mod Example</b></summary>

This example shows how you can apply styles to the card using `card_mod`.

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
card_mod:
  style: |
    :host {
      --awc-text-day: #ffffff;
      --awc-text-night: #ffffff;
      --awc-text-shadow-day: 0 1px 2px rgba(0, 0, 0, 0.15);
      --awc-text-shadow-night: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
```

</details>

</details>

## Guides

<a name="chips"></a>

<details>
<summary><b>Chips & Forecasts</b></summary>

Chips are basically buttons you can optionally add to the card. You can add as many as you like and show live info, like current weather conditions or data from any Home Assistant entity, but also weather forecasts. You can leave them grouped in a row and make them all look the same (useful for building a daily forecast), or you can style and position each one individually. Full option references (Row options, Per-chip options, Per-chip style overrides, Ring & Bar gauge options) live in the [Appearance](#appearance) section — the walkthroughs below only cover the "how" with examples.

Start with a simple chip row:

```yaml
chips:
  - entity: weather.your_weather_entity
    icon: weather
  - entity: sensor.outside_humidity
    name: Humidity
  - entity: sensor.wind_speed
    icon: mdi:weather-windy
```

<details>
<summary><strong>Forecast chips</strong></summary>

By default, a chip reads the current state of its entity. Setting `forecast` to `daily` or `hourly` switches it to forecast mode instead. In this mode, the chip subscribes to the weather entity's forecast data and displays a specific future entry.

Use `forecast_offset` to pick which entry: `0` is today (or now), `1` is tomorrow (or the next hour), and so on. The chip automatically generates a name label: day names like "Mon", "Tue" for daily, or times like "14:00" for hourly. You can still override this with `name` if you want a custom label.

When using `icon: weather` on a forecast chip, the icon matches the **forecasted** condition for that entry, not the current weather.

```yaml
chips:
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 1
    forecast_show_min: true
    icon: weather
    icon_path: /local/weather-icons/
  - entity: weather.your_weather_entity
    forecast: hourly
    attribute: temperature
    forecast_offset: 3
    unit_format: "°"
```

The first chip shows tomorrow's temperature range (low – high) with a weather icon matching tomorrow's condition. The second chip shows the temperature 3 hours from now, with `°` directly after the value instead of the full unit.

For the full list of forecast-related options (`forecast`, `forecast_offset`, `forecast_precision`, `forecast_show_min`, `forecast_low_position`, `value_precision`, `unit_format`), see **Per-chip options** in [Appearance](#appearance).

</details>

<details>
<summary><strong>Per-chip styling</strong></summary>

Every chip can override the global row styles. This means you can mix different chip formats, backgrounds, sizes, and spacing in one card without needing separate rows or CSS hacks.

For example, you might want most chips to be small inline elements but make one specific forecast chip larger with a stacked layout and its own background color:

```yaml
chip_style: inline
chip_area_background: true
chips:
  - entity: sensor.outside_temperature
  - entity: sensor.humidity
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 1
    style: stacked
    background_color: "rgba(0, 0, 0, 0.3)"
    padding: 12px 16px
    text_size: 18px
    icon: weather
    icon_path: /local/weather-icons/
```

The first two chips follow the global `inline` style and default background. The third chip overrides everything it needs to look different. All per-chip style overrides are listed under **Per-chip style overrides** in [Appearance](#appearance).

</details>

<details>
<summary><strong>Free positioning</strong></summary>

Any chip can be pulled out of the row and placed freely on the card. Set `position: custom` and use the anchor/offset system to put it exactly where you want.

```yaml
chips:
  - entity: sensor.outside_temperature
    position: custom
    position_anchor: top-right
    position_x: 20px
    position_y: 10px
    background: true
```

This places the temperature chip 20px from the right and 10px from the top, independent of where the chips row sits. The `position_anchor` uses the same 9-cell grid as the other position options (`top-left`, `center`, `bottom-right`, etc.).

Free-positioned chips can still use all the same styling and forecast options as regular chips.

</details>

<details>
<summary><strong>Ring & bar gauges</strong></summary>

Any chip can be turned into a circular or linear gauge by setting `type: ring` or `type: bar`. The gauge fills proportionally based on the entity's value within a min/max range. This works well for things like battery levels, humidity, CPU usage, or any numeric sensor.

```yaml
chips:
  - entity: sensor.living_room_humidity
    type: ring
    ring_min: 0
    ring_max: 100
    ring_width: 4
    ring_gap: 3
    ring_color: "#03a9f4"
    style: vertical
    hide_label: true
    icon: mdi:water-percent
```

You can add color thresholds that change the gauge color when the value passes a certain point. Threshold colors support three modes: `solid` fills the entire gauge with the matching threshold color, `segments` draws each threshold range as a separate colored arc/segment, and `gradient` blends smoothly between threshold colors.

```yaml
chips:
  - entity: sensor.cpu_temperature
    type: ring
    ring_min: 30
    ring_max: 100
    ring_color: "#4caf50"
    ring_threshold_mode: solid
    ring_thresholds:
      - value: 60
        color: "#ff9800"
      - value: 80
        color: "#f44336"
```

Full option reference (including the `bar` equivalents and `gauge_entity`/`gauge_attribute`) is under **Ring & Bar gauge options** in [Appearance](#appearance).

</details>

</details>

<a name="layout-layering"></a>

<details>
<summary><b>Layout & Layering</b></summary>

Use `standalone` when the card should have its own background. Use `immersive` when it should visually blend with neighboring cards or sit behind other dashboard content.

For layered layouts, position the sun or moon with its alignment and offsets, then detach individual chips from the row with `position: custom`. Use `card_offset` only when cards need to overlap, and increase `card_stack_order` in small steps when the card needs to render above another card.

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
sun_entity: sun.sun
card_style: immersive
card_stack_order: 1
celestial_alignment: top-right
celestial_x: 16
celestial_y: 12
chips:
  - entity: weather.your_weather_entity
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 16px
    position_y: 16px
    hide_icon: true
    hide_label: true
    background: false
```

`custom_cards` can be placed in the same card for graphs, buttons, or other Lovelace cards. If elements overlap, adjust one property at a time: first `card_stack_order`, then `card_offset`, then the position of individual chips or embedded cards. Full option details are in [Appearance](#appearance).

</details>

<a name="weather-icons"></a>

<details>
<summary><b>Weather Icons</b></summary>

You can replace the default MDI icons inside a chip with your own animated SVG files. The examples use [these](https://github.com/basmilius/weather-icons).

1. Download the SVG icons and name them after the weather conditions (such as `sunny.svg` or `rainy.svg`). The names for the states are standardized; you can find the possible weather states in the official [HA documentation](https://www.home-assistant.io/integrations/weather/#condition-mapping).
2. Put the files into a folder like `config/www/weather-icons/`.
3. In your chip config, set `icon` to `weather` and add the folder path to `icon_path`:

```yaml
chips:
  - entity: weather.your_weather_entity
    icon: weather
    icon_path: /local/weather-icons/
```

The card then resolves the icon by the current weather state. For example, `rainy` weather loads `/local/weather-icons/rainy.svg`.

</details>

<a name="custom-house-image"></a>

<details>
<summary><b>Custom House Image</b></summary>

This explains how to create an image for your own home and use it in the card.

1. **Take a reference photo** from a corner angle to properly capture the depth of the house.
2. **Generate a 3D model** using an AI image tool. Use a prompt similar to:
   > _Isometric view of a modern minimalist architectural model section from the outside on solid white background. [Describe your floors/rooms]. Materials are matte white and light only. No complex textures, studio lighting, very clean, simplified shapes._
3. **Remove the background** with an online tool or image editor and save the resulting image as a transparent PNG.
4. **Create day and night variants** by adjusting the prompt appropriately.
5. **Upload the files** to your `config/www/images/` directory and reference them in the card config as `/local/images/my-house-day.png`.

</details>

## Color Mode

The card's appearance depends on your **`sun_entity`** (sun or moon) and your **`card_color_mode`** (light or dark).

<details>
<summary><strong>How to set this up</strong></summary>

| Mode                     | Config                                                                        | What it does                                                                                                                                                                                                                                                                                                             |
| :----------------------- | :---------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Follow your HA theme** | `sun_entity: sun.sun`                                                         | The card shows the sun during the day and the moon at night, syncing its colors to whatever your Home Assistant theme is doing. Android and iOS can auto-toggle dark mode based on sunrise and sunset — this is exactly what the card was designed for.                                                                  |
| **Follow the sun**       | `sun_entity: sun.sun`<br>`card_color_mode: entity`<br>`theme_entity: sun.sun` | The card switches between light and dark at the real sunrise and sunset, regardless of what your Home Assistant theme is doing. Its colors match the time of day no matter what the rest of your dashboard looks like.                                                                                                   |
| **Force light or dark**  | `card_color_mode: force_dark`<br>or `card_color_mode: force_light`            | Locks the card's colors to one value. The sky still follows `sun_entity`, so you still get the moon and stars at night — only the card's colors are forced.                                                                                                                                                              |
| **Custom logic**         | `card_color_mode: entity`<br>`theme_entity: sensor.my_custom_mode`            | `theme_entity` can point at any entity — a template sensor, an `input_boolean`, or anything else. The card switches to its dark look when the state is `dark`, `night`, `evening`, `on`, `true`, or `below_horizon`. Anything else counts as light. Useful for rules like "dark after 9pm" or "dark when it's overcast". |

</details>

## Performance

Start with a `perf_mode` preset. Individual performance settings override the preset.

| Situation                                             | Recommended setting  | Result                                             |
| :---------------------------------------------------- | :------------------- | :------------------------------------------------- |
| Older tablet, wall panel, or battery-conscious device | `perf_mode: low`     | Reduces rendering load and disables extra effects. |
| Most dashboards                                       | `perf_mode: default` | Balanced animation quality and resource use.       |
| Powerful desktop or dedicated display                 | `perf_mode: ultra`   | Prioritizes frame rate and cloud detail.           |

When the dashboard stutters, reduce settings in this order: `perf_dpr`, `perf_fps`, `perf_effects`, then `perf_fauna`. This usually preserves the card's layout while lowering GPU and CPU work.

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
perf_mode: default
perf_dpr: 1
perf_fps: 30
perf_effects: 0
perf_fauna: 1
```

Test one change at a time. See [Troubleshooting](#performance-is-weak-on-older-devices) for device-specific recovery steps.

<details>
<summary><strong>Performance Settings</strong></summary>

The card has three performance presets (`low`, `default`, and `ultra`) which cover most setups. If you need more control, each setting can be changed individually. Any value set manually overrides the preset.

| Option                  | Type      | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------------------- | :-------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `perf_mode`             | `string`  | `default` | Performance preset. `low` disables effects and lowers resolution for weak devices. `default` is balanced. `ultra` raises the frame rate and cloud detail to maximum.                                                                                                                                                                                                                                                                                                                                                                   |
| `perf_fps`              | `number`  | `30`      | Animation frame rate. `30` saves battery, `60` is smoother. See [Troubleshooting: Editor preview stutters or FPS looks wrong after install/update](#editor-preview-stutters-or-fps-looks-wrong-after-installupdate) and [Performance is weak on older devices](#performance-is-weak-on-older-devices).                                                                                                                                                                                                                                 |
| `perf_cloud_quality`    | `number`  | `1.5`     | Cloud detail level. Controls how many puffs each cloud shape gets. `0.5` = low, `1` = medium, `1.5` = high, `2` = ultra.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `perf_effects`          | `number`  | `1`       | Weather effects intensity. `0` disables visual effects like shooting stars, comets, aurora, fog/wind visuals, and similar atmospheric extras. `1` enables default spawn rates. `2` increases effect intensity and spawn rates (comets appear 1.8x more often). Spawn rates also scale with `perf_fps` and overall system performance. See [Troubleshooting: No night effects (stars/comets) are visible](#no-night-effects-starscomets-are-visible) and [Performance is weak on older devices](#performance-is-weak-on-older-devices). |
| `perf_fauna`            | `number`  | `2`       | Birds and planes spawn rate. `0` = no fauna, `1` = birds only, `2` = birds and planes. Separate control from weather effects. See [Troubleshooting: No birds or planes are visible](#no-birds-or-planes-are-visible).                                                                                                                                                                                                                                                                                                                  |
| `animation_speed`       | `number`  | `1.0`     | Global animation speed multiplier. Range `0` to `3`. `0` freezes animated motion, `1.0` is default speed, `2.0` is double speed.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `bird_animation_speed`  | `number`  | `1.0`     | Bird-only speed multiplier. Range `0` to `3`. Applied on top of `animation_speed` for bird movement and wing flapping.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `star_animation_speed`  | `number`  | `1.0`     | Star twinkle speed multiplier. Range `0` to `2`. Applied on top of `animation_speed` for nighttime star twinkle only. `0` stops twinkling, `1.0` is default speed.                                                                                                                                                                                                                                                                                                                                                                     |
| `perf_dpr`              | `number`  | `2`       | Canvas sharpness. Controls the device pixel ratio used for rendering. `0.5` = low, `1` = medium, `1.5` = high, `2` = full retina. Lower values reduce GPU load on high-DPI screens. See [Troubleshooting: Performance is weak on older devices](#performance-is-weak-on-older-devices).                                                                                                                                                                                                                                                |
| `fauna_bird_density`    | `number`  | `1.0`     | Bird spawn rate multiplier. Range `0.5` to `2.0`. Scales how often bird flocks appear. `0.5` = sparse, `1.0` = default, `2.0` = frequent. Only works with `perf_fauna: 1` or `2`. See [Troubleshooting: No birds or planes are visible](#no-birds-or-planes-are-visible).                                                                                                                                                                                                                                                              |
| `fauna_plane_density`   | `number`  | `1.0`     | Plane spawn rate multiplier. Range `0.5` to `2.0`. Scales how often planes appear. `0.5` = sparse, `1.0` = default, `2.0` = frequent. Only works with `perf_fauna: 2`. See [Troubleshooting: No birds or planes are visible](#no-birds-or-planes-are-visible).                                                                                                                                                                                                                                                                         |
| `fauna_bird_flock_size` | `number`  | `6`       | Target average birds per flock. Range `1` to `20`. Runtime fallback is `6`. If `perf_mode: default` is active and no explicit value is set, the editor preset applies `8`. Actual flock size is randomized around this value (about ±2) and occasional single-bird passes can still occur. See [Troubleshooting: Editor values differ from runtime defaults](#editor-values-differ-from-runtime-defaults).                                                                                                                             |
| `fauna_birds_at_night`  | `boolean` | `true`    | Controls whether birds can appear at night. Set to `false` for daytime-only birds. Planes are unaffected. See [Troubleshooting: No birds or planes are visible](#no-birds-or-planes-are-visible).                                                                                                                                                                                                                                                                                                                                      |

</details>

<details>
<summary><strong>Examples</strong></summary>

#### Custom Fauna Configuration

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
perf_fauna: 2 # Enable both birds and planes
fauna_bird_density: 1.5 # 50% more bird flocks
fauna_plane_density: 0.7 # 30% fewer planes
fauna_bird_flock_size: 10 # Higher average flock size (actual spawn count still varies)
fauna_birds_at_night: false # Disable birds during night
```

#### Animation Speed Control

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
animation_speed: 1.0 # Global animation speed (0.0-3.0)
bird_animation_speed: 1.4 # Birds only; multiplied on top of animation_speed
star_animation_speed: 0.6 # Stars only; twinkle speed (0.0-2.0)
```

</details>

## Troubleshooting

<details>
<summary><strong>Installation & Updates</strong></summary>

### Editor preview stutters or FPS looks wrong after install/update

1. Clear your browser cache completely (cached images and files) right after installation or update.
2. If it still stutters, close the editor and open it again.

### Card shows red error card or module not found

1. Verify the resource URL is correct: `/local/atmo-weather-card/atmo-weather-card.js`.
2. Verify all files exist in `config/www/atmo-weather-card/`:

- `atmo-weather-card.js`
- `atmo-weather-card-editor.js`
- `atmo-weather-animations.js`
- `atmo-weather-config.js`
- `atmo-weather-fauna.js`

### Changes are not visible after update

1. Clear browser cache completely (cached images and files).
2. Hard-refresh the dashboard.
3. Verify the Lovelace resource still points to `/local/atmo-weather-card/atmo-weather-card.js`.
4. If needed, reload Home Assistant frontend once.

</details>

<details>
<summary><strong>Layout & Editor</strong></summary>

### Editor values differ from runtime defaults

1. The editor can show preset values when `perf_mode` is active.
2. Example: `fauna_bird_flock_size` runtime fallback is `6`, but the `default` preset applies `8` if no explicit value is set.
3. Set your value explicitly if you want to override preset behavior.

### Card always stays in front of other cards

1. Set `Layer Order` (`card_stack_order`) to `1`.
2. Higher values place the card further in front of other cards.

### Card appears behind other cards or becomes hard to see

1. Increase `card_stack_order` step by step (for example `1`, then `2`).
2. Check `card_offset` and card placement if cards visually overlap.

### Attribute shows N/A after changing a chip's sensor

1. Since v6.6.5, changing a chip's entity (`entity`, `name_sensor`, `sub_value_entity`, `gauge_entity`) automatically clears its attribute field, since the previously selected attribute may not exist on the new entity.
2. On older versions, manually clear or re-select the attribute field after switching the entity.
3. Update to the latest release to get this automatic reset.

</details>

<details>
<summary><strong>Data & Effects</strong></summary>

### Weather entity is unavailable or values look wrong

1. Verify `weather_entity` exists and is currently available in Home Assistant.
2. Confirm the entity has valid state/attributes (temperature, wind, etc.).
3. If unavailable, fix entity availability first, then reload the dashboard.

### No birds or planes are visible

1. Check `perf_fauna`:

- `0` = no fauna
- `1` = birds only
- `2` = birds and planes

2. Check your density settings (`fauna_bird_density`, `fauna_plane_density`) and wait a short time for spawns.

### No night effects (stars/comets) are visible

1. Verify day/night detection is correct (`sun_entity`, card color mode, and weather conditions).
2. Ensure `perf_effects` is `1` or `2`.
3. Wait briefly after state transitions for particle initialization.

</details>

<details>
<summary><strong>Display & Performance</strong></summary>

### Chip value shows no decimal places, or the unit disappeared

1. On "Auto" (no `value_precision` set), decimal places follow Home Assistant's own **Display Precision** for that entity/attribute (**Settings → Devices & services → Entities** → your entity → **Advanced settings**). The card does not control this.
2. Set `value_precision` (`0`, `1`, or `2`) on the chip to force an exact number of decimals regardless of the entity's own precision.
3. Make sure you're on v6.6.4 or later — earlier versions could drop the unit or trim trailing zero decimals while `value_precision` was set.

### Performance is weak on older devices

1. Set `perf_mode: low`.
2. Lower `perf_fps` and/or `perf_dpr`.
3. Reduce fauna/effects intensity if needed.
4. On high-DPI displays, reducing `perf_dpr` usually helps the most.

</details>

## Maintenance

Atmo Weather Card is an independent, actively maintained Lovelace card project. See [Maintenance & Archive Info](MAINTENANCE.md) for maintenance status and historical background.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
