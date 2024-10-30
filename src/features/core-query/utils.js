/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */

/**
 * Define constants
 */
export const MAX_GRID_ITEMS = 12;

export const SORTING_SUGGESTIONS = [
  {
    label: __("Random order", "content-blocks-builder"),
    value: "rand",
  },
  {
    label: __("Page order in decending order", "content-blocks-builder"),
    value: "menu_order/desc",
  },
  {
    label: __("Page order in ascending order", "content-blocks-builder"),
    value: "menu_order/asc",
  },
  {
    label: __("Recently modified first", "content-blocks-builder"),
    value: "modified/desc",
  },
  {
    label: __("Last modified first", "content-blocks-builder"),
    value: "modified/asc",
  },
  {
    label: __("Number of comments", "content-blocks-builder"),
    value: "comment_count/desc",
  },
  {
    label: __("Newest to oldest"),
    value: "date/desc",
  },
  {
    label: __("Oldest to newest"),
    value: "date/asc",
  },
  {
    label: __("A → Z"),
    value: "title/asc",
  },
  {
    label: __("Z → A"),
    value: "title/desc",
  },
];

export const findPostTemplateBlock = (innerBlocks = []) => {
  let foundBlock = null;
  for (const block of innerBlocks) {
    if (block.name === "core/post-template") {
      foundBlock = block;
      break;
    } else if (block.innerBlocks.length) {
      foundBlock = findPostTemplateBlock(block.innerBlocks);
    }
  }
  return foundBlock;
};

export const buildVariables = (styleObject) => {
  return Object.keys(styleObject).reduce(
    (accumulator, current) =>
      `${accumulator}${current}:${styleObject[current]};`,
    "",
  );
};

/**
 * Build grid style in the editor
 *
 * @param {Object}
 * @returns {String}
 */
export const buildGridEditorStyle = ({
  gridStyleObject,
  itemsStyleObject,
  gridSelector,
  itemSelector,
}) => {
  const devices = [
    { breakpoint: "sm", mediaQuery: "" },
    { breakpoint: "md", mediaQuery: "@media (min-width: 768px)" },
    { breakpoint: "lg", mediaQuery: "@media (min-width: 1024px)" },
  ];
  const gridStyle = devices.reduce(
    (accumulator, { breakpoint, mediaQuery }) => {
      let breakpointStyle = "";
      if (gridStyleObject[`--bb--grid--columns--${breakpoint}`]) {
        breakpointStyle = `${breakpointStyle}grid-template-columns: var(--bb--grid--columns--${breakpoint});`;
      }
      if (gridStyleObject[`--bb--grid--rows--${breakpoint}`]) {
        breakpointStyle = `${breakpointStyle}grid-template-rows: var(--bb--grid--rows--${breakpoint});`;
      }
      if (gridStyleObject[`--bb--grid--gap--column--${breakpoint}`]) {
        breakpointStyle = `${breakpointStyle}column-gap: var(--bb--grid--gap--column--${breakpoint});`;
      }
      if (gridStyleObject[`--bb--grid--gap--row--${breakpoint}`]) {
        breakpointStyle = `${breakpointStyle}row-gap: var(--bb--grid--gap--row--${breakpoint});`;
      }

      if (breakpointStyle) {
        breakpointStyle = `${gridSelector}{${breakpointStyle}}`;

        if (mediaQuery) {
          breakpointStyle = `${mediaQuery}{${breakpointStyle}}`;
        }

        accumulator = `${accumulator}${breakpointStyle}`;
      }

      return accumulator;
    },
    "",
  );
  const itemsStyle = devices.reduce(
    (accumulator, { breakpoint, mediaQuery }) => {
      let breakpointStyle = "";
      Object.keys(itemsStyleObject).forEach((index) => {
        const itemStyleObject = itemsStyleObject[index] ?? {};
        let itemStyle = "";

        if (itemStyleObject[`--bb--grid-item--column--${breakpoint}`]) {
          itemStyle = `${itemStyle}grid-column: var(--bb--grid-item--column--${breakpoint});`;
        }
        if (itemStyleObject[`--bb--grid-item--row--${breakpoint}`]) {
          itemStyle = `${itemStyle}grid-row: var(--bb--grid-item--row--${breakpoint});`;
        }
        if (itemStyleObject[`--bb--grid-item--order--${breakpoint}`]) {
          itemStyle = `${itemStyle}order: var(--bb--grid-item--order--${breakpoint});`;
        }

        if (itemStyle) {
          itemStyle = `${gridSelector} > [data-order="${index}"]{${buildVariables(
            itemStyleObject,
          )}${itemStyle}}`;

          breakpointStyle = `${breakpointStyle}${itemStyle}`;
        }
      });

      if (breakpointStyle) {
        if (mediaQuery) {
          breakpointStyle = `${mediaQuery}{${breakpointStyle}}`;
        }

        accumulator = `${accumulator}${breakpointStyle}`;
      }

      return accumulator;
    },
    "",
  );

  let styles = `
  ${gridSelector} {${buildVariables(gridStyleObject)}display:grid;}
  ${gridStyle}
  ${itemsStyle}
  .editor-styles-wrapper ${gridSelector} > ${itemSelector} + ${itemSelector}{margin-block-start:0;margin-block-end:0;}
  `;

  return styles;
};
