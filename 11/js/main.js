import {getData} from './api.js';
import {renderPictures} from './renderPictures.js';
import {setImgUplaodFormSubmit} from './image-upload-form.js';
import {showDataErrorMessage, showStatusMessage} from './status-messages.js';

getData(renderPictures, showDataErrorMessage);

setImgUplaodFormSubmit(showStatusMessage);
