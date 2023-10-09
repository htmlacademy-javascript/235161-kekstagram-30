const checkLength = (string, length) => string.length <= length;
checkLength('321321', 4);

const isPalindrome = (string) => {

  string = string.replaceAll(' ', '');
  string = string.toLowerCase();

  let reversed = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
  }

  return string === reversed ? 'Ура, палиндром :3' : 'Меня обманули, это не палиндром :C';
};
isPalindrome('Лёша на полке клопа нашёл ');

const extractNumbers = (string) => {
  let result = '';

  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
};
extractNumbers(-2023);
