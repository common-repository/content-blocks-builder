/**
 * Internal dependencies
 */
import { EVENTS, toType, normalizeData } from "../../utils/dom";
import { SearchParams } from "../../utils/searchparams";
import { stopVideo } from "../../utils/video";
import {
  isVideoBlock,
  isYoutubeVideo,
  isBYEBVideo,
} from "./utils-for-frontend";

const stopVideoBlock = (element) => {
  stopVideo(element.querySelector("video"));
};

const stopYoutubeVideo = (element) => {
  const iframe = element.querySelector("iframe");
  if (iframe && iframe.src) {
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      "*",
    );
  }
};

window.addEventListener(
  EVENTS.HIDDEN,
  function ({ detail: { target, modal } = {} }) {
    if (target && modal) {
      const embedVideos = target.querySelectorAll(
        ".wp-block-embed-youtube, .wp-block-video, .wp-block-boldblocks-youtube-block",
      );
      if (embedVideos.length) {
        embedVideos.forEach((embedVideo) => {
          if (isVideoBlock(embedVideo)) {
            stopVideoBlock(embedVideo);
          } else if (isYoutubeVideo(embedVideo) || isBYEBVideo(embedVideo)) {
            stopYoutubeVideo(embedVideo);
          }
        });
      }
    }
  },
);

const loadYoutubeIframeAPI = (element) => {
  const embedVideos = element.querySelectorAll(".wp-block-embed-youtube");
  if (embedVideos && embedVideos.length) {
    embedVideos.forEach((embedVideo) => {
      const iframe = embedVideo.querySelector("iframe");
      if (iframe && iframe.src) {
        const searchParams = new SearchParams(iframe.src);
        let needsToUpdateSrc = false;
        if (!searchParams.get("enablejsapi")) {
          searchParams.set("enablejsapi", 1, false);
          needsToUpdateSrc = true;
        }
        if (!searchParams.get("playsinline")) {
          searchParams.set("playsinline", 1, false);
          needsToUpdateSrc = true;
        }

        if (needsToUpdateSrc) {
          iframe.setAttribute("src", searchParams.getHref());
        }
      }
    });
  }
};

const loadBYEBVideo = (element) => {
  const players = element.querySelectorAll(
    ".wp-block-boldblocks-youtube-block .yb-player",
  );
  if (players && players.length) {
    players.forEach((player) => {
      let params = normalizeData(player.getAttribute("data-params"));
      if (toType(params) === "object") {
        params.enablejsapi = 1;
      } else {
        params = { enablejsapi: 1 };
      }
      player.setAttribute("data-params", JSON.stringify(params));
    });
  }
};

function loadYTIframeAPI({ detail: { target, modal } = {} }) {
  if (target && modal) {
    // Youtube variation of core/embed
    loadYoutubeIframeAPI(target);

    // Support for BYEB video
    loadBYEBVideo(target);
  }
}

window.addEventListener(EVENTS.SHOWN, loadYTIframeAPI);
