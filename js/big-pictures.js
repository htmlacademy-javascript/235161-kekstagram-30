import { isEscapeKey } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
commentsList.innerHTML = '';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsList.innerHTML = '';
    //closePicture();
  }
};

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;

  const commentMessage = document.createElement('p');
  commentMessage.classList.add('social__text');
  commentMessage.textContent = comment.message;

  commentElement.append(commentAvatar, commentMessage);

  return commentElement;
};

const openPicture = (item) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = item.url;
  bigPictureContainer.querySelector('.likes-count').textContent = item.likes;
  bigPictureContainer.querySelector('.social__comment-total-count').textContent = item.comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = item.description;

  const comments = item.comments;
  comments.forEach((comment) => {
    commentsList.append(createComment(comment));
  });

  bigPictureContainer.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');

  document.body.classList.add('modal-open');
};

const closePicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};
/*
const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', openPicture);
*/
bigPictureCloseButton.addEventListener('click', closePicture);
export {openPicture, closePicture};
