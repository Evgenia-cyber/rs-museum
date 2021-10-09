const popup = document.querySelector('.popup-overlay');
const closePopupBtn = document.querySelector('.close-popup-btn');
const buyBtn = document.querySelector('#buy-btn');

/* ******************** */
const openPopup = () => {
  popup.classList.add('active');
};

const closePopup = (event) => {
  event.preventDefault();
  popup.classList.remove('active');
};

const closePopupWhenPopupOverlayClicked = (event) => {
    if (event.target === popup) {
      popup.classList.remove('active');
    }
};

/* ******************** */
buyBtn.addEventListener('click', openPopup);

closePopupBtn.addEventListener('click', closePopup);

popup.addEventListener('click', closePopupWhenPopupOverlayClicked);
