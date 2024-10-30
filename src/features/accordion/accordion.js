/**
 * External dependencies
 */
import clsx from "clsx";
import { isObject, isEmpty, isString } from "lodash";

/**
 * WordPress dependencies
 */
import { _x, __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { BlockControls, InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  ToggleControl,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { ToggleGroupControl, ColorGradientDropdown } from "sdk/components";
import {
  getBreakpointType,
  getAllBreakpoints,
  getSettingFieldValue,
  getSettingGroupFieldValue,
  handleChangeSettingGroupField,
  getResponsiveSettingGroupFieldValue,
  handleChangeResponsiveSettingGroupField,
  isUnsetValue,
  getColorObject,
  useMultipleOriginColors,
  getColorCSSValue,
  addAttributes,
  addEditProps,
  usePropsStyle,
} from "sdk/utils";
import { hasSupportLayout } from "../../utils";
import { getAccordionDataSet } from "./utils";
import PreviewMode from "../../components/preview-mode";
import GapControl from "../../components/gap-control";
import ResponsiveUnitControl from "../../components/responsive-unit-control";

import "./accordion-editor";

/**
 * Define feature name
 */
export const layoutType = "layoutType";
export const featureName = "accordion";

/**
 * Get styles for accordion.
 *
 * @param {Object} accordion
 */
function getAccordionStyles(accordion, isDeprecatedDynamicStyle = false) {
  let style = {};
  if (isDeprecatedDynamicStyle && accordion?.gap) {
    const gap = accordion.gap;
    if (isObject(gap) && !isEmpty(gap)) {
      Object.keys(gap).forEach((breakpoint) => {
        const { value, inherit } = gap[breakpoint];
        if (isUnsetValue(value)) {
          if (inherit && isString(inherit)) {
            const { value: inheritValue } = gap[inherit] ?? {};
            if (!isUnsetValue(inheritValue)) {
              style = {
                ...style,
                [`--bb--accordion-gap--${breakpoint}`]: `var(--bb--accordion-gap--${inherit})`,
              };
            }
          }
        } else {
          style = {
            ...style,
            [`--bb--accordion-gap--${breakpoint}`]: value + "",
          };
        }
      });
    }
  }

  if (isDeprecatedDynamicStyle && accordion?.padding) {
    const padding = accordion.padding;
    if (isObject(padding) && !isEmpty(padding)) {
      Object.keys(padding).forEach((breakpoint) => {
        const { value: { x, y } = {}, inherit } = padding[breakpoint] ?? {};

        if (isUnsetValue(x) && isUnsetValue(y)) {
          if (inherit && isString(inherit)) {
            const { value: { x: inheritX, y: inheritY } = {} } =
              padding[inherit] ?? {};

            if (!isUnsetValue(inheritX)) {
              style = {
                ...style,
                [`--bb--accordion-padding-x--${breakpoint}`]: `var(--bb--accordion-padding-x--${inherit})`,
              };
            }

            if (!isUnsetValue(inheritY)) {
              style = {
                ...style,
                [`--bb--accordion-padding-y--${breakpoint}`]: `var(--bb--accordion-padding-y--${inherit})`,
              };
            }
          }
        } else {
          if (!isUnsetValue(x)) {
            style = {
              ...style,
              [`--bb--accordion-padding-x--${breakpoint}`]: x + "",
            };
          }

          if (!isUnsetValue(y)) {
            style = {
              ...style,
              [`--bb--accordion-padding-y--${breakpoint}`]: y + "",
            };
          }
        }
      });
    }
  }

  if (accordion?.titleColor) {
    const titleColor = getColorCSSValue(accordion?.titleColor);
    if (titleColor) {
      style = { ...style, [`--bb--accordion-title-color`]: titleColor };
    }
  }

  if (accordion?.iconColor) {
    const iconColor = getColorCSSValue(accordion?.iconColor);
    if (iconColor) {
      style = { ...style, [`--bb--accordion-icon-color`]: iconColor };
    }
  }

  return style;
}

// pretter-ignore
addFilter(
  "blocks.registerBlockType",
  `boldblocks/${featureName}/addAttributes`,
  addAttributes(
    {
      accordion: {
        tagName: "a",
        headerTagName: "h4",
        multipleOpens: false,
      },
    },
    (settings, { featureName, layoutType }) =>
      hasSupportLayout(settings, featureName, layoutType),
    { featureName, layoutType },
  ),
);

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

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    // Get group field value
    const getAccordionGroupFieldValue = ({ fieldName, defaultValue }) =>
      getSettingGroupFieldValue({
        fieldName,
        defaultValue,
        attributes,
        groupName: "accordion",
      });

    // Handle group field change
    const handleAccordionGroupFieldChange = (fieldName) =>
      handleChangeSettingGroupField({
        fieldName,
        groupName: "accordion",
        setAttributes,
        attributes,
      });

    // Get group field value
    const getAccordionResponsiveGroupFieldValue = ({
      fieldName,
      defaultValue,
    }) =>
      getResponsiveSettingGroupFieldValue({
        fieldName,
        defaultValue,
        attributes,
        groupName: "accordion",
        breakpoint,
      });

    // Handle group field change
    const handleAccordionResponsiveGroupFieldChange = (fieldName) =>
      handleChangeResponsiveSettingGroupField({
        fieldName,
        groupName: "accordion",
        setAttributes,
        attributes,
        breakpoint,
        allBreakpoints,
      });

    // Preview mode
    let previewMode = getAccordionGroupFieldValue({
      fieldName: "previewMode",
      defaultValue: "EDIT",
    });
    const handlePreviewModeChange =
      handleAccordionGroupFieldChange("previewMode");

    // Header tag name
    const headerTagName = getAccordionGroupFieldValue({
      fieldName: "headerTagName",
      defaultValue: "h4",
    });

    const { allColors } = useMultipleOriginColors();

    const titleColor = getAccordionGroupFieldValue({
      fieldName: "titleColor",
    });

    const iconColor = getAccordionGroupFieldValue({
      fieldName: "iconColor",
    });

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <BlockControls>
              <PreviewMode
                previewMode={previewMode}
                setPreviewMode={handlePreviewModeChange}
              />
            </BlockControls>
            <InspectorControls>
              <PanelBody
                title={__("Accordion settings", "content-blocks-builder")}
                initialOpen={true}
                className="boldblocks-panel-settings is-accordion-settings"
              >
                <VStack spacing={3}>
                  <ToggleGroupControl
                    name="headerTagName"
                    label={_x(
                      "Header tag",
                      "Header tag for the accordion title",
                      "content-blocks-builder",
                    )}
                    value={headerTagName}
                    onChange={handleAccordionGroupFieldChange("headerTagName")}
                    options={[
                      { value: "h1", label: "H1" },
                      { value: "h2", label: "H2" },
                      { value: "h3", label: "H3" },
                      { value: "h4", label: "H4" },
                      { value: "h5", label: "H5" },
                      { value: "h6", label: "H6" },
                      { value: "header", label: "header" },
                      { value: "div", label: "div" },
                    ]}
                    toggleOff={false}
                  />
                  <ToggleControl
                    label={_x(
                      "Allow multiple panels open",
                      "Allow multiple accordion items open at the same time",
                      "content-blocks-builder",
                    )}
                    checked={getAccordionGroupFieldValue({
                      fieldName: "multipleOpens",
                      defaultValue: false,
                    })}
                    onChange={handleAccordionGroupFieldChange("multipleOpens")}
                  />
                  <ResponsiveUnitControl
                    label={_x(
                      "Gap",
                      "The spacing between accordion items",
                      "content-blocks-builder",
                    )}
                    value={getAccordionResponsiveGroupFieldValue({
                      fieldName: "gap",
                    })}
                    onChange={handleAccordionResponsiveGroupFieldChange("gap")}
                  />
                  <GapControl
                    label={__("Padding", "content-blocks-buider")}
                    fields={[
                      {
                        name: "y",
                        label: __("Top, bottom", "content-blocks-builder"),
                      },
                      {
                        name: "x",
                        label: __("Left, right", "content-blocks-builder"),
                      },
                    ]}
                    values={getAccordionResponsiveGroupFieldValue({
                      fieldName: "padding",
                      defaultValue: {},
                    })}
                    onChange={handleAccordionResponsiveGroupFieldChange(
                      "padding",
                    )}
                    getInitialLinkedState={({ x, y }) => x === y}
                    help={__(
                      "Default value: 1rem 1.25rem",
                      "content-blocks-builder",
                    )}
                  />
                  <ToggleControl
                    label={__("Icon is on the left", "content-blocks-builder")}
                    checked={getAccordionGroupFieldValue({
                      fieldName: "isIconOnLeft",
                      defaultValue: false,
                    })}
                    onChange={handleAccordionGroupFieldChange("isIconOnLeft")}
                  />
                  <ColorGradientDropdown
                    enableAlpha={true}
                    settings={[
                      {
                        label: __("Title color", "content-blocks-builder"),
                        colorValue: titleColor?.value,
                        onColorChange: (value) => {
                          handleAccordionGroupFieldChange("titleColor")(
                            getColorObject(value, allColors),
                          );
                        },
                        colorValue: getColorObject(titleColor, allColors)
                          ?.value,
                      },
                      {
                        label: __("Icon color", "content-blocks-builder"),
                        onColorChange: (value) => {
                          handleAccordionGroupFieldChange("iconColor")(
                            getColorObject(value, allColors),
                          );
                        },
                        colorValue: getColorObject(iconColor, allColors)?.value,
                      },
                    ]}
                  />
                </VStack>
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

  const { boldblocks: { accordion = {} } = {} } = attributes;

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles;
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: accordion,
      getStyle: (value) => () => getAccordionStyles(value, true),
    });
  } else {
    featureStyles = getAccordionStyles(accordion, isDeprecatedDynamicStyle);
  }

  props = {
    ...props,
    ...getAccordionDataSet(
      getSettingFieldValue({
        fieldName: "accordion",
        attributes,
        defaultValue: {},
      }),
    ),
    className: clsx(props.className, "js-accordion-layout", {
      "is-accordion": attributes?.isBlockEdit,
      "is-icon-left": accordion?.isIconOnLeft,
    }),
    style: { ...props.style, ...featureStyles },
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
    (settings, { featureName, layoutType }) =>
      hasSupportLayout(settings, featureName, layoutType),
    { featureName, layoutType },
  ),
);
