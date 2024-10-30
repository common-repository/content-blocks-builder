/**
 * External dependencies
 */
import { isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  Fill,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";
import { hasBlockSupport } from "@wordpress/blocks";
import { useMemo } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { ToggleGroupCustomControl } from "sdk/components";
import {
  getBreakpointType,
  getAllBreakpoints,
  handleChangeResponsiveSettingField,
  getResponsiveSettingFieldValue,
  getStyleForResponsiveToggleGroupField,
  getStyleForResponsiveToggleGroupFieldDeprecatedV1,
  addEditProps,
} from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { labels } from "../../utils/labels";

/**
 * Import styles
 */
// import "./index.style.scss";

/**
 * Debugging
 */
// import { useDebugInformation } from "../../debug";

/**
 * Define feature name
 */
const featureName = "height";

/**
 * Get styles for the feature.
 *
 * @param {Object} attributes
 * @param {Boolean} hasDeprecatedV1
 */
function getFeatureStyle(attributes, hasDeprecatedV1) {
  const { boldblocks: { height = {} } = {} } = attributes;

  return hasDeprecatedV1
    ? getStyleForResponsiveToggleGroupFieldDeprecatedV1(height, "height")
    : getStyleForResponsiveToggleGroupField(height, "height");
}

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

    const { attributes, setAttributes, isSelected } = props;

    const { boldblocks = {}, boldblocks: { height = {} } = {} } = attributes;

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    const valueByDevice = useMemo(
      () =>
        getResponsiveSettingFieldValue({
          fieldName: "height",
          attributes,
          breakpoint,
        }),
      [attributes, breakpoint],
    );

    const onFeatureChange = handleChangeResponsiveSettingField({
      fieldName: "height",
      setAttributes,
      attributes,
      breakpoint,
      allBreakpoints,
    });

    const label = __("Height", "content-blocks-builder");

    // Debugging
    // useDebugInformation("height", attributes);

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <Fill name="cbb-panel-dimensions">
            <ToolsPanelItem
              label={label}
              panelId="cbb-panel-dimensions"
              hasValue={() => !isEmpty(height)}
              onDeselect={() =>
                setAttributes({ boldblocks: { ...boldblocks, height: {} } })
              }
            >
              <ToggleGroupCustomControl
                name="height"
                label={label}
                value={valueByDevice}
                onChange={onFeatureChange}
                options={[
                  {
                    value: "100vh",
                    label: labels.fullScreen,
                  },
                  { value: "100%", label: "100%" },
                  {
                    value: "auto",
                    label: labels.auto,
                  },
                  {
                    value: "custom",
                    label: labels.custom,
                  },
                ]}
                isResponsive={true}
              />
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

  const hasDeprecatedV1 = hasBlockSupport(
    blockType,
    "BoldBlocksDeprecatedStyleUnsetValueV1",
  );

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles = {};
  if (attributes?.isBlockEdit) {
    featureStyles = getFeatureStyle(attributes, hasDeprecatedV1);
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getFeatureStyle(attributes, hasDeprecatedV1);
    }
  }

  props.style = {
    ...props.style,
    ...featureStyles,
  };

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
    (settings, { featureName }) => boldblocksHasSupport(settings, featureName),
    { featureName },
  ),
);
