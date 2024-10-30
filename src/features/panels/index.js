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
import {
  Slot,
  __experimentalToolsPanel as ToolsPanel,
} from "@wordpress/components";
import { hasBlockSupport, getBlockSupport } from "@wordpress/blocks";
import { useMemo } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { useBlockFeature } from "sdk/utils";

/**
 * Debugging
 */
// import { useDebugInformation } from "../../debug";

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!hasBlockSupport(props.name, "cbb")) {
      return <BlockEdit {...props} />;
    }

    // let start = performance.now();
    const {
      hasDimentions = false,
      hasBorder = false,
      hasBackground = false,
      hasOthers = false,
    } = useMemo(() => {
      const cbbFeatures = getBlockSupport(props.name, "boldblocks");
      return {
        hasDimentions:
          cbbFeatures?.width || cbbFeatures?.height || cbbFeatures?.spacing,
        hasBorder: cbbFeatures?.border,
        hasBackground: cbbFeatures?.background || cbbFeatures?.overlay,
        hasOthers:
          cbbFeatures?.boxShadow ||
          cbbFeatures?.transform ||
          cbbFeatures?.visibility,
      };
    }, [props.name]);

    // Debugging
    // useDebugInformation("Panels", props.attributes);

    const { shouldDisplayBlockControls } = useBlockFeature(props);

    const { setAttributes, attributes: { boldblocks = {} } = {} } = props;
    // console.log(
    //   `Task took ${(performance.now() - start).toFixed(
    //     3
    //   )}ms to show ToolsPanels`
    // );

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <>
            <InspectorControls group="styles">
              {hasDimentions && (
                <ToolsPanel
                  label={__("Responsive Dimensions", "content-blocks-builder")}
                  panelId="cbb-panel-dimensions"
                  resetAll={() => {
                    setAttributes({
                      boldblocks: {
                        ...boldblocks,
                        width: {},
                        height: {},
                        aspectRatio: {},
                        spacing: {},
                      },
                    });
                  }}
                >
                  <Slot name="cbb-panel-dimensions" />
                </ToolsPanel>
              )}
              {hasBorder && (
                <ToolsPanel
                  label={__("Responsive Border", "content-blocks-builder")}
                  panelId="cbb-panel-border"
                  resetAll={() => {
                    setAttributes({
                      boldblocks: {
                        ...boldblocks,
                        border: {},
                        borderRadius: {},
                        enableEllipticalRadius: false,
                      },
                    });
                  }}
                >
                  <Slot name="cbb-panel-border" />
                </ToolsPanel>
              )}
              {hasBackground && (
                <ToolsPanel
                  label={__(
                    "Background Media & Overlay",
                    "content-blocks-builder"
                  )}
                  panelId="cbb-panel-background"
                  resetAll={() => {
                    setAttributes({
                      boldblocks: {
                        ...boldblocks,
                        background: {},
                        overlay: {},
                      },
                    });
                  }}
                >
                  <Slot name="cbb-panel-background" />
                </ToolsPanel>
              )}
              {hasOthers && (
                <ToolsPanel
                  label={__(
                    "Shadow, Transform, Visibility",
                    "content-blocks-builder"
                  )}
                  panelId="cbb-panel-others"
                  resetAll={() => {
                    setAttributes({
                      boldblocks: {
                        ...boldblocks,
                        shadows: [],
                        shadowSlug: "",
                        transform: {},
                        transformOrigin: {},
                        visibility: {},
                      },
                    });
                  }}
                >
                  <Slot name="cbb-panel-others" />
                </ToolsPanel>
              )}
            </InspectorControls>
          </>
        )}
      </>
    );
  };
}, "withInspectorControls");
addFilter(
  "editor.BlockEdit",
  `boldblocks/CBBPanels/withInspectorControls`,
  withInspectorControls
);
