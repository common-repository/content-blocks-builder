/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { settings as settingsIcon } from "@wordpress/icons";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls, BlockControls } from "@wordpress/block-editor";
import {
  PanelBody,
  Slot,
  Dropdown,
  ToolbarButton,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { ReactComponent as CBBIcon } from "../../assets/icon.svg";
import BlockAdditionalInfo from "../../components/block-additional-info";
import {
  boldblocksHasSupport,
  CoreBoldBlocks,
  hasSupportLayout,
} from "../../utils";
import { getCBBVariations } from "../../variations/utils";

// CBB button
const CBBButtonStyled = styled(ToolbarButton)`
  svg {
    fill: #d20962;
  }
`;

/**
 * Define feature name
 */
const featureName = "blockInfo";

const canEdit = (blockName) =>
  !CoreBoldBlocks.includes(blockName) &&
  boldblocksHasSupport(blockName, featureName);

const canSyncContent = (blockName) => {
  return boldblocksHasSupport(blockName, "syncContent") && canEdit(blockName);
};

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    let blockInfo = boldblocksHasSupport(props.name, featureName);
    if (!blockInfo) {
      const CBBVariations = getCBBVariations(props.name);
      if (CBBVariations?.length) {
        blockInfo = { name: props.name };
      }
    }
    const { isSelected, clientId, name, attributes, setAttributes } = props;

    if (!blockInfo) {
      return <BlockEdit {...props} />;
    }

    const cbbBlockLabel = __("Block information", "content-blocks-builder");

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <BlockControls group="block">
              <Dropdown
                popoverProps={{
                  position: "bottom right",
                }}
                contentClassName="cbb-dropdown"
                renderToggle={({ isOpen, onToggle }) => (
                  <CBBButtonStyled
                    label={cbbBlockLabel}
                    onClick={onToggle}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    icon={CBBIcon}
                  />
                )}
                renderContent={() => (
                  <BlockAdditionalInfo
                    clientId={clientId}
                    blockInfo={blockInfo}
                    canSyncContent={canSyncContent(name)}
                    canEdit={canEdit(name)}
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                )}
              />
            </BlockControls>
            <InspectorControls>
              <PanelBody title={cbbBlockLabel} initialOpen={false}>
                <BlockAdditionalInfo
                  clientId={clientId}
                  blockInfo={blockInfo}
                  canSyncContent={canSyncContent(name)}
                  canEdit={canEdit(name)}
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              </PanelBody>
            </InspectorControls>
          </>
        )}
      </>
    );
  };
}, "withInspectorControls");
addFilter(
  "editor.BlockEdit",
  `boldblocks/${featureName}/withInspectorControls`,
  withInspectorControls,
);

/**
 * Override the default edit UI to include new controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withBlockControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!hasBlockSupport(props.name, "cbb")) {
      return <BlockEdit {...props} />;
    }

    const { name, isSelected } = props;
    const blockAttributes = boldblocksHasSupport(name, "blockAttributes");
    const hasCustomAttributes =
      blockAttributes &&
      (blockAttributes?.attributes?.length ||
        blockAttributes?.enableCustomAttributes);
    const isGridItem = hasSupportLayout(name, "gridItem", "layoutType");
    const isCarouselItem = hasSupportLayout(name, "carouselItem", "layoutType");

    return (
      <>
        <BlockEdit {...props} />
        {isSelected &&
          (hasCustomAttributes || isGridItem || isCarouselItem) && (
            <>
              <BlockControls group="block">
                <Dropdown
                  popoverProps={{
                    position: "bottom right",
                  }}
                  contentClassName="cbb-dropdown"
                  renderToggle={({ isOpen, onToggle }) => (
                    <ToolbarButton
                      label={__("Block settings", "content-blocks-builder")}
                      onClick={onToggle}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      icon={settingsIcon}
                    />
                  )}
                  renderContent={() => (
                    <VStack spacing={3}>
                      <Slot name="cbb-block-toolbar" />
                    </VStack>
                  )}
                />
              </BlockControls>
            </>
          )}
      </>
    );
  };
}, "withBlockControls");
addFilter(
  "editor.BlockEdit",
  `boldblocks/CBBBlockToolbar/withBlockControls`,
  withBlockControls,
);
