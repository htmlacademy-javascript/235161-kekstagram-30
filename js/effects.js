const sliderField = document.querySelector('.img-upload__effect-level');
const imageToApplyEffectOn = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

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

export {applySomeEffect};
