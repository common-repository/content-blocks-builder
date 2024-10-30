window.addEventListener(
  "cbb.carousel.afterInit",
  function ({ detail: { swiper } }) {
    const carouselNode = swiper.el.parentNode;
    if (carouselNode.classList.contains("has-preloader")) {
      let sibling = carouselNode.firstElementChild;
      while (sibling) {
        if (sibling.classList.contains("cbb-loader")) {
          sibling.remove();
          break;
        }
        sibling = sibling.nextElementSibling; // Move to the next sibling
      }
    }
  },
);
