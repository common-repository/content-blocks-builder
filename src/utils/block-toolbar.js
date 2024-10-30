/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { getBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */

/**
 * Don't allow creating blocks/patterns from nested blocks
 * Don't use boldblocksHasSupport here to reduce the file size
 *
 * @param {Array} clientIds
 * @param {Function} getBlockName
 * @returns {Boolean}
 */
export const canCreateBlocks = (clientIds, getBlockName) => {
  if (!clientIds?.length) {
    return false;
  }

  const blockType = getBlockName(clientIds[0]);
  const boldblocks = getBlockSupport(blockType, "boldblocks");
  const layoutType = boldblocks ? boldblocks["layoutType"] ?? "" : "";
  if (
    ["gridItem", "carouselItem", "accordionItem", "vstackItem"].includes(
      layoutType,
    )
  ) {
    return false;
  }

  return true;
};
