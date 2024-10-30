import { BaseComponent, exposeComponent, triggerEvent } from "../../utils/dom";

/**
 * External dependencies
 */
import Swiper from "swiper";
import {
  // Virtual,
  // Keyboard,
  // Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  // Parallax,
  // Zoom,
  // Controller,
  A11y,
  // History,
  // HashNavigation,
  Autoplay,
  Thumbs,
  // FreeMode,
  // Grid,
  // Manipulation,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  EffectCreative,
  EffectCards,
} from "swiper/modules";

Swiper.use([
  // Virtual,
  // Keyboard,
  // Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  // Parallax,
  // Zoom,
  // Controller,
  A11y,
  // History,
  // HashNavigation,
  Autoplay,
  Thumbs,
  // FreeMode,
  // Grid,
  // Manipulation,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  EffectCreative,
  EffectCards,
]);

/**
 * Internal dependencies
 */
import { refineSlidesPerView } from "./utils-for-frontend";
const getColorCSSValue = (color) => {
  return color !== null && typeof color === "object"
    ? color?.slug
      ? `var(--wp--preset--color--${color?.slug}, ${color?.value})`
      : color?.value
    : color;
};

const isValidColor = (color) =>
  color &&
  ((typeof color === "object" && (color?.slug || color?.value)) ||
    typeof color === "string");

const getBreakpointKey = (defaultKey) => {
  let newKey = defaultKey;
  let customBreakpoints = null;
  try {
    customBreakpoints = window?.CBBBreakpoints;
  } catch (error) {}
  // Get saved breakpoints
  if (customBreakpoints) {
    if (parseInt(defaultKey) === 576 && customBreakpoints?.sm?.breakpoint) {
      newKey = customBreakpoints?.sm?.breakpoint;
    } else if (
      parseInt(defaultKey) === 768 &&
      customBreakpoints?.md?.breakpoint
    ) {
      newKey = customBreakpoints?.md?.breakpoint;
    } else if (
      parseInt(defaultKey) === 1024 &&
      customBreakpoints?.lg?.breakpoint
    ) {
      newKey = customBreakpoints?.lg?.breakpoint;
    }
  }

  return newKey;
};

class CarouselScript extends BaseComponent {
  constructor(element, options = {}) {
    // Get this._element and this._config
    super(element, options);

    // Bail if the element is not a DOM node
    if (!element) {
      return;
    }

    // Legacy compatibility
    // Store the main element
    this.sliderElement = this._element;
    // Store the original source
    this.originalSource = this.sliderElement.cloneNode(true);
    this.settings = this._config;

    // Instance id
    this.settings["instanceId"] = this.settings.instanceSelector.replace(
      "#",
      "",
    );

    this.document = element.ownerDocument;

    if (this.settings["datasetSelector"]) {
      this.datasetElement = this.sliderElement.querySelector(
        this.settings["datasetSelector"],
      );
    } else {
      this.datasetElement = this.sliderElement;
    }

    // Get slider options
    this.sliderOptions = this.getSliderOptions(options?.sliderOptions);

    // The slider element
    this.getSliderElements();

    // The slider instance
    this.slider = false;
    this.sliderPagination = false;

    // Kick start
    this.init();
  }

  static get NAME() {
    return "carousel";
  }

  defaultConfig() {
    return {
      selector: ".js-carousel-layout",
      wrapperSelector: ".carousel__inner",
      itemSelector: ".is-carousel-item",
      containerClass: "swiper",
      wrapperClass: "swiper-wrapper",
      itemClass: "swiper-slide",
      paginationClass: "swiper-pagination",
      navigationNextClass: "swiper-button-next",
      navigationPrevClass: "swiper-button-prev",
      scrollbarClass: "swiper-scrollbar",
      instanceSelector: "#bb-carousel-1",
      datasetSelector: "",
    };
  }

  init() {
    // Page load
    if (!this.slider) {
      // Setup the slider.
      this.buildSlider();
    }
  }

  getSliderOptions(options) {
    // Slider default options
    let sliderOptions = {
      // Optional parameters
      direction: "horizontal",
      loop: false,
      grabCursor: true,
      pagination: true,
      navigation: false,
      scrollbar: false,

      // Slides per view
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      watchSlidesProgress: true,
      on: {
        afterInit(swiper) {
          triggerEvent(window, "cbb.carousel.afterInit", { swiper });
        },
        slideChangeTransitionStart(swiper) {
          triggerEvent(window, "cbb.carousel.slideChangeTransitionStart", {
            swiper,
          });
        },
        slideChangeTransitionEnd(swiper) {
          triggerEvent(window, "cbb.carousel.slideChangeTransitionEnd", {
            swiper,
          });
        },
      },
    };

    // Parse settings from attribute
    const attributeOptions =
      (this.datasetElement.dataset.carouselSettings &&
        JSON.parse(this.datasetElement.dataset.carouselSettings)) ||
      {};

    Object.keys(attributeOptions).forEach((key) => {
      let attributeValue = attributeOptions[key];
      if (key === "slidesPerView") {
        attributeValue = refineSlidesPerView(attributeOptions[key]);
      } else if (key === "breakpoints") {
        attributeValue = attributeOptions[key] ?? {};
        const breakpointKeys = Object.keys(attributeValue);
        breakpointKeys.forEach((key) => {
          // Get saved breakpoints
          const savedKey = getBreakpointKey(key);
          let value = attributeValue[key] ?? {};
          if (savedKey != key) {
            delete attributeValue[key];
          }

          if (value?.slidesPerView) {
            attributeValue = {
              ...attributeValue,
              [savedKey]: {
                ...value,
                slidesPerView: refineSlidesPerView(value.slidesPerView),
              },
            };
          }
        });
      }

      sliderOptions[key] = attributeValue;
    });

    // Override slidesPerView, slidesPerGroup, spaceBetween
    if (sliderOptions.breakpoints) {
      const breakpointValues = Object.values(sliderOptions.breakpoints);
      if (!!breakpointValues.length) {
        const {
          slidesPerView: slidesPerViewRaw,
          slidesPerGroup,
          spaceBetween,
        } = breakpointValues[0] ?? {};

        const slidesPerView = refineSlidesPerView(slidesPerViewRaw);

        if (slidesPerView) {
          sliderOptions["slidesPerView"] = slidesPerView;

          if (slidesPerView > 1 && slidesPerGroup) {
            sliderOptions["slidesPerGroup"] = slidesPerGroup;
          }
        }

        if (spaceBetween) {
          sliderOptions["spaceBetween"] = spaceBetween;
        }
      }
    }

    // Autoplay, rewind, stopOnLastSlide
    if (
      sliderOptions?.autoplay &&
      !sliderOptions?.loop &&
      !sliderOptions?.rewind
    ) {
      if (typeof sliderOptions.autoplay === "object") {
        sliderOptions.autoplay = {
          ...sliderOptions.autoplay,
          stopOnLastSlide: true,
        };
      }
    }

    if (options) {
      sliderOptions = Object.assign(sliderOptions, options);
    }

    // Build pagination
    sliderOptions.paginationSelector = `${this.settings.instanceId}-pagination`;
    sliderOptions["pagination"] = this.buildPaginationOptions(sliderOptions);

    // Build navigation
    sliderOptions.navigationNextSelector = `${this.settings.instanceId}-navigation-next`;
    sliderOptions.navigationPrevSelector = `${this.settings.instanceId}-navigation-prev`;
    sliderOptions["navigation"] = this.buildNavigationOptions(sliderOptions);

    // Build scrollbar
    sliderOptions.scrollbarSelector = `${this.settings.instanceId}-scrollbar`;
    sliderOptions["scrollbar"] = this.buildScrollbarOptions(sliderOptions);

    // Get slider options
    return sliderOptions;
  }

  getSliderElements() {
    this.sliderWrapper = this.sliderElement.querySelector(
      this.settings.wrapperSelector,
    );

    if (this.sliderWrapper) {
      this.hasSlideWrapper = true;
    } else {
      this.hasSlideWrapper = false;
      // Create wraper element
      this.sliderWrapper = this.document.createElement("div");
    }

    this.sliderItems = [].slice.call(
      this.sliderElement.querySelectorAll(this.settings.itemSelector),
    );

    // Wrap the slider wrapper inside a container
    this.sliderContainer = this.document.createElement("div");
    this.sliderContainer.appendChild(this.sliderWrapper);
    this.sliderElement.appendChild(this.sliderContainer);
  }

  buildSlider() {
    // Add Swiper class
    this.addClass(this.sliderContainer, this.settings.containerClass);

    if (
      !!this.sliderItems?.length &&
      !this.sliderItems[0].classList.contains(this.settings.itemClass)
    ) {
      this.sliderItems.forEach((item) => {
        if (!item.classList.contains(this.settings.itemClass)) {
          item.classList.add(this.settings.itemClass);
        }
      });
    }

    // Add swiper class
    this.addClass(this.sliderWrapper, this.settings.wrapperClass);

    if (!this.hasSlideWrapper) {
      // Attach items
      this.sliderWrapper.append(...this.sliderItems);

      // Add the wrapper to the slider element
      this.sliderElement.appendChild(this.sliderWrapper);
    }

    // centeredSlides
    if (
      this.sliderOptions?.centeredSlides &&
      this.sliderOptions?.effect === "slide" &&
      this.sliderOptions?.centeredSlidesSettings?.enable
    ) {
      let inactiveSize = parseFloat(
        this.sliderOptions.centeredSlidesSettings?.inactiveSize,
      );

      if (!isNaN(inactiveSize)) {
        this.addClass(this.sliderWrapper, "centered-active-slide");
        this.sliderElement.style.setProperty(
          "--swiper-inactive-scale",
          inactiveSize,
        );
      }
    }

    // Navigation
    this.buildNavigationMarkup();

    // Pagination
    this.buildPaginationMarkup();

    // Scrollbar
    this.buildScrollbarMarkup();

    this.addClass(this.sliderElement, "slider-initialized");

    if (this.sliderOptions?.equalHeight) {
      this.addClass(this.sliderWrapper, "is-equal-height");
    }

    // Initialize the slider.
    this.slider = new Swiper(this.sliderContainer, this.sliderOptions);
  }

  dispose() {
    super.dispose();

    if (this.slider) {
      // Swiper's destroy
      this.slider.destroy();

      // Remove the instance
      this.slider = null;

      // Restore the original source
      this.sliderElement.replaceWith(this.originalSource);
    }
  }

  /**
   * Build pagination
   *
   * @param {Object} sliderOptions
   * @returns
   */
  buildPaginationOptions(sliderOptions) {
    let pagination = false;
    if (sliderOptions?.pagination) {
      pagination = {
        el: `#${sliderOptions.paginationSelector}`,
        renderBullet(i) {
          return `<span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide ${
            i + 1
          }"><span class="swiper-pagination-bullet__dot"></span></span>`;
        },
        clickable: true,
        dynamicBullets:
          sliderOptions?.paginationSettings?.dynamicBullets ?? false,
      };
    }

    return pagination;
  }

  /**
   * Build pagination markup
   */
  buildPaginationMarkup() {
    if (this.sliderOptions.pagination) {
      // Create pagination wrapper
      this.sliderPagination = this.document.createElement("div");

      // Add id
      this.sliderPagination.setAttribute(
        "id",
        this.sliderOptions.paginationSelector,
      );

      // Add class
      this.sliderPagination.classList.add(this.settings.paginationClass);

      // Add the pagination to the slider element
      this.sliderElement.appendChild(this.sliderPagination);

      this.sliderOptions.pagination = {
        ...this.sliderOptions.pagination,
        el: this.sliderPagination,
      };

      // Add classes
      // this.sliderElement.classList.add("swiper--bullets-bottom");

      // Add custom variables
      if (this.sliderOptions?.paginationSettings?.size) {
        this.sliderElement.style.setProperty(
          "--swiper-pagination-bullet-size",
          this.sliderOptions.paginationSettings.size,
        );
      }

      if (this.sliderOptions?.paginationSettings?.spacing) {
        this.sliderElement.style.setProperty(
          "--swiper-pagination-spacing",
          this.sliderOptions.paginationSettings.spacing,
        );
      }

      if (isValidColor(this.sliderOptions?.paginationSettings?.color)) {
        this.sliderElement.style.setProperty(
          "--swiper-pagination-color",
          getColorCSSValue(this.sliderOptions.paginationSettings.color),
        );
      }

      if (isValidColor(this.sliderOptions?.paginationSettings?.inactiveColor)) {
        this.sliderElement.style.setProperty(
          "--swiper-pagination-bullet-inactive-color",
          getColorCSSValue(this.sliderOptions.paginationSettings.inactiveColor),
        );
      }

      if (this.sliderOptions?.paginationSettings?.opacity) {
        this.sliderElement.style.setProperty(
          "--swiper-pagination-bullet-inactive-opacity",
          this.sliderOptions.paginationSettings.opacity,
        );
      }

      if (this.sliderOptions?.paginationSettings?.horizontalGap) {
        this.sliderElement.style.setProperty(
          "--swiper-pagination-bullet-horizontal-gap",
          this.sliderOptions.paginationSettings.horizontalGap,
        );
      }
    }
  }

  /**
   * Build navigation
   *
   * @param {Object} sliderOptions
   * @returns
   */
  buildNavigationOptions(sliderOptions) {
    let navigation = false;
    if (sliderOptions?.navigation) {
      navigation = {
        nextEl: `#${sliderOptions.navigationNextSelector}`,
        prevEl: `#${sliderOptions.navigationPrevSelector}`,
      };
    }

    return navigation;
  }

  /**
   * Build navigation markup
   */
  buildNavigationMarkup() {
    if (this.sliderOptions.navigation) {
      // Create naviation next button
      this.sliderNavigationNext = this.document.createElement("div");

      // Add id
      this.sliderNavigationNext.setAttribute(
        "id",
        this.sliderOptions.navigationNextSelector,
      );

      // Add class
      this.sliderNavigationNext.classList.add(
        this.settings.navigationNextClass,
      );

      if (this.sliderOptions.navigationSettings?.nextIcon?.value) {
        this.sliderNavigationNext.classList.add("has-custom-icon");
        this.sliderNavigationNext.insertAdjacentHTML(
          "afterbegin",
          this.sliderOptions.navigationSettings?.nextIcon?.value,
        );
      }

      // Add the naviation button to the slider element
      this.sliderElement.appendChild(this.sliderNavigationNext);

      // Create naviation next button
      this.sliderNavigationPrev = this.document.createElement("div");

      // Add id
      this.sliderNavigationPrev.setAttribute(
        "id",
        this.sliderOptions.navigationPrevSelector,
      );

      // Add class
      this.sliderNavigationPrev.classList.add(
        this.settings.navigationPrevClass,
      );

      if (this.sliderOptions.navigationSettings?.prevIcon?.value) {
        this.sliderNavigationPrev.classList.add("has-custom-icon");
        this.sliderNavigationPrev.insertAdjacentHTML(
          "afterbegin",
          this.sliderOptions.navigationSettings?.prevIcon?.value,
        );
      }

      // Add the naviation button to the slider element
      this.sliderElement.appendChild(this.sliderNavigationPrev);

      this.sliderOptions.navigation = {
        ...this.sliderOptions.navigation,
        nextEl: this.sliderNavigationNext,
        prevEl: this.sliderNavigationPrev,
      };

      // Add class to mark the slider have navigation buttons
      this.sliderElement.classList.add("swiper--has-navigation");

      // Add custom variables
      if (this.sliderOptions?.navigationSettings?.size) {
        this.sliderElement.style.setProperty(
          "--swiper-navigation-size",
          this.sliderOptions.navigationSettings.size,
        );
      }

      if (this.sliderOptions?.navigationSettings?.spacing) {
        this.sliderElement.style.setProperty(
          "--swiper-navigation-spacing",
          this.sliderOptions.navigationSettings.spacing,
        );
      }

      if (isValidColor(this.sliderOptions?.navigationSettings?.color)) {
        this.sliderElement.style.setProperty(
          "--swiper-navigation-color",
          getColorCSSValue(this.sliderOptions.navigationSettings.color),
        );
      }
    }
  }

  /**
   * Build scrollbar
   *
   * @param {Object} sliderOptions
   * @returns
   */
  buildScrollbarOptions(sliderOptions) {
    let scrollbar = false;
    if (sliderOptions?.scrollbar) {
      scrollbar = {
        ...sliderOptions?.scrollbarSettings,
        el: `#${sliderOptions.scrollbarSelector}`,
      };
    }

    return scrollbar;
  }

  /**
   * Build scrollbar markup
   */
  buildScrollbarMarkup() {
    if (this.sliderOptions.scrollbar) {
      // Create scrollbar element
      this.sliderScrollbar = this.document.createElement("div");

      // Add id
      this.sliderScrollbar.setAttribute(
        "id",
        this.sliderOptions.scrollbarSelector,
      );

      // Add class
      this.sliderScrollbar.classList.add(this.settings.scrollbarClass);

      // Add the scrollbar to the slider element
      // this.sliderElement.appendChild(this.sliderScrollbar);
      this.sliderContainer.appendChild(this.sliderScrollbar);

      this.sliderOptions.scrollbar = {
        ...this.sliderOptions.scrollbar,
        el: this.sliderScrollbar,
      };

      // Add custom variables
      if (this.sliderOptions?.scrollbarSettings?.trackSize) {
        this.sliderElement.style.setProperty(
          "--swiper-scrollbar-track-size",
          this.sliderOptions.scrollbarSettings.trackSize,
        );
      }

      if (this.sliderOptions?.scrollbarSettings?.spacing) {
        this.sliderElement.style.setProperty(
          "--swiper-scrollbar-spacing",
          this.sliderOptions.scrollbarSettings.spacing,
        );
      }

      if (isValidColor(this.sliderOptions?.scrollbarSettings?.trackColor)) {
        this.sliderElement.style.setProperty(
          "--swiper-scrollbar-track-color",
          getColorCSSValue(this.sliderOptions.scrollbarSettings.trackColor),
        );
      }

      if (isValidColor(this.sliderOptions?.scrollbarSettings?.sliderColor)) {
        this.sliderElement.style.setProperty(
          "--swiper-scrollbar-slider-color",
          getColorCSSValue(this.sliderOptions.scrollbarSettings.sliderColor),
        );
      }

      if (this.sliderOptions?.scrollbarSettings?.trackOpacity) {
        this.sliderElement.style.setProperty(
          "--swiper-scrollbar-track-opacity",
          this.sliderOptions.scrollbarSettings.trackOpacity,
        );
      }
    }
  }

  addClass(element, classname) {
    if (!element.classList.contains(classname)) {
      element.classList.add(classname);
    }
  }
}

exposeComponent("CarouselScript", CarouselScript);

export default CarouselScript;
