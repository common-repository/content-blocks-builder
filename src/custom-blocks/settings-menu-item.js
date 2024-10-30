/**
 * External dependencies
 */
import { addCard } from "@wordpress/icons";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { registerPlugin } from "@wordpress/plugins";
import { useState } from "@wordpress/element";
import {
  registerBlockType,
  createBlock,
  createBlocksFromInnerBlocksTemplate,
  serialize,
} from "@wordpress/blocks";
import { MenuItem } from "@wordpress/components";
import {
  BlockSettingsMenuControls,
  store as blockEditorStore,
  useInnerBlocksProps,
  useBlockProps,
} from "@wordpress/block-editor";
import { store as noticesStore } from "@wordpress/notices";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */
import {
  getEditPostURL,
  userCanCreateBlock,
  CBBCoreBlockSupports,
  getCoreFeatures,
} from "../utils";
import { canCreateBlocks } from "../utils/block-toolbar";
import BlockEditModal from "../components/block-edit-modal";
import { shareLabels } from "../utils/shared-labels";

/**
 * Register the block settings menu item.
 */
registerPlugin("boldblocks-create-content-block", {
  render: () => {
    const { getBlocksByClientId, getBlockName } = useSelect(
      (select) => select(blockEditorStore),
      [],
    );
    const { replaceBlocks } = useDispatch(blockEditorStore);
    const { createSuccessNotice } = useDispatch(noticesStore);

    const [data, setData] = useState({
      isModalOpen: false,
      clientIds: [],
    });

    const { isModalOpen, clientIds } = data;

    if (!userCanCreateBlock()) {
      return null;
    }

    const createCustomBlock = ({ title, clientIds }) => {
      // Get blocks data
      const blocks = getBlocksByClientId(clientIds);

      // Get post content
      const blockContent = serialize(blocks);

      // Create a new block
      apiFetch({
        path: "wp/v2/boldblocks-blocks",
        method: "POST",
        data: {
          title,
          content: blockContent,
          status: "publish",
          meta: {
            boldblocks_block_blocks: JSON.stringify(blocks),
          },
        },
      }).then((post) => {
        createSuccessNotice(
          __(
            "The new custom block has been created!",
            "content-blocks-builder",
          ),
          {
            type: "snackbar",
            actions: [
              {
                label: sprintf(shareLabels.editItem, shareLabels.block),
                url: getEditPostURL(post.id),
              },
            ],
          },
        );

        const {
          id,
          slug,
          title: { raw: title },
        } = post;

        const blockName = `boldblocks/${slug}`;

        registerBlockType(blockName, {
          apiVersion: 3,
          title,
          category: "boldblocks",
          supports: {
            ...CBBCoreBlockSupports,
            ...getCoreFeatures("standalone"),
            layout: true,
            align: ["wide", "full"],
            boldblocks: {
              blockInfo: {
                id,
                name: blockName,
                layoutType: "standalone",
              },
              copyPaste: true,
              syncContent: true,
              devicePreview: true,
            },
          },
          edit(props) {
            return (
              <div
                {...useInnerBlocksProps(
                  useBlockProps({ className: "wp-block-boldblocks-custom" }),
                )}
              />
            );
          },
          save(props) {
            return (
              <div
                {...useInnerBlocksProps.save(
                  useBlockProps.save({
                    className: "wp-block-boldblocks-custom",
                  }),
                )}
              />
            );
          },
        });

        const align =
          blocks?.length === 1 ? blocks[0]?.attributes?.align : undefined;

        const newBlock = createBlock(
          blockName,
          { align },
          createBlocksFromInnerBlocksTemplate(blocks),
        );

        if (!newBlock) {
          return;
        }

        requestAnimationFrame(() => {
          replaceBlocks(clientIds, newBlock);
        });
      });
    };

    const label = __("Create custom block", "content-blocks-builder");

    return (
      <>
        <BlockSettingsMenuControls>
          {({ selectedClientIds }) => {
            return selectedClientIds?.length > 0 &&
              canCreateBlocks(selectedClientIds, getBlockName) ? (
              <MenuItem
                label={label}
                icon={addCard}
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
            title={__("CBB - A new block", "content-blocks-builder")}
            titleHelp={__(
              "You could name your block with a prefix that indicates it is a white label and unique, such as ‘Awesome Project - CTA’.",
              "content-blocks-builder",
            )}
            setIsModalOpen={(isModalOpen) => setData({ ...data, isModalOpen })}
            onSubmit={(title) => {
              createCustomBlock({
                title,
                clientIds,
              });
            }}
            className="cbb-block-modal"
          />
        )}
      </>
    );
  },
});
