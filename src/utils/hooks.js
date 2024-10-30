/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { _n, __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";

/**
 * Internal dependencies
 */

/**
 * Only update the sanitized version of a value
 *
 * @param {String} value
 * @param {Function} sanitize
 * @param {Function} update
 * @param {Integer|Boolean} delay
 * @returns {Array}
 */
export const useSanitizeValue = (value, sanitize, update, delay = false) => {
  const [rawValue, setRawValue] = useState(value);

  let timeoutId;
  useEffect(() => {
    if (rawValue !== value) {
      if (delay > 0) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          update(sanitize(rawValue));
        }, delay);

        return () => clearTimeout(timeoutId);
      } else {
        update(sanitize(rawValue));
      }
    }
  }, [rawValue, delay]);

  return [rawValue, setRawValue];
};
