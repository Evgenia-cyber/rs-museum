const ticketTypesInputs = document.querySelectorAll(
  'input[name="ticket-type"]',
);
const decreaseButtons = document.querySelectorAll('.decrease-btn');
const increaseButtons = document.querySelectorAll('.increase-btn');
const numberOfBasicTicketsInput = document.querySelector(
  '#number-of-basic-tickets',
);
const numberOfSeniorTicketsInput = document.querySelector(
  '#number-of-senior-tickets',
);
const totalPrice = document.querySelector('#total-price');

/* ****************** */
const setDataFromLocalStorage = () => {
  if (window.localStorage.getItem('museum') !== null) {
    const museumData = JSON.parse(window.localStorage.getItem('museum'));

    console.log('museumData', museumData);
    numberOfBasicTicketsInput.value = museumData.numberOfBasicTickets;
    numberOfSeniorTicketsInput.value = museumData.numberOfSeniorTickets;
    ticketTypesInputs[museumData.selectedTicketType].checked = true;
    totalPrice.textContent = museumData.totalPrice;
  }
};

const saveDataInLocalStorage = () => {
  const museumData = {
    numberOfBasicTickets: numberOfBasicTicketsInput.value,
    numberOfSeniorTickets: numberOfSeniorTicketsInput.value,
    selectedTicketType: document.querySelector(
      'input[name="ticket-type"]:checked',
    ).value,
    totalPrice: totalPrice.textContent,
  };
  window.localStorage.setItem('museum', JSON.stringify(museumData));
};

const calculateTotalPrice = (ticketType) => {
  const index = Number(ticketType);
  totalPrice.textContent =
    numberOfBasicTicketsInput.value * BASIC_TICKETS_PRICE[index] +
    numberOfSeniorTicketsInput.value * SENIOR_TICKETS_PRICE[index];
};

const changeTicketType = () => {
  calculateTotalPrice(
    document.querySelector('input[name="ticket-type"]:checked').value,
  );
  saveDataInLocalStorage();
};

function increaseNumberOfTIckets() {
  this.previousElementSibling.stepUp();
  calculateTotalPrice(
    document.querySelector('input[name="ticket-type"]:checked').value,
  );
  saveDataInLocalStorage();
}

function decreaseNumberOfTIckets() {
  this.nextElementSibling.stepDown();
  calculateTotalPrice(
    document.querySelector('input[name="ticket-type"]:checked').value,
  );
  saveDataInLocalStorage();
}

/* ****************** */
ticketTypesInputs.forEach((input) =>
  input.addEventListener('change', changeTicketType),
);

increaseButtons.forEach((button) =>
  button.addEventListener('click', increaseNumberOfTIckets),
);

decreaseButtons.forEach((button) =>
  button.addEventListener('click', decreaseNumberOfTIckets),
);

// window.addEventListener('load', setDataFromLocalStorage);

document.addEventListener('DOMContentLoaded', setDataFromLocalStorage);
