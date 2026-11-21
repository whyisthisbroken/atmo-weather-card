import { test } from "node:test";
import assert from "node:assert/strict";

import { checkConditions, clockAt, conditionNeeds } from "../src/atmo-weather-conditions.js";

const hass = {
  user: { id: "u1" },
  locale: { time_zone: "server" },
  config: { time_zone: "UTC" },
  states: {
    "input_boolean.guest": { state: "on", attributes: {} },
    "sensor.uv": { state: "4.2", attributes: { max: 7 } },
    "sensor.limit": { state: "5", attributes: {} },
    "sensor.text": { state: "abc", attributes: {} },
    "weather.home": { state: "rainy", attributes: { humidity: 90 } },
  },
};
const check = (c, h = hass, now) => checkConditions(c, h, now);

test("no conditions, an empty list or no hass show the chip", () => {
  assert.equal(check(undefined), true);
  assert.equal(check([]), true);
  assert.equal(checkConditions([{ condition: "state", entity: "x.y", state: "on" }], null), true);
});

test("state conditions compare the state, a list, state_not and an attribute", () => {
  assert.equal(check([{ condition: "state", entity: "input_boolean.guest", state: "on" }]), true);
  assert.equal(check([{ condition: "state", entity: "input_boolean.guest", state: "off" }]), false);
  assert.equal(check([{ condition: "state", entity: "weather.home", state: ["rainy", "pouring"] }]), true);
  assert.equal(check([{ condition: "state", entity: "weather.home", state_not: "rainy" }]), false);
  assert.equal(check([{ condition: "state", entity: "weather.home", state_not: ["sunny"] }]), true);
  assert.equal(check([{ condition: "state", entity: "weather.home", attribute: "humidity", state: "90" }]), true);
  // A missing entity reads as unknown.
  assert.equal(check([{ condition: "state", entity: "sensor.gone", state: "unknown" }]), true);
  // Without a state to compare the condition fails, as in Home Assistant.
  assert.equal(check([{ condition: "state", entity: "weather.home" }]), false);
  // The legacy form without `condition` and the core form with entity_id.
  assert.equal(check([{ entity: "input_boolean.guest", state: "on" }]), true);
  assert.equal(check([{ condition: "state", entity_id: "input_boolean.guest", state: "on" }]), true);
  // A state that names an entity also accepts that entity's state.
  assert.equal(check([{ condition: "state", entity: "sensor.limit", state: "sensor.limit" }]), true);
});

test("numeric_state checks above and below, also against another entity", () => {
  const uv = (extra) => [{ condition: "numeric_state", entity: "sensor.uv", ...extra }];
  assert.equal(check(uv({ above: 3 })), true);
  assert.equal(check(uv({ above: 5 })), false);
  assert.equal(check(uv({ below: 5 })), true);
  assert.equal(check(uv({ above: 4, below: 4.5 })), true);
  assert.equal(check(uv({ above: "sensor.limit" })), false);
  assert.equal(check(uv({ below: "sensor.limit" })), true);
  assert.equal(check(uv({ attribute: "max", above: 6 })), true);
  assert.equal(check([{ condition: "numeric_state", entity: "sensor.text", above: 1 }]), false);
  assert.equal(check([{ condition: "numeric_state", entity: "sensor.gone", above: 1 }]), false);
});

test("screen and user conditions", () => {
  const saved = globalThis.matchMedia;
  globalThis.matchMedia = (q) => ({ matches: q === "(min-width: 768px)" });
  try {
    assert.equal(check([{ condition: "screen", media_query: "(min-width: 768px)" }]), true);
    assert.equal(check([{ condition: "screen", media_query: "(max-width: 767px)" }]), false);
    assert.equal(check([{ condition: "screen" }]), false);
  } finally {
    globalThis.matchMedia = saved;
  }
  assert.equal(check([{ condition: "user", users: ["u1", "u2"] }]), true);
  assert.equal(check([{ condition: "user", users: ["u2"] }]), false);
  assert.equal(check([{ condition: "user", users: ["u1"] }], { ...hass, user: undefined }), false);
});

test("time conditions use after, before, weekdays and cross midnight", () => {
  // Wednesday 2026-11-18, 23:30 UTC.
  const late = new Date(Date.UTC(2026, 10, 18, 23, 30));
  const noon = new Date(Date.UTC(2026, 10, 18, 12, 0));
  const time = (extra, now) => check([{ condition: "time", ...extra }], hass, now);
  assert.equal(time({ after: "22:00", before: "06:00" }, late), true);
  assert.equal(time({ after: "22:00", before: "06:00" }, noon), false);
  assert.equal(time({ after: "08:00", before: "18:00" }, noon), true);
  assert.equal(time({ after: "13:00" }, noon), false);
  assert.equal(time({ before: "13:00" }, noon), true);
  assert.equal(time({ weekdays: ["wed"] }, noon), true);
  assert.equal(time({ weekdays: ["sat", "sun"] }, noon), false);
  assert.equal(time({ after: "nonsense" }, noon), true);
  assert.deepEqual(clockAt(noon, "Europe/Berlin"), { seconds: 13 * 3600, weekday: "wed" });
});

test("and, or and not combine conditions", () => {
  const on = { condition: "state", entity: "input_boolean.guest", state: "on" };
  const off = { condition: "state", entity: "input_boolean.guest", state: "off" };
  assert.equal(check([{ condition: "and", conditions: [on, off] }]), false);
  assert.equal(check([{ condition: "or", conditions: [on, off] }]), true);
  assert.equal(check([{ condition: "not", conditions: [off] }]), true);
  assert.equal(check([{ condition: "not", conditions: [on] }]), false);
  assert.equal(check([{ condition: "or" }]), true);
  assert.equal(check([on, off]), false);
});

test("conditionNeeds collects entities, queries, the clock and the user", () => {
  const needs = conditionNeeds([
    { condition: "numeric_state", entity: "sensor.uv", above: "sensor.limit" },
    {
      condition: "or",
      conditions: [
        { condition: "screen", media_query: "(max-width: 600px)" },
        { condition: "time", after: "08:00" },
        { condition: "user", users: ["u1"] },
        { entity: "weather.home", state: "rainy" },
      ],
    },
  ]);
  assert.deepEqual([...needs.entities].sort(), ["sensor.limit", "sensor.uv", "weather.home"]);
  assert.deepEqual([...needs.queries], ["(max-width: 600px)"]);
  assert.equal(needs.time, true);
  assert.equal(needs.users, true);
});
