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
  TextControl,
  Fill,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";
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
const featureName = "aspectRatio";

/**
 * Get styles for the feature.
 *
 * @param {Object} attributes
 */
function getFeatureStyle(attributes) {
  const { boldblocks: { aspectRatio = {} } = {} } = attributes;

  return getStyleForResponsiveToggleGroupField(aspectRatio, "aspect-ratio");
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

    const { boldblocks = {}, boldblocks: { aspectRatio = {} } = {} } =
      attributes;

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    const valueByDevice = useMemo(
      () =>
        getResponsiveSettingFieldValue({
          fieldName: "aspectRatio",
          attributes,
          breakpoint,
        }),
      [attributes, breakpoint],
    );

    const onFeatureChange = handleChangeResponsiveSettingField({
      fieldName: "aspectRatio",
      setAttributes,
      attributes,
      breakpoint,
      allBreakpoints,
    });

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <Fill name="cbb-panel-dimensions">
            <ToolsPanelItem
              label={labels.aspectRatio}
              panelId="cbb-panel-dimensions"
              hasValue={() => !isEmpty(aspectRatio)}
              onDeselect={() =>
                setAttributes({
                  boldblocks: { ...boldblocks, aspectRatio: {} },
                })
              }
            >
              <ToggleGroupCustomControl
                name="aspectRatio"
                label={labels.aspectRatio}
                value={valueByDevice}
                onChange={onFeatureChange}
                options={[
                  { value: "1", label: "1/1" },
                  { value: "16/9", label: "16/9" },
                  { value: "3/2", label: "3/2" },
                  { value: "4/3", label: "4/3" },
                  {
                    value: "auto",
                    label: labels.auto,
                  },
                  {
                    value: "custom",
                    label: labels.custom,
                  },
                ]}
                customOptions={{
                  renderControl: (props) => {
                    return <TextControl {...props} autoComplete="off" />;
                  },
                }}
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

  props.style = {
    ...props.style,
    ...getFeatureStyle(attributes),
  };

  return props;
}

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
