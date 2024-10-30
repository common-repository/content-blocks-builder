/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { registerPlugin } from "@wordpress/plugins";
import { useState } from "@wordpress/element";
import { serialize } from "@wordpress/blocks";
import { MenuItem } from "@wordpress/components";
import {
  BlockSettingsMenuControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { store as noticesStore } from "@wordpress/notices";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */
import { getEditPostURL } from "../utils/posts";
import { canCreateBlocks } from "../utils/block-toolbar";
import { userCanCreatePattern } from "../utils/role-and-cap";
import BlockEditModal from "../components/block-edit-modal";
import { shareLabels } from "../utils/shared-labels";

/**
 * Register the block settings menu item.
 */
registerPlugin("boldblocks-create-block-pattern", {
  render: () => {
    const { getBlocksByClientId, getBlockName } = useSelect(
      (select) => select(blockEditorStore),
      [],
    );

    const { createSuccessNotice } = useDispatch(noticesStore);

    const [data, setData] = useState({
      isModalOpen: false,
      clientIds: [],
    });

    const { isModalOpen, clientIds } = data;

    if (!userCanCreatePattern()) {
      return null;
    }

    const createPattern = ({ title, clientIds }) => {
      // Get blocks data
      const blocks = getBlocksByClientId(clientIds);

      // Get post content
      const patternContent = serialize(blocks);

      // Create a new block pattern
      apiFetch({
        path: "wp/v2/boldblocks-patterns",
        method: "POST",
        data: {
          title,
          content: patternContent,
          status: "publish",
        },
      }).then((post) => {
        createSuccessNotice("The new pattern has been created!", {
          type: "snackbar",
          actions: [
            {
              label: sprintf(shareLabels.editItem, shareLabels.pattern),
              url: getEditPostURL(post.id),
            },
          ],
        });
      });
    };

    const label = __("Create block pattern", "content-blocks-builder");

    return (
      <>
        <BlockSettingsMenuControls>
          {({ selectedClientIds }) => {
            return selectedClientIds?.length > 0 &&
              canCreateBlocks(selectedClientIds, getBlockName) ? (
              <MenuItem
                label={label}
                icon="plus-alt2"
                onClick={() =>
                  setData({
                    isModalOpen: true,
                    clientIds: selectedClientIds,
                  })
                }
              >
                {label}
              </MenuItem>
            ) : null;
          }}
        </BlockSettingsMenuControls>
        {isModalOpen && (
          <BlockEditModal
            modalTitle={label}
            title={__("CBB - A new pattern", "content-blocks-builder")}
            titleHelp={__(
              "You could name your pattern with a prefix that indicates it is a white label, such as ‘Awesome Project - Hero’.",
              "content-blocks-builder",
            )}
            setIsModalOpen={(isModalOpen) => setData({ ...data, isModalOpen })}
            onSubmit={(title) => {
              createPattern({ title, clientIds });
            }}
            className="cbb-block-modal"
          />
        )}
      </>
    );
  },
});
