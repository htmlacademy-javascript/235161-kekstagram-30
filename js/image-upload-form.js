import { isEscapeKey } from './util';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditForm = document.querySelector('.img-upload__overlay');
const imgEditCloseButton = document.querySelector('.img-upload__cancel');

const closeImgEditModal = () => {
  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
};

const onImgEditCloseButtonClick = () => {
  closeImgEditModal();

  imgEditCloseButton.removeEventListener('click', onImgEditCloseButtonClick);
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeImgEditModal();

    document.removeEventListener('keydown', onEscKeydown);
  }
};

const openImgEditModal = () => {
  imgEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onImgUploadButtonClick = () => {
  openImgEditModal();

  imgEditCloseButton.addEventListener('click', onImgEditCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};

imgUploadInput.addEventListener('change', onImgUploadButtonClick);

//Тут будет валидация
const pristine = new Pristine(imgUploadForm);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if(isValid) {
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
  }
});
