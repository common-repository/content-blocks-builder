/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  FocalPointPicker,
  TextControl,
  ToggleControl,
  SelectControl,
  RangeControl,
  TextareaControl,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { applyFilters } from "@wordpress/hooks";

/**
 * Internal dependencies
 */
import { isPremium } from "../../utils";
import { getProLabel, labels } from "../../utils/labels";
import {
  IMAGE_BACKGROUND_TYPE,
  VIDEO_BACKGROUND_TYPE,
  useFeaturedMedia,
} from "./utils";
import { HelpLink } from "../../components/help-link";

const BackgroundSettingsStyled = styled(VStack)`
  margin-top: 12px;

  > .components-base-control {
    margin-bottom: 12px;
  }
`;

const FocalPointPickerFeaturedImage = ({
  settings,
  createSettingChangeEventHandler,
}) => {
  const featuredMedia = useFeaturedMedia();
  return (
    <FocalPointPicker
      label={__("Focal point", "content-blocks-builder")}
      url={featuredMedia?.url}
      value={settings?.focalPoint ?? { x: 0.5, y: 0.5 }}
      onChange={createSettingChangeEventHandler("focalPoint")}
    />
  );
};

/**
 * Background settings control
 *
 * @param {Object} param0
 * @returns
 */
const BackgroundSettings = ({
  clientId,
  mediaType,
  media,
  settings,
  onBackgroundSettingsChange,
  onBackgroundMediaChange,
}) => {
  const hasMedia =
    media?.url ||
    (mediaType === IMAGE_BACKGROUND_TYPE && media?.useFeaturedImage);

  /**
   * Event handler for field change
   *
   * @param {String} fieldName
   * @returns
   */
  const createSettingChangeEventHandler = (fieldName) => (newValue) => {
    onBackgroundSettingsChange({ ...settings, [fieldName]: newValue });
  };

  if (!hasMedia) {
    return null;
  }

  const ObjectFitControl = () => (
    <SelectControl
      label={__("Object fit", "content-blocks-builder")}
      value={settings?.objectFit ?? "cover"}
      options={[
        {
          value: "cover",
          label: __("Cover", "content-blocks-builder"),
        },
        {
          value: "contain",
          label: __("Contain", "content-blocks-builder"),
        },
        {
          value: "fill",
          label: __("Fill", "content-blocks-builder"),
        },
      ]}
      onChange={createSettingChangeEventHandler("objectFit")}
    />
  );

  const animationOptions = [
    {
      value: "none",
      label: __("None", "content-blocks-builder"),
    },
    {
      value: "bg-parallax",
      label: __("Parallax", "content-blocks-builder"),
    },
    {
      value: "bg-zoom",
      label: __("Zoom", "content-blocks-builder"),
    },
  ];

  if (!settings?.isImgElement) {
    animationOptions.push(
      ...[
        {
          value: "bg-scroll-horizontal",
          label: __("Scroll horizontal", "content-blocks-builder"),
        },
        {
          value: "bg-scroll-vertical",
          label: __("Scroll vertical", "content-blocks-builder"),
        },
      ],
    );
  }

  return (
    <BackgroundSettingsStyled spacing={3}>
      {media?.url ? (
        <FocalPointPicker
          label={__("Focal point", "content-blocks-builder")}
          url={media?.url}
          value={settings?.focalPoint ?? { x: 0.5, y: 0.5 }}
          onChange={createSettingChangeEventHandler("focalPoint")}
        />
      ) : (
        <FocalPointPickerFeaturedImage
          settings={settings}
          createSettingChangeEventHandler={createSettingChangeEventHandler}
        />
      )}
      {media?.url && mediaType === VIDEO_BACKGROUND_TYPE && (
        <ObjectFitControl />
      )}
      {hasMedia && mediaType === IMAGE_BACKGROUND_TYPE && (
        <>
          <ToggleControl
            label={__("Use as an image", "content-blocks-builder")}
            checked={settings?.isImgElement ?? false}
            onChange={createSettingChangeEventHandler("isImgElement")}
          />
          {settings?.isImgElement && (
            <>
              <TextareaControl
                label={__(
                  "Alt text (alternative text)",
                  "content-blocks-builder",
                )}
                value={media?.customAlt}
                onChange={(customAlt) =>
                  onBackgroundMediaChange({ ...media, customAlt })
                }
                help={
                  <>
                    <HelpLink
                      href="https://www.w3.org/WAI/tutorials/images/decision-tree"
                      label={__(
                        "Describe the purpose of the image",
                        "content-blocks-builder",
                      )}
                    />
                    {__(
                      "Leave empty if the image is purely decorative.",
                      "content-blocks-builder",
                    )}
                  </>
                }
              />
              <ObjectFitControl />
              <SelectControl
                label={__("Loading priority", "content-blocks-builder")}
                value={settings?.loadingPriority ?? ""}
                options={[
                  {
                    value: "",
                    label: labels.auto,
                  },
                  {
                    value: "high",
                    label: __("High", "content-blocks-builder"),
                  },
                  {
                    value: "low",
                    label: __("Low", "content-blocks-builder"),
                  },
                  {
                    value: "lazy",
                    label: __("Lazy", "content-blocks-builder"),
                  },
                ]}
                onChange={createSettingChangeEventHandler("loadingPriority")}
                help={__(
                  "Set the fetch priority for images manually. Assign a high value to images that appear in the first visible viewport, or behind a carousel, etc.",
                  "content-blocks-builder",
                )}
              />
            </>
          )}
          {!settings?.isImgElement && (
            <>
              <ToggleControl
                label={__("Fixed background", "content-blocks-builder")}
                checked={settings?.isFixed ?? false}
                onChange={createSettingChangeEventHandler("isFixed")}
              />
              <SelectControl
                label={__("Background size", "content-blocks-builder")}
                value={settings?.size ?? "cover"}
                options={[
                  {
                    value: "cover",
                    label: __("Cover", "content-blocks-builder"),
                  },
                  {
                    value: "contain",
                    label: __("Contain", "content-blocks-builder"),
                  },
                  {
                    value: "auto",
                    label: labels.auto,
                  },
                ]}
                onChange={createSettingChangeEventHandler("size")}
              />
              <SelectControl
                label={__("Background repeat", "content-blocks-builder")}
                value={settings?.repeat ?? "no-repeat"}
                options={[
                  {
                    value: "no-repeat",
                    label: __("No repeat", "content-blocks-builder"),
                  },
                  {
                    value: "repeat",
                    label: __("Repeat all", "content-blocks-builder"),
                  },
                  {
                    value: "repeat-x",
                    label: __("Repeat horizontal", "content-blocks-builder"),
                  },
                  {
                    value: "repeat-y",
                    label: __("Repeat vertical", "content-blocks-builder"),
                  },
                ]}
                onChange={createSettingChangeEventHandler("repeat")}
              />
            </>
          )}
          <SelectControl
            label={getProLabel(
              __("Background animation", "content-blocks-builder"),
            )}
            value={settings?.animation?.type ?? "none"}
            options={animationOptions}
            onChange={(type) => {
              onBackgroundSettingsChange({
                ...settings,
                animation: { ...(settings?.animation ?? {}), type },
              });
            }}
            disabled={!isPremium}
          />
          {applyFilters("boldblocks.background.animation", null, {
            clientId,
            settings,
            animation: settings?.animation ?? {},
            onBackgroundSettingsChange,
            ToggleControl,
            RangeControl,
            TextControl,
            SelectControl,
          })}
        </>
      )}
    </BackgroundSettingsStyled>
  );
};

export default BackgroundSettings;
