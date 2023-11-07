import {getPhotos} from './api.js';
import {renderPictures} from './renderPictures.js';
import './image-upload-form.js';

getPhotos(renderPictures);
//import {getPhotos} from './api.js';
/*
fetch('https://30.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => renderPictures(photos));
*/
//renderPictures(photos);
