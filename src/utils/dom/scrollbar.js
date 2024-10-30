/**
 * Internal dependencies
 */
import { exposeComponent } from "./utils";

/**
 * Scrollbar helper
 */

const PROPERTY_PADDING = "padding-right";
class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }

  // Public
  getWidth() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }

  hide() {
    const width = this.getWidth();
    this._disableOverFlow();
    // give padding to element to balance the hidden scrollbar width
    this._setElementAttributes(
      this._element,
      PROPERTY_PADDING,
      (calculatedValue) => calculatedValue + width
    );
  }

  reset() {
    this._resetElementAttributes("overflow");
    this._resetElementAttributes(PROPERTY_PADDING);
  }

  isOverflowing() {
    return this.getWidth() > 0;
  }

  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow");
    this._element.style.overflow = "hidden";
  }

  _setElementAttributes(selector, styleProperty, callback) {
    const scrollbarWidth = this.getWidth();
    const manipulationCallBack = (element) => {
      if (window.innerWidth > element.clientWidth + scrollbarWidth) {
        return;
      }

      this._saveInitialAttribute(element, styleProperty);
      const calculatedValue = window
        .getComputedStyle(element)
        .getPropertyValue(styleProperty);
      element.style.setProperty(
        styleProperty,
        `${callback(Number.parseFloat(calculatedValue))}px`
      );
    };

    this._applyManipulationCallback(selector, manipulationCallBack);
  }

  _saveInitialAttribute(element, styleProperty) {
    const actualValue = element.style.getPropertyValue(styleProperty);
    if (actualValue) {
      element.setAttribute(`data-${styleProperty}`, actualValue);
    }
  }

  _resetElementAttributes(styleProperty) {
    const value = this._element?.dataset
      ? this._element.dataset[styleProperty]
      : null;

    this._element.removeAttribute(`data-${styleProperty}`);

    if (value) {
      this._element.style.setProperty(styleProperty, value);
    } else {
      this._element.style.removeProperty(styleProperty);
    }
  }

  _applyManipulationCallback(selector, callBack) {
    callBack(selector);
  }
}

exposeComponent("ScrollBarHelper", ScrollBarHelper);

export { ScrollBarHelper };
