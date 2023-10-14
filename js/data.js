import { PICTURES_COUNT } from './constants.js';
import { createPicture } from './models.js';

export const getPictures = () => Array.from(
  { length: PICTURES_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);
