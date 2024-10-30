/**
 * External depencencies
 */
import { isString } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { isUnsetValue } from "sdk/utils";
import { labels } from "../../utils/labels";

/**
 * Define a list of preset grid's row layout.
 */
export const layoutPresets = [
  {
    label: __("1 Item", "content-blocks-builder"),
    itemCount: 1,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "minmax(0, 1fr)",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("2 Items - 1:1", "content-blocks-builder"),
    itemCount: 2,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "repeat(2, minmax(0, 1fr))",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("3 Items - 1:1:1", "content-blocks-builder"),
    itemCount: 3,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "repeat(3, minmax(0, 1fr))",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("4 Items - 1:1:1:1", "content-blocks-builder"),
    itemCount: 4,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "repeat(4, minmax(0, 1fr))",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("5 Items - 1:1:1:1:1", "content-blocks-builder"),
    itemCount: 5,
    breakpoints: ["lg"],
    attributes: {
      grid: {
        columns: "repeat(5, minmax(0, 1fr))",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("6 Items - 1:1:1:1:1:1", "content-blocks-builder"),
    itemCount: 6,
    breakpoints: ["lg"],
    attributes: {
      grid: {
        columns: "repeat(6, minmax(0, 1fr))",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("2 Items - 3:1", "content-blocks-builder"),
    itemCount: 2,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "minmax(0, 3fr) minmax(0, 1fr)",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("2 Items - 2:1", "content-blocks-builder"),
    itemCount: 2,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "minmax(0, 2fr) minmax(0, 1fr)",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("2 Items - 1:2", "content-blocks-builder"),
    itemCount: 2,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "minmax(0, 1fr) minmax(0, 2fr)",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("2 Items - 1:3", "content-blocks-builder"),
    itemCount: 2,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "minmax(0, 1fr) minmax(0, 3fr)",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("3 Items - 2:1:1", "content-blocks-builder"),
    itemCount: 3,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "minmax(0, 2fr) repeat(2, minmax(0, 1fr))",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("3 Items - 1:2:1", "content-blocks-builder"),
    itemCount: 3,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr)",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: __("3 Items - 1:1:2", "content-blocks-builder"),
    itemCount: 3,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "repeat(2, minmax(0, 1fr)) minmax(0, 2fr)",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
          },
        },
      },
    ],
  },
  {
    label: labels.auto,
    itemCount: 1,
    breakpoints: ["sm", "md", "lg"],
    attributes: {
      grid: {
        columns: "repeat(auto-fill, minmax(min(15rem, 100%), 1fr))",
      },
    },
    innerBlocks: [
      {
        attributes: {
          gridItem: {
            columnSpan: { span: "auto", start: "auto", order: "auto" },
            rowSpan: { span: "auto", start: "auto" },
            innerText: __("Auto fill", "content-blocks-builder"),
          },
        },
      },
    ],
  },
];

/**
 * Get gap style
 *
 * @param {Object} gap
 * @returns {Object}
 */
export function getGridGapStyle(gap) {
  let gapStyle = {};
  Object.keys(gap).forEach((breakpoint) => {
    const { value: { row, column } = {}, inherit } = gap[breakpoint];
    if (isUnsetValue(row) && isUnsetValue(column)) {
      if (inherit && isString(inherit)) {
        const { value: { row, column } = {} } = gap[inherit] ?? {};
        if (!isUnsetValue(row)) {
          gapStyle = {
            ...gapStyle,
            [`--bb--grid--gap--row--${breakpoint}`]: `var(--bb--grid--gap--row--${inherit})`,
          };
        }
        if (!isUnsetValue(column)) {
          gapStyle = {
            ...gapStyle,
            [`--bb--grid--gap--column--${breakpoint}`]: `var(--bb--grid--gap--column--${inherit})`,
          };
        }
      }
    } else {
      if (!isUnsetValue(row)) {
        gapStyle = {
          ...gapStyle,
          [`--bb--grid--gap--row--${breakpoint}`]: row,
        };
      }
      if (!isUnsetValue(column)) {
        gapStyle = {
          ...gapStyle,
          [`--bb--grid--gap--column--${breakpoint}`]: column,
        };
      }
    }
  });

  return gapStyle;
}
