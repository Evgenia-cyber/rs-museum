const nameInput = document.querySelector('.input-name');
const emailInput = document.querySelector('.input-email');

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

/* ******************* */
nameInput.addEventListener('blur', customNameValidate);

emailInput.addEventListener('blur', customEmailValidate);
