// Моковые данные для заполнения объектов

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHOR_NAMES = [
  'Артемида',
  'Афина',
  'Афродита',
  'Зевс',
  'Танатос',
  'Никс',
  'Загрей',
  'Аид',
  'Ахилес'
];

//Функция для генерации случайного целого числа

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];


// Функия для создания объектов
const createObject = () => {
  return {
    id: '',
    url: '',
    description: '',
    likes: '',
    comment: {
      id: '',
      avatar: '',
      message: '',
      name: ''
    }
  };
};
