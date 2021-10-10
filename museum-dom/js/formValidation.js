const nameInput = document.querySelector('.input-name');

/* ******************* */
const addError = (element, text) => {
  element.style.border = '1px solid red';
  const error = element.nextElementSibling;
  error.textContent = text;
};

const removeError = (element) => {
  element.style.border = '1px solid green';
  const error = element.nextElementSibling;
  error.textContent = '';
};

const customNameValidate = (event) => {
  console.log('11');

  // валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы
  const value = nameInput.value;

  const namePattern = '/^([а-яёs]+|[a-zs]+)$/i';
  const nameReg = new RegExp(namePattern, '');
  console.log(value);

  if (value === '') {
    addError(nameInput, 'Enter your name!');
    event.preventDefault();
  } else if (
    value.length < 3 ||
    value.length > 15 ||
    !/^([а-яё\s]+|[a-z\s]+)$/i.test(nameInput.value)
  ) {
    addError(
      nameInput,
      'Name must be between 3 and 15 characters. You can use spaces, letters of the English or Russian alphabet in lower or upper case',
    );
    event.preventDefault();
  } else {
    removeError(nameInput);
  }
};


/* ******************* */
nameInput.addEventListener('blur', customNameValidate);
