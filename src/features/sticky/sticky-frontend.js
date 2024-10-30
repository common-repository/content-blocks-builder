/**
 * Internal dependencies
 */

class StickyFrontend {
  constructor(element, options = {}) {
    // Bail if there is no valid element
    if (!element) {
      return;
    }

    this.element = element;

    // Get user options
    this.options = Object.assign(
      {
        root: window,
      },
      options,
    );

    this.root = this.options.root;

    // Keep the fixed element in document flow
    this.isInFlow = this.element.classList.contains("is-in-flow");

    // Detecting the page's scroll state
    this.isDetectingScroll = this.element.classList.contains(
      "is-detecting-scroll",
    );

    // Mark resize ticking as false
    this.resizeTicking = false;

    // Mark scroll ticking as false
    this.scrollTicking = false;

    // Kick start
    this.init();
  }

  /**
   * Kick start
   */
  init() {
    // Bind events
    this.eventBinding();

    // Only do this if detecting scroll state enabled
    if (this.isDetectingScroll) {
      // On page load
      requestAnimationFrame(this.handleScroll.bind(this));
    }

    // Only do this calculate if keeping fixed element in flow
    if (this.isInFlow) {
      // On page load
      requestAnimationFrame(this.calculateStyle.bind(this));
    }
  }

  /**
   * Event handling
   */
  eventBinding() {
    // Only do this if detecting scroll state enabled
    if (this.isDetectingScroll) {
      // Update on scroll
      this.root.addEventListener("scroll", this.updateOnScroll.bind(this));
    }

    // Only do this calculate if keeping fixed element in flow
    if (this.isInFlow) {
      // Update on resize
      this.root.addEventListener("resize", this.updateOnResize.bind(this));
    }
  }

  buildPlaceholderNode() {
    if (!this.placeholderNode) {
      const nextNode = document.createElement("div");

      nextNode.classList.add("is-sticky-placeholder");
      nextNode.style.height = `${this.getOuterHeight()}px`;

      this.element.insertAdjacentElement("afterend", nextNode);

      this.placeholderNode = nextNode;
    }
  }

  /**
   * Get the outerHeight of elmenent
   *
   * @returns {Integer}
   */
  getOuterHeight() {
    return (
      this.element.offsetHeight +
      parseFloat(this.elementStyle.marginTop) +
      parseFloat(this.elementStyle.marginBottom)
    );
  }

  calculateStyle() {
    if (!this.elementStyle) {
      this.elementStyle = getComputedStyle(this.element);
    }
    this.buildPlaceholderNode();
    this.placeholderNode.style.height = `${this.getOuterHeight()}px`;

    this.resizeTicking = false;
  }

  updateOnResize() {
    // Not ready to update the DOM yet.
    if (!this.resizeTicking) {
      requestAnimationFrame(this.calculateStyle.bind(this));

      this.resizeTicking = true;
    }
  }

  handleScroll() {
    this.element.classList.toggle("has-scrolled", this.root.scrollY > 0);

    this.scrollTicking = false;
  }

  updateOnScroll() {
    // Not ready to update the DOM yet.
    if (!this.scrollTicking) {
      requestAnimationFrame(this.handleScroll.bind(this));

      this.scrollTicking = true;
    }
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const customStickyElements = [].slice.call(
    document.querySelectorAll(
      ".is-fixed.is-in-flow, .is-fixed.is-detecting-scroll",
    ),
  );

  if (customStickyElements.length) {
    customStickyElements.forEach((element) => {
      new StickyFrontend(element);
    });
  }
});
