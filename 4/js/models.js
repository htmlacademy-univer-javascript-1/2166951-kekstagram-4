import {
  createIdGenerator,
  getRandomInteger,
  getRandomArrayElement,
} from './utils.js';

import {
  AVATAR_COUNT,
  POST_DESCRIPTIONS,
  LIKES_COUNT,
  NAMES,
  COMMENT_MESSAGES,
  COMMENTS_COUNT,
} from './constants.js';

export const generateCommentId = createIdGenerator();

export const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(NAMES),
});

export const createPost = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(POST_DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENTS_COUNT) },
    createComment
  ),
});
