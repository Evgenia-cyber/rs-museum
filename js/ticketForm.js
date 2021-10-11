const popup = document.querySelector('.popup-overlay');
// const form = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.close-popup-btn');
const buyBtn = document.querySelector('#buy-btn');
const dateInput = document.querySelector('input[type="date"]');
const infoDateDiv = document.querySelector('.info-date');
const timeSelect = document.querySelector('#time');
// const timeInput = document.querySelector('input[type="time"]');
const infoTimeDiv = document.querySelector('.info-time');
const submitBtn = document.querySelector('#submit');
const allInputsWhichHasValidate = document.querySelectorAll('.has-validate');

const now = new Date();

const minDate = now.toISOString().split('T')[0];

// let minHours = now.getHours();
// let minMinutes = now.getMinutes();

// if (minMinutes <= 30) {
//   minMinutes = 30;
// } else {
//   minMinutes = 0;
//   minHours += 1;
// }

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
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  return `${hours}:${minutes}`;
};

const setTime = () => {
  // const newTime = timeInput.value;
  const newTime = timeSelect.options[timeSelect.selectedIndex].textContent;
  infoTimeDiv.textContent = newTime;
};

/* ******************** */
let hours = MIN_OPENING_HOURS;
let minutes = 0;

// время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут
for (let i = 0; i < NUMBER_OF_VALID_TIMESELECT_OPTIONS; i++) {
  if (i > 0 && i % 2 === 0) {
    minutes = 0;
    hours += 1;
  } else if (i % 2 !== 0) {
    minutes = 30;
  }
  const validTime = getTimeString(hours, minutes);
  const option = document.createElement('option');
  option.value = i + 1;
  option.innerHTML = validTime;
  timeSelect.appendChild(option);
}

/* ******************** */
dateInput.min = minDate;
dateInput.value = minDate;
setFormattedDate();

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

  allInputsWhichHasValidate.forEach((input) => {
    input.focus();
    input.blur();
  });

  return false;
};

/* ******************** */
buyBtn.addEventListener('click', openPopup);

closePopupBtn.addEventListener('click', closePopup);

popup.addEventListener('click', closePopupWhenPopupOverlayClicked);

dateInput.addEventListener('change', setFormattedDate);

// timeInput.addEventListener('change', setTime);

timeSelect.addEventListener('change', setTime);

// form.addEventListener('submit', formSubmitHandler);

submitBtn.addEventListener('click', formSubmitHandler);
