import Accordion from "./accordion-script";

/**
 * Kick start the accordion
 */
window.addEventListener("DOMContentLoaded", function () {
  const accordionElements = [].slice.call(
    document.querySelectorAll(".is-accordion")
  );

  if (accordionElements.length) {
    accordionElements.forEach(
      (accordionElement) => new Accordion(accordionElement)
    );
  }
});
