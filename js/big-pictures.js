import { isEscapeKey } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureContainer.querySelector('.big-picture__cancel');
const commentsLoaderButton = bigPictureContainer.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentsShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');


let start = 0;
const limit = 5;

let currentPictureComments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');


    commentsList.innerHTML = '';
    start = 0;
    currentPictureComments.splice(0, currentPictureComments.length);
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

const renderComments = (comments) => {
  if (currentPictureComments.length <= limit || start + limit >= currentPictureComments.length) {
    bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
  } else {
    bigPictureContainer.querySelector('.comments-loader').classList.remove('hidden');
  }

  commentsTotalCount.textContent = currentPictureComments.length;
  commentsList.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment, index) => {
    if (index < start + limit) {
      //comment.classList.remove('hidden');
      //commentsList.append(comment);
      //bigPictureContainer.querySelector('.social__comment-shown-count').textContent = document.querySelectorAll('.social__comment').length;
      commentsFragment.append(createComment(comment));
    }

    commentsList.append(commentsFragment);

    commentsShownCount.textContent = document.querySelectorAll('.social__comment').length;
    //bigPictureContainer.querySelector('.social__comment-shown-count').textContent = document.querySelectorAll('.social__comment').length;
  });
};

const showMoreComments = () => {
  start += limit;

  renderComments(currentPictureComments);

  //bigPictureContainer.querySelector('.social__comment-shown-count').textContent = document.querySelectorAll('.social__comment').length;
  /*
  if (currentPictureComments.length <= limit || start + limit >= currentPictureComments.length) {
    bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
  }*/
};

const openPicture = (item) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = item.url;
  bigPictureContainer.querySelector('.likes-count').textContent = item.likes;
  bigPictureContainer.querySelector('.social__caption').textContent = item.description;
  //bigPictureContainer.querySelector('.social__comment-shown-count').textContent = 0;
  //bigPictureContainer.querySelector('.social__comment-total-count').textContent = item.comments.length;

  //commentsList.innerHTML = '';
  /*
  const comments = item.comments;
  comments.forEach((comment) => {
    currentPictureComments.push(createComment(comment));
  });
  */
  currentPictureComments = item.comments.slice();

  renderComments(currentPictureComments);

  bigPictureContainer.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  commentsLoaderButton.classList.add('hidden');
  if (/*comments.length*/currentPictureComments.length > limit) {
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
  currentPictureComments.splice(0, currentPictureComments.length);

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderButton.removeEventListener('click', showMoreComments);
};

bigPictureCloseButton.addEventListener('click', closePicture);

export {openPicture, closePicture};

