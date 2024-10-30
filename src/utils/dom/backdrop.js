/**
 * Internal dependencies
 */
import {
  exposeComponent,
  reflow,
  executeAfterTransition,
  execute,
} from "./utils";

/**
 * Backdrop class
 */
class Backdrop {
  constructor(config = {}) {
    this._element = null;
    this._isAppended = false;

    // Default config
    const defaultConfig = {
      isVisible: true,
      rootElement: document.body,
      classBackdrop: "modal-backdrop fade",
      classShow: "show",
      clickCallback: null,
    };

    // Get config values
    this._config = Object.assign(defaultConfig, config);
  }

  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._append();

    reflow(this._getElement());

    this._getElement().classList.add(this._config.classShow);

    // callback();
    // Call a callback after transition
    executeAfterTransition(callback, this._getElement());
  }

  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._getElement().classList.remove(this._config.classShow);

    // Call a callback after transition
    executeAfterTransition(() => {
      this.dispose();
      callback();
    }, this._getElement());
  }

  dispose() {
    if (!this._isAppended) {
      return;
    }

    this._element.remove();
    this._isAppended = false;
  }

  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement("div");
      backdrop.className = this._config.classBackdrop;

      this._element = backdrop;
    }

    return this._element;
  }

  _append() {
    if (this._isAppended) {
      return;
    }

    this._config.rootElement.appendChild(this._getElement());

    if (typeof this._config.clickCallback === "function") {
      this._getElement().addEventListener("click", (e) => {
        e.preventDefault();

        this._config.clickCallback();
      });
    }

    this._isAppended = true;
  }
}

exposeComponent("Backdrop", Backdrop);

export { Backdrop };
