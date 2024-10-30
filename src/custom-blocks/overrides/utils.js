/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { toType } from "../../utils/dom";
import { boldblocksHasSupport } from "../../utils";

// CBB_SYNCING_SUPPORTED_BLOCKS - global variable from server.

export const CBB_OVERRIDES_BINDING_SOURCE = "cbb/block-overrides";

export const isSyncedCBBBlock = (name) => {
  return (
    name.startsWith("boldblocks/") &&
    boldblocksHasSupport(name, "isSyncedBlock")
  );
};

export const isOverridableCBB = (name) => {
  return (
    name.startsWith("boldblocks/") && boldblocksHasSupport(name, "background")
  );
};

/**
 * Based on the given block name,
 * check if it is possible to bind the block.
 *
 * @param {string} blockName - The block name.
 * @return {boolean} Whether it is possible to bind the block to sources.
 */
export function canBindBlock(blockName) {
  return blockName in CBB_SYNCING_SUPPORTED_BLOCKS;
}

export const isSupportedBlock = (name) => {
  return isOverridableCBB(name) || canBindBlock(name);
};

export const getSupportedAttributes = (name) => {
  return isOverridableCBB(name)
    ? ["background"]
    : CBB_SYNCING_SUPPORTED_BLOCKS[name];
};

/**
 * Determines whether a block is overridable.
 *
 * @param {WPBlock} block The block to test.
 *
 * @return {boolean} `true` if a block is overridable, `false` otherwise.
 */
export function isOverridableBlock({ name, attributes }) {
  if (
    !isSupportedBlock(name) ||
    !attributes.metadata?.name ||
    !attributes.metadata?.cbbBindings
  ) {
    return false;
  }

  const bindableAttributes = getSupportedAttributes(name);
  return (
    attributes.metadata.cbbBindings?.[bindableAttributes?.[0]]?.source ===
    CBB_OVERRIDES_BINDING_SOURCE
  );
}

export function hasOverridableBlocks(blocks) {
  if (!blocks) {
    return false;
  }

  return blocks.some((block) => {
    if (isOverridableBlock(block)) {
      return true;
    }

    // Ignore nested synced blocks
    if (!isSyncedCBBBlock(block.name)) {
      return hasOverridableBlocks(block.innerBlocks);
    }
  });
}

function getOverridableAttributes(block) {
  return Object.entries(block.attributes.metadata.cbbBindings)
    .filter(([, binding]) => binding.source === CBB_OVERRIDES_BINDING_SOURCE)
    .map(([attributeKey]) => attributeKey);
}

export function applyInitialContentValuesToInnerBlocks(blocks, content = {}) {
  return blocks.map((block) => {
    // Ignore nested synced blocks.
    if (isSyncedCBBBlock(block.name)) {
      return block;
    }

    const innerBlocks = applyInitialContentValuesToInnerBlocks(
      block?.innerBlocks ?? [],
      content,
    );
    const metadataName = block.attributes.metadata?.name;
    const contentValues = content[metadataName];

    if (!metadataName || !isOverridableBlock(block) || !contentValues) {
      return { ...block, innerBlocks };
    }

    const attributes = getOverridableAttributes(block);
    let newAttributes = { ...block.attributes };
    for (const attributeKey of attributes) {
      if (contentValues?.[attributeKey] !== undefined) {
        if (isOverridableCBB(block.name)) {
          if (toType(contentValues?.[attributeKey]) === "object") {
            const { boldblocks = {}, boldblocks: { background = {} } = {} } =
              newAttributes;
            newAttributes = {
              ...newAttributes,
              boldblocks: {
                ...boldblocks,
                background: { ...background, ...contentValues[attributeKey] },
              },
            };
          }
        } else {
          newAttributes[attributeKey] = contentValues?.[attributeKey];
        }
      }
    }

    return {
      ...block,
      attributes: newAttributes,
      innerBlocks,
    };
  });
}

export function setBlockEditMode(setEditMode, blocks, mode) {
  blocks.forEach((block) => {
    // Not nested synced blocks.
    if (!isSyncedCBBBlock(block.name)) {
      const editMode =
        mode || (isOverridableBlock(block) ? "contentOnly" : "disabled");

      setEditMode(block.clientId, editMode);
      setBlockEditMode(setEditMode, block.innerBlocks, mode);
    }
  });
}
