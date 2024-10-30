/**
 * External dependencies
 */
import { isString, isUndefined, isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  ToggleControl,
  BaseControl,
  Fill,
  __experimentalBorderBoxControl as BorderBoxControl,
  __experimentalToolsPanelItem as ToolsPanelItem,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { useState, useMemo } from "@wordpress/element";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { LabelControl, BorderRadiusControl } from "sdk/components";
import {
  getBreakpointType,
  getAllBreakpoints,
  handleChangeResponsiveSettingField,
  getResponsiveSettingFieldValue,
  getSettingFieldValue,
  handleChangeSettingField,
  handleChangeMultipleSettingField,
  isValidSettingObject,
  buildBorderStyle,
  getCSSBoxValue,
  getCSSBoxValueDeprecatedV1,
  getColorObject,
  useMultipleOriginColors,
  toType,
  addEditProps,
  usePropsStyle,
  useBlockFeature,
} from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { HelpLink } from "../../components/help-link";

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
const featureName = "border";

/**
 * Get css variable object for border
 *
 * @param {Object} border
 * @param {Function} getCSSBoxValue
 * @returns {Object}
 */
function getBorderStyle({ border = {} }, getCSSBoxValue) {
  let style = {};
  if (isValidSettingObject(border)) {
    Object.keys(border).forEach((breakpoint) => {
      const { value, inherit } = border[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = border[inherit] ?? {};
          style = {
            ...style,
            ...getCSSBoxValue(
              inheritValue,
              "--bb--border",
              breakpoint,
              inherit,
              buildBorderStyle,
            ),
          };
        }
      } else {
        style = {
          ...style,
          ...getCSSBoxValue(
            value,
            "--bb--border",
            breakpoint,
            false,
            buildBorderStyle,
          ),
        };
      }
    });
  }

  return style;
}

/**
 * Build border radius style
 *
 * @param {Object} value
 * @returns {String}
 */
function buildBorderRadiusStyle(value, enableEllipticalRadius) {
  let cssValue = "";
  if (isValidSettingObject(value)) {
    const {
      "top-left": topLeft,
      "top-right": topRight,
      "bottom-right": bottomRight,
      "bottom-left": bottomLeft,
    } = value;
    if (topLeft || topRight || bottomRight || bottomLeft) {
      cssValue = `${topLeft ? topLeft : 0} ${topRight ? topRight : 0} ${
        bottomRight ? bottomRight : 0
      } ${bottomLeft ? bottomLeft : 0}`;
    }

    if (enableEllipticalRadius) {
      const {
        "top-left-vertical": topLeftVertical,
        "top-right-vertical": topRightVertical,
        "bottom-right-vertical": bottomRightVertical,
        "bottom-left-vertical": bottomLeftVertical,
      } = value;

      if (
        topLeftVertical ||
        topRightVertical ||
        bottomRightVertical ||
        bottomLeftVertical
      ) {
        const borderRadiusVerticalValue = `${
          topLeftVertical ? topLeftVertical : 0
        } ${topRightVertical ? topRightVertical : 0} ${
          bottomRightVertical ? bottomRightVertical : 0
        } ${bottomLeftVertical ? bottomLeftVertical : 0}`;

        cssValue = `${cssValue} / ${borderRadiusVerticalValue}`;
      }
    }
  }

  return cssValue;
}

/**
 * Get css variable object for border radius
 *
 * @param {Object} attributes
 * @returns {Object}
 */
function getBorderRadiusStyle({
  enableEllipticalRadius = false,
  borderRadius = {},
}) {
  let style = {};
  if (isValidSettingObject(borderRadius)) {
    Object.keys(borderRadius).forEach((breakpoint) => {
      const { value, inherit } = borderRadius[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = borderRadius[inherit] ?? {};
          if (buildBorderRadiusStyle(inheritValue, enableEllipticalRadius)) {
            style = {
              ...style,
              [`--bb--border-radius--${breakpoint}`]: `var(--bb--border-radius--${inherit})`,
            };
          }
        }
      } else {
        const styleByBreakpoint = buildBorderRadiusStyle(
          value,
          enableEllipticalRadius,
        );

        if (styleByBreakpoint) {
          style = {
            ...style,
            [`--bb--border-radius--${breakpoint}`]: styleByBreakpoint,
          };
        }
      }
    });
  }

  return style;
}

/**
 * Get styles for the feature.
 *
 * @param {Object} attributes
 * @param {Boolean} hasDeprecatedV1
 */
function getFeatureStyle(attributes, hasDeprecatedV1) {
  if (hasDeprecatedV1) {
    return {
      ...getBorderStyle(attributes, getCSSBoxValueDeprecatedV1),
      ...getBorderRadiusStyle(attributes),
    };
  } else {
    return {
      ...getBorderStyle(attributes, getCSSBoxValue),
      ...getBorderRadiusStyle(attributes),
    };
  }
}

/*
{
  border: {
    lg: {
      value: {},
      inherit: null,
    },
    md: { inherit: "lg" },
    sm: { inherit: "lg" },
  },
  enableEllipticalRadius: false,
  borderRadius: {
    lg: {
      value: {},
      inherit: null,
    },
    md: { inherit: "lg" },
    sm: { inherit: "lg" },
  }
}
*/

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

    const { colors, allColors } = useMultipleOriginColors();

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

    // Border
    const borderByDevice = useMemo(
      () =>
        getResponsiveSettingFieldValue({
          fieldName: "border",
          attributes,
          breakpoint,
        }),
      [attributes, breakpoint],
    );

    const migrateBorder =
      (toDefaultControl = true) =>
      (border) => {
        let formatedBorder = border;
        if (border && "object" === toType(border)) {
          if (border?.top || border?.right || border?.bottom || border?.left) {
            const sides = ["top", "right", "bottom", "left"];
            formatedBorder = Object.keys(border).reduce((prev, side) => {
              if (sides.includes(side) && (border[side] ?? false)) {
                let { color } = border[side] ?? {};
                const colorDataType = toType(color);
                if (toDefaultControl) {
                  if (colorDataType === "object") {
                    color = color?.value;
                  }
                } else {
                  if (colorDataType === "string") {
                    color = getColorObject(color, allColors);
                  }
                }

                return { ...prev, [side]: { ...border[side], color } };
              }

              return prev;
            }, {});
          } else if (border?.color) {
            let color = border.color;
            const colorDataType = toType(color);
            if (toDefaultControl) {
              if (colorDataType === "object") {
                color = color?.value;
              }
            } else {
              if (colorDataType === "string") {
                color = getColorObject(color, allColors);
              }
            }

            formatedBorder = { ...border, color };
          }
        }

        return formatedBorder;
      };

    const borderNewByDevice = migrateBorder(true)(borderByDevice);

    const onBorderChange = onResponsiveFeatureChange("border");

    // Border radius
    const borderRadiusByDevice = useMemo(
      () =>
        getResponsiveSettingFieldValue({
          fieldName: "borderRadius",
          attributes,
          breakpoint,
        }),
      [attributes, breakpoint],
    );

    const onBorderRadiusChange = onResponsiveFeatureChange("borderRadius");

    // Enable elliptical radius or not
    const enableEllipticalRadius = getSettingFieldValue({
      fieldName: "enableEllipticalRadius",
      defaultValue: false,
      attributes,
    });

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeSettingField({
        fieldName,
        setAttributes,
        attributes,
        blocks,
        updateBlockAttributes,
      })(newValue);
    };

    // A little hacked to update border radius onPaste
    const [pastedBorderRadius, setPastedBorderRadius] = useState(false);

    const borderLabel = __("Border", "content-blocks-builder");
    const radiusLabel = __("Radius", "content-blocks-builder");

    // Debugging
    // useDebugInformation("border", attributes);

    const rawBorder = attributes?.boldblocks?.border ?? {};
    const rawBorderRadius = attributes?.boldblocks?.borderRadius ?? {};

    const isEmptyValue = ({ lg = {}, md = {}, sm = {} }) =>
      md?.inherit === "lg" && sm?.inherit === "lg" && isEmpty(lg?.value);

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <>
            <Fill name="cbb-panel-border">
              <ToolsPanelItem
                label={borderLabel}
                panelId="cbb-panel-border"
                hasValue={() => !isEmpty(rawBorder) && !isEmptyValue(rawBorder)}
                onDeselect={() => onFeatureChange("border")({})}
              >
                <LabelControl label={borderLabel} isResponsive={true} />
                <BorderBoxControl
                  colors={colors}
                  onChange={(value) => {
                    if (isUndefined(borderNewByDevice)) {
                      if (value?.width && !value?.style) {
                        value = { ...value, style: "solid" };
                      }
                    }
                    onBorderChange(migrateBorder(false)(value));
                  }}
                  value={borderNewByDevice}
                  enableAlpha={true}
                  popoverOffset={40}
                  popoverPlacement="left-start"
                  __experimentalIsRenderedInSidebar={true}
                  size={"__unstable-large"}
                />
              </ToolsPanelItem>
            </Fill>
            <Fill name="cbb-panel-border">
              <ToolsPanelItem
                label={radiusLabel}
                panelId="cbb-panel-border"
                hasValue={() =>
                  !isEmpty(rawBorderRadius) && !isEmptyValue(rawBorderRadius)
                }
                onDeselect={() => {
                  handleChangeMultipleSettingField({
                    setAttributes,
                    attributes,
                    blocks,
                    updateBlockAttributes,
                  })({
                    borderRadius: {},
                    enableEllipticalRadius: false,
                  });
                }}
              >
                <VStack spacing={3}>
                  <BorderRadiusControl
                    fields={[
                      { name: "top-left", placeholder: "top left" },
                      { name: "top-right", placeholder: "top right" },
                      { name: "bottom-right", placeholder: "bottom right" },
                      { name: "bottom-left", placeholder: "bottom left" },
                    ]}
                    label={radiusLabel}
                    values={borderRadiusByDevice}
                    onChange={onBorderRadiusChange}
                  />
                  <ToggleControl
                    label={__(
                      "Enable elliptical radius",
                      "content-blocks-builder",
                    )}
                    checked={enableEllipticalRadius}
                    onChange={onFeatureChange("enableEllipticalRadius")}
                  />
                  {enableEllipticalRadius && (
                    <>
                      <BorderRadiusControl
                        fields={[
                          {
                            name: "top-left-vertical",
                            placeholder: __(
                              "top left",
                              "content-blocks-builder",
                            ),
                          },
                          {
                            name: "top-right-vertical",
                            placeholder: __(
                              "top right",
                              "content-blocks-builder",
                            ),
                          },
                          {
                            name: "bottom-right-vertical",
                            placeholder: __(
                              "bottom right",
                              "content-blocks-builder",
                            ),
                          },
                          {
                            name: "bottom-left-vertical",
                            placeholder: __(
                              "bottom left",
                              "content-blocks-builder",
                            ),
                          },
                        ]}
                        label={__("Vertical radius", "content-blocks-builder")}
                        values={borderRadiusByDevice}
                        onChange={(value) => {
                          if (pastedBorderRadius) {
                            onBorderRadiusChange(pastedBorderRadius);
                            setPastedBorderRadius(false);
                          } else {
                            onBorderRadiusChange(value);
                          }
                        }}
                        onPaste={(event) => {
                          const found = event.clipboardData
                            .getData("text/plain")
                            .match(
                              /(\d+%)\s(\d+%)\s(\d+%)\s(\d+%)\s\/\s(\d+%)\s(\d+%)\s(\d+%)\s(\d+%)/,
                            );
                          if (found) {
                            event.preventDefault();
                            event.stopPropagation();
                            const pastedBorderRadius = {
                              "top-left": found[1],
                              "top-right": found[2],
                              "bottom-right": found[3],
                              "bottom-left": found[4],
                              "top-left-vertical": found[5],
                              "top-right-vertical": found[6],
                              "bottom-right-vertical": found[7],
                              "bottom-left-vertical": found[8],
                            };

                            setPastedBorderRadius(pastedBorderRadius);
                            onBorderRadiusChange(pastedBorderRadius);
                          }
                        }}
                      />
                      <BaseControl
                        help={
                          <>
                            {__(
                              "Use the following tool to learn more about elliptical radius and take advantage of it by copying and pasting the value here.",
                              "content-blocks-builder",
                            )}{" "}
                            <HelpLink
                              href="https://9elements.github.io/fancy-border-radius/"
                              label="Fancy Border Radius"
                            />
                          </>
                        }
                      />
                    </>
                  )}
                </VStack>
              </ToolsPanelItem>
            </Fill>
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
  if (!boldblocksHasSupport(blockType, featureName)) {
    return props;
  }

  const border = (({
    boldblocks: { border, borderRadius, enableEllipticalRadius } = {},
  }) => ({
    border,
    borderRadius,
    enableEllipticalRadius,
  }))(attributes);

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
    featureStyles = usePropsStyle({
      value: border,
      getStyle: (value) => () => getFeatureStyle(value, hasDeprecatedV1),
    });
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getFeatureStyle(border, hasDeprecatedV1);
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
