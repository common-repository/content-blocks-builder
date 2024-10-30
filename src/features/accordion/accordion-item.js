/**
 * External dependencies
 */
import { isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { __, _x } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls, RichText } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import {
  PanelBody,
  __experimentalVStack as VStack,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { ToggleGroupControl } from "sdk/components";
import {
  getSettingFieldValue,
  handleChangeSettingGroupField,
  getSettingGroupFieldValue,
  useUniqueId,
  handleChangeMultipleSettingField,
  addAttributes,
} from "sdk/utils";
import { hasSupportLayout } from "../../utils";
import { getAccordionItemDataSet } from "./utils";

/**
 * Define feature name
 */
const layoutType = "layoutType";
const featureName = "accordionItem";

// pretter-ignore
addFilter(
  "blocks.registerBlockType",
  `boldblocks/${featureName}/addAttributes`,
  addAttributes(
    {
      accordionItem: {
        id: "",
        title: "",
        headerTagName: "h4",
        tagName: "a",
        initialState: "hidden",
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

    // Get group field value
    const getAccordionGroupFieldValue = ({ fieldName, defaultValue }) =>
      getSettingGroupFieldValue({
        fieldName,
        defaultValue,
        attributes,
        groupName: "accordionItem",
      });

    // Handle group field change
    const handleAccordionGroupFieldChange = (fieldName) =>
      handleChangeSettingGroupField({
        fieldName,
        groupName: "accordionItem",
        setAttributes,
        attributes,
      });

    const initialState = getAccordionGroupFieldValue({
      fieldName: "initialState",
      defaultValue: "hidden",
    });

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <InspectorControls>
              <PanelBody
                title={__("Accordion item settings", "content-blocks-builder")}
                initialOpen={true}
                className="boldblocks-panel-settings is-accordion-settings"
              >
                <VStack spacing={3}>
                  <ToggleGroupControl
                    name="initialState"
                    label={_x(
                      "Initial state",
                      "The initial state for the accordion item",
                    )}
                    value={initialState}
                    onChange={handleAccordionGroupFieldChange("initialState")}
                    options={[
                      {
                        value: "hidden",
                        label: _x(
                          "Hidden",
                          "The hidden state for an accordion item",
                        ),
                      },
                      {
                        value: "shown",
                        label: _x(
                          "Shown",
                          "The shown state for an accordion item",
                        ),
                      },
                    ]}
                    toggleOff={false}
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

addFilter(
  "boldblocks.edit.blockInner",
  `boldblocks/${featureName}/editBlockInner`,
  (content, props) => {
    if (!hasSupportLayout(props.name, featureName, layoutType)) {
      return content;
    }

    const {
      attributes,
      attributes: { boldblocks: { accordionItem = {} } = {} } = {},
      setAttributes,
      clientId,
      context: {
        "boldblocks/boldblocks": {
          accordion: {
            tagName: contextTagName = "a",
            headerTagName: contextHeaderTagName = "h2",
          } = {},
        } = {},
      } = {},
    } = props;

    // Get group field value
    const getAccordionGroupFieldValue = ({ fieldName, defaultValue }) =>
      getSettingGroupFieldValue({
        fieldName,
        defaultValue,
        attributes,
        groupName: "accordionItem",
      });

    // Handle group field change
    const handleAccordionGroupFieldChange = (fieldName) =>
      handleChangeSettingGroupField({
        fieldName,
        groupName: "accordionItem",
        setAttributes,
        attributes,
      });

    const title = getAccordionGroupFieldValue({
      fieldName: "title",
      defaultValue: "",
    });

    let HeaderTagName = getAccordionGroupFieldValue({
      fieldName: "headerTagName",
      defaultValue: contextHeaderTagName,
    });

    // Id
    const id = getAccordionGroupFieldValue({
      fieldName: "id",
      defaultValue: "",
    });

    const maybeNewId = useUniqueId(id, `${clientId}-accordion`, null);

    // Update uniqueId, context values
    useEffect(() => {
      let initialFieldObject = {};
      if (accordionItem?.tagName !== contextTagName) {
        initialFieldObject = { ...initialFieldObject, tagName: contextTagName };
      }

      if (accordionItem?.headerTagName !== contextHeaderTagName) {
        initialFieldObject = {
          ...initialFieldObject,
          headerTagName: contextHeaderTagName,
        };
      }

      if (maybeNewId && accordionItem?.id !== maybeNewId) {
        initialFieldObject = {
          ...initialFieldObject,
          id: maybeNewId,
        };
      }

      if (!isEmpty(initialFieldObject)) {
        handleChangeMultipleSettingField({ setAttributes, attributes })({
          accordionItem: { ...accordionItem, ...initialFieldObject },
        });
      }
    }, [maybeNewId, contextTagName, contextHeaderTagName]);

    return (
      <>
        {content}
        <HeaderTagName
          className="accordion-header"
          {...getAccordionItemDataSet(
            getSettingFieldValue({
              fieldName: "accordionItem",
              defaultValue: {},
              attributes,
            }),
          )}
        >
          <a className="accordion-link" tabIndex="0">
            <RichText
              value={title}
              tagName="span"
              onChange={handleAccordionGroupFieldChange("title")}
              allowedFormats={["core/bold", "core/italic"]}
              placeholder={_x(
                "Accordion item title...",
                "Input accordion title",
                "content-blocks-builder",
              )}
              className="title"
              multiline={false}
            />
          </a>
        </HeaderTagName>
      </>
    );
  },
);

addFilter(
  "boldblocks.save.blockInner",
  `boldblocks/${featureName}/saveBlockInner`,
  (content, props) => {
    if (!hasSupportLayout(props.name, featureName, layoutType)) {
      return content;
    }

    const { attributes, supports = {} } = props;

    // Get group field value
    const getAccordionGroupFieldValue = ({ fieldName, defaultValue }) =>
      getSettingGroupFieldValue({
        fieldName,
        defaultValue,
        attributes,
        groupName: "accordionItem",
      });

    const title = getAccordionGroupFieldValue({
      fieldName: "title",
      defaultValue: "",
    });

    const TagName = getAccordionGroupFieldValue({
      fieldName: "tagName",
      defaultValue: "button",
    });

    const HeaderTagName = getAccordionGroupFieldValue({
      fieldName: "headerTagName",
      defaultValue: "h2",
    });

    let href = "#";

    const isDeprecatedV1 = supports?.BoldBlocksDeprecatedAccordionV1;

    if (!isDeprecatedV1) {
      const id = getAccordionGroupFieldValue({
        fieldName: "id",
        defaultValue: "",
      });

      href = `#c-${id}`;
    }

    return (
      <HeaderTagName
        className="accordion-header"
        {...getAccordionItemDataSet(
          getSettingFieldValue({
            fieldName: "accordionItem",
            defaultValue: {},
            attributes,
          }),
          isDeprecatedV1,
        )}
      >
        {isDeprecatedV1 ? (
          <RichText.Content
            value={title}
            tagName={TagName}
            className="accordion-link"
            href={href}
          />
        ) : (
          <TagName className="accordion-link" href={href}>
            <RichText.Content value={title} tagName="span" className="title" />
          </TagName>
        )}
      </HeaderTagName>
    );
  },
);
