/**
 * External dependencies
 */
import { omit } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  Button,
  BaseControl,
  __experimentalHStack as HStack,
  __experimentalVStack as VStack,
  __experimentalConfirmDialog as ConfirmDialog,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import {
  serialize,
  createBlocksFromInnerBlocksTemplate,
  hasBlockSupport,
  store as blocksStore,
} from "@wordpress/blocks";
import { store as blockEditorStore } from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";
import { store as noticesStore } from "@wordpress/notices";

/**
 * Internal dependencies
 */
import { log } from "sdk/utils";
import { toType } from "../../utils/dom";
import { getEditPostURL } from "../../utils";
import {
  getAllVariationsURL,
  getCBBVariations,
  ContentAttributes,
} from "../../variations/utils";
import { BlockInfoStyled } from "./styles";

const BlockAdditionalInfo = ({
  clientId,
  blockInfo,
  canEdit,
  canSyncContent,
  attributes,
  setAttributes,
}) => {
  const {
    id,
    name,
    parentName,
    childName,
    templateLock,
    layoutType,
    isSyncedBlockOverrides,
  } = blockInfo;

  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpenPullingConfirm, setIsOpenPullingConfirm] = useState(false);
  const [isOpenPushingConfirm, setIsOpenPushingConfirm] = useState(false);

  const { getBlocks } = useSelect((select) => select(blockEditorStore), []);
  const { getActiveBlockVariation, getBlockVariations } = useSelect(
    (select) => select(blocksStore),
    [],
  );

  const { replaceInnerBlocks } = useDispatch(blockEditorStore);
  const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);

  // Handle instance updated
  const updateSuccess = () => {
    createSuccessNotice(
      __(
        "This block instance has been updated successfully!",
        "content-blocks-builder",
      ),
      {
        type: "snackbar",
      },
    );
  };

  // Handle fetching data
  const fetchData = (options, handleData) => {
    setIsUpdating(true);
    apiFetch(options)
      .then(handleData)
      .catch((error) => {
        log(error, "error");
        createErrorNotice(
          __(
            "An error has occurred. Please try refreshing the page.",
            "content-blocks-builder",
          ),
        );
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  // Reset the block instance
  const onResetContent = (id) => {
    fetchData({ path: `wp/v2/boldblocks-blocks/${id}` }, (post) => {
      let blocks = [];
      try {
        blocks = JSON.parse(post?.meta?.boldblocks_block_blocks);
      } catch (error) {
        log(error, "error");
      }

      replaceInnerBlocks(clientId, createBlocksFromInnerBlocksTemplate(blocks));

      if (isSyncedBlockOverrides) {
        // Reset the overrides data
        setAttributes({ innerContents: {} });
      }

      updateSuccess();
    });
  };

  // Save the original block
  const onPushContent = (id) => {
    const blocks = getBlocks(clientId);
    fetchData(
      {
        path: `wp/v2/boldblocks-blocks/${id}`,
        method: "POST",
        data: {
          content: serialize(blocks),
          meta: {
            boldblocks_block_blocks: JSON.stringify(blocks),
          },
        },
      },
      () => {
        createSuccessNotice(
          __(
            "The original block has been updated successfully!",
            "content-blocks-builder",
          ),
          {
            type: "snackbar",
          },
        );
      },
    );
  };

  // Reset the active variation
  const resetVariation = (id) => {
    fetchData({ path: `wp/v2/boldblocks-variations/${id}` }, (post) => {
      let variation;
      try {
        ({ variation } = JSON.parse(post?.meta?.boldblocks_variation_data));
      } catch (error) {
        log(error, "error");
      }

      if (toType(variation) === "object") {
        // Omit non-content attributes
        const activeAttributes = omit(variation.attributes, ContentAttributes);

        // Remove old values from the old attributes
        for (let key in attributes) {
          if (
            attributes.hasOwnProperty(key) &&
            !activeAttributes.hasOwnProperty(key)
          ) {
            activeAttributes[key] = undefined;
          }
        }

        // Merge classes
        const classes = (attributes?.className ?? "").split(" ");
        if (activeAttributes?.className) {
          activeAttributes.className.split(" ").forEach((cls) => {
            if (cls && !classes.includes(cls)) {
              classes.push(cls);
            }
          });
        }

        // Don't override custom attributes
        const customAttributes = attributes?.boldblocks?.customAttributes;
        setAttributes({
          ...activeAttributes,
          className: classes.join(" "),
          boldblocks: {
            ...(activeAttributes?.boldblocks ?? {}),
            customAttributes,
          },
        });

        updateSuccess();
      }
    });
  };

  // Is cbb block
  const isCBBBlock = hasBlockSupport(name, "cbb");

  const allVariations = getBlockVariations(name);
  const CBBVariations = getCBBVariations(name);
  const hasCBBVariation = isCBBBlock
    ? !!allVariations?.length
    : !!CBBVariations.length;

  // Has action buttons
  const hasActions = canEdit || hasCBBVariation;

  const activeVariation = getActiveBlockVariation(name, attributes);
  let activeCBBVariation;
  let activeStyle;
  if (activeVariation) {
    activeCBBVariation = CBBVariations.find(
      (item) => item?.variationName === activeVariation.name,
    );

    if (!activeCBBVariation) {
      const stylePrefix = `is-style-${name.replace("/", "-")}-variation-`;
      if (
        attributes?.className &&
        attributes.className.indexOf(stylePrefix) !== -1
      ) {
        const activeClass = attributes.className
          .split(" ")
          .find((item) => item.indexOf(stylePrefix) !== -1);

        const activeVariationName = activeClass.replace(
          stylePrefix,
          `${name}-variation-`,
        );

        activeCBBVariation = CBBVariations.find(
          (item) => item?.variationName === activeVariationName,
        );

        activeStyle = activeCBBVariation;
      }
    }
  }

  const activeVariationURL = activeCBBVariation
    ? getEditPostURL(activeCBBVariation?.id)
    : null;

  const updateBlockLabel = __("Update original", "content-blocks-builder");
  const resetBlockLabel = __("Reset content", "content-blocks-builder");
  const resetVariationLabel = activeStyle
    ? __("Reset style", "content-blocks-builder")
    : __("Reset variation", "content-blocks-builder");
  const editVariationLabel = activeStyle
    ? __("Edit active style", "content-blocks-builder")
    : __("Edit active variation", "content-blocks-builder");

  return (
    <BlockInfoStyled className="block-info">
      <VStack spacing={1}>
        <HStack wrap spacing={1} justify="flex-start">
          <div className="block-info__label">
            {__("Block name: ", "content-blocks-builder")}
          </div>
          <div className="block-info__value">
            <code>{name}</code>
          </div>
        </HStack>
        {childName && (
          <HStack wrap spacing={1} justify="flex-start">
            <div className="block-info__label">
              {__("Child block: ", "content-blocks-builder")}
            </div>
            <div className="block-info__value">
              <code>{childName}</code>
            </div>
          </HStack>
        )}
        {parentName && (
          <HStack wrap spacing={1} justify="flex-start">
            <div className="block-info__label">
              {__("Parent block: ", "content-blocks-builder")}
            </div>
            <div className="block-info__value">
              <code>{parentName}</code>
            </div>
          </HStack>
        )}
        {layoutType && (
          <>
            <HStack wrap spacing={1} justify="flex-start">
              <div className="block-info__label">
                {__("Layout: ", "content-blocks-builder")}
              </div>
              <div className="block-info__value">
                <code>
                  {layoutType === "standalone" ? "group" : layoutType}
                </code>
              </div>
            </HStack>
            <HStack wrap spacing={1} justify="flex-start">
              <div className="block-info__label">
                {__("Template lock: ", "content-blocks-builder")}
              </div>
              <div className="block-info__value">
                <code>{templateLock ? templateLock : "None"}</code>
              </div>
            </HStack>
          </>
        )}
      </VStack>
      {hasActions && (
        <div className="block-info__actions">
          {canSyncContent && (
            <>
              <ConfirmDialog
                isOpen={isOpenPullingConfirm}
                onConfirm={() => {
                  onResetContent(id);
                  setIsOpenPullingConfirm(false);
                }}
                onCancel={() => {
                  setIsOpenPullingConfirm(false);
                }}
              >
                {__(
                  "Are you sure you want to replace the content with the content from the original block?",
                  "content-blocks-builder",
                )}
              </ConfirmDialog>
              <ConfirmDialog
                isOpen={isOpenPushingConfirm}
                onConfirm={() => {
                  onPushContent(id);
                  setIsOpenPushingConfirm(false);
                }}
                onCancel={() => {
                  setIsOpenPushingConfirm(false);
                }}
              >
                {__(
                  "Are you sure you want to replace the content of the original block with this content?",
                  "content-blocks-builder",
                )}
              </ConfirmDialog>
            </>
          )}
          <HStack spacing={2} wrap justify="flex-start">
            {canEdit && (
              <Button
                variant="primary"
                size="small"
                target="_blank"
                href={getEditPostURL(id)}
              >
                {__("Edit original", "content-blocks-builder")}
              </Button>
            )}
            {canSyncContent && (
              <>
                <Button
                  variant="primary"
                  size="small"
                  disabled={isUpdating}
                  isBusy={isUpdating}
                  onClick={() => setIsOpenPullingConfirm(true)}
                >
                  {resetBlockLabel}
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  disabled={isUpdating}
                  isBusy={isUpdating}
                  onClick={() => setIsOpenPushingConfirm(true)}
                >
                  {updateBlockLabel}
                </Button>
              </>
            )}
            {activeVariationURL && (
              <>
                <Button
                  variant="primary"
                  size="small"
                  target="_blank"
                  href={activeVariationURL}
                >
                  {editVariationLabel}
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  disabled={isUpdating}
                  isBusy={isUpdating}
                  onClick={() => resetVariation(activeCBBVariation.id)}
                >
                  {resetVariationLabel}
                </Button>
              </>
            )}
            {hasCBBVariation && (
              <Button
                variant="primary"
                size="small"
                target="_blank"
                href={getAllVariationsURL(name)}
              >
                {__("View all variations", "content-blocks-builder")}
              </Button>
            )}
          </HStack>
          {(canSyncContent || activeVariationURL) && (
            <BaseControl
              help={
                <>
                  {canSyncContent && (
                    <>
                      <strong>{resetBlockLabel}</strong>
                      {__(
                        " will replace the content of this instance with the content from the original block.",
                        "content-blocks-builder",
                      )}
                      <br />
                      <strong>{updateBlockLabel}</strong>
                      {__(
                        " will update the content of the original block with the content from this instance.",
                        "content-blocks-builder",
                      )}
                    </>
                  )}
                  {activeVariationURL && (
                    <>
                      {canSyncContent && <br />}
                      <strong>{resetVariationLabel}</strong>
                      {__(
                        " will update the attributes of this instance to match the attributes from the active variation. This action does not affect the inner blocks.",
                        "content-blocks-builder",
                      )}
                    </>
                  )}
                </>
              }
            />
          )}
        </div>
      )}
    </BlockInfoStyled>
  );
};

export default BlockAdditionalInfo;
