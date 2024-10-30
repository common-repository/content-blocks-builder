/**
 * External dependencies
 */
import clsx from "clsx";
import { nanoid } from "nanoid";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter, applyFilters } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  InspectorControls,
  BlockControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { hasBlockSupport } from "@wordpress/blocks";
import { useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import {
  PanelBody,
  BaseControl,
  ToggleControl,
  SelectControl,
  RangeControl,
  TextControl,
  __experimentalUnitControl as UnitControl,
  __experimentalVStack as VStack,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
  LabelControl,
  ColorGradientDropdown,
  ToggleGroupCustomControl,
  UnitRangeControl,
} from "sdk/components";
import {
  getBreakpointType,
  getAllBreakpoints,
  handleChangeResponsiveSettingGroupField,
  getResponsiveSettingGroupFieldValue,
  handleChangeSettingGroupField,
  getSettingGroupFieldValue,
  getColorObject,
  useMultipleOriginColors,
  addAttributes,
  addEditProps,
  usePropsStyle,
} from "sdk/utils";
import {
  hasSupportLayout,
  getSelectOptions,
  isPremium,
  getPreviewMode,
  useSetPreviewMode,
} from "../../utils";
import { getProLabel } from "../../utils/labels";
import { toType } from "../../utils/dom";
import {
  effectOptions,
  isSingleSlideEffect,
  paginationDefault,
  navigationDefault,
  scrollbarDefault,
  buildCarouselSettings,
  buildCarouselEditStyle,
  buildEditLayoutStyle,
} from "./utils";
import { BlockIcon } from "../../components/block-icon";
import PreviewMode from "../../components/preview-mode";
import InputWithAutoControl from "../../components/input-auto-control";
import "./carousel-editor";
import { GroupSettingWrapper } from "./styles";

/**
 * Define feature name
 */
export const layoutType = "layoutType";
export const featureName = "carousel";

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
  addAttributes(
    {
      carousel: {
        speed: 500,
        effect: "slide",
        effectSettings: {},
        loopType: "infinite", // rewind, none
        autoplay: { enable: true, delay: 3000 },
        slidesPerView: 1,
        spaceBetween: 0,
        enableResponsive: false,
        breakpoints: {
          lg: {
            value: {
              slidesPerView: 4, // 'auto'
              spaceBetween: 0,
            },
            inherit: null,
          },
          md: { inherit: "lg" },
          sm: { inherit: "lg" },
        },
        pagination: paginationDefault,
        navigation: navigationDefault,
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

    // Allow the ability to cancel the support.
    if (
      !applyFilters("boldblocks.hasSupportCarousel", true, {
        props,
        context: "BlockEdit",
      })
    ) {
      return <BlockEdit {...props} />;
    }

    const setPreviewMode = useSetPreviewMode();

    const { attributes, setAttributes, clientId, name, isSelected } = props;

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    const { allColors } = useMultipleOriginColors();

    // Get group field value
    const getCarouselGroupFieldValue = ({ fieldName, defaultValue }) =>
      getSettingGroupFieldValue({
        fieldName,
        defaultValue,
        attributes,
        groupName: "carousel",
      });

    // Handle group field change
    const handleCarouselGroupFieldChange = (fieldName) =>
      handleChangeSettingGroupField({
        fieldName,
        groupName: "carousel",
        setAttributes,
        attributes,
      });

    // Loop type
    const loopType = getCarouselGroupFieldValue({
      fieldName: "loopType",
      defaultValue: "none",
    });

    const loopTypeHelp =
      loopType === "infinite"
        ? __(
            "For infinite loop mode to work, the number of slides must be greater or equal to the sum of 'Items per view' and 'Items per group', and it must also be even to 'Items per group'.",
            "content-blocks-builder",
          )
        : loopType === "none"
        ? __(
            "If the loop type is None, the carousel will stop at the last slide in the autoplay mode.",
            "content-blocks-builder",
          )
        : "";

    // Autoplay
    const autoplay = getCarouselGroupFieldValue({
      fieldName: "autoplay",
      defaultValue: { enable: true, delay: 3000 },
    });

    // Effect
    let effect = getCarouselGroupFieldValue({
      fieldName: "effect",
      defaultValue: "slide",
    });

    if (toType(effect) === "object") {
      effect = effect?.name ?? "slide";
    }

    const isSingleEffect = isSingleSlideEffect(effect);

    const effectSettings = getCarouselGroupFieldValue({
      fieldName: "effectSettings",
      defaultValue: {},
    });

    // slidesPerView
    const slidesPerViewRaw = getCarouselGroupFieldValue({
      fieldName: "slidesPerView",
      defaultValue: 1,
    });

    const slidesPerView =
      toType(slidesPerViewRaw) === "object"
        ? slidesPerViewRaw?.auto
          ? "auto"
          : slidesPerViewRaw?.value
        : slidesPerViewRaw;

    // Breakpoints
    const enableResponsive = getCarouselGroupFieldValue({
      fieldName: "enableResponsive",
      defaultValue: false,
    });

    const breakpoints = getResponsiveSettingGroupFieldValue({
      fieldName: "breakpoints",
      groupName: "carousel",
      attributes,
      breakpoint,
      defaultValue: {},
    });

    const onBreakpointFieldChange = (fieldName) => (value) =>
      handleChangeResponsiveSettingGroupField({
        fieldName: "breakpoints",
        groupName: "carousel",
        setAttributes,
        attributes,
        breakpoint,
        allBreakpoints,
      })({ ...breakpoints, [fieldName]: value });

    const onBreakpointGroupChange = (groupValue) =>
      handleChangeResponsiveSettingGroupField({
        fieldName: "breakpoints",
        groupName: "carousel",
        setAttributes,
        attributes,
        breakpoint,
        allBreakpoints,
      })({ ...breakpoints, ...groupValue });

    const centeredSlides = getCarouselGroupFieldValue({
      fieldName: "centeredSlides",
      defaultValue: false,
    });

    const centeredSlidesSettings = getCarouselGroupFieldValue({
      fieldName: "centeredSlidesSettings",
      defaultValue: {},
    });

    // Pagination
    const pagination = getCarouselGroupFieldValue({
      fieldName: "pagination",
      defaultValue: paginationDefault,
    });

    // Navigation
    const navigation = getCarouselGroupFieldValue({
      fieldName: "navigation",
      defaultValue: navigationDefault,
    });

    // Scrollbar
    const scrollbar = getCarouselGroupFieldValue({
      fieldName: "scrollbar",
      defaultValue: scrollbarDefault,
    });

    // Thumbs
    const thumbs = getCarouselGroupFieldValue({
      fieldName: "thumbs",
      defaultValue: { enable: false },
    });

    // Direction
    const direction = getCarouselGroupFieldValue({
      fieldName: "direction",
      defaultValue: "horizontal",
    });

    // Is Query Loop
    const isQueryLoop = name === "core/query" || name === "core/post-template";

    // Preview mode
    let previewMode;
    let handlePreviewModeChange;
    if (isQueryLoop) {
      previewMode = getPreviewMode(clientId);
      handlePreviewModeChange = (value) => {
        setPreviewMode({ clientId, previewMode: value });
      };
    } else {
      previewMode = getCarouselGroupFieldValue({
        fieldName: "previewMode",
        defaultValue: "EDIT",
      });
      handlePreviewModeChange = handleCarouselGroupFieldChange("previewMode");
    }

    // Switch to Edit mode when switching to small devices
    useEffect(() => {
      if (breakpoint !== "lg" && previewMode !== "EDIT" && isQueryLoop) {
        handlePreviewModeChange("EDIT");
      }
    }, [breakpoint, previewMode, isQueryLoop]);

    const itemsPerViewLabel = __("Items per view", "content-blocks-builder");
    const itemsPerGroupLabel = __("Items per group", "content-blocks-builder");
    const spaceBetweenItemsLabel = __(
      "Space between items",
      "content-blocks-builder",
    );

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <BlockControls>
              {breakpoint === "lg" && (
                <PreviewMode
                  previewMode={previewMode}
                  setPreviewMode={handlePreviewModeChange}
                />
              )}
            </BlockControls>
            <InspectorControls>
              <PanelBody
                title={__("Carousel settings", "content-blocks-builder")}
                initialOpen={true}
                className="boldblocks-panel-settings is-carousel-settings"
              >
                <VStack spacing={3}>
                  <SelectControl
                    label={__("Effect", "content-blocks-builder")}
                    value={effect}
                    options={applyFilters(
                      "cbb.carousel.effectOptions",
                      effectOptions,
                    )}
                    onChange={handleCarouselGroupFieldChange("effect")}
                  />
                  {applyFilters("cbb.carousel.effectSettings", null, {
                    effect,
                    effectSettings,
                    onEffectSettingsChange:
                      handleCarouselGroupFieldChange("effectSettings"),
                    GroupSettingWrapper,
                    ToggleGroupCustomControl,
                    BaseControl,
                    RangeControl,
                    ToggleControl,
                    UnitRangeControl,
                    TextControl,
                  })}
                  <TextControl
                    type="number"
                    label={__(
                      "Transiton duration (ms)",
                      "content-blocks-builder",
                    )}
                    value={getCarouselGroupFieldValue({
                      fieldName: "speed",
                      defaultValue: 100,
                    })}
                    max={10000}
                    min={0}
                    step={50}
                    onChange={handleCarouselGroupFieldChange("speed")}
                    className="is-row-layout"
                  />
                  {effect !== "creative" && (
                    <SelectControl
                      label={__("Slide direction", "content-blocks-builder")}
                      value={direction}
                      options={[
                        {
                          value: "horizontal",
                          label: __("Horizontal", "content-blocks-builder"),
                        },
                        {
                          value: "vertical",
                          label: __("Vertical", "content-blocks-builder"),
                        },
                      ]}
                      onChange={handleCarouselGroupFieldChange("direction")}
                      help={
                        direction === "vertical" &&
                        __(
                          "In the vertical direction, you must set the height of the carousel block.",
                          "content-blocks-builder",
                        )
                      }
                    />
                  )}
                  <SelectControl
                    label={__("Loop type", "content-blocks-builder")}
                    value={loopType}
                    options={[
                      {
                        value: "none",
                        label: __("None", "content-blocks-builder"),
                      },
                      {
                        value: "infinite",
                        label: __("Infinite", "content-blocks-builder"),
                      },
                      {
                        value: "rewind",
                        label: __("Rewind", "content-blocks-builder"),
                      },
                    ]}
                    onChange={handleCarouselGroupFieldChange("loopType")}
                    help={loopTypeHelp}
                  />

                  <ToggleControl
                    label={__("Autoplay", "content-blocks-builder")}
                    checked={autoplay?.enable}
                    onChange={(value) => {
                      handleCarouselGroupFieldChange("autoplay")({
                        ...autoplay,
                        enable: value,
                      });
                    }}
                  />
                  {autoplay?.enable && (
                    <GroupSettingWrapper>
                      <TextControl
                        type="number"
                        label={__("Delay time (ms)", "content-blocks-builder")}
                        value={autoplay?.delay}
                        max={60000}
                        min={0}
                        step={100}
                        onChange={(value) => {
                          handleCarouselGroupFieldChange("autoplay")({
                            ...autoplay,
                            delay: value,
                          });
                        }}
                        className="is-row-layout"
                      />
                      <ToggleControl
                        label={__(
                          "Pause on mouse hover",
                          "content-blocks-builder",
                        )}
                        checked={autoplay?.pauseOnMouseEnter}
                        onChange={(value) => {
                          handleCarouselGroupFieldChange("autoplay")({
                            ...autoplay,
                            pauseOnMouseEnter: value,
                          });
                        }}
                      />
                      <ToggleControl
                        label={__(
                          "Disable on interaction",
                          "content-blocks-builder",
                        )}
                        checked={autoplay?.disableOnInteraction}
                        onChange={(value) => {
                          handleCarouselGroupFieldChange("autoplay")({
                            ...autoplay,
                            disableOnInteraction: value,
                          });
                        }}
                      />
                    </GroupSettingWrapper>
                  )}
                  {!enableResponsive && !isSingleEffect && (
                    <>
                      <InputWithAutoControl
                        label={itemsPerViewLabel}
                        value={slidesPerViewRaw}
                        onChange={(value) => {
                          handleCarouselGroupFieldChange("slidesPerView")(
                            value,
                          );
                        }}
                      />
                      {slidesPerView > 1 && (
                        <>
                          <SelectControl
                            label={itemsPerGroupLabel}
                            value={getCarouselGroupFieldValue({
                              fieldName: "slidesPerGroup",
                              defaultValue: 1,
                            })}
                            options={getSelectOptions(1, slidesPerView)}
                            onChange={(value) => {
                              if (value) {
                                value = parseInt(value);
                              }

                              handleCarouselGroupFieldChange("slidesPerGroup")(
                                value,
                              );
                            }}
                            className="is-row-layout is-number"
                          />
                        </>
                      )}
                    </>
                  )}
                  {!enableResponsive && (
                    <UnitControl
                      label={spaceBetweenItemsLabel}
                      value={`${getCarouselGroupFieldValue({
                        fieldName: "spaceBetween",
                        defaultValue: 0,
                      })}px`}
                      onChange={(value) => {
                        handleCarouselGroupFieldChange("spaceBetween")(
                          parseFloat(value),
                        );
                      }}
                      units={[
                        {
                          a11yLabel: "Pixels (px)",
                          label: "px",
                          step: 1,
                          value: "px",
                        },
                      ]}
                    />
                  )}
                  {!isSingleEffect && (
                    <>
                      <ToggleControl
                        label={getProLabel(
                          __(
                            "Allow difference settings per screen size",
                            "content-blocks-builder",
                          ),
                        )}
                        checked={enableResponsive}
                        onChange={handleCarouselGroupFieldChange(
                          "enableResponsive",
                        )}
                        disabled={!isPremium}
                      />
                      {enableResponsive &&
                        applyFilters(
                          "cbb.carousel.responsiveBreakpoints",
                          null,
                          {
                            breakpoints,
                            getSelectOptions,
                            onBreakpointFieldChange,
                            onBreakpointGroupChange,
                            LabelControl,
                            GroupSettingWrapper,
                            SelectControl,
                            TextControl,
                            UnitControl,
                            InputWithAutoControl,
                            itemsPerViewLabel,
                            itemsPerGroupLabel,
                            spaceBetweenItemsLabel,
                          },
                        )}
                      {!enableResponsive && slidesPerView > 1 && (
                        <ToggleControl
                          label={__(
                            "Show 1 item per view in mobile",
                            "content-blocks-builder",
                          )}
                          checked={getCarouselGroupFieldValue({
                            fieldName: "oneSlidePerViewInMobile",
                            defaultValue: false,
                          })}
                          onChange={handleCarouselGroupFieldChange(
                            "oneSlidePerViewInMobile",
                          )}
                        />
                      )}
                    </>
                  )}
                  {!isSingleEffect &&
                    (enableResponsive || slidesPerView > 1) && (
                      <>
                        <ToggleControl
                          label={__(
                            "Active slide is at the center",
                            "content-blocks-builder",
                          )}
                          checked={centeredSlides}
                          onChange={handleCarouselGroupFieldChange(
                            "centeredSlides",
                          )}
                        />
                        {centeredSlides &&
                          effect === "slide" &&
                          applyFilters("cbb.carousel.centeredSlides", null, {
                            centeredSlidesSettings,
                            onFieldChange: (field) => (value) => {
                              const changed = {
                                ...centeredSlidesSettings,
                                [field]: value,
                              };
                              if (
                                field === "enable" &&
                                value &&
                                isNaN(centeredSlidesSettings?.inactiveSize)
                              ) {
                                changed.inactiveSize = 0.9;
                              }
                              handleCarouselGroupFieldChange(
                                "centeredSlidesSettings",
                              )(changed);
                            },
                            defaultSize: 0.9,
                            GroupSettingWrapper,
                            ToggleControl,
                            RangeControl,
                          })}
                      </>
                    )}
                  <ToggleControl
                    label={__("Show navigation", "content-blocks-builder")}
                    checked={navigation?.enable}
                    onChange={(value) => {
                      handleCarouselGroupFieldChange("navigation")({
                        ...navigation,
                        enable: value,
                      });
                    }}
                    help={
                      !isPremium
                        ? __(
                            "Pro version can choose the custom icon for the next/prev buttons.",
                            "content-blocks-builder",
                          )
                        : ""
                    }
                  />
                  {navigation?.enable && (
                    <GroupSettingWrapper>
                      <UnitControl
                        label={__("Button size", "content-blocks-builder")}
                        value={navigation?.size}
                        onChange={(value) => {
                          handleCarouselGroupFieldChange("navigation")({
                            ...navigation,
                            size: value,
                          });
                        }}
                      />
                      <UnitControl
                        label={__("Spacing to edge", "content-blocks-builder")}
                        value={navigation?.spacing}
                        onChange={(value) => {
                          handleCarouselGroupFieldChange("navigation")({
                            ...navigation,
                            spacing: value,
                          });
                        }}
                        placeholder="10"
                      />
                      <ColorGradientDropdown
                        enableAlpha={true}
                        settings={[
                          {
                            label: __("Color", "content-blocks-builder"),
                            onColorChange: (value) => {
                              handleCarouselGroupFieldChange("navigation")({
                                ...navigation,
                                color: getColorObject(value, allColors),
                              });
                            },
                            colorValue: getColorObject(navigation?.color)
                              ?.value,
                          },
                        ]}
                      />
                      {applyFilters("cbb.carousel.navigation", null, {
                        navigation,
                        onNextIconChange: (value) => {
                          handleCarouselGroupFieldChange("navigation")({
                            ...navigation,
                            nextIcon: value,
                          });
                        },
                        onPrevIconChange: (value) => {
                          handleCarouselGroupFieldChange("navigation")({
                            ...navigation,
                            prevIcon: value,
                          });
                        },
                        ToggleGroupCustomControl,
                        BlockIcon,
                      })}
                    </GroupSettingWrapper>
                  )}
                  <ToggleControl
                    label={__("Show pagination", "content-blocks-builder")}
                    checked={pagination?.enable}
                    onChange={(value) => {
                      handleCarouselGroupFieldChange("pagination")({
                        ...pagination,
                        enable: value,
                      });
                    }}
                    help={
                      !isPremium
                        ? __(
                            "Pro version can customize the style of the pagination like size, gap, dimension, active, inactive color",
                            "content-blocks-builder",
                          )
                        : ""
                    }
                  />
                  {pagination?.enable &&
                    applyFilters("cbb.carousel.pagination", null, {
                      pagination,
                      onButtonSizeChange: (value) => {
                        handleCarouselGroupFieldChange("pagination")({
                          ...pagination,
                          size: value,
                        });
                      },
                      onSpacingChange: (value) => {
                        handleCarouselGroupFieldChange("pagination")({
                          ...pagination,
                          spacing: value,
                        });
                      },
                      onHorizontalGapChange: (value) => {
                        handleCarouselGroupFieldChange("pagination")({
                          ...pagination,
                          horizontalGap: value,
                        });
                      },
                      onDynamicBulletsChange: (value) => {
                        handleCarouselGroupFieldChange("pagination")({
                          ...pagination,
                          dynamicBullets: value,
                        });
                      },
                      onInactiveBulletsOpacityChange: (value) => {
                        handleCarouselGroupFieldChange("pagination")({
                          ...pagination,
                          opacity: value,
                        });
                      },
                      onActiveBulletColorChange: (value) => {
                        handleCarouselGroupFieldChange("pagination")({
                          ...pagination,
                          color: getColorObject(value, allColors),
                        });
                      },
                      onInactiveBulletColorChange: (value) => {
                        handleCarouselGroupFieldChange("pagination")({
                          ...pagination,
                          inactiveColor: getColorObject(value, allColors),
                        });
                      },
                      GroupSettingWrapper,
                      UnitControl,
                      ToggleControl,
                      RangeControl,
                      ColorGradientDropdown,
                      VStack,
                    })}
                  <ToggleControl
                    label={__("Show scrollbar", "content-blocks-builder")}
                    checked={scrollbar?.enable}
                    onChange={(value) => {
                      handleCarouselGroupFieldChange("scrollbar")({
                        ...scrollbar,
                        enable: value,
                      });
                    }}
                    help={
                      !isPremium
                        ? __(
                            "Pro version can customize the style of the scrollbar like size, track, slider color",
                            "content-blocks-builder",
                          )
                        : ""
                    }
                  />
                  {scrollbar?.enable &&
                    applyFilters("cbb.carousel.scrollbar", null, {
                      scrollbar,
                      onTrackSizeChange: (value) => {
                        handleCarouselGroupFieldChange("scrollbar")({
                          ...scrollbar,
                          trackSize: value,
                        });
                      },
                      onSpacingChange: (value) => {
                        handleCarouselGroupFieldChange("scrollbar")({
                          ...scrollbar,
                          spacing: value,
                        });
                      },
                      onTrackColorChange: (value) => {
                        handleCarouselGroupFieldChange("scrollbar")({
                          ...scrollbar,
                          trackColor: getColorObject(value, allColors),
                        });
                      },
                      onSliderColorChange: (value) => {
                        handleCarouselGroupFieldChange("scrollbar")({
                          ...scrollbar,
                          sliderColor: getColorObject(value, allColors),
                        });
                      },
                      GroupSettingWrapper,
                      UnitControl,
                      ColorGradientDropdown,
                    })}
                  <ToggleControl
                    label={getProLabel(
                      __(
                        "Use another carousel as navigation",
                        "content-blocks-builder",
                      ),
                    )}
                    checked={thumbs?.enable}
                    onChange={(enable) =>
                      handleCarouselGroupFieldChange("thumbs")({
                        ...thumbs,
                        enable,
                      })
                    }
                    disabled={!isPremium}
                    help={
                      !isPremium
                        ? __(
                            "Pro version can manage this feature.",
                            "content-blocks-builder",
                          )
                        : ""
                    }
                  />
                  {thumbs?.enable &&
                    applyFilters("cbb.carousel.thumbs", null, {
                      thumbs,
                      onSelectorChange: (value) => {
                        handleCarouselGroupFieldChange("thumbs")({
                          ...thumbs,
                          selector: value,
                        });
                      },
                      TextControl,
                    })}
                  <ToggleControl
                    label={__("Equal height", "content-blocks-builder")}
                    checked={getCarouselGroupFieldValue({
                      fieldName: "equalHeight",
                      defaultValue: false,
                    })}
                    onChange={handleCarouselGroupFieldChange("equalHeight")}
                  />
                  <ToggleControl
                    label={__("Show preloader", "content-blocks-builder")}
                    checked={getCarouselGroupFieldValue({
                      fieldName: "displayLoader",
                      defaultValue: false,
                    })}
                    onChange={handleCarouselGroupFieldChange("displayLoader")}
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
 * This adds class, style for the feature.
 *
 * @param {Function} BlockListBlock Original component.
 *
 * @return {Function} Wrapped component.
 */
export const withBlockListClassStyles = createHigherOrderComponent(
  (BlockListBlock) => (props) => {
    if (
      !hasSupportLayout(props.name, featureName, layoutType, {
        context: "BlockList",
      })
    ) {
      return <BlockListBlock {...props} />;
    }

    // Allow the ability to cancel the support.
    if (
      !applyFilters("boldblocks.hasSupportCarousel", true, {
        props,
        context: "BlockList",
      })
    ) {
      return <BlockListBlock {...props} />;
    }

    if (props.name === "core/post-template") {
      return <BlockListBlock {...props} />;
    }

    const { getBlocks } = useSelect((select) => select(blockEditorStore), []);

    const {
      clientId,
      attributes: { boldblocks: { carousel = {} } = {} } = {},
    } = props;

    // Get all slide blocks
    const slides = getBlocks(clientId);

    // Get slides count
    const slideCount = slides.length;

    // Get current breakpoint
    const breakpoint = getBreakpointType();
    let previewMode = "EDIT";
    if (breakpoint === "lg") {
      if (props.name === "core/query") {
        previewMode = getPreviewMode(props.clientId);
        if (!previewMode) {
          previewMode = "EDIT";
        }
      } else {
        previewMode = getSettingGroupFieldValue({
          fieldName: "previewMode",
          defaultValue: "EDIT",
          attributes: props.attributes,
          groupName: "carousel",
        });
      }
    }

    let wrapperProps = props.wrapperProps;
    if (props.name !== "core/post-template") {
      wrapperProps = {
        ...props.wrapperProps,
        "data-preview-mode": previewMode,
      };
    }

    const selector = `${props.name.replace("/", "-")}-${nanoid(5)}`;

    const wraperSelector =
      props.name === "core/query" ? "ul" : ".carousel__inner";

    const cssVariables = buildEditLayoutStyle(carousel, slideCount, breakpoint);

    const style = buildCarouselEditStyle(
      `.${selector}`,
      wraperSelector,
      cssVariables,
    );

    return (
      <>
        <BlockListBlock
          {...props}
          className={clsx(props?.className, {
            [selector]: style,
          })}
          wrapperProps={wrapperProps}
        />
        {style && <style>{style}</style>}
      </>
    );
  },
);
addFilter(
  "editor.BlockListBlock",
  `boldblocks/${featureName}/withBlockListClassStyles`,
  withBlockListClassStyles,
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
  const hookContext = attributes?.isBlockEdit ? "EditProps" : "SaveProps";
  if (
    !hasSupportLayout(blockType, featureName, layoutType, {
      attributes,
      context: hookContext,
    })
  ) {
    return props;
  }

  const originalProps = { ...props };

  if (blockType.name !== "core/post-template") {
    // Don't add js-carousel-layout to post template block
    props.className = clsx(props.className, "js-carousel-layout", {
      "is-block-editor": attributes?.isBlockEdit,
    });
  }

  const { boldblocks: { carousel = {} } = {} } = attributes;

  const isDeprecatedAutoplay = hasBlockSupport(
    blockType,
    "BoldBlocksDeprecatedCarouselAutoplay",
  );

  let carouselSettings;
  if (attributes?.isBlockEdit) {
    carouselSettings = usePropsStyle({
      value: carousel,
      getStyle: (value) => () => JSON.stringify(buildCarouselSettings(value)),
    });
  } else {
    carouselSettings = JSON.stringify(
      buildCarouselSettings(carousel, isDeprecatedAutoplay),
    );
  }

  props["data-carousel-settings"] = carouselSettings;

  // Place at this low to prevent from hooks issue.
  if (
    !applyFilters("boldblocks.hasSupportCarousel", true, {
      props: { attributes, name: blockType.name },
      context: hookContext,
    })
  ) {
    return originalProps;
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
    (settings, { featureName, layoutType }) =>
      hasSupportLayout(settings, featureName, layoutType),
    { featureName, layoutType },
  ),
);
