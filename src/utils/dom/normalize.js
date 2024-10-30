/**
 * Internal dependencies
 */
import { exposeComponent } from "./utils";

function normalizeData(value) {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  if (value === Number(value).toString()) {
    return Number(value);
  }

  if (value === "" || value === "null") {
    return null;
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return value;
  }
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}

function getDataAttributes(
  element,
  filterKey = (key) => key,
  refineKey = (key) => key
) {
  if (!element) {
    return {};
  }

  const attributes = {};
  const dataKeys = Object.keys(element.dataset).filter(filterKey);

  for (const key of dataKeys) {
    // let pureKey = key.replace(/^prefix/, "");
    let pureKey = refineKey(key);
    pureKey =
      pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
    attributes[pureKey] = normalizeData(element.dataset[key]);
  }

  return attributes;
}

function getDataAttribute(element, key) {
  return normalizeData(element.getAttribute(`data-${normalizeDataKey(key)}`));
}

function setDataAttribute(element, key, value) {
  element.setAttribute(`data-${normalizeDataKey(key)}`, value);
}

function removeDataAttribute(element, key) {
  element.removeAttribute(`data-${normalizeDataKey(key)}`);
}

exposeComponent("Dataset", {
  normalizeData,
  normalizeDataKey,
  getDataAttributes,
  getDataAttribute,
  setDataAttribute,
  removeDataAttribute,
});

export {
  normalizeData,
  normalizeDataKey,
  getDataAttributes,
  getDataAttribute,
  setDataAttribute,
  removeDataAttribute,
};
