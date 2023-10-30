import { isEscapeKey } from './util.js';
import {scalePicture} from './scale-photo.js';
import {getErrorMessage, validateHashtags} from './hastags-validation.js';
import { chooseEffect } from './effects.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgEditForm = document.querySelector('.img-upload__overlay');
const imgEditHashtagsInput = document.querySelector('.text__hashtags');
const imgEditCommentArea = document.querySelector('.text__description');
const imgEditCloseButton = document.querySelector('.img-upload__cancel');
const imgEditSubmitButton = document.querySelector('.img-upload__submit');
const scaleFormField = document.querySelector('.scale');
const effectsList = document.querySelector('.effects__list');

const closeImgEditModal = () => {
  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
  imgEditHashtagsInput.value = '';
  imgEditCommentArea.value = '';
  document.querySelector('.img-upload__preview img').style.transform = 'scale(1)';
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  document.querySelector('.img-upload__preview img').style.filter = 'none';
};

const onImgEditCloseButtonClick = () => {
  closeImgEditModal();

  imgEditCloseButton.removeEventListener('click', onImgEditCloseButtonClick);
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();

    closeImgEditModal();

    document.removeEventListener('keydown', onEscKeydown);
  }
};

const openImgEditModal = () => {
  imgEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onImgUploadButtonChange = () => {
  openImgEditModal();

  imgEditCloseButton.addEventListener('click', onImgEditCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};

imgUploadInput.addEventListener('change', onImgUploadButtonChange);

//2.По клику на + или - должно изменяться значение инпута и масштаб картинки, добавляем обработчик
scaleFormField.addEventListener('click', scalePicture);
//Добавляет прослушку клика по иконкам эффектов
effectsList.addEventListener('click', chooseEffect);

//Тут будет валидация
const pristine = new Pristine(imgUploadForm , {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

pristine.addValidator(imgEditHashtagsInput, validateHashtags, getErrorMessage);

const ohHashtagInput = () => {
  if (pristine.validate()) {
    imgEditSubmitButton.disabled = false;
  } else {
    imgEditSubmitButton.disabled = true;
  }
};

imgEditHashtagsInput.addEventListener('input', ohHashtagInput);

imgUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if(!isValid) {
    evt.preventDefault();
  }
});
