/**
 * External dependencies
 */

/**
 * Sanitize Html class
 * Limit to A-Z, a-z, 0-9, '_', '-', ':'.
 *
 * @param {String} str
 */
export const sanitizeHtmlClass = (str) =>
  str.replace(/[^A-Za-z\_]*/, "").replace(/[^A-Za-z0-9:_-]/g, "");

/**
 * Sanitize a string of CSS classes
 *
 * @param {String} str
 * @returns {String}
 */
export const sanitizeClassString = (str) => {
  return str
    .split(" ")
    .filter((item) => sanitizeHtmlClass(item))
    .join(" ");
};

/**
 * Limit the maximum height and width of the icon for block and variation
 *
 * @param {String} name
 * @param {String} value
 * @returns {String}
 */
export const limitSVGDimension = (name, value) => {
  if (name === "width" || name === "height") {
    value = parseInt(value, 10);
    return Math.max(24, Math.min(60, value));
  } else {
    return value;
  }
};
