import { isEscapeKey } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditForm = document.querySelector('.img-upload__overlay');
const imgEditHashtagsInput = document.querySelector('.text__hashtags');
const imgEditCommentArea = document.querySelector('.text__description');
const imgEditCloseButton = document.querySelector('.img-upload__cancel');

const closeImgEditModal = () => {
  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
  imgEditHashtagsInput.value = '';
  imgEditCommentArea.value = '';
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

const onImgUploadButtonClick = () => {
  openImgEditModal();

  imgEditCloseButton.addEventListener('click', onImgEditCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};

imgUploadInput.addEventListener('change', onImgUploadButtonClick);

//Регулярное выражение сделанное по примеру из видео
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

//Тут будет валидация
const pristine = new Pristine(imgUploadForm , {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form__error'
});

const hasDuplicates = (array) => {
  const valuesSoFar = Object.create(null);

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
};

const validateHashtags = (hashtags) => {
  const splitHashtags = hashtags.trim().split(' ');

  if (splitHashtags.length > 5) {
    return false;
  }

  if (hasDuplicates(splitHashtags)) {
    return false;
  }

  for (let i = 0; i < splitHashtags.length; i++) {
    //Кривая проверка на то, что инпут с хэштэгами пуст, не смог решить почему если отправлять пустой инпут в массив попадает элемент = ''
    if (splitHashtags[i] === '' && splitHashtags.length === 1) {
      return true;
    }

    if (!regexp.test(splitHashtags[i])) {
      return false;
    }
  }

  return true;
};


const getErrorMessage = (hashtags) => {
  const splitHashtags = hashtags.trim().split(' ');
  let errorMessage = '';

  if (splitHashtags.length > 5) {
    errorMessage = 'Превышено количество хэш-тегов';
    return errorMessage;
  }

  if (hasDuplicates(splitHashtags)) {
    errorMessage = 'Хэш-теги повторяются';
    return errorMessage;
  }

  for (let i = 0; i < splitHashtags.length; i++) {
    if (!regexp.test(splitHashtags[i])) {
      errorMessage = 'Введён невалидный хэш-тег';
      return errorMessage;
    }
  }
};
pristine.addValidator(imgEditHashtagsInput, validateHashtags, getErrorMessage);

imgUploadForm.addEventListener('submit', (evt) => {
  //evt.preventDefault();
  const isValid = pristine.validate();

  if(isValid) {
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
    evt.preventDefault();
  }
});
