/**
 * Internal dependencies
 */
import {
  executeAfterTransition,
  isElement,
  getElement,
  getDataAttribute,
  Data,
  exposeComponent,
} from ".";

/**
 * Constants
 */

/**
 * Class definition
 */

class BaseComponent {
  constructor(element, config) {
    element = getElement(element);
    if (!element) {
      return;
    }

    this._element = element;
    this._config = this._getConfig(config);

    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);

    // for (const propertyName of Object.getOwnPropertyNames(this)) {
    //   this[propertyName] = null;
    // }
  }

  _queueCallback(callback, element, immediate = false) {
    executeAfterTransition(callback, element, immediate);
  }

  _getConfig(config, element = this._element) {
    config = this._mergeConfigObj(config, element);
    return config;
  }

  _mergeConfigObj(config, element) {
    const jsonConfig = isElement(element)
      ? getDataAttribute(element, "cbbConfig")
      : {}; // try to parse

    return {
      ...this.defaultConfig(),
      ...(typeof jsonConfig === "object" ? jsonConfig : {}),
      ...(typeof config === "object" ? config : {}),
    };
  }

  _parseConfigObj(config) {
    return {
      ...this.constructor.Default,
      ...(typeof config === "object" ? config : {}),
    };
  }

  defaultConfig() {
    return {};
  }

  filterKey(key) {
    return key;
  }
  refineKey(key) {
    return key;
  }

  // Static
  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY);
  }

  static getOrCreateInstance(element, config = {}) {
    return (
      this.getInstance(element) ||
      new this(element, typeof config === "object" ? config : null)
    );
  }

  static get NAME() {
    throw new Error(
      'You have to implement the static method "NAME", for each component!'
    );
  }

  static get DATA_KEY() {
    return `cbb.${this.NAME}`;
  }
}

exposeComponent("BaseComponent", BaseComponent);

export { BaseComponent };
