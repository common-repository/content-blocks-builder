/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  BaseControl,
  Fill,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";
import { getBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { OverlayControl } from "sdk/components";
import {
  getColorCSSValueDeprecatedV1,
  getColorCSSValue,
  getSettingFieldValue,
  handleChangeSettingField,
  compareVersion,
  addEditProps,
} from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { labels } from "../../utils/labels";

// Style
import "./overlay.style.scss";

/**
 * Define feature name
 */
const featureName = "overlay";

/**
 *
 * @param {Object} overlay
 * @param {Object} overlay.overlayColor
 * @param {Integer} overlay.opacity
 * @returns {Boolean}
 */
const hasOverlay = (overlay) => {
  return (
    overlay &&
    overlay?.overlayColor &&
    (overlay.overlayColor?.value ||
      overlay.overlayColor?.slug ||
      overlay.overlayColor?.gradientValue ||
      overlay.overlayColor?.gradientSlug)
  );
};

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!boldblocksHasSupport(props.name, featureName)) {
      return <BlockEdit {...props} />;
    }

    const { isSelected, attributes, setAttributes } = props;

    const overlay = getSettingFieldValue({
      fieldName: "overlay",
      attributes,
      defaultValue: {},
    });

    const onFeatureChange = handleChangeSettingField({
      fieldName: "overlay",
      attributes,
      setAttributes,
    });

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <Fill name="cbb-panel-background">
            <ToolsPanelItem
              label={labels.bgOverlay}
              panelId="cbb-panel-background"
              hasValue={() => hasOverlay(overlay)}
              onDeselect={() => onFeatureChange({})}
            >
              <BaseControl label={labels.bgOverlay} />
              <OverlayControl values={overlay} onChange={onFeatureChange} />
            </ToolsPanelItem>
          </Fill>
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
 * Override props assigned to save component to inject the CSS variables definition.
 *
 * @param {Object} props      Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
export function addSaveProps(props, blockType, attributes) {
  if (!boldblocksHasSupport(blockType, featureName)) {
    return props;
  }

  const { boldblocks: { overlay } = {} } = attributes;

  if (!hasOverlay(overlay)) {
    return props;
  }

  props.className = clsx(props.className, "bb:has-overlay");

  return props;
}
// addFilter(
//   "blocks.getSaveContent.extraProps",
//   `boldblocks/${featureName}/addSaveProps`,
//   addSaveProps
// );

/**
 * Filters registered block settings to extend the block edit wrapper
 * to apply the desired styles and className properly.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object}.Filtered block settings.
 */
addFilter(
  "blocks.registerBlockType",
  `boldblocks/${featureName}/addEditProps`,
  addEditProps(
    addSaveProps,
    (settings, { featureName }) => boldblocksHasSupport(settings, featureName),
    { featureName },
  ),
);

/**
 * Build block's overlay markup
 *
 * @param {String} content
 * @param {Object} { name, clientId, attributes }
 */
const addBlockOverlay = (
  content,
  {
    name,
    attributes = {},
    supports: { BoldBlocksDeprecatedDynamicBGOverlay } = {},
  },
  isBlockEdit,
) => {
  if (!boldblocksHasSupport(name, featureName)) {
    return content;
  }

  // Get overlay
  const { boldblocks: { overlay = {} } = {} } = attributes;

  // Bail if there is no valid value
  if (!hasOverlay(overlay)) {
    return content;
  }

  // Using new dynamic overlay, add deprecated check for legacy blocks.
  if (!isBlockEdit && !BoldBlocksDeprecatedDynamicBGOverlay) {
    return content;
  }

  const { overlayColor, opacity } = overlay;

  const { blockVersion } = getBlockSupport(name, "boldblocks") ?? {};
  let overlayStyle;
  // Change color format since 1.2.10
  // blockVersion also was added since 1.2.10
  if (blockVersion) {
    overlayStyle = {
      background: getColorCSSValue(overlayColor),
      opacity: `${opacity / 100}`,
    };
  } else {
    overlayStyle = {
      background: getColorCSSValueDeprecatedV1(overlayColor),
      opacity: `${opacity / 100}`,
    };
  }

  let overlayMarkup;
  if (blockVersion && compareVersion(blockVersion, "1.2.10") > 0) {
    overlayMarkup = (
      <div
        aria-hidden="true"
        className="bb:block-overlay"
        style={overlayStyle}
      ></div>
    );
  } else {
    overlayMarkup = (
      <div className="bb:block-overlay" style={overlayStyle}></div>
    );
  }

  const overlayControl = (
    <>
      {overlayMarkup}
      {content}
    </>
  );

  return overlayControl;
};
addFilter(
  "boldblocks.edit.blockInner",
  `boldblocks/${featureName}/addBlockOverlay`,
  addBlockOverlay,
);
addFilter(
  "boldblocks.save.blockInner",
  `boldblocks/${featureName}/addBlockOverlay`,
  addBlockOverlay,
);
