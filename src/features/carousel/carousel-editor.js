/**
 * WordPress dependencies
 */
import { useEffect } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { useDispatch, useSelect } from "@wordpress/data";
import { usePrevious } from "@wordpress/compose";
import { store as blockEditorStore } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { useValueRef, useIsMounted, getBreakpointType } from "sdk/utils";
import { hasSupportLayout } from "../../utils";
import { triggerEvent } from "../../utils/dom";
import { buildCarouselSettings } from "./utils";
import { getCarouselManager, getThumbsCarousel } from "./utils-for-frontend";
import CarouselScript from "./carousel-script";
import { featureName, layoutType } from "./carousel";

/**
 * Trigger carousel preview event
 *
 * @param {Object}
 * @returns
 */
export const triggerCarouselPreview = ({
  props,
  blockElement,
  carousel,
  previewMode,
  getSelectedBlockClientId,
  selectBlock,
  ...otherProps
}) => {
  const args = {
    ...props,
    ...otherProps,
    blockElement,
    previewMode,
    carouselSettings: buildCarouselSettings(carousel),
    clickHandler: (e) => {
      e.preventDefault();
      const selectedId = getSelectedBlockClientId();
      if (selectedId !== props.clientId) {
        selectBlock(props.clientId);
      }
    },
  };

  triggerEvent(window, "cbb.carousel.updated", args);

  return () => {
    triggerEvent(window, "cbb.carousel.disposed", args);
  };
};

/**
 * Handle carousel script
 */
addFilter(
  "boldblocks.edit.blockEditInner",
  `cbb/carousel/editor`,
  (content, props) => {
    if (hasSupportLayout(props.name, featureName, layoutType)) {
      const { ref, attributes } = props;

      const { getSelectedBlockClientId, __unstableGetEditorMode } = useSelect(
        (select) => select(blockEditorStore),
        [],
      );
      const { selectBlock } = useDispatch(blockEditorStore);

      // Zoom out mode
      const isZoomOut =
        __unstableGetEditorMode && __unstableGetEditorMode() === "zoom-out"
          ? true
          : false;

      // Get current breakpoint
      const breakpoint = getBreakpointType();

      let previewMode = attributes.boldblocks.carousel.previewMode;

      if (breakpoint !== "lg" || isZoomOut) {
        previewMode = "EDIT";
      }

      const isMounted = useIsMounted();
      const lastPreviewMode = usePrevious(previewMode);
      const valueRef = useValueRef(attributes.boldblocks.carousel);
      useEffect(() => {
        if (previewMode === "PREVIEW" || lastPreviewMode === "PREVIEW") {
          return triggerCarouselPreview({
            props,
            blockElement: ref.current,
            carousel: valueRef.current,
            previewMode,
            getSelectedBlockClientId,
            selectBlock,
            isMounted,
          });
        }
      }, [previewMode, valueRef.current]);
    }

    return content;
  },
);

/**
 * Kick start
 */
window.addEventListener("cbb.carousel.updated", ({ detail }) => {
  if (detail?.isMounted) {
    setTimeout(() => {
      buildPreviewCarousel(detail);
    }, 1);
  } else {
    buildPreviewCarousel(detail);
  }
});

/**
 * Dispose
 */
window.addEventListener(
  "cbb.carousel.disposed",
  ({ detail: { blockElement, clientId } }) => {
    const manager = getCarouselManager();
    removePreviewCarousel(manager[`#block-${clientId}`]);
    if (blockElement?.dataset?.previewMode === "PREVIEW") {
      blockElement.setAttribute("data-preview-mode", "EDIT");
    }
  },
);

function removePreviewCarousel(slider) {
  if (slider) {
    slider.dispose();
    if (slider.sliderElement) {
      slider.sliderElement.remove();
    }
  }
}

function buildPreviewCarousel({
  blockElement,
  name: blockName,
  clientId,
  carouselSettings,
  previewMode,
  clickHandler,
}) {
  const selector = `#block-${clientId}`;
  const manager = getCarouselManager();
  removePreviewCarousel(manager[selector]);
  if (previewMode === "PREVIEW") {
    if (blockElement?.dataset?.previewMode !== "PREVIEW") {
      blockElement.setAttribute("data-preview-mode", "PREVIEW");
    }
    let carouselElement = blockElement.cloneNode(true);
    carouselElement.addEventListener("click", clickHandler);
    const appender = carouselElement.querySelector(".block-list-appender");
    if (appender) {
      appender.remove();
    }
    const editBlocks = carouselElement.querySelectorAll("[contenteditable]");
    if (editBlocks) {
      editBlocks.forEach((block) => block.removeAttribute("contenteditable"));
    }
    blockElement.insertAdjacentElement("afterend", carouselElement);

    const args = {
      sliderOptions: { ...carouselSettings },
      instanceSelector: selector,
      sliderOptions: {
        thumbs: getThumbsCarousel(carouselElement, manager),
      },
    };

    if (carouselElement.classList.contains("wp-block-query")) {
      args["wrapperSelector"] = "ul";
      args["itemSelector"] = "li";
      if (blockName === "core/post-template") {
        args["datasetSelector"] = "ul";
      }
    }

    manager[selector] = new CarouselScript(carouselElement, args);
  }
}
