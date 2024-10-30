/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { isPremium } from "./premium";

/**
 * Premium label
 */
const proLabel = __("premium", "content-blocks-builder");
export const getProLabel = (label) =>
  isPremium ? label : `${label} (${proLabel})`;

/**
 * Common labels
 */
export const labels = {
  // Common
  default: __("Default", "content-blocks-builder"),
  custom: __("Custom", "content-blocks-builder"),
  comma: __("Separate multiple values with comma.", "content-blocks-builder"),
  auto: __("Auto", "content-blocks-builder"),
  fullScreen: __("Full screen", "content-blocks-builder"),
  learnS: __("Learn %s", "content-blocks-builder"),

  // Features
  bgMedia: __("Background media", "content-blocks-builder"),
  bgOverlay: __("Background overlay", "content-blocks-builder"),
  aspectRatio: __("Aspect ratio", "content-blocks-builder"),
  boxShadow: __("Box shadow", "content-blocks-builder"),
  transform: __("Transform", "content-blocks-builder"),
  visibility: __("Visibility", "content-blocks-builder"),
  animation: __("Reveal animation", "content-blocks-builder"),
  toggle: __("Toggle content", "content-blocks-builder"),
  sticky: __("Sticky content", "content-blocks-builder"),
  attributes: __("Custom attributes", "content-blocks-builder"),

  // Code editor
  customCSS: __("Custom CSS", "content-blocks-builder"),
  customJS: __("Custom JS", "content-blocks-builder"),
  customCSSHelp: __(
    "Input or edit custom CSS code, available only in the Premium version.",
    "content-blocks-builder",
  ),
  customJSHelp: __(
    "Input or edit custom JS code, available only in the Premium version.",
    "content-blocks-builder",
  ),

  // Resources
  handle: __("Handle", "content-blocks-builder"),
  dependencies: __("Dependencies", "content-blocks-builder"),
  version: __("Version", "content-blocks-builder"),
  loadingStrategy: __("Loading strategy", "content-blocks-builder"),
  inFooter: __("In footer", "content-blocks-builder"),
  media: __("Media", "content-blocks-builder"),
  inBackend: __("In backend", "content-blocks-builder"),
  snippetD: __("Snippet %d", "content-blocks-builder"),
  scriptD: __("Script %d", "content-blocks-builder"),
  stylesheetD: __("Stylesheet %d", "content-blocks-builder"),
  addSelector: __("Add selector", "content-blocks-builder"),
  addSnippet: __("Add snippet", "content-blocks-builder"),

  // Overrides
  overrides: __("Overrides", "content-blocks-builder"),
  enableOverrides: __("Enable overrides", "content-blocks-builder"),
  disableOverrides: __("Disable overrides", "content-blocks-builder"),
};
