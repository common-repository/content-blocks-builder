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
import { ToggleControl, PanelBody } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { AnimationGroupControl } from "sdk/components-premium";
import { getSettingFieldValue, useBlockFeature } from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { labels, getProLabel } from "../../utils/labels";
import { GroupItemToggle } from "../../components/group-item-toggle";

import "./animate-editor";

/**
 * Import styles
 */
import "./index.style.scss";

/**
 * Define feature name
 */
export const featureName = "animation";

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

    const { attributes } = props;
    const { shouldDisplayBlockControls } = useBlockFeature(props);

    const animations = getSettingFieldValue({
      fieldName: "animations",
      attributes,
      defaultValue: [],
    });

    const animateMultipleTimes = getSettingFieldValue({
      fieldName: "animateMultipleTimes",
      attributes,
      defaultValue: false,
    });

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <InspectorControls group="styles">
            <PanelBody
              title={getProLabel(labels.animation)}
              initialOpen={false}
            >
              <p>
                {__(
                  "Input animations, available only in the Premium version.",
                  "content-blocks-builder",
                )}
              </p>
              <AnimationGroupControl
                values={animations}
                GroupItemToggle={GroupItemToggle}
                isEditable={false}
              />
              {animations?.length > 0 && (
                <ToggleControl
                  label={__("Animate multiple times", "content-blocks-builder")}
                  checked={animateMultipleTimes}
                  disabled={true}
                />
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
