const ticketTypesInputs = document.querySelectorAll(
  'input[name="ticket-type"]',
);
const decreaseButtons = document.querySelectorAll('.decrease-btn');
const increaseButtons = document.querySelectorAll('.increase-btn');
const numberOfBasicTicketsInputs = document.querySelectorAll(
  '.number-of-basic-tickets',
);
const numberOfSeniorTicketsInputs = document.querySelectorAll(
  '.number-of-senior-tickets',
);
const totalPriceSpans = document.querySelectorAll('.total-price');
const basicTotalPriceSpan = document.querySelector('.total-cost-basic');
const seniorTotalPriceSpan = document.querySelector('.total-cost-senior');
const costOneBasicSpans = document.querySelectorAll('.cost-basic');
const costOneSeniorSpans = document.querySelectorAll('.cost-senior');
const infoTicketTypeDiv = document.querySelector('.info-ticket-type');
const select = document.querySelector('#ticket-type');
const selectOptions = Array.from(select.getElementsByTagName('option'));

/* ****************** */
const setSelectedOption = (ticketType) => {
  selectOptions.forEach((option) => {
    if (option.value === ticketType) {
      option.selected = true;
    }
  });
};

const setCheckedInput = (index) => {
  ticketTypesInputs[index].checked = true;
};

const setCostOneForBasicAndSenior = (ticketType) => {
  costOneBasicSpans.forEach(
    (span) => (span.textContent = BASIC_TICKETS_PRICE[ticketType]),
  );

  costOneSeniorSpans.forEach(
    (span) => (span.textContent = SENIOR_TICKETS_PRICE[ticketType]),
  );
};

const setDataFromLocalStorage = () => {
  if (window.localStorage.getItem('museum') !== null) {
    const museumData = JSON.parse(window.localStorage.getItem('museum'));

    const index = museumData.selectedTicketType;

    numberOfBasicTicketsInputs.forEach(
      (input) => (input.value = museumData.numberOfBasicTickets),
    );

    numberOfSeniorTicketsInputs.forEach(
      (input) => (input.value = museumData.numberOfSeniorTickets),
    );

    setCheckedInput(index);

    totalPriceSpans.forEach(
      (span) => (span.textContent = museumData.totalPrice),
    );

    basicTotalPriceSpan.textContent = museumData.basicTotalPrice;

    seniorTotalPriceSpan.textContent = museumData.seniorTotalPrice;

    setCostOneForBasicAndSenior(index);

    infoTicketTypeDiv.textContent = TICKET_TYPES[index];

    setSelectedOption(index);
  }
};

const saveDataInLocalStorage = () => {
  const museumData = {
    numberOfBasicTickets: numberOfBasicTicketsInputs[0].value,
    numberOfSeniorTickets: numberOfSeniorTicketsInputs[0].value,
    selectedTicketType: document.querySelector(
      'input[name="ticket-type"]:checked',
    ).value,
    totalPrice: totalPriceSpans[0].textContent,
    basicTotalPrice: basicTotalPriceSpan.textContent,
    seniorTotalPrice: seniorTotalPriceSpan.textContent,
  };
  window.localStorage.setItem('museum', JSON.stringify(museumData));
};

const calculateTotalPrice = (ticketType) => {
  const index = Number(ticketType);

  const newBasicTotalPrice =
    numberOfBasicTicketsInputs[0].value * BASIC_TICKETS_PRICE[index];
  basicTotalPriceSpan.textContent = newBasicTotalPrice.toFixed(2);

  const newSeniorTotalPrice =
    numberOfSeniorTicketsInputs[0].value * SENIOR_TICKETS_PRICE[index];
  seniorTotalPriceSpan.textContent = newSeniorTotalPrice.toFixed(2);

  const newTotalPrice = (newBasicTotalPrice + newSeniorTotalPrice).toFixed(2);
  totalPriceSpans.forEach((span) => (span.textContent = newTotalPrice));
};

const changeTicketType = (ticketType) => {
  calculateTotalPrice(ticketType);

  infoTicketTypeDiv.textContent = TICKET_TYPES[ticketType];

  setCostOneForBasicAndSenior(ticketType);

  saveDataInLocalStorage();
};

const changeTicketTypeFromInput = () => {
  const value = document.querySelector(
    'input[name="ticket-type"]:checked',
  ).value;

  setSelectedOption(value);

  changeTicketType(value);
};

const changeTicketTypeFromSelect = () => {
  const value = select.options[select.selectedIndex].value;

  setCheckedInput(value);

  changeTicketType(value);
};

function increaseNumberOfTIckets() {
  const nearestInput = this.previousElementSibling;

  if (nearestInput.classList.contains('number-of-basic-tickets')) {
    numberOfBasicTicketsInputs.forEach((input) => input.stepUp());
  } else {
    numberOfSeniorTicketsInputs.forEach((input) => input.stepUp());
  }

  calculateTotalPrice(
    document.querySelector('input[name="ticket-type"]:checked').value,
  );
  saveDataInLocalStorage();
}

function decreaseNumberOfTIckets() {
  const nearestInput = this.nextElementSibling;

  if (nearestInput.classList.contains('number-of-basic-tickets')) {
    numberOfBasicTicketsInputs.forEach((input) => input.stepDown());
  } else {
    numberOfSeniorTicketsInputs.forEach((input) => input.stepDown());
  }

  calculateTotalPrice(
    document.querySelector('input[name="ticket-type"]:checked').value,
  );
  saveDataInLocalStorage();
}

/* ****************** */
ticketTypesInputs.forEach((input) =>
  input.addEventListener('change', changeTicketTypeFromInput),
);

select.addEventListener('change', changeTicketTypeFromSelect);

increaseButtons.forEach((button) =>
  button.addEventListener('click', increaseNumberOfTIckets),
);

decreaseButtons.forEach((button) =>
  button.addEventListener('click', decreaseNumberOfTIckets),
);

// window.addEventListener('load', setDataFromLocalStorage);

document.addEventListener('DOMContentLoaded', setDataFromLocalStorage);
