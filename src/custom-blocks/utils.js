/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { labels, getProLabel } from "../utils/labels";

/**
 * Define a list of boldblocks features
 */
export const BoldBlocksFeatures = {
  width: __("Responsive width", "content-blocks-builder"),
  height: __("Responsive height", "content-blocks-builder"),
  spacing: __("Responsive spacing", "content-blocks-builder"),
  border: __("Responsive border", "content-blocks-builder"),
  background: labels.bgMedia,
  overlay: labels.bgOverlay,
  textAlignment: __("Text alignment", "content-blocks-builder"),
  verticalAlignment: __("Vertical alignment", "content-blocks-builder"),
  justifyAlignment: __("Justify alignment", "content-blocks-builder"),
  aspectRatio: labels.aspectRatio,
  boxShadow: labels.boxShadow,
  transform: labels.transform,
  visibility: labels.visibility,
  toggle: labels.toggle,
  sticky: labels.sticky,
  customAttributes: labels.attributes,
  animation: getProLabel(labels.animation),
  customCSS: getProLabel(labels.customCSS),
};

/**
 * Features that are only available for parent blocks
 */
export const ParentBlockFeatures = {
  steps: getProLabel(__("Steps style", "content-blocks-builder")),
};

/**
 * Features for premium customers only
 */
export const PremiumFeatures = ["animation", "steps", "customCSS"];

/**
 * Features available only in accrodion
 */
export const AccordionFeatures = [
  "background",
  "overlay",
  "border",
  "boxShadow",
  "transform",
  "visibility",
  "customAttributes",
  "customCSS",
];
