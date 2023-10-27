import { isEscapeKey } from './util.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgEditForm = document.querySelector('.img-upload__overlay');
const imgEditHashtagsInput = document.querySelector('.text__hashtags');
const imgEditCommentArea = document.querySelector('.text__description');
const imgEditCloseButton = document.querySelector('.img-upload__cancel');
const imgEditSubmitButton = document.querySelector('.img-upload__submit');

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

const onImgUploadButtonChange = () => {
  openImgEditModal();

  imgEditCloseButton.addEventListener('click', onImgEditCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};

imgUploadInput.addEventListener('change', onImgUploadButtonChange);

//Тут будет валидация
const pristine = new Pristine(imgUploadForm , {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

let errorMessage = '';
const getErrorMessage = () => errorMessage;

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtags = (hashtags) => {
  const hashtagsString = hashtags.toLowerCase().trim();
  const splitHashtags = hashtagsString.split(/\s+/);

  if (!hashtagsString) {
    return true;
  }

  if (splitHashtags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: splitHashtags.some((hashtag) => hashtag.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: splitHashtags.some((hashtag) => hashtag[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: splitHashtags.some((hashtag, index, array) => array.includes(hashtag, index + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: splitHashtags.some((hashtag) => hashtag.length > MAX_SYMBOLS),
      error: `Длинна хэш-тега не должна превышать ${MAX_SYMBOLS} символов, включая решетку`
    },
    {
      check: splitHashtags.length > MAX_HASHTAGS,
      error: `К фото нельзя добавлять более ${MAX_HASHTAGS} хэш-тегов`
    },
    {
      check: splitHashtags.some((hashtag) => !regexp.test(hashtag)),
      error: 'Хэш-тег содержит запрещенные символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

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
