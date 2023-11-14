const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
};

//Перемешивание элементов массива в случайном порядке
const shufflePhotos = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//Сортировка массива по убыванию комментариев
const sortPhotos = (array) => {
  array.sort((a, b) => b.comments.length - a.comments.length);

  return array;
};

export {getRandomPositiveInteger, getRandomArrayElement, isEscapeKey, debounce, shufflePhotos, sortPhotos};
