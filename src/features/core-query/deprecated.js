/**
 * WordPress dependencies
 */
import { createBlock } from "@wordpress/blocks";
import { useInnerBlocksProps, useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { findPostTemplateBlock } from "./utils";

const replacePostTemplateBlock = (innerBlocks = [], replacementBlock) => {
  innerBlocks.forEach((block, index) => {
    if (block.name === "core/post-template") {
      innerBlocks.splice(index, 1, replacementBlock);
    } else if (block.innerBlocks.length) {
      block.innerBlocks = replacePostTemplateBlock(
        block.innerBlocks,
        replacementBlock
      );
    }
  });
  return innerBlocks;
};

const migrateDisplayLayout = (attributes, innerBlocks) => {
  let { displayLayout = null, boldblocks = {}, ...newAttributes } = attributes;
  if (!displayLayout || !["carousel", "grid"].includes(displayLayout?.type)) {
    return [attributes, innerBlocks];
  }

  const postTemplateBlock = findPostTemplateBlock(innerBlocks);
  if (!postTemplateBlock) {
    return [attributes, innerBlocks];
  }

  const newLayoutType =
    displayLayout.type === "grid" ? "responsiveGrid" : displayLayout.type;

  boldblocks = { ...boldblocks, layout: { type: newLayoutType } };

  const newPostTemplateBlock = createBlock(
    "core/post-template",
    {
      ...postTemplateBlock.attributes,
      layout: {
        type: "default",
      },
      boldblocks,
    },
    postTemplateBlock.innerBlocks
  );
  return [
    newAttributes,
    replacePostTemplateBlock(innerBlocks, newPostTemplateBlock),
  ];
};

const displayLayoutToCBBLayout = {
  attributes: {
    queryId: {
      type: "number",
    },
    query: {
      type: "object",
      default: {
        perPage: null,
        pages: 0,
        offset: 0,
        postType: "post",
        order: "desc",
        orderBy: "date",
        author: "",
        search: "",
        exclude: [],
        sticky: "",
        inherit: true,
        taxQuery: null,
        parents: [],
      },
    },
    tagName: {
      type: "string",
      default: "div",
    },
    displayLayout: {
      type: "object",
      default: {
        type: "list",
      },
    },
    namespace: {
      type: "string",
    },
    boldblocks: {
      type: "object",
      default: {},
    },
  },
  supports: {
    align: ["wide", "full"],
    anchor: true,
    html: false,
    layout: true,
  },
  save({ attributes: { tagName: Tag = "div" } }) {
    const blockProps = useBlockProps.save();
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);
    return <Tag {...innerBlocksProps} />;
  },
  isEligible: ({ displayLayout }) => {
    return (
      !!displayLayout && ["carousel", "grid"].includes(displayLayout?.type)
    );
  },
  migrate: migrateDisplayLayout,
};

export { displayLayoutToCBBLayout };
