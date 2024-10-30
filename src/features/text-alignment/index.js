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
  AlignmentToolbar,
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
import { boldblocksHasSupport } from "../../utils";

/**
 * Import styles
 */
// import "./index.style.scss";

/**
 * Define feature name
 */
const featureName = "textAlignment";

/**
 * Get styles for the feature.
 *
 * @param {Object} textAlignment
 */
function getFeatureStyle(textAlignment) {
  let style = {};
  if (isObject(textAlignment) && !isEmpty(textAlignment)) {
    Object.keys(textAlignment).forEach((breakpoint) => {
      const { value, inherit } = textAlignment[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = textAlignment[inherit] ?? {};
          if (inheritValue) {
            style = {
              ...style,
              [`--bb--text-alignment--${breakpoint}`]: `var(--bb--text-alignment--${inherit})`,
            };
          }
        }
      } else {
        if (value) {
          style = {
            ...style,
            [`--bb--text-alignment--${breakpoint}`]: value + "",
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
    if (!boldblocksHasSupport(props.name, featureName)) {
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

    const blockEditingMode = useBlockEditingMode();

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && blockEditingMode === "default" && (
          <BlockControls>
            <AlignmentToolbar
              value={getResponsiveSettingFieldValue({
                fieldName: "textAlignment",
                attributes,
                breakpoint,
              })}
              onChange={onFeatureChange("textAlignment")}
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
  if (!boldblocksHasSupport(blockType, featureName)) {
    return props;
  }

  const { boldblocks: { textAlignment = {} } = {} } = attributes;

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles = {};
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: textAlignment,
      getStyle: (value) => () => getFeatureStyle(value),
    });
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getFeatureStyle(textAlignment);
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
