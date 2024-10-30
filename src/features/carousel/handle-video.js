import { playVideo, stopVideo } from "../../utils/video";

window.addEventListener(
  "cbb.carousel.afterInit",
  function ({ detail: { swiper } }) {
    swiper.hasVideo = !!swiper.wrapperEl.querySelector("video[autoplay]");

    if (swiper.hasVideo && swiper.visibleSlides) {
      const playVideos = swiper.visibleSlides.reduce((previous, current) => {
        const elements = current.querySelectorAll("video[autoplay]");
        if (elements.length) {
          previous.push(...elements);
        }

        return previous;
      }, []);

      if (playVideos && playVideos.length) {
        playVideos.forEach((video) => {
          // Play video
          playVideo(video);
        });
      }
    }
  }
);

window.addEventListener(
  "cbb.carousel.slideChangeTransitionEnd",
  function ({ detail: { swiper } }) {
    if (swiper.visibleSlidesIndexes) {
      if (swiper.hasVideo) {
        const playVideos = swiper.visibleSlidesIndexes.reduce(
          (previous, current) => {
            const elements = swiper.slides[current].querySelectorAll(
              "video[autoplay]"
            );

            if (elements.length) {
              previous.push(...elements);
            }

            return previous;
          },
          []
        );

        if (playVideos && playVideos.length) {
          playVideos.forEach((video) => {
            // Play video
            playVideo(video);
          });
        }
      }

      const pauseVideos = swiper.slides.reduce((previous, current, index) => {
        if (swiper.visibleSlidesIndexes.includes(index)) {
          return previous;
        }

        const elements = current.querySelectorAll("video");

        if (elements.length) {
          previous.push(...elements);
        }

        return previous;
      }, []);

      if (pauseVideos && pauseVideos.length) {
        pauseVideos.forEach((video) => {
          // Stop video
          stopVideo(video);
        });
      }
    }
  }
);
