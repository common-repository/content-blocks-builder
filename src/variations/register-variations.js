/**
 * External dependencies
 */
import clsx from "clsx";
import { isObject, get, omit } from "lodash";

/**
 * WordPress dependencies
 */
import { registerBlockVariation, getBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { InlineSVG } from "sdk/components";
import { log } from "sdk/utils";
import { limitSVGDimension } from "../utils";
import { ContentAttributes } from "./utils";

/**
 * Register variations
 */
if (BoldBlocksVariations && BoldBlocksVariations.length) {
  BoldBlocksVariations.forEach(
    ({
      blockName,
      variationName,
      title,
      description,
      variationData,
      blockIcon,
      isDefault = false,
      isTransformable = false,
      hideFromInserter = false,
      variationClass,
    }) => {
      let variation;
      try {
        ({ variation } = JSON.parse(variationData));
      } catch (error) {
        log(error, "error");
      }

      if (variation && isObject(variation)) {
        let { attributes = {}, innerBlocks = [] } = variation;

        let icon;
        if (blockIcon) {
          icon = (
            <InlineSVG
              markup={blockIcon}
              sanitizeAttribute={limitSVGDimension}
            />
          );
        } else {
          icon = get(getBlockType(blockName), ["icon", "src"]);
        }

        const scope = ["block"];
        if (!hideFromInserter) {
          scope.push("inserter");
        }

        if (isTransformable) {
          scope.push("transform");

          attributes = omit(attributes, ContentAttributes);
        }

        registerBlockVariation(blockName, {
          name: variationName,
          title,
          description,
          attributes: {
            ...attributes,
            className: clsx(attributes?.className, variationClass),
          },
          innerBlocks,
          scope,
          icon,
          isDefault,
          isActive: ({ className }, variationAttributes) =>
            className && className.includes(variationClass),
        });
      }
    },
  );
}
