/**
 * External dependencies
 */
import { isArray, isEmpty, isObject } from "lodash";

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
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { ToggleGroupControl } from "sdk/components";
import {
  getSettingGroupFieldValue,
  handleChangeSettingGroupField,
  isUnsetValue,
  addEditProps,
  usePropsStyle,
} from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { labels } from "../../utils/labels";

/**
 * Import styles
 */
import "./index.style.scss";

/**
 * Define feature name
 */
const featureName = "visibility";

const sortHidden = (b1, b2) => {
  if (b1 === "sm" || b2 === "lg") {
    return 0;
  } else {
    if (b1 === "lg" || b2 === "sm") {
      return -1;
    }
  }

  return 1;
};

/**
 * Get styles for the feature.
 *
 * @param {Object} visibility
 * @param {Object}
 */
function getFeatureStyle(visibility, isDeprecatedDynamicStyle = false) {
  let style = {};

  if (
    isUnsetValue(visibility) ||
    isEmpty(visibility) ||
    !isObject(visibility)
  ) {
    return style;
  }

  const { zIndex, overflow, hidden = [] } = visibility;

  if (!isUnsetValue(zIndex) && Number.isInteger(parseInt(zIndex))) {
    style = { ...style, "--bb--z-index": zIndex + "" };
  }

  if (!isUnsetValue(overflow)) {
    style = { ...style, "--bb--overflow": overflow };
  }

  if (isDeprecatedDynamicStyle && isArray(hidden) && hidden.length) {
    const hiddenVariables = hidden
      .sort(sortHidden)
      .reduce(
        (prev, current) => ({ ...prev, [`--bb--hidden--${current}`]: "1" }),
        {},
      );

    style = {
      ...style,
      ...hiddenVariables,
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

    const { attributes, setAttributes, isSelected } = props;
    const { boldblocks = {} } = attributes;
    const { visibility: { zIndex, overflow, hidden = [] } = {} } = boldblocks;

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeSettingGroupField({
        fieldName,
        setAttributes,
        attributes,
        groupName: "visibility",
      })(newValue);
    };

    const getFeatureAttributeValue = (fieldName, defaultValue = "") =>
      getSettingGroupFieldValue({
        fieldName,
        attributes,
        defaultValue,
        groupName: "visibility",
      });

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <Fill name="cbb-panel-others">
            <ToolsPanelItem
              label={labels.visibility}
              panelId="cbb-panel-others"
              hasValue={() =>
                !isUnsetValue(zIndex) ||
                !isUnsetValue(overflow) ||
                !!hidden?.length
              }
              onDeselect={() => {
                setAttributes({
                  boldblocks: { ...boldblocks, visibility: {} },
                });
              }}
            >
              <VStack spacing={3}>
                <ToggleGroupControl
                  label={__("Hide in", "content-blocks-builder")}
                  isMultiple={true}
                  options={[
                    {
                      value: "sm",
                      label: __("Mobile", "content-blocks-builder"),
                    },
                    {
                      value: "md",
                      label: __("Tablet", "content-blocks-builder"),
                    },
                    {
                      value: "lg",
                      label: __("Desktop", "content-blocks-builder"),
                    },
                  ]}
                  value={getFeatureAttributeValue("hidden", [])}
                  onChange={onFeatureChange("hidden")}
                />
                <ToggleGroupControl
                  label={__("Overflow", "content-blocks-builder")}
                  options={[
                    { value: "hidden", label: "hidden" },
                    { value: "visible", label: "visible" },
                    { value: "scroll", label: "scroll" },
                    { value: "auto", label: "auto" },
                  ]}
                  value={getFeatureAttributeValue("overflow", "")}
                  onChange={onFeatureChange("overflow")}
                />
                <TextControl
                  label={__("Z Index", "content-blocks-builder")}
                  value={getFeatureAttributeValue("zIndex")}
                  type="number"
                  step={1}
                  onChange={onFeatureChange("zIndex")}
                  autoComplete="off"
                  help={__(
                    "Entering a z-index value will change the CSS position attribute of the block to relative",
                    "content-blocks-builder",
                  )}
                />
              </VStack>
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

  const { boldblocks: { visibility } = {} } = attributes;

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles;
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: visibility,
      getStyle: (value) => () => getFeatureStyle(value, true),
    });
  } else {
    featureStyles = getFeatureStyle(visibility, isDeprecatedDynamicStyle);
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
