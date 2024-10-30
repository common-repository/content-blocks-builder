/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { getSettingFieldValue } from "sdk/utils";
import { CodeEditor } from "../../components/code-editor";
import { hasSupportCSS } from "./index";
import { labels, getProLabel } from "../../utils/labels";

/**
 * Define feature name
 */
const featureName = "customCSS";

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!hasSupportCSS(props.name)) {
      return <BlockEdit {...props} />;
    }

    const { isSelected, attributes, clientId } = props;

    const customCSS = getSettingFieldValue({
      fieldName: "customCSS",
      attributes,
      defaultValue: {},
    });

    const { value = "" } = customCSS;

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <InspectorControls group="styles">
            <PanelBody
              title={getProLabel(labels.customCSS)}
              initialOpen={!!value}
              className="boldblocks-panel-settings"
            >
              {!!value ? (
                <CodeEditor
                  id={`cbb-css-${clientId}`}
                  value={value}
                  help={labels.customCSSHelp}
                />
              ) : (
                <p>{labels.customCSSHelp}</p>
              )}
            </PanelBody>
          </InspectorControls>
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
