export const playVideo = (video) => {
  if (video) {
    video.play();
  }
};

export const stopVideo = (video) => {
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
};
