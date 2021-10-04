const welcomeSlidesWrap = document.querySelector('.slides');
const welcomeSlides = document.querySelectorAll('.slide');
const welcomePrevBtn = document.querySelector('.to-prev-slide');
const welcomeNextBtn = document.querySelector('.to-next-slide');
const welcomeDots = document.querySelectorAll('.slide-dot');
const welcomeCurrentSlideNumber = document.querySelector(
  '.current-slide-number',
);

slide(
  welcomeSlidesWrap,
  welcomeSlides,
  welcomePrevBtn,
  welcomeNextBtn,
  welcomeDots,
  welcomeCurrentSlideNumber,
);
