import {photos} from './generate-photos.js';
import {renderPictures} from './renderPictures.js';

renderPictures(photos);

const onPictureClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    //console.log('Я нажаль!');
  }
};


const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', onPictureClick);

// Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением. Done!

//Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.
