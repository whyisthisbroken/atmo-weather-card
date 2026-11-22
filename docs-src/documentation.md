<!--
  Source of the documentation page (docs/index.html on GitHub Pages).
  npm run build turns this file into the page; every YAML example gets a "Show live" button.
  Level 2 headings are the sections in the navigation, level 3 the entries below them.
-->

## Setup

These entities connect the card to Home Assistant. Only `weather_entity` is required.

| Option               | Type     | Default | Description                                                                                                                                                                                                                             |
| :------------------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`weather_entity`** | `string` | —       | **Required.** Your weather integration entity (e.g., `weather.your_weather_entity`). The weather state, the forecasts and every reading come from it, unless you set [your own sensors](#your-own-sensors) for single readings. See [Troubleshooting: Weather entity is unavailable or values look wrong](#weather-entity-is-unavailable-or-values-look-wrong).                    |
| `sun_entity`         | `string` | —       | _Recommended._ Usually `sun.sun`. Switches between day and night and drives the golden hour, sunset colors, the blue hour, sun rays and the moving sun. Without it the card always shows day. How it also sets the card colors is explained in [Color Mode](#color-mode). |
| `moon_phase_entity`  | `string` | —       | _Optional._ A moon phase sensor, for example `sensor.moon_phase` from the **Moon** integration. Without it the card works out the phase from the date, within about a day, and draws it smoothly from a thin crescent to the full moon. |
| `precipitation_entity` | `string` | —     | _Optional._ A sensor with the current rain intensity in mm/h (or in/h). The editor lists only sensors with one of these units. Rain, snow and sleet then follow the measured amount, from drizzle to downpour; hail keeps its own. Without it the density follows the weather state. See [Weather Data & Sky Light](#weather-data). |

A new card added from the card picker starts with `card_layout: standard`: a big temperature, the condition and a quiet row of readings. In Home Assistant's **By entity** tab, a weather entity also suggests the card in its three layouts, see [Card layouts](#card-layouts).

Have a weather station? Wind, temperature, humidity, dew point, cloud cover and visibility can come from your own sensors instead of the weather entity, see [Your own sensors](#your-own-sensors).

## Examples

The card is meant to be pretty flexible. You can customize these examples however you like, mix different elements, or combine them with other Home Assistant cards. If you want the exact look from the screenshots, use the [weather icons](#weather-icons) guide.

Replace the entity IDs and the `icon_path` folder with your own. `grid_options` at the end is the standard Home Assistant option for the size of a card in the sections view.

The three large cards come first. After them, smaller cards each show one idea, grouped by topic: [forecasts](#forecast-layouts), [clocks and the night sky](#clocks--night), [your own sensors](#sensors--energy), [whole cards from one option](#one-option) and [card shapes](#card-shapes). Every example has a **Show live** button that runs it with demo data.

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

### Forecast layouts

Forecasts as a strip or as tiles.

#### Next hours

The next five hours in one grouped strip along the bottom. Five `hourly` forecast chips in a grid of five columns. `chip_area_width: 100%` spreads them over the full width.

<img width="480" alt="Next hours example" src="images/example-hourly.webp" />

```yaml scene=rainy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 200
chip_style: vertical
chip_area_position: bottom-center
chip_area_background: true
chip_area_grouped: true
chip_area_separator: true
chip_area_layout: grid
chip_area_columns: 5
chip_area_width: 100%
chips:
  - entity: weather.home
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 18px
    position_y: 14px
    text_size: 40px
    hide_icon: true
    hide_label: true
    background: false
    fancy_unit: true
    value_weight: "700"
  - entity: weather.home
    forecast: hourly
    forecast_offset: 1
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
  - entity: weather.home
    forecast: hourly
    forecast_offset: 2
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
  - entity: weather.home
    forecast: hourly
    forecast_offset: 3
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
  - entity: weather.home
    forecast: hourly
    forecast_offset: 4
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
  - entity: weather.home
    forecast: hourly
    forecast_offset: 5
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
```

#### Week ahead

Five days with high and low, each day on its own frosted tile. Five `daily` forecast chips, each with the low below the high (`sub_value_attribute: templow`).

<img width="480" alt="Week ahead example" src="images/example-week.webp" />

```yaml scene=sunny
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 210
chip_style: vertical
chip_area_position: bottom-center
chip_area_background: true
chip_area_layout: grid
chip_area_columns: 5
chip_area_width: 100%
chip_area_gap: 6px
chips:
  - entity: weather.home
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 18px
    position_y: 14px
    text_size: 40px
    hide_icon: true
    hide_label: true
    background: false
    fancy_unit: true
    value_weight: "700"
  - entity: weather.home
    forecast: daily
    forecast_offset: 1
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 2
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 3
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 4
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 5
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
```

#### Week with a curve

The week ahead with a soft line through the five highs above the tiles. `forecast_curve` draws it through the forecast chips; the card is a little taller, so the line has room. Try the other curves with the buttons under the live card.

<img width="480" alt="Week with a curve example" src="images/example-week-curve.webp" />

```yaml scene=sunny try=forecast_curve:line|soft|band|color
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 250
chip_style: vertical
chip_area_position: bottom-center
chip_area_background: true
chip_area_layout: grid
chip_area_columns: 5
chip_area_width: 100%
chip_area_gap: 6px
forecast_curve: soft
chips:
  - entity: weather.home
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 18px
    position_y: 14px
    text_size: 40px
    hide_icon: true
    hide_label: true
    background: false
    fancy_unit: true
    value_weight: "700"
  - entity: weather.home
    forecast: daily
    forecast_offset: 1
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 2
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 3
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 4
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 5
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
```

### Clocks & night

For wall tablets and the bedside table.

#### Bedside clock

A big clock under the night sky, with the weather in small type below. Point the first chip at a time sensor, for example `sensor.time` from the [Time & Date](https://www.home-assistant.io/integrations/time_date/) integration. The weather chip below shows the condition.

<img width="480" alt="Bedside clock example" src="images/example-clock.webp" />

```yaml scene=sunny,night
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 200
chips:
  - entity: sensor.time
    position: custom
    position_anchor: top-left
    position_x: 20px
    position_y: 12px
    text_size: 56px
    hide_icon: true
    hide_label: true
    background: false
    value_weight: "300"
  - entity: weather.home
    position: custom
    position_anchor: top-left
    position_x: 20px
    position_y: 86px
    hide_icon: true
    hide_label: true
    background: false
    text_size: 15px
```

#### Starry night

Only the sky: stars, more shooting stars and comets, the time small in a corner. `perf_mode: ultra` with `shooting_star_rate` and `comet_rate` at `3`. Shooting stars and comets need the dark look at night, see [Color Mode](#color-mode).

<img width="480" alt="Starry night example" src="images/example-stars.webp" />

```yaml scene=sunny,night
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 220
perf_mode: ultra
shooting_star_rate: 3
comet_rate: 3
chips:
  - entity: sensor.time
    position: custom
    position_anchor: bottom-right
    position_x: 16px
    position_y: 12px
    hide_icon: true
    hide_label: true
    background: false
    text_size: 15px
```

### Sensors & energy

Your own sensors next to the weather.

#### Energy at a glance

Ring gauges for solar, battery and grid, colored by their value. Ring chips for any numeric sensor. Replace the three sensors with your own and set `ring_max` to the largest value you expect.

<img width="480" alt="Energy at a glance example" src="images/example-energy.webp" />

```yaml scene=sunny
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 200
chip_area_gap: 8px
chips:
  - entity: weather.home
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 18px
    position_y: 14px
    text_size: 44px
    hide_icon: true
    hide_label: true
    background: false
    fancy_unit: true
    value_weight: "700"
  - type: ring
    style: vertical
    align: center
    padding: 10px
    height: 74px
    icon_size: 16px
    ring_width: 6
    ring_gap: 6
    ring_threshold_mode: gradient
    entity: sensor.solar_power
    name: Solar
    icon: mdi:solar-power
    ring_min: 0
    ring_max: 5
    ring_thresholds:
      - value: 0
        color: rgba(242,184,75,0.55)
      - value: 5
        color: rgba(242,184,75,1)
  - type: ring
    style: vertical
    align: center
    padding: 10px
    height: 74px
    icon_size: 16px
    ring_width: 6
    ring_gap: 6
    ring_threshold_mode: gradient
    entity: sensor.home_battery
    name: Battery
    icon: mdi:battery-high
    ring_thresholds:
      - value: 0
        color: rgba(229,83,75,0.9)
      - value: 40
        color: rgba(242,184,75,0.9)
      - value: 80
        color: rgba(63,185,80,0.9)
  - type: ring
    style: vertical
    align: center
    padding: 10px
    height: 74px
    icon_size: 16px
    ring_width: 6
    ring_gap: 6
    ring_threshold_mode: gradient
    entity: sensor.grid_power
    name: Grid
    icon: mdi:transmission-tower
    ring_max: 100
    ring_thresholds:
      - value: 0
        color: rgba(140,200,255,0.85)
      - value: 100
        color: rgba(40,110,230,1)
```

#### Room climate

Bar gauges for each room, stacked on the right. `type: bar` turns a chip into a bar gauge. `bar_min` and `bar_max` set the range, the thresholds color the bar.

<img width="480" alt="Room climate example" src="images/example-bars.webp" />

```yaml scene=cloudy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 250
chip_style: stacked
chip_area_position: top-right
chip_area_width: 190px
chip_area_background: true
chip_area_gap: 6px
chips:
  - entity: sensor.living_room_temperature
    name: Living room
    icon: mdi:sofa
    type: bar
    bar_min: 15
    bar_max: 28
    bar_threshold_mode: gradient
    bar_thresholds:
      - value: 15
        color: "#5aa9ff"
      - value: 21
        color: "#3fb950"
      - value: 28
        color: "#f0883e"
  - entity: sensor.bedroom_humidity
    name: Bedroom
    icon: mdi:bed
    type: bar
    bar_threshold_mode: gradient
    bar_thresholds:
      - value: 0
        color: "#f2b84b"
      - value: 50
        color: "#3fb950"
      - value: 100
        color: "#2f81f7"
  - entity: sensor.office_cpu_temperature
    name: Office PC
    icon: mdi:desktop-tower
    type: bar
    bar_max: 90
    bar_threshold_mode: solid
    bar_thresholds:
      - value: 0
        color: "#3fb950"
      - value: 70
        color: "#e5534b"
```

#### Inside and outside

Outside from the weather entity, inside from your sensors. Stacked chips: the first reads the weather entity, the others are your room sensors.

<img width="480" alt="Inside and outside example" src="images/example-indoor.webp" />

```yaml scene=snowy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 180
chip_style: stacked
chip_area_background: true
chips:
  - entity: weather.home
    attribute: temperature
    name: Outside
    icon: weather
  - entity: sensor.indoor_temperature
    name: Inside
    icon: mdi:sofa
  - entity: sensor.indoor_humidity
    name: Humidity
    icon: mdi:water-percent
```

#### Rain gauge

Rain follows your rain sensor; chips show the rate now and the chance today. With `precipitation_entity` the amount of rain follows your rain sensor in mm/h or in/h. The second chip shows today's chance of rain from the forecast.

<img width="480" alt="Rain gauge example" src="images/example-rain.webp" />

```yaml scene=rainy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 190
precipitation_entity: sensor.rain_rate
chip_area_background: true
chips:
  - entity: weather.home
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 18px
    position_y: 14px
    text_size: 44px
    hide_icon: true
    hide_label: true
    background: false
    fancy_unit: true
    value_weight: "700"
  - entity: sensor.rain_rate
    name: Rain now
    icon: mdi:weather-pouring
  - entity: weather.home
    forecast: daily
    forecast_offset: 0
    attribute: precipitation_probability
    name: Chance today
    icon: mdi:umbrella-outline
```

#### Wind station

Compass rose with degrees and speed, and a chip whose needle turns with the wind. `wind_compass: rose` shows where the wind comes from. The chip reads `wind_bearing` as a compass point, turns its needle with the wind and adds the speed.

<img width="480" alt="Wind station example" src="images/example-wind.webp" />

```yaml scene=windy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 190
wind_compass: rose
wind_compass_degrees: true
wind_compass_speed: true
chips:
  - entity: weather.home
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 18px
    position_y: 14px
    text_size: 44px
    hide_icon: true
    hide_label: true
    background: false
    fancy_unit: true
    value_weight: "700"
  - entity: weather.home
    attribute: wind_bearing
    name: Wind from
    bearing_format: cardinal
    bearing_icon: needle
    bearing_speed: true
  - entity: weather.home
    attribute: wind_speed
    name: Speed
    icon: mdi:weather-windy
```

### One option

Whole cards from a single `card_layout`. Each layout brings its height, its chips and the place of the sun; add your own chips to change what it shows. See [Card layouts](#card-layouts).

#### Panel

A tall card for a column of its own: the temperature with today's high and low, four tiles with wind, humidity, UV index and rain chance (the pressure or the sunset step in when a value is missing), and the next five hours under a soft curve.

<img width="300" alt="Panel example" src="images/example-panel.webp" />

```yaml scene=cloudy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_layout: panel
```

#### Home

The house that comes with the card, wet in the rain and snowy in the snow, with the sunset time, a big temperature, a tick ring compass and a frosted bar with humidity, wind and pressure. For your own house and room temperatures in the bar, see the [house guide](#custom-house-image).

<img width="480" alt="Home example" src="images/example-home.webp" />

```yaml scene=partlycloudy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_layout: home
```

### Card shapes

From a slim strip to a square tile.

#### Just the temperature

A big temperature and the condition over the live sky. Nothing else. Two free-placed chips and nothing else, so the sky gets the whole card.

<img width="480" alt="Just the temperature example" src="images/example-big-temp.webp" />

```yaml scene=partlycloudy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 170
chips:
  - entity: weather.home
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 18px
    position_y: 14px
    text_size: 64px
    hide_icon: true
    hide_label: true
    background: false
    fancy_unit: true
    value_weight: "700"
  - entity: weather.home
    position: custom
    position_anchor: top-left
    position_x: 20px
    position_y: 98px
    hide_icon: true
    hide_label: true
    background: false
    text_size: 15px
```

#### Compact strip

A slim card for the top of a dashboard: the sky and one line of values. A low card with one row of chips. It fits above other cards at the top of a dashboard.

<img width="480" alt="Compact strip example" src="images/example-compact.webp" />

```yaml scene=partlycloudy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 90
chip_area_position: top-left
chips:
  - entity: weather.home
    attribute: temperature
    icon: weather
    text_size: 20px
    value_weight: "700"
  - entity: weather.home
    attribute: humidity
    icon: mdi:water-percent
  - entity: weather.home
    attribute: wind_speed
    icon: mdi:weather-windy
```

#### Square tile

A square card for the sections view, next to your other tiles. `card_square: true` keeps the card square in any column width.

<img width="300" alt="Square tile example" src="images/example-square.webp" />

```yaml scene=fog
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_square: true
chips:
  - entity: weather.home
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 18px
    position_y: 14px
    text_size: 44px
    hide_icon: true
    hide_label: true
    background: false
    fancy_unit: true
    value_weight: "700"
  - entity: weather.home
    position: custom
    position_anchor: top-left
    position_x: 20px
    position_y: 70px
    hide_icon: true
    hide_label: true
    background: false
    text_size: 15px
  - entity: weather.home
    forecast: daily
    forecast_offset: 1
    attribute: temperature
    icon: weather
    forecast_precision: 0
    sub_value_attribute: templow
    sub_value_position: beside
```

#### Dashboard header

Immersive: no background, the sky melts into the dashboard. `card_style: immersive` drops the background, so the sky fades into the dashboard around it. Use **Show live** to see it between other cards.

<img width="480" alt="Dashboard header example" src="images/example-header.webp" />

```yaml scene=partlycloudy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_style: immersive
card_height: 150
chips:
  - entity: weather.home
    attribute: temperature
    position: custom
    position_anchor: top-left
    position_x: 16px
    position_y: 8px
    text_size: 48px
    hide_icon: true
    hide_label: true
    background: false
    fancy_unit: true
    value_weight: "700"
  - entity: weather.home
    position: custom
    position_anchor: top-left
    position_x: 20px
    position_y: 68px
    hide_icon: true
    hide_label: true
    background: false
    text_size: 15px
  - entity: weather.home
    attribute: humidity
    icon: mdi:water-percent
  - entity: weather.home
    forecast: daily
    forecast_offset: 1
    attribute: temperature
    icon: weather
    forecast_precision: 0
```

## Appearance

The card has a visual editor for setting up layouts. All YAML settings are listed below; press **Show live** on an example to run it in the card on the right.

### Where to find things in the editor

The visual editor groups settings into collapsible panels, top to bottom, ordered from what you set first to what you rarely touch. Inside a panel, each topic is a row with an icon and a short line about what it holds; a tap opens it, and only one topic is open at a time. The editor is in English and German and follows your Home Assistant language; other languages show English. Every panel has a **Help** button with a short explanation and a link to the matching part of this documentation.

```
Card editor
├─ weather_entity                          (always visible, top)
├─ Your own sensors (optional) ▸ precipitation_entity, wind_speed_entity,
│     wind_bearing_entity, temperature_entity, humidity_entity,
│     dew_point_entity, cloud_coverage_entity, visibility_entity
├─ Layouts ▸ card_layout (Standard, Compact, Wide, Home, Panel or Free)
├─ Card
│  ├─ Style & size ▸ card_style, card_height, card_padding,
│  │                 effect_text_scrim, card_square, card_hide_text
│  ├─ Colors ▸ card_color_mode, theme_entity,
│  │           card_filter_clouds, card_filter_sun
│  ├─ Position & layers ▸ card_full_width, card_mask_vertical,
│  │                      card_mask_horizontal (immersive only),
│  │                      card_stack_order, card_offset
│  ├─ Tap action ▸ card_tap_action
│  └─ Own CSS ▸ css
├─ Chips
│  ├─ the chips list (tabs per chip: Data, Text, Icon, Look, Position, Tap,
│  │   Conditions)
│  ├─ Quick add ▸ temperature, humidity, wind, rain chance, tomorrow
│  ├─ Chip area ▸ chip_area_position, chip_area_layout,
│  │              chip_area_columns or chip_area_scroll_count (by layout),
│  │              chip_style, chip_area_background, card_background_style
│  ├─ Chip area 2 ▸ chip_area_2 (position, layout, columns or scroll_count,
│  │                gap, style, background), when a chip uses area 2
│  ├─ Temperature curve ▸ forecast_curve, forecast_curve_height
│  └─ Fine tuning ▸ gaps, sizes and colors of all chips
├─ Sky & weather
│  ├─ Sun & moon ▸ sun_entity, moon_phase_entity, celestial_position,
│  │               celestial_alignment, celestial_x, celestial_y,
│  │               celestial_size
│  ├─ Light & clouds ▸ effect_blue_hour, effect_golden_hour,
│  │                   effect_sun_rays, effect_haze, effect_ground_mist,
│  │                   effect_frost, effect_cloud_coverage
│  ├─ Wind ▸ wind_style, leaf_density, wind_compass, wind_compass_position,
│  │         wind_compass_cardinal, wind_compass_degrees,
│  │         wind_compass_speed, wind_compass_background
│  ├─ Rain & snow ▸ rain_density, effect_rain_splash,
│  │                snow_density, effect_snow_edge, effect_spill
│  ├─ Night sky ▸ effect_shooting_stars, shooting_star_rate,
│  │              effect_comets, comet_rate, star_animation_speed
│  └─ Birds & planes ▸ fauna_birds, fauna_bird_density, bird_animation_speed,
│                      fauna_bird_flock_size, fauna_birds_at_night,
│                      fauna_planes, fauna_plane_density, fauna_plane_speed
├─ Images
│  ├─ image_day, image_night (with preview)
│  ├─ Day & night ▸ image_night_source, image_transition
│  ├─ Placement ▸ image_alignment, image_scale, image_max_width, image_x, image_y
│  ├─ Pictures by weather ▸ image_folder, image_folder_type
│  └─ Images by state ▸ image_conditions (list: entity, attribute, state,
│        image_day, image_night, with preview); status_entity, status_day,
│        status_night (only when the card already uses status_entity)
├─ Embedded cards
│  └─ custom_cards_position, custom_cards (Home Assistant's card picker
│     and visual card editors), custom_cards_css_class
└─ Performance                             (bottom)
   ├─ perf_mode
   ├─ Graphics ▸ perf_fps, perf_cloud_quality, perf_effects, perf_dpr
   └─ Animation ▸ animation_speed
```

The sections below document every option, including type, default, and behavior.

### Card layouts

`card_layout` gives the card a finished look with one option. Each layout sets the height, where the sun and moon stand, the chip row and a set of chips. Every value you set yourself wins over the layout, and so do your own chips: the layout's chips only show while the card has none of its own, unless you set `layout_chips: true`. Their labels are short words of the card in English and German (**Humidity**, **Wind**; **Luftfeuchte**, **Wind**), in other languages they come from Home Assistant, and a reading your weather entity does not report, such as the pressure, is left out. In the editor the layouts are the first panel, **Layouts**, each with a small picture and a line about it. Under **Chips** the editor lists the chips the layout shows right now (in Panel only the tiles your weather service fills); your first change to them, even a name, makes them chips of your own, so you can change, move or remove each one.

Picking a layout in the editor resets your own values for the settings that layout brings, and for the card height, the image placement and the look of the chip row, so an old value like `image_scale: 0` or `chip_area_align: spread` does not spoil its look. Everything else stays as it is: entities, sensors, performance, effects, birds and tap actions. A note says how many values were reset and has an **Undo** button. If the card has chips of its own, the editor asks two questions:

1. **Keep your own chips?** **Keep** leaves your chips and adds nothing of the layout's content: no chips of its own and no wind compass (Home); your own compass stays as it was. **Use the layout's chips** removes your chips and shows the layout as it comes, with its chips and compass.
2. After **Keep**: **Arrange them for the layout?** **Arrange** moves your chips into the layout's chip row: they lose their own place and look and take the look of the row. **Keep positions** leaves your chips exactly as they are.

**Undo** puts back the card exactly as it was before you picked the layout: the layout, your values and your chips. Picking a second layout right after the first still undoes back to the start. After a chip choice, **Change** goes back to the card right after the layout was picked and asks again; outside the questions it is in the Layouts panel. Any other change ends the step, so Undo never takes back something you did afterwards.

<img width="480" alt="card_layout standard, compact and wide" src="images/example-layouts.webp" />

| Option        | Type     | Default | Description |
| :------------ | :------- | :------ | :---------- |
| `card_layout` | `string` | —       | `standard`: a big, light temperature, the condition under it and a quiet row with humidity, wind and tomorrow. `compact`: one slim strip, about 96 px high, with the temperature, the condition and two readings. `wide`: for wall tablets and wide columns from about 700 px, a very big temperature on the left and humidity, wind, pressure and tomorrow in two columns on the right. On a card narrower than 600 px it shows the standard layout instead, so it also works in a phone column. `home`: a house on the right, [the one that comes with the card](#bundled-house) or your own (`image_day`, `image_night`); the sunset time top left, a big temperature and the condition bottom left, a tick ring compass top right and a frosted bar with values bottom right. `panel`: a tall card, about 440 px; the temperature and today's high and low on top, four tiles (wind, humidity with a bar, UV index with a colored bar, rain chance; when your weather service sends no UV index or rain chance, the pressure and then the sunset take the free place) and the next five hours under a soft curve. Without a value the card uses only your own settings. |
| `layout_chips` | `boolean` | `false` | With chips of your own: `true` shows the chips of the layout as well, yours after them. Does nothing without a `card_layout` or without own chips. The editor never sets it; write it in YAML if you want both. |

```yaml scene=partlycloudy try=card_layout:standard|compact|wide|home|panel
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_layout: standard
```

```yaml scene=rainy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_layout: compact
```

```yaml scene=sunny
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_layout: wide
```

<p align="center"><img src="images/example-layout-panel.webp" alt="card_layout panel by day and at night" width="480" /></p>

```yaml scene=cloudy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_layout: panel
```

<p align="center"><img src="images/example-layout-home.webp" alt="card_layout home with the bar of the layout and with own room chips" width="480" /></p>

`home` brings [a house of its own](#bundled-house): wet in the rain, snowy in the snow and with lit windows at night. A picture of your own replaces it, and `image_day: none` leaves the right half to the sky. On a narrow card the picture shrinks (`image_max_width: 58`), so it stays clear of the temperature. The bar at the bottom shows humidity, wind and pressure until you add your own chips; for room temperatures, keep the sunset, the temperature and the condition and put your rooms into the bar:

```yaml scene=rainy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_layout: home
chips:
  - entity: sun.sun
    attribute: next_setting
    icon: mdi:weather-sunset-down
    date_format: "%H:%M"
    position: custom
    position_anchor: top-left
    position_x: 20px
    position_y: 18px
    background: false
    hide_label: true
    text_size: 15px
    value_weight: "700"
    style: inline
  - entity: weather.home
    attribute: temperature
    unit_format: °
    position: custom
    position_anchor: bottom-left
    position_x: 18px
    position_y: 84px
    text_size: 72px
    value_weight: "700"
    hide_icon: true
    hide_label: true
    background: false
  - entity: weather.home
    position: custom
    position_anchor: bottom-left
    position_x: 21px
    position_y: 62px
    text_size: 16px
    hide_icon: true
    hide_label: true
    background: false
  - entity: sensor.living_room_temperature
    icon: mdi:sofa-outline
    hide_label: true
    unit_format: °
    value_precision: 0
  - entity: sensor.office_temperature
    icon: mdi:desk
    hide_label: true
    unit_format: °
    value_precision: 0
  - entity: sensor.bathroom_temperature
    icon: mdi:shower-head
    hide_label: true
    unit_format: °
    value_precision: 0
```

`panel` puts the next five hours into a [second chip area](#chip-area-2) at the bottom, under a `soft` [temperature curve](#forecast-curve). Pick another curve with `forecast_curve`, or `forecast_curve: off` for none.

`card_height` works with every layout: without it the card takes the layout's height, with it your height. Without a layout (**Free** in the editor) the card uses `card_height`, or 200 px.

A layout is a starting point. To change one detail, set that option yourself, for example `card_height: 240` on the standard layout, or add chips to replace the layout's chips with your own.

### Card Style & Layout

<p align="center"><img src="https://github.com/user-attachments/assets/a56047a4-8617-45d0-afdb-ea1edfda115b" alt="card_style standalone and immersive" width="560" /></p>

| Option             | Type                | Default     | Description                                                                                                                                                                                                                                                                                                                                                                     |
| :----------------- | :------------------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `card_style`       | `string`            | `standalone` | Set to `standalone` for a solid background with dynamic weather visuals, or `immersive` for a transparent background.                                                                                                                                                                                                                                                           |
| `card_height`      | `number` · `string` | `200`       | Height in pixels. Numbers are automatically treated as px (e.g., `110` becomes `110px`). **Set to `auto`** to dynamically fill the available height (for grid layouts).                                                                                                                                                                                                         |
| `effect_text_scrim` | `boolean`          | `true`      | A soft veil behind the chip row, light on a light sky and dark on a dark one, so the text stays readable. It sits at the bottom, or at the top when the chip row is at the top. Only with `card_style: standalone`. |
| `card_padding`     | `string`            | `16px`      | Inner padding around the text. Accepts any CSS padding value (e.g., `8px`, `12px 20px`).                                                                                                                                                                                                                                                                                        |
| `card_hide_text`   | `boolean`           | `false`     | Hides all text overlays, including chips. The card's weather animations and configured chip settings remain available if you enable it again.                                                                                                                                                                                                                                   |
| `card_square`      | `boolean`           | `false`     | Forces the card into a perfect square. Highly useful for grid layouts.                                                                                                                                                                                                                                                                                                          |
| `card_full_width`  | `boolean`           | `false`     | Stretches the card edge-to-edge by removing side margins.                                                                                                                                                                                                                                                                                                                       |
| `card_offset`      | `string`            | `0px`       | Shifts the card using CSS margin (e.g., `"-50px 0px 0px 0px"`). Useful when layering cards.                                                                                                                                                                                                                                                                                     |
| `card_stack_order` | `number`            | `1`         | Sets the z-index (e.g., `2`, `0`, `-1`). Higher values sit in front of other cards. Useful for forcing an immersive card to display in front of cards with solid backgrounds. See [Troubleshooting: Card always stays in front of other cards](#card-always-stays-in-front-of-other-cards) and [Card appears behind other cards or becomes hard to see](#card-appears-behind-other-cards-or-becomes-hard-to-see). |
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

Your own images switch to their night version with the sun, not with the color mode. Set `image_night_source: theme` to tie them to the color mode instead, see [Custom Images](#custom-images).

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

<a name="own-css"></a>

#### Own CSS without card_mod

The `css` option puts your own styles straight into the card, no card_mod needed. It is in the editor under **Card → Own CSS**. Use `:host` for the whole card and its variables, or the parts of the card: `#image-slot img` (house image), `#chips-row` (chip area), `.chip` (every chip), `.chip-free` (freely placed chips) and `#custom-cards-wrapper` (embedded cards). Your styles come after the card's own, so a rule of the same weight wins.

```yaml
type: custom:atmo-weather-card
weather_entity: weather.home
chips:
  - entity: weather.home
    attribute: temperature
  - entity: weather.home
    attribute: humidity
    icon: mdi:water-percent
  - entity: weather.home
    attribute: wind_speed
    icon: mdi:weather-windy
css: |
  .chip {
    background: rgba(255, 255, 255, 0.28);
    border: 1px solid rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(8px);
    border-radius: 999px;
    padding: 5px 12px;
  }
```

<p align="center"><img src="images/css-option.webp" alt="chips without css and as round frosted pills from the css option" width="480" /></p>

| Option | Type     | Default | Description |
| :----- | :------- | :------ | :---------- |
| `css`  | `string` | —       | CSS for the inside of the card. Changes apply at once, in the editor preview too. |

#### Card mod example

card_mod works as before. This example sets the text colors with `card_mod`; the same block works under `css` too.

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


#### Sun and weather for your own styles

The card tells your own styles (the `css` option or `card_mod`) where the sun stands and what the weather is, so your own image can react to it, for example with a shadow that turns with the sun. It needs a `sun_entity` (or `sun.sun`).

| Variable or attribute | Values | Description |
| :-------------------- | :----- | :---------- |
| `--awc-sun-x` | `-1` to `1` | East-west direction of the sun: `1` in the east, `-1` in the west. |
| `--awc-sun-y` | `-1` to `1` | North-south direction: `1` in the north, `-1` in the south. |
| `--awc-sun-elevation` | degrees | Height of the sun above the horizon, negative at night. |
| `--awc-sun-shadow` | `0` to `3` | Length of a shadow compared to the height of what casts it; `0` while the sun is down. |
| `--awc-sun-light` | `0` to `1` | Strength of direct sunlight: low sun, clouds, rain and fog weaken it, `0` at night. |
| `data-condition` | weather state | The weather the card shows, like `sunny`, `rainy` or `clear-night`, on the card element. |
| `data-daytime` | `day` or `night` | Day or night, as the sky shows it. |

This example gives your house image a soft shadow that follows the sun and fades under clouds, and lightens it a bit in snow. It assumes the house faces south, with east on the right of the picture; for a house facing north, drop the minus sign.

```yaml
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
image_day: /local/images/my-house-day.png
image_night: /local/images/my-house-night.png
image_scale: 70
image_max_width: 60
image_x: "16"
image_y: "12"
css: |
  #image-slot img {
    filter: drop-shadow(
      calc(var(--awc-sun-x, 0) * -10px)
      calc(var(--awc-sun-shadow, 0) * 3px + 2px)
      6px
      rgba(0, 0, 0, calc(var(--awc-sun-light, 0) * 0.45))
    );
  }
  :host([data-condition="snowy"]) #image-slot img {
    filter: brightness(1.08);
  }
```

## Images

Pictures in front of the sky: the house of the `home` layout, your own house by day and at night, pictures that change with the weather or with any entity, and a soft blend between them. The step-by-step guide at the end shows how to draw your house with an AI image tool.

<a name="bundled-house"></a>

### The house of the Home layout

The [`home` layout](#card-layouts) brings a house of its own, so the card looks finished without any picture. It is an invented house, rendered with Gemini, in six pictures: by day and at night, wet while it rains or storms (`rainy`, `pouring`, `lightning-rainy`, `lightning`, `hail`) and snowy while it snows (`snowy`, `snowy-rainy`). Day and night follow the sun, and the pictures [blend](#image-transition) into each other like your own.

The house is wide, so it is a little smaller than an own picture and stands bottom right, just above the bar (`image_alignment: bottom-right`, `image_scale: 55`, `image_y: "19%"`). Made bigger, it grows upwards from there, and on a narrow card it shrinks with `image_max_width`. To make it bigger, open **Image** → **Placement** in the editor or set `image_scale` yourself; your values win.

<p align="center"><img src="images/house-all.webp" alt="The house of the home layout by day, at night, in the rain and in the snow" width="560" /></p>

As soon as you set a picture of your own, `image_day`, `image_night`, `image_folder`, `image_conditions` or `status_entity`, your pictures replace the whole house. `image_day: none` shows no picture at all. The snowy house only shows while it snows; for snow that stays on the roof, use your own pictures with a sensor, see [Images by state](#image-conditions).


### Custom Images

You can add your own images (such as a house image) to the card. This works in both standalone and immersive modes. See the [Custom House Image](#custom-house-image) tutorial for a step-by-step guide.

| Option            | Type     | Default     | Description                                                                                                                                               |
| :---------------- | :------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image_day`       | `string` | —           | File path for the daytime image (e.g., `/local/house-day.png`). `none` shows no picture, also not the [house of the Home layout](#bundled-house). |
| `image_night`     | `string` | —           | File path for the nighttime image. Falls back to the day image if left empty.                                                                             |
| `image_night_source` | `string` | `sun`    | When the night images show. `sun`: from sunset to sunrise, like the sky. `theme`: while the card is dark, following the [Color Mode](#color-mode). Applies to `image_night`, `status_night` and the night images of `image_conditions`. Without a `sun_entity`, `sun` acts like `theme`. |
| `image_transition` | `number` | `1`       | Seconds one image takes to blend into the next when it changes: day to night, a state image, an entry of `image_conditions`. `0` switches at once, at most `10`. See [Blending between images](#image-transition). |
| `image_scale`     | `number` | `100`       | Image size as a percentage of the total card height.                                                                                                      |
| `image_max_width` | `number` | —           | The most of the card width the image may take, in percent, or a CSS size like `240px`. On a narrower card the whole image shrinks and stays at its spot, so it does not run into the values next to it. The [`home` layout](#card-layouts) uses `58`. In the editor: **Image** → **Placement** → **Max width**. |
| `image_alignment` | `string` | `top-right` | Image placement. Options: `top-left`, `top-center`, `top-right`, `center-left`, `center`, `center-right`, `bottom-left`, `bottom-center`, `bottom-right`. |
| `image_x`         | `string` | `0`         | Moves the image sideways from its spot in `image_alignment`, positive to the right. Pixels or CSS values such as `-20` or `10%`; a percentage is of the card width. |
| `image_y`         | `string` | `0`         | Moves the image away from the edge it sits at: down from the top, up from the bottom, down from the middle. Pixels or CSS values such as `10` or `-5%`; a percentage is of the card height. A layout's `image_x` and `image_y` only apply while you have not picked a spot yourself: with an `image_alignment` of your own the image sits exactly at that spot. |
| `status_entity`   | `string` | —           | Entity to monitor for a status-specific image (for example a door sensor).                                                                                |
| `status_day`      | `string` | —           | Day image to show while `status_entity` is active, open, or home.                                                                                         |
| `status_night`    | `string` | —           | Night image to show while `status_entity` is active, open, or home.                                                                                       |
| `image_conditions` | `list`  | —           | More images that each replace the house image while an entity has a given state, see [Images by state](#image-conditions). In the editor: section "Images by state". |
| `image_folder`    | `string` | —           | A folder with one picture per weather state, found by file name, see [Pictures by weather](#image-folder). In the editor: section "Pictures by weather". |
| `image_folder_type` | `string` | `webp`    | File ending of the pictures in `image_folder`: `webp`, `png`, `jpg` or `svg`. |

<a name="image-folder"></a>

#### Pictures by weather

With `image_folder` the card looks for a picture of the current weather on its own. Name each file after the weather state and put them all into one folder under `/config/www/`:

```
/config/www/house/
├─ sunny.webp          sunny-night.webp   (or clear-night.webp)
├─ partlycloudy.webp   partlycloudy-night.webp
├─ cloudy.webp         cloudy-night.webp
├─ rainy.webp          rainy-night.webp
├─ snowy.webp          snowy-night.webp
└─ fog.webp, lightning.webp, windy.webp, hail.webp …
```

<p align="center"><img src="images/image-folder.webp" alt="pictures from image_folder for sunny, pouring and a snowy night" width="560" /></p>

```yaml scene=rainy try=image_transition:0|1|3
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
image_day: /local/images/my-house-day.png
image_night: /local/images/my-house-night.png
image_folder: /local/images/my-house/
image_scale: 70
image_max_width: 60
image_x: "16"
image_y: "12"
```

On this page the folder holds pictures for sunny, rainy and snowy, by day and at night. Switch the weather of the live card to see them change; fog and the other states show the normal images.

You do not need a picture for every state. A missing one falls back to a close relative: `pouring` and `hail` to `rainy`, `lightning-rainy` to `lightning` and then `rainy`, `lightning` to `rainy`, `snowy-rainy` to `snowy` and then `rainy`, `windy-variant` to `windy`, `clear-night` to `sunny`. When nothing fits, `image_day` and `image_night` show as usual.

At night the card first tries the `-night` pictures (`rainy-night.webp`), then `image_night`, and only then the day picture of the weather. `image_night_source` decides when it is night, as for the other images.

[Images by state](#image-conditions) are checked first: an entry that matches wins over the folder, so snow on the roof can still beat the plain `snowy` picture.

The card cannot list a folder, so it asks for each file once. A file that is missing shows up once as a `404` line in the browser console; that is harmless. Save all pictures on the same canvas so the house does not jump when the weather changes (see [Blending between images](#image-transition)).

<a name="image-conditions"></a>

#### Images by state

`image_conditions` swaps the house image for any number of states: snow on the roof, a wet roof, fog, Christmas lights. The card checks the entries from top to bottom and shows the first one that matches. If none matches, `image_day` and `image_night` stay. `status_entity` keeps working and is checked before the list.

In the editor, the section **Images by state** holds the list: add an entry, pick the entity, choose one or more states (or type your own), and enter the day and night image. The arrows set the order. Without states, an entry shows its image while the entity is `on`, `open`, `home` and the like.

| Key           | Type               | Description                                                                                                         |
| :------------ | :----------------- | :------------------------------------------------------------------------------------------------------------------ |
| `entity`      | `string`           | Entity to watch. Required.                                                                                          |
| `state`       | `string` or `list` | State, or list of states, that shows the image. Upper and lower case do not matter. Without it the image shows while the entity is `on`, `true`, `open`, `unlocked`, `home` or `active`. |
| `attribute`   | `string`           | Compares this attribute of the entity instead of its state.                                                         |
| `image_day`   | `string`           | Image by day.                                                                                                       |
| `image_night` | `string`           | Image at night. With only one of the two images set, the entry shows that image day and night. Each entry needs at least one. |

Entries without an entity or without an image are skipped. While an entity is `unavailable` or `unknown`, its entry does not match.

```yaml nolive
image_day: /local/images/house-day.png
image_night: /local/images/house-night.png
image_conditions:
  - entity: binary_sensor.snow_on_roof
    image_day: /local/images/house-snow-day.png
    image_night: /local/images/house-snow-night.png
  - entity: weather.home
    state: [rainy, pouring, lightning-rainy, lightning]
    image_day: /local/images/house-wet-day.png
    image_night: /local/images/house-wet-night.png
  - entity: weather.home
    state: fog
    image_day: /local/images/house-fog.png
  - entity: input_boolean.christmas
    image_day: /local/images/house-christmas-day.png
    image_night: /local/images/house-christmas-night.png
```

Snow stays on the roof long after it stops snowing, so the weather state alone switches back too early. A template binary sensor that turns on with snowfall and stays on while it is cold fits better here; the card only needs its `on` state.

The order sets the priority: put the entry that should win at the top. In the example, the snow image beats the wet roof, and the Christmas image only shows when no weather image matches.

<a name="image-transition"></a>

#### Blending between images

When the image changes, the new one fades in under the old one first, then the old one fades out. The house never turns see-through on the way. `image_transition` sets how long that takes, in seconds; `0` switches at once like before. The card waits until the new image has loaded, so there is no empty moment in between. With "reduce motion" turned on in your system settings, images always switch at once.

Try it here: both cards get the same weather, the top one switches at once, the bottom one blends.

<div class="fade-demo" data-images="house"></div>

The demo uses the [house of the Home layout](#bundled-house). Its six pictures share one canvas, so the house sits at exactly the same spot in all of them. That is what makes the blend look smooth: if the house moves between two images, you see it slide. Save every variant from the same canvas size and position.

> [!TIP]
> Browsers keep images from `/local/` for a long time. If you replace an image under the same file name and still see the old one, add a version to the path, for example `/local/images/house-day.png?v=2`, and count it up after each change.

<a name="custom-house-image"></a>

### Custom House Image

Put your own home into the sky. A drawing of the house sits in the card, by day in daylight colors and at night with lit windows; the card swaps the two at sunset. Until you add yours, the `home` layout shows [the house that comes with the card](#bundled-house).

<img width="640" alt="Custom house image in the card, by day in the sun and at night in the rain" src="images/example-house.webp" />

1. **Take a reference photo** from a corner, so the picture shows two sides of the house and its depth.
2. **Let an AI image tool render the day picture.** Upload the photo and start with the prompt below; the house that comes with the card was made with it in Gemini. Two things in it matter most: flat light without shadows, and a plain chroma-green background, so the house can be cut out cleanly. Under "The house", add what the photo does not show well.

   ```text
   Photorealistic 3D architectural render of the house in the uploaded photo, shown as an isolated diorama on a flat rectangular base plate, placed on a solid, perfectly uniform chroma-green background (#00B140). No sky, no horizon, no gradient, no vignette.

   LIGHTING (most important): completely flat, neutral, shadowless studio lighting, as if lit evenly from all directions by a huge white dome. No sun, no key light, no light direction. NO cast shadows anywhere: none on the base plate, none under roofs or canopies, none from the chimney, hedges or shrubs, and NO shadow of the base plate on the green background. All facades are equally bright. Only extremely faint ambient occlusion in tight inner corners. Neutral white balance.

   The green background is a flat backdrop: it receives no shadow and casts no light, color or reflections onto the house or the base plate.

   Camera: elevated three-quarter view from the front-left, about 30° above the horizon, long-lens perspective that looks almost isometric. House and entire base plate fully visible and centered, occupying about 75% of the image width, with clear green margin on all sides. The base plate has straight, clean edges with a thin visible stone edge.

   The house:
   - shape, facade, roof, windows and doors as in the photo
   - (add what the photo does not show well, for example the color of the window frames or a carport)
   - base plate: the paths and the garden around the house, kept simple
   - no people, no cars, no animals, no text, no house number, no logos, no watermark, no frame

   Everything dry, neutral natural colors.
   Style: high-end architectural visualization, sharp detail, realistic materials, no cartoon look.
   Aspect ratio 4:3.
   ```

3. **Let it render the night picture as an edit of the first one**, in the same chat, so the house stays at exactly the same spot:

   ```text
   Now image 2 – night, as an exact edit of image 1: same house, same pixel position, same camera, same green background (#00B140, not darker). Keep the flat, shadowless lighting – no cast shadows. Dark, desaturated grey-blue moonlight tone on house and base plate (not a blue-painted wall), evenly on all facades. Warm 2700 K interior light in about half of the windows; the wall lamp beside the door is on and casts a soft warm glow onto the door area and path. Everything dry and matte – no puddles, no reflections. No text.
   ```

   <img width="480" alt="The same house by day and at night, on one canvas" src="images/house-pair.webp" />
4. **Cut out the house.** Remove the green background with an image editor or a background removal tool. Remove it from the edge inwards, not as "every green pixel", or the lawn and the hedge go too, and check closed gaps such as the space under a carport. Crop all pictures the same way, so the house keeps its place, and save them as PNG.
5. **Upload the files** to `config/www/images/` in Home Assistant, for example as `my-house-day.png` and `my-house-night.png`. They are then at `/local/images/my-house-day.png`.
6. **Add them to the card.** `image_day` and `image_night` set the pictures, `image_alignment`, `image_scale`, `image_x` and `image_y` place them (see [Custom Images](#custom-images)). Put the sun and moon where the house does not cover them, and the values into the free space next to it. Or let the [`home` layout](#card-layouts) do all of that, as in the example below.
7. **Optional: variants.** Ask for the house in the rain and in the snow, by day and at night, as further edits in the same chat, and switch to them with [`image_conditions`](#image-conditions). Snow, Christmas lights or anything else works the same way.

   ```text
   Now image 3 – rain, day, as an exact edit of image 1: same house, same pixel position, same camera, same green background. Keep the flat, shadowless lighting – no cast shadows. Overcast grey tone; roof tiles glossy wet, facade base slightly damp, paving dark and wet with shallow puddles and soft reflections, lawn and hedge darker and wet; cool, slightly desaturated grading. No falling raindrops. No text.

   Now image 4 – snow, day, as an exact edit of image 1: same house, same pixel position, same camera, same green background. Keep the flat, shadowless lighting – no cast shadows. Fresh thick snow (about 15 cm) on the roof, chimney top, window sills, hedges and shrubs; small icicles at the eaves; lawn fully snow-covered; footprints along the path to the door; cool white tones; facade and door colors unchanged. No falling snowflakes. No text.

   Now image 5 – rain at night, as an exact edit of image 2: same house, same pixel position, same green background. EVERY window is lit with warm light exactly as in image 2 – no dark window anywhere – and the door lamp is on. Keep the flat, shadowless lighting – no cast shadows. All surfaces wet: paving dark and glossy with puddles reflecting the warm window light and door lamp, glossy roof tiles, wet lawn. No falling raindrops. No text.

   Now image 6 – snow at night, as an exact edit of image 2: same house, same pixel position, same green background. EVERY window is lit with warm light exactly as in image 2 – no dark window anywhere – and the door lamp is on. Keep the flat, shadowless lighting – no cast shadows. Add the snow cover from image 4. The snow is a soft pale blue-grey in the moonlight, with a warm golden glow near the windows and door. No falling snowflakes. No text.
   ```

   <img width="480" alt="The same house in the rain and with snow on the roof, on the same canvas as the day image" src="images/house-variants.webp" />

The card from the picture above uses the [`home` layout](#card-layouts): the time of the next sunset at the top, the outside temperature large at the bottom left, and three rooms in the frosted bar under the house. While it rains or snows, the wet and the snowy house replace the normal one. Replace the room sensors with your own.

```yaml scene=sunny
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_layout: home
image_day: /local/images/my-house-day.png
image_night: /local/images/my-house-night.png
image_conditions:
  - entity: weather.home
    state: [snowy, snowy-rainy]
    image_day: /local/images/my-house-snow-day.png
    image_night: /local/images/my-house-snow-night.png
  - entity: weather.home
    state: [rainy, pouring, lightning-rainy, lightning]
    image_day: /local/images/my-house-rain-day.png
    image_night: /local/images/my-house-rain-night.png
chips:
  - entity: sun.sun
    attribute: next_setting
    icon: mdi:weather-sunset-down
    date_format: "%H:%M"
    position: custom
    position_anchor: top-left
    position_x: 20px
    position_y: 18px
    background: false
    hide_label: true
    text_size: 15px
    value_weight: "700"
    style: inline
  - entity: weather.home
    attribute: temperature
    unit_format: °
    position: custom
    position_anchor: bottom-left
    position_x: 18px
    position_y: 84px
    text_size: 72px
    value_weight: "700"
    hide_icon: true
    hide_label: true
    background: false
  - entity: weather.home
    position: custom
    position_anchor: bottom-left
    position_x: 21px
    position_y: 62px
    text_size: 16px
    hide_icon: true
    hide_label: true
    background: false
  - entity: sensor.living_room_temperature
    icon: mdi:sofa-outline
    hide_label: true
    unit_format: °
    value_precision: 0
  - entity: sensor.bedroom_temperature
    icon: mdi:bed-outline
    hide_label: true
    unit_format: °
    value_precision: 0
  - entity: sensor.bathroom_temperature
    icon: mdi:shower-head
    hide_label: true
    unit_format: °
    value_precision: 0
```

The layout places the picture, the sun, the wind compass and the bar. Without your own chips the bar shows humidity, wind and pressure; with them, keep the first three chips above (sunset, temperature, condition) and change only the rooms.

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
│                     date_format (forecast chips),
│                     label_size, label_weight, label_overflow
│              Value: hide_value, fancy_unit, bearing_format, bearing_icon,
│                     bearing_speed, unit_format or date_format (for a
│                     point in time), value_precision,
│                     text_size, value_weight, overflow
│              Sub value: hide_sub_value, sub_value_entity, sub_value_attribute,
│                         sub_value_format, sub_value_size, sub_value_weight,
│                         sub_value_position, sub_value_overflow
│              Scrolling: marquee_rtl, marquee_speed (only with marquee)
├─ Icon      ▸ hide_icon, icon, icon_path, icon_size, icon_padding,
│              icon_background, icon_background_color
├─ Look      ▸ Type: text, ring or bar, with the ring_* or bar_* options
│                    and Ring entity or Bar entity (gauge_entity, gauge_attribute)
│              Layout: style, align, chip_round, background, background_color,
│                      width, height, padding, inner_gap, text_gap
├─ Position  ▸ chip area 1 or 2 (area) or free (position, position_anchor,
│              position_x, position_y), behind_effects
├─ Tap       ▸ tap_action (for this chip only)
└─ Conditions ▸ visibility: entity state, entity value, screen size,
                 time and weekday, user (and/or/not groups in YAML)
```

**Reset all styles** at the bottom of an open chip removes its style overrides, so it follows the chip area settings again.

> [!TIP]
> Changing the entity in **Data**, in **Label** (`name_sensor`), in **Sub value** (`sub_value_entity`) or in **Ring entity** or **Bar entity** (`gauge_entity`) clears that field's attribute automatically, because the old attribute may not exist on the new entity.

### Row options

<p align="center"><img src="https://github.com/user-attachments/assets/a0b0cdcb-b2fe-4f63-a688-3186efbf5814" alt="chip_style inline, stacked and vertical" width="760" /></p>

<p align="center"><img src="https://github.com/user-attachments/assets/90e01d4a-ebdf-4046-a93d-8fa24fd47d6b" alt="card_background_style frosted and contrast" width="560" /></p>

| Option                       | Type      | Default       | Description                                                                                                                                                                                                                                                                                           |
| :--------------------------- | :-------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chips`                      | `list`    | —             | The list of chips to display. Each entry is an object with its own settings (see below).                                                                                                                                                                                                              |
| `chip_area_position`         | `string`  | `bottom-left` | Where the chips row is positioned.                                                                                                                                                                                                                                                                    |
| `chip_area_layout`           | `string`  | `wrap`        | Row behavior. `wrap` moves overflowing chips to a new line, `horizontal-scroll` keeps them on one line with a hidden scrollbar and edge fades, `vertical-scroll` stacks them in a scrollable column, `grid` arranges them in equal columns. `scroll` is accepted as an alias for `horizontal-scroll`. |
| `chip_area_columns`          | `number`  | `1`           | Number of equal-width columns when `chip_area_layout: grid` is active.                                                                                                                                                                                                                                |
| `chip_area_align`            | `string`  | `start`       | How chips align inside the chip area. Options: `start`, `center`, `end`, `spread`. |
| `chip_area_width`            | `string`  | —             | Limits the full row width (e.g., `60%` or `200px`). Useful to place the chips row next to the top text instead of spanning the card.                                                                                                                                                                  |
| `chip_area_height`           | `string`  | —             | Sets the height of the chips row (e.g., `120px`).                                                                                                                                                                                                                                                     |
| `chip_padding`               | `string`  | `5px 10px`    | Inner padding of each chip (e.g., `5px 10px`). Without a value inline chips use `5px 10px`, stacked chips `6px 10px 6px 6px` and vertical chips `6px 10px`.                                                                                                                                                                                                                                                        |
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
| `chip_area_2` | `object` | — | A second chip area with its own place, layout and look, for the chips with `area: 2`. See [Two chip areas](#chip-area-2). |
| `forecast_curve` | `string` | — | Draws a temperature curve over the forecast chips of the chip area that show the temperature (at least two): `line` (white), `soft` (thin and see-through), `band` (high and low with the range between, needs `templow`; without it a line) or `color` (colored by the temperature). `off` turns off a curve that a layout brings. See [Temperature curve](#forecast-curve). |
| `forecast_curve_height` | `number` | `46` | Room the curve takes above the chips, in pixels (24–120). |

### Per-chip options

Each entry inside the `chips` list accepts the following keys.

| Option                  | Type      | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------- | :-------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity`                | `string`  | —           | **Required.** Any sensor, binary_sensor, or weather entity. Pointing it at the weather entity shows the current state (e.g., `Sunny`).                                                                                                                                                                                                                                                         |
| `attribute`             | `string`  | —           | Read a specific attribute of the entity instead of its state (e.g., `humidity` on a weather entity).                                                                                                                                                                                                                                                                                           |
| `forecast`              | `string`  | —           | Set to `daily` or `hourly` to show forecast data instead of live entity data. The chip's name is generated automatically (day names for daily, time for hourly). Requires the entity to be a weather entity.                                                                                                                                                                                   |
| `forecast_offset`       | `number`  | `0`         | Which forecast entry to display. `0` = today/now, `1` = tomorrow/next hour, and so on. Daily goes up to 6, hourly up to 23. When your weather service sends fewer entries, a chip past the last one stays hidden instead of showing the last entry twice.                                                                                                                                                                                                                                                                    |
| `forecast_precision`    | `number`  | —           | Maximum number of decimal places for forecast values (0–2). Only limits the number shown; trailing zero decimals are trimmed (e.g. a whole number stays without a decimal point even at precision `1` or `2`).                                                                                                                                                                                 |
| `value_precision`       | `number`  | —           | Forces the chip's main value to always show exactly this many decimal places (0–2), padding with zeros if needed (e.g. `22` becomes `22.0` at precision `1`). Leave unset to use Home Assistant's own display precision for the entity/attribute ("Auto"). Does not apply to forecast chips — use `forecast_precision` for those.                                                              |
| `unit_format`           | `string`  | —           | Replaces the unit shown after the value. Placed directly after the value with no space, e.g. `°` turns `12 °C` into `12°`.                                                                                                                                                                                                                                                                     |
| `date_format`           | `string`  | —           | Prints a date or time with codes, like Home Assistant templates: `%a` day name, `%A` long day name, `%d` day, `%m` month, `%b`/`%B` month name, `%y`/`%Y` year, `%H` hour (24 h), `%I` hour (12 h), `%M` minute, `%S` second, `%p` AM/PM. A `-` after `%` drops the leading zero (`%-d` prints `5`). Works on the label of a forecast chip (`%a %-d.` prints `Thu 12.`) and on a value that is a point in time, such as `next_rising` of `sun.sun` (`%H:%M`). Without a code the usual text stays. |
| `bearing_format`        | `string`  | `degrees`   | Shows a wind direction as degrees (`degrees`, the number as Home Assistant delivers it, e.g. `250`; add `unit_format: °` for the sign; with `bearing_icon` or `bearing_speed` the sign is added), as a compass point (`cardinal`, e.g. `WSW`) or as both (`both`, e.g. `WSW 250°`). Works on the `wind_bearing` attribute of a weather entity, live or forecast, and on sensors with the `wind_direction` device class. Compass points are in German or English. See [Wind compass](#wind-compass) for an image.                                                                     |
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
| `area` | `number` | `1` | `2` puts the chip into the second chip area (`chip_area_2`). Freely placed chips (`position: custom`) belong to no area. |
| `visibility`            | `list`    | —           | Shows the chip only while every condition in the list holds. Same format as the `visibility` of Home Assistant cards: `state`, `numeric_state`, `screen`, `user`, `time`, and `and`/`or`/`not` groups. Hidden chips leave no gap. See [Show chips only when they matter](#chip-visibility). |
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
| `position_x`            | `string`  | `0`         | Horizontal offset for a free-positioned chip (e.g., `20px`, `10%`), measured inwards from the anchored edge. With a centered anchor (`center`, `top-center`, `bottom-center`) a positive value moves the chip to the right.                                                                                                                                                                                                                                                                                                                            |
| `position_y`            | `string`  | `0`         | Vertical offset for a free-positioned chip (e.g., `20px`, `10%`), measured inwards from the anchored edge. With a vertically centered anchor (`center`, `center-left`, `center-right`) a positive value moves the chip down.                                                                                                                                                                                                                                                                                                                              |
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
| `type`                                       | `string` | —               | Set to `ring` or `bar` to enable the gauge, or to `sun_path` on `sun.sun` for the arc of the sun, see [Sun path](#sun-path). |
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

<a name="date-format"></a>

`date_format` writes the day name, the date or the time your way, with the same codes as Home Assistant templates. On a forecast chip it changes the label, on a value that is a point in time, like the sunrise of `sun.sun`, the value itself.

<p align="center"><img src="images/date-format.webp" alt="date_format on forecast labels and on sunrise and sunset" width="480" /></p>

```yaml scene=partlycloudy
chip_style: vertical
chip_area_layout: grid
chip_area_columns: 5
chip_area_width: 100%
chip_area_background: true
chips:
  - entity: weather.home
    forecast: daily
    forecast_offset: 0
    attribute: temperature
    sub_value_attribute: templow
    icon: weather
    date_format: "%a %-d."
  - entity: weather.home
    forecast: daily
    forecast_offset: 1
    attribute: temperature
    sub_value_attribute: templow
    icon: weather
    date_format: "%a %-d."
  - entity: weather.home
    forecast: daily
    forecast_offset: 2
    attribute: temperature
    sub_value_attribute: templow
    icon: weather
    date_format: "%a %-d."
  - entity: sun.sun
    attribute: next_rising
    name: Sunrise
    icon: mdi:weather-sunset-up
    date_format: "%H:%M"
  - entity: sun.sun
    attribute: next_setting
    name: Sunset
    icon: mdi:weather-sunset-down
    date_format: "%H:%M"
```

In a grid every tile of a row gets the same width and height, so the sun times line up with the forecast tiles.

For the full list of forecast-related options (`forecast`, `forecast_offset`, `forecast_precision`, `sub_value_attribute`, `sub_value_position`, `value_precision`, `unit_format`), see **Per-chip options** in [Appearance](#appearance).

<a name="chip-area-2"></a>

#### Two chip areas

One chip area holds one row or grid. For a card with tiles in the middle and a forecast row at the bottom, add a second area with `chip_area_2` and give its chips `area: 2`. Both areas have their own place, layout, chip style and background; the chip sizes and colors of the card apply to both. In the editor, pick **Chip area 2** in a chip's **Position** tab, then set the area under **Chips → Chip area 2**.

<p align="center"><img src="images/chip-area-2.webp" alt="two tiles in the first chip area, the next hours in the second" width="480" /></p>

```yaml scene=cloudy
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 300
chip_area_position: top-left
chip_area_layout: grid
chip_area_columns: 2
chip_area_width: 100%
chip_area_background: true
chip_style: stacked
chip_area_2:
  position: bottom-left
  layout: grid
  columns: 4
  width: 100%
  style: vertical
forecast_curve: soft
chips:
  - entity: weather.home
    attribute: humidity
    icon: mdi:water-percent
  - entity: weather.home
    attribute: wind_speed
    icon: mdi:weather-windy
  - entity: weather.home
    forecast: hourly
    forecast_offset: 1
    attribute: temperature
    icon: weather
    area: 2
  - entity: weather.home
    forecast: hourly
    forecast_offset: 2
    attribute: temperature
    icon: weather
    area: 2
  - entity: weather.home
    forecast: hourly
    forecast_offset: 3
    attribute: temperature
    icon: weather
    area: 2
  - entity: weather.home
    forecast: hourly
    forecast_offset: 4
    attribute: temperature
    icon: weather
    area: 2
```

`chip_area_2` takes the names of the `chip_area_*` options without the prefix. Anything not set uses the default, not the value of the first area.

| Key                | Type      | Default    | Description |
| :----------------- | :-------- | :--------- | :---------- |
| `position`         | `string`  | `top-left` | Where the area sits, like `chip_area_position`. |
| `layout`           | `string`  | `wrap`     | `wrap`, `grid`, `horizontal-scroll` or `vertical-scroll`, like `chip_area_layout`. |
| `columns`          | `number`  | `1`        | Columns of the grid layout. |
| `scroll_count`     | `number`  | —          | Chips visible at once in a scroll layout. |
| `align`            | `string`  | `start`    | `start`, `center`, `end` or `spread`. |
| `width`, `height`, `padding`, `gap` | `string` | — | Like `chip_area_width`, `chip_area_height`, `chip_area_padding` and `chip_area_gap`. |
| `style`            | `string`  | `chip_style` | `inline`, `stacked` or `vertical`. Without it the area uses the card's `chip_style`. |
| `background`       | `boolean` | `false`    | A background behind each chip, like `chip_area_background`. |
| `background_style` | `string`  | `card_background_style` | `frosted`, `contrast` or `theme`. |
| `grouped`, `full_width`, `separator`, `hide` | `boolean` | `false` | Like the `chip_area_*` switches of the same name. |
| `background_color` | `string`  | —          | Like `chip_area_background_color`. |

The [temperature curve](#forecast-curve) draws over the first area when it has at least two forecast temperatures, else over the second.

<a name="forecast-curve"></a>

#### Temperature curve

`forecast_curve` draws the course of the temperature over the forecast chips, daily or hourly. It uses every forecast chip in the chip area that shows `temperature` (at least two) and puts a point above the middle of each. Freely placed chips do not count. With the chip area at the top of the card the curve sits below the chips. Where the card has no such chip row, like in the Home layout, the editor greys the option out and says why.

| Value   | Look |
| :------ | :--- |
| `line`  | A white line with points. Works on every sky. |
| `soft`  | A thin, see-through line with hollow points and a faint fill below. Quiet; fits frosted chips. |
| `band`  | The high in orange, the low in blue, the range between them filled. Needs `templow`; most hourly forecasts do not have it and then show the line. |
| `color` | Colored by the temperature: blue when cold, green when mild, orange when warm, red when hot, with a soft fill below. |

<p align="center"><img src="images/forecast-curve-modes.webp" alt="forecast_curve line, soft, band and color" width="480" /></p>

```yaml scene=sunny try=forecast_curve:line|soft|band|color|off
type: custom:atmo-weather-card
weather_entity: weather.home
sun_entity: sun.sun
card_height: 250
chip_style: vertical
chip_area_position: bottom-center
chip_area_background: true
chip_area_layout: grid
chip_area_columns: 5
chip_area_width: 100%
chip_area_gap: 6px
forecast_curve: color
chips:
  - entity: weather.home
    forecast: daily
    forecast_offset: 1
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 2
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 3
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 4
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
  - entity: weather.home
    forecast: daily
    forecast_offset: 5
    attribute: temperature
    icon: weather
    forecast_precision: 0
    unit_format: °
    sub_value_attribute: templow
```

Give the card enough height for the curve: about `forecast_curve_height` (46 px) more than without it. In the editor the curve is under **Chips → Temperature curve**.

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

<a name="chip-visibility"></a>

#### Show chips only when they matter

A chip with a `visibility` list shows only while every condition in it holds. The format is the same as the `visibility` of Home Assistant cards, so conditions copied from a card work here too. A hidden chip leaves no gap, the others move up. In the editor, the **Conditions** tab of a chip builds the list and says whether the chip is shown right now.

```yaml
chips:
  - entity: weather.home
    attribute: temperature
  - entity: weather.home
    attribute: uv_index
    name: UV
    visibility:
      - condition: numeric_state
        entity: weather.home
        attribute: uv_index
        above: 2
  - entity: weather.home
    attribute: wind_speed
    name: Wind
    visibility:
      - condition: screen
        media_query: "(min-width: 768px)"
      - condition: time
        after: "06:00"
        before: "22:00"
```

The UV chip appears only above UV index 2. The wind chip shows on tablets and larger screens between 06:00 and 22:00.

<p align="center"><img src="images/chip-visibility.webp" alt="a UV chip hidden at UV index 1 and shown at UV index 5" width="480" /></p>

| Condition       | Keys                                                                                                                         |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `state`         | `entity`, optional `attribute`, and `state` or `state_not` (one value or a list). A value that names an entity compares against that entity's state. |
| `numeric_state` | `entity`, optional `attribute`, `above` and/or `below`. Both may name an entity, then its state is the limit.               |
| `screen`        | `media_query`, a CSS media query such as `(max-width: 767px)`. The editor fills it from Phone, Tablet, Desktop and Wide screen. |
| `time`          | `after`, `before` (`HH:MM`, may cross midnight like `22:00` to `06:00`) and `weekdays` (`mon` … `sun`).                     |
| `user`          | `users`, a list of Home Assistant user ids.                                                                                  |
| `and`, `or`, `not` | `conditions`, a list of conditions. `not` hides the chip when all of them hold. The editor shows these groups but they are changed in YAML. |

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

<a name="sun-path"></a>

#### Sun path

`type: sun_path` on a chip with `sun.sun` draws the day as a flat arc: sunrise on the left, sunset on the right and the sun where it stands now; the way it has gone is drawn solid. At night the arc runs from sunset to the next sunrise with the moon on it. The label says **Daylight** or **Night** (in German **Tageslicht** or **Nacht**) unless you set a `name`, and the times follow the 12 or 24 hours of your Home Assistant profile, or `date_format`. In the editor it is the chip type **Sun path**, offered for sun entities.

<p align="center"><img src="images/chip-sun-path.webp" alt="a sun_path tile by day with the sun on the arc and at night with the moon" width="560" /></p>

```yaml scene=partlycloudy
chip_style: vertical
chip_area_layout: grid
chip_area_columns: 3
chip_area_width: 100%
chip_area_background: true
chips:
  - entity: weather.home
    attribute: humidity
    name: Humidity
    icon: mdi:water-percent
  - entity: weather.home
    attribute: wind_speed
    name: Wind
    icon: mdi:weather-windy
  - entity: sun.sun
    type: sun_path
```

It fits best as a tile in a grid row, as above. In a plain row it keeps the width of a tile. The colors of the solid part come from `--awc-sunpath-color` by day and `--awc-sunpath-night-color` at night ([Own CSS](#own-css)).

## Weather Data & Sky Light

<a name="weather-data"></a>

The card reads optional attributes of your weather entity, or the readings of [your own sensors](#your-own-sensors), and uses them to make each scene match the real sky. Every attribute is optional: if your weather integration does not provide one, the card looks exactly as it does without it. Nothing needs to be configured.

| Source                                         | Effect                                                                                                                                                                                                 |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cloud_coverage` (weather attribute, %)        | Sets the number of clouds, so 30 % cloud cover looks different from 70 %. In rain, snow and storms a cover below 70 % opens the cloud deck and leaves gaps, while at least 60 % of the usual clouds stay. |
| `visibility` (weather attribute, km or mi)     | Below 20 km a thin haze appears that gets denser towards the ground; at 2 km it is at full strength.                                                                                                     |
| `humidity` (weather attribute, %)              | Above 80 % humidity the air gets slightly hazy as well.                                                                                                                                                |
| `dew_point` + `temperature` (weather attributes) | When the temperature is within 2.5 °C of the dew point, ground mist drifts along the bottom of the card at night and in the morning (sun below 12°), not during downpours.                            |
| `precipitation_entity` (sensor, mm/h or in/h)  | Sets the rain, snow and sleet density: light drizzle just above 0 mm/h, a downpour from about 8 mm/h. Hail keeps its own amount. The weather entity has no standard attribute for this, so the value comes from a sensor you choose in the editor.       |
| Sun elevation (`sun_entity`)                   | **Golden hour:** below about 12° the light turns warm: the sky glows gold towards the horizon, clouds catch gold light on the side of the sun, and the sun itself turns gold. In the last degrees before sunset (and after sunrise) it deepens to orange and rose, with a touch of violet higher up, and after sunset the afterglow fades over the blue hour. It works in clear, partly cloudy and windy weather, weaker under clouds and in fog, not in rain or snow. Home Assistant updates the sun every two minutes near the horizon; the light glides to each new value. **Blue hour:** from sunset until the sun is 6° below the horizon (and before sunrise) the sky stays deep blue with a warm glow at the horizon, and the stars come out one by one until about 8°.        |
| Weather state + sun elevation                  | **Sun rays:** soft beams fan out from the sun in `partlycloudy` and `cloudy` weather, strongest with a low sun (below 35°) and not under a closed cloud cover (95 % or more).                         |
| `temperature` + `humidity` (weather attributes) | **Frost:** below 0 °C, or just above it in very humid air, rime grows on the card from the edges, see [Frost](#frost).                                                                               |

Cloud cover and precipitation are rounded into steps, so small sensor changes do not rebuild the scene every few minutes. Haze and ground mist glide to a new reading over about three seconds, so a weather service that reports once an hour does not make the mist jump. Haze, ground mist, frost and sun rays need `perf_effects` 1 or higher. The golden and the blue hour work in every mode, but they tint the sky only in the `standalone` card style, because the `immersive` style has no sky of its own; the golden light on the clouds shows in both styles.

### Frost

When it is cold, rime grows on the card like on a car windscreen: a milky, grainy layer of ice that creeps in from the edges in uneven patches. It comes from the `temperature` and `humidity` of your weather entity, or from [your own sensors](#your-own-sensors). Nothing needs to be configured.

| Temperature      | Humidity   | Frost                                                                                                     |
| :--------------- | :--------- | :-------------------------------------------------------------------------------------------------------- |
| above +3.5 °C    | any        | none                                                                                                      |
| 0 to +3.5 °C     | from 85 %  | rime at the edges, since on a clear morning the glass is colder than the air: clearly visible from about +1 °C, more the closer it gets to 0 °C and the more humid the air; not in rain, sleet or hail |
| 0 °C             | any        | rime along the edges and in the corners                                                                   |
| 0 to −12 °C      | any        | it reaches further in the colder it gets; from −12 °C it covers most of the card, the middle stays clearer |

Humidity sets how thick it is: dry cold gives a thin, fine rime, humid cold a thick, milky one. Without a humidity value the card uses a medium thickness below 0 °C and shows no rime above 0 °C.

- **It takes the light without moving.** In sunshine it is warmer and brighter towards the sun, with a few still points of light; under clouds and in fog it stays even and matte; at night it is cool and blue, a little brighter towards the moon.
- **It grows and thaws slowly.** When the readings change, it grows in over about a minute and thaws in about half a minute. When a dashboard opens, it fades in at the current amount.
- **Chips, the compass and the text stay on top** and readable.
- It shows in the `standalone` card style only, because the `immersive` style has no pane for it, and needs `perf_effects` 1 or higher.

<img width="640" alt="Frost on the card: a cold, humid morning, a clear noon and a frosty night" src="images/frost.webp" />

```yaml scene=frost
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
effect_frost: true
```

Switch it off with `effect_frost: false`, or in the editor under **Sky & weather** › **Light & clouds** › **Frost**.

### Your own sensors

A weather station on your house measures the wind, the temperature and the humidity where you live, often every minute, while a weather service models them for a grid of several kilometres. Every reading the card uses can come from a sensor of your own instead of the weather entity. In the editor they sit at the top under **Your own sensors (optional)**; each picker lists only sensors that fit, by unit or device class.

All of these are optional. The `weather_entity` is the one entity the card needs, and without your own sensors every reading comes from it, exactly as before. A sensor of your own only replaces the one reading you give it, and only while it delivers a valid value:

| Case | Value from |
| :--- | :--- |
| No sensor of your own set (the default) | the weather entity |
| Sensor set and delivering a number | your sensor, for this reading only |
| Sensor `unavailable`, `unknown`, not a number or deleted | the weather entity, automatically |
| The weather itself: sunny, rain, storm, fog … | always the weather entity |
| Forecasts in forecast chips | always the weather entity |

| Option | Replaces | Description |
| :--- | :--- | :--- |
| `wind_speed_entity` | `wind_speed` | Wind speed in km/h, mph, m/s, kn, ft/s or Beaufort. Moves the sky and drives the wind lines, the compass and the speed in wind direction chips. |
| `wind_bearing_entity` | `wind_bearing` | Where the wind comes from, in degrees or as a compass point like `NW`, as some stations report it. Turns the sky, the compass and turning chip icons. |
| `temperature_entity` | `temperature` | Temperature in °C or °F, for ground mist and frost. |
| `humidity_entity` | `humidity` | Relative humidity in %, for haze, ground mist and frost. |
| `dew_point_entity` | `dew_point` | Dew point in °C or °F. Without it, but with your own temperature or humidity, the card works the dew point out from both. |
| `cloud_coverage_entity` | `cloud_coverage` | Cloud cover in %. Sets the amount of clouds. |
| `visibility_entity` | `visibility` | Visibility in km, mi, m, ft or yd, for haze. |
| `precipitation_entity` |  | Rain rate in mm/h or in/h, see the table above. |

```yaml
type: custom:atmo-weather-card
weather_entity: weather.home
wind_speed_entity: sensor.station_wind_speed
wind_bearing_entity: sensor.station_wind_direction
temperature_entity: sensor.station_temperature
humidity_entity: sensor.station_humidity
```

- **The weather state stays with the weather entity.** Sunny, rain or a thunderstorm decide what kind of weather the card shows; your sensors decide how strong it is. If your station measures rain while the weather service still says sunny, it does not rain on the card.
- **Units come from the sensor**, so a station in °F, mph or miles works as it is.
- **A sensor that is missing, unknown or unavailable** falls back to the value of the weather entity, so the card keeps working while the station is offline.
- **Chips are separate.** A chip shows whatever entity you give it; pick your station sensors there too. A wind direction chip with **Show wind speed** uses `wind_speed_entity` when it is set, also on a wind direction sensor.

Each of these effects can be switched off on its own, in the editor under **Sky & weather** › **Light & clouds** or in YAML:

| Option                  | Type      | Default | Description                                                                                  |
| :---------------------- | :-------- | :------ | :------------------------------------------------------------------------------------------- |
| `effect_blue_hour`      | `boolean` | `true`  | Blue hour after sunset and before sunrise. Off: the night starts right at sunset.            |
| `effect_golden_hour`    | `boolean` | `true`  | Warm light on the sky, the clouds and the sun when the sun is low, orange to violet at sunset. Off: the sky stays blue until the sun sets. |
| `effect_sun_rays`       | `boolean` | `true`  | Sun rays through broken clouds.                                                              |
| `effect_haze`           | `boolean` | `true`  | Haze from low visibility or humid air.                                                       |
| `effect_ground_mist`    | `boolean` | `true`  | Ground mist near the dew point.                                                              |
| `effect_frost`          | `boolean` | `true`  | Rime on the card below 0 °C, or just above it in very humid air, see [Frost](#frost).        |
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
| `low`     | Older tablets, wall panels, battery saving | 20         | 0.5          | 0       | 1         | none             | 0.5 / 0.5              | 4               |
| `default` | Most dashboards                           | 30         | 1.5          | 1       | 2         | both             | 1.0 / 1.0              | 8               |
| `ultra`   | Desktops and large wall displays          | 60         | 2.0          | 2       | 2         | both             | 1.5 / 1.5              | 12              |

Every preset also uses `animation_speed: 1`, `bird_animation_speed: 0.3`, `star_animation_speed: 0.5` and `fauna_birds_at_night: true`.

### How the modes differ

- **`low`** saves where it counts: fewer frames, a lower resolution and no extra effects. The weather itself, the golden and the blue hour stay.
- **`default`** shows the full picture at 30 frames per second. Almost every effect is on, because the effects cost little.
- **`ultra`** shows the same picture twice as smoothly, at 60 frames per second, with a few extras on top (see the table below).

The frame rate decides most of the load, not the effects. `ultra` costs more than `default` almost only because of the doubled frame rate: `ultra` at 30 fps costs about the same as `default`. Turning off effects, cloud detail or birds in `default` saves only a fraction of that.

**Frame rates are 20, 30 or 60.** Screens refresh 60 times per second, and the card can only skip whole refreshes: every third (20 fps), every second (30 fps) or none (60 fps). Values in between would run at the next lower rate, 24 at 20 and 45 at 30, so the card turns older settings of `24` and `45` into `20` and `30`, which is what they showed anyway. Every frame rate moves the scene at the same speed and shows shooting stars, comets, birds and planes equally often; a higher one only moves more smoothly.

### What each mode shows

The columns follow `perf_effects` (`0` in `low`, `1` in `default`, `2` in `ultra`), birds and planes follow `perf_fauna`. If you set one of them yourself, the column of that value applies.

| Feature | low | default | ultra |
| :------ | :-: | :-----: | :---: |
| Weather scene, fog haze | yes | yes | yes |
| Cloud detail | 0.5 | 1.5 | 2.0 |
| Soft cloud edges, stronger depth | no | yes | yes |
| Clouds lit from the sun angle, changing shapes | no | no | yes |
| Sun corona | no | yes | yes |
| Soft clouds around sun and moon | no | yes | yes |
| Wind lines and flow | ½ | 1× | 1.5× |
| Faint wind streaks | no | yes | yes |
| Fog banks | no | yes | yes |
| Haze, ground mist, sun rays | no | yes | yes |
| Golden hour, blue hour | yes | yes | yes |
| Cloud amount from data | yes | yes | yes |
| Stars | yes | yes | brighter |
| Milky Way | no | yes | yes |
| Shooting stars | no | yes | longer tails |
| Comets | no | 1× | 1.8× |
| Birds and planes | no | yes | more, bigger flocks |
| Compass, chips, images, cards | yes | yes | yes |

- **Cloud detail** is `perf_cloud_quality`: how many puffs each cloud gets. In `low` the puffs are simple and round, and near and far clouds move less apart; from `default` on they get soft frayed edges and a stronger sense of depth.
- **Sun corona**: `low` draws the sun disc and its glow, without the moving corona around it.
- **Wind lines and flow** (`wind_style`) are always drawn; the number of lines follows the column.
- **Fog banks**: in `low` fog shows as an even haze, without the drifting banks.
- **Birds and planes** follow `perf_fauna`: `0` none, `1` birds only, `2` birds and planes. `ultra` sends them more often and with bigger flocks (`fauna_bird_density`, `fauna_plane_density`, `fauna_bird_flock_size`).

Some things depend on more than the mode:

- **Light or dark look at night.** The stars glow only in the dark look (see [Color Mode](#color-mode)). With the light look at night, the `standalone` card shows no stars and the `immersive` card shows golden stars. Shooting stars and comets need the dark look.
- **Weather.** Shooting stars and comets appear on clear and partly cloudy nights, not in rain, snow, storms, under a closed cloud deck or in fog. The Milky Way needs a clear night. Sun rays need `partlycloudy` or `cloudy` weather and a sun above the horizon. The golden hour is full in clear, partly cloudy and windy weather, weaker under clouds and in fog, and does not show in rain or snow.
- **Card style.** The `immersive` style has no sky of its own, so the blue hour and the golden hour do not tint the sky there; the golden light on the clouds still shows. Edge fades (`card_mask_vertical`, `card_mask_horizontal`) and `card_full_width` only work in the `immersive` style.
- **Sun entity.** Without `sun_entity` the card always shows day: no night sky, no golden or blue hour, no moving sun.
- **Switches.** Every effect with a switch (`effect_*`, `fauna_birds`, `fauna_planes`, `wind_style: off`) stays off when you turn it off, in every mode. A switch cannot turn on what the mode leaves out: with `perf_effects: 0`, `effect_sun_rays: true` still draws no sun rays.

> [!TIP]
> The card stutters? Lower one value at a time, in this order: `perf_fps` (it costs the most), `perf_dpr` (on high-DPI screens with a weak graphics chip), `perf_effects`, `perf_fauna`. See also [Performance is weak on older devices](#performance-is-weak-on-older-devices).

```yaml
type: custom:atmo-weather-card
weather_entity: weather.your_weather_entity
perf_mode: ultra
perf_fps: 30 # Ultra quality at 30 fps; the editor shows "Custom"
```

In the editor, **Performance** holds the preset, Graphics and Animation; the effects below sit in the panel **Sky & weather**, one topic each.

### Graphics

| Option                     | Type      | Default   | Description |
| :------------------------- | :-------- | :-------- | :---------- |
| `perf_mode`                | `string`  | `default` | Performance preset: `low`, `default` or `ultra`. See the table above. |
| `perf_fps`                 | `number`  | _preset_  | Animation frame rate: `20`, `30` or `60`. `20` and `30` save battery, `60` is the smoothest and costs the most. Older values `24` and `45` run as `20` and `30`, see [How the modes differ](#how-the-modes-differ). Shooting stars, comets, birds and planes appear equally often at every frame rate. See [Troubleshooting: Editor preview stutters or FPS looks wrong after install/update](#editor-preview-stutters-or-fps-looks-wrong-after-installupdate). |
| `perf_cloud_quality`       | `number`  | _preset_  | Cloud detail. Controls how many puffs each cloud shape gets. `0.5` = low, `1` = medium, `1.5` = high, `2` = ultra. |
| `perf_effects`             | `number`  | _preset_  | Weather effects. `0` turns off shooting stars, comets, the Milky Way, fog banks, sun rays, haze, ground mist and the soft clouds around the sun and moon, and draws simpler clouds and fewer wind lines; the weather scene, the fog haze, the golden hour, the blue hour and the cloud amount from data stay. `1` is the normal amount. `2` makes comets about 1.8 times as frequent, gives shooting stars longer tails and stars brighter halos, draws 1.5 times as many wind lines and turns on the two cloud options below. See [What each mode shows](#what-each-mode-shows). See [Troubleshooting: No night effects (stars/comets) are visible](#no-night-effects-starscomets-are-visible). |
| `perf_dpr`                 | `number`  | _preset_  | Canvas sharpness (device pixel ratio). `0.5` = low, `1` = medium, `1.5` = high, `2` = full retina. Lower values reduce GPU load on high-DPI screens. |
| `cloud_sun_angle_lighting` | `boolean` | _auto_    | YAML only. Lights clouds from the current sun angle. On by default when `perf_effects` is `2`. |
| `cloud_breathing_shapes`   | `boolean` | _auto_    | YAML only. Slowly reshapes clouds over time. On by default when `perf_effects` is `2`. |

### Sky & light

The switches for the blue hour, the golden hour, sun rays, haze, ground mist and the cloud amount from data are explained in [Weather Data & Sky Light](#weather-data).

### Wind

The wind follows `wind_speed` and `wind_bearing` of the weather entity. `wind_bearing` is where the wind comes from, as in Home Assistant. Clouds, rain, snow, hail and haze drift with it: wind from the east (0 to 180°) moves them to the left, wind from the west to the right. When the wind turns, the scene slows down, stops and sets off the other way over about ten seconds.

<p align="center"><img src="https://github.com/user-attachments/assets/336cf73a-0518-42d6-9534-aa927fe3b272" alt="wind_style lines and flow" width="560" /></p>

| Option       | Type     | Default | Description |
| :----------- | :------- | :------ | :---------- |
| `wind_style` | `string` | `lines` | Wind display. `lines` draws long wind lines (left in the image), `flow` a field of short streaks (right), `leaves` blows leaves across the card, `off` hides it. Shown in windy weather, and in rain, hail or snow from 40 km/h. |
| `leaf_density` | `number` | `1` | With `wind_style: leaves`: how many leaves fly. Range `0.25` to `3`. `1` is up to three at a time on a card of about 420 × 230 px; bigger cards get a few more. |

Leaves fly the way the wind blows, a few at a time. Some catch an updraft and rise, weak gusts let others sink, and each one tumbles as it turns. Their colours follow the season: green in spring and summer, yellow, orange and brown in autumn and winter. South of the equator, taken from the latitude in your Home Assistant settings, the seasons are the other way round. At night the leaves are darker.

```yaml scene=windy try=wind_style:lines|flow|leaves|off
type: custom:atmo-weather-card
weather_entity: weather.home
wind_style: leaves
leaf_density: 1.5
```

#### Wind compass

An optional compass shows where the wind comes from. It is off by default. Pick a style in the editor under **Sky & weather ▸ Wind**. The arrow points where the wind blows, like the wind lines; the needles of the rose, chip and vane and the pointer of the tick ring point into the wind, the arrow of the badge points where it blows, and the band shows the direction under its marker. North is up. When the wind turns, the compass turns with it over three seconds, always the short way round. Without `wind_bearing` on the weather entity the compass stays hidden.

<p align="center"><img src="images/wind-compass-styles.webp" alt="wind_compass styles arrow, rose, pill, band and vane" width="560" /></p>

| Option                  | Type     | Default | Description |
| :---------------------- | :------- | :------ | :---------- |
| `wind_compass`          | `string` | `off`   | `arrow` a wind arrow, `rose` a small compass rose, `pill` a compass chip with a frosted background, `band` a compass band like a heading display, `vane` a wind vane, `ticks` a ring of fine ticks with a pointer and the wind speed in the middle, `badge` a frosted tile with an arrow, the speed and the compass point (turn on `wind_compass_speed` for the speed). `off` hides the compass. |
| `wind_compass_position` | `string` | `auto`  | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center` or `bottom-right`. `auto` uses the usual place of each style: arrow bottom left, rose and vane bottom right, chip, tick ring and badge top right, band bottom center. With `auto` the card measures the chips once they are laid out and moves the compass to the first place where it covers none: the other edge on the same side, then the other side, then the middle of an edge. A chip area set to `100%` wide counts as its whole row. When no place is free, as in the `panel` layout, the compass stays hidden; pick a position to show it anyway. |

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

```yaml scene=windy try=wind_compass:arrow|rose|pill|band|vane|ticks|badge try=wind_compass_position:auto|top-left|top-center|top-right|bottom-left|bottom-center|bottom-right
type: custom:atmo-weather-card
weather_entity: weather.home
wind_compass: rose
wind_compass_position: bottom-right
wind_compass_degrees: true
wind_compass_speed: true
```

<p align="center"><img src="images/wind-compass-ticks-badge.webp" alt="wind_compass ticks and badge" width="560" /></p>

The tick ring and the badge show the speed best: turn on `wind_compass_speed`. The tick ring has room for the speed alone, so turn off `wind_compass_cardinal` there.

```yaml scene=windy try=wind_compass:ticks|badge try=wind_compass_cardinal:true|false try=wind_compass_degrees:true|false try=wind_compass_speed:true|false try=wind_compass_background:true|false
type: custom:atmo-weather-card
weather_entity: weather.home
wind_compass: ticks
wind_compass_speed: true
wind_compass_cardinal: false
```

Chips can show the compass point too: set [`bearing_format`](#per-chip-options) on a chip that shows the wind direction, for example `cardinal` for `WSW` or `both` for `WSW 250°`. In the editor it is in the chip under **Text ▸ Value ▸ Wind direction as**.

A chip can also be a small compass of its own, in the chip row like any other chip: [`bearing_icon`](#opt-bearing_icon) turns its icon with the wind and [`bearing_speed`](#opt-bearing_speed) adds the speed. In the editor both sit next to **Wind direction as**.

<p align="center"><img src="images/chip-bearing-format.webp" alt="bearing_format degrees, cardinal and both on a wind direction chip" width="560" /></p>

```yaml scene=windy try=chips.0.bearing_format:degrees|cardinal|both try=chips.0.bearing_icon:arrow|filled|needle
chips:
  - entity: weather.home
    attribute: wind_bearing
    name: Wind
    bearing_format: cardinal
    bearing_icon: arrow
    bearing_speed: true
```

### Rain & snow

Rain falls at a steady pace in long, soft drops. In a thunderstorm the sky is dark by day too, with heavy slate clouds, light rain and light text. Thin drops are fainter and read as farther away, and heavier weather has longer, faster drops: `pouring` more than `rainy`, thunderstorms in between. Part of the drops splash on the bottom edge of the card: the drop springs back in a small arc and two droplets fly out to the sides.

Snow falls slowly in soft flakes. Small flakes are fainter and slower, so they read as farther away, and every flake swings gently like a pendulum while the wind slants its path. Part of the flakes settle on the bottom edge and melt away, and a thin edge of snow builds up there.

The amount follows the weather state, or the [rain sensor](#weather-data) when you set one (for rain, snow and sleet; hail keeps its own), and grows with the size of the card, so a wall panel is not sparse and a small tile not crowded. The two density options scale it on top.

| Option               | Type      | Default | Description |
| :------------------- | :-------- | :------ | :---------- |
| `rain_density`       | `number`  | `1`     | Amount of rain. Range `0.25` to `3`. |
| `effect_rain_splash` | `boolean` | `true`  | Drops splash on the bottom edge of the card. |
| `snow_density`       | `number`  | `1`     | Amount of snow. Range `0.25` to `3`. Snow has no sensor of its own; a precipitation sensor that measures melted snow sets it too, and this scales it on top. |
| `effect_snow_edge`   | `boolean` | `true`  | A thin edge of snow builds up along the bottom of the card. |
| `effect_spill`       | `boolean` | `false` | Rain and snow fall out of the bottom of the card onto the dashboard and fade out within about 90 px. Below the card the drops take the colours of your dashboard theme. Cards right below get the falling weather drawn over them, so it suits a card with some space underneath. |

```yaml scene=rainy
type: custom:atmo-weather-card
weather_entity: weather.home
rain_density: 2 # twice as much rain
effect_rain_splash: false
```

```yaml scene=snowy
type: custom:atmo-weather-card
weather_entity: weather.home
snow_density: 1.5
effect_snow_edge: true
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

## Troubleshooting

### Installation & Updates

#### Editor preview stutters or FPS looks wrong after install/update

1. Clear your browser cache completely (cached images and files) right after installation or update.
2. If it still stutters, close the editor and open it again.

#### Card shows red error card or module not found

1. Installed through the Marketplace: check under **Settings** → **Dashboards** → **⋮** → **Resources** that a resource for `atmo-weather-card.js` exists, then clear the browser cache and reload.
2. Installed by hand: verify the resource URL is correct: `/local/atmo-weather-card/atmo-weather-card.js`.
3. Installed by hand: verify all files exist in `config/www/atmo-weather-card/`:

- `atmo-weather-card.js`
- `atmo-weather-card-editor.js`
- `figtree-latin-wght-normal.woff2`
- `figtree-latin-ext-wght-normal.woff2`

#### Changes are not visible after update

1. Clear browser cache completely (cached images and files).
2. Hard-refresh the dashboard.
3. Installed by hand: verify the Lovelace resource still points to `/local/atmo-weather-card/atmo-weather-card.js`, and that you copied both `.js` files.
4. If needed, reload Home Assistant frontend once.

### Layout & Editor

#### Editor values differ from runtime defaults

1. Every performance option without a value of its own follows the `perf_mode` preset, in the editor and on the card alike (see [Performance](#performance)).
2. A value you set yourself wins, with a slider in the editor or as an option in YAML.
3. Remove the option to follow the preset again.

#### Card always stays in front of other cards

1. Lower **Layer Order** (`card_stack_order`) to `0`, or to `-1` for an immersive card. Without a value of its own the card sits at `1`.
2. Lower values move the card behind other cards, higher values in front.

#### Card appears behind other cards or becomes hard to see

1. Increase **Layer Order** (`card_stack_order`) step by step (for example `2`, then `3`). Without a value of its own the card sits at `1`.
2. Check `card_offset` and card placement if cards visually overlap.

#### Attribute shows N/A after changing a chip's sensor

1. Changing a chip's entity (`entity`, `name_sensor`, `sub_value_entity`, `gauge_entity`) clears its attribute field automatically, because the old attribute may not exist on the new entity.
2. If the chip still shows N/A, pick the attribute again in the editor, or check in **Developer Tools** › **States** that the entity has this attribute.

#### Clouds, rain or the sun cover a chip

1. The chip most likely has `behind_effects: true`. It puts a free-positioned chip behind the weather animations, so a heavy sky covers it. New cards from older versions started with it on the big temperature chip, and older examples used it too.
2. Remove the line from the chip, or open the chip in the editor and switch off **Position** › **Behind animations**.

#### The wind compass covers a chip

1. With `wind_compass_position: auto` the card measures where the chips are and moves the compass to a place where it covers none, including chip areas set to `100%` wide and free-positioned chips.
2. A position you pick yourself is always kept, even over a chip. Set it back to `auto`, or pick another corner.

#### The editor is in English

The editor follows the language of your Home Assistant user profile. It speaks English and German; other languages show English.

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

#### The card always shows day, or the moon looks wrong

1. Day and night come from `sun_entity`. Without it the card always shows day. Set it to `sun.sun`.
2. `card_color_mode: day` keeps the sky in daylight, `night` keeps it at night. Remove it to follow the sun again.
3. Without `moon_phase_entity` the card works out the moon phase from the date. A moon sensor wins over that; if it is unavailable, the card falls back to its own phase.

#### The card colors do not match the dashboard

1. By default the card follows your Home Assistant theme. With `theme_entity` it follows that entity instead, and `card_color_mode: dark` or `light` locks the look.
2. See [Color Mode](#color-mode) for the combinations.

#### Clouds, haze, mist or frost on a clear day

The card reads the measured weather data, not only the weather state (see [Weather Data & Sky Light](#weather-data)):

1. A high `cloud_coverage` adds clouds even when the state is `sunny`. Switch off **Cloud amount from data** (`effect_cloud_coverage: false`) for a fixed amount per weather state.
2. Low `visibility` or humid air adds haze. Switch off **Haze** (`effect_haze: false`).
3. Ground mist forms when the temperature is close to the dew point. Switch off **Ground mist** (`effect_ground_mist: false`).
4. White, grainy edges in winter are [frost](#frost): below 0 °C, or just above it in very humid air. Switch off **Frost** (`effect_frost: false`).

Check the values under **Developer Tools** › **States** on your weather entity first. Some providers report a cloud cover that does not fit the weather state.

#### My station sensor is not in the list of my own sensors

1. Each picker lists only sensors that fit: wind speed in km/h, mph, m/s, kn, ft/s or Beaufort; wind direction with the device class `wind_direction`, the unit ° or a compass point like `NW` as its state; temperature and dew point in °C or °F; humidity with the device class `humidity`; cloud cover in % without a device class; visibility in km, mi, m, ft or yd.
2. Check the unit and device class of your sensor under **Developer Tools** › **States**. A sensor without a unit can get one in its entity settings, or through a template sensor.
3. In YAML any sensor works; the card reads its state as a number, or a wind direction like `NW`.

#### Rain looks too light or too heavy

1. Without a precipitation sensor, the amount follows the weather state: `rainy` is moderate rain, `pouring` heavy rain. `rain_density` makes it more or less, see [Rain & snow](#rain--snow).
2. With `precipitation_entity` the measured amount sets it, from drizzle just above 0 mm/h to a downpour from about 8 mm/h.
3. The editor lists only sensors in mm/h or in/h. A sensor in mm (the amount of a whole day or hour) does not show up and cannot be used, because it is no rain rate.
4. Snow uses the same sensor. Weather services measure snow as melted water, so their precipitation rate covers snow too. Most home rain gauges are not heated: snow stays in the funnel and only counts once it melts, so during snowfall they report 0 and the card shows the usual amount for the weather state. Use `snow_density` to set it, or a precipitation sensor from a weather service.

#### No wind lines are visible

1. Wind lines show in `windy` weather, and in rain, hail or snow from 40 km/h. In other weather there are none, even in strong wind.
2. Check that `wind_style` is not `off`.
3. Clouds, rain and snow still drift with the wind in every weather.

#### The wind blows the wrong way

1. The direction comes from `wind_bearing` of the weather entity, the direction the wind comes **from**, as in Home Assistant. Wind from the west (270°) blows to the right.
2. Without `wind_bearing` the wind blows from left to right.
3. Check the value under **Developer Tools** › **States** on your weather entity.

#### The wind compass does not show

1. The compass is off by default. Pick a style under **Sky & weather** › **Wind** › **Wind compass** (`wind_compass`).
2. It needs `wind_bearing` on the weather entity. Without a direction it stays hidden.
3. With `wind_compass_position: auto` it also stays hidden when every place on the card holds chips, as in the `panel` layout. Pick a position for it, for example `top-center`.

#### A wind direction chip shows a number instead of WSW

1. Set **Wind direction as** (`bearing_format`) on the chip to `cardinal` for `WSW`, or `both` for `WSW 250°`. Without it the chip shows the number as Home Assistant delivers it.
2. This works on the `wind_bearing` attribute of a weather entity, live or forecast, and on a sensor with the device class `wind_direction`. A sensor without this device class keeps showing the number.
3. **Show wind speed** (`bearing_speed`) only works on chips that read `wind_bearing` of a weather entity, because a single sensor has no speed.

#### No birds or planes are visible

1. `perf_mode: low` has no birds or planes. Pick `default` or `ultra`, or set `perf_fauna` yourself.
2. Check `perf_fauna`: `0` = none, `1` = birds only, `2` = birds and planes.
3. Check the switches `fauna_birds` and `fauna_planes`, and `fauna_birds_at_night` if it is night.
4. Birds and planes come and go. Wait a minute, or raise `fauna_bird_density` and `fauna_plane_density`.

#### No night effects (stars/comets) are visible

1. Verify that day and night are detected correctly: `sun_entity` is set, and `card_color_mode` is not `day`.
2. Glowing stars, shooting stars and comets need the dark look at night. With `card_color_mode: light`, or a light theme the card follows, the `standalone` card shows no stars and the `immersive` card golden stars, see [What each mode shows](#what-each-mode-shows).
3. Shooting stars and comets appear on clear and partly cloudy nights. Rain, snow, thunderstorms, a closed cloud deck and fog hide them.
4. Ensure `perf_effects` is `1` or `2`; `perf_mode: low` uses `0`.
5. Check the switches `effect_shooting_stars` and `effect_comets`, and raise `shooting_star_rate` or `comet_rate` if they are too rare.
6. Wait briefly after a weather change, the night sky builds up again.

### Display & Performance

#### Chip value shows no decimal places, or the unit disappeared

1. On "Auto" (no `value_precision` set), decimal places follow Home Assistant's own **Display Precision** for that entity/attribute (**Settings → Devices & services → Entities** → your entity → **Advanced settings**). The card does not control this.
2. Set `value_precision` (`0`, `1`, or `2`) on the chip to force an exact number of decimals regardless of the entity's own precision.
3. The unit comes from the entity's `unit_of_measurement`. If the entity has none, set `unit_format` on the chip to show a unit of your own.

#### Performance is weak on older devices

1. Set `perf_mode: low`.
2. Or keep a higher preset and lower single values, in this order: `perf_fps`, `perf_dpr`, `perf_effects`, `perf_fauna`.
3. The frame rate costs the most: `30` instead of `60` halves the work. On high-DPI displays with a weak graphics chip, a lower `perf_dpr` helps as well.
4. Switch off single effects you do not need, see [Performance](#performance). Anything that is off costs nothing.
