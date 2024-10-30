/**
 * Internal dependencies
 */
import { handlePlayPause } from "./utils-frontend";

/**
 * Kick start the play/pause controls.
 */
window.addEventListener("DOMContentLoaded", function () {
  const blockElements = document.querySelectorAll(".cbb-has-video-controls");
  if (blockElements?.length) {
    blockElements.forEach(handlePlayPause);
  }
});
