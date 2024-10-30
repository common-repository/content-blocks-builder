/**
 * WordPress dependencies
 */
import { useEffect } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { usePrevious } from "@wordpress/compose";

/**
 * Internal dependencies
 */
import { useValueRef, useIsMounted } from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { triggerEvent } from "../../utils/dom";
import { featureName, hasBackground } from "./background";
import { handlePlayPause } from "./utils-frontend";
import { VIDEO_BACKGROUND_TYPE } from "./utils";

/**
 * Handle background effects
 */
addFilter(
  "boldblocks.edit.blockEditInner",
  `cbb/background/effects`,
  (content, props) => {
    if (boldblocksHasSupport(props.name, featureName)) {
      const {
        ref,
        attributes: { boldblocks: { background = {} } = {} },
      } = props;

      const animationType = background?.settings?.animation?.type;
      const hasAnimation =
        hasBackground(background) &&
        animationType &&
        background?.mediaType !== VIDEO_BACKGROUND_TYPE;

      const lastAnimationType = usePrevious(animationType);

      const valueRef = useValueRef(background);
      useEffect(() => {
        if (ref.current && hasAnimation && animationType) {
          const args = {
            ...props,
            blockElement: ref.current,
            animationType,
          };

          triggerEvent(window, "cbb.parallax.updated", args);

          let bgElement = null;
          if ([animationType, lastAnimationType].includes("bg-zoom")) {
            bgElement = ref.current.querySelector(
              ".bb\\:block-background--image",
            );
            triggerEvent(window, "cbb.animation.blockUpdated", {
              ...args,
              blockElement: bgElement,
            });
          }

          return () => {
            triggerEvent(window, "cbb.parallax.disposed", args);

            if ([animationType, lastAnimationType].includes("bg-zoom")) {
              triggerEvent(window, "cbb.animation.blockDisposed", {
                ...args,
                blockElement: bgElement,
              });
            }
          };
        }
      }, [ref.current, hasAnimation, animationType, valueRef.current]);

      const isMounted = useIsMounted();
      useEffect(() => {
        if (
          ref.current &&
          isMounted &&
          background?.mediaType === VIDEO_BACKGROUND_TYPE &&
          background?.video?.url &&
          background?.video?.isPausable
        ) {
          triggerEvent(window, "cbb.backgroundVideo.updated", {
            blockElement: ref.current,
          });

          return () =>
            triggerEvent(window, "cbb.backgroundVideo.disposed", {
              blockElement: ref.current,
            });
        }
      }, [ref.current, isMounted]);
    }

    return content;
  },
);

/**
 * Handle background video play/pause
 */
window.addEventListener(
  "cbb.backgroundVideo.updated",
  ({ detail: { blockElement } }) => {
    handlePlayPause(blockElement);
  },
);
