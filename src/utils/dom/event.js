/**
 * Internal dependencies
 */
import { exposeHelper } from "./utils";

/**
 * Events
 */
const EVENTS = {
  SHOW: "show.boldblocks",
  SHOWN: "shown.boldblocks",
  HIDE: "hide.boldblocks",
  HIDDEN: "hidden.boldblocks",
  INIT: "init.boldblocks",
};

/**
 * Trigger an event
 *
 * @param {Node} element
 * @param {String} eventName
 * @param {Object} args
 * @returns
 */
const triggerEvent = (element, eventName, args = {}) => {
  const evt = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail: args,
  });

  element.dispatchEvent(evt);

  return evt;
};

// Expose helper methods
exposeHelper({
  EVENTS,
  triggerEvent,
});

export { EVENTS, triggerEvent };
