/* from https://html5css.ru/howto/howto_js_image_comparison.php */

const compareSliderThumb = document.querySelector('.compare-slider-thumb');
const compareImageOverlay = document.querySelector('.compare-overlay');

/* ********************** */

const compareImages = (imageOverlay, thumb) => {
  const sliderWidth = 720;
  let isClicked = false;

  /* *********** */
  const slideCompareSlider = (x) => {
    /*resize the image:*/
    imageOverlay.style.width = x + 'px';
    /*position the slider:*/
    thumb.style.left = imageOverlay.offsetWidth - thumb.offsetWidth / 2 + 'px';
  };

  const getCursorPosition = (event) => {
    let x = 0;
    event = event || window.event;
    /*get the x positions of the image:*/
    imageOverlayObject = imageOverlay.getBoundingClientRect(); // получаем объект, который представляет собой наименьший прямоугольник, который содержит весь элемент, включая его отступы и ширину границы.
    /*calculate the cursor's x coordinate, relative to the image:*/
    x = event.pageX - imageOverlayObject.left;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    return x;
  };

  const slideMove = (event) => {
    /*if the slider is no longer clicked, exit this function:*/
    if (!isClicked) return false;
    /*get the cursor's x position:*/
    let position = getCursorPosition(event);
    /*prevent the slider from being positioned outside the image:*/
    if (position < 0) position = 0;
    if (position > sliderWidth) position = sliderWidth;
    /*execute a function that will resize the overlay image according to the cursor:*/
    slideCompareSlider(position);
  };

  const slideReady = (event) => {
    /*prevent any other actions that may occur when moving over the image:*/
    event.preventDefault();
    /*the thumb is now clicked and ready to move:*/
    isClicked = true;
    /*execute a function when the thumb is moved:*/
    window.addEventListener('mousemove', slideMove);
    window.addEventListener('touchmove', slideMove);
  };

  const slideFinish = () => {
    isClicked = false;
  };

  /* ************/
  thumb.addEventListener('mousedown', slideReady);

  window.addEventListener('mouseup', slideFinish);

  thumb.addEventListener('touchstart', slideReady);

  window.addEventListener('touchstop', slideFinish);
};

/* ********************** */

compareImages(compareImageOverlay, compareSliderThumb);
