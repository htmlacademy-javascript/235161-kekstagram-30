import { isEscapeKey } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureContainer.querySelector('.big-picture__cancel');
const commentsLoaderButton = bigPictureContainer.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');

let start = 0;
const limit = 5;

const generatedComments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsList.innerHTML = '';

    start = 0;
    generatedComments.splice(0, generatedComments.length);
  }
};

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  //commentElement.classList.add('hidden');

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

const loadComments = (comments) => {
  comments.forEach((comment, index) => {
    if (index < start + limit) {
      //comment.classList.remove('hidden');
      commentsList.append(comment);
      bigPictureContainer.querySelector('.social__comment-shown-count').textContent = document.querySelectorAll('.social__comment').length;
    }
  });
};

const showMoreComments = () => {
  start += limit;

  loadComments(generatedComments);

  bigPictureContainer.querySelector('.social__comment-shown-count').textContent = document.querySelectorAll('.social__comment').length;

  if (generatedComments.length <= limit || start + limit >= generatedComments.length) {
    bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
  }
};

const openPicture = (item) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = item.url;
  bigPictureContainer.querySelector('.likes-count').textContent = item.likes;
  bigPictureContainer.querySelector('.social__comment-shown-count').textContent = 0;
  bigPictureContainer.querySelector('.social__comment-total-count').textContent = item.comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = item.description;
  commentsList.innerHTML = '';

  const comments = item.comments;
  comments.forEach((comment) => {
    generatedComments.push(createComment(comment));
  });

  loadComments(generatedComments);

  bigPictureContainer.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  commentsLoaderButton.classList.add('hidden');
  if (comments.length > limit) {
    bigPictureContainer.querySelector('.comments-loader').classList.remove('hidden');
  }

  document.body.classList.add('modal-open');

  commentsLoaderButton.addEventListener('click', showMoreComments);
};

const closePicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  commentsList.innerHTML = '';
  start = 0;
  generatedComments.splice(0, generatedComments.length);

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderButton.removeEventListener('click', showMoreComments);
};

bigPictureCloseButton.addEventListener('click', closePicture);

export {openPicture, closePicture};

