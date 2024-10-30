/**
 * Utilities for collape, modal, off-canvas
 * Adapted from bootstrap
 */

/**
 * Constants
 */
const MAX_UID = 1_000_000;
const TRANSITION_END = "transitionend";
const MILLISECONDS_MULTIPLIER = 1000;

/**
 * Properly escape IDs selectors to handle weird IDs
 * @param {string} selector
 * @returns {string}
 */
const parseSelector = (selector) => {
  if (selector && window.CSS && window.CSS.escape) {
    // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
    selector = selector.replace(
      /#([^\s"#']+)/g,
      (match, id) => `#${CSS.escape(id)}`
    );
  }

  return selector;
};

// Shout-out Angus Croll (https://goo.gl/pxwQGp)
const toType = (object) => {
  if (object === null || object === undefined) {
    return `${object}`;
  }

  return Object.prototype.toString
    .call(object)
    .match(/\s([a-z]+)/i)[1]
    .toLowerCase();
};

/**
 * Public Util API
 */

const getUID = (prefix) => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));

  return prefix;
};

const noop = () => {};

const isElement = (object) => {
  if (!object || typeof object !== "object") {
    return false;
  }

  if (typeof object.jquery !== "undefined") {
    object = object[0];
  }

  return typeof object.nodeType !== "undefined";
};

const getElement = (object) => {
  // it's a jQuery object or a node element
  if (isElement(object)) {
    return object?.jquery ? object[0] : object;
  }

  if (typeof object === "string" && object.length > 0) {
    return document.querySelector(parseSelector(object));
  }

  return null;
};

const triggerTransitionEnd = (element) => {
  element.dispatchEvent(new Event(TRANSITION_END));
};

const getTransitionDurationFromElement = (element) => {
  if (!element) {
    return 0;
  }

  // Get transition-duration of the element
  let { transitionDuration, transitionDelay } = window.getComputedStyle(
    element
  );
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(",")[0];
  transitionDelay = transitionDelay.split(",")[0];
  return (
    (Number.parseFloat(transitionDuration) +
      Number.parseFloat(transitionDelay)) *
    MILLISECONDS_MULTIPLIER
  );
};

/**
 * Call a callback on transitionend event
 *
 * @param {Function} callback
 * @param {Node} elem
 * @param {Boolean} immediate
 */
const executeAfterTransition = (callback, elem, immediate = false) => {
  if (typeof callback === "function") {
    if (immediate) {
      callback();
      return;
    }

    const durationPadding = 5;
    const emulatedDuration =
      getTransitionDurationFromElement(elem) + durationPadding;
    let called = false;

    const handler = ({ target }) => {
      if (target !== elem) {
        return;
      }
      called = true;
      elem.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    elem.addEventListener(TRANSITION_END, handler);

    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(elem);
      }
    }, emulatedDuration);
  }
};

/**
 * Run a function
 *
 * @param {Function} callback
 */
const execute = (callback) => {
  if (typeof callback === "function") {
    callback();
  }
};

/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
const reflow = (element) => {
  element.offsetHeight; // eslint-disable-line no-unused-expressions
};

const isRTL = () => document.documentElement.dir === "rtl";

const exposeComponent = (name, component) => {
  window.CBB = window?.CBB ?? {};
  window.CBB = { ...window.CBB, [name]: component };
};

const exposeHelper = (helper) => {
  if (toType(helper) !== "object") {
    console.error("The parameter must be an object");
  }

  let storedValue = window?.CBB?.Util ?? false;
  storedValue =
    toType(storedValue) === "object" ? { ...storedValue, ...helper } : helper;

  exposeComponent("Util", storedValue);
};

// Expose helper methods
exposeHelper({
  toType,
  getUID,
  noop,
  isElement,
  executeAfterTransition,
  execute,
  reflow,
  isRTL,
  exposeComponent,
});

export {
  toType,
  getUID,
  noop,
  isElement,
  getElement,
  executeAfterTransition,
  execute,
  reflow,
  isRTL,
  exposeComponent,
  exposeHelper,
};
