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
  JustifyToolbar,
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
const featureName = "justifyAlignment";

/**
 * Check whether the block supports justify alignment
 */
const supportJustifyAlignment = (blockType, featureName) => {
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
 * @param {Object} justifyAlignment
 * @param {String} layoutType
 */
function getFeatureStyle(justifyAlignment, layoutType) {
  let style = {};
  if (isObject(justifyAlignment) && !isEmpty(justifyAlignment)) {
    Object.keys(justifyAlignment).forEach((breakpoint) => {
      const { value, inherit } = justifyAlignment[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = justifyAlignment[inherit] ?? {};
          if (inheritValue) {
            style = {
              ...style,
              [`--bb--justify-alignment--${breakpoint}`]: `var(--bb--justify-alignment--${inherit})`,
            };
          }
        }
      } else {
        if (value) {
          let justifyItems;
          if (["grid", "gridItem"].includes(layoutType)) {
            justifyItems = value;
          } else {
            justifyItems =
              value === "left" ? "start" : value === "right" ? "end" : value;
          }
          style = {
            ...style,
            [`--bb--justify-alignment--${breakpoint}`]: justifyItems + "",
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
    if (!supportJustifyAlignment(props.name, featureName)) {
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
    const controls = ["left", "center", "right"];

    // justify-items and justify-selft properties only support start, end, center and stretch. We don't need stretch on grid, because it's the default behavior.
    // justify-content on standalone blocks supports space-between, but we don't need it.
    if (layoutType === "gridItem") {
      controls.push("stretch");
    }

    const blockEditingMode = useBlockEditingMode();

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && blockEditingMode === "default" && (
          <BlockControls>
            <JustifyToolbar
              allowedControls={controls}
              value={getResponsiveSettingFieldValue({
                fieldName: "justifyAlignment",
                attributes,
                breakpoint,
              })}
              onChange={onFeatureChange("justifyAlignment")}
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
  if (!supportJustifyAlignment(blockType, featureName)) {
    return props;
  }

  const { boldblocks: { justifyAlignment = {} } = {} } = attributes;

  const layoutType = getLayoutType(blockType);

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles = {};
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: justifyAlignment,
      getStyle: (value) => () => getFeatureStyle(value, layoutType),
    });
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getFeatureStyle(justifyAlignment, layoutType);
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
      supportJustifyAlignment(settings, featureName),
    { featureName },
  ),
);
