/**
 * External dependencies
 */
import clsx from "clsx";
import { isObject, isString, isEmpty, isUndefined } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  ToggleControl,
  SelectControl,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { hasBlockSupport } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { ToggleGroupCustomControl } from "sdk/components";
import {
  getBreakpointType,
  getAllBreakpoints,
  handleChangeResponsiveSettingGroupField,
  getResponsiveSettingGroupFieldValue,
  handleChangeSettingGroupField,
  getSettingGroupFieldValue,
  isUnsetValue,
  addAttributes,
  addEditProps,
  usePropsStyle,
} from "sdk/utils";
import { boldblocksHasSupport, isPremium } from "../../utils";
import { getProLabel, labels } from "../../utils/labels";
import { LabelHelpControl } from "../../components/label-help-control";
import { HelpLink } from "../../components/help-link";

/**
 * Define feature name
 */
const featureName = "sticky";

/**
 * If the current block support sticky
 *
 * @param {String} name
 * @returns {Boolean}
 */
const hasSupportSticky = (name) =>
  boldblocksHasSupport(name, featureName) || name === "core/template-part";

/**
 * Get styles for the feature.
 *
 * @param {Object} sticky
 */
function getFeatureStyle(sticky) {
  let style = {};
  if (!sticky?.enable) {
    return style;
  }

  const offset = sticky?.offset;

  if (isObject(offset) && !isEmpty(offset)) {
    Object.keys(offset).forEach((breakpoint) => {
      const { value, inherit } = offset[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: { value: inheritValue } = {} } = offset[inherit] ?? {};
          if (!isUnsetValue(inheritValue)) {
            style = {
              ...style,
              [`--bb--sticky-offset--${breakpoint}`]: `var(--bb--sticky-offset--${inherit})`,
            };
          }
        }
      } else {
        if (value) {
          const { value: cssValue } = value ?? {};
          if (!isUnsetValue(cssValue)) {
            style = {
              ...style,
              [`--bb--sticky-offset--${breakpoint}`]: cssValue + "",
            };
          }
        }
      }
    });
  }

  return style;
}

/**
 * Add custom attributes.
 *
 * @param {Object} settings Settings for the block.
 * @return {Object} settings Modified settings.
 */
// pretter-ignore
addFilter(
  "blocks.registerBlockType",
  `boldblocks/${featureName}/addAttributes`,
  addAttributes({}, (settings) => settings.name === "core/template-part", {
    featureName,
  }),
);

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!hasSupportSticky(props.name)) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes, isSelected } = props;

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    // Get group field value
    const getStickyGroupFieldValue = ({ fieldName, defaultValue }) =>
      getSettingGroupFieldValue({
        fieldName,
        defaultValue,
        attributes,
        groupName: "sticky",
      });

    // Handle group field change
    const handleStickyGroupFieldChange = (fieldName) =>
      handleChangeSettingGroupField({
        fieldName,
        groupName: "sticky",
        setAttributes,
        attributes,
      });

    // Enable
    const enableSticky = getStickyGroupFieldValue({
      fieldName: "enable",
      defaultValue: false,
    });

    const isFixed = getStickyGroupFieldValue({
      fieldName: "isFixed",
      defaultValue: false,
    });

    const isDetectingStuck = getStickyGroupFieldValue({
      fieldName: "isDetectingStuck",
      defaultValue: false,
    });

    const isStickOnScrollingUp = getStickyGroupFieldValue({
      fieldName: "isStickOnScrollingUp",
      defaultValue: false,
    });

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <InspectorControls>
              <PanelBody
                title={labels.sticky}
                initialOpen={enableSticky}
                className="boldblocks-panel-settings is-sticky-settings"
              >
                <VStack spacing={3}>
                  <ToggleControl
                    label={__("Enable sticky", "content-blocks-builder")}
                    checked={enableSticky}
                    onChange={handleStickyGroupFieldChange("enable")}
                    help={__(
                      "Turn this block into a sticky block.",
                      "content-blocks-builder",
                    )}
                  />
                  {enableSticky && (
                    <>
                      <ToggleControl
                        label={__(
                          "Always stick to the viewport",
                          "content-blocks-builder",
                        )}
                        checked={isFixed}
                        onChange={handleStickyGroupFieldChange("isFixed")}
                        help={
                          <>
                            {__(
                              "Use position fixed instead of position sticky.",
                              "content-blocks-builder",
                            )}{" "}
                            <HelpLink
                              href="https://developer.mozilla.org/en-US/docs/Web/CSS/position"
                              label={__(
                                "Learn CSS position.",
                                "content-blocks-builder",
                              )}
                            />
                          </>
                        }
                        disabled={isDetectingStuck || isStickOnScrollingUp}
                      />
                      {isFixed && (
                        <>
                          <ToggleControl
                            label={__(
                              "Prevent layout shifted when the block is fixed",
                              "content-blocks-builder",
                            )}
                            checked={getStickyGroupFieldValue({
                              fieldName: "isInFlow",
                              defaultValue: false,
                            })}
                            onChange={handleStickyGroupFieldChange("isInFlow")}
                          />
                          <ToggleControl
                            label={__(
                              "Detecting the page's scroll state",
                              "content-blocks-builder",
                            )}
                            checked={getStickyGroupFieldValue({
                              fieldName: "isDetectingScroll",
                              defaultValue: false,
                            })}
                            onChange={handleStickyGroupFieldChange(
                              "isDetectingScroll",
                            )}
                            help={__(
                              "Add the 'has-scrolled' CSS class to the block when the page has scrolled.",
                              "content-blocks-builder",
                            )}
                          />
                        </>
                      )}
                      {!isFixed && (
                        <>
                          <ToggleControl
                            label={getProLabel(
                              __(
                                "Detecting the stuck state",
                                "content-blocks-builder",
                              ),
                            )}
                            checked={isDetectingStuck && !isStickOnScrollingUp}
                            onChange={handleStickyGroupFieldChange(
                              "isDetectingStuck",
                            )}
                            help={__(
                              "Add the 'is-stuck' CSS class to the block when it becomes stuck",
                              "content-blocks-builder",
                            )}
                            disabled={!isPremium || isStickOnScrollingUp}
                          />
                          <ToggleControl
                            label={getProLabel(
                              __(
                                "Stick to the top when scrolling up",
                                "content-blocks-builder",
                              ),
                            )}
                            checked={isStickOnScrollingUp}
                            onChange={handleStickyGroupFieldChange(
                              "isStickOnScrollingUp",
                            )}
                            disabled={!isPremium}
                            help={__(
                              "Use the three CSS classes: 'is-stuck', 'is-unstuck', and 'is-transition' to style the block based on its state",
                              "content-blocks-builder",
                            )}
                          />
                        </>
                      )}
                      {!isStickOnScrollingUp && (
                        <>
                          <SelectControl
                            label={__("Stick to", "content-blocks-builder")}
                            value={getStickyGroupFieldValue({
                              fieldName: "stickTo",
                              defaultValue: "top",
                            })}
                            options={[
                              {
                                value: "top",
                                label: __("Top", "content-blocks-builder"),
                              },
                              {
                                value: "bottom",
                                label: __("Bottom", "content-blocks-builder"),
                              },
                            ]}
                            onChange={handleStickyGroupFieldChange("stickTo")}
                            help={__(
                              "Only top/bottom are supported here, please set left, right in the Custom CSS setting if necessary.",
                            )}
                            disabled={isStickOnScrollingUp}
                          />
                          <ToggleGroupCustomControl
                            name="offset"
                            label={__("Offset value", "content-blocks-builder")}
                            value={getResponsiveSettingGroupFieldValue({
                              fieldName: "offset",
                              groupName: "sticky",
                              attributes,
                              breakpoint,
                            })}
                            onChange={handleChangeResponsiveSettingGroupField({
                              fieldName: "offset",
                              groupName: "sticky",
                              setAttributes,
                              attributes,
                              breakpoint,
                              allBreakpoints,
                            })}
                            options={[
                              {
                                value: "0",
                                label: "0",
                              },
                              {
                                value: "auto",
                                label: labels.auto,
                              },
                              {
                                value: "custom",
                                label: labels.custom,
                              },
                            ]}
                            isResponsive={true}
                          />
                        </>
                      )}
                      {!isFixed && !isStickOnScrollingUp && (
                        <LabelHelpControl
                          label={__(
                            "Troubleshooting",
                            "content-blocks-builder",
                          )}
                          helpControls={
                            <>
                              <ul
                                style={{
                                  listStyle: "disc",
                                  listStylePosition: "outside",
                                  paddingLeft: "15px",
                                }}
                              >
                                <li>
                                  {__(
                                    'You must set a value other than "auto" for at least one of following properties: top, right, bottom, left.',
                                  )}
                                </li>
                                <li>
                                  {__(
                                    'Sticky will most probably not work if any parent of the element has a value of overflow other than "visible".',
                                  )}
                                </li>
                                <li>
                                  {__(
                                    "Sticky will may not work correctly if any parent of the element has a set height.",
                                  )}
                                </li>
                                <li>
                                  <HelpLink
                                    href="https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky_positioning"
                                    label={__(
                                      "Learn position sticky",
                                      "content-blocks-builder",
                                    )}
                                  />
                                </li>
                              </ul>
                            </>
                          }
                          isAtTop={false}
                        />
                      )}
                    </>
                  )}
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
  if (!hasSupportSticky(blockType.name)) {
    return props;
  }

  const { boldblocks: { sticky = {} } = {} } = attributes;

  if (sticky?.enable) {
    const stickTo = sticky?.stickTo ?? "top";
    const isFixed = sticky?.isFixed && !sticky?.isStickOnScrollingUp;

    props.className = clsx(props.className, "is-sticky-block", {
      [`is-stick-to-${stickTo}`]: stickTo,
      "is-fixed": isFixed,
      "is-in-flow": isFixed && sticky?.isInFlow,
      "is-detecting-scroll": isFixed && sticky?.isDetectingScroll,
      "is-detecting-stuck":
        sticky?.isDetectingStuck && !sticky?.isStickOnScrollingUp,
      "is-sticky-on-scrollup": sticky?.isStickOnScrollingUp,
    });
  }

  const isDeprecatedDynamicStyle = hasBlockSupport(
    blockType,
    "CBBDeprecatedDynamicStyleV1",
  );

  let featureStyles = {};
  if (attributes?.isBlockEdit) {
    featureStyles = usePropsStyle({
      value: sticky,
      getStyle: (value) => () => getFeatureStyle(value),
    });
  } else {
    if (isDeprecatedDynamicStyle) {
      featureStyles = getFeatureStyle(sticky);
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
  addEditProps(addSaveProps, (settings) => hasSupportSticky(settings.name), {
    featureName,
  }),
);
