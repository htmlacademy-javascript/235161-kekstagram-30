import { isEscapeKey } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

const openPictureThumbnail = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    bigPictureContainer.classList.remove('hidden');

    bigPictureCloseButton.addEventListener('click', () => {
      bigPictureContainer.classList.add('hidden');
    });

    document.addEventListener('keydown', (event) => {
      if (isEscapeKey(event)) {
        event.preventDefault();
        bigPictureContainer.classList.add('hidden');
      }
    });
  }
};

const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', openPictureThumbnail);
