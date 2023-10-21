import { isEscapeKey } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    //closePicture();
  }
};

const openPicture = (item) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = item.url;
  bigPictureContainer.querySelector('.likes-count').textContent = item.likes;
  bigPictureContainer.querySelector('.social__comment-total-count').textContent = item.comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = item.description;

  bigPictureContainer.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');

  document.body.classList.add('modal-open');
};

const closePicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};
/*
const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', openPicture);
*/
bigPictureCloseButton.addEventListener('click', closePicture);
export {openPicture, closePicture};
