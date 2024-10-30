/**
 * External dependencies
 */
import { has } from "lodash";

/**
 * WordPress dependencies
 */
import { _x } from "@wordpress/i18n";
import { useEntityProp, store as coreStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";

export const MEDIA_TYPES = [
  { name: "image", title: _x("Image", "Image type", "content-blocks-builder") },
  { name: "video", title: _x("Video", "Video type", "content-blocks-builder") },
];
export const IMAGE_BACKGROUND_TYPE = "image";
export const VIDEO_BACKGROUND_TYPE = "video";

export const useFeaturedMedia = ({ postId, postType } = {}) => {
  // Get postType, postId.
  const { currentPostId, currentPostType } = useSelect(
    (select) => ({
      currentPostId: select(editorStore).getCurrentPostId(),
      currentPostType: select(editorStore).getCurrentPostType(),
    }),
    []
  );

  postId = postId ? postId : currentPostId;
  postType = postType ? postType : currentPostType;

  const [featuredImage] = useEntityProp(
    "postType",
    postType,
    "featured_media",
    postId
  );

  const media = useSelect(
    (select) =>
      featuredImage &&
      select(coreStore).getMedia(featuredImage, { context: "view" }),
    [featuredImage]
  );

  if (media?.id) {
    return {
      ...media,
      url: media?.source_url,
      sizes: media?.media_details?.sizes,
    };
  }

  return media;
};

export const getAnimationSettingValue = (type, name, settings, defVal) => {
  if (has(settings, [type, name])) {
    return settings[type][name];
  } else {
    return settings[name] ?? defVal;
  }
};

export const hasAnimationSettingValue = (type, name, settings) => {
  return has(settings, [type, name]) || has(settings, name);
};
