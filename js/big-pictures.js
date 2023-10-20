import { isEscapeKey } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    //closePicture();
  }
};

const openPicture = (evt) => {
  bigPictureContainer.classList.remove('hidden');
  //fillPicture();
  bigPictureContainer.querySelector('.big-picture__img img').src = evt.target.src;

  document.addEventListener('keydown', onDocumentKeydown);
};

const closePicture = () => {
  bigPictureContainer.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', openPicture);

bigPictureCloseButton.addEventListener('click', closePicture);
