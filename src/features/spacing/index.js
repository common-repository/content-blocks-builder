/**
 * External dependencies
 */
import { isEmpty, isString, isUndefined } from "lodash";

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
import { __experimentalSpacingSizesControl as SpacingSizesControl } from "@wordpress/block-editor";
import { useMemo } from "@wordpress/element";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { LabelControl } from "sdk/components";
import {
  getBreakpointType,
  getAllBreakpoints,
  handleChangeSettingGroupField,
  handleChangeResponsiveSettingGroupField,
  getResponsiveSettingGroupFieldValue,
  getCSSBoxValue,
  toType,
  isUnsetValue,
  buildSpacingCSSValue,
  addEditProps,
  usePropsStyle,
  useBlockFeature,
} from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";

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
const featureName = "spacing";

/**
 * Get styles for the feature.
 *
 * @param {Object} spacing
 */
function getFeatureStyle(spacing) {
  const { padding, margin, blockGap } = spacing;

  let style = {};

  if ("object" === toType(padding)) {
    Object.keys(padding).forEach((breakpoint) => {
      const { value, inherit } = padding[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = padding[inherit] ?? {};
          style = {
            ...style,
            ...getCSSBoxValue(
              inheritValue,
              "--bb--padding",
              breakpoint,
              inherit,
              buildSpacingCSSValue,
            ),
          };
        }
      } else {
        style = {
          ...style,
          ...getCSSBoxValue(
            value,
            "--bb--padding",
            breakpoint,
            false,
            buildSpacingCSSValue,
          ),
        };
      }
    });
  }

  if ("object" === toType(margin)) {
    Object.keys(margin).forEach((breakpoint) => {
      const { value, inherit } = margin[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = margin[inherit] ?? {};
          style = {
            ...style,
            ...getCSSBoxValue(
              inheritValue,
              "--bb--margin",
              breakpoint,
              inherit,
              buildSpacingCSSValue,
            ),
          };
        }
      } else {
        style = {
          ...style,
          ...getCSSBoxValue(
            value,
            "--bb--margin",
            breakpoint,
            false,
            buildSpacingCSSValue,
          ),
        };
      }
    });
  }

  if ("object" === toType(blockGap)) {
    Object.keys(blockGap).forEach((breakpoint) => {
      const { value, inherit } = blockGap[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: { top: inheritValue } = {} } = blockGap[inherit] ?? {};

          if (!isUnsetValue(inheritValue)) {
            style = {
              ...style,
              [`--bb--block-gap--${breakpoint}`]: `var(--bb--block-gap--${inherit})`,
            };
          }
        }
      } else {
        if ("object" === toType(value)) {
          if (!isUnsetValue(value?.top)) {
            style = {
              ...style,
              [`--bb--block-gap--${breakpoint}`]: buildSpacingCSSValue(
                value.top,
              ),
            };
          }
        }
      }
    });
  }

  return style;
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

    const { attributes, setAttributes } = props;

    const layoutType = boldblocksHasSupport(props.name, "layoutType");
    const isSupportPadding = layoutType !== "grid" && layoutType !== "carousel";
    const isSupportMargin =
      layoutType !== "gridItem" && layoutType !== "carouselItem";

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props);

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    const getSpacingValue = (fieldName) =>
      getResponsiveSettingGroupFieldValue({
        fieldName,
        groupName: "spacing",
        attributes,
        breakpoint,
      });

    const paddingByDevice = useMemo(
      () => getSpacingValue("padding"),
      [attributes, breakpoint],
    );

    const marginByDevice = useMemo(
      () => getSpacingValue("margin"),
      [attributes, breakpoint],
    );

    const blockGapByDevice = useMemo(
      () => getSpacingValue("blockGap"),
      [attributes, breakpoint],
    );

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeResponsiveSettingGroupField({
        fieldName,
        groupName: "spacing",
        setAttributes,
        attributes,
        breakpoint,
        allBreakpoints,
        blocks,
        updateBlockAttributes,
      })(newValue);
    };

    const onResetFeature = (fieldName) =>
      handleChangeSettingGroupField({
        fieldName,
        groupName: "spacing",
        setAttributes,
        attributes,
        blocks,
        updateBlockAttributes,
      })({});

    const paddingLabel = __("Padding", "content-blocks-builder");
    const marginLabel = __("Margin", "content-blocks-builder");
    const blockGapLabel = __("Block Spacing", "content-blocks-builder");

    const SpacingLabelControl = () => (
      <LabelControl
        label={__("Spacing", "content-blocks-builder")}
        isResponsive={true}
        className="spacing-label"
      />
    );

    // Debugging
    // useDebugInformation("spacing", attributes);

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <Fill name="cbb-panel-dimensions">
            {isSupportPadding && (
              <ToolsPanelItem
                label={paddingLabel}
                panelId="cbb-panel-dimensions"
                hasValue={() =>
                  !isEmpty(attributes?.boldblocks?.spacing?.padding ?? {})
                }
                onDeselect={() => onResetFeature("padding")}
                className="spacing-panel-item"
              >
                <SpacingLabelControl />
                <SpacingSizesControl
                  label={paddingLabel}
                  values={paddingByDevice}
                  onChange={onFeatureChange("padding")}
                />
              </ToolsPanelItem>
            )}
            {isSupportMargin && (
              <ToolsPanelItem
                label={marginLabel}
                panelId="cbb-panel-dimensions"
                hasValue={() =>
                  !isEmpty(attributes?.boldblocks?.spacing?.margin ?? {})
                }
                onDeselect={() => onResetFeature("margin")}
                className="spacing-panel-item"
              >
                <SpacingLabelControl />
                <SpacingSizesControl
                  label={marginLabel}
                  values={marginByDevice}
                  onChange={onFeatureChange("margin")}
                  minimumCustomValue={-1000}
                />
              </ToolsPanelItem>
            )}
            {isSupportPadding && (
              <ToolsPanelItem
                label={blockGapLabel}
                panelId="cbb-panel-dimensions"
                hasValue={() =>
                  !isEmpty(attributes?.boldblocks?.spacing?.blockGap ?? {})
                }
                onDeselect={() => onResetFeature("blockGap")}
                className="spacing-panel-item"
              >
                <SpacingLabelControl />
                <SpacingSizesControl
                  label={blockGapLabel}
                  values={blockGapByDevice}
                  onChange={onFeatureChange("blockGap")}
                  showSideInLabel={false}
                  sides={["top"]} // Use 'top' as the shorthand property in non-axial configurations.
                />
              </ToolsPanelItem>
            )}
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

  const { boldblocks: { spacing = {} } = {} } = attributes;

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles = {};
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: spacing,
      getStyle: (value) => () => getFeatureStyle(value),
    });
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getFeatureStyle(spacing);
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
