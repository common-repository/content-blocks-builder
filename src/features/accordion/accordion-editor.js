/**
 * WordPress dependencies
 */
import { useEffect } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { useValueRef } from "sdk/utils";
import { hasSupportLayout } from "../../utils";
import { triggerEvent } from "../../utils/dom";
import Accordion from "./accordion-script";
import { layoutType, featureName } from "./accordion";

/**
 * Handle preview mode
 */
addFilter(
  "boldblocks.edit.blockEditInner",
  `cbb/accordion/preview`,
  (content, props) => {
    if (hasSupportLayout(props.name, featureName, layoutType)) {
      // Safe to use hooks inside this condition
      const {
        ref,
        attributes: { boldblocks: { accordion = {} } = {} },
      } = props;
      const valueRef = useValueRef(accordion);
      useEffect(() => {
        if (ref.current) {
          const args = {
            ...props,
            blockElement: ref.current,
            previewMode: accordion?.previewMode,
          };
          triggerEvent(window, "cbb.accordion.blockUpdated", args);
          return () => {
            triggerEvent(window, "cbb.accordion.blockDisposed", args);
          };
        }
      }, [valueRef.current, ref.current]);
    }

    return content;
  },
);

/**
 * Dispose the instance
 *
 * @param {Node} element
 */
function dispose(element) {
  const instance = Accordion.getInstance(element);
  if (instance) {
    instance.dispose();
  }
}

/**
 * Kick start the accordion
 */
window.addEventListener(
  "cbb.accordion.blockUpdated",
  ({ detail: { blockElement, previewMode } = {} }) => {
    dispose(blockElement);

    if (previewMode === "PREVIEW") {
      new Accordion(blockElement);
    }
  },
);

/**
 * Dispose it on unmounted
 */
window.addEventListener(
  "cbb.accordion.blockDisposed",
  ({ detail: { blockElement } = {} }) => dispose(blockElement),
);
