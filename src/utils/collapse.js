/**
 * Internal dependencies
 */
import {
  exposeComponent,
  BaseComponent,
  EVENTS,
  triggerEvent,
  reflow,
} from "./dom";

/**
 * Collapse class
 * Adapted from bootstrap collapse
 */
class Collapse extends BaseComponent {
  constructor(element, config = {}) {
    // Get this._element and this._config
    super(element, config);

    // Bail if the element is not valid
    if (!element) {
      return;
    }

    // Legacy compatibility
    this.element = this._element;

    // Get dataset
    this._dataset = Object.assign(
      { toggleStateShown: "shown" },
      this._config.dataset ?? {},
      this._config.datasetElement?.dataset ?? {},
    );

    // Get the tigger elements
    if (this._config.triggerArray) {
      this._triggerArray = this._config.triggerArray;
    } else {
      let triggerSelector = this._dataset?.toggleElement
        ? this._dataset.toggleElement.trim()
        : "";

      if (!triggerSelector) {
        triggerSelector = this._config.selectorTrigger;
      }

      if (triggerSelector) {
        this._triggerArray = [].slice.call(
          document.querySelectorAll(triggerSelector),
        );
      }
    }

    // Get transition property
    this.transitionProperty = this._dataset?.transitionProperty ?? "height";
    this.calculatedTransitionProperty =
      ["width", "height"].indexOf(this.transitionProperty) !== -1
        ? `scroll${
            this.transitionProperty[0].toUpperCase() +
            this.transitionProperty.slice(1)
          }`
        : "";

    // Get the initial state
    this.isOpen = this._dataset?.toggleState === this._dataset.toggleStateShown;

    // Mark transitioning state to false
    this._isTransitioning = false;

    // Initialize
    this.init();
  }

  static get NAME() {
    return "collapse";
  }

  defaultConfig() {
    return {
      triggerArray: null,
      dataset: null,
      datasetElement: this._element,
      classTarget: "collapse",
      classTrigger: "",
      classShow: "show",
      classCollapsing: "collapsing",
      classToggledOn: "is-toggled-on",
      classToggledOff: "is-toggled-off",
      selectorTrigger: ".js-toggle-collapse",
      selectorText: ".toggle__text",
      instanceIndex: 0,
    };
  }

  init() {
    // Add transition property to target elements
    this._element.classList.add(`transition-${this.transitionProperty}`);

    // Add toggle class to the target elements
    if (!this._element.classList.contains(this._config.classTarget)) {
      this._element.classList.add(this._config.classTarget);
    }

    this._element.setAttribute("aria-expanded", this.isOpen);
    this._element.classList.toggle(this._config.classShow, this.isOpen);

    if (this.isOpen) {
      requestAnimationFrame(() => {
        triggerEvent(window, EVENTS.SHOWN, {
          target: this._element,
        });
      });
    }

    let collapseId = this._element.getAttribute("id");
    if (!collapseId) {
      collapseId = `bb-collapse-${this._config.instanceIndex}`;
      this._element.setAttribute("id", collapseId);
    }

    // Add classes and attributes to the trigger elements
    if (this._config.classTrigger && this._triggerArray.length) {
      for (const element of this._triggerArray) {
        if (!element.classList.contains(this._config.classTrigger)) {
          element.classList.add(this._config.classTrigger);
        }

        element.setAttribute("aria-controls", `#${collapseId}`);

        // Make the div accessibility
        if (element.tagName.toUpperCase() === "DIV" && !element?.role) {
          element.setAttribute("role", "button");
        }
      }
    }

    // Add toggled classes and accessibility attribute to the trigger elements
    this._addAriaAndToggledClass();

    // Add click handler
    this.clickHandler = this.toggle.bind(this);

    // Bind click event
    if (!!this._triggerArray.length) {
      for (const element of this._triggerArray) {
        element.addEventListener("click", this.clickHandler);
      }
    }

    triggerEvent(window, EVENTS.INIT, {
      target: this._element,
    });
  }

  toggle(e) {
    if (e && e?.preventDefault) {
      e.preventDefault();
    }

    if (!this.isOpen) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    // Ignore if it is still transitioning
    if (this.isOpen || this._isTransitioning) return;

    triggerEvent(this._element, EVENTS.SHOW);

    this.isOpen = true;
    this._setTransitioning(true);
    this._addAriaAndToggledClass();

    // Remove the toggle class
    this._element.classList.remove(this._config.classTarget);

    // Add transitioning class
    this._element.classList.add(this._config.classCollapsing);

    // Set inline style zero
    this._element.style[this.transitionProperty] = 0;

    // Execute callback after transition
    this._queueCallback(this._transitionEnd.bind(this), this._element);

    // Set inline style value
    this._element.style[this.transitionProperty] = `${
      this._element[this.calculatedTransitionProperty]
    }px`;
  }

  hide() {
    // Ignore if it is still transitioning
    if (!this.isOpen || this._isTransitioning) return;

    triggerEvent(this._element, EVENTS.HIDE);

    this.isOpen = false;
    this._setTransitioning(true);
    this._addAriaAndToggledClass();

    // Set inline style
    this._element.style[this.transitionProperty] = `${
      this._element[this.calculatedTransitionProperty]
    }px`;

    reflow(this._element);

    // Mark the element is about to toggle
    this._element.classList.add(this._config.classCollapsing);

    // Remove toggle, show classes
    this._element.classList.remove(
      this._config.classTarget,
      this._config.classShow,
    );

    // Clear transition value
    this._element.style[this.transitionProperty] = "";

    // Execute callback after transition
    this._queueCallback(this._transitionEnd.bind(this), this._element);
  }

  _addAriaAndToggledClass() {
    if (!!this._triggerArray.length) {
      for (const element of this._triggerArray) {
        element.classList.toggle(this._config.classToggledOn, this.isOpen);
        element.classList.toggle(this._config.classToggledOff, !this.isOpen);
        element.setAttribute("aria-expanded", this.isOpen);
      }
    }
  }

  _setTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  }

  _transitionEnd() {
    // Mark the transition state as stopped
    this._setTransitioning(false);

    this._element.setAttribute("aria-expanded", this.isOpen);

    // Remove the transitioning class
    this._element.classList.remove(this._config.classCollapsing);

    if (this.isOpen) {
      this._element.style[this.transitionProperty] = "";
      this._element.classList.add(
        this._config.classTarget,
        this._config.classShow,
      );

      // Focus the first focusable element on the target
      if (this._dataset?.toggleFocusFirstElement === "true") {
        this._focusFirstFocusableElement(this._element);
      }

      triggerEvent(this._element, EVENTS.SHOWN);
      triggerEvent(window, EVENTS.SHOWN, {
        target: this._element,
      });
    } else {
      this._element.classList.add(this._config.classTarget);
      triggerEvent(this._element, EVENTS.HIDDEN);
      triggerEvent(window, EVENTS.HIDDEN, {
        target: this._element,
      });
    }
  }

  _focusFirstFocusableElement(elem) {
    const firstFocusableElement = elem.querySelector(
      'button, input:not([type="hidden"]), select, textarea',
    );

    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }

  dispose() {
    super.dispose();

    if (!!this._triggerArray) {
      for (const element of this._triggerArray) {
        element.classList.remove(this._config.classToggledOn);
        element.classList.remove(this._config.classToggledOff);
        element.removeEventListener("click", this.clickHandler);
      }
    }

    this._element.classList.add(this._config.classShow);
  }
}

exposeComponent("Collapse", Collapse);

export default Collapse;
