//Функция для проверки длины строки
const checkLength = (string, length) => string.length <= length;
checkLength('321321', 4);

//Функция с проверкой на палиндром
const isPalindrome = (string) => {

  string = string.replaceAll(' ', '');
  string = string.toLowerCase();

  let reversed = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
  }

  if (string === reversed) {
    return 'Ура, палиндром :3';
  }

  return 'Меня обманули, это не палиндром :C';
};
isPalindrome('Лёша на полке клопа нашёл ');


//Функция для извлечения чисел из строки
const extractNumbers = (string) => {
  let result = '';

  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  if (result === '') {
    return NaN;
  }

  return Number(result);
};
extractNumbers(-2023);
