import { isEscapeKey } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const commentsLoaderButton = bigPictureContainer.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
//commentsList.innerHTML = '';

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
const commentLoaderGenerator = (comments) => {
  let start = 0;
  const limit = 5;

  return () => {
    comments.forEach((comment, index) => {
      if (index < start + limit) {
        comment.classList.remove('hidden');
        bigPictureContainer.querySelector('.social__comment-shown-count').textContent = start;
      }
    });
  };
};
*/

let start = 0;
const limit = 5;

const loadComments = (comments) => {
  comments.forEach((comment, index) => {
    if (index < start + limit) {
      comment.classList.remove('hidden');
      bigPictureContainer.querySelector('.social__comment-shown-count').textContent = limit;
    }
  });
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
    commentsList.append(createComment(comment));
  });
  /*
  const commentListElements = document.querySelectorAll('.social__comment');
  const loadComments = commentLoaderGenerator(commentListElements);
  loadComments();
  */
  const commentListElements = document.querySelectorAll('.social__comment');
  loadComments(commentListElements);

  bigPictureContainer.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');

  if (comments.length > 5) {
    bigPictureContainer.querySelector('.social__comment-count').classList.remove('hidden');
    bigPictureContainer.querySelector('.comments-loader').classList.remove('hidden');
  }

  document.body.classList.add('modal-open');
};

const closePicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureCloseButton.addEventListener('click', closePicture);

commentsLoaderButton.addEventListener('click', () => {
  start += limit;
  const commentListElements = document.querySelectorAll('.social__comment');
  loadComments(commentListElements);
});

export {openPicture, closePicture};

