# Product

The rules behind the card, its editor, the documentation and the website. When a change, a text or an image doesn't fit them, the change is wrong, not the rules.

## Who it's for

Home Assistant users who want a sky on their dashboard that looks like the sky outside. They see it on a wall tablet across the room, in the companion app on a phone and in a desktop dashboard with many columns. Some want a card that works with one line of YAML; others build their own layout with chips, gauges, images and embedded cards. The card serves both.

The job: show what the weather is like outside, in one glance, and make the dashboard feel alive.

## What it is

An animated sky built from real weather data. The weather state picks the scene; the measured values shape it: cloud cover sets the clouds, visibility and humidity the haze, the dew point the ground mist, the rain sensor how hard it rains, the wind where everything drifts. The sun and the moon stand where they really are.

Around that sky sits a toolkit: chips for any entity or attribute, forecasts, ring and bar gauges, free positions, images and embedded cards. The sky is the card; the toolkit decides what else is on it.

## Personality

Calm, precise, atmospheric. The sky is the interface and motion is weather, not decoration. A card that is quiet enough to keep on the main view all day.

## Design principles

1. **The sky comes from the data.** Nothing is drawn because it looks nice alone. Every effect is tied to a reading, a weather state or the time of day, and the docs say which.
2. **Calm beats busy.** Fewer, better particles. Weather moves behind the text and never competes with it. If an effect draws the eye away from the values, it is too strong.
3. **One hero, one quiet tier.** In layouts and examples, one value leads by a wide margin (usually the temperature, or the time); everything else is a calm second tier.
4. **Good without settings.** A card with only `weather_entity` must look finished. Options refine the card; they are not needed to make it look right.
5. **Every effect can be switched off.** Each effect has its own switch, and the performance presets decide what an old tablet draws.
6. **Smooth everywhere.** Animation runs at the same speed at 20, 30 and 60 fps. Ultra is smoother and more detailed, never faster. Anything counted per frame scales with the frame time.
7. **Fit the frame.** Layouts and templates work in a narrow phone column, a sections grid and on a wall tablet.

## Anti-references

- The generic weather tile: an icon, a number and a list of rows, all the same size.
- Busy scenes: many particles, flashing effects, everything moving at once.
- Decoration without data: rainbows, fireflies, effects that are not tied to a reading.
- Glass and glow used because they look modern, not because text needs them.

## Writing

The same rules for the README, the documentation, the website, the editor help texts and the release notes.

- English for the README, the docs, the website and the release notes. The editor follows the Home Assistant language: English or German.
- Short, declarative sentences that speak to "you". Say what the card does and why; let images and live examples show the rest.
- Name things the way users know them (cloud cover, rain sensor, wind direction), not the way the code calls them. Option names appear in `code`, next to the plain words.
- No superlatives, no emojis, no claims the code doesn't back up. Check every new claim against the code before it ships.
- Headlines state something true about the card: "Rain as heavy as your rain gauge." rather than "Powerful rain effects".
- Release notes are complete and detailed, and cover everything since the last tag.

## Images

- Doc and website images are rendered from the real card, never mocked.
- One look across all images: dark background, the same demo place and data, the same card width, WebP.
- Show the feature in its best light, then say in the caption what to set.
