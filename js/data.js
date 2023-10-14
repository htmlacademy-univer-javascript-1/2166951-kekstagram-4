import { POSTS_COUNT } from './constants.js';
import { createPost } from './models.js';

export const getPosts = () => Array.from(
  { length: POSTS_COUNT },
  (_, postIndex) => createPost(postIndex + 1),
);
