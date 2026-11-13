<!--
  Source of the documentation page (docs/index.html on GitHub Pages).
  npm run build turns this file into the page; every YAML example gets a "Show live" button.
  Level 2 headings are the sections in the navigation, level 3 the entries below them.
-->

## Setup

These entities connect the card to Home Assistant. Only `weather_entity` is required.

| Option               | Type     | Default | Description                                                                                                                                                                                                                             |
| :------------------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`weather_entity`** | `string` | —       | **Required.** Your weather integration entity (e.g., `weather.your_weather_entity`). See [Troubleshooting: Weather entity is unavailable or values look wrong](#weather-entity-is-unavailable-or-values-look-wrong).                    |
| `sun_entity`         | `string` | —       | _Recommended._ Usually `sun.sun`. Switches between day and night and drives sunrise and sunset colors, the blue hour, sun rays and the moving sun. Without it the card always shows day. How it also sets the card colors is explained in [Color Mode](#color-mode). |
| `moon_phase_entity`  | `string` | —       | _Recommended._ Displays the correct moon phase (e.g., `sensor.moon_phase`).                                                                                                                                                             |
| `precipitation_entity` | `string` | —     | _Optional._ A sensor with the current rain intensity in mm/h (or in/h). The editor lists only sensors with one of these units. Rain and snow then follow the measured amount, from drizzle to downpour. Without it the density follows the weather state. See [Weather Data & Sky Light](#weather-data). |

## Examples

The card is meant to be pretty flexible. You can customize these examples however you like, mix different elements, or combine them with other Home Assistant cards. If you want the exact look from the screenshots, use the [weather icons](#weather-icons) guide.

Replace the entity IDs and the `icon_path` folder with your own. `grid_options` at the end is the standard Home Assistant option for the size of a card in the sections view.

### Forecast Slider
<img width="480" alt="Forecast slider example" src="https://github.com/user-attachments/assets/7ce1551c-d815-4eae-8556-a81825ea5606" />

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
perf_mode: ultra
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
    sub_value_attribute: templow
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 1
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 2
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 3
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 4
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 5
    icon: weather
    forecast_precision: 0
    icon_path: /local/your-icon-folder/
    unit_format: °
    sub_value_attribute: templow
grid_options:
  rows: auto
```

### Forecast & Mini-graph
<img width="480" alt="Forecast and mini-graph example" src="https://github.com/user-attachments/assets/aaa02a6b-1c90-4d8e-ac9f-cd42d4e49d31" />

This example embeds a mini-graph-card with a bit of card-mod styling. It needs [mini-graph-card](https://github.com/kalkih/mini-graph-card) and [card-mod](https://github.com/thomasloven/lovelace-card-mod), both available in the Marketplace. For extra drama, the large header text is layered behind the weather elements.

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
perf_mode: ultra
perf_fps: 30 # Ultra quality at 30 fps
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
    value_weight: "700"
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    sub_value_attribute: templow
    sub_value_position: beside
    forecast_precision: 0
    name: Today
    icon: weather
    label_overflow: marquee
    icon_path: /local/your-icon-folder/
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    sub_value_attribute: templow
    sub_value_position: beside
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

### Forecast & Ring Chip
<img width="480" alt="Forecast and ring chip example" src="https://github.com/user-attachments/assets/560953d6-563d-400f-8d2f-f2a99383efbb" />

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
perf_mode: ultra
perf_fps: 30 # Ultra quality at 30 fps
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
    sub_value_attribute: templow
    sub_value_position: beside
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
    sub_value_attribute: templow
    sub_value_position: beside
grid_options:
  rows: auto
```

## Appearance

The card has a visual editor for setting up layouts. All YAML settings are listed below; press **Show live** on an example to run it in the card on the right.

### Where to find things in the editor

The visual editor groups settings into collapsible panels, top to bottom. The editor is in English and German and follows your Home Assistant language; other languages show English. Every panel has a **Help** button with a short explanation and a link to the matching part of this documentation.

```
Card editor
├─ weather_entity, precipitation_entity    (always visible, top)
├─ Sun & Moon
│  ├─ sun_entity, moon_phase_entity
│  └─ Position & size ▸ celestial_position, celestial_alignment,
│                       celestial_x, celestial_y, celestial_size
├─ Appearance
│  ├─ Color mode ▸ card_color_mode, theme_entity
│  ├─ Card style ▸ card_style, card_height, card_padding
│  ├─ Frame & layers ▸ card_hide_text, card_square, card_full_width,
│  │                   card_mask_vertical, card_mask_horizontal,
│  │                   card_stack_order, card_offset
│  └─ Color filters ▸ card_filter_clouds, card_filter_sun
├─ Chips
│  ├─ the chips list (tabs per chip: Data, Text, Icon, Look, Position, Tap)
│  ├─ Quick add ▸ temperature, humidity, wind, rain chance, tomorrow
│  ├─ Chip area ▸ chip_area_position, chip_area_layout, chip_style,
│  │              chip_area_background, card_background_style
│  └─ Fine tuning ▸ gaps, sizes and colors of all chips
├─ Image
│  ├─ image_day, image_night (with preview)
│  ├─ Placement ▸ image_alignment, image_scale, image_x, image_y
│  └─ Switch image by state ▸ status_entity, status_day, status_night
├─ Embedded cards
│  └─ custom_cards_position, custom_cards (Home Assistant's card picker
│     and visual card editors), custom_cards_css_class
├─ Performance & effects
│  ├─ perf_mode
│  ├─ Graphics ▸ perf_fps, perf_cloud_quality, perf_effects, perf_dpr
│  ├─ Sky & light ▸ effect_blue_hour, effect_sun_rays, effect_haze,
│  │                effect_ground_mist, effect_cloud_coverage
│  ├─ Wind ▸ wind_style, wind_compass, wind_compass_position,
│  │         wind_compass_cardinal, wind_compass_degrees,
│  │         wind_compass_speed, wind_compass_background
│  ├─ Night sky ▸ effect_shooting_stars, shooting_star_rate,
│  │              effect_comets, comet_rate, star_animation_speed
│  ├─ Birds & planes ▸ fauna_birds, fauna_bird_density, bird_animation_speed,
│  │                   fauna_bird_flock_size, fauna_birds_at_night,
│  │                   fauna_planes, fauna_plane_density, fauna_plane_speed
│  └─ Animation ▸ animation_speed
└─ Tap action                              (bottom)
   └─ card_tap_action
```

The sections below document every option, including type, default, and behavior.

### Card Style & Layout

<p align="center"><img src="https://github.com/user-attachments/assets/a56047a4-8617-45d0-afdb-ea1edfda115b" alt="card_style standalone and immersive" width="560" /></p>

| Option             | Type                | Default     | Description                                                                                                                                                                                                                                                                                                                                                                     |
| :----------------- | :------------------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `card_style`       | `string`            | `standalone` | Set to `standalone` for a solid background with dynamic weather visuals, or `immersive` for a transparent background.                                                                                                                                                                                                                                                           |
| `card_height`      | `number` · `string` | `200`       | Height in pixels. Numbers are automatically treated as px (e.g., `110` becomes `110px`). **Set to `auto`** to dynamically fill the available height (for grid layouts).                                                                                                                                                                                                         |
| `card_padding`     | `string`            | `16px`      | Inner padding around the text. Accepts any CSS padding value (e.g., `8px`, `12px 20px`).                                                                                                                                                                                                                                                                                        |
| `card_hide_text`   | `boolean`           | `false`     | Hides all text overlays, including chips. The card's weather animations and configured chip settings remain available if you enable it again.                                                                                                                                                                                                                                   |
| `card_square`      | `boolean`           | `false`     | Forces the card into a perfect square. Highly useful for grid layouts.                                                                                                                                                                                                                                                                                                          |
| `card_full_width`  | `boolean`           | `false`     | Stretches the card edge-to-edge by removing side margins.                                                                                                                                                                                                                                                                                                                       |
| `card_offset`      | `string`            | `0px`       | Shifts the card using CSS margin (e.g., `"-50px 0px 0px 0px"`). Useful when layering cards.                                                                                                                                                                                                                                                                                     |
| `card_stack_order` | `number`            | _auto_      | Manually sets the z-index (e.g., `1`, `0`, `-1`). Useful for forcing an immersive card to display in front of cards with solid backgrounds. See [Troubleshooting: Card always stays in front of other cards](#card-always-stays-in-front-of-other-cards) and [Card appears behind other cards or becomes hard to see](#card-appears-behind-other-cards-or-becomes-hard-to-see). |
| `card_tap_action`  | `object`            | —           | A standard Home Assistant [tap action](https://www.home-assistant.io/dashboards/actions/).                                                                                                                                                                                                                                                                                      |

### Theme & Filters

<p align="center"><img src="https://github.com/user-attachments/assets/6fb3e7d7-77c5-41de-bbab-a46c2645c329" alt="card_color_mode light and dark" width="560" /></p>

<p align="center"><img src="https://github.com/user-attachments/assets/7082bf43-6c5d-4158-b657-5a007715721b" alt="card_filter_clouds presets: none, darken, vivid, muted, warm" width="760" /></p>

| Option                 | Type      | Default   | Description                                                                                                                                                                                                                                                            |
| :--------------------- | :-------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card_color_mode`      | `string`  | `auto`    | Controls the card's color scheme. By default, it follows your Home Assistant theme, or `theme_entity` if you set one. Use `dark` or `light` to lock the look. `night` and `day` override the sky content. The older `force_dark` and `force_light` still work. See [Colors](#color-mode). |
| `card_filter_clouds`   | `string`  | `none`    | Applies a visual filter preset to the clouds. Options: `none`, `darken`, `vivid`, `muted`, `warm`. |
| `card_filter_sun`      | `string`  | `none`    | Applies a visual filter preset to the sun glow. Same options as `card_filter_clouds`. An older `card_filter` value is applied to both automatically. |
| `card_mask_vertical`   | `boolean` | `true`    | _(Immersive only)_ Fades the top and bottom edges. Set to `false` to disable.                                                                                                                                                                                          |
| `card_mask_horizontal` | `boolean` | `true`    | _(Immersive only)_ Fades the left and right edges. Set to `false` to disable.                                                                                                                                                                                          |
| `theme_entity`         | `string`  | —         | Drives the card's color scheme from any entity's state instead of your HA theme. Commonly set to `sun.sun` to sync the card with sunrise/sunset. See [Colors](#color-mode).                                                                                            |

### Color Mode

The card's appearance depends on your **`sun_entity`** (sun or moon) and your **`card_color_mode`** (light or dark).

#### How to set this up

| Mode                     | Config                                                                        | What it does                                                                                                                                                                                                                                                                                                             |
| :----------------------- | :---------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Follow your HA theme** | `sun_entity: sun.sun`                                                         | The card shows the sun during the day and the moon at night, syncing its colors to whatever your Home Assistant theme is doing. Android and iOS can auto-toggle dark mode based on sunrise and sunset — this is exactly what the card was designed for.                                                                  |
| **Follow the sun**       | `sun_entity: sun.sun`<br>`theme_entity: sun.sun` | The card switches between light and dark at the real sunrise and sunset, regardless of what your Home Assistant theme is doing. Its colors match the time of day no matter what the rest of your dashboard looks like.                                                                                                   |
| **Force light or dark**  | `card_color_mode: dark`<br>or `card_color_mode: light`            | Locks the card's colors to one value. The sky still follows `sun_entity`, so you still get the moon and stars at night — only the card's colors are forced.                                                                                                                                                              |
| **Custom logic**         | `theme_entity: sensor.my_custom_mode`            | `theme_entity` can point at any entity — a template sensor, an `input_boolean`, or anything else. The card switches to its dark look when the state is `dark`, `night`, `evening`, `on`, `true`, or `below_horizon`. Anything else counts as light. Useful for rules like "dark after 9pm" or "dark when it's overcast". |

### Sun & Moon

The sun and moon share a single position and the card swaps them based on your `sun_entity`. See [Colors](#color-mode) for the full details. The card also automatically generates a dynamic **sunrise and sunset effect** based on the sun's elevation, and **rotates the moon** accurately based on your Home Assistant latitude setting.

| Option                | Type     | Default    | Description                                                                                                                                                                                                                                                             |
| :-------------------- | :------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `celestial_size`      | `number` | `62`       | Overrides the sun/moon diameter in pixels.                                                                                                                                                                                                                              |
| `celestial_position`  | `string` | `fixed`    | How the sun and moon are positioned. `fixed` uses the `celestial_alignment`, `celestial_x`, and `celestial_y` values. `dynamic_sun` animates the sun across the sky following the real solar arc (moon stays fixed). `dynamic_both` animates both the sun and the moon. |
| `celestial_alignment` | `string` | `top-left` | Where the sun and moon anchor inside the card. Uses a 9-cell grid (e.g., `top-left`, `center`, `bottom-right`). Also accepts `left`, `right` as shorthand.                                                                                                              |
| `celestial_x`         | `number` | `0`        | Horizontal offset in pixels from the anchored position.                                                                                                                                                                                                                 |
| `celestial_y`         | `number` | `0`        | Vertical offset in pixels from the anchored position.                                                                                                                                                                                                                   |

### Custom Images

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

### Embedded Cards

You can embed other Home Assistant cards directly inside this card. This is useful for adding buttons, specific sensors, weather forecasts, graphs and more.

| Option                   | Type     | Default  | Description                                                                                                 |
| :----------------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------- |
| `custom_cards`           | `list`   | —        | A list of cards to display. You can use standard Home Assistant cards or custom ones.                       |
| `custom_cards_position`  | `string` | _auto_   | Where the embedded cards sit: `top`, `center` or `bottom`, each optionally with `-left`, `-center` or `-right` (for example `bottom-right`). Without it the cards sit at the bottom, on the side opposite the chips. |
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

<a name="css-variables"></a>

### CSS Variables

> Most users won't need these. The options above cover all common use cases. These CSS variables are here for fine-tuning specific details like font sizes, shadows, and spacing, either in your theme or via `card_mod`.

#### Card variables

| Variable                       | Default      | Description                                                                                               |
| :----------------------------- | :----------- | :-------------------------------------------------------------------------------------------------------- |
| `--awc-card-border-radius`     | `12px`       | Adjusts the corner radius.                                                                                |
| `--awc-card-border-width`      | _HA theme_   | Overrides the card's border width. Inherits from the Home Assistant theme by default.                     |
| `--awc-card-padding`           | `16px`       | Padding space around the text.                                                                            |
| `--awc-stack-order`            | `-1` / `1`   | Controls the stacking order (z-index) of the card. Defaults to `-1` for immersive and `1` for standalone. |
| `--awc-custom-cards-direction` | `row`        | Flex direction of the custom cards container.                                                             |
| `--awc-custom-cards-gap`       | `8px`        | Gap between items in the custom cards container.                                                          |
| `--awc-custom-cards-justify`   | `flex-start` | Horizontal justification of the custom cards container.                                                   |
| `--awc-custom-cards-align`     | `flex-start` | Vertical alignment of the custom cards container.                                                         |

#### Text variables

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

#### Stacked and vertical chip variables

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

#### Card mod example

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

## Chips

Chips show values on the card: any entity or attribute, forecasts, rings and bars. This page lists every chip option and then walks through common setups.

<a name="chip-editor-structure"></a>

### Chips in the editor

Chips are the main layout element of this card. Each chip can show live entity data or forecast data, and you can add as many as you want. For a walkthrough on how to set them up, see the [Chips guide](#chips).

The chip list shows every chip with its live value. **Quick add** above the list creates a ready chip for the temperature, humidity, wind, rain chance or tomorrow's forecast. An open chip splits its settings into tabs:

```
Chip
├─ Data      ▸ Sensor or Forecast
│              Sensor: entity, attribute
│              Forecast: entity, forecast, forecast_offset,
│                        attribute ("Show"), forecast_precision
├─ Text      ▸ Label: hide_label, name, name_sensor, name_attribute,
│                     label_size, label_weight, label_overflow
│              Value: hide_value, fancy_unit, bearing_format, bearing_icon,
│                     bearing_speed, unit_format, value_precision,
│                     text_size, value_weight, overflow
│              Sub value: hide_sub_value, sub_value_entity, sub_value_attribute,
│                         sub_value_format, sub_value_size, sub_value_weight,
│                         sub_value_position, sub_value_overflow
│              Scrolling: marquee_rtl, marquee_speed (only with marquee)
├─ Icon      ▸ hide_icon, icon, icon_path, icon_size, icon_padding,
│              icon_background, icon_background_color
├─ Look      ▸ Type: text, ring or bar, with the ring_* or bar_* options
│                    and Ring/Bar entity (gauge_entity, gauge_attribute)
│              Layout: style, align, chip_round, background, background_color,
│                      width, height, padding, inner_gap, text_gap
├─ Position  ▸ position, position_anchor, position_x, position_y, behind_effects
└─ Tap       ▸ tap_action (for this chip only)
```

**Reset all styles** at the bottom of an open chip removes its style overrides, so it follows the chip area settings again.

> [!TIP]
> Changing the entity in **Data**, in **Label** (`name_sensor`), in **Sub value** (`sub_value_entity`) or in **Ring/Bar entity** (`gauge_entity`) clears that field's attribute automatically, because the old attribute may not exist on the new entity.

### Row options

<p align="center"><img src="https://github.com/user-attachments/assets/a0b0cdcb-b2fe-4f63-a688-3186efbf5814" alt="chip_style inline, stacked and vertical" width="760" /></p>

<p align="center"><img src="https://github.com/user-attachments/assets/90e01d4a-ebdf-4046-a93d-8fa24fd47d6b" alt="card_background_style frosted and contrast" width="560" /></p>

| Option                       | Type      | Default       | Description                                                                                                                                                                                                                                                                                           |
| :--------------------------- | :-------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chips`                      | `list`    | —             | The list of chips to display. Each entry is an object with its own settings (see below).                                                                                                                                                                                                              |
| `chip_area_position`         | `string`  | `bottom-left` | Where the chips row is positioned.                                                                                                                                                                                                                                                                    |
| `chip_area_layout`           | `string`  | `wrap`        | Row behavior. `wrap` moves overflowing chips to a new line, `horizontal-scroll` keeps them on one line with a hidden scrollbar and edge fades, `vertical-scroll` stacks them in a scrollable column, `grid` arranges them in equal columns. `scroll` is accepted as an alias for `horizontal-scroll`. |
| `chip_area_columns`          | `number`  | `3`           | Number of equal-width columns when `chip_area_layout: grid` is active.                                                                                                                                                                                                                                |
| `chip_area_align`            | `string`  | `start`       | How chips align inside the chip area. Options: `start`, `center`, `end`, `spread`. |
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

### Per-chip options

Each entry inside the `chips` list accepts the following keys.

| Option                  | Type      | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------- | :-------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity`                | `string`  | —           | **Required.** Any sensor, binary_sensor, or weather entity. Pointing it at the weather entity shows the current state (e.g., `Sunny`).                                                                                                                                                                                                                                                         |
| `attribute`             | `string`  | —           | Read a specific attribute of the entity instead of its state (e.g., `humidity` on a weather entity).                                                                                                                                                                                                                                                                                           |
| `forecast`              | `string`  | —           | Set to `daily` or `hourly` to show forecast data instead of live entity data. The chip's name is generated automatically (day names for daily, time for hourly). Requires the entity to be a weather entity.                                                                                                                                                                                   |
| `forecast_offset`       | `number`  | `0`         | Which forecast entry to display. `0` = today/now, `1` = tomorrow/next hour, and so on. Daily goes up to 6, hourly up to 23.                                                                                                                                                                                                                                                                    |
| `forecast_precision`    | `number`  | —           | Maximum number of decimal places for forecast values (0–2). Only limits the number shown; trailing zero decimals are trimmed (e.g. a whole number stays without a decimal point even at precision `1` or `2`).                                                                                                                                                                                 |
| `value_precision`       | `number`  | —           | Forces the chip's main value to always show exactly this many decimal places (0–2), padding with zeros if needed (e.g. `22` becomes `22.0` at precision `1`). Leave unset to use Home Assistant's own display precision for the entity/attribute ("Auto"). Does not apply to forecast chips — use `forecast_precision` for those.                                                              |
| `unit_format`           | `string`  | —           | Replaces the unit shown after the value. Placed directly after the value with no space, e.g. `°` turns `12 °C` into `12°`.                                                                                                                                                                                                                                                                     |
| `bearing_format`        | `string`  | `degrees`   | Shows a wind direction as degrees (`degrees`, the number as Home Assistant delivers it, e.g. `250`; add `unit_format: °` for the sign), as a compass point (`cardinal`, e.g. `WSW`) or as both (`both`, e.g. `WSW 250°`). Works on the `wind_bearing` attribute of a weather entity, live or forecast, and on sensors with the `wind_direction` device class. Compass points are in German or English. See [Wind compass](#wind-compass) for an image.                                                                     |
| `bearing_icon`          | `string`  | —           | Turns the chip icon into a pointer that follows the wind: `arrow` or `filled` point where the wind blows, like the wind lines; `needle` is a compass needle whose red tip points where the wind comes from. Works on the same chips as `bearing_format` and replaces `icon`.                                                                                                                                                                                                                                               |
| `bearing_speed`         | `boolean` | `false`     | Adds the wind speed of the weather entity after the direction, for example `NW · 6.5 mph`, in the unit of the entity. Only on chips that read `wind_bearing` of a weather entity, live or forecast.                                                                                                                                                                                                                                                                                                                        |
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
| `tap_action`            | `object`  | `more-info` | A standard Home Assistant [tap action](https://www.home-assistant.io/dashboards/actions/) scoped to this chip.                                                                                                                                                                                                                                                                                 |
| `name_sensor`           | `string`  | —           | An entity whose state (or attribute) is used as the chip's dynamic name label. Updates in real time.                                                                                                                                                                                                                                                                                           |
| `name_attribute`        | `string`  | —           | Reads a specific attribute from the `name_sensor` entity instead of its state.                                                                                                                                                                                                                                                                                                                 |
| `hide_sub_value`        | `boolean` | `false`     | Hides the optional secondary value.                                                                                                                                                                                                                                                                                                                                                            |
| `sub_value_entity`      | `string`  | —           | Entity used for the secondary value.                                                                                                                                                                                                                                                                                                                                                           |
| `sub_value_attribute`   | `string`  | —           | Attribute read from `sub_value_entity` instead of its state. On a forecast chip, `templow` shows the daily low next to the high. |
| `sub_value_format`      | `string`  | —           | Optional text format for the secondary value.                                                                                                                                                                                                                                                                                                                                                  |
| `sub_value_position`    | `string`  | `below`     | Where to display the secondary value. Use `beside` for an inline range such as `8 – 18`, or leave it unset to show it below the main value. |
| `sub_value_overflow`    | `string`  | `ellipsis`  | How the secondary value handles overflow. Uses the same options as `overflow`.                                                                                                                                                                                                                                                                                                                 |
| `position`              | `string`  | —           | Set to `custom` to detach this chip from the row and place it freely on the card using `position_anchor`, `position_x`, and `position_y`.                                                                                                                                                                                                                                                      |
| `position_anchor`       | `string`  | `top-left`  | Anchor point for a free-positioned chip. Uses a 9-cell grid (e.g., `top-left`, `center`, `bottom-right`).                                                                                                                                                                                                                                                                                      |
| `position_x`            | `string`  | `0`         | Horizontal offset for a free-positioned chip (e.g., `20px`, `10%`).                                                                                                                                                                                                                                                                                                                            |
| `position_y`            | `string`  | `0`         | Vertical offset for a free-positioned chip (e.g., `20px`, `10%`).                                                                                                                                                                                                                                                                                                                              |
| `behind_effects`        | `boolean` | `false`     | Places the chip behind the weather animations. Only works on free-positioned chips.                                                                                                                                                                                                                                                                                                            |

### Per-chip style overrides

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

### Ring & Bar gauge options

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

<a name="chips"></a>

### Chips & Forecasts

Chips are basically buttons you can optionally add to the card. You can add as many as you like and show live info, like current weather conditions or data from any Home Assistant entity, but also weather forecasts. You can leave them grouped in a row and make them all look the same (useful for building a daily forecast), or you can style and position each one individually. The option references are above; the walkthroughs below cover the "how" with examples.

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

#### Forecast chips

By default, a chip reads the current state of its entity. Setting `forecast` to `daily` or `hourly` switches it to forecast mode instead. In this mode, the chip subscribes to the weather entity's forecast data and displays a specific future entry.

Use `forecast_offset` to pick which entry: `0` is today (or now), `1` is tomorrow (or the next hour), and so on. The chip automatically generates a name label: day names like "Mon", "Tue" for daily, or times like "14:00" for hourly. You can still override this with `name` if you want a custom label.

When using `icon: weather` on a forecast chip, the icon matches the **forecasted** condition for that entry, not the current weather.

```yaml
chips:
  - entity: weather.your_weather_entity
    forecast: daily
    attribute: temperature
    forecast_offset: 1
    sub_value_attribute: templow
    sub_value_position: beside
    icon: weather
    icon_path: /local/weather-icons/
  - entity: weather.your_weather_entity
    forecast: hourly
    attribute: temperature
    forecast_offset: 3
    unit_format: "°"
```

The first chip shows tomorrow's temperature range (low – high) with a weather icon matching tomorrow's condition. The second chip shows the temperature 3 hours from now, with `°` directly after the value instead of the full unit.

For the full list of forecast-related options (`forecast`, `forecast_offset`, `forecast_precision`, `sub_value_attribute`, `sub_value_position`, `value_precision`, `unit_format`), see **Per-chip options** in [Appearance](#appearance).

#### Per-chip styling

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

#### Free positioning

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

#### Ring & bar gauges

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

## Weather Data & Sky Light

The card reads optional attributes of your weather entity and uses them to make each scene match the real sky. Every attribute is optional: if your weather integration does not provide one, the card looks exactly as it does without it. Nothing needs to be configured.

| Source                                         | Effect                                                                                                                                                                                                 |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cloud_coverage` (weather attribute, %)        | Sets the number of clouds, so 30 % cloud cover looks different from 70 %. In rain, snow and storms a cover below 70 % opens the cloud deck and leaves gaps, while at least 60 % of the usual clouds stay. |
| `visibility` (weather attribute, km or mi)     | Below 20 km a thin haze appears that gets denser towards the ground; at 2 km it is at full strength.                                                                                                     |
| `humidity` (weather attribute, %)              | Above 80 % humidity the air gets slightly hazy as well.                                                                                                                                                |
| `dew_point` + `temperature` (weather attributes) | When the temperature is within 2.5 °C of the dew point, ground mist drifts along the bottom of the card at night and in the morning (sun below 12°), not during downpours.                            |
| `precipitation_entity` (sensor, mm/h or in/h)  | Sets the rain and snow density: light drizzle just above 0 mm/h, a downpour from about 8 mm/h. The weather entity has no standard attribute for this, so the value comes from a sensor you choose in the editor.       |
| Sun elevation (`sun_entity`)                   | **Blue hour:** from sunset until the sun is 6° below the horizon (and before sunrise) the sky stays deep blue with a warm glow at the horizon, and the stars come out one by one until about 8°.        |
| Weather state + sun elevation                  | **Sun rays:** soft beams fan out from the sun in `partlycloudy` and `cloudy` weather, strongest with a low sun (below 35°) and not under a closed cloud cover (95 % or more).                         |

Cloud cover and precipitation are rounded into steps, so small sensor changes do not rebuild the scene every few minutes. Haze, ground mist and sun rays need `perf_effects` 1 or higher. The blue hour works in every mode, but it tints the sky only in the `standalone` card style, because the `immersive` style has no sky of its own.

Each of these effects can be switched off on its own, in the editor under **Performance & effects** › **Sky & light** or in YAML:

| Option                  | Type      | Default | Description                                                                                  |
| :---------------------- | :-------- | :------ | :------------------------------------------------------------------------------------------- |
| `effect_blue_hour`      | `boolean` | `true`  | Blue hour after sunset and before sunrise. Off: the night starts right at sunset.            |
| `effect_sun_rays`       | `boolean` | `true`  | Sun rays through broken clouds.                                                              |
| `effect_haze`           | `boolean` | `true`  | Haze from low visibility or humid air.                                                       |
| `effect_ground_mist`    | `boolean` | `true`  | Ground mist near the dew point.                                                              |
| `effect_cloud_coverage` | `boolean` | `true`  | Measured cloud cover sets the number of clouds. Off: a fixed amount per weather state. Sun rays still stay away under a closed cloud cover. |

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
effect_haze: false
effect_ground_mist: false
```

Shooting stars and comets have their own switches, see **Night sky** in [Performance](#performance).

## Performance

Pick a `perf_mode` preset first. A preset sets every option below whose default is _preset_. Any value you set yourself, with a slider in the editor or as an option in YAML, wins over the preset, and the editor then shows the preset as **Custom**. Remove the option, or pick the preset again in the editor, to follow the preset. Picking a preset in the editor writes only `perf_mode` and removes your own values.

| Preset    | Made for                                  | Frame rate | Cloud detail | Effects | Sharpness | Birds and planes | Bird / plane frequency | Birds per flock |
| :-------- | :---------------------------------------- | :--------- | :----------- | :------ | :-------- | :--------------- | :--------------------- | :-------------- |
| `low`     | Older tablets, wall panels, battery saving | 24         | 0.5          | 0       | 1         | none             | 0.5 / 0.5              | 4               |
| `default` | Most dashboards                           | 30         | 1.5          | 1       | 2         | both             | 1.0 / 1.0              | 8               |
| `ultra`   | Desktops and large wall displays          | 60         | 2.0          | 2       | 2         | both             | 1.5 / 1.5              | 12              |

Every preset also uses `animation_speed: 1`, `bird_animation_speed: 0.3`, `star_animation_speed: 0.5` and `fauna_birds_at_night: true`.

> [!TIP]
> The card stutters? Lower one value at a time, in this order: `perf_dpr`, `perf_fps`, `perf_effects`, `perf_fauna`. On high-DPI screens `perf_dpr` helps the most. See also [Performance is weak on older devices](#performance-is-weak-on-older-devices).

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
perf_mode: ultra
perf_fps: 30 # Ultra quality at 30 fps; the editor shows "Custom"
```

The options below follow the groups of the editor panel **Performance & effects**.

### Graphics

| Option                     | Type      | Default   | Description |
| :------------------------- | :-------- | :-------- | :---------- |
| `perf_mode`                | `string`  | `default` | Performance preset: `low`, `default` or `ultra`. See the table above. |
| `perf_fps`                 | `number`  | _preset_  | Animation frame rate: `24`, `30`, `45` or `60`. `30` saves battery, `60` is smoother. Shooting stars, comets, birds and planes appear equally often at every frame rate. See [Troubleshooting: Editor preview stutters or FPS looks wrong after install/update](#editor-preview-stutters-or-fps-looks-wrong-after-installupdate). |
| `perf_cloud_quality`       | `number`  | _preset_  | Cloud detail. Controls how many puffs each cloud shape gets. `0.5` = low, `1` = medium, `1.5` = high, `2` = ultra. |
| `perf_effects`             | `number`  | _preset_  | Weather effects. `0` turns off shooting stars, comets, fog banks, sun rays, haze and ground mist; the fog haze, the wind display (with fewer lines), the blue hour and the cloud amount from data stay. `1` is the normal amount. `2` brings more shooting stars and comets (comets about 1.8× as often) and turns on the two cloud options below. See [Troubleshooting: No night effects (stars/comets) are visible](#no-night-effects-starscomets-are-visible). |
| `perf_dpr`                 | `number`  | _preset_  | Canvas sharpness (device pixel ratio). `0.5` = low, `1` = medium, `1.5` = high, `2` = full retina. Lower values reduce GPU load on high-DPI screens. |
| `cloud_sun_angle_lighting` | `boolean` | _auto_    | YAML only. Lights clouds from the current sun angle. On by default when `perf_effects` is `2`. |
| `cloud_breathing_shapes`   | `boolean` | _auto_    | YAML only. Slowly reshapes clouds over time. On by default when `perf_effects` is `2`. |

### Sky & light

The switches for the blue hour, sun rays, haze, ground mist and the cloud amount from data are explained in [Weather Data & Sky Light](#weather-data).

### Wind

The wind follows `wind_speed` and `wind_bearing` of the weather entity. `wind_bearing` is where the wind comes from, as in Home Assistant. Clouds, rain, snow, hail and haze drift with it: wind from the east (0 to 180°) moves them to the left, wind from the west to the right. When the wind turns, the scene slows down, stops and sets off the other way over about ten seconds.

<p align="center"><img src="https://github.com/user-attachments/assets/336cf73a-0518-42d6-9534-aa927fe3b272" alt="wind_style lines and flow" width="560" /></p>

| Option       | Type     | Default | Description |
| :----------- | :------- | :------ | :---------- |
| `wind_style` | `string` | `lines` | Wind display. `lines` draws long wind lines (left in the image), `flow` a field of short streaks (right), `off` hides it. Shown in windy weather, and in rain, hail or snow from 40 km/h. |

#### Wind compass

An optional compass shows where the wind comes from. It is off by default. Pick a style in the editor under **Performance & effects ▸ Wind**. The arrow points where the wind blows, like the wind lines; the needles of the rose, chip and vane point into the wind, and the band shows the direction under its marker. North is up. When the wind turns, the compass turns with it over three seconds, always the short way round. Without `wind_bearing` on the weather entity the compass stays hidden.

<p align="center"><img src="images/wind-compass-styles.webp" alt="wind_compass styles arrow, rose, pill, band and vane" width="560" /></p>

| Option                  | Type     | Default | Description |
| :---------------------- | :------- | :------ | :---------- |
| `wind_compass`          | `string` | `off`   | `arrow` a wind arrow, `rose` a small compass rose, `pill` a compass chip with a frosted background, `band` a compass band like a heading display, `vane` a wind vane. `off` hides the compass. |
| `wind_compass_position` | `string` | `auto`  | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center` or `bottom-right`. `auto` uses the usual place of each style: arrow bottom left, rose and vane bottom right, chip top right, band bottom center. When chips already sit in that corner, `auto` moves the compass to the other edge on the same side, or else to the other side. |

The six places, here with the rose:

<p align="center"><img src="images/wind-compass-position.webp" alt="wind_compass_position top-left, top-center, top-right, bottom-left, bottom-center and bottom-right" width="560" /></p>

The text next to the compass is built from three switches. The compass point is in German or English, following your Home Assistant language (`O`, `SO`, `OSO` in German, `E`, `SE`, `ESE` in English); other languages show English. The wind speed keeps the unit of the weather entity, so it shows mph with the imperial unit system, or the unit you picked for the entity.

<p align="center"><img src="images/wind-compass-label.webp" alt="wind_compass label with compass point, degrees and wind speed, and the frosted background" width="560" /></p>

| Option                    | Type      | Default | Description |
| :------------------------ | :-------- | :------ | :---------- |
| `wind_compass_cardinal`   | `boolean` | `true`  | Shows the compass point, for example `WSW`. |
| `wind_compass_degrees`    | `boolean` | `false` | Shows the bearing in degrees, for example `250°`. |
| `wind_compass_speed`      | `boolean` | `false` | Shows the wind speed, for example `25 km/h`. |
| `wind_compass_background` | `boolean` | `false` | Puts a frosted box behind the compass, so it stays readable on a pale or busy sky. The chip always has one. |

```yaml scene=windy
type: custom:atmo-weather-card
weather_entity: weather.home
wind_compass: rose
wind_compass_position: bottom-right
wind_compass_degrees: true
wind_compass_speed: true
```

Chips can show the compass point too: set [`bearing_format`](#per-chip-options) on a chip that shows the wind direction, for example `cardinal` for `WSW` or `both` for `WSW 250°`. In the editor it is in the chip under **Text ▸ Value ▸ Wind direction as**.

A chip can also be a small compass of its own, in the chip row like any other chip: [`bearing_icon`](#opt-bearing_icon) turns its icon with the wind and [`bearing_speed`](#opt-bearing_speed) adds the speed. In the editor both sit next to **Wind direction as**.

<p align="center"><img src="images/chip-bearing-format.webp" alt="bearing_format degrees, cardinal and both on a wind direction chip" width="560" /></p>

```yaml scene=windy
chips:
  - entity: weather.home
    attribute: wind_bearing
    name: Wind
    bearing_format: cardinal
    bearing_icon: arrow
    bearing_speed: true
```

### Night sky

Shooting stars and comets appear on clear nights only; rain, snow, thunderstorms and fog hide them. They need `perf_effects` `1` or higher.

| Option                  | Type      | Default  | Description |
| :---------------------- | :-------- | :------- | :---------- |
| `effect_shooting_stars` | `boolean` | `true`   | Shooting stars on clear nights. |
| `shooting_star_rate`    | `number`  | `1`      | How often shooting stars appear. Range `0.25` to `3`. `1` is about one every 12 seconds on Ultra. |
| `effect_comets`         | `boolean` | `true`   | Comets on clear nights. |
| `comet_rate`            | `number`  | `1`      | How often comets appear. Range `0.25` to `3`. `1` is about one a minute on Ultra. |
| `star_animation_speed`  | `number`  | _preset_ | Star twinkle speed. Range `0` to `2`, applied on top of `animation_speed`. `0` stops twinkling; every preset uses `0.5`, so `1.0` twinkles twice as fast. |

```yaml scene=night
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
shooting_star_rate: 2 # twice as many shooting stars
comet_rate: 0.5 # half as many comets
```

### Birds & planes

`perf_fauna` sets what may fly at all; `fauna_birds` and `fauna_planes` switch each one off on its own.

| Option                  | Type      | Default  | Description |
| :---------------------- | :-------- | :------- | :---------- |
| `perf_fauna`            | `number`  | _preset_ | `0` = no birds or planes, `1` = birds only, `2` = birds and planes. Separate from `perf_effects`. See [Troubleshooting: No birds or planes are visible](#no-birds-or-planes-are-visible). |
| `fauna_birds`           | `boolean` | `true`   | Birds on or off. Birds need `perf_fauna` `1` or higher. |
| `fauna_bird_density`    | `number`  | _preset_ | How often bird flocks appear. Range `0.5` to `2.0`. `0.5` = sparse (Low), `1.0` = Default, `1.5` = Ultra, `2.0` = frequent. |
| `fauna_bird_flock_size` | `number`  | _preset_ | Average birds per flock. Range `1` to `20`. The presets use `4` (Low), `8` (Default) and `12` (Ultra). The real flock size varies by about ±2, and single birds pass now and then. |
| `bird_animation_speed`  | `number`  | _preset_ | Bird speed and wing flapping. Range `0` to `3`, applied on top of `animation_speed`. |
| `fauna_birds_at_night`  | `boolean` | `true`   | Birds can appear at night. Set to `false` for daytime-only birds. Planes are not affected. |
| `fauna_planes`          | `boolean` | `true`   | Planes on or off. Planes need `perf_fauna: 2`. With `fauna_birds: false` and `perf_fauna: 2` only planes fly. |
| `fauna_plane_density`   | `number`  | _preset_ | How often planes appear. Range `0.5` to `2.0`. `0.5` = sparse (Low), `1.0` = Default, `1.5` = Ultra, `2.0` = frequent. |
| `fauna_plane_speed`     | `number`  | `1.0`    | Plane speed. Range `0.25` to `3`. Near (bigger) planes always fly faster than distant ones; this scales all of them. |

#### Custom Fauna Configuration

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
perf_fauna: 2 # Birds and planes
fauna_bird_density: 1.5 # 50% more bird flocks
fauna_plane_density: 0.7 # 30% fewer planes
fauna_bird_flock_size: 10 # Higher average flock size (the real count still varies)
fauna_birds_at_night: false # No birds at night
fauna_plane_speed: 1.5 # Planes 50% faster
```

### Animation

| Option            | Type     | Default  | Description |
| :---------------- | :------- | :------- | :---------- |
| `animation_speed` | `number` | _preset_ | Speed of all motion. Range `0` to `3`. `0` freezes animated motion, `1.0` is normal speed, `2.0` is double speed. |

#### Animation Speed Control

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
animation_speed: 1.0 # All motion (0.0-3.0)
bird_animation_speed: 1.4 # Birds only; multiplied on top of animation_speed
star_animation_speed: 0.6 # Stars only; twinkle speed (0.0-2.0)
```

## Guides

<a name="layout-layering"></a>

### Layout & Layering

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

Press **Show live** on an immersive example and the live card sits in a small dashboard, so you can see how it blends in.

**Overlapping cards:** a negative `card_offset` pulls the card up so its sky reaches behind the card above, and `card_stack_order: -1` keeps it behind that card.

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
sun_entity: sun.sun
card_style: immersive
card_offset: "-36px 0px 0px 0px"
card_stack_order: -1
celestial_alignment: top-right
celestial_x: 16
celestial_y: 44
chips:
  - entity: weather.your_weather_entity
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 16px
    position_y: 48px
    hide_icon: true
    hide_label: true
    background: false
```

`custom_cards` can be placed in the same card for graphs, buttons, or other Lovelace cards. If elements overlap, adjust one property at a time: first `card_stack_order`, then `card_offset`, then the position of individual chips or embedded cards. Full option details are in [Appearance](#appearance).

<a name="weather-icons"></a>

### Weather Icons

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

<a name="custom-house-image"></a>

### Custom House Image

This explains how to create an image for your own home and use it in the card.

1. **Take a reference photo** from a corner angle to properly capture the depth of the house.
2. **Generate a 3D model** using an AI image tool. Use a prompt similar to:
   > _Isometric view of a modern minimalist architectural model section from the outside on solid white background. [Describe your floors/rooms]. Materials are matte white and light only. No complex textures, studio lighting, very clean, simplified shapes._
3. **Remove the background** with an online tool or image editor and save the resulting image as a transparent PNG.
4. **Create day and night variants** by adjusting the prompt appropriately.
5. **Upload the files** to your `config/www/images/` directory and reference them in the card config as `/local/images/my-house-day.png`.

<a name="weather-data"></a>

## Troubleshooting

### Installation & Updates

#### Editor preview stutters or FPS looks wrong after install/update

1. Clear your browser cache completely (cached images and files) right after installation or update.
2. If it still stutters, close the editor and open it again.

#### Card shows red error card or module not found

1. Verify the resource URL is correct: `/local/atmo-weather-card/atmo-weather-card.js`.
2. Verify all files exist in `config/www/atmo-weather-card/`:

- `atmo-weather-card.js`
- `atmo-weather-card-editor.js`
- `figtree-latin-wght-normal.woff2`
- `figtree-latin-ext-wght-normal.woff2`

#### Changes are not visible after update

1. Clear browser cache completely (cached images and files).
2. Hard-refresh the dashboard.
3. Verify the Lovelace resource still points to `/local/atmo-weather-card/atmo-weather-card.js`.
4. If needed, reload Home Assistant frontend once.

### Layout & Editor

#### Editor values differ from runtime defaults

1. Every performance option without a value of its own follows the `perf_mode` preset, in the editor and on the card alike (see [Performance](#performance)).
2. A value you set yourself wins, with a slider in the editor or as an option in YAML.
3. Remove the option to follow the preset again.

#### Card always stays in front of other cards

1. Lower **Layer Order** (`card_stack_order`) to `0`, or to `-1` for an immersive card.
2. Lower values move the card behind other cards, higher values in front.

#### Card appears behind other cards or becomes hard to see

1. Increase `card_stack_order` step by step (for example `1`, then `2`).
2. Check `card_offset` and card placement if cards visually overlap.

#### Attribute shows N/A after changing a chip's sensor

1. Changing a chip's entity (`entity`, `name_sensor`, `sub_value_entity`, `gauge_entity`) clears its attribute field automatically, because the old attribute may not exist on the new entity.
2. If the chip still shows N/A, pick the attribute again in the editor, or check in **Developer Tools** › **States** that the entity has this attribute.

### Data & Effects

#### Forecast chip shows "Please check your weather provider"

The chip appears in German or English, following your Home Assistant language (other languages show English), and means the weather entity delivers no forecast of the requested type.

1. Check that your weather integration offers this forecast. Many offer `daily` but not `hourly`.
2. Test it under **Developer Tools** → **Actions** with `weather.get_forecasts`.
3. Check the integration for errors, for example an expired API key. The chip shows the value again as soon as data arrives.

#### Weather entity is unavailable or values look wrong

1. Verify `weather_entity` exists and is currently available in Home Assistant.
2. Confirm the entity has valid state/attributes (temperature, wind, etc.).
3. If unavailable, fix entity availability first, then reload the dashboard.

#### No birds or planes are visible

1. `perf_mode: low` has no birds or planes. Pick `default` or `ultra`, or set `perf_fauna` yourself.
2. Check `perf_fauna`: `0` = none, `1` = birds only, `2` = birds and planes.
3. Check the switches `fauna_birds` and `fauna_planes`, and `fauna_birds_at_night` if it is night.
4. Birds and planes come and go. Wait a minute, or raise `fauna_bird_density` and `fauna_plane_density`.

#### No night effects (stars/comets) are visible

1. Verify that day and night are detected correctly: `sun_entity` is set, and `card_color_mode` is not `day`.
2. Shooting stars and comets only appear on clear nights. Rain, snow, thunderstorms and fog hide them.
3. Ensure `perf_effects` is `1` or `2`; `perf_mode: low` uses `0`.
4. Check the switches `effect_shooting_stars` and `effect_comets`, and raise `shooting_star_rate` or `comet_rate` if they are too rare.
5. Wait briefly after a weather change, the night sky builds up again.

### Display & Performance

#### Chip value shows no decimal places, or the unit disappeared

1. On "Auto" (no `value_precision` set), decimal places follow Home Assistant's own **Display Precision** for that entity/attribute (**Settings → Devices & services → Entities** → your entity → **Advanced settings**). The card does not control this.
2. Set `value_precision` (`0`, `1`, or `2`) on the chip to force an exact number of decimals regardless of the entity's own precision.
3. The unit comes from the entity's `unit_of_measurement`. If the entity has none, set `unit_format` on the chip to show a unit of your own.

#### Performance is weak on older devices

1. Set `perf_mode: low`.
2. Or keep a higher preset and lower single values, in this order: `perf_dpr`, `perf_fps`, `perf_effects`, `perf_fauna`.
3. On high-DPI displays, reducing `perf_dpr` usually helps the most.
4. Switch off single effects you do not need, see [Performance](#performance). Anything that is off costs nothing.
