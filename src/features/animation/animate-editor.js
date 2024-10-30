/**
 * WordPress dependencies
 */
import { useEffect } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { useValueRef } from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { triggerEvent } from "../../utils/dom";
import { featureName } from ".";
import { doAnimation, stopAnimation } from "../premium-only/animation/animate";

/**
 * Handle animation
 */
addFilter(
  "boldblocks.edit.blockEditInner",
  `cbb/animation/preview`,
  (content, props) => {
    if (boldblocksHasSupport(props.name, featureName)) {
      const {
        ref,
        attributes: {
          boldblocks: { animations = [], animateMultipleTimes } = {},
        },
      } = props;

      // Safe to use hooks inside this condition
      const valueRef = useValueRef({ animations, animateMultipleTimes });
      useEffect(() => {
        if (ref.current) {
          const args = {
            ...props,
            blockElement: ref.current,
          };
          triggerEvent(window, "cbb.animation.blockUpdated", args);
          return () => {
            triggerEvent(window, "cbb.animation.blockDisposed", args);
          };
        }
      }, [valueRef.current, ref.current]);
    }

    return content;
  },
);

/**
 * Kick start the animation
 */
window.addEventListener(
  "cbb.animation.blockUpdated",
  ({ detail: { blockElement } = {} }) => {
    if (
      !blockElement.closest(".is-carousel-item") &&
      blockElement.dataset?.revealAnimation
    ) {
      doAnimation([blockElement], {}, true);
    }
  },
);

/**
 * Dispose it on unmounted
 */
window.addEventListener(
  "cbb.animation.blockDisposed",
  ({ detail: { blockElement } = {} }) => {
    if (
      !blockElement.closest(".is-carousel-item") &&
      blockElement.dataset?.revealAnimation
    ) {
      stopAnimation(blockElement);
    }
  },
);
