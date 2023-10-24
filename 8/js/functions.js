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

const convertToMinutes = (string) => {
  string = string.split(':');

  const hours = parseInt(string[0], 10);
  const minutes = parseInt(string[1], 10);

  const convert = hours * 60;
  const totalMinutes = convert + minutes;

  return totalMinutes;
};

const isMeetingLegit = (dayStart, dayEnd, meetingStart, meetingLength) => {

  const minutesDayStart = convertToMinutes(dayStart);
  const minutesDayEnd = convertToMinutes(dayEnd);
  const minutesMeeting = convertToMinutes(meetingStart);

  if (minutesDayEnd > minutesDayStart) {
    const meetingDuration = minutesMeeting + meetingLength;

    if (meetingDuration <= minutesDayEnd && minutesMeeting >= minutesDayStart) {
      return true;
    }

    return false;
  }

  return false;
};

isMeetingLegit('08:00', '17:30', '14:00', 90);// true
isMeetingLegit('8:0', '10:0', '8:0', 120);// true
isMeetingLegit('08:00', '14:30', '14:00', 90);// false
isMeetingLegit('14:00', '17:30', '08:0', 90);// false
isMeetingLegit('8:00', '17:30', '08:00', 900);// false
