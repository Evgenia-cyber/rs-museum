const nameInput = document.querySelector('.input-name');
const emailInput = document.querySelector('.input-email');
const telInput = document.querySelector('.input-tel');

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

/* ******************* */
const customNameValidate = () => {
  // валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы
  const value = nameInput.value;

  if (value === '') {
    addError(nameInput, 'Enter your name!');
    return;
  }

  if (
    value.length < 3 ||
    value.length > 15 ||
    !/^([а-яё\s]+|[a-z\s]+)$/i.test(value)
  ) {
    addError(
      nameInput,
      'Name must be between 3 and 15 characters. You can use spaces, letters of the English or Russian alphabet in lower or upper case',
    );
    return;
  }

  removeError(nameInput);
};

/* ******************* */
const customEmailValidate = () => {
  // валидация e-mail должна пропукать только адреса вида username@example.com, где:
  // username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов;
  // @ - символ собачки;
  // example - домен первого уровня состоит минимум из 4 латинских букв;
  // com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв
  const value = emailInput.value;

  if (value === '') {
    addError(emailInput, 'Enter your email!');
    return;
  }

  if (
    // @ - должен быть символ собачки;
    !/([@])/.test(value)
  ) {
    addError(emailInput, 'Email must contain @');
    return;
  }

  const emailArr = value.split('@');
  const username = emailArr[0];

  if (
    // username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов;
    username.length < 3 ||
    username.length > 15 ||
    !/^([\w\-]+)$/.test(username)
  ) {
    addError(
      emailInput,
      `Email username ${username} must be between 3 and 15 characters. You can use Latin letters, numbers, underscore, hyphen, must not contain spaces`,
    );
    return;
  }

  if (
    // topLevelDomain - домен верхнего уровня, отделяется от домена первого уровня точкой
    value.indexOf('.') === -1
  ) {
    addError(
      emailInput,
      `Email top-level domain must be separated from the first-level domain by a dot`,
    );
    return;
  }

  const domains = emailArr[1].split('.');
  const firstLevelDomain = domains[0];

  if (
    // firstLevelDomain - домен первого уровня состоит минимум из 4 латинских букв;
    firstLevelDomain.length < 4 ||
    !/^([a-z]+)$/.test(firstLevelDomain)
  ) {
    addError(
      emailInput,
      `Email first-level domain ${firstLevelDomain} must consist of at least 4 Latin letters`,
    );
    return;
  }

  const topLevelDomain = domains[1];

  if (
    // topLevelDomain - домен верхнего уровня состоит минимум из 2 латинских букв
    topLevelDomain.length < 2 ||
    !/^([a-z]+)$/.test(topLevelDomain)
  ) {
    addError(
      emailInput,
      `Email top-level domain ${topLevelDomain} must consists of at least 2 Latin letters`,
    );
    return;
  }

  if (
    // topLevelDomain - домен верхнего уровня, отделяется от домена первого уровня точкой
    value.indexOf(firstLevelDomain + '.') === -1
  ) {
    addError(
      emailInput,
      `Email top-level domain ${topLevelDomain} must be separated from the first-level domain ${firstLevelDomain} by a dot`,
    );
    return;
  }

  removeError(emailInput);
};

/* ******************* */
const customTelValidate = () => {
  // валидация номера телефона.
  // Номер телефона должен содержать не больше 10 цифр.
  // Цифры могут быть без разделения или с разделением на две или три цифры.
  // Разделение цифр может быть через дефис или пробел.

  const value = telInput.value;

  if (value === '') {
    addError(telInput, 'Enter your phone!');
    return;
  }

  //   const countOfDigits = parseInt(value.replace(/\D+/g, '')).toString().length;
  const countOfDigitsMatch = value.match(/\d/g);

  if (!countOfDigitsMatch) {
    addError(telInput, 'Enter your phone!');
    return;
  }

  const countOfDigits = countOfDigitsMatch.length;

  if (
    // Номер телефона должен содержать не больше 10 цифр.
    countOfDigits < 6 ||
    countOfDigits > 10
  ) {
    addError(
      telInput,
      'Phone number must be more than 6 and no more than 10 digits',
    );
    return;
  }

  const separatorMacth = value.match(/\D+/);

  if (
    // Цифры могут быть без разделения.
    !separatorMacth
  ) {
    removeError(telInput);
    return;
  }

  if (
    // Разделение цифр может быть через пробел или дефис.
    separatorMacth &&
    !/^([\d\s]+|[\d\-]+)$/.test(value)
  ) {
    addError(telInput, 'Numbers can be separated only by a hyphen or a space.');
    return;
  }

  const separator = separatorMacth[0];

  const valueArray = value.split(separator);
  const isSeparateValid = valueArray.every(
    (item) => item.length === 2 || item.length === 3,
  );

  if (
    // Цифры могут быть с разделением на две или три цифры.
    !isSeparateValid
  ) {
    addError(
      telInput,
      'The phone must start with a digit. The numbers can be without division or with division into two or three digits.',
    );
    return;
  }

  removeError(telInput);
};

/* ******************* */
const preventEvent = (event) => {
  if (event.code === 'Enter') {
    popup.style.transform = 'translateX(0)';
    formSubmitHandler(event);
    return false;
  }
};

/* ******************* */
nameInput.addEventListener('blur', customNameValidate);

emailInput.addEventListener('blur', customEmailValidate);

telInput.addEventListener('blur', customTelValidate);

nameInput.addEventListener('keyup', preventEvent);

emailInput.addEventListener('keyup', preventEvent);

telInput.addEventListener('keyup', preventEvent);
