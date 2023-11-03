import { isEscapeKey } from './util.js';
import {scalePicture} from './scale-photo.js';
import {getErrorMessage, validateHashtags} from './hastags-validation.js';
import {sliderField, image} from './apply-effects.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgEditHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const imgEditCommentArea = imgUploadForm.querySelector('.text__description');
const imgEditCloseButton = imgUploadForm.querySelector('.img-upload__cancel');
const imgEditSubmitButton = imgUploadForm.querySelector('.img-upload__submit');
const scaleFormField = imgUploadForm.querySelector('.scale');

const pristine = new Pristine(imgUploadForm , {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const closeImgEditModal = () => {
  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.reset();
  imgUploadInput.value = '';
  imgEditHashtagsInput.value = '';
  imgEditCommentArea.value = '';

  sliderField.classList.add('hidden');
  image.style.transform = 'scale(1)';
  image.style.filter = 'none';
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

scaleFormField.addEventListener('click', scalePicture);

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
