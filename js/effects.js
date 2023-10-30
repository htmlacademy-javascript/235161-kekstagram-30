const sliderField = document.querySelector('.img-upload__effect-level');
const imageToApplyEffectOn = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderField.classList.add('hidden');

const applyEffect = (effect, filter, options, mod = '') => {
  sliderField.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions(options);

  sliderElement.noUiSlider.on('update', () => {
    effectLevel.value = sliderElement.noUiSlider.get();
    imageToApplyEffectOn.style.filter = `${filter}(${effectLevel.value}${mod})`;
  });
};

const chooseEffect = (evt) => {

  if (evt.target.matches('#effect-none')) {

    sliderField.classList.add('hidden');
    imageToApplyEffectOn.style.filter = 'none';

  } else if (evt.target.matches('#effect-chrome')) {

    applyEffect('chrome', 'grayscale', {
      range: { min: 0, max: 1 },
      step: 0.1,
      start: 1
    });

  } else if (evt.target.matches('#effect-sepia')) {

    applyEffect('sepia', 'sepia', {
      range: { min: 0, max: 1 },
      step: 0.1,
      start: 1
    });

  } else if (evt.target.matches('#effect-marvin')) {

    applyEffect('marvin', 'invert', {
      range: { min: 0, max: 100 },
      step: 1,
      start: 100
    }, '%');

  } else if (evt.target.matches('#effect-phobos')) {

    applyEffect('phobos', 'blur', {
      range: { min: 0, max: 3 },
      step: 0.1,
      start: 3
    }, 'px');

  } else if (evt.target.matches('#effect-heat')) {

    applyEffect('heat', 'brightness', {
      range: { min: 1, max: 3 },
      step: 0.1,
      start: 3
    });

  }

};
/*
const applySomeEffect = (evt) => {

  if (evt.target.matches('#effect-none')) {
    sliderField.classList.add('hidden');
    imageToApplyEffectOn.style.filter = 'none';
  }

  if (evt.target.matches('#effect-chrome')) {
    sliderField.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1
    });

    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imageToApplyEffectOn.style.filter = `grayscale(${effectLevelValue.value})`;
    });
  }

  if (evt.target.matches('#effect-sepia')) {
    sliderField.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1
    });

    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imageToApplyEffectOn.style.filter = `sepia(${effectLevelValue.value})`;
    });
  }

  if (evt.target.matches('#effect-marvin')) {
    sliderField.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100
    });

    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imageToApplyEffectOn.style.filter = `invert(${effectLevelValue.value}%)`;
    });
  }

  if (evt.target.matches('#effect-phobos')) {
    sliderField.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3
    });

    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imageToApplyEffectOn.style.filter = `blur(${effectLevelValue.value}px)`;
    });
  }

  if (evt.target.matches('#effect-heat')) {
    sliderField.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3
    });

    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = sliderElement.noUiSlider.get();
      imageToApplyEffectOn.style.filter = `brightness(${effectLevelValue.value})`;
    });
  }
};
*/
export {chooseEffect};
