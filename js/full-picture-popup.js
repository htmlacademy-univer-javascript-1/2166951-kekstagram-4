import { isEscapeKey } from './utils.js';
import { createCommentTemplate } from './templates.js';
import { COMMENTS_STEP } from './constants.js';

let comments = null;
let commentsToShow = COMMENTS_STEP;

const bodyElement = document.querySelector('body');
const fullPicture = bodyElement.querySelector('.big-picture');
const commentCountElement = fullPicture.querySelector('.social__comment-count');
const commentsElement = fullPicture.querySelector('.social__comments');
const commentsLoader = fullPicture.querySelector('.social__comments-loader');
const exitButton = fullPicture.querySelector('.big-picture__cancel');

const renderFullPicture = ({ url, likes, description }) => {
  const picture = fullPicture.querySelector('.big-picture__img img');
  picture.src = url;
  picture.alt = description;

  fullPicture.querySelector('.social__caption').textContent = description;
  fullPicture.querySelector('.likes-count').textContent = likes;
};

const renderComments = () => {
  const visibleComments = comments.slice(0, commentsToShow);

  commentsElement.innerHTML = visibleComments
    .map((comment) => createCommentTemplate(comment))
    .join('');

  commentCountElement.textContent = `${visibleComments.length} из ${comments.length} комментариев`;

  if (visibleComments.length < comments.length) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
};


const onShowMoreComments = () => {
  commentsToShow += COMMENTS_STEP;
  renderComments();
};

const onCloseBtnClick = () => {
  closeFullViewPopup();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullViewPopup();
  }
};

function closeFullViewPopup() {
  comments = null;
  commentsToShow = COMMENTS_STEP;

  fullPicture.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  exitButton.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

export const openFullViewPopup = (picture) => {
  comments = picture.comments;

  renderFullPicture(picture);
  renderComments();

  fullPicture.classList.remove('hidden');
  commentCountElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  exitButton.addEventListener('click', onCloseBtnClick);
  commentsLoader.addEventListener('click', onShowMoreComments);
  document.addEventListener('keydown', onDocumentEscKeydown);
};
