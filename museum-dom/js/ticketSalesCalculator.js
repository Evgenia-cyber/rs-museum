const ticketTypesInputs = document.querySelectorAll(
  'input[name="ticket-type"]',
);
const decreaseButtons = document.querySelectorAll('.decrease-btn');
const increaseButtons = document.querySelectorAll('.increase-btn');
const numberOfBasicTicketsInput = document.querySelector(
  '#number-of-basic-tickets',
);

let numberOfBasicTickets = 0;
let numberOfSeniorTickets = 0;
let selectedTicketType = TICKET_TYPES[0];
let totalPrice = 0;

/* ****************** */
const changeTicketType = () => {
  console.log(1);
};

function increaseNumberOfTIckets() {
  this.previousElementSibling.stepUp()
}

function decreaseNumberOfTIckets() {
  this.nextElementSibling.stepDown()
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
