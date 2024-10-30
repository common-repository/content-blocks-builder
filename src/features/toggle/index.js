/**
 * External dependencies
 */
import clsx from "clsx";
import { noop } from "lodash";

/**
 * WordPress dependencies
 */
import { _x, __ } from "@wordpress/i18n";
import { addFilter, applyFilters } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  ToggleControl,
  __experimentalVStack as VStack,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
  ToggleGroupControl,
  ToggleGroupCustomControl,
  ColorGradientDropdown,
} from "sdk/components";
import {
  getBreakpointType,
  getAllBreakpoints,
  handleChangeSettingGroupField,
  getSettingFieldValue,
  getSettingGroupFieldValue,
  getValueByBreakpointFromResponsiveValue,
  buildResponsiveSettingValue,
  useMultipleOriginColors,
  getColorObject,
  useUniqueId,
  addEditProps,
} from "sdk/utils";
import { ToggleGroupStyled } from "./styles/index.js";
import { boldblocksHasSupport, isPremium } from "../../utils";
import { getProLabel, labels } from "../../utils/labels.js";
import {
  getToggleDataSet,
  refinePosition,
  COLLAPSE,
  MODAL,
  OFFCANVAS,
  POPOVER,
} from "./utils";

// Styles.
import "./toggle.scss";

/**
 * Define feature name
 */
const featureName = "toggle";

/**
 * Labels
 */
const topLabel = __("Top", "content-blocks-builder");
const rightLabel = __("Right", "content-blocks-builder");
const bottomLabel = __("Bottom", "content-blocks-builder");
const leftLabel = __("Left", "content-blocks-builder");

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

    const { attributes, setAttributes, isSelected, clientId } = props;

    // Get group field value
    const getToggleGroupFieldValue = ({ fieldName, defaultValue }) =>
      getSettingGroupFieldValue({
        fieldName,
        defaultValue,
        attributes,
        groupName: "toggle",
      });

    // Handle group field change
    const handleToggleGroupFieldChange = (fieldName) =>
      handleChangeSettingGroupField({
        fieldName,
        groupName: "toggle",
        setAttributes,
        attributes,
      });

    const enableToggle = getToggleGroupFieldValue({
      fieldName: "enable",
      defaultValue: false,
    });

    const type = getToggleGroupFieldValue({
      fieldName: "type",
      defaultValue: COLLAPSE,
    });

    const typeOptions = [
      {
        value: COLLAPSE,
        label: __("Collapse", "content-blocks-builder"),
      },
      {
        value: MODAL,
        label: __("Modal", "content-blocks-builder"),
      },
      {
        value: OFFCANVAS,
        label: __("Off-canvas", "content-blocks-builder"),
      },
      {
        value: POPOVER,
        label: __("Popover", "content-blocks-builder"),
      },
    ];

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    // Get group field value
    const getToggleResponsiveGroupFieldValue = ({
      fieldName,
      defaultValue,
    }) => {
      const fieldValue = getToggleGroupFieldValue({
        fieldName,
      });

      return getValueByBreakpointFromResponsiveValue({
        fieldValue,
        breakpoint,
        defaultValue,
      });
    };

    // Handle group field change
    const handleToggleResponsiveGroupFieldChange =
      (fieldName) => (newValue) => {
        const fieldValue = getToggleGroupFieldValue({ fieldName });
        const responsiveValue = buildResponsiveSettingValue({
          breakpoint,
          allBreakpoints,
          newValue,
          fieldValue,
        });

        handleToggleGroupFieldChange(fieldName)(responsiveValue);
      };

    const { allColors } = useMultipleOriginColors();

    const closeButtonColor = getToggleGroupFieldValue({
      fieldName: "closeButtonColor",
    });

    const hideCloseButton = getToggleGroupFieldValue({
      fieldName: "hideCloseButton",
      defaultValue: false,
    });

    const initialState = getToggleGroupFieldValue({
      fieldName: "initialState",
      defaultValue: "hidden",
    });

    const stateOptions = [
      {
        value: "hidden",
        label: _x(
          "Hidden",
          "The hidden state for the toggle block",
          "content-blocks-builder",
        ),
      },
      {
        value: "shown",
        label: _x(
          "Shown",
          "The shown state for the toggle block",
          "content-blocks-builder",
        ),
      },
    ];

    let stateHelp;

    if ([MODAL, OFFCANVAS].includes(type)) {
      stateOptions.push({
        value: "custom",
        label: getProLabel(labels.custom),
        disabled: !isPremium,
      });

      stateHelp = !isPremium
        ? __(
            "With the pro version, you can set the delay time for the pop-up to appear and save the closed state. This is very useful for displaying information like the cookie acceptance policy popup or promotional content etc.",
            "content-blocks-builder",
          )
        : initialState === "custom"
        ? "By choosing this option, users will be able to set a delay time before the popup appears and save the closed state of the modal so it does not appear next time. This is very useful for displaying information like the cookie acceptance policy popup or promotional content etc."
        : "";
    }

    // Add an unique Id if enable toggle
    useUniqueId(
      getToggleGroupFieldValue({
        fieldName: "uniqueId",
      }),
      `${clientId}-toggle`,
      handleToggleGroupFieldChange("uniqueId"),
      enableToggle,
    );

    // Label
    const placementLabel = _x(
      "Placement",
      "Modal position",
      "content-blocks-builder",
    );

    // Value
    let placement = "";

    // Change handler
    let onPlacementChange = noop;

    // Options
    let placementOptions = [];

    // CSS class
    let placementClass = "is-modal-position";

    if (type === MODAL) {
      placement = getToggleResponsiveGroupFieldValue({
        fieldName: "modalPosition",
        defaultValue: "center",
      });

      // For lagacy value
      placement = refinePosition(placement);

      onPlacementChange =
        handleToggleResponsiveGroupFieldChange("modalPosition");

      placementOptions = [
        {
          value: "top-start",
          label: __("Top left", "content-blocks-builder"),
        },
        {
          value: "top",
          label: topLabel,
        },
        {
          value: "top-end",
          label: __("Top right", "content-blocks-builder"),
        },
        {
          value: "left",
          label: leftLabel,
        },
        {
          value: "center",
          label: __("Center", "content-blocks-builder"),
        },
        {
          value: "right",
          label: rightLabel,
        },
        {
          value: "bottom-start",
          label: __("Bottom left", "content-blocks-builder"),
        },
        {
          value: "bottom",
          label: bottomLabel,
        },
        {
          value: "bottom-end",
          label: __("Bottom right", "content-blocks-builder"),
        },
      ];
    } else if (type === OFFCANVAS) {
      placement = getToggleGroupFieldValue({
        fieldName: "placement",
        defaultValue: "start",
      });

      onPlacementChange = handleToggleGroupFieldChange("placement");

      placementOptions = [
        {
          value: "top",
          label: topLabel,
        },
        {
          value: "end",
          label: rightLabel,
        },
        {
          value: "bottom",
          label: bottomLabel,
        },
        {
          value: "start",
          label: leftLabel,
        },
      ];

      placementClass = "";
    } else if (type === POPOVER) {
      placement = getToggleGroupFieldValue({
        fieldName: "popoverPlacement",
        defaultValue: "bottom",
      });

      onPlacementChange = handleToggleGroupFieldChange("popoverPlacement");

      placementOptions = [
        {
          value: "top-start",
          label: __("Top start", "content-blocks-builder"),
        },
        {
          value: "top",
          label: topLabel,
        },
        {
          value: "top-end",
          label: __("Top end", "content-blocks-builder"),
        },
        {
          value: "right-start",
          label: __("Right start", "content-blocks-builder"),
        },
        {
          value: "right",
          label: rightLabel,
        },
        {
          value: "right-end",
          label: __("Right end", "content-blocks-builder"),
        },
        {
          value: "bottom-start",
          label: __("Bottom start", "content-blocks-builder"),
        },
        {
          value: "bottom",
          label: bottomLabel,
        },
        {
          value: "bottom-end",
          label: __("Bottom end", "content-blocks-builder"),
        },
        {
          value: "left-start",
          label: __("Left start", "content-blocks-builder"),
        },
        {
          value: "left",
          label: leftLabel,
        },
        {
          value: "left-end",
          label: __("Left end", "content-blocks-builder"),
        },
      ];
    }

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <InspectorControls>
              <PanelBody
                title={labels.toggle}
                initialOpen={enableToggle}
                className="boldblocks-panel-settings is-toggle-settings"
              >
                <VStack spacing={3}>
                  <ToggleControl
                    label={__(
                      "Enable toggle content",
                      "content-blocks-builder",
                    )}
                    checked={enableToggle}
                    onChange={handleToggleGroupFieldChange("enable")}
                    help={__(
                      "Turn this block into a toggle content, it can be show/hide by clicking some buttons/links or other elements.",
                      "content-blocks-builder",
                    )}
                  />
                  {enableToggle && (
                    <>
                      <ToggleGroupControl
                        name="type"
                        label={__("Toggle type", "content-blocks-builder")}
                        value={type}
                        onChange={handleToggleGroupFieldChange("type")}
                        options={typeOptions}
                        toggleOff={false}
                      />
                      <TextControl
                        label={__("Toggle element", "content-blocks-builder")}
                        value={getToggleGroupFieldValue({
                          fieldName: "toggleElement",
                          defaultValue: "",
                        })}
                        onChange={handleToggleGroupFieldChange("toggleElement")}
                        help={__(
                          "The CSS selector (#id, .class, [attribute]...) from button/link or elements that trigger expand/collapse this block",
                          "content-blocks-builder",
                        )}
                        autoComplete="off"
                      />
                      {type !== POPOVER && (
                        <ToggleGroupControl
                          name="initialState"
                          label={_x(
                            "Initial state",
                            "The initial state for the accordion item",
                            "content-blocks-builder",
                          )}
                          value={initialState}
                          onChange={handleToggleGroupFieldChange(
                            "initialState",
                          )}
                          options={stateOptions}
                          toggleOff={false}
                          help={stateHelp}
                        />
                      )}
                      {initialState === "custom" &&
                        [MODAL, OFFCANVAS].includes(type) &&
                        applyFilters("boldblocks.toggle.customState", null, {
                          TextControl,
                          ToggleGroupCustomControl,
                          getToggleGroupFieldValue,
                          handleToggleGroupFieldChange,
                        })}
                      <ToggleControl
                        label={__(
                          "Focus on the first focusable element",
                          "content-blocks-builder",
                        )}
                        checked={getToggleGroupFieldValue({
                          fieldName: "focusFirstElement",
                          defaultValue: false,
                        })}
                        onChange={handleToggleGroupFieldChange(
                          "focusFirstElement",
                        )}
                        help={__(
                          "Add the class 'is-focus-first' to any focusable element within the modal content to focus it by default.",
                          "content-blocks-builder",
                        )}
                      />
                      {[MODAL, OFFCANVAS, POPOVER].includes(type) && (
                        <>
                          <TextControl
                            label={__("Title", "content-blocks-builder")}
                            value={getToggleGroupFieldValue({
                              fieldName: "title",
                              defaultValue: "",
                            })}
                            onChange={handleToggleGroupFieldChange("title")}
                            help={__(
                              "This title will not be shown on the front end, it's only for screen readers.",
                              "content-blocks-builder",
                            )}
                          />
                          <ToggleControl
                            label={__(
                              "Hide the close button",
                              "content-blocks-builder",
                            )}
                            checked={hideCloseButton}
                            onChange={handleToggleGroupFieldChange(
                              "hideCloseButton",
                            )}
                            help={__(
                              "Toggle on this to hide the default close button. You can add the class 'is-close-modal' to any element within the modal content to make it a custom close button.",
                            )}
                          />
                          {!hideCloseButton && (
                            <ColorGradientDropdown
                              enableAlpha={false}
                              settings={[
                                {
                                  label: __(
                                    "Close button color",
                                    "content-blocks-builder",
                                  ),
                                  onColorChange: (value) => {
                                    handleToggleGroupFieldChange(
                                      "closeButtonColor",
                                    )(getColorObject(value, allColors));
                                  },
                                  colorValue: getColorObject(
                                    closeButtonColor,
                                    allColors,
                                  )?.value,
                                },
                              ]}
                            />
                          )}
                          <ToggleGroupStyled
                            label={placementLabel}
                            value={placement}
                            onChange={onPlacementChange}
                            options={placementOptions}
                            toggleOff={false}
                            className={placementClass}
                          />
                          {!(
                            type === OFFCANVAS &&
                            ["top", "bottom"].includes(placement)
                          ) && (
                            <ToggleGroupCustomControl
                              name="width"
                              label={__("Width", "content-blocks-builder")}
                              value={getToggleResponsiveGroupFieldValue({
                                fieldName: "width",
                              })}
                              onChange={handleToggleResponsiveGroupFieldChange(
                                "width",
                              )}
                              options={[
                                {
                                  value: "100vw",
                                  label: labels.fullScreen,
                                },
                                {
                                  value: "100%",
                                  label: "100%",
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
                          )}
                          {!(
                            type === OFFCANVAS &&
                            ["start", "end"].includes(placement)
                          ) && (
                            <ToggleGroupCustomControl
                              name="height"
                              label={__("Height", "content-blocks-builder")}
                              value={getToggleResponsiveGroupFieldValue({
                                fieldName: "height",
                              })}
                              onChange={handleToggleResponsiveGroupFieldChange(
                                "height",
                              )}
                              options={[
                                {
                                  value: "100vh",
                                  label: labels.fullScreen,
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
                          )}
                          <ToggleControl
                            label={__(
                              "Hide backdrop",
                              "content-blocks-builder",
                            )}
                            checked={getToggleGroupFieldValue({
                              fieldName: "disableBackdrop",
                              defaultValue: false,
                            })}
                            onChange={handleToggleGroupFieldChange(
                              "disableBackdrop",
                            )}
                          />
                          <ToggleControl
                            label={__(
                              "Force to click on close buttons",
                              "content-blocks-builder",
                            )}
                            checked={getToggleGroupFieldValue({
                              fieldName: "forceCloseButtons",
                              defaultValue: false,
                            })}
                            onChange={handleToggleGroupFieldChange(
                              "forceCloseButtons",
                            )}
                          />
                          <ToggleControl
                            label={getProLabel(
                              __("Auto play video", "content-blocks-builder"),
                            )}
                            checked={getToggleGroupFieldValue({
                              fieldName: "autoPlayVideo",
                              defaultValue: false,
                            })}
                            onChange={handleToggleGroupFieldChange(
                              "autoPlayVideo",
                            )}
                            disabled={!isPremium}
                            help={__(
                              "Auto play the first video, support core/video block and youtube embeded video",
                              "content-blocks-builder",
                            )}
                          />
                          {applyFilters(
                            "boldblocks.toggle.modalSettings",
                            null,
                            {
                              ToggleControl,
                              isPremium,
                              getToggleGroupFieldValue,
                              handleToggleGroupFieldChange,
                            },
                          )}
                        </>
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
  if (!boldblocksHasSupport(blockType, featureName)) {
    return props;
  }

  const toggle = getSettingFieldValue({
    fieldName: "toggle",
    attributes,
    defaultValue: {},
  });

  if (toggle?.enable) {
    const type = toggle?.type ?? COLLAPSE;
    props.className = clsx(props.className, "is-toggle-content", {
      [COLLAPSE]:
        !attributes?.isBlockEdit &&
        type === COLLAPSE &&
        (!toggle?.initialState || toggle?.initialState === "hidden"),
      ["is-modal-body"]:
        !attributes?.isBlockEdit && [MODAL, OFFCANVAS, POPOVER].includes(type),
    });

    props = {
      ...props,
      ...getToggleDataSet(toggle, attributes?.boldblocks?.customCSS?.id),
    };
  }

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
