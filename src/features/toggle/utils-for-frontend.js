/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
export const isVideoBlock = (element) =>
  element.classList.contains("wp-block-video");
export const isYoutubeVideo = (element) =>
  element.classList.contains("wp-block-embed-youtube");
export const isBYEBVideo = (element) =>
  element.classList.contains("wp-block-boldblocks-youtube-block");
