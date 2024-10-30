import { doAnimation } from "../premium-only/animation/animate";

window.addEventListener("DOMContentLoaded", function () {
  let animatedElements = [].slice.call(
    document.querySelectorAll("[data-reveal-animation]"),
  );

  if (animatedElements.length) {
    animatedElements = animatedElements.filter(
      (element) =>
        !element.closest(".js-carousel-layout") &&
        !element.closest(".is-toggle-content"),
    );

    // Kick start animation
    doAnimation(animatedElements);
  }
});
