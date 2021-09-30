// from https://medium.com/@claudiaconceic/infinite-plain-javascript-slider-click-and-touch-events-540c8bd174f2

/* Welcome slider
 **************************************** */
const welcomeSlidesWrap = document.querySelector('.slides');
const welcomeSlides = document.querySelectorAll('.slide');
const welcomePrevBtn = document.querySelector('.to-prev-slide');
const welcomeNextBtn = document.querySelector('.to-next-slide');
const welcomeDots = document.querySelectorAll('.slide-dot');
const welcomeCurrentSlideNumber = document.querySelector(
  '.current-slide-number',
);

/* **************************************** */
const slide = (wrapper, slides, prevBtn, nextBtn, dots, currentSlideNumber) => {
  let posX1 = 0;
  let posX2 = 0;
  let posInitial = 0;
  let posFinal = 0;
  let threshold = 50; // пороговая величина, чтобы определить было ли смещение(т.е. должен ли слайд двигаться влево, вправо или вообще не должен двигаться)
  const slidesLength = slides.length;
  const dotsLength = dots.length;
  const slideSize = slides[0].offsetWidth; // 1000px = ширина слайдера
  let index = 0;
  let allowShift = true;

  // клонируем первый слайд и добавляем его в конец слайдов, а затем клонируем последний и перемещаем его в начало нашего списка слайдов.
  // Цель этого - увидеть последний слайд, если мы скользим назад на первом слайде, и первый слайд, если мы скользим вперед на последнем слайде.
  const firstSlide = slides[0];
  const lastSlide = slides[slidesLength - 1];
  const cloneFirst = firstSlide.cloneNode(true);
  const cloneLast = lastSlide.cloneNode(true);
  wrapper.appendChild(cloneFirst);
  wrapper.insertBefore(cloneLast, firstSlide);

  const dragStart = (e) => {
    e = e || window.event;
    e.preventDefault();
    posInitial = wrapper.offsetLeft; //-1000px = ширина слайдера

    posX1 = e.clientX;

    // Событие вызывается при нажатии на указательное устройство (например, мышь или сенсорную панель) и наступает, в то время как указатель находится на элементе. Событие mouseup является противоположным mousedown.
    document.addEventListener('mouseup', dragEnd);

    // Событие вызывается элементом, когда указательное устройство (обычно мышь) перемещается и курсор находится внутри него.
    document.addEventListener('mousemove', dragAction);
  };

  const dragAction = (e) => {
    e = e || window.event;

    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
    wrapper.style.left = wrapper.offsetLeft - posX2 + 'px';
  };

  const dragEnd = (e) => {
    posFinal = wrapper.offsetLeft;

    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag'); // смещаем на один слайд влево
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag'); // смещаем на один слайд вправо
    } else {
      wrapper.style.left = posInitial + 'px'; // не смещаем
    }

    // сбрасываем события onmouseup и onmousemove, когда пользователь завершает взаимодействие. Иначе бесконечное движение полосы картинок за движением мыши
    //  document.onmouseup = null;
    //  document.onmousemove = null;
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('mousemove', dragAction);
  };

  const shiftSlide = (dir, action) => {
    wrapper.classList.add('shifting'); // добавляем css transition для плавного смещения изображений

    if (index >= 0 && index < dotsLength) {
      dots[index].classList.remove('active');
    }

    if (allowShift) {
      if (!action) {
        posInitial = wrapper.offsetLeft;
      }

      if (dir == 1) {
        wrapper.style.left = posInitial - slideSize + 'px';
        index++;
      } else if (dir == -1) {
        wrapper.style.left = posInitial + slideSize + 'px';
        index--;
      }
    }

    // Чтобы подсвечивать буллет активного слайда и показывать номер активного слайда
    if (index >= 0 && index < dotsLength) {
      dots[index].classList.add('active');
      if (currentSlideNumber) {
        currentSlideNumber.textContent = `0${index + 1}`;
      }
    }
    if (index < 0) {
      dots[dotsLength - 1].classList.add('active');
      if (currentSlideNumber) {
        currentSlideNumber.textContent = `0${dotsLength}`;
      }
    }
    if (index >= dotsLength) {
      dots[0].classList.add('active');
      if (currentSlideNumber) {
        currentSlideNumber.textContent = '01';
      }
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
      wrapper.style.left = -(slidesLength * slideSize) + 'px';
      index = slidesLength - 1;
    }

    if (index === slidesLength) {
      wrapper.style.left = -(1 * slideSize) + 'px';
      index = 0;
    }

    allowShift = true;
  };
  /* **************************************** */
  // Mouse events - событие запускается в момент первоначального нажатия кнопки.
  //   wrapper.onmousedown = dragStart;
  wrapper.addEventListener('mousedown', dragStart);

  // Touch events
  //   items.addEventListener('touchstart', dragStart);
  //   items.addEventListener('touchend', dragEnd);
  //   items.addEventListener('touchmove', dragAction);

  // Click events
  prevBtn.addEventListener('click', () => {
    shiftSlide(-1);
  });
  nextBtn.addEventListener('click', () => {
    shiftSlide(1);
  });

  // Transition events - cобытие вызывается, когда переход CSS transition завершен
  wrapper.addEventListener('transitionend', checkIndex);
};

/* **************************************** */
slide(
  welcomeSlidesWrap,
  welcomeSlides,
  welcomePrevBtn,
  welcomeNextBtn,
  welcomeDots,
  welcomeCurrentSlideNumber,
);
