/**
 * External dependencies
 */
import { isObject } from "lodash";

/**
 * Get CSS value for color
 *
 * @param {String|Object} color
 * @returns {String}
 */
export const getColorCSSValueDeprecatedV1 = (color) => {
  return isObject(color)
    ? `var(--wp--preset--color--${color?.slug}, ${color?.value})`
    : color;
};
