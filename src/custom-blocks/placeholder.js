/**
 * External dependencies
 */
import { get } from "lodash";

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from "@wordpress/data";
import {
  store as blocksStore,
  createBlocksFromInnerBlocksTemplate,
} from "@wordpress/blocks";
import {
  store as blockEditorStore,
  useBlockProps,
  __experimentalBlockVariationPicker as BlockVariationPicker,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */

export default function Placeholder({
  clientId,
  name,
  setAttributes,
  allowSkip = false,
}) {
  const { blockType, defaultVariation, variations } = useSelect(
    (select) => {
      const {
        getBlockVariations,
        getBlockType,
        getDefaultBlockVariation,
      } = select(blocksStore);

      return {
        blockType: getBlockType(name),
        defaultVariation: getDefaultBlockVariation(name, "block"),
        variations: getBlockVariations(name, "block"),
      };
    },
    [name]
  );
  const { replaceInnerBlocks } = useDispatch(blockEditorStore);
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <BlockVariationPicker
        icon={get(blockType, ["icon", "src"])}
        label={get(blockType, ["title"])}
        variations={variations}
        onSelect={(nextVariation = defaultVariation) => {
          if (nextVariation.attributes) {
            setAttributes(nextVariation.attributes);
          }
          if (nextVariation.innerBlocks) {
            replaceInnerBlocks(
              clientId,
              createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks),
              true
            );
          }
        }}
        allowSkip={allowSkip}
      />
    </div>
  );
}
