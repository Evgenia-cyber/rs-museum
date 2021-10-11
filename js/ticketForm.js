const popup = document.querySelector('.popup-overlay');
// const form = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.close-popup-btn');
const buyBtn = document.querySelector('#buy-btn');
const dateInput = document.querySelector('input[type="date"]');
const infoDateDiv = document.querySelector('.info-date');
const timeInput = document.querySelector('input[type="time"]');
const infoTimeDiv = document.querySelector('.info-time');
const submitBtn = document.querySelector('#submit');

const now = new Date();

const minDate = now.toISOString().split('T')[0];

const minHours = now.getHours();
const minMinutes = now.getMinutes();

/* ******************** */
const setFormattedDate = () => {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(dateInput.value);
  const formattedDate = date.toLocaleString('en', options);

  infoDateDiv.textContent = formattedDate;
};

const getTimeString = (hours, minutes) => {
  if (hours < 10) hours += '0';
  if (minutes < 10) minutes += '0';
  return `${hours}:${minutes}`;
};

const setTime = () => {
  // время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут
  const newTime = timeInput.value;
  infoTimeDiv.textContent = newTime ? newTime : '--:--';
};

/* ******************** */
dateInput.min = minDate;
dateInput.value = minDate;
setFormattedDate();
setTime();

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

const formSubmitHandler = (event) => {
  console.log('form submit handler');
  event.preventDefault();

  return false;
};

// const formSubmitHandler1 = (event) => {
//   console.log('form submit');
//   event.preventDefault();

//   return false;
// };

/* ******************** */
buyBtn.addEventListener('click', openPopup);

closePopupBtn.addEventListener('click', closePopup);

popup.addEventListener('click', closePopupWhenPopupOverlayClicked);

dateInput.addEventListener('change', setFormattedDate);

timeInput.addEventListener('change', setTime);

// form.addEventListener('submit', formSubmitHandler1);

submitBtn.addEventListener('click', formSubmitHandler);
