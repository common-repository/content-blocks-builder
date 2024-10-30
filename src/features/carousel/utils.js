/**
 * External dependencies
 */
import { isObject, isString } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { isValidSettingObject } from "sdk/utils";
import { toType } from "../../utils/dom";
import { refineSlidesPerView } from "./utils-for-frontend";

/**
 * Breakpoint values in px
 */
export const breakpointValues = {
  sm: 576,
  md: 768,
  lg: 1024,
};

/**
 * Define the list of effect options
 */
export const effectOptions = [
  { value: "slide", label: __("Slide", "content-blocks-builder") },
  { value: "fade", label: __("Fade", "content-blocks-builder") },
  { value: "flip", label: __("Flip", "content-blocks-builder") },
];

/**
 * If the current effect support multiple slides
 *
 * @param {String} effect
 * @returns {Boolean}
 */
export const isSingleSlideEffect = (effect) =>
  ["fade", "flip", "cube", "cards", "creative"].includes(effect);

/**
 * Default pagination
 */
export const paginationDefault = {
  enable: true,
  size: "12px",
  spacing: "10px",
  color: "",
  inactiveColor: "",
  opacity: 0.3,
  dynamicBullets: true,
  horizontalGap: "5px",
};

/**
 * Default navigation
 */
export const navigationDefault = {
  enable: false,
  size: "44px",
  spacing: "10px",
  color: "",
  // nextIcon: {},
  // prevIcon: {},
};

/**
 * Default scrollbar
 */
export const scrollbarDefault = {
  enable: false,
  trackSize: "5px",
  // spacing: "3px",
  draggable: true,
  hide: false,
  snapOnRelease: true,
  trackColor: "",
  sliderColor: "",
};

/**
 * Build the carousel settings.
 *
 * @param {Object} carousel
 * @param {Boolean} isDeprecatedAutoplay
 */
export function buildCarouselSettings(carousel, isDeprecatedAutoplay = false) {
  // Extract sub-values.
  const {
    speed,
    loopType,
    autoplay,
    direction = "horizontal",
    effect: effectRaw,
    effectSettings,
    slidesPerView: slidesPerViewRaw,
    slidesPerGroup,
    spaceBetween,
    centeredSlides,
    centeredSlidesSettings,
    enableResponsive,
    breakpoints,
    oneSlidePerViewInMobile = false,
    pagination = paginationDefault,
    navigation = navigationDefault,
    scrollbar = scrollbarDefault,
    equalHeight = false,
    thumbs,
  } = carousel ?? {};

  let dataset = {};

  // Speed
  if (speed) {
    dataset.speed = speed;
  }

  // Loop and rewind
  dataset.loop = false;
  dataset.rewind = false;
  if (loopType === "infinite") {
    dataset.loop = true;
  } else if (loopType === "rewind") {
    dataset.rewind = true;
  }

  // Autoplay
  dataset.autoplay = false;
  let enableAutoplay;
  if (isDeprecatedAutoplay) {
    enableAutoplay = autoplay && isObject(autoplay);
  } else {
    enableAutoplay = autoplay && isObject(autoplay) && autoplay?.enable;
  }
  if (enableAutoplay) {
    if (isDeprecatedAutoplay) {
      const { delay } = autoplay;
      if (delay) {
        dataset.autoplay = {
          delay,
        };
      }
    } else {
      const { enable, ...restAutoplay } = autoplay;
      dataset.autoplay = restAutoplay;
    }
  }

  // Direction
  if (direction) {
    dataset.direction = direction;
  }

  // Effect
  const effect =
    toType(effectRaw) === "object" ? effectRaw?.name ?? "slide" : effectRaw;
  if (effect) {
    const { [`${effect}Effect`]: settings } = effectSettings ?? {};
    dataset.effect = effectRaw;

    // Effect settings
    if (effect === "fade") {
      dataset.fadeEffect = { crossFade: true };
    } else if (effect === "coverflow") {
      if (isObject(settings)) {
        dataset.coverflowEffect = settings;
      } else {
        dataset.coverflowEffect = {
          slideShadows: false,
        };
      }
    } else if (effect === "creative") {
      if (isObject(settings)) {
        dataset.creativeEffect = settings;
      } else {
        dataset.creativeEffect = {
          prev: {
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        };
      }

      dataset.direction = "horizontal";
    }
  }

  // slidesPerView
  if (isSingleSlideEffect(effect)) {
    dataset.slidesPerView = 1;
  } else {
    let slidesPerView = slidesPerViewRaw;
    if (toType(slidesPerViewRaw) === "object") {
      slidesPerView = slidesPerViewRaw?.auto
        ? "auto"
        : slidesPerViewRaw?.value ?? 1;
    }

    if (slidesPerViewRaw) {
      dataset.slidesPerView = slidesPerViewRaw;

      if (slidesPerView > 1 && slidesPerGroup) {
        dataset.slidesPerGroup = slidesPerGroup;
      }
    }

    // Breakpoints
    if (enableResponsive && isObject(breakpoints)) {
      let breakpointAtts = {};
      Object.keys(breakpoints).forEach((breakpoint) => {
        const {
          [breakpoint]: { value, inherit },
        } = breakpoints;

        let valueByBreakpoint;
        if (value && isObject(value)) {
          valueByBreakpoint = value;
        }

        if (!valueByBreakpoint && isString(inherit)) {
          const { value: inheritValue } = breakpoints[inherit] ?? {};
          if (inheritValue && isObject(inheritValue)) {
            valueByBreakpoint = inheritValue;
          }
        }

        if (isObject(valueByBreakpoint)) {
          breakpointAtts[breakpointValues[breakpoint]] = valueByBreakpoint;
        }
      });

      dataset.breakpoints = breakpointAtts;
    } else {
      if (oneSlidePerViewInMobile) {
        let breakpointAtts = {
          [breakpointValues.sm]: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          [breakpointValues.md]: {
            slidesPerView: slidesPerViewRaw,
            spaceBetween,
          },
        };

        dataset.breakpoints = breakpointAtts;
      }
    }
  }

  // centeredSlides
  dataset.centeredSlides = centeredSlides;
  if (
    centeredSlides &&
    effect === "slide" &&
    centeredSlidesSettings &&
    centeredSlidesSettings?.enable
  ) {
    dataset.centeredSlidesSettings = centeredSlidesSettings;
  }

  // spaceBetween
  if (spaceBetween) {
    dataset.spaceBetween = spaceBetween;
  }

  // Pagination
  dataset.pagination = !!pagination?.enable;
  dataset.paginationSettings = pagination;

  // Navigation
  dataset.navigation = !!navigation?.enable;
  dataset.navigationSettings = navigation;

  // Scrollbar
  dataset.scrollbar = !!scrollbar?.enable;
  dataset.scrollbarSettings = scrollbar;

  // Equal height?
  if (equalHeight) {
    // Only add the property when it is true to prevent from invalid content
    dataset.equalHeight = equalHeight;
  }

  if (thumbs && thumbs?.enable) {
    dataset.thumbsSettings = thumbs;
  }

  return dataset;
}

export const buildCarouselEditStyle = (
  selector,
  wraperSelector = ".carousel__inner",
  cssVariables,
) => {
  let styles = `
  ${selector} {${cssVariables}}
  /* Appender */
  ${selector}[data-preview-mode="EDIT"] > ${wraperSelector} > .block-list-appender .block-list-appender__toggle {
    display: flex;
  }
  ${selector}[data-preview-mode="EDIT"] > ${wraperSelector} > .block-list-appender {
    bottom: 17px;
    left: calc(var(--bb--carousel--inner-width, 100%) - 24px);
  }
  /* Edit mode */
  ${selector}[data-preview-mode="EDIT"] {
    overflow-x: auto;
    overflow-y: hidden;
  }
  ${selector}[data-preview-mode="EDIT"] > ${wraperSelector} {
    position: relative;
    display: flex;
    gap: var(--bb--carousel--spacebetween, 0);
    max-width: none;
    scroll-snap-type: x mandatory;
  }
  ${selector}[data-preview-mode="EDIT"] > ${wraperSelector} > * {
    flex-shrink: 0;
    scroll-snap-align: start;
  }
  ${selector}[data-preview-mode="EDIT"] > ${wraperSelector} > * {
    width: calc(100% / var(--bb--carousel--slidesperview, 1)) !important;
  }

  /* iframe preview */
  .block-editor-block-preview__content-iframe ${selector}[data-preview-mode="PREVIEW"] {
    overflow-x: auto;
  }
  .block-editor-block-preview__content-iframe ${selector}[data-preview-mode="PREVIEW"] > ${wraperSelector} {
    position: relative;
    display: flex;
    gap: var(--bb--carousel--spacebetween, 0);
    max-width: none;
    scroll-snap-type: x mandatory;
  }
  .block-editor-block-preview__content-iframe ${selector}[data-preview-mode="PREVIEW"] > ${wraperSelector} > * {
    flex-shrink: 0;
    scroll-snap-align: start;
  }
  .block-editor-block-preview__content-iframe ${selector}[data-preview-mode="PREVIEW"] > ${wraperSelector} > * {
    width: calc(100% / var(--bb--carousel--slidesperview, 1)) !important;
  }
  `;

  return styles;
};

/**
 * Build style for EDIT mode
 *
 * @param {Object} carousel
 * @param {Integer} slideCount
 * @param {String} devicePrefix
 * @returns {String}
 */
export const buildEditLayoutStyle = (carousel, slideCount, devicePrefix) => {
  const {
    effect,
    slidesPerView,
    spaceBetween,
    enableResponsive,
    breakpoints = {},
    oneSlidePerViewInMobile = false,
  } = carousel;

  const styles = [];
  let slidesPerViewValue = refineSlidesPerView(slidesPerView);
  let spaceBetweenValue = spaceBetween;

  if (isSingleSlideEffect(effect)) {
    slidesPerViewValue = 1;
  } else {
    if (enableResponsive && isValidSettingObject(breakpoints)) {
      let { value, inherit } = breakpoints[devicePrefix] ?? {};
      if (!isValidSettingObject(value) && inherit) {
        value = (breakpoints[inherit] ?? {})["value"] ?? {};
      }

      if (isValidSettingObject(value)) {
        if (value?.slidesPerView) {
          slidesPerViewValue = refineSlidesPerView(value.slidesPerView);
        }
        if (value?.spaceBetween) {
          spaceBetweenValue = value.spaceBetween;
        }
      }
    } else {
      if (oneSlidePerViewInMobile && devicePrefix === "sm") {
        slidesPerViewValue = 1;
      }
    }
  }

  if (slidesPerViewValue && slidesPerViewValue !== "auto") {
    styles.push(`--bb--carousel--slidesperview: ${slidesPerViewValue};`);
    slidesPerViewValue = parseFloat(slidesPerViewValue);
    slidesPerViewValue = isNaN(slidesPerViewValue) ? 1 : slidesPerViewValue;
    styles.push(
      `--bb--carousel--inner-width: ${
        (1 / slidesPerViewValue) * slideCount * 100
      }%;`,
    );
  }

  if (spaceBetweenValue) {
    styles.push(`--bb--carousel--spacebetween: ${spaceBetweenValue}px;`);
  }

  return styles.join("");
};
