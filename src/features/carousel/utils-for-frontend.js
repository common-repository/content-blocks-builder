/**
 * Internal dependencies
 */
import { toType } from "../../utils/dom";

/**
 * Get carousel manager object
 *
 * @returns {Array}
 */
export const getCarouselManager = () => {
  if (!window.carouselManager) {
    window.carouselManager = {};
  }

  return window.carouselManager;
};

const findThumbs = (element) => {
  let thumbElement;
  let carouselSettings = element?.dataset?.carouselSettings;
  if (carouselSettings) {
    carouselSettings = JSON.parse(carouselSettings) || {};
  }
  if (
    carouselSettings &&
    carouselSettings?.thumbsSettings?.enable &&
    carouselSettings?.thumbsSettings?.selector
  ) {
    thumbElement = element.ownerDocument.querySelector(
      carouselSettings?.thumbsSettings?.selector,
    );

    if (
      thumbElement &&
      !thumbElement.classList.contains("js-carousel-layout")
    ) {
      return false;
    }
  }

  return thumbElement;
};

/**
 * Make sure the thumbs carousel is initiated before the main carousel
 *
 * @param {Array} elements
 * @returns {Array}
 */
export const sortCarousels = (elements) => {
  if (elements.length >= 2) {
    const thumbCarousels = [];
    const mainCarousels = elements.filter((element) => {
      const thumbs = findThumbs(element);
      if (thumbs) {
        thumbCarousels.push(thumbs);
      }

      return thumbs;
    });

    // There is no thumbs
    if (!mainCarousels.length) {
      return elements;
    } else {
      let newElements = [...thumbCarousels, ...mainCarousels];
      if (newElements.length < elements.length) {
        elements.forEach((element) => {
          const found = newElements.find((newElement) =>
            newElement.isSameNode(element),
          );

          if (!found) {
            newElements.push(element);
          }
        });
      }

      return newElements;
    }
  }

  return elements;
};

/**
 * Get the thumbs carousel from the manager
 *
 * @param {Node} element
 * @param {Array} manager
 * @returns {Array}
 */
export const getThumbsCarousel = (element, manager) => {
  let foundThumbs;
  const foundThumbsElement = findThumbs(element);
  if (foundThumbsElement) {
    foundThumbs = Object.values(manager).find((instance) =>
      instance.sliderElement.isSameNode(foundThumbsElement),
    );
  }

  return foundThumbs && foundThumbs?.slider
    ? { swiper: foundThumbs.slider }
    : undefined;
};

/**
 * Get the valid value for slidesPerView
 *
 * @param {mixed} rawValue
 * @returns {String}
 */
export const refineSlidesPerView = (rawValue) => {
  if (!rawValue) {
    return "";
  }

  let value = rawValue;
  if (toType(rawValue) === "object") {
    value = rawValue?.auto ? "auto" : rawValue?.value;
  }

  if (value === "auto") {
    return value;
  }

  value = parseFloat(value);

  return isNaN(value) ? 1 : value;
};
