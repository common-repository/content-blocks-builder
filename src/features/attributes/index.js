/**
 * External dependencies
 */
import { escape as lodashEscape, isObject, uniqBy } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, Fill, BaseControl } from "@wordpress/components";
import { useEffect } from "@wordpress/element";

/**
 * Internal dependencies
 */
import {
  getSettingFieldValue,
  handleChangeSettingField,
  isUnsetValue,
  getColorCSSValue,
  addEditProps,
  usePropsStyle,
} from "sdk/utils";
import { CustomAttributes } from "../../components/custom-attributes";
import { boldblocksHasSupport, isJSONString } from "../../utils";
import { labels } from "../../utils/labels";

/**
 * Define feature name
 */
const featureName = "customAttributes";

/**
 * Build attritubes for the feature.
 *
 * @param {Object} boldblocks
 * @param {Object}
 */
function buildFeatureAttributes(boldblocks) {
  let dataset = {};
  let style = {};
  const { blockAttributes = [], customAttributes = [] } = boldblocks;

  if (!blockAttributes.length && !customAttributes.length) {
    return dataset;
  }

  const attributes = uniqBy(blockAttributes.concat(customAttributes), "name");

  const nameRegex = new RegExp(
    "^[a-zA-Z]([a-zA-Z0-9])*([-]([a-zA-Z][a-zA-Z0-9]*)*)*",
  );

  attributes.forEach(({ attributeType = "data", name, type, value }) => {
    if (type === "boolean") {
      if (["data", "aria", "var", "custom"].includes(attributeType)) {
        value = isUnsetValue(value) ? false : value;
      } else {
        if (value) {
          value = ""; // Empty is a valid boolean html attribute
        } else {
          name = ""; // Remove false attribute
        }
      }
    } else if (type === "json") {
      if (!isJSONString(value)) {
        name = ""; // Remove this attribute
      }
    } else if (type === "color" || type === "background") {
      value = getColorCSSValue(value);
    }

    if (nameRegex.test(name)) {
      const attrValue = isObject(value)
        ? JSON.stringify(value)
        : lodashEscape(value);

      if (attributeType === "var") {
        style[`--bb-attr--${name}`] = attrValue;
      } else {
        if (attributeType !== "custom") {
          dataset[`${attributeType}-${name}`] = attrValue;
        } else {
          dataset[name] = attrValue;
        }
      }
    }
  });

  return { dataset, style };
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

    const blockAttributes = boldblocksHasSupport(props.name, "blockAttributes");
    if (
      !blockAttributes?.attributes?.length &&
      !blockAttributes?.enableCustomAttributes
    ) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes, isSelected } = props;

    const customAttributes = getSettingFieldValue({
      fieldName: "customAttributes",
      attributes,
      defaultValue: [],
    });

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeSettingField({
        fieldName,
        setAttributes,
        attributes,
      })(newValue);
    };

    let blockAttritubesValue = [];
    if (!!blockAttributes?.attributes?.length) {
      const savedAttritubesValue = getSettingFieldValue({
        fieldName: "blockAttributes",
        attributes,
        defaultValue: [],
      });

      // Pre-defined attributes changed.
      let attributeChanged = false;

      blockAttritubesValue = blockAttributes.attributes.map((item, index) => {
        const itemValue = savedAttritubesValue[index] ?? false;
        if (!itemValue) {
          attributeChanged = true;
          return item;
        } else {
          if (itemValue?.name !== item?.name) {
            attributeChanged = true;
            return item;
          } else {
            if (
              itemValue?.attributeType !== item?.attributeType ||
              itemValue?.type !== item?.type
            ) {
              attributeChanged = true;
            }

            return {
              ...itemValue,
              attributeType: item?.attributeType,
              type: item?.type,
            };
          }
        }
      });

      useEffect(() => {
        if (
          attributeChanged ||
          savedAttritubesValue.length !== blockAttritubesValue.length
        ) {
          // Save new attributes
          onFeatureChange("blockAttributes")(blockAttritubesValue);
        }
      }, [
        attributeChanged,
        savedAttritubesValue.length,
        blockAttritubesValue.length,
      ]);
    }

    const settingsControl = (
      <>
        {!!blockAttributes?.attributes?.length && (
          <CustomAttributes
            isEditable={false}
            values={blockAttritubesValue}
            onChange={onFeatureChange("blockAttributes")}
          />
        )}
        {blockAttributes?.enableCustomAttributes && (
          <CustomAttributes
            values={customAttributes}
            onChange={onFeatureChange("customAttributes")}
            disableLabel={true}
            startIndex={blockAttributes?.attributes?.length ?? 0}
          />
        )}
      </>
    );

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <Fill name="cbb-block-toolbar">
              <div className="block-custom-attributes">
                <BaseControl label={labels.attributes} />
                {settingsControl}
              </div>
            </Fill>
            <InspectorControls>
              <PanelBody
                title={labels.attributes}
                initialOpen={
                  !!blockAttributes?.attributes?.length ||
                  !!customAttributes?.length
                }
                className="boldblocks-panel-settings"
              >
                {settingsControl}
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
  if (!boldblocksHasSupport(blockType, featureName)) {
    return props;
  }

  const { boldblocks = {} } = attributes;

  let featureAttributes;
  if (attributes?.isBlockEdit) {
    featureAttributes = usePropsStyle({
      value: boldblocks,
      getStyle: (value) => () => buildFeatureAttributes(value),
    });
  } else {
    featureAttributes = buildFeatureAttributes(boldblocks);
  }

  props = {
    ...props,
    ...(featureAttributes?.dataset ?? {}),
    style: { ...(props?.style ?? {}), ...(featureAttributes?.style ?? {}) },
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
