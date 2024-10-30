import { EVENTS, BaseComponent, exposeComponent } from "../../utils/dom";
import Collapse from "../../utils/collapse";

class Accordion extends BaseComponent {
  constructor(element, config = {}) {
    // Get this._element and this._config
    super(element, config);

    // Bail if the element is not a DOM node
    if (!element) {
      return;
    }

    this.toggleElements = [].slice.call(
      this._element.querySelectorAll(".accordion-header")
    );

    // There is no toggle elements
    if (!this.toggleElements.length) {
      return;
    }

    // Track all instances
    this.collapseInstances = [];

    // Kick start
    this.init();
  }

  static get NAME() {
    return "accordion";
  }

  defaultConfig() {
    return {
      multipleOpens: this._element?.dataset?.multipleOpens === "true",
    };
  }

  init() {
    this.collapseInstances = this.toggleElements.map((header) => {
      const collapse = header.parentNode.querySelector(".accordion-collapse");

      collapse.addEventListener(EVENTS.SHOW, () => {
        header.classList.toggle("is-expanded", true);
      });

      collapse.addEventListener(EVENTS.HIDE, () => {
        header.classList.toggle("is-expanded", false);
      });

      return new Collapse(collapse, {
        triggerArray: [header.querySelector(".accordion-link")],
        datasetElement: header,
      });
    });

    window.addEventListener(
      EVENTS.SHOWN,
      ({ detail: { target } = {} } = {}) => {
        if (
          target &&
          target?.previousSibling &&
          target?.previousSibling?.classList
        ) {
          target.previousSibling.classList.toggle("is-expanded", true);
        }
      }
    );

    if (!this._config.multipleOpens) {
      this.collapseInstances.forEach((instance, index) =>
        instance.element.addEventListener(
          EVENTS.SHOW,
          this.toggleOtherActiveElements.bind(this, index)
        )
      );
    }
  }
  toggleOtherActiveElements(index) {
    this.collapseInstances
      .filter(
        (otherInstance, otherIndex) =>
          otherInstance.isOpen && index !== otherIndex
      )
      .forEach((otherInstance) => otherInstance.hide());
  }
  dispose() {
    super.dispose();

    this.collapseInstances.forEach((instance) => instance.dispose());
  }
}

exposeComponent("Accordion", Accordion);

export default Accordion;
