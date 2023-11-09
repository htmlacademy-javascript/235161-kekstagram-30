const getData = (onSuccess, onFail) => fetch(
  'https://30.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then((photos) => onSuccess(photos))
  .catch(() => {
    onFail();
  });

const sendData = (body) =>
  fetch(
    'https://30.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  );


export {getData, sendData};
