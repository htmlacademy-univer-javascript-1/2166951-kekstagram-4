import { ALERT_SHOW_TIME } from './constants.js';
import { isEscapeKey } from './utils.js';

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.margin = '5px 10px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '22px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.borderRadius = '5px';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const bodyElement = document.querySelector('body');
const successAlertTemplate = bodyElement.querySelector('#success').content.querySelector('.success');
const successAlert = successAlertTemplate.cloneNode(true);
const successExitButton = successAlert.querySelector('.success__button');
const failAlertTemplate = bodyElement.querySelector('#error').content.querySelector('.error');
const failAlert = failAlertTemplate.cloneNode(true);
const failExitButton = failAlert.querySelector('.error__button');

const onDocumentEscKeydown = (evt, closeCurrentAlert) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeCurrentAlert();
  }
};

const onOutsideClick = (evt, currentAlert, closeCurrentAlert) => {
  if (evt.target !== currentAlert.children[0]) {
    closeCurrentAlert();
  }
};

const addEventListeners = (exitButton, currentAlert, closeCurrentAlert) => {
  bodyElement.appendChild(currentAlert);
  exitButton.addEventListener('click', closeCurrentAlert);
  document.addEventListener('click', (evt) => onOutsideClick(evt, currentAlert, closeCurrentAlert));
  document.addEventListener('keydown', (evt) => onDocumentEscKeydown(evt,  closeCurrentAlert));
};

const removeEventListeners = (exitButton, currentAlert, closeCurrentAlert) => {
  bodyElement.removeChild(bodyElement.lastChild);
  exitButton.removeEventListener('click', closeCurrentAlert);
  document.removeEventListener('click', (evt) => onOutsideClick(evt, currentAlert, closeCurrentAlert));
  document.removeEventListener('keydown', (evt) => onDocumentEscKeydown(evt, closeCurrentAlert));
};

const hideSuccessAlert = () => {
  removeEventListeners(successExitButton, successAlert, hideSuccessAlert);
};

const hideFailAlert = () => {
  removeEventListeners(failExitButton, failAlert, hideFailAlert);
};

export const showSuccessAlert = () => {
  addEventListeners(successExitButton, successAlert, hideSuccessAlert);
};

export const showFailAlert = () => {
  addEventListeners(failExitButton, failAlert, hideFailAlert);
};
