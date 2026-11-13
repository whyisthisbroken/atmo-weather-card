import { test } from "node:test";
import assert from "node:assert/strict";

import {
  adjustParams,
  computeAtmosphere,
  easeGoldenLight,
  readWeatherData,
} from "../src/atmo-weather-atmosphere.js";

const near = (actual, expected) =>
  assert.ok(Math.abs(actual - expected) < 1e-6, `${actual} != ${expected}`);

test("weather data is read in km, mm/h and degrees Celsius", () => {
  const data = readWeatherData({
    cloud_coverage: 40,
    visibility: 5,
    visibility_unit: "mi",
    humidity: "88",
    temperature: 50,
    dew_point: 41,
    temperature_unit: "°F",
  });
  assert.equal(data.coverage, 40);
  near(data.visibility, 8.045);
  assert.equal(data.humidity, 88);
  near(data.temperature, 10);
  near(data.dewPoint, 5);
  assert.equal(readWeatherData({ visibility: 800, visibility_unit: "m" }).visibility, 0.8);
  assert.equal(readWeatherData({ visibility: "unknown" }).visibility, null);
});

test("the rain amount only comes from the precipitation sensor", () => {
  // An attribute on the weather entity is ignored.
  assert.equal(readWeatherData({ precipitation: 5 }).precipitation, null);
  assert.equal(readWeatherData({}, { state: "2.5", attributes: { unit_of_measurement: "mm/h" } }).precipitation, 2.5);
  assert.equal(readWeatherData({}, { state: "0.1", attributes: { unit_of_measurement: "in/h" } }).precipitation, 2.54);
  assert.equal(readWeatherData({}, { state: "unavailable", attributes: {} }).precipitation, null);
});

test("cloud cover sets the number of clouds in steps", () => {
  const sunny = { type: "sun", cloud: 0 };
  assert.equal(adjustParams(sunny, { coverage: 0 }).cloud, 0);
  assert.equal(adjustParams(sunny, { coverage: 40 }).cloud, 18);
  assert.equal(adjustParams(sunny, { coverage: 41 }).cloud, 18);
  assert.equal(adjustParams(sunny, { coverage: 100 }).cloud, 45);
  // Without a value nothing changes.
  assert.deepEqual(adjustParams(sunny, {}), sunny);
  // Fog keeps its own look.
  assert.equal(adjustParams({ type: "fog", cloud: 0 }, { coverage: 80 }).cloud, 0);
});

test("rain keeps most of its clouds and opens the deck below 70 % cover", () => {
  const rainy = { type: "rain", cloud: 40, overcast: true, count: 120 };
  const broken = adjustParams(rainy, { coverage: 50 });
  assert.equal(broken.cloud, 24);
  assert.equal(broken.overcast, false);
  const closed = adjustParams(rainy, { coverage: 100 });
  assert.equal(closed.cloud, 44);
  assert.equal(closed.overcast, true);
  assert.equal(rainy.cloud, 40, "the input stays untouched");
});

test("the measured amount sets the rain and snow density", () => {
  const rain = { type: "rain", count: 120 };
  assert.equal(adjustParams(rain, { precipitation: 0 }).count, 40);
  assert.equal(adjustParams(rain, { precipitation: 2 }).count, 100);
  assert.equal(adjustParams(rain, { precipitation: 20 }).count, 280);
  assert.equal(adjustParams({ type: "snow", count: 60 }, { precipitation: 3 }).count, 80);
  // Hail keeps its count.
  assert.equal(adjustParams({ type: "hail", count: 150 }, { precipitation: 5 }).count, 150);
});

const sky = (data, opts) =>
  computeAtmosphere(data, { state: "sunny", isTimeNight: false, sunElev: 30, ...opts });

test("low visibility and humid air make haze, but not in fog", () => {
  assert.equal(sky({}).haze, 0);
  assert.equal(sky({ visibility: 20 }).haze, 0);
  assert.equal(sky({ visibility: 2 }).haze, 1);
  assert.equal(sky({ humidity: 100 }).haze, 0.5);
  assert.equal(sky({ visibility: 2 }, { state: "fog" }).haze, 0);
});

test("ground mist forms near the dew point at night and in the morning", () => {
  const damp = { temperature: 6, dewPoint: 5.5 };
  near(sky(damp, { sunElev: 5 }).mist, 0.8);
  assert.equal(sky(damp, { sunElev: 30 }).mist, 0, "not with the sun high up");
  assert.equal(sky(damp, { sunElev: 5, state: "pouring" }).mist, 0);
  assert.equal(sky({ temperature: 12, dewPoint: 4 }, { sunElev: 5 }).mist, 0);
  assert.equal(sky({ temperature: 6 }, { sunElev: 5 }).mist, 0);
});

test("twilight is blue right after sunset and the stars come out slowly", () => {
  const dusk = sky({}, { isTimeNight: true, sunElev: -1.5 });
  near(dusk.twilight, 0.75);
  assert.equal(dusk.starVisibility, 0.1875);
  const night = sky({}, { isTimeNight: true, sunElev: -12 });
  assert.equal(night.twilight, 0);
  assert.equal(night.starVisibility, 1);
  // Without a sun elevation the night looks as before.
  const unknown = sky({}, { isTimeNight: true, sunElev: null });
  assert.equal(unknown.twilight, 0);
  assert.equal(unknown.starVisibility, 1);
});

test("sun rays shine through broken clouds, strongest with a low sun", () => {
  assert.equal(sky({}, { state: "partlycloudy", sunElev: 15 }).rays, 1);
  assert.equal(sky({}, { state: "partlycloudy", sunElev: 50 }).rays, 0.6);
  assert.equal(sky({}, { state: "cloudy", sunElev: 15 }).rays, 0.6);
  assert.equal(sky({}, { state: "partlycloudy", sunElev: null }).rays, 1);
  assert.equal(sky({ coverage: 98 }, { state: "cloudy", sunElev: 15 }).rays, 0);
  assert.equal(sky({}, { state: "sunny", sunElev: 15 }).rays, 0);
  assert.equal(sky({}, { state: "partlycloudy", isTimeNight: true, sunElev: -3 }).rays, 0);
});

test("switched off effects stay off", () => {
  const damp = { visibility: 2, temperature: 6, dewPoint: 5.5 };
  const all = sky(damp, { state: "partlycloudy", sunElev: 5 });
  assert.ok(all.haze > 0 && all.mist > 0 && all.rays > 0);
  const off = sky(damp, {
    state: "partlycloudy",
    sunElev: 5,
    effects: { haze: false, mist: false, sunRays: false },
  });
  assert.equal(off.haze, 0);
  assert.equal(off.mist, 0);
  assert.equal(off.rays, 0);

  const dusk = sky({}, { isTimeNight: true, sunElev: -1.5, effects: { blueHour: false } });
  assert.equal(dusk.twilight, 0);
  assert.equal(dusk.starVisibility, 1);
});

test("a low sun turns the light golden, and orange to violet at sunset", () => {
  assert.equal(sky({}, { sunElev: 30 }).golden, 0);
  assert.equal(sky({}, { sunElev: 12 }).golden, 0);
  const golden = sky({}, { sunElev: 6 });
  assert.ok(golden.golden > 0.5 && golden.golden < 0.8, String(golden.golden));
  assert.equal(golden.sunset, 0);
  const sunset = sky({}, { sunElev: 0 });
  assert.equal(sunset.golden, 1);
  near(sunset.sunset, 0.75);
  // Only where the sun gets through, and never at night.
  assert.ok(sky({}, { state: "cloudy", sunElev: 2 }).golden < 0.5);
  assert.equal(sky({}, { state: "rainy", sunElev: 2 }).golden, 0);
  assert.equal(sky({}, { isTimeNight: true, sunElev: -2 }).golden, 0);
  assert.equal(sky({}, { sunElev: null }).golden, 0);
  const off = sky({}, { sunElev: 0, effects: { goldenHour: false } });
  assert.equal(off.golden, 0);
  assert.equal(off.sunset, 0);
});

test("the golden light glides to a new sun position instead of jumping", () => {
  const card = { _atmo: { golden: 0.4, sunset: 0 }, _frameScale: 1 };
  // A card that just appeared starts at the current light.
  assert.deepEqual(easeGoldenLight(card), { g: 0.4, s: 0 });
  // Home Assistant moves the sun: the light follows over a few seconds.
  card._atmo = { golden: 0.6, sunset: 0.2 };
  const first = { ...easeGoldenLight(card) };
  assert.ok(first.g > 0.4 && first.g < 0.41, String(first.g));
  for (let i = 0; i < 600; i++) easeGoldenLight(card);
  assert.deepEqual(card._golden, { g: 0.6, s: 0.2 });
});
