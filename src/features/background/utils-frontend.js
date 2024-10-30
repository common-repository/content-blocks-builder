export const handlePlayPause = (blockElement) => {
  const video = blockElement.querySelector("video");
  const btnPP = blockElement.querySelector(".cbb-video-play-pause");
  if (video && btnPP) {
    const toggleClass = (elm, paused) => {
      elm.classList.toggle("paused", paused);
      elm.classList.toggle("playing", !paused);
    };

    video.addEventListener("play", () => {
      toggleClass(blockElement, false);
    });

    video.addEventListener("pause", () => {
      toggleClass(blockElement, true);
    });

    btnPP.addEventListener("click", () => {
      if (video?.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
};
