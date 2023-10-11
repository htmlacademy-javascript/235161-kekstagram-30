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
  'Ахиллес',
  'Арес',
  'Дионис'
];

const DESCRIPTIONS = [
  'Снимок заката на океане, где небо окрашено в яркие оттенки оранжевого и розового.',
  'Портрет счастливой семьи, гуляющей в парке, улучшающей летний день.',
  'Фотография пышных гор на фоне ясного голубого неба.',
  'Макро снимок капель дождя на листьях, отражающих мир в своих каплях.',
  'Архитектурный кадр с изогнутым мостом в городском парке.',
  'Морская панорама с величественными волнами и маяком на горизонте.',
  'Пейзаж с горным хребтом, покрытым снегом, и заснеженной деревней внизу.',
  'Мистический лес с солнечными лучами, проникающими сквозь деревья.',
  'Фото цветущего вишневого дерева в весеннем саду.',
  'Портрет собаки, счастливо играющей на пляже.',
  'Городской пейзаж с ночными огнями и множеством автомобилей.',
  'Макро снимок падающих капель дождя на асфальте.',
  'Портрет молодой художницы, окруженной своими произведениями.',
  'Абстрактное искусство с яркими красками и геометрическими фигурами.',
  'Пейзаж с золотистыми полями и старой ветряной мельницей.',
  'Фотография старинного книжного магазина с полками, набитыми книгами.',
  'Архитектурный снимок древнего замка с мостом через ров.',
  'Снимок городской улицы в дождливый день, отражающейся в мокрых асфальтовых дорогах.',
  'Портрет молодой балерины в костюме, выполняющей изящные движения.',
  'Морской закат с игрой отражений на воде и мягкими пастельными оттенками.'
];

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const generatedValues = [];

  return () => {

    let currentGeneratedValue = getRandomPositiveInteger(min, max);

    if (generatedValues.length >= (max - min + 1)) {
      return null;
    }

    while (generatedValues.includes(currentGeneratedValue)) {
      currentGeneratedValue = getRandomPositiveInteger(min, max);
    }

    generatedValues.push(currentGeneratedValue);
    return currentGeneratedValue;
  };
};

const generatePhotoId = createRandomIdFromRangeGenerator(2, 25);
const generateImgUrlId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 1000);
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const generateCommentMessage = () => {
  let commentMessage = '';
  const generatedMessagePart = getRandomArrayElement(COMMENT_MESSAGES);
  let anotherGeneratedMessagePart = getRandomArrayElement(COMMENT_MESSAGES);
  const messageParts = getRandomPositiveInteger(1, 2);

  if (messageParts > 1) {
    while (generatedMessagePart === anotherGeneratedMessagePart) {
      anotherGeneratedMessagePart = getRandomArrayElement(COMMENT_MESSAGES);
    }
    commentMessage += generatedMessagePart + anotherGeneratedMessagePart;
    return commentMessage;
  }

  commentMessage += generatedMessagePart;
  return commentMessage;
};

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomPositiveInteger(1, 6) }.svg`,
  message: generateCommentMessage(),
  name: getRandomArrayElement(AUTHOR_NAMES)
});

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${ generateImgUrlId() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comment: Array.from({length: getRandomPositiveInteger(0, 30)}, generateComment)
});

const getPhotoDescriptions = Array.from({length: 20}, createPhotoDescription);
export {getPhotoDescriptions};
