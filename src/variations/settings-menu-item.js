/**
 * External dependencies
 */
import { nanoid } from "nanoid";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { registerPlugin } from "@wordpress/plugins";
import { useState } from "@wordpress/element";
import { store as blocksStore } from "@wordpress/blocks";
import { MenuItem } from "@wordpress/components";
import {
  BlockSettingsMenuControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { store as editorStore } from "@wordpress/editor";
import { store as noticesStore } from "@wordpress/notices";

/**
 * Internal dependencies
 */
import { useIsMounted } from "sdk/utils";
import { userCanCreateVariation } from "../utils/role-and-cap";
import { CBB_VARIATION_TYPE } from "../utils/constants";
import BlockEditModal from "../components/block-edit-modal";
import { createVariation } from "./utils";

/**
 * Register the block settings menu item.
 */
registerPlugin("boldblocks-create-block-variation", {
  render: () => {
    const { getSelectedBlock } = useSelect(
      (select) => select(blockEditorStore),
      [],
    );
    const { getBlockVariations } = useSelect(
      (select) => select(blocksStore),
      [],
    );
    const { createSuccessNotice, createErrorNotice } =
      useDispatch(noticesStore);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectedBlock = isModalOpen ? getSelectedBlock() : {};

    const { name: blockName } = selectedBlock ?? {};

    // Get all variations.
    const allVariations = blockName ? getBlockVariations(blockName) ?? [] : [];

    // Variation title
    const variationTitle = blockName
      ? `${blockName} variation ${allVariations.length + 1}`
      : "";

    // Variation name
    const variationName = blockName
      ? `${blockName}-variation-${nanoid(10)}`
      : "";

    if (!userCanCreateVariation()) {
      return null;
    }

    const label = __("Create block variation", "content-blocks-builder");

    return (
      <>
        <BlockSettingsMenuControls>
          {({ selectedClientIds }) => {
            return selectedClientIds?.length === 1 ? (
              <MenuItem
                label={label}
                icon="plus-alt2"
                onClick={() => setIsModalOpen(true)}
              >
                {label}
              </MenuItem>
            ) : null;
          }}
        </BlockSettingsMenuControls>
        {isModalOpen && (
          <BlockEditModal
            modalTitle={sprintf(
              __(
                "Create a new variation for the block: '%s'",
                "content-blocks-builder",
              ),
              blockName,
            )}
            title={variationTitle}
            setIsModalOpen={setIsModalOpen}
            onSubmit={(title) => {
              createVariation({
                title,
                block: selectedBlock,
                blockName,
                variationName,
                createSuccessNotice,
                createErrorNotice,
              });
            }}
            className="cbb-block-modal"
          />
        )}
      </>
    );
  },
});

/**
 * Do some actions for editting variations
 * Set navigation mode by default for variation post type
 */
registerPlugin("boldblocks-variations", {
  render: () => {
    const { getCurrentPostType } = useSelect(
      (select) => select(editorStore),
      [],
    );

    const isMounted = useIsMounted();
    const { setNavigationMode } = useDispatch(blockEditorStore);

    // Editting variation post type
    if (getCurrentPostType() === CBB_VARIATION_TYPE && isMounted) {
      // Set navigation mode by default
      setNavigationMode(true);
    }

    return null;
  },
});
