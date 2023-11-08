import { isEscapeKey } from './util.js';

const DATA_ERROR_SHOWN_TIME = 5000;

const dataErrorMessageTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessage = errorMessageTemplate.cloneNode(true);
const successMessage = successMessageTemplate.cloneNode(true);

const closeSuccessMessage = () => {
  successMessage.remove();
};

const closeErrorMessage = () => {
  errorMessage.remove();
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)
  ) {
    evt.preventDefault();

    closeSuccessMessage();

    document.removeEventListener('keydown', onSuccessEscKeydown);
  }
};

const onFailEscKeydown = (evt) => {
  if (isEscapeKey(evt)
  ) {
    evt.preventDefault();

    closeErrorMessage();

    document.removeEventListener('keydown', onFailEscKeydown);
  }
};

const onSuccessMouseButtonClick = (evt) => {
  if (!evt.target.classList.contains('success__inner') &&
      !evt.target.classList.contains('success__title')) {
    closeSuccessMessage();

    document.removeEventListener('click', onSuccessMouseButtonClick);
    document.removeEventListener('keydown', onSuccessEscKeydown);
  }
};

const onFailMouseButtonClick = (evt) => {
  if (!evt.target.classList.contains('error__inner') &&
      !evt.target.classList.contains('error__title')) {
    closeErrorMessage();

    document.removeEventListener('click', onFailMouseButtonClick);
    document.removeEventListener('keydown', onFailEscKeydown);
  }
};

const showStatusMessage = (messageType) => {
  const fragment = document.createDocumentFragment();

  fragment.append(messageType);
  document.body.append(fragment);

  if (messageType === successMessage) {
    document.addEventListener('keydown', onSuccessEscKeydown);
    document.addEventListener('click', onSuccessMouseButtonClick);
  }

  if (messageType === errorMessage) {
    document.addEventListener('keydown', onFailEscKeydown);
    document.addEventListener('click', onFailMouseButtonClick);
  }
};

const showDataErrorMessage = () => {
  const fragment = document.createDocumentFragment();
  const dataErrorMessage = dataErrorMessageTemplate.cloneNode(true);

  fragment.append(dataErrorMessage);
  document.body.append(fragment);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, DATA_ERROR_SHOWN_TIME);
};

export {showDataErrorMessage, showStatusMessage, successMessage, errorMessage};
