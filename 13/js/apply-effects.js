const DEFAULT_EFFECT_LEVEL = 100;
const RADIX = 10;
const EFFECTS_STEP = 0.01;
const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS = 3;

const Slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
};

const imgUploadForm = document.querySelector('.img-upload__form');
const effectsList = imgUploadForm.querySelector('.effects__list');
const imagePreview = imgUploadForm.querySelector('.img-upload__preview');
const sliderField = imgUploadForm.querySelector('.img-upload__effect-level');
const effectLevel = imgUploadForm.querySelector('.effect-level__value');
const sliderElement = imgUploadForm.querySelector('.effect-level__slider');
const image = imagePreview.querySelector('img');

effectLevel.value = DEFAULT_EFFECT_LEVEL;
let currentEffect = '';

noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});

const effects = {
  none : () => {
    sliderField.classList.add('hidden');
    return 'none';
  },

  chrome: () => {
    sliderField.classList.remove('hidden');
    return `grayscale(${parseInt(effectLevel.value, RADIX) * EFFECTS_STEP})`;
  },

  sepia: () => {
    sliderField.classList.remove('hidden');
    return `sepia(${parseInt(effectLevel.value, RADIX) * EFFECTS_STEP})`;
  },

  marvin: () => {
    sliderField.classList.remove('hidden');
    return `invert(${Math.floor(effectLevel.value)}%)`;
  },

  phobos: () => {
    sliderField.classList.remove('hidden');
    return `blur(${(parseInt(effectLevel.value, RADIX) * MAX_BLUR_VALUE) * EFFECTS_STEP}px)`;
  },

  heat: () => {
    sliderField.classList.remove('hidden');
    return `brightness(${parseInt(effectLevel.value, RADIX) * MAX_BRIGHTNESS * EFFECTS_STEP})`;
  },
};

sliderField.classList.add('hidden');

const onEffectsListClick = (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    if (currentEffect !== '') {
      image.classList.remove(currentEffect);
    }

    sliderElement.noUiSlider.set(Slider.MAX);
    effectLevel.value = Slider.MAX;

    currentEffect = target.classList[1];
    image.classList.add(currentEffect);
    image.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
  }
};

effectsList.addEventListener('click', onEffectsListClick);

sliderElement.noUiSlider.on('change', () => {
  effectLevel.value = sliderElement.noUiSlider.get();

  image.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
});

export {sliderField, image};
