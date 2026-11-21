// Visibility conditions for chips. Same format and meaning as the
// `visibility` list of Home Assistant cards: state, numeric_state, screen,
// user, time, and/or/not, plus the legacy form without `condition`.

const ENTITY_ID = /^[a-z0-9_]+\.[a-z0-9_]+$/;
const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const asList = (v) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]);
const isEntityId = (v) => typeof v === "string" && ENTITY_ID.test(v);

// A value may name an entity; then its state counts as well.
function entityState(hass, value) {
  if (!isEntityId(value)) return undefined;
  const st = hass.states && hass.states[value];
  return st ? st.state : undefined;
}

function conditionEntity(c) {
  return (typeof c.entity_id === "string" && c.entity_id) || c.entity || "";
}

function checkState(c, hass) {
  const id = conditionEntity(c);
  const st = id && hass.states ? hass.states[id] : undefined;
  let state;
  if (!st) state = "unknown";
  else if (c.attribute) {
    const a = st.attributes ? st.attributes[c.attribute] : undefined;
    state = a === undefined || a === null ? "unknown" : String(a);
  } else state = st.state;
  const wanted = c.state ?? c.state_not;
  if (wanted === undefined || wanted === null) return false;
  const values = asList(wanted).map(String);
  for (const v of asList(wanted)) {
    const ref = entityState(hass, v);
    if (ref !== undefined) values.push(ref);
  }
  return c.state != null ? values.includes(state) : !values.includes(state);
}

function checkNumeric(c, hass) {
  const id = conditionEntity(c);
  const st = id && hass.states ? hass.states[id] : undefined;
  const raw = st ? (c.attribute ? (st.attributes || {})[c.attribute] : st.state) : undefined;
  if (raw === undefined || raw === null || raw === "") return false;
  const value = Number(raw);
  if (Number.isNaN(value)) return false;
  const limit = (x) => Number(typeof x === "string" ? (entityState(hass, x) ?? x) : x);
  const above = limit(c.above),
    below = limit(c.below);
  return (
    (c.above == null || Number.isNaN(above) || above < value) &&
    (c.below == null || Number.isNaN(below) || below > value)
  );
}

function checkScreen(c) {
  if (!c.media_query || typeof matchMedia !== "function") return false;
  try {
    return matchMedia(String(c.media_query)).matches;
  } catch (e) {
    return false;
  }
}

function checkUser(c, hass) {
  const id = hass.user && hass.user.id;
  return Array.isArray(c.users) && !!id ? c.users.includes(id) : false;
}

function parseTime(text) {
  const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(String(text || "").trim());
  if (!m) return null;
  const h = Number(m[1]),
    min = Number(m[2]),
    s = Number(m[3] || 0);
  if (h > 23 || min > 59 || s > 59) return null;
  return h * 3600 + min * 60 + s;
}

// Seconds since midnight and the weekday, in the time zone HA shows.
export function clockAt(date, timeZone) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone || undefined,
      hourCycle: "h23",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).formatToParts(date);
    const get = (type) => (parts.find((p) => p.type === type) || {}).value;
    return {
      seconds: Number(get("hour")) * 3600 + Number(get("minute")) * 60 + Number(get("second")),
      weekday: String(get("weekday") || "").slice(0, 3).toLowerCase(),
    };
  } catch (e) {
    return {
      seconds: date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds(),
      weekday: WEEKDAYS[date.getDay()],
    };
  }
}

function timeZoneOf(hass) {
  const locale = hass.locale || {};
  if (locale.time_zone === "server" && hass.config && hass.config.time_zone)
    return hass.config.time_zone;
  return undefined;
}

function checkTime(c, hass, now) {
  const clock = clockAt(now, timeZoneOf(hass));
  const days = asList(c.weekdays).map((d) => String(d).toLowerCase());
  if (days.length && !days.includes(clock.weekday)) return false;
  const after = c.after ? parseTime(c.after) : null,
    before = c.before ? parseTime(c.before) : null;
  const t = clock.seconds;
  if (after !== null && before !== null)
    // Over midnight, like 22:00 to 06:00.
    return before < after ? t >= after || t <= before : t >= after && t <= before;
  if (after !== null) return t >= after;
  if (before !== null) return t <= before;
  return true;
}

function checkOne(c, hass, now) {
  if (!c || typeof c !== "object") return true;
  if (!("condition" in c)) return checkState(c, hass);
  const sub = Array.isArray(c.conditions) ? c.conditions : null;
  switch (c.condition) {
    case "numeric_state":
      return checkNumeric(c, hass);
    case "screen":
      return checkScreen(c);
    case "user":
      return checkUser(c, hass);
    case "time":
      return checkTime(c, hass, now);
    case "and":
      return sub ? checkConditions(sub, hass, now) : true;
    case "or":
      return sub ? sub.some((x) => checkOne(x, hass, now)) : true;
    case "not":
      return sub ? !checkConditions(sub, hass, now) : true;
    default:
      return checkState(c, hass);
  }
}

// True when every condition holds. No list, an empty list or no hass: shown.
export function checkConditions(conditions, hass, now = new Date()) {
  if (!hass) return true;
  const list = asList(conditions);
  return list.every((c) => checkOne(c, hass, now));
}

// Everything the conditions read, so the card knows what to watch: entity ids,
// media queries, whether the clock or the user matters.
export function conditionNeeds(
  conditions,
  out = { entities: new Set(), queries: new Set(), time: false, users: false },
) {
  for (const c of asList(conditions)) {
    if (!c || typeof c !== "object") continue;
    const id = conditionEntity(c);
    if (id) out.entities.add(id);
    if (c.entity && c.entity !== id) out.entities.add(c.entity);
    for (const v of [...asList(c.state), ...asList(c.state_not), c.above, c.below])
      if (isEntityId(v)) out.entities.add(v);
    if (c.condition === "screen" && c.media_query) out.queries.add(String(c.media_query));
    if (c.condition === "time") out.time = true;
    if (c.condition === "user") out.users = true;
    if (Array.isArray(c.conditions)) conditionNeeds(c.conditions, out);
  }
  return out;
}
