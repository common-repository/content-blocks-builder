/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from "@wordpress/compose";
import { useRegistry, useDispatch } from "@wordpress/data";
import { useCallback } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { store as blockEditorStore } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { toType } from "../../utils/dom";
import {
  getSupportedAttributes,
  canBindBlock,
  CBB_OVERRIDES_BINDING_SOURCE,
} from "./utils";

/**
 * Based on the given block name and attribute name,
 * check if it is possible to bind the block attribute.
 *
 * @param {string} blockName     - The block name.
 * @param {string} attributeName - The attribute name.
 * @return {boolean} Whether it is possible to bind the block attribute.
 */
export function canBindAttribute(blockName, attributeName) {
  return (
    canBindBlock(blockName) &&
    CBB_SYNCING_SUPPORTED_BLOCKS[blockName].includes(attributeName)
  );
}

export const isBoundBlock = ({ context, attributes, name }) => {
  if (
    !context?.["cbb/syncedBlockId"] ||
    !context?.["cbb/overrides"] ||
    !attributes.metadata?.name
  ) {
    return false;
  }

  const bindableAttributes = getSupportedAttributes(name);
  return (
    attributes.metadata?.cbbBindings?.[bindableAttributes?.[0]]?.source ===
    CBB_OVERRIDES_BINDING_SOURCE
  );
};

export const updateSyncedContent = ({
  updateBlockAttributes,
  bindingAttributes,
  props: { context, attributes },
}) => {
  const syncedBlockId = context["cbb/syncedBlockId"];
  const cbbOverrides = context["cbb/overrides"];
  const overridesName = attributes.metadata.name;
  const boundData = cbbOverrides?.[overridesName];

  if (Object.keys(bindingAttributes).length) {
    updateBlockAttributes(syncedBlockId, {
      innerContents: {
        ...cbbOverrides,
        [overridesName]: {
          ...(boundData ? boundData : {}),
          ...bindingAttributes,
        },
      },
    });
  }
};

export const withBlockBindingSupport = createHigherOrderComponent(
  (BlockEdit) => (props) => {
    if (!isBoundBlock(props)) {
      return <BlockEdit {...props} />;
    }

    const { name, setAttributes } = props;

    const registry = useRegistry();
    const { updateBlockAttributes } = useDispatch(blockEditorStore);

    // Update overrides data
    const _setAttributes = useCallback(
      (nextAttributes) => {
        registry.batch(() => {
          const bindingAttributes = {};

          // Loop only over the updated attributes to avoid modifying the bound ones that haven't changed.
          for (const [attributeName, newValue] of Object.entries(
            nextAttributes,
          )) {
            if (!canBindAttribute(name, attributeName)) {
              continue;
            }

            bindingAttributes[attributeName] =
              toType(newValue) === "object" ? newValue.toString() : newValue;
          }

          updateSyncedContent({
            updateBlockAttributes,
            bindingAttributes,
            props,
          });

          setAttributes(nextAttributes);
        });
      },
      [registry, updateSyncedContent, updateBlockAttributes, props],
    );

    return <BlockEdit {...props} setAttributes={_setAttributes} />;
  },
  "withBlockBindingSupport",
);

/**
 * Filters a registered block's settings to enhance a block's `edit` component
 * to upgrade bound attributes.
 *
 * @param {WPBlockSettings} settings - Registered block settings.
 * @param {string}          name     - Block name.
 * @return {WPBlockSettings} Filtered block settings.
 */
function bindAttributeSource(settings, name) {
  if (!canBindBlock(name)) {
    return settings;
  }

  return {
    ...settings,
    usesContext: [
      ...settings?.usesContext,
      "cbb/overrides",
      "cbb/syncedBlockId",
    ],
    edit: withBlockBindingSupport(settings.edit),
  };
}

addFilter(
  "blocks.registerBlockType",
  "cbb/blockOverrides/bind-attribute-source",
  bindAttributeSource,
);
