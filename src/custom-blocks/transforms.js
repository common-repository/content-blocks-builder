/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import {
  createBlock,
  createBlocksFromInnerBlocksTemplate,
} from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { boldblocksHasSupport } from "../utils";

const isRepeaterLayout = (layoutType) =>
  layoutType && ["grid", "carousel", "vstack"].includes(layoutType);

const convertAttributes = (attributes) => {
  // Layout: align, layout
  // Color: backgroundColor, textColor, gradient, borderColor
  // Style: border: {radius: {bottomRight...}, style, width, color}, color: {background, text, gradient}, spacing: {padding, margin, blockGap}, typography: {fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textTransform}
  // fontSize: 'predefined'
  const {
    align,
    layout,
    backgroundColor,
    textColor,
    borderColor,
    gradient,
    fontFamily,
    fontSize,
    style,
    boldblocks,
  } = attributes;

  return {
    align,
    layout,
    backgroundColor,
    textColor,
    borderColor,
    gradient,
    fontFamily,
    fontSize,
    style,
    boldblocks,
  };
};

const convertToSingleBlock = (blockTypeName, blocks) => {
  const alignments = ["wide", "full"];

  // Determine the widest setting of all the blocks to be grouped
  const widestAlignment = blocks.reduce((accumulator, block) => {
    const { align } = block.attributes;
    return alignments.indexOf(align) > alignments.indexOf(accumulator)
      ? align
      : accumulator;
  }, undefined);

  return createBlock(
    blockTypeName,
    {
      align: widestAlignment,
    },
    createBlocksFromInnerBlocksTemplate(blocks),
  );
};

const convertToRepeater = (
  blockTypeName,
  layoutType,
  childBlockTypeName,
  blocks,
) => {
  let attributes = {};
  if (layoutType === "grid") {
    attributes = {
      boldblocks: {
        grid: {
          columns: {
            lg: {
              value: `repeat(${Math.min(6, blocks.length)}, minmax(0, 1fr))`,
              inherit: null,
            },
            md: { inherit: "lg" },
            sm: { inherit: "lg" },
          },
          gap: {
            lg: {
              value: { row: "1rem", column: "1rem" },
              inherit: null,
            },
            md: { inherit: "lg" },
            sm: { inherit: "lg" },
          },
        },
      },
    };
  }
  const innerBlocksTemplate = blocks.map(
    ({ name, attributes, innerBlocks }) => [
      childBlockTypeName,
      {},
      [[name, { ...attributes }, innerBlocks]],
    ],
  );

  return createBlock(
    blockTypeName,
    attributes,
    createBlocksFromInnerBlocksTemplate(innerBlocksTemplate),
  );
};

const convertFromCoreGroup = (blockTypeName, { attributes, innerBlocks }) => {
  if (attributes?.layout?.type === "flex") {
    delete attributes?.layout;
  }

  return createBlock(blockTypeName, convertAttributes(attributes), innerBlocks);
};

const convertFromColumns = (
  blockTypeName,
  layoutType,
  childBlockTypeName,
  { attributes, innerBlocks },
) => {
  const innerBlocksTemplate = innerBlocks.map(({ attributes, innerBlocks }) => [
    childBlockTypeName,
    convertAttributes(attributes),
    innerBlocks,
  ]);

  let newAttributes = convertAttributes(attributes);

  if (layoutType === "grid") {
    newAttributes = {
      ...newAttributes,
      boldblocks: {
        grid: {
          columns: {
            lg: {
              value: `repeat(${innerBlocks.length}, minmax(0, 1fr))`,
              inherit: null,
            },
            md: { inherit: "lg" },
            sm: { inherit: null },
          },
          gap: {
            lg: {
              value: { row: "1rem", column: "1rem" },
              inherit: null,
            },
            md: { inherit: "lg" },
            sm: { inherit: "lg" },
          },
        },
      },
    };
  }

  return createBlock(
    blockTypeName,
    newAttributes,
    createBlocksFromInnerBlocksTemplate(innerBlocksTemplate),
  );
};

const convertFromRepeaterToRepeater = (
  blockTypeName,
  childBlockTypeName,
  toLayoutType,
  fromLayoutType,
  block,
) => {
  const { attributes, innerBlocks, clientId } = block;
  if (block.name === blockTypeName) {
    return block;
  }

  const innerBlocksTemplate = innerBlocks.map(({ attributes, innerBlocks }) => [
    childBlockTypeName,
    { ...attributes },
    innerBlocks,
  ]);

  let newAttributes = {};
  if (toLayoutType === "grid") {
    newAttributes = {
      ...attributes,
      boldblocks: {
        ...(attributes?.boldblocks ?? {}),
        grid: {
          columns: {
            lg: {
              value: `repeat(${Math.min(
                6,
                innerBlocks.length,
              )}, minmax(0, 1fr))`,
              inherit: null,
            },
            md: { inherit: "lg" },
            sm: { inherit: null },
          },
          gap: {
            lg: {
              value: { row: "1rem", column: "1rem" },
              inherit: null,
            },
            md: { inherit: "lg" },
            sm: { inherit: "lg" },
          },
        },
      },
    };
  }

  return createBlock(
    blockTypeName,
    newAttributes,
    createBlocksFromInnerBlocksTemplate(innerBlocksTemplate),
  );
};

const buildTransforms = (
  blockTypeName,
  layoutType = false,
  childBlockTypeName,
) => {
  const convert =
    (blockTypeName, layoutType, childBlockTypeName) => (blocks) => {
      if (blocks.length === 1) {
        const block = blocks[0];
        if (block.name === "core/group") {
          return convertFromCoreGroup(blockTypeName, block);
        } else if (block.name === "core/columns") {
          if (isRepeaterLayout(layoutType)) {
            return convertFromColumns(
              blockTypeName,
              layoutType,
              childBlockTypeName,
              block,
            );
          }
        } else {
          if (isRepeaterLayout(layoutType)) {
            const layout = boldblocksHasSupport(block.name, "layoutType");
            if (isRepeaterLayout(layout)) {
              return convertFromRepeaterToRepeater(
                blockTypeName,
                childBlockTypeName,
                layoutType,
                layout,
                block,
              );
            }
          }
        }
      }

      if (childBlockTypeName && isRepeaterLayout(layoutType)) {
        return convertToRepeater(
          blockTypeName,
          layoutType,
          childBlockTypeName,
          blocks,
        );
      } else {
        return convertToSingleBlock(blockTypeName, blocks);
      }
    };

  // Default
  return {
    from: [
      {
        type: "block",
        isMultiBlock: true,
        blocks: ["*"],
        __experimentalConvert: convert(
          blockTypeName,
          layoutType,
          childBlockTypeName,
        ),
      },
    ],
  };
};

export default buildTransforms;
