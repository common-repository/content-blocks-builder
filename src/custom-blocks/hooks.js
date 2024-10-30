/**
 * External dependencies
 */
import { isEmpty, pick } from "lodash";
import { __ } from "@wordpress/i18n";

/**
 * WordPress dependencies
 */
import {
  BlockControls,
  InspectorControls,
  ButtonBlockAppender,
} from "@wordpress/block-editor";
import { ToolbarGroup, SelectControl } from "@wordpress/components";
import { addFilter } from "@wordpress/hooks";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { getCoreFeatures, boldblocksHasSupport } from "../utils";

/**
 * Add a button on the parent block's toolbar to add child blocks
 */
addFilter(
  "boldblocks.edit.blockEditInner",
  `boldblocks/blockEditInner/addChildBlock`,
  (content, props) => {
    const layoutType = boldblocksHasSupport(props.name, "layoutType");
    if (!["carousel", "grid", "accordion", "vstack"].includes(layoutType)) {
      return content;
    }

    const { isSelected, clientId } = props;

    return (
      <>
        {content}
        {isSelected && (
          <BlockControls>
            <ToolbarGroup>
              <ButtonBlockAppender rootClientId={clientId} />
            </ToolbarGroup>
          </BlockControls>
        )}
      </>
    );
  },
);

/**
 * HTML element
 */
addFilter(
  "boldblocks.edit.blockEditInner",
  `boldblocks/blockEditInner/tagName`,
  (content, props) => {
    if ("standalone" !== boldblocksHasSupport(props.name, "layoutType")) {
      return content;
    }

    const {
      isSelected,
      attributes: { tagName = "div" },
      setAttributes,
    } = props;

    return (
      <>
        {content}
        {isSelected && (
          <InspectorControls group="advanced">
            <SelectControl
              __next40pxDefaultSize
              label={__("HTML element", "content-blocks-builder")}
              options={[
                { label: "<div>", value: "div" },
                { label: "<header>", value: "header" },
                { label: "<main>", value: "main" },
                { label: "<section>", value: "section" },
                { label: "<article>", value: "article" },
                { label: "<aside>", value: "aside" },
                { label: "<footer>", value: "footer" },
                { label: "<blockquote>", value: "blockquote" },
              ]}
              value={tagName}
              onChange={(tagName) => setAttributes({ tagName })}
            />
          </InspectorControls>
        )}
      </>
    );
  },
);

/**
 * Force block support for core features on CBB blocks
 */
addFilter(
  "blockEditor.useSetting.before",
  "boldblocks/CBB/useSetting.before",
  (settingValue, settingName, clientId, blockName) => {
    if (!hasBlockSupport(blockName, "cbb")) {
      return settingValue;
    }

    // Force color attributes
    if (
      ["color.text", "color.background", "color.link"].includes(settingName)
    ) {
      return true;
    }

    if (
      [
        "spacing.padding",
        "spacing.margin",
        "spacing.blockGap",
        "dimensions.minHeight",
      ].includes(settingName)
    ) {
      const layoutType = boldblocksHasSupport(blockName, "layoutType");
      const supports = getCoreFeatures(layoutType) ?? {};

      if (!isEmpty(pick(supports, settingName))) {
        return true;
      }
    }

    return settingValue;
  },
);

const AllowedInnerBlocks = (BoldBlocksBlocks?.blocks ?? []).reduce(
  (prev, current) => {
    const { name, blockParent, blockAncestor } = current?.parent
      ? current.parent
      : current;

    [blockParent, blockAncestor].forEach((blockNames) => {
      if (blockNames?.length) {
        blockNames.forEach((blockName) => {
          if (!blockName.startsWith("boldblocks/")) {
            if (!(prev[blockName] ?? false)) {
              prev[blockName] = [name];
            } else {
              if (!prev[blockName].includes(name)) {
                prev[blockName].push(name);
              }
            }
          }
        });
      }
    });

    return prev;
  },
  {},
);

const AllowedBlockNames = Object.keys(AllowedInnerBlocks);
if (AllowedBlockNames?.length) {
  addFilter(
    "blocks.registerBlockType",
    "boldblocks/CBB/overrideAllowedBlocks",
    (blockSettings, blockName) => {
      if (
        !blockSettings.allowedBlocks?.length ||
        blockSettings?.supports?.cbb
      ) {
        return blockSettings;
      }

      if (AllowedBlockNames?.includes(blockName)) {
        return {
          ...blockSettings,
          allowedBlocks: [
            ...blockSettings.allowedBlocks,
            ...AllowedInnerBlocks[blockName],
          ],
        };
      }

      return blockSettings;
    },
  );
}
