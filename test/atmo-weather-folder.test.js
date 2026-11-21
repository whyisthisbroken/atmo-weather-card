import { test } from "node:test";
import assert from "node:assert/strict";

import { FOLDER_BASE, folderImageCandidates, folderImageType } from "../src/atmo-weather-folder.js";

test("the folder offers the state's picture and its fallbacks", () => {
  assert.deepEqual(folderImageCandidates("/local/house", "webp", "sunny", false), ["/local/house/sunny.webp"]);
  assert.deepEqual(folderImageCandidates("/local/house/", "png", "pouring", false), [
    "/local/house/pouring.png",
    "/local/house/rainy.png",
  ]);
  assert.deepEqual(folderImageCandidates("/local/h", undefined, "lightning-rainy", false), [
    "/local/h/lightning-rainy.webp",
    "/local/h/lightning.webp",
    "/local/h/rainy.webp",
  ]);
  // A thunderstorm nearly always rains: lightning falls back to rainy.
  assert.deepEqual(folderImageCandidates("/local/h", undefined, "lightning", false), ["/local/h/lightning.webp", "/local/h/rainy.webp"]);
});

test("at night the -night pictures come first, then the night image, then the day pictures", () => {
  assert.deepEqual(folderImageCandidates("/local/h", "webp", "rainy", true), [
    "/local/h/rainy-night.webp",
    FOLDER_BASE,
    "/local/h/rainy.webp",
  ]);
  assert.deepEqual(folderImageCandidates("/local/h", "webp", "clear-night", true), [
    "/local/h/clear-night.webp",
    "/local/h/sunny-night.webp",
    FOLDER_BASE,
    "/local/h/sunny.webp",
  ]);
});

test("no folder, an odd state or an odd type", () => {
  assert.deepEqual(folderImageCandidates("", "webp", "sunny", false), []);
  assert.deepEqual(folderImageCandidates(42, "webp", "sunny", false), []);
  assert.deepEqual(folderImageCandidates("/local/h", "webp", "../x", false), []);
  assert.equal(folderImageType(".PNG"), "png");
  assert.equal(folderImageType("p/ng"), "webp");
  assert.equal(folderImageType(undefined), "webp");
});
