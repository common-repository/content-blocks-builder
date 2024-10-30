/**
 * External dependencies
 */
import { computePosition, autoUpdate, flip, shift } from "@floating-ui/dom";

/**
 * Internal dependencies
 */
import {
  exposeComponent,
  BaseComponent,
  EVENTS,
  triggerEvent,
  reflow,
  isRTL,
  ScrollBarHelper,
  Backdrop,
  isElement,
} from "./dom";

/**
 * Modal class
 * Adapted from bootstrap modal
 */
class Modal extends BaseComponent {
  constructor(element, config = {}) {
    // Get this._element and this._config
    super(element, config);

    // Bail if the element is not valid
    if (!element) {
      return;
    }

    // Get dataset
    this._dataset = Object.assign(
      { toggleStateShown: "shown" },
      this._config.dataset ?? {},
      this._config.datasetElement?.dataset ?? {},
    );

    if (!this._dataset?.modalSettings?.disableBackdrop) {
      this._scrollBar = new ScrollBarHelper();
    }

    // Get the trigger elements
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

    // Get the initial state
    this._isOpen =
      this._dataset?.toggleState === this._dataset?.toggleStateShown;

    // Force to click on buttons to close
    this._forceCloseButtons = this._dataset?.modalSettings?.forceCloseButtons;

    this._isCustomAnimation =
      this._config.classAnimation === "custom-animation";

    // Mark transitioning state to false
    this._isTransitioning = false;

    // We need it for popover
    this._triggerElement =
      this._triggerArray && this._triggerArray?.length
        ? this._triggerArray[0]
        : null;

    // Modal type
    this.isModal = this._config.modalType === "modal";
    this.isPopover = this._config.modalType === "popover";
    this.isOffcanvas = this._config.modalType === "offcanvas";

    // Dialog element
    this._dialog = null;

    // Build modal markup
    this._modal = this._getModalMarkup();

    // Store the Backdrop
    this._backdrop = this._initializeBackDrop();

    // Initialize
    this.init();
  }

  static get NAME() {
    return "modal";
  }

  defaultConfig() {
    return {
      modalType: "modal",
      triggerArray: null,
      dataset: null,
      datasetElement: this._element,
      rootElement: document.body,
      classModalInitialized: "bb-modal-initialized",
      classModalHeader: "bb-modal-header",
      classModalTitle: "bb-modal-title",
      classTarget: "bb-modal-body",
      classModal: "bb-modal",
      classModalDialog: "bb-modal-dialog",
      classModalContent: "bb-modal-content",
      classAnimation: "fade",
      classTrigger: "",
      classShow: "show",
      classToggledOn: "is-toggled-on",
      classToggledOff: "is-toggled-off",
      classRootOpen: "modal-open",
      classDismiss: "is-close-modal",
      classStatic: "is-modal-static",
      classAnimatedWaiting: "animate__waiting",
      selectorTrigger: ".js-toggle-modal",
      selectorFocus: ".is-focus-first",
      selectorText: ".toggle__text",
      instanceIndex: 0,
      cachePrefix: "bb-modal-",
    };
  }

  init() {
    // Add classes to the modal
    this._element.classList.add(this._config.classTarget);

    if (this.isOffcanvas) {
      const placement = this._dataset?.modalSettings?.placement ?? "start";
      this._modal.classList.add(`placement-${placement}`);
    } else if (this.isPopover) {
      const placement =
        this._dataset?.modalSettings?.popoverPlacement ?? "bottom";
      const suffix =
        placement.startsWith("top") || placement.startsWith("bottom")
          ? "y"
          : "x";
      this._modal.classList.add(`placement-${suffix}`);
    }

    // Add classes and attributes to the trigger elements
    if (this._config.classTrigger && !!this._triggerArray.length) {
      for (const element of this._triggerArray) {
        if (!element.classList.contains(this._config.classTrigger)) {
          element.classList.add(this._config.classTrigger);

          // Make the div accessibility
          if (element.tagName.toUpperCase() === "DIV" && !element?.role) {
            element.setAttribute("role", "button");
          }
        }
      }
    }

    // Add classes and accessibility attribute
    this._addAriaAndToggledClass();

    // Add click handler
    this.clickHandler = this.toggle.bind(this);

    // Bind click event
    if (!!this._triggerArray) {
      for (const element of this._triggerArray) {
        element.addEventListener("click", this.clickHandler);
      }
    }

    // Initial state
    if (this._isOpen) {
      this._isOpen = false;
      this.show();
      this._setTransitioning(false);
    }

    // Show the modal after a delay time
    this.handleCustomState(this._dataset?.toggleState);

    // Trigger init event
    triggerEvent(window, EVENTS.INIT, {
      target: this._element,
      modal: this._modal,
    });
  }

  handleCustomState(initialState) {
    if (initialState === "custom") {
      const cacheKey = this._dataset?.modalSettings?.uniqueId
        ? `${this._config.cachePrefix}${this._dataset?.modalSettings?.uniqueId}`
        : false;

      const hasStoredState = cacheKey ? this.getClosedState(cacheKey) : false;

      if (hasStoredState) {
        return;
      }

      let delayTime = 0;

      if (this._dataset?.modalSettings?.delayTime) {
        const delayTimeInt = parseInt(
          this._dataset?.modalSettings?.delayTime,
          10,
        );

        if (!isNaN(delayTimeInt)) {
          delayTime = delayTimeInt;
        }
      }

      setTimeout(() => {
        this.show();
      }, delayTime * 1000);

      if (cacheKey) {
        const storedTimeRaw = this._dataset?.modalSettings?.storedTime;
        if (storedTimeRaw) {
          this._element.addEventListener(EVENTS.HIDDEN, () => {
            this.setClosedState(cacheKey, storedTimeRaw);
          });
        }
      }
    }
  }

  getClosedState(key) {
    let value = localStorage.getItem(key);
    if (value && value !== "permanent") {
      value = parseFloat(value);
      if (!isNaN(value)) {
        if (new Date().getTime() / 86400000 > value) {
          localStorage.removeItem(key);

          return null;
        }
      }
    }

    return value;
  }

  setClosedState(key, ttl) {
    if (ttl === "permanent") {
      localStorage.setItem(key, ttl);
    } else {
      ttl = parseFloat(ttl);
      if (!isNaN(ttl)) {
        const days = new Date().getTime() / 86400000;
        localStorage.setItem(key, days + ttl);
      }
    }
  }

  toggle(e) {
    if (e && e?.preventDefault) {
      e.preventDefault();
    }

    if (this._triggerArray?.length > 1 && isElement(e.target)) {
      let target = null;
      if (this._config.classTrigger) {
        target = e.target.closest(`.${this._config.classTrigger}`);
      }

      if (!target) {
        target = e.target;
      }

      this._triggerElement = target;
    }

    if (!this._isOpen) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    // Ignore if it is still transitioning
    if (this._isOpen || this._isTransitioning) return;

    triggerEvent(this._element, EVENTS.SHOW);

    this._isOpen = true;
    this._setTransitioning(true);
    this._addAriaAndToggledClass();

    if (!this._dataset?.modalSettings?.disableBackdrop) {
      this._scrollBar.hide();
      this._adjustDialog();
    }

    // Add class to root element
    this._config.rootElement.classList.add(this._config.classRootOpen);

    this._setEscapeEvent();

    this._backdrop.show(this._showModal.bind(this));
  }

  _showModal() {
    if (this.isModal) {
      this._modal.style.display = "flex";
    } else {
      this._modal.style.visibility = "visible";
    }
    this._modal.removeAttribute("aria-hidden");
    this._modal.setAttribute("role", "dialog");
    this._modal.setAttribute("aria-modal", true);

    if (this.isPopover && this._triggerElement) {
      const placement =
        this._dataset?.modalSettings?.popoverPlacement ?? "bottom";
      autoUpdate(this._triggerElement, this._modal, () => {
        computePosition(this._triggerElement, this._modal, {
          strategy: "fixed",
          placement,
          middleware: [flip(), shift()],
        }).then(({ x, y }) => {
          Object.assign(this._modal.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      });
    }

    reflow(this._modal);

    this._modal.classList.add(this._config.classShow);

    // Execute callback after transition
    this._queueCallback(
      this._transitionEnd.bind(this),
      this.isModal ? this._dialog : this._modal,
    );
  }

  hide() {
    // Ignore if it is still transitioning
    if (!this._isOpen || this._isTransitioning) return;

    triggerEvent(this._element, EVENTS.HIDE);

    this._isOpen = false;
    this._setTransitioning(true);
    this._addAriaAndToggledClass();

    // Remove toggle, show classes
    this._modal.classList.remove(this._config.classShow);

    this._setEscapeEvent();

    // Execute callback after transition
    this._queueCallback(
      this._hideModal.bind(this),
      this.isModal ? this._dialog : this._modal,
    );
  }

  _hideModal() {
    if (this.isModal) {
      this._modal.style.display = "none";
    } else {
      this._modal.style.visibility = "hidden";
    }
    this._modal.setAttribute("aria-hidden", true);
    this._modal.removeAttribute("aria-modal");
    this._modal.removeAttribute("role");

    if (this._isCustomAnimation) {
      this._element.classList.add(this._config.classAnimatedWaiting);
    }

    this._backdrop.hide(this._transitionEnd.bind(this));
  }

  _getModalMarkup() {
    if (!this?._modal) {
      const hasTitle = this._dataset?.modalSettings?.title;

      this._modal = document.createElement("div");
      this._modal.classList.add(
        this._config.classModal,
        this._config.classAnimation,
        this._config.classModalInitialized,
        `is-${this._config.modalType}`,
      );
      this._modal.setAttribute("tabindex", -1);
      if (hasTitle) {
        this._modal.setAttribute(
          "aria-labelledby",
          `#bb-dialog-title-${this._config.instanceIndex}`,
        );
      }

      if (this._dataset?.modalSettings?.hasCustomPosition) {
        this._modal.classList.add("modal--custom-position");
      }

      if (this._dataset?.modalSettings?.selector) {
        this._modal.classList.add(this._dataset.modalSettings.selector);
      }

      if (this.isModal && this._dataset?.modalSettings?.modalPosition) {
        this._modal.classList.add("modal--custom-position");
      }

      this._dialog = document.createElement("div");
      this._dialog.classList.add(...this._config.classModalDialog.split(" "));

      if (this._dataset?.modalSettings?.cssText) {
        if (this.isModal) {
          this._dialog.style.cssText = this._dataset?.modalSettings?.cssText;
        } else {
          this._modal.style.cssText = this._dataset?.modalSettings?.cssText;
        }
      }

      if (this._dataset?.modalSettings?.cssTextModal) {
        if (this.isModal) {
          this._modal.style.cssText =
            this._dataset?.modalSettings?.cssTextModal;
        }
      }

      // Create modal content wrapper
      const modalContent = document.createElement("div");
      modalContent.classList.add(this._config.classModalContent);

      // Modal header
      const modalHeader = document.createElement("div");
      modalHeader.classList.add(this._config.classModalHeader);

      // Add modal title
      if (hasTitle) {
        const title = document.createElement("h4");
        title.classList.add(this._config.classModalTitle);
        title.textContent = this._dataset.modalSettings.title;
        title.setAttribute(
          "id",
          `#bb-dialog-title-${this._config.instanceIndex}`,
        );
        title.style.cssText = `position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0, 0, 0, 0);white-space: nowrap;border-width: 0;`;

        modalHeader.appendChild(title);
        modalHeader.classList.add("has-title");
      } else {
        modalHeader.classList.add("has-no-title");
      }

      if (this._element.style.cssText) {
        let marginStyles = this._element.style.cssText.split(";");
        if (marginStyles.length > 0) {
          marginStyles = marginStyles.filter(
            (attributeName) =>
              attributeName.trim().indexOf("--bb--margin-top") !== -1 ||
              attributeName.trim().indexOf("--bb--margin-right") !== -1,
          );

          if (marginStyles.length > 0) {
            modalHeader.style.cssText = marginStyles.join(";");
          }
        }
      }

      // Add close button
      const closeButton = document.createElement("button");
      closeButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="btn-close__icon"><path d="m13 11.8 6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"/></svg>';
      closeButton.setAttribute("type", "button");
      closeButton.setAttribute("aria-label", "Close");
      closeButton.classList.add("btn-close", this._config.classDismiss);

      if (this._dataset?.modalSettings?.closeButtonColor) {
        closeButton.style.setProperty(
          "color",
          this._dataset.modalSettings.closeButtonColor,
        );
      }

      if (!this._dataset?.modalSettings?.hideCloseButton) {
        modalHeader.appendChild(closeButton);
      }

      // Add header to the
      modalContent.appendChild(modalHeader);

      this._element.parentNode
        .insertBefore(this._modal, this._element)
        .appendChild(this._dialog)
        .appendChild(modalContent)
        .appendChild(this._element);

      this._element.classList.remove("is-modal-body");

      // Close modal when clicking outside of the modal content
      this._modal.addEventListener("click", (e) => {
        if (!modalContent.contains(e.target)) {
          if (this._forceCloseButtons) {
            this._highlightModal();
          } else {
            this.hide();
          }
        }
      });

      // Close modal when clicking on close button
      closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.hide();
      });

      // Close modal when clicking on a 'close' elements inside the body
      [].slice
        .call(this._element.querySelectorAll(`.${this._config.classDismiss}`))
        .forEach((elem) => {
          elem.addEventListener("click", (e) => {
            e.preventDefault();

            this.hide();
          });
        });
    }

    return this._modal;
  }

  _setEscapeEvent() {
    if (this._isOpen) {
      this._modal.addEventListener(
        "keydown",
        this._closeOnEscapeKey.bind(this),
      );
    } else {
      this._modal.removeEventListener(
        "keydown",
        this._closeOnEscapeKey.bind(this),
      );
    }
  }

  _closeOnEscapeKey(e) {
    if (e.key === "Escape") {
      e.preventDefault();

      if (this._forceCloseButtons) {
        this._highlightModal();
      } else {
        this.hide();
      }
    }
  }

  _addAriaAndToggledClass() {
    if (!!this._triggerArray.length) {
      for (const element of this._triggerArray) {
        element.classList.toggle(this._config.classToggledOn, this._isOpen);
        element.classList.toggle(this._config.classToggledOff, !this._isOpen);
        element.setAttribute("aria-expanded", this._isOpen);
      }
    }
  }

  _setTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  }

  _transitionEnd() {
    // Mark the transition state as stopped
    this._setTransitioning(false);

    if (!this._isOpen) {
      this._config.rootElement.classList.remove(this._config.classRootOpen);

      if (!this._dataset?.modalSettings?.disableBackdrop) {
        this._resetAdjustments();
        this._scrollBar.reset();
      }

      triggerEvent(this._element, EVENTS.HIDDEN);
      triggerEvent(window, EVENTS.HIDDEN, {
        target: this._element,
        modal: this._modal,
        config: this._config,
        modalSettings: this._dataset?.modalSettings,
      });
    } else {
      this._modal.focus();

      // Focus the first focusable element on the target
      if (this._dataset?.toggleFocusFirstElement === "true") {
        this._focusFirstFocusableElement(this._element);
      }

      triggerEvent(this._element, EVENTS.SHOWN);
      triggerEvent(window, EVENTS.SHOWN, {
        target: this._element,
        modal: this._modal,
        config: this._config,
        modalSettings: this._dataset?.modalSettings,
      });
    }
  }

  _focusFirstFocusableElement(elem) {
    let firstFocusableElement = elem.querySelector(this._config.selectorFocus);
    if (!firstFocusableElement) {
      firstFocusableElement = elem.querySelector(
        'button, input:not([type="hidden"]), select, textarea, a[href]',
      );
    } else {
      if (
        firstFocusableElement?.tagName === "DIV" &&
        firstFocusableElement.classList.contains("wp-block-button")
      ) {
        firstFocusableElement = firstFocusableElement.querySelector("a");
      }
    }

    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }

  _adjustDialog() {
    const isModalOverflowing =
      this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = this._scrollBar.getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;

    if (isBodyOverflowing && !isModalOverflowing) {
      const property = isRTL() ? "paddingLeft" : "paddingRight";
      this._element.style[property] = `${scrollbarWidth}px`;
    }

    if (!isBodyOverflowing && isModalOverflowing) {
      const property = isRTL() ? "paddingRight" : "paddingLeft";
      this._element.style[property] = `${scrollbarWidth}px`;
    }
  }

  _resetAdjustments() {
    this._element.style.paddingLeft = "";
    this._element.style.paddingRight = "";
  }

  _initializeBackDrop() {
    return new Backdrop({
      isVisible: !this._dataset?.modalSettings?.disableBackdrop,
      clickCallback: this._forceCloseButtons
        ? this._highlightModal.bind(this)
        : this.hide.bind(this),
    });
  }

  _highlightModal() {
    const initialOverflowY = this._modal.style.overflowY;

    if (this._modal.classList.contains(this._config.classStatic)) {
      return;
    }

    this._modal.classList.add(this._config.classStatic);
    this._modal.style.overflowY = "hidden";

    this._queueCallback(
      () => {
        this._modal.classList.remove(this._config.classStatic);

        this._queueCallback(
          () => {
            this._modal.style.overflowY = initialOverflowY;
          },
          this.isModal ? this._dialog : this._modal,
        );
      },
      this.isModal ? this._dialog : this._modal,
    );
  }
}

exposeComponent("Modal", Modal);

export default Modal;
