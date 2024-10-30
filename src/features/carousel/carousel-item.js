/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, Fill, TextControl } from "@wordpress/components";

/**
 * Internal dependencies
 */

import { addEditProps } from "sdk/utils";
import { hasSupportLayout } from "../../utils";

/**
 * Define feature name
 */
const layoutType = "layoutType";
const featureName = "carouselItem";

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!hasSupportLayout(props.name, featureName, layoutType)) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes, isSelected } = props;
    const { boldblocks = {} } = attributes;

    const settingsLabel = __(
      "Carousel item settings",
      "content-blocks-builder",
    );
    const settingsControl = (
      <TextControl
        label={__("Delay time (ms)", "content-blocks-builder")}
        type="number"
        value={attributes?.boldblocks?.carouselItem?.delay ?? ""}
        onChange={(rawValue) => {
          const value = rawValue.trim() === "" ? "" : parseInt(rawValue);
          if (value === "" || !isNaN(value)) {
            setAttributes({
              boldblocks: {
                ...boldblocks,
                carouselItem: {
                  ...(boldblocks?.carouselItem ?? {}),
                  delay: value,
                },
              },
            });
          }
        }}
        step={100}
        min={0}
        help={__(
          "Set a custom delay time for this item in the autoplay mode. This is helpful if you use a video or background video inside an item. Leave it blank to use the shared delay value from the parent block.",
          "content-blocks-builder",
        )}
      />
    );

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <Fill name="cbb-block-toolbar">{settingsControl}</Fill>
            <InspectorControls>
              <PanelBody
                title={settingsLabel}
                initialOpen={!!attributes?.boldblocks?.carouselItem?.delay}
                className="boldblocks-panel-settings is-carousel-settings"
              >
                {settingsControl}
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
 * Override props assigned to save component to inject the CSS variables definition.
 *
 * @param {Object} props      Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
export function addSaveProps(props, blockType, attributes) {
  if (!hasSupportLayout(blockType, featureName, layoutType)) {
    return props;
  }

  const { boldblocks: { carouselItem: { delay } = {} } = {} } = attributes;
  const delayValue = parseInt(delay);
  // Ignore zero and NaN value
  if (delayValue > 0) {
    props["data-swiper-autoplay"] = delayValue;
  }

  return props;
}
addFilter(
  "blocks.getSaveContent.extraProps",
  `boldblocks/${featureName}/addSaveProps`,
  addSaveProps,
);

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
    (settings, { featureName, layoutType }) =>
      hasSupportLayout(settings, featureName, layoutType),
    { featureName, layoutType },
  ),
);
