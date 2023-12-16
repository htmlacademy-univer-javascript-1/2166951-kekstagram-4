import { isEscapeKey } from './utils.js';
import { setCreatePopupLock } from './create-picture-popup.js';

const SUCCESS_SELECTOR = '.success';
const ERROR_SELECTOR = '.error';
const SUCCESS_BUTTON_SELECTOR = '.success__button';
const ERROR_BUTTON_SELECTOR = '.error__button';

const bodyElement = document.querySelector('body');
const successAlertTemplate = bodyElement.querySelector('#success').content.querySelector(SUCCESS_SELECTOR);
const successAlert = successAlertTemplate.cloneNode(true);
const errorAlertTemplate = bodyElement.querySelector('#error').content.querySelector(ERROR_SELECTOR);
const errorAlert = errorAlertTemplate.cloneNode(true);

const hideMessage = () => {
  const currentAlert =
    bodyElement.querySelector(SUCCESS_SELECTOR) ||
    bodyElement.querySelector(ERROR_SELECTOR);
  const exitButton =
    currentAlert.querySelector(SUCCESS_BUTTON_SELECTOR) ||
    currentAlert.querySelector(ERROR_BUTTON_SELECTOR);
  currentAlert.remove();
  setCreatePopupLock(false);
  exitButton.removeEventListener('click', hideMessage);
  document.removeEventListener('click', onOutsideClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const showMessage = (currentAlert, exitButtonClass) => {
  const exitButton = currentAlert.querySelector(exitButtonClass);
  bodyElement.append(currentAlert);
  exitButton.addEventListener('click', hideMessage);
  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

function onDocumentEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onOutsideClick (evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

export const showSuccessMessage = () => {
  showMessage(successAlert, SUCCESS_BUTTON_SELECTOR);
};

export const showErrorMessage = () => {
  setCreatePopupLock(true);
  showMessage(errorAlert, ERROR_BUTTON_SELECTOR);
};
