import {loadData} from './api.js';
import {renderPictures} from './renderPictures.js';
import {setImgUplaodFormSubmit} from './image-upload-form.js';
import {showDataErrorMessage} from './status-messages.js';
import {sortPhotos, shufflePhotos, addFilterClickListener, defaultFilterButton, randomFilterButton, discussedFilterButton} from './filters.js';
import {debounce} from './util.js';
import './image-preview.js';

const SHUFFLED_PHOTOS_COUNT = 10;

let photos = [];

const onSuccess = (data) => {

  photos = data.slice();

  renderPictures(data);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  addFilterClickListener(defaultFilterButton, debounce(
    () => renderPictures(data)
  ));

  addFilterClickListener(randomFilterButton, debounce(
    () => renderPictures(shufflePhotos(photos.slice(0, SHUFFLED_PHOTOS_COUNT)))
  ));

  addFilterClickListener(discussedFilterButton, debounce(
    () => renderPictures(sortPhotos(photos))
  ));

};

loadData(onSuccess, showDataErrorMessage);

setImgUplaodFormSubmit();
