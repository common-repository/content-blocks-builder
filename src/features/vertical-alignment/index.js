/**
 * External dependencies
 */
import { isEmpty, isObject, isString, isUndefined } from "lodash";

/**
 * WordPress dependencies
 */
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  BlockControls,
  BlockVerticalAlignmentToolbar,
  useBlockEditingMode,
} from "@wordpress/block-editor";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import {
  getBreakpointType,
  getAllBreakpoints,
  handleChangeResponsiveSettingField,
  getResponsiveSettingFieldValue,
  addEditProps,
  usePropsStyle,
  useBlockFeature,
} from "sdk/utils";
import { boldblocksHasSupport, getLayoutType } from "../../utils";

/**
 * Import styles
 */
// import "./index.style.scss";

/**
 * Define feature name
 */
const featureName = "verticalAlignment";

/**
 * Check whether the block supports vertical alignment
 */
const supportVerticalAlignment = (blockType, featureName) => {
  const layoutType = getLayoutType(blockType);
  return (
    layoutType === "grid" ||
    layoutType === "gridItem" ||
    boldblocksHasSupport(blockType, featureName)
  );
};

/**
 * Get styles for the feature.
 *
 * @param {Object} verticalAlignment
 */
function getFeatureStyle(verticalAlignment) {
  let style = {};
  if (isObject(verticalAlignment) && !isEmpty(verticalAlignment)) {
    Object.keys(verticalAlignment).forEach((breakpoint) => {
      const { value, inherit } = verticalAlignment[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = verticalAlignment[inherit] ?? {};
          if (inheritValue) {
            style = {
              ...style,
              [`--bb--vertical-alignment--${breakpoint}`]: `var(--bb--vertical-alignment--${inherit})`,
            };
          }
        }
      } else {
        if (value) {
          const alignItems =
            value === "top" ? "start" : value === "bottom" ? "end" : value;
          style = {
            ...style,
            [`--bb--vertical-alignment--${breakpoint}`]: alignItems + "",
          };
        }
      }
    });
  }

  return style;
}

/**
 * Override the default edit UI to include new block controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withBlockControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!supportVerticalAlignment(props.name, featureName)) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes } = props;

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props);

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeResponsiveSettingField({
        fieldName,
        setAttributes,
        attributes,
        breakpoint,
        allBreakpoints,
        blocks,
        updateBlockAttributes,
      })(newValue);
    };

    const layoutType = getLayoutType(props.name);
    const controls = ["top", "center", "bottom"];

    // align-items and align-selft properties only support start, end, center and stretch. We don't need stretch on grid, because it's the default behavior.
    // align-content on standalone blocks supports space-between
    if (layoutType === "gridItem") {
      controls.push("stretch");
    } else if (layoutType !== "grid") {
      controls.push("space-between");
    }

    const blockEditingMode = useBlockEditingMode();

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && blockEditingMode === "default" && (
          <BlockControls>
            <BlockVerticalAlignmentToolbar
              controls={controls}
              value={getResponsiveSettingFieldValue({
                fieldName: "verticalAlignment",
                attributes,
                breakpoint,
              })}
              onChange={onFeatureChange("verticalAlignment")}
            />
          </BlockControls>
        )}
      </>
    );
  };
}, "withBlockControls");
addFilter(
  "editor.BlockEdit",
  `boldblocks/${featureName}/withBlockControls`,
  withBlockControls,
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
  if (!supportVerticalAlignment(blockType, featureName)) {
    return props;
  }

  const { boldblocks: { verticalAlignment = {} } = {} } = attributes;

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles = {};
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: verticalAlignment,
      getStyle: (value) => () => getFeatureStyle(value),
    });
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getFeatureStyle(verticalAlignment);
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
    (settings, { featureName }) =>
      supportVerticalAlignment(settings, featureName),
    { featureName },
  ),
);
