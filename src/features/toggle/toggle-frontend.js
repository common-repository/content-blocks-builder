import Collapse from "../../utils/collapse";
import Modal from "../../utils/modal";

import "./stop-video";

/**
 * Kick start the toggle layout
 */
window.addEventListener("DOMContentLoaded", function () {
  let toggleElements = [].slice.call(
    document.querySelectorAll(".is-toggle-content")
  );

  if (toggleElements.length) {
    const toggleObject = toggleElements.reduce((previous, current) => {
      let type = current?.dataset?.toggleType ?? "collapse";
      if (!previous[type]) {
        previous[type] = [];
      }

      previous[type].push(current);

      return previous;
    }, {});

    Object.keys(toggleObject).forEach((type) => {
      let instanceIndex = 0;
      for (const element of toggleObject[type]) {
        if (type === "collapse") {
          new Collapse(element, {
            classTrigger: "toggle-content-trigger",
            instanceIndex: instanceIndex++,
          });
        } else if (["modal", "offcanvas", "popover"].includes(type)) {
          let dataset = element?.dataset;
          const modalSettings = dataset ? dataset?.toggleModalSettings : null;
          if (modalSettings) {
            dataset = {
              ...dataset,
              modalSettings: JSON.parse(modalSettings),
            };
          }

          let classAnimation = dataset?.revealAnimation
            ? "custom-animation"
            : type === "modal"
            ? "fade"
            : "translate";

          new Modal(element, {
            modalType: type,
            dataset,
            classTrigger: "toggle-content-trigger",
            classRootOpen: `${type}-open`,
            classAnimation,
            instanceIndex: instanceIndex++,
          });
        }
      }
    });
  }
});
