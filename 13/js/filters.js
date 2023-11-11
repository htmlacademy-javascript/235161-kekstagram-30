const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');


//Перемешивание элементов массива в случайном порядке
const shufflePhotos = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//Сортировка массива по убыванию комментариев
const sortPhotos = (array) => {
  array.sort((a, b) => b.comments.length - a.comments.length);

  return array;
};

const addFilterClickListener = (button, cb) => {
  button.addEventListener('click', (evt) => {

    filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');

    cb();
  });
};

export {sortPhotos, shufflePhotos, addFilterClickListener, defaultFilterButton, randomFilterButton, discussedFilterButton};
