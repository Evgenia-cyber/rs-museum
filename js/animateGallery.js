// from https://www.youtube.com/watch?v=uzRsENVD3W8

const galleryImages = document.querySelectorAll('.gallery-img');

/* ******************** */
// чтобы запускать функцию каждые period миллисекунд
function optimizeFunctionCall(func, period = 20, immediate = true) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, period);

    if (callNow) func.apply(context, args);
  };
}

/* ******************** */
// При прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания.
function showAnimatedImages(event) {
  // показывает, сколько раз было вызвано событие
  //   console.count(event);

  galleryImages.forEach((image) => {
    // scrollY - Свойство Window интерфейса только для чтения - возвращает количество пикселей, на которое документ прокручивается по вертикали в данный момент.
    const heightOfScrolling = window.scrollY;

    const imageHeight = image.height;

    const imageOffset = image.getBoundingClientRect();

    // расстояние от начала документа до начала изображения
    const imageOffsetTop = heightOfScrolling + imageOffset.top;

    // расстояние от начала документа до низа изображения
    const imageBottom = imageOffsetTop + imageHeight;

    // расстояние от начала документа до позиции, когда изображение должно показываться(т.е. когда от начала окна браузера будет видно 30% от высоты изображения)
    const imageShouldBeShownFrom = imageOffsetTop - 1.3 * imageHeight;

    const isTimeToShowImage = heightOfScrolling > imageShouldBeShownFrom;

    const isImageNotScrolledToEnd = heightOfScrolling < imageBottom;

    if (isTimeToShowImage && isImageNotScrolledToEnd) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  });
}

/* ******************** */
window.addEventListener('scroll', optimizeFunctionCall(showAnimatedImages, 10));
