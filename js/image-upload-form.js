import { isEscapeKey } from './util';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditForm = document.querySelector('.img-upload__overlay');
const imgEditHashtagsInput = document.querySelector('.text__hashtags');
const imgEditCloseButton = document.querySelector('.img-upload__cancel');

const closeImgEditModal = () => {
  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
  imgEditHashtagsInput.value = '';
  //Здесь нужно будет добавить сброс остальных полей формы, но это потом
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

//Регулярное выражение сделанное по примеру из видео
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

//Тут будет валидация. Почти сделал валидацию хэштегов, осталась проверка на уникальность
const pristine = new Pristine(imgUploadForm);

const validateHashtags = (hashtags) => {
  const splitHashtags = hashtags.trim().split(' ');

  if (splitHashtags.length > 5) {
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

imgUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if(isValid) {
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
    evt.preventDefault();
  }
});
