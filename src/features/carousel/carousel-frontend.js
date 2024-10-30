/**
 * Internal depedencies
 */
import {
  getCarouselManager,
  sortCarousels,
  getThumbsCarousel,
} from "./utils-for-frontend";
import CarouselScript from "./carousel-script";
import "./handle-video";
import "./preloader";

/**
 * Kick start the carousel on frontend.
 */
window.addEventListener("DOMContentLoaded", function () {
  let carouselElements = [].slice.call(
    document.querySelectorAll(".js-carousel-layout"),
  );

  if (carouselElements.length) {
    // Ignore admin side
    carouselElements = carouselElements.filter(
      (element) => !element?.dataset?.previewMode,
    );

    if (!carouselElements.length) {
      return;
    }

    // Sort first
    carouselElements = sortCarousels(carouselElements);

    const manager = getCarouselManager();
    carouselElements.forEach((carouselElement, index) => {
      const instanceSelector = `#bb-carousel-${index + 1}`;
      const args = {
        instanceSelector,
        sliderOptions: {
          thumbs: getThumbsCarousel(carouselElement, manager),
        },
      };

      if (carouselElement.classList.contains("wp-block-query")) {
        args["wrapperSelector"] = "ul";
        args["itemSelector"] = "li";
      }

      if (!carouselElement.closest(".is-toggle-content")) {
        manager[instanceSelector] = new CarouselScript(carouselElement, args);
      }

      carouselElement.addEventListener("cbb.carousel.start", () => {
        if (!manager[instanceSelector]) {
          manager[instanceSelector] = new CarouselScript(carouselElement, args);
        } else {
          const instance = manager[instanceSelector];
          if (instance?.slider) {
            if (instance?.sliderOptions?.autoplay) {
              instance.slider.autoplay.start();
            }
          }
        }
      });

      carouselElement.addEventListener("cbb.carousel.pause", () => {
        if (manager[instanceSelector]) {
          const instance = manager[instanceSelector];
          if (instance?.slider) {
            if (instance.slider.autoplay.running) {
              instance.slider.autoplay.pause();
            }
          }
        }
      });
    });
  }
});
