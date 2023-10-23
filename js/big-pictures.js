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
  commentElement.classList.add('hidden');

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
/*
const loadComments = (comments) => {
  comments.forEach((comment, index) => {
    if (index < start + limit) {
      comment.classList.remove('hidden');
      bigPictureContainer.querySelector('.social__comment-shown-count').textContent = limit;
    } else {
      comment.classList.add('hidden');
    }
  });
};
*/

const loadComments = (comments) => {
  comments.forEach((comment, index) => {
    if (index < start + limit) {
      comment.classList.remove('hidden');
      commentsList.append(comment);
      //bigPictureContainer.querySelector('.social__comment-shown-count').textContent = limit;
      bigPictureContainer.querySelector('.social__comment-shown-count').textContent = document.querySelectorAll('.social__comment').length;
    }
  });
};
/*
const showMoreComments = () => {
  start += limit;

  const commentListElements = document.querySelectorAll('.social__comment');
  loadComments(commentListElements);

  const visibleCommentsCount = commentsList.querySelectorAll('.social__comment').length - commentsList.querySelectorAll('.hidden').length;
  bigPictureContainer.querySelector('.social__comment-shown-count').textContent = visibleCommentsCount;

  if (start >= visibleCommentsCount) {
    bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
    bigPictureContainer.querySelector('.social__comment-shown-count').textContent = visibleCommentsCount;
  }
};
*/

const showMoreComments = () => {
  start += limit;

  loadComments(generatedComments);

  const visibleCommentsCount = commentsList.querySelectorAll('.social__comment').length - commentsList.querySelectorAll('.hidden').length;
  //bigPictureContainer.querySelector('.social__comment-shown-count').textContent = visibleCommentsCount;
  bigPictureContainer.querySelector('.social__comment-shown-count').textContent = document.querySelectorAll('.social__comment').length;

  if (start >= visibleCommentsCount) {
    bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
    bigPictureContainer.querySelector('.social__comment-shown-count').textContent = visibleCommentsCount;
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
    //commentsList.append(createComment(comment));
    generatedComments.push(createComment(comment));
  });

  //const commentListElements = document.querySelectorAll('.social__comment');
  //loadComments(commentListElements);
  loadComments(generatedComments);

  bigPictureContainer.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');

  if (comments.length > 5) {
    bigPictureContainer.querySelector('.social__comment-count').classList.remove('hidden');
    bigPictureContainer.querySelector('.comments-loader').classList.remove('hidden');
  }

  document.body.classList.add('modal-open');

  commentsLoaderButton.addEventListener('click', /*() => */showMoreComments);
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

//commentsLoaderButton.addEventListener('click', showMoreComments);

export {openPicture, closePicture};

