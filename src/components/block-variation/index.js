/**
 * External dependencies
 */
import { nanoid } from "nanoid";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import {
  BaseControl,
  Button,
  __experimentalHStack as HStack,
} from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";
import { useState } from "@wordpress/element";
import {
  rawHandler,
  createBlock,
  createBlocksFromInnerBlocksTemplate,
  store as blocksStore,
} from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { buildInnerBlocksFromBlocks } from "../../utils/blocks";
import { getEditPostURL } from "../../utils/posts";
import {
  createVariation,
  useDefaultVariation,
  getAllVariationsURL,
} from "../../variations/utils";
import { HelpLink } from "../help-link";
import { shareLabels } from "../../utils/shared-labels";

const VariationStyled = styled.div`
  > h3 {
    margin-bottom: 8px;
  }
  > div {
    padding: 8px 10px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
  }
  .actions {
    margin-top: 2px;
  }
  .links {
    margin-top: 4px;
  }
  p {
    margin-bottom: 0;
  }
`;

/**
 * The default variation control for blocks
 */
const BlockVariation = ({
  blockName,
  blockContent,
  blockTitle,
  blockStatus,
  blockChildName,
  label = shareLabels.variations,
}) => {
  const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);
  const [isCreating, setIsCreating] = useState(false);
  const defaultVariation = useDefaultVariation(blockName);
  const [defaultId, setDefaultId] = useState(
    defaultVariation ? defaultVariation?.id : null,
  );

  const allVariations = useSelect(
    (select) => select(blocksStore).getBlockVariations(blockName),
    [blockName],
  );

  const createNewVariation = ({ isDefault }) => {
    // Variation name
    const variationName = blockName
      ? `${blockName}-variation-${nanoid(10)}`
      : "";

    // Build inner blocks
    const innerBlocks = buildInnerBlocksFromBlocks(
      rawHandler({ HTML: blockContent }),
    );

    const block = blockChildName
      ? createBlock(
          blockName,
          {},
          createBlocksFromInnerBlocksTemplate([
            { name: blockChildName, innerBlocks, attributes: {} },
          ]),
        )
      : createBlock(
          blockName,
          {},
          createBlocksFromInnerBlocksTemplate(innerBlocks),
        );

    setIsCreating(true);

    const title = isDefault
      ? `${blockTitle} - ${__("default variation", "content-blocks-builder")}`
      : `${blockTitle} variation ${allVariations.length + 1}`;

    createVariation({
      title,
      block,
      blockName,
      variationName,
      isDefault,
      createSuccessNotice,
      createErrorNotice,
      doneCb: (post) => {
        if (isDefault) {
          setDefaultId(post.id);
        }
      },
      finallyCb: () => setIsCreating(false),
    });
  };

  // Newly blocks
  if (
    !wp.blocks.getBlockType(blockName) ||
    (blockStatus !== "publish" && !allVariations?.length)
  ) {
    return null;
  }

  let actions = null;
  if (blockStatus === "publish") {
    if (!defaultId) {
      actions = (
        <Button
          variant="secondary"
          size="small"
          onClick={() => createNewVariation({ isDefault: true })}
          disabled={isCreating}
          isBusy={isCreating}
        >
          {__("Create default variation", "content-blocks-builder")}
        </Button>
      );
    }

    actions = (
      <>
        {actions}
        <Button
          variant="secondary"
          size="small"
          onClick={() => createNewVariation({ isDefault: false })}
          disabled={isCreating}
          isBusy={isCreating}
        >
          {__("Create new variation", "content-blocks-builder")}
        </Button>
      </>
    );
  }
  let links = null;
  if (defaultId) {
    links = (
      <HelpLink
        href={getEditPostURL(defaultId)}
        label={sprintf(shareLabels.editItem, shareLabels.defaultVariation)}
      />
    );
  }

  if (allVariations?.length > 0) {
    links = (
      <>
        {links}
        <HelpLink
          href={getAllVariationsURL(blockName)}
          label={__("View all", "content-blocks-builder")}
        />
      </>
    );
  }

  return (
    <VariationStyled>
      <h3>{label}</h3>
      <div>
        {!!actions && (
          <HStack spacing={2} wrap justify="flex-start" className="actions">
            {actions}
          </HStack>
        )}
        <BaseControl
          help={
            <>
              {__(
                "Use a variation to set initial attributes and inner blocks. The default variation will override the original block in the inserter.",
                "content-blocks-builder",
              )}{" "}
              <HelpLink href="https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/" />
            </>
          }
        />
        {!!links && (
          <HStack spacing={2} wrap justify="flex-start" className="links">
            {links}
          </HStack>
        )}
      </div>
    </VariationStyled>
  );
};

export default BlockVariation;
