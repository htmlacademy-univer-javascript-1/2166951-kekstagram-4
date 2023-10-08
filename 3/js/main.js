//#region Constants
const POSTS_COUNT = 25;

const POST_DESCRIPTIONS = [
  'Закат на пляже',
  'Городская панорама ночью',
  'Зимний лес',
  'Макро съемка цветка',
  'Архитектурные детали здания',
  'Пейзаж с горами',
  'Городской фонарь в тумане',
  'Мост через реку',
  'Парк с вишневыми деревьями весной',
  'Портрет девушки в черно-белом стиле',
  'Собака играет на пляже',
  'Закат в горах',
  'Абстрактное искусство',
  'Расцветающее поле под солнцем',
  'Старая улица в Европе',
  'Макро съемка бабочки',
  'Природа весной',
  'Пейзаж с водопадом',
  'Городская архитектура',
  'Портрет мужчины',
  'Зимний город ночью',
  'Рыбак на рассвете',
  'Пейзаж с озером',
  'Рабочий процесс в офисе',
  'Автомобиль на закате',
];

const NAMES = [
  'Анна',
  'Иван',
  'Мария',
  'Александр',
  'Екатерина',
  'Дмитрий',
  'Ольга',
  'Михаил',
  'Елена',
  'Павел'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
//#endregion

const createIdGenerator = () => {
  let lastGenerateId = 0;

  return () => {
    lastGenerateId++;
    return lastGenerateId;
  };
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generatePostId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPost = () => ({
  id: generatePostId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(POST_DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

const posts = Array.from({length: POSTS_COUNT }, createPost);

posts(); // Чтобы не было ошибок ESLint
// console.log(posts);
