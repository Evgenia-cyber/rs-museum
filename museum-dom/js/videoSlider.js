const videoSlidesWrap = document.querySelector('.videos');
const videoSlides = document.querySelectorAll('.video-slide');
const videoPrevBtn = document.querySelector('.video-slider-prev');
const videoNextBtn = document.querySelector('.video-slider-next');
const videoDots = document.querySelectorAll('.video-slider-dot');
/* ************************ */

const slideVideo = (wrapper, slides, prevBtn, nextBtn, dots) => {
  let posX1 = 0;
  let posX2 = 0;
  let posInitial = 0;
  let posFinal = 0;
  const slidesLength = slides.length;
  const dotsLength = dots.length;
  const slideWidth = slides[0].offsetWidth; // ширина одного слайда
  let index = 0;
  let allowShift = true;

  // клонируем первый слайд и добавляем его в конец слайдов, а затем клонируем последний и перемещаем его в начало нашего списка слайдов.
  // Цель этого - увидеть последний слайд, если мы скользим назад на первом слайде, и первый слайд, если мы скользим вперед на последнем слайде.
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const preLastSlide = slides[slidesLength - 2];
  const lastSlide = slides[slidesLength - 1];
  const cloneFirst = firstSlide.cloneNode(true);
  const cloneSecond = secondSlide.cloneNode(true);
  const clonePreLast = preLastSlide.cloneNode(true);
  const cloneLast = lastSlide.cloneNode(true);
  wrapper.appendChild(cloneFirst);
  wrapper.appendChild(cloneSecond);
  wrapper.insertBefore(cloneLast, firstSlide);
  wrapper.insertBefore(clonePreLast, cloneLast);

  const shiftSlide = (shiftTo) => {
    wrapper.classList.add('shifting'); // добавляем css transition для плавного смещения изображений

    if (index >= 0 && index < dotsLength) {
      dots[index].classList.remove('active');
    }

    if (allowShift) {
      posInitial = wrapper.offsetLeft;

      const difference = index - shiftTo;
      index = shiftTo;
      wrapper.style.left = posInitial + difference * slideWidth + 'px';
    }

    // Чтобы подсвечивать буллет активного слайда
    if (index >= 0 && index < dotsLength) {
      dots[index].classList.add('active');
    }
    if (index < 0) {
      dots[dotsLength - 1].classList.add('active');
    }
    if (index >= dotsLength) {
      dots[0].classList.add('active');
    }

    allowShift = false;
  };

  // Meтод вызывается событием transitionend.
  // Слайдер должен быть бесконечным. Когда он отображает первый слайд, он должен позволять пользователю переходить к предыдущему, (клонированию) последнего слайда - вот почему мы клонировали первый и последний слайды.
  // Но что произойдет, если пользователь захочет вернуться назад и увидеть предпоследний элемент?
  // Следует ли нам клонировать и этот предмет?
  // Не совсем.
  // Мы обновим положение контейнера элементов, чтобы он переместился к реальному последнему элементу (а не к его клону), чтобы пользователь не заметил его:
  // 1) удаляем класс CSS "shifting" - поэтому элемент не имеет перехода CSS (таким образом, мы можем перемещать элемент, не будучи заметными для пользователя),
  // 2) перемещаем контейнер слайдов, чтобы показать настоящий слайд,
  // 3) обновляем индекс
  // 4) устанавливаем allowShift = true, что позволит пользователю снова взаимодействовать со слайдером
  // Обратите внимание, что мы вызываем этот метод при transitionend событии, чтобы убедиться, что он выполняется только после завершения перехода между двумя слайдами.
  const checkIndex = () => {
    wrapper.classList.remove('shifting');

    if (index === -1) {
      wrapper.style.left = -((slidesLength+1) * slideWidth) + 'px';
      index = slidesLength - 1;
    }

    if (index === slidesLength) {
      wrapper.style.left = -(2 * slideWidth) + 'px';
      index = 0;
    }

    allowShift = true;
  };
  /* **************************************** */

  // Click events
  prevBtn.addEventListener('click', () => {
    shiftSlide(index - 1);
  });
  nextBtn.addEventListener('click', () => {
    shiftSlide(index + 1);
  });

  // Transition events - cобытие вызывается, когда переход CSS transition завершен
  wrapper.addEventListener('transitionend', checkIndex);

  for (let i = 0; i < dotsLength; i++) {
    dots[i].addEventListener('click', () => {
      allowShift = true;
      shiftSlide(i);
    });
  }
};

/* ************************ */
slideVideo(videoSlidesWrap, videoSlides, videoPrevBtn, videoNextBtn, videoDots);
