/**
 * External dependencies
 */
import { isArray, isString, isUndefined, isNil, isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  BaseControl,
  FocalPointPicker,
  Fill,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { TransformControl, LabelControl } from "sdk/components";
import {
  getBreakpointType,
  getAllBreakpoints,
  handleChangeSettingField,
  handleChangeMultipleSettingField,
  getSettingFieldValue,
  handleChangeResponsiveSettingField,
  getResponsiveSettingFieldValue,
  isValidSettingObject,
  addEditProps,
  usePropsStyle,
  useBlockFeature,
} from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { labels } from "../../utils/labels";

/**
 * Import styles
 */
// import "./index.style.scss";

/**
 * Define feature name
 */
const featureName = "transform";

/**
 * Check a transform value is empty or not
 *
 * @param {Mixed} value
 * @returns {Boolean}
 */
const isTransformValueEmpty = (value) => isNil(value) || value === "";

/**
 * Build transform type value
 *
 * @param {Object} transformItem
 */
const buildTransformTypeCSSValue = (transformItem) => {
  let style = "";
  if (isValidSettingObject(transformItem)) {
    const transformType = Object.keys(transformItem).length
      ? Object.keys(transformItem)[0]
      : false;

    if (transformType) {
      const { [transformType]: transformValue } = transformItem;
      if (isValidSettingObject(transformValue)) {
        if (transformType === "rotate") {
          if (transformValue !== "") {
            style = `rotate(${transformValue}deg)`;
          }
        } else {
          const suffix = "skew" === transformType ? "deg" : "";
          let { x, y } = transformValue;
          if (!isTransformValueEmpty(x) || !isTransformValueEmpty(y)) {
            x = isTransformValueEmpty(x)
              ? transformType === "scale"
                ? 1
                : 0
              : x;
            y = isTransformValueEmpty(y)
              ? transformType === "scale"
                ? 1
                : 0
              : y;
            style = `${transformType}(${x}${suffix}, ${y}${suffix})`;
          }
        }
      }
    }
  }

  return style;
};

/**
 * Build transform css style
 *
 * @param {Object} value
 * @returns {String}
 */
const buildTransformStyle = (value) => {
  let styleArray = [];
  if (isArray(value)) {
    styleArray = value
      .map((item) => buildTransformTypeCSSValue(item))
      .filter((i) => i);
  }

  return styleArray.join(" ");
};

/**
 * Get styles for the feature.
 *
 * @param {Object} transformObject
 */
function getFeatureStyle(transformObject) {
  const { transform = {}, transformOrigin: { x = 0.5, y = 0.5 } = {} } =
    transformObject;

  let style = {};
  if (isValidSettingObject(transform)) {
    Object.keys(transform).forEach((breakpoint) => {
      const { value, inherit } = transform[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = transform[inherit] ?? {};
          if (buildTransformStyle(inheritValue)) {
            style = {
              ...style,
              [`--bb--transform--${breakpoint}`]: `var(--bb--transform--${inherit})`,
            };
          }
        }
      } else {
        const transfromStyle = buildTransformStyle(value);
        if (transfromStyle) {
          style = {
            ...style,
            [`--bb--transform--${breakpoint}`]: transfromStyle,
          };
        }
      }
    });
  }

  if (isValidSettingObject(style)) {
    style = {
      ...style,
      transformOrigin: `${parseFloat(x).toFixed(2) * 100}% ${
        parseFloat(y).toFixed(2) * 100
      }%`,
    };
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

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props);

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    const onResponsiveFeatureChange = (fieldName) => (newValue) => {
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

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeSettingField({
        fieldName,
        setAttributes,
        attributes,
        blocks,
        updateBlockAttributes,
      })(newValue);
    };

    // Get transform value
    const transform = getResponsiveSettingFieldValue({
      fieldName: "transform",
      attributes,
      breakpoint,
      defaultValue: [],
    });

    const rawTransform = attributes?.boldblocks?.transform ?? {};
    const isEmptyValue = ({ lg = {}, md = {}, sm = {} }) =>
      md?.inherit === "lg" && sm?.inherit === "lg" && !lg?.value?.length;

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <Fill name="cbb-panel-others">
            <ToolsPanelItem
              label={labels.transform}
              panelId="cbb-panel-others"
              hasValue={() =>
                !isEmpty(rawTransform) && !isEmptyValue(rawTransform)
              }
              onDeselect={() => {
                handleChangeMultipleSettingField({
                  setAttributes,
                  attributes,
                  blocks,
                  updateBlockAttributes,
                })({
                  transform: {},
                  transformOrigin: {},
                });
              }}
            >
              <LabelControl label={labels.transform} />
              <TransformControl
                values={transform}
                onChange={onResponsiveFeatureChange("transform")}
                showResponsiveLabel={false}
              />
              {!!transform?.length && (
                <>
                  <hr />
                  <FocalPointPicker
                    label={__("Transform origin", "content-blocks-builder")}
                    value={getSettingFieldValue({
                      fieldName: "transformOrigin",
                      attributes,
                    })}
                    onChange={onFeatureChange("transformOrigin")}
                  />
                </>
              )}
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

  const transform = (({ boldblocks: { transform, transformOrigin } = {} }) => ({
    transform,
    transformOrigin,
  }))(attributes);

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles = {};
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: transform,
      getStyle: (value) => () => getFeatureStyle(value),
    });
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getFeatureStyle(transform);
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
