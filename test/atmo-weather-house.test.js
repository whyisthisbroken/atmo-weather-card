import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

import { errors, makeHass, mountCard } from "./helpers/dom.js";
import {
  applyCardLayout,
  hasOwnImage,
  houseImages,
  HOUSE_FILES,
  HOUSE_PLACEMENT,
  HOUSE_RAIN_STATES,
  HOUSE_SNOW_STATES,
  usesBundledHouse,
} from "../src/atmo-weather-config.js";
import { imageMaxWidth } from "../src/atmo-weather-helpers.js";

await import("../src/atmo-weather-card.js");

afterEach(() => {
  document.body.replaceChildren();
  assert.deepEqual(errors.splice(0), []);
});

const HOME = { weather_entity: "weather.home", card_layout: "home" };
const file = (url) => String(url || "").split("/").pop();
const imageSrc = (card) => card.shadowRoot.querySelector("#image-slot > img").getAttribute("src") || "";

test("the six house pictures are in the repository", () => {
  for (const name of Object.values(HOUSE_FILES)) assert.ok(existsSync(`assets/house/${name}`), name);
});

test("Home brings the house while the card has no picture of its own", () => {
  const cfg = applyCardLayout(HOME);
  assert.equal(file(cfg.image_day), HOUSE_FILES.day);
  assert.equal(file(cfg.image_night), HOUSE_FILES.night);
  assert.equal(cfg.image_conditions.length, 2);
  const [snow, rain] = cfg.image_conditions;
  assert.equal(snow.entity, "weather.home");
  assert.deepEqual(snow.state, [...HOUSE_SNOW_STATES]);
  assert.deepEqual(rain.state, [...HOUSE_RAIN_STATES]);
  assert.equal(file(snow.image_night), HOUSE_FILES.snowNight);
  assert.equal(file(rain.image_day), HOUSE_FILES.rainDay);
  // Next to the card: the same folder as the script.
  assert.ok(cfg.image_day.startsWith("file:") && cfg.image_day.includes("/src/"));
});

test("hail and a thunderstorm without reported rain wet the house, sleet snows on it", () => {
  assert.ok(HOUSE_RAIN_STATES.includes("hail"));
  assert.ok(HOUSE_RAIN_STATES.includes("lightning"));
  assert.ok(HOUSE_SNOW_STATES.includes("snowy-rainy"));
  assert.ok(!HOUSE_RAIN_STATES.some((s) => HOUSE_SNOW_STATES.includes(s)));
});

test("an own picture of any kind replaces the whole house", () => {
  for (const own of [
    { image_day: "/local/me.png" },
    { image_night: "/local/me-night.png" },
    { image_folder: "/local/me/" },
    { image_conditions: [{ entity: "weather.home", state: "rainy", image_day: "/local/wet.png" }] },
    { status_entity: "input_boolean.party", status_day: "/local/party.png" },
  ]) {
    const cfg = applyCardLayout({ ...HOME, ...own });
    assert.ok(hasOwnImage(own), JSON.stringify(own));
    for (const key of ["image_day", "image_night"])
      assert.ok(!String(cfg[key] || "").includes("house-"), `${JSON.stringify(own)} ${key}`);
    if (!own.image_conditions) assert.equal(cfg.image_conditions, undefined);
  }
});

test("empty image keys, as the editor leaves them, still get the house", () => {
  const cfg = applyCardLayout({ ...HOME, image_day: "", image_night: " ", image_conditions: [] });
  assert.equal(file(cfg.image_day), HOUSE_FILES.day);
  assert.equal(file(cfg.image_night), HOUSE_FILES.night);
  assert.equal(cfg.image_conditions.length, 2);
});

test("image_day: none turns the house off and is never asked for as a file", () => {
  for (const none of [{ image_day: "none" }, { image_day: " None " }, { image_night: "none" }]) {
    const cfg = applyCardLayout({ ...HOME, ...none });
    assert.equal(cfg.image_day || "", "");
    assert.equal(cfg.image_night || "", "");
    assert.equal(cfg.image_conditions, undefined);
  }
  // Outside a layout too.
  assert.equal(applyCardLayout({ image_day: "none" }).image_day, "");
});

test("only Home has the house", () => {
  for (const layout of ["", "standard", "compact", "wide", "panel"]) {
    const cfg = applyCardLayout({ weather_entity: "weather.home", card_layout: layout });
    assert.equal(cfg.image_day, undefined, layout);
  }
});

test("without a weather entity the house has no rain or snow rules", () => {
  const cfg = applyCardLayout({ card_layout: "home" });
  assert.equal(file(cfg.image_day), HOUSE_FILES.day);
  assert.deepEqual(cfg.image_conditions, []);
  assert.deepEqual(houseImages("", "https://x/hacsfiles/atmo-weather-card/atmo-weather-card.js").image_day,
    "https://x/hacsfiles/atmo-weather-card/house-day.webp");
});

test("the card shows the house by weather and by sun", () => {
  const cases = [
    [{ weather: "sunny" }, HOUSE_FILES.day],
    [{ weather: "partlycloudy", sun: "below_horizon" }, HOUSE_FILES.night],
    [{ weather: "pouring" }, HOUSE_FILES.rainDay],
    [{ weather: "hail", sun: "below_horizon" }, HOUSE_FILES.rainNight],
    [{ weather: "lightning" }, HOUSE_FILES.rainDay],
    [{ weather: "snowy" }, HOUSE_FILES.snowDay],
    [{ weather: "snowy-rainy", sun: "below_horizon" }, HOUSE_FILES.snowNight],
  ];
  for (const [hass, expected] of cases) {
    const card = mountCard({ card_layout: "home" }, makeHass(hass));
    assert.equal(file(imageSrc(card)), expected, JSON.stringify(hass));
    document.body.replaceChildren();
  }
});

test("the card blends the house over when the weather turns", () => {
  const hass = makeHass({ weather: "sunny" });
  const card = mountCard({ card_layout: "home", image_transition: 0 }, hass);
  assert.equal(file(imageSrc(card)), HOUSE_FILES.day);
  const w = hass.states["weather.home"];
  card.hass = { ...hass, states: { ...hass.states, "weather.home": { ...w, state: "rainy" } } };
  assert.equal(file(imageSrc(card)), HOUSE_FILES.rainDay);
});

test("Home with image_day: none shows no picture", () => {
  const card = mountCard({ card_layout: "home", image_day: "none" });
  assert.equal(imageSrc(card), "");
  assert.equal(card.shadowRoot.querySelector("#image-slot").hidden, true);
});

test("the bundled house sits smaller and lower than an own picture, own values win", () => {
  const house = applyCardLayout(HOME);
  assert.equal(house.image_scale, HOUSE_PLACEMENT.image_scale);
  assert.equal(house.image_y, HOUSE_PLACEMENT.image_y);
  const own = applyCardLayout({ ...HOME, image_day: "/local/me.png" });
  assert.equal(own.image_scale, 70);
  assert.equal(own.image_y, "16%");
  const bigger = applyCardLayout({ ...HOME, image_scale: 75 });
  assert.equal(bigger.image_scale, 75);
  assert.equal(file(bigger.image_day), HOUSE_FILES.day);
  assert.ok(usesBundledHouse(HOME));
  assert.ok(!usesBundledHouse({ ...HOME, image_day: "none" }));
  assert.ok(!usesBundledHouse({ ...HOME, image_folder: "/local/h/" }));
  assert.ok(!usesBundledHouse({ weather_entity: "weather.home", card_layout: "panel" }));
});

test("image_max_width takes a share of the card width or a CSS size", () => {
  assert.equal(imageMaxWidth(58), "58%");
  assert.equal(imageMaxWidth("58"), "58%");
  assert.equal(imageMaxWidth(250), "100%");
  assert.equal(imageMaxWidth("240px"), "240px");
  assert.equal(imageMaxWidth("40cqw"), "40cqw");
  for (const off of [0, "0", "", null, undefined, "wide", "-5", "url(x)"]) assert.equal(imageMaxWidth(off), "", String(off));
  // Home brings 58 %, for the house and for own pictures.
  assert.equal(applyCardLayout(HOME).image_max_width, 58);
  assert.equal(applyCardLayout({ ...HOME, image_day: "/local/me.png" }).image_max_width, 58);
});

test("a narrow card shrinks the house on its side and bottom line", () => {
  const card = mountCard({ card_layout: "home" });
  const slot = card.shadowRoot.querySelector("#image-slot");
  assert.equal(slot.style.maxWidth, "58%");
  assert.equal(slot.style.getPropertyValue("--_awc-img-pos"), "right bottom");
  document.body.replaceChildren();
  const left = mountCard({ image_day: "/local/a.png", image_alignment: "bottom-left", image_max_width: "200px" });
  const s2 = left.shadowRoot.querySelector("#image-slot");
  assert.equal(s2.style.maxWidth, "200px");
  assert.equal(s2.style.getPropertyValue("--_awc-img-pos"), "left bottom");
  document.body.replaceChildren();
  // Without the option nothing changes.
  const plain = mountCard({ image_day: "/local/a.png" });
  const s3 = plain.shadowRoot.querySelector("#image-slot");
  assert.equal(s3.style.maxWidth, "");
  assert.equal(s3.style.getPropertyValue("--_awc-img-pos"), "");
});
