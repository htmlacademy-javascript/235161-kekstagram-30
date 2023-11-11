import { isEscapeKey } from './util.js';
import {onMinusButtonClick, onPlusButtonClick} from './scale-photo.js';
import {getErrorMessage, validateHashtags} from './hastags-validation.js';
import {sliderField, image} from './apply-effects.js';
import {onSuccess, onFail} from './status-messages.js';
import {uploadData} from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgEditHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const imgEditCommentArea = imgUploadForm.querySelector('.text__description');
const imgEditCloseButton = imgUploadForm.querySelector('.img-upload__cancel');
const imgEditSubmitButton = imgUploadForm.querySelector('.img-upload__submit');
const minusButton = imgUploadForm.querySelector('.scale__control--smaller');
const plusButton = imgUploadForm.querySelector('.scale__control--bigger');

const pristine = new Pristine(imgUploadForm , {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const resetForm = () => {
  imgUploadForm.reset();
  pristine.reset();

  imgUploadInput.value = '';
  imgEditHashtagsInput.value = '';
  imgEditCommentArea.value = '';
  imgEditSubmitButton.disabled = false;

  sliderField.classList.add('hidden');
  image.style.transform = 'scale(1)';
  image.style.filter = 'none';
};

const onEscKeydown = (evt) => {

  if (isEscapeKey(evt) &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description') &&
  document.querySelector('.error') === null
  ) {
    evt.preventDefault();

    closeImgEditModal();
  }
};

const onImgEditCloseButtonClick = () => {
  closeImgEditModal();
};

function closeImgEditModal () {
  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetForm();

  imgEditCloseButton.removeEventListener('click', onImgEditCloseButtonClick);
  document.removeEventListener('keydown', onEscKeydown);
}

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

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

pristine.addValidator(imgEditHashtagsInput, validateHashtags, getErrorMessage);

const ohHashtagInput = () => {
  if (pristine.validate()) {
    imgEditSubmitButton.disabled = false;
  } else {
    imgEditSubmitButton.disabled = true;
  }
};

imgEditHashtagsInput.addEventListener('input', ohHashtagInput);

const setImgUplaodFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if(isValid) {
      const formData = new FormData(evt.target);

      uploadData(onSuccess, onFail, 'POST', formData);
    }
  });
};

export {setImgUplaodFormSubmit, closeImgEditModal};
