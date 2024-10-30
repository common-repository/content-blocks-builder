/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  ToggleControl,
  SelectControl,
  TabPanel,
  Slot,
  Fill,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import {
  MEDIA_TYPES,
  IMAGE_BACKGROUND_TYPE,
  VIDEO_BACKGROUND_TYPE,
} from "./utils";
import CustomMediaUpload from "../../components/custom-media-upload";

const BackgroundInputStyled = styled.div`
  .components-tab-panel__tabs {
    border-bottom: 1px solid #ddd;

    button {
      height: 40px;
    }
  }

  .components-tab-panel__tab-content {
    padding-top: 8px;
  }

  .cbb-background-dropdown & {
    @media (min-width: 600px) {
      max-width: 100%;
      min-width: 320px;
      padding: 4px 8px;
    }
  }
`;

const BackgroundImageUpload = ({
  media,
  label = __("Set background image", "content-blocks-builder"),
  onBackgroundChange,
}) => (
  <CustomMediaUpload
    mediaType={IMAGE_BACKGROUND_TYPE}
    media={media}
    label={label}
    inputLabel={__("Image URL", "content-blocks-builder")}
    inputPlaceholder="https://example.com/bg.jpg"
    changeMediaLabel={__("Change image", "content-blocks-builder")}
    removeMediaLabel={__("Remove image", "content-blocks-builder")}
    onMediaChange={onBackgroundChange}
    renderPreview={(media) => (
      <img
        src={media?.url}
        alt={__("Media preview", "content-blocks-builder")}
      />
    )}
  />
);

const BackgroundInput = ({
  mediaType,
  media,
  onMediaTypeChange,
  onBackgroundMediaChange,
}) => {
  const imageSizes = useSelect(
    (select) => select(blockEditorStore).getSettings().imageSizes,
    [],
  );

  let sizeOptions = [];
  if (media?.useFeaturedImage) {
    sizeOptions = imageSizes?.length
      ? imageSizes.reduce((prev, item) => {
          return [...prev, { value: item?.slug, label: item?.name }];
        }, [])
      : [];
  } else if (media?.id && media?.sizes?.full) {
    sizeOptions = Object.keys(media.sizes).reduce((prev, item) => {
      const { width, height } = media.sizes[item];
      let label = item;
      if (width && height) {
        label = `${label}(${width}x${height})`;
      }
      prev.push({ value: item, label });

      return prev;
    }, []);
  }
  return (
    <BackgroundInputStyled>
      <TabPanel
        className="background-settings"
        initialTabName={mediaType}
        onSelect={(type) => {
          if (mediaType !== type) {
            onMediaTypeChange(type);
          }
        }}
        tabs={MEDIA_TYPES}
      >
        {(tab) => <Slot name={`background-slot-${tab.name}`} />}
      </TabPanel>
      <Fill name="background-slot-image">
        <VStack spacing={3}>
          <BackgroundImageUpload
            media={media}
            onBackgroundChange={(newMedia) =>
              onBackgroundMediaChange({
                ...newMedia,
                customAlt: media?.customAlt ? media.customAlt : newMedia?.alt,
                useFeaturedImage: media?.useFeaturedImage,
              })
            }
          />
          <ToggleControl
            label={__(
              "Use a separated image for mobile screens",
              "content-blocks-builder",
            )}
            checked={!media?.useFeaturedImage && !!media?.hasMobileBackground}
            onChange={(hasMobileBackground) =>
              onBackgroundMediaChange({
                ...media,
                hasMobileBackground,
              })
            }
            disabled={!!media?.useFeaturedImage}
          />
          {!media?.useFeaturedImage && !!media?.hasMobileBackground && (
            <BackgroundImageUpload
              media={media?.mobileBackground ?? {}}
              label={__(
                "Set background image for mobile",
                "content-blocks-builder",
              )}
              onBackgroundChange={(newMedia) =>
                onBackgroundMediaChange({
                  ...media,
                  mobileBackground: newMedia,
                })
              }
            />
          )}
          <ToggleControl
            label={__("Use the featured image", "content-blocks-builder")}
            checked={media?.useFeaturedImage ?? false}
            onChange={(useFeaturedImage) =>
              onBackgroundMediaChange({
                ...media,
                useFeaturedImage,
              })
            }
          />
          {media?.useFeaturedImage && (
            <ToggleControl
              label={__("Link to post", "content-blocks-builder")}
              checked={media?.linkToPost ?? false}
              onChange={(linkToPost) =>
                onBackgroundMediaChange({
                  ...media,
                  linkToPost,
                })
              }
            />
          )}
          {!!sizeOptions?.length && (
            <SelectControl
              label={__("Image size", "content-blocks-builder")}
              value={media?.size ?? "full"}
              onChange={(size) =>
                onBackgroundMediaChange({
                  ...media,
                  size,
                })
              }
              options={sizeOptions}
            />
          )}
        </VStack>
      </Fill>
      <Fill name="background-slot-video">
        <VStack spacing={3}>
          <CustomMediaUpload
            mediaType={VIDEO_BACKGROUND_TYPE}
            media={media}
            label={__("Set background video", "content-blocks-builder")}
            inputLabel={__("Video URL", "content-blocks-builder")}
            inputPlaceholder="https://example.com/bg.mp4"
            changeMediaLabel={__("Change video", "content-blocks-builder")}
            removeMediaLabel={__("Remove video", "content-blocks-builder")}
            onMediaChange={onBackgroundMediaChange}
            renderPreview={(media) => (
              <video src={media?.url} autoPlay={true} loop muted={true} />
            )}
          />
          <ToggleControl
            label={__("Display Play/Pause", "content-blocks-builder")}
            checked={media?.isPausable ?? false}
            onChange={(isPausable) =>
              onBackgroundMediaChange({
                ...media,
                isPausable,
              })
            }
          />
        </VStack>
      </Fill>
    </BackgroundInputStyled>
  );
};

export default BackgroundInput;
