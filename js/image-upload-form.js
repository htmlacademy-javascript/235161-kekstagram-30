import { isEscapeKey } from './util';

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

const stopEscKeydownPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onImgEditCloseButtonClick = () => {
  closeImgEditModal();

  imgEditCloseButton.removeEventListener('click', onImgEditCloseButtonClick);
  imgEditCommentArea.removeEventListener('keydown', stopEscKeydownPropagation);
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeImgEditModal();

    document.removeEventListener('keydown', onEscKeydown);
    imgEditCommentArea.removeEventListener('keydown', stopEscKeydownPropagation);
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
  imgEditCommentArea.addEventListener('keydown', stopEscKeydownPropagation);
};

imgUploadInput.addEventListener('change', onImgUploadButtonClick);

//Регулярное выражение сделанное по примеру из видео
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

//Тут будет валидация
const pristine = new Pristine(imgUploadForm);

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

pristine.addValidator(imgEditHashtagsInput, validateHashtags);

const validateCommentMessage = (value) => value.length <= 140;

pristine.addValidator(imgEditCommentArea, validateCommentMessage, 'Комментарий не должен быть длиннее 140 символов');

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
