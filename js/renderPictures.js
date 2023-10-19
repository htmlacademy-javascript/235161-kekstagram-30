import {photos} from './generate-photos.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const renderPictures = () => {
  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__comments').textContent = photo.comment.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    picturesFragment.append(pictureElement);
  });

  picturesContainer.append(picturesFragment);
};

export {renderPictures};
