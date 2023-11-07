const getPhotos = (onSuccess) => {
  fetch('https://30.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => onSuccess(photos));
};

export {getPhotos};
