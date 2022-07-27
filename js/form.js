import {getData, sendData} from './api.js';
import {resetImages} from './avatar-and-photo.js';
import {resetFilters} from './filters.js';
import {renderMarkers, resetMap} from './map.js';
import {showAlert} from './util.js';

const ROOM_NUMBER_CAPACITY_CORRELATION = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

const ROOM_TYPE_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const formNewElement = document.querySelector('.ad-form');
const formNewElementComponents = formNewElement.children;
const formSliderElement = formNewElement.querySelector('.ad-form__slider');
const roomNumberElement = formNewElement.querySelector('#room_number');
const roomCapacityElement = formNewElement.querySelector('#capacity');
const roomTypeElement = formNewElement.querySelector('#type');
const roomPriceElement = formNewElement.querySelector('#price');
const checkinElement = formNewElement.querySelector('#timein');
const checkoutElement = formNewElement.querySelector('#timeout');
const sliderElement = formNewElement.querySelector('.ad-form__slider');
const submitButtonElement = formNewElement.querySelector('.ad-form__submit');
const resetButtonElement = formNewElement.querySelector('.ad-form__reset');
const successMessageElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessageElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorCloseButtonElement = errorMessageElement.querySelector('.error__button');
const roomMaxPrice = 100000;
roomPriceElement.value = 1000;

const getPristine = () => new Pristine(formNewElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextTag: 'span',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

let pristine = getPristine();

noUiSlider.create(sliderElement, {
  range: {
    min: 1000,
    max: roomMaxPrice,
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

roomPriceElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set([roomPriceElement.value, null]);
});

sliderElement.noUiSlider.on('update', () => {
  roomPriceElement.value = sliderElement.noUiSlider.get();
  pristine.validate(roomPriceElement);
});

const validateCapacity = (value) => ROOM_NUMBER_CAPACITY_CORRELATION[roomNumberElement.value].includes(value);

formNewElement.addEventListener('change', () => {
  pristine.validate(roomCapacityElement);
});

roomPriceElement.placeholder = 1000;
const getRoomMinPrice = () => ROOM_TYPE_PRICE[roomTypeElement.value];
const validateRoomPrice = (value) => value >= getRoomMinPrice() && value <= roomMaxPrice;


const setValidator = () => {
  pristine.destroy();
  roomPriceElement.min = 0;
  pristine = getPristine();
  const validateRoomPriceErrorMessage = `Цена не может быть ниже ${getRoomMinPrice()}руб и выше ${roomMaxPrice}руб`;
  pristine.addValidator(roomPriceElement, validateRoomPrice, validateRoomPriceErrorMessage);
  roomPriceElement.min = getRoomMinPrice();
  pristine.addValidator(roomCapacityElement, validateCapacity, 'Некорректное соотношение комнат и гостей');
  pristine.validate();
};

roomTypeElement.addEventListener('change', () => {
  roomPriceElement.placeholder = getRoomMinPrice();
  roomPriceElement.value = getRoomMinPrice();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: getRoomMinPrice(),
      max: roomMaxPrice
    },
    start: getRoomMinPrice(),
  });
  setValidator();
});

setValidator();

checkinElement.addEventListener('change', () => {
  checkoutElement.value = checkinElement.value;
});
checkoutElement.addEventListener('change', () => {
  checkinElement.value = checkoutElement.value;
});


const disableForms = () => {
  formNewElement.classList.add('ad-form--disabled');
  formSliderElement.setAttribute('disabled', 'disabled');
  for (const i of formNewElementComponents) {
    i.setAttribute('disabled', 'disabled');
  }
};


const enableForms = () => {
  formNewElement.classList.remove('ad-form--disabled');
  formSliderElement.removeAttribute('disabled');
  for (const i of formNewElementComponents) {
    i.removeAttribute('disabled');
  }
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const showSuccessMessage = () => {
  document.body.appendChild(successMessageElement);
  setTimeout(() => {
    successMessageElement.remove();
  }, 5000);
};

const showErrorMessage = () => {
  document.body.appendChild(errorMessageElement);
};

const closeErrorMessage = () => {
  errorCloseButtonElement.addEventListener('click', () => {
    errorMessageElement.remove();
  });
};

const onEscRemoveMessage = (evt) => {
  if (evt.keyCode === 27) {
    successMessageElement.remove();
    errorMessageElement.remove();
    document.removeEventListener('keydown', onEscRemoveMessage);
  }
};

const onDocumentClickRemoveMessage = () => {
  successMessageElement.remove();
  errorMessageElement.remove();
  document.removeEventListener('keydown', onDocumentClickRemoveMessage);
};

document.addEventListener('keydown', onEscRemoveMessage);
document.addEventListener('click', onDocumentClickRemoveMessage);


const resetForm = () => {
  formNewElement.reset();
  pristine.reset();
  setValidator();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1000,
      max: roomMaxPrice
    },
    start: 1000,
  });
  resetMap();
  resetFilters();
  resetImages();
};

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const setUserFormSubmit = (onSuccess) => {
  formNewElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid) {
      sendData(
        () => {
          onSuccess();
          resetForm();
          resetMap();
          getData(renderMarkers);
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    } else {
      showErrorMessage();
      closeErrorMessage();
    }
  });
};

export {enableForms, disableForms, blockSubmitButton, unblockSubmitButton, showSuccessMessage, showErrorMessage, resetForm, setUserFormSubmit};

