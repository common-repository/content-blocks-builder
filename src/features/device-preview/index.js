/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { BlockControls } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { PreviewToolbar } from "sdk/components";
import { boldblocksHasSupport } from "../../utils";

/**
 * Define feature name
 */
const featureName = "devicePreview";

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

    return (
      <>
        <BlockEdit {...props} />
        {props?.isSelected && (
          <BlockControls>
            <PreviewToolbar />
          </BlockControls>
        )}
      </>
    );
  };
}, "withInspectorControls");
addFilter(
  "editor.BlockEdit",
  `boldblocks/${featureName}/withInspectorControls`,
  withInspectorControls
);
