import { isEscapeKey, isImageFile } from './utils.js';
import { MAX_COUNT_HASHTAGS, HASHTAG_ERRORS, HASHTAG_REGEX } from './constants.js';

const bodyElement = document.querySelector('body');
const formElement = bodyElement.querySelector('.img-upload__form');
const fileInput = formElement.querySelector('.img-upload__input');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const exitButton = overlayElement.querySelector('.img-upload__cancel');
const commentInput = overlayElement.querySelector('.text__description');
const hashtagsInput = overlayElement.querySelector('.text__hashtags');

let formValidator = null;

const splitHashtagInput = (value) => value.trim().split(' ');

const isValidHashtag = (value) => value
  ? splitHashtagInput(value).every((hashtag) => HASHTAG_REGEX.test(hashtag))
  : true;

const isCountValidHashtag = (value) => splitHashtagInput(value).length <= MAX_COUNT_HASHTAGS;

const isUniqueValidHashtag = (value) => {
  const hashtags = splitHashtagInput(value).map((hastag) => hastag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const initValidation = () => {
  formValidator = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper-error-text',
  });

  formValidator.addValidator(
    hashtagsInput,
    isValidHashtag,
    HASHTAG_ERRORS.IS_NOT_VALID,
  );

  formValidator.addValidator(
    hashtagsInput,
    isUniqueValidHashtag,
    HASHTAG_ERRORS.IS_NOT_UNIQUE,
  );

  formValidator.addValidator(
    hashtagsInput,
    isCountValidHashtag,
    HASHTAG_ERRORS.IS_NOT_VALID_COUNT,
  );
};


const onFormSubmit = (evt) => {
  evt.preventDefault();
  formValidator.validate();
};

const onCloseBtnClick = () => {
  closeCreatePopup();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeCreatePopup();
  }
};

const onInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onFileInputChange = () => {
  const file = fileInput.files[0];
  if (isImageFile(file)) {
    openCreatePopup();
  }
};

function closeCreatePopup() {
  formValidator.reset();
  formElement.reset();

  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  formElement.removeEventListener('submit', onFormSubmit);
  exitButton.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  commentInput.removeEventListener('keydown', onInputEscKeydown);
  hashtagsInput.removeEventListener('keydown', onInputEscKeydown);
}

function openCreatePopup () {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  initValidation();

  formElement.addEventListener('submit', onFormSubmit);
  exitButton.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  commentInput.addEventListener('keydown', onInputEscKeydown);
  hashtagsInput.addEventListener('keydown', onInputEscKeydown);
}

export const initCreatePopup = () => {
  fileInput.addEventListener('change', onFileInputChange);
};
