/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { registerBlockVariation, serialize } from "@wordpress/blocks";
import apiFetch from "@wordpress/api-fetch";
import { useMemo } from "@wordpress/element";
import { addQueryArgs } from "@wordpress/url";

/**
 * Internal dependencies
 */
import { buildTemplateFromBlocks } from "../utils/blocks";
import { getEditPostURL } from "../utils/posts";
import { shareLabels } from "../utils/shared-labels";

export const ContentAttributes = [
  // Common fields
  "id",
  "content",
  "title",
  "text",
  "customText",
  "moreText",
  "buttonText",
  "description",
  "slug",
  "url",
  "src",
  "href",
  "linkTo",
  "placeholder",
  "caption",
  "alt",
  "label",
  "userId",
  "byline",

  // Gallery, image
  "ids",
  "images",
  "linkDestination",

  // Media text
  "mediaAlt",
  "mediaId",
  "mediaUrl",
  "mediaLink",
  "mediaType",

  // Pull quote
  "citation",
  "value",

  // Video
  "poster",
  "tracks",
];

/**
 * Build the meta data for variations
 *
 * @param {Object}
 * @returns {Object}
 */
export const buildVariationData = ({
  blockName,
  variationName,
  title,
  block,
}) => {
  const { attributes = {}, innerBlocks = [] } = block ?? {};

  const variationData = {
    blockName,
    variation: {
      name: variationName,
      title,
      attributes,
      innerBlocks: buildTemplateFromBlocks(innerBlocks),
    },
  };

  return variationData;
};

/**
 * Create a new variation
 *
 * @param {Object}
 */
export const createVariation = ({
  variationName,
  blockName,
  title,
  description = "",
  iconString = "",
  block,
  createSuccessNotice,
  createErrorNotice,
  isDefault = false,
  doneCb,
  finallyCb,
}) => {
  // Get post content
  const variationContent = serialize([block]);

  // Build the meta data for the variation.
  const variationData = buildVariationData({
    blockName,
    variationName,
    title,
    block,
  });

  apiFetch({
    path: "boldblocks/v1/createVariation",
    method: "POST",
    data: {
      title,
      content: variationContent,
      status: "publish",
      meta: {
        boldblocks_variation_block_name: blockName,
        boldblocks_variation_name: variationName,
        boldblocks_variation_data: JSON.stringify(variationData),
        boldblocks_variation_icon: iconString,
        boldblocks_variation_description: description,
        boldblocks_variation_is_default: isDefault,
        boldblocks_variation_is_transformable: true,
      },
    },
  })
    .then((json) => {
      const { success, data, post } = json;
      if (success) {
        createSuccessNotice(
          data ||
            __(
              "Your variation has been created successfully!",
              "content-blocks-builder",
            ),
          {
            type: "snackbar",
            actions: [
              {
                label: sprintf(shareLabels.editItem, shareLabels.variation),
                url: getEditPostURL(post.id),
              },
            ],
          },
        );

        // Register new variation
        registerBlockVariation(blockName, variationData.variation);

        if (doneCb) {
          doneCb(post);
        }
      } else {
        createErrorNotice(data || "Request failed!", {
          type: "snackbar",
        });
      }
    })
    .catch((e) => {
      createErrorNotice(e.message, { type: "snackbar" });
    })
    .finally(() => {
      if (finallyCb) {
        finallyCb();
      }
    });
};

/**
 * Get CBB variations for a block name
 *
 * @param {string} blockName
 * @returns {Array}
 */
export const getCBBVariations = (blockName) => {
  const cache_key = `cbb-${blockName}`;
  if (window?.[cache_key]) {
    return window?.[cache_key];
  }

  if (!BoldBlocksVariations) {
    return [];
  }

  const allCBBVariations = BoldBlocksVariations.filter(
    (item) => item?.blockName === blockName,
  );

  // Cache the result
  window[cache_key] = allCBBVariations;

  return allCBBVariations;
};

/**
 * Get the default variation for a block name
 *
 * @param {string} blockName
 * @returns {Array}
 */
export const useDefaultVariation = (blockName) => {
  return useMemo(() => {
    if (!BoldBlocksVariations) {
      return false;
    }
    return BoldBlocksVariations.find(
      (item) => item?.isDefault && item?.blockName === blockName,
    );
  }, [blockName]);
};

/**
 * Get the all variations URL for a block type
 *
 * @param {String} blockName
 * @returns {String}
 */
export const getAllVariationsURL = (blockName) =>
  addQueryArgs(
    `edit.php?post_type=boldblocks_variation&filter_action=Filter&boldblocks_variation_filter_block=${blockName}`,
  );
