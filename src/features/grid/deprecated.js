/**
 * External depencencies
 */
import { isEmpty, isObject, isString, isUndefined } from "lodash";

/**
 * Internal dependencies
 */
import { isUnsetValue } from "sdk/utils";

/**
 * Get gap style
 *
 * @param {Object} gap : ;
 * @returns {Object}
 */
export function getGridGapStyleDeprecatedV1(gap) {
  let gapStyle = {};
  Object.keys(gap).forEach((breakpoint) => {
    const { value: { row, column } = {}, inherit } = gap[breakpoint];
    if (isUndefined(row) && isUndefined(column)) {
      if (inherit && isString(inherit)) {
        gapStyle = {
          ...gapStyle,
          [`--bb--grid--gap--row--${breakpoint}`]: `var(--bb--grid--gap--row--${inherit})`,
          [`--bb--grid--gap--column--${breakpoint}`]: `var(--bb--grid--gap--column--${inherit})`,
        };
      }
    } else {
      if (!isUndefined(row)) {
        gapStyle = {
          ...gapStyle,
          [`--bb--grid--gap--row--${breakpoint}`]: row,
        };
      }
      if (!isUndefined(column)) {
        gapStyle = {
          ...gapStyle,
          [`--bb--grid--gap--column--${breakpoint}`]: column,
        };
      }
    }
  });

  return gapStyle;
}

/**
 * Build style for grid column / grid row.
 *
 * @param {Object} gridItem
 * @param {String} prefix
 * @param {Boolean} hasOrder
 */
export function getSpanStylesDeprecatedV1(gridItem, prefix, hasOrder = false) {
  let gridItemStyle = {};
  if (isObject(gridItem) && !isEmpty(gridItem)) {
    Object.keys(gridItem).forEach((breakpoint) => {
      let { value: { start, span, order } = {}, inherit } =
        gridItem[breakpoint] ?? {};
      if (isUnsetValue(start) && isUnsetValue(span) && isUnsetValue(order)) {
        if (inherit && isString(inherit)) {
          gridItemStyle = {
            ...gridItemStyle,
            [`${prefix}${breakpoint}`]: `var(${prefix}${inherit})`,
          };

          if (hasOrder) {
            gridItemStyle = {
              ...gridItemStyle,
              [`--bb--grid-item--order--${breakpoint}`]: `var(--bb--grid-item--order--${inherit})`,
            };
          }
        }
      } else {
        if (start || span) {
          if (isUnsetValue(start)) {
            start = "auto";
          }

          if (isUnsetValue(span)) {
            span = "auto";
          }
          if (span !== "auto" && span > 0) {
            // Ignore auto and -1 value
            span = `span ${span}`;
          }

          gridItemStyle = {
            ...gridItemStyle,
            [`${prefix}${breakpoint}`]: `${start} / ${span}`,
          };
        }

        if (hasOrder && order && order !== "auto") {
          gridItemStyle = {
            ...gridItemStyle,
            [`--bb--grid-item--order--${breakpoint}`]: order + "",
          };
        }
      }
    });
  }

  return gridItemStyle;
}
