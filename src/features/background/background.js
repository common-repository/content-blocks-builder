/**
 * External dependencies
 */
import clsx from "clsx";
import { isEmpty, isObject } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { media as mediaIcon } from "@wordpress/icons";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  BaseControl,
  Dropdown,
  ToolbarButton,
  Fill,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";
import {
  BlockControls,
  useBlockEditingMode,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { useDispatch } from "@wordpress/data";

/**
 * Internal dependencies
 */
import { handleChangeSettingGroupField, addEditProps } from "sdk/utils";
import { boldblocksHasSupport } from "../../utils";
import { labels } from "../../utils/labels";
import { normalizeData } from "../../utils/dom";
import {
  IMAGE_BACKGROUND_TYPE,
  VIDEO_BACKGROUND_TYPE,
  useFeaturedMedia,
  hasAnimationSettingValue,
  getAnimationSettingValue,
} from "./utils";
import BackgroundInput from "./background-input";
import BackgroundSettings from "./background-settings-control";
import {
  isBoundBlock,
  updateSyncedContent,
} from "../../custom-blocks/overrides/bindings-attributes";

/**
 * Define feature name
 */
export const featureName = "background";

/**
 * Handle events
 */
import "./background-editor";

/*
{
  mediaType: ["image", "video"];
  image: {
    id, url, alt, customAlt;
  }
  video: {
    id, url, poster;
  }
  settings: {
    focalPoint, // {.5, .5}
    size, // cover, contain, auto
    objectFit, // cover, contain, fill
    repeat, // no-repeat, repeat, repeat-x, repeat-y
    isFixed, // fixed or scroll
    animation: {
      type, // none, parallax, scroll-horizontal, scroll-veritcal
      settings, // {speed: .5}, {duration: 2.5}
    }
  }
}
*/

/**
 * Check whether has background media or not
 *
 * @param {Object} background
 * @returns {Boolean}
 */
export const hasBackground = (background) => {
  const { mediaType = IMAGE_BACKGROUND_TYPE, [mediaType]: media = {} } =
    background;
  return (
    (mediaType === IMAGE_BACKGROUND_TYPE ||
      mediaType === VIDEO_BACKGROUND_TYPE) &&
    media?.url
  );
};

/**
 * Get block classes for the feature.
 *
 * @param {Object} background
 * @param {Object} attributes
 */
function getBlockClasses(background, attributes) {
  const classes = [];

  if (
    hasBackground(background) ||
    (attributes?.isBlockEdit &&
      background?.image?.useFeaturedImage &&
      background?.mediaType !== VIDEO_BACKGROUND_TYPE)
  ) {
    classes.push("bb:has-background");
    classes.push(
      `bb:has-background--${background?.mediaType ?? IMAGE_BACKGROUND_TYPE}`,
    );

    if (
      background?.settings?.animation?.type &&
      background?.settings?.animation?.type !== "none"
    ) {
      classes.push(
        `js-animation-${background?.settings?.animation?.type ?? ""}`,
      );
    }
  }

  return classes.join(" ");
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

    const isBoundBg = isBoundBlock(props);

    const { attributes, setAttributes, clientId, isSelected } = props;
    const { boldblocks = {}, boldblocks: { background = {} } = {} } =
      attributes;
    const { mediaType = IMAGE_BACKGROUND_TYPE } = background;
    const { [mediaType]: media = {}, settings = {} } = background;

    const { updateBlockAttributes } = useDispatch(blockEditorStore);

    // Event handler for media change
    const handleBackgroundMediaChange = (media) => {
      handleChangeSettingGroupField({
        setAttributes,
        attributes,
        fieldName: mediaType,
        groupName: "background",
      })(media);

      // Update overrides data
      if (isBoundBg) {
        const bindingAttributes = {
          background: {
            mediaType,
            [mediaType]: media,
          },
        };

        updateSyncedContent({
          updateBlockAttributes,
          bindingAttributes,
          props,
        });
      }
    };

    const blockEditingMode = useBlockEditingMode();

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <Fill name="cbb-panel-background">
            <ToolsPanelItem
              label={labels.bgMedia}
              panelId="cbb-panel-background"
              hasValue={() =>
                hasBackground(background) ||
                (mediaType === IMAGE_BACKGROUND_TYPE && media?.useFeaturedImage)
              }
              onDeselect={() =>
                setAttributes({
                  boldblocks: { ...boldblocks, background: {} },
                })
              }
            >
              <BaseControl label={labels.bgMedia} />
              <BackgroundInput
                mediaType={mediaType}
                media={media}
                onMediaTypeChange={handleChangeSettingGroupField({
                  setAttributes,
                  attributes,
                  fieldName: "mediaType",
                  groupName: "background",
                })}
                onBackgroundMediaChange={handleBackgroundMediaChange}
              />
              <BackgroundSettings
                clientId={clientId}
                media={media}
                mediaType={mediaType}
                settings={settings}
                onBackgroundSettingsChange={handleChangeSettingGroupField({
                  setAttributes,
                  attributes,
                  fieldName: "settings",
                  groupName: "background",
                })}
                onBackgroundMediaChange={handleBackgroundMediaChange}
              />
            </ToolsPanelItem>
          </Fill>
        )}
        {isSelected && blockEditingMode === "contentOnly" && (
          <BlockControls group="block">
            <Dropdown
              popoverProps={{
                position: "bottom right",
              }}
              contentClassName="cbb-background-dropdown"
              renderToggle={({ isOpen, onToggle }) => (
                <ToolbarButton
                  label={labels.bgMedia}
                  onClick={onToggle}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  icon={mediaIcon}
                  onKeyDown={(event) => {
                    if (!isOpen && event.keyCode === DOWN) {
                      event.preventDefault();
                      onToggle();
                    }
                  }}
                />
              )}
              renderContent={() => (
                <BackgroundInput
                  mediaType={mediaType}
                  media={media}
                  onMediaTypeChange={handleChangeSettingGroupField({
                    setAttributes,
                    attributes,
                    fieldName: "mediaType",
                    groupName: "background",
                  })}
                  onBackgroundMediaChange={handleBackgroundMediaChange}
                />
              )}
            />
          </BlockControls>
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

  const { boldblocks: { background = {} } = {} } = attributes;
  props.className = clsx(
    props.className,
    getBlockClasses(background, attributes),
  );

  return props;
}
// addFilter(
//   "blocks.getSaveContent.extraProps",
//   `boldblocks/${featureName}/addSaveProps`,
//   addSaveProps
// );

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

/**
 * The Play/Pause icon
 */
const PlayPauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    className="control-play-pause"
    aria-hidden="true"
  >
    <g className="icon-pause">
      <rect width="4.5" height="14" x="3.75" y="3" rx="1.5"></rect>
      <rect width="4.5" height="14" x="11.75" y="3" rx="1.5"></rect>
    </g>
    <path
      className="icon-play"
      d="M5 15.25V4.77a1.44 1.44 0 0 1 1.44-1.62 1.86 1.86 0 0 1 1.11.31l8.53 5c.76.44 1.17.8 1.17 1.51s-.41 1.07-1.17 1.51l-8.53 5a1.86 1.86 0 0 1-1.11.31A1.42 1.42 0 0 1 5 15.25Z"
    ></path>
  </svg>
);

/**
 * Build block's background markup
 *
 * @param {String} content
 * @param {Object} { name, clientId, attributes }
 */
const addBlockBackground = (content, props, isBlockEdit = false) => {
  const {
    name,
    attributes = {},
    supports: { BoldBlocksDeprecatedDynamicBGOverlay } = {},
  } = props;

  if (!boldblocksHasSupport(name, featureName)) {
    return content;
  }

  // Using new dynamic overlay, add deprecated check for legacy blocks.
  if (!isBlockEdit && !BoldBlocksDeprecatedDynamicBGOverlay) {
    return content;
  }

  // Get background
  const { boldblocks: { background = {} } = {} } = attributes;

  // Check the featured image
  if (isBlockEdit && hasFeaturedImageAsBackground(props)) {
    return (
      <FeaturedImageBackground
        context={props?.context}
        clientId={props.clientId}
        background={background}
        settings={background?.settings ?? {}}
        content={content}
        isBlockEdit={isBlockEdit}
      />
    );
  }

  // Bail if there is no selected media or don't use the featured image
  if (!hasBackground(background)) {
    return content;
  }

  const {
    mediaType = IMAGE_BACKGROUND_TYPE,
    [mediaType]: media = {},
    settings = {},
  } = background;

  let backgroundControl = null;

  if (mediaType === IMAGE_BACKGROUND_TYPE) {
    backgroundControl = (
      <BackgroundImage
        media={media}
        settings={settings}
        content={content}
        clientId={props.clientId}
        isBlockEdit={isBlockEdit}
      />
    );
  } else if (mediaType === VIDEO_BACKGROUND_TYPE) {
    const objectPosition =
      isObject(settings?.focalPoint) && !isEmpty(settings?.focalPoint)
        ? `${parseFloat(settings?.focalPoint?.x ?? 0.5).toFixed(2) * 100}% ${
            parseFloat(settings?.focalPoint?.y ?? 0.5).toFixed(2) * 100
          }%`
        : "50% 50%";

    let objectFit = settings?.objectFit ? settings?.objectFit : "cover";
    if (objectFit === "cover") {
      objectFit = null;
    }

    backgroundControl = (
      <>
        <div className={clsx("bb:block-background bb:block-background--video")}>
          <video
            src={media?.url}
            autoplay="autoplay"
            muted
            loop
            playsinline
            preload="auto"
            style={{ objectPosition, objectFit }}
          />
        </div>
        {!!media?.isPausable && (
          <button className="cbb-video-play-pause" style={{ opacity: 0.6 }}>
            <PlayPauseIcon />
          </button>
        )}
        {content}
      </>
    );
  }

  return backgroundControl;
};
addFilter(
  "boldblocks.edit.blockInner",
  `boldblocks/${featureName}/addBlockBackground`,
  addBlockBackground,
);
addFilter(
  "boldblocks.save.blockInner",
  `boldblocks/${featureName}/addBlockBackground`,
  addBlockBackground,
);

const hasFeaturedImageAsBackground = (props) =>
  props?.attributes?.boldblocks?.background?.mediaType !== "video" &&
  props?.attributes?.boldblocks?.background?.image?.useFeaturedImage &&
  props?.context?.postId &&
  props?.context?.postType;

const BackgroundImage = ({
  media,
  settings,
  content,
  clientId,
  isBlockEdit,
}) => {
  const backgroundPosition =
    isObject(settings?.focalPoint) && !isEmpty(settings?.focalPoint)
      ? `${parseFloat(settings?.focalPoint?.x ?? 0.5).toFixed(2) * 100}% ${
          parseFloat(settings?.focalPoint?.y ?? 0.5).toFixed(2) * 100
        }%`
      : "50% 50%";

  const { isImgElement } = settings;

  let backgroundStyle = {};
  let dataset = {};
  if (isBlockEdit) {
    dataset = { id: `block-bg-${clientId}` };
  }
  let imgElement = null;
  let imgUrl = media?.url ?? media?.source_url;
  if (media?.size && media?.sizes) {
    const sizeObject = media.sizes[media.size];
    if (sizeObject?.url || sizeObject?.source_url) {
      imgUrl = sizeObject?.url ?? sizeObject?.source_url;
    }
  }
  if (isImgElement) {
    const imgStyle = {
      width: "100%",
      height: "100%",
      objectPosition: backgroundPosition,
      objectFit: settings?.objectFit ? settings.objectFit : "cover",
    };
    imgElement = (
      <img
        src={imgUrl}
        alt={media?.customAlt ?? media?.alt_text ?? ""}
        style={imgStyle}
        className={clsx("bb:block-background--img", {
          [`wp-image-${media?.id}`]: media?.id,
        })}
      />
    );
  } else {
    backgroundStyle = {
      backgroundImage: `url("${imgUrl}")`,
      backgroundPosition,
      backgroundAttachment: settings?.isFixed ? "fixed" : undefined,
      backgroundRepeat: settings?.repeat ?? "no-repeat",
      backgroundSize: settings?.size ?? "cover",
    };
  }

  const animationType = settings?.animation?.type;
  const animationSettings = settings?.animation?.settings ?? {};
  if (animationType) {
    if (
      animationType === "bg-scroll-horizontal" ||
      animationType === "bg-scroll-vertical"
    ) {
      if (!isImgElement) {
        if (hasAnimationSettingValue("scroll", "duration", animationSettings)) {
          backgroundStyle.animationDuration = `${getAnimationSettingValue(
            "scroll",
            "duration",
            animationSettings,
          )}s`;
        }

        // Make the background repeat based on the animation
        if (!settings?.repeat || settings?.repeat !== "repeat") {
          backgroundStyle.backgroundRepeat =
            animationType === "bg-scroll-horizontal" ? "repeat-x" : "repeat-y";
        }
      }
    } else if (animationType === "bg-parallax") {
      // Remove fixed background style for parallax effect
      backgroundStyle.backgroundAttachment = undefined;

      dataset["data-speed"] = hasAnimationSettingValue(
        "parallax",
        "speed",
        animationSettings,
      )
        ? getAnimationSettingValue("parallax", "speed", animationSettings)
        : 0.5;

      if (
        normalizeData(
          getAnimationSettingValue("parallax", "opacity", animationSettings),
        )
      ) {
        dataset["data-opacity"] = true;
      }

      if (
        normalizeData(
          getAnimationSettingValue(
            "parallax",
            "disableParallax",
            animationSettings,
          ),
        )
      ) {
        dataset["data-disable-parallax"] = true;

        dataset["data-disable-parallax-breakpoint"] = hasAnimationSettingValue(
          "parallax",
          "disableParallaxBreakpoint",
          animationSettings,
        )
          ? getAnimationSettingValue(
              "parallax",
              "disableParallaxBreakpoint",
              animationSettings,
            )
          : 767;
      }
    } else if (animationType === "bg-zoom") {
      if (animationSettings?.zoom?.initialScale) {
        backgroundStyle["--cbb--zoom-initial-scale"] =
          animationSettings.zoom.initialScale;
      }
      if (animationSettings?.zoom?.scale) {
        backgroundStyle["--cbb--zoom-scale"] = animationSettings.zoom.scale;
      }
      if (animationSettings?.zoom?.duration) {
        backgroundStyle[
          "--cbb--zoom-duration"
        ] = `${animationSettings.zoom.duration}s`;
      }
      if (animationSettings?.zoom?.timingFunction) {
        backgroundStyle["--cbb--zoom-timing-function"] =
          animationSettings.zoom.timingFunction;
      }

      if (animationSettings?.zoom?.event === "reveal") {
        dataset["data-reveal-animation"] = JSON.stringify({
          name: "bgZoom",
          animation:
            "bgZoom var(--cbb--zoom-duration) var(--cbb--zoom-timing-function)",
          multipleTimes: animationSettings?.zoom?.multipleTimes,
          forwards: true, // Keep the last state
        });
      }
      if (animationSettings?.zoom?.withOpacity) {
        backgroundStyle["--cbb--zoom-initial-opacity"] =
          animationSettings?.zoom?.initialOpacity ?? 0;
        backgroundStyle["--cbb--zoom-opacity"] =
          animationSettings?.zoom?.opacity ?? 1;
      }
    }
  }

  return (
    <>
      <div
        className={clsx("bb:block-background bb:block-background--image", {
          [animationType]: animationType && animationType !== "none",
          "is-reverse":
            (animationType === "bg-scroll-horizontal" ||
              animationType === "bg-scroll-vertical") &&
            getAnimationSettingValue(
              "scroll",
              "reverseDirection",
              animationSettings,
            ),
          [`bg-zoom-${animationSettings?.zoom?.event ?? "hover"}`]:
            animationType === "bg-zoom",
        })}
        style={backgroundStyle}
        {...dataset}
      >
        {imgElement}
      </div>
      {content}
    </>
  );
};

const FeaturedImageBackground = ({
  context,
  clientId,
  settings,
  content,
  background,
  isBlockEdit,
}) => {
  const { mediaType = IMAGE_BACKGROUND_TYPE, [mediaType]: media = {} } =
    background;

  const featureImage = useFeaturedMedia(context);
  if (featureImage?.id && featureImage?.url) {
    return (
      <BackgroundImage
        media={{ ...featureImage, size: media?.size }}
        settings={settings}
        content={content}
        clientId={clientId}
        isBlockEdit={isBlockEdit}
      />
    );
  } else if (hasBackground(background)) {
    if (mediaType === IMAGE_BACKGROUND_TYPE) {
      return (
        <BackgroundImage
          media={media}
          settings={settings}
          content={content}
          clientId={clientId}
          isBlockEdit={isBlockEdit}
        />
      );
    }
  }

  return null;
};
