import {getData, sendData} from './api.js';
import {renderMarkers, resetMap, resetMarkers} from './map.js';
import {showAlert} from './util.js';

const formNew = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const formNewComponents = formNew.children;
const formSlider = formNew.querySelector('.ad-form__slider');
const formFiltersComponents = formFilters.children;
const roomNumber = formNew.querySelector('#room_number');
const roomCapacity = formNew.querySelector('#capacity');
const roomType = formNew.querySelector('#type');
const roomPrice = formNew.querySelector('#price');
const checkin = formNew.querySelector('#timein');
const checkout = formNew.querySelector('#timeout');
const sliderElement = formNew.querySelector('.ad-form__slider');
const submitButton = formNew.querySelector('.ad-form__submit');
const resetButton = formNew.querySelector('.ad-form__reset');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorCloseButton = errorMessage.querySelector('.error__button');


function getPristine() {
  return new Pristine(formNew, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextTag: 'span',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error-text',
  });
}
let pristine = getPristine();

const roomNumberCapacityCorrelation = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

const roomTypePrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const roomMaxPrice = 100000;
roomPrice.value = 1000;

noUiSlider.create(sliderElement, {
  range: {
    min: 1000,
    max: roomMaxPrice,
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

roomPrice.addEventListener('change', () => {
  sliderElement.noUiSlider.set([roomPrice.value, null]);
});

sliderElement.noUiSlider.on('update', () => {
  roomPrice.value = sliderElement.noUiSlider.get();
  pristine.validate(roomPrice);
});

const validateCapacity = (value) => roomNumberCapacityCorrelation[roomNumber.value].includes(value);

formNew.addEventListener('change', () => {
  pristine.validate(roomCapacity);
});

roomPrice.placeholder = 1000;
const getRoomMinPrice = () => roomTypePrice[roomType.value];
const validateRoomPrice = (value) => value >= getRoomMinPrice() && value <= roomMaxPrice;


const setValidator = () => {
  pristine.destroy();
  roomPrice.min = 0;
  pristine = getPristine();
  const validateRoomPriceErrorMessage = `Цена не может быть ниже ${getRoomMinPrice()}руб и выше ${roomMaxPrice}руб`;
  pristine.addValidator(roomPrice, validateRoomPrice, validateRoomPriceErrorMessage);
  roomPrice.min = getRoomMinPrice();
  pristine.addValidator(roomCapacity, validateCapacity, 'Некорректное соотношение комнат и гостей');
  pristine.validate();
};

roomType.addEventListener('change', () => {
  roomPrice.placeholder = getRoomMinPrice();
  roomPrice.value = getRoomMinPrice();
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

checkin.addEventListener('change', () => {
  checkout.value = checkin.value;
});
checkout.addEventListener('change', () => {
  checkin.value = checkout.value;
});


const disableForms = () => {
  formNew.classList.add('ad-form--disabled');
  formFilters.classList.add('.map__filters--disabled');
  formSlider.setAttribute('disabled', 'disabled');
  for (let i = 0; i < formNewComponents.length; i++) {
    formNewComponents[i].setAttribute('disabled', 'disabled');
  }
  for (let i = 0; i < formFiltersComponents.length; i++) {
    formFiltersComponents[i].setAttribute('disabled', 'disabled');
  }
};


const enableForms = () => {
  formNew.classList.remove('ad-form--disabled');
  formFilters.classList.remove('.map__filters--disabled');
  formSlider.removeAttribute('disabled');
  for (let i = 0; i < formNewComponents.length; i++) {
    formNewComponents[i].removeAttribute('disabled');
  }
  for (let i = 0; i < formFiltersComponents.length; i++) {
    formFiltersComponents[i].removeAttribute('disabled');
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const showSuccessMessage = () => {
  document.body.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
};

const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
};

const closeErrorMessage = () => {
  errorCloseButton.addEventListener('click', () => {
    errorMessage.remove();
  });
};

const removeMessageOnEsc = (evt) => {
  if (evt.keyCode === 27) {
    successMessage.remove();
    errorMessage.remove();
    document.removeEventListener('keydown', removeMessageOnEsc);
  }
};

const removeMessageOnDocumentClick = () => {
  successMessage.remove();
  errorMessage.remove();
  document.removeEventListener('keydown', removeMessageOnDocumentClick);
};

document.addEventListener('keydown', removeMessageOnEsc);
document.addEventListener('click', removeMessageOnDocumentClick);


const resetForm = () => {
  formNew.reset();
  resetMap();
  resetMarkers();
  sliderElement.noUiSlider.reset();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1000,
      max: roomMaxPrice
    },
    start: 1000,
  });
  roomPrice.min = 1000;
  roomPrice.value = 1000;
  pristine.reset();
  setValidator();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const setUserFormSubmit = (onSuccess) => {
  formNew.addEventListener('submit', (evt) => {
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


export {enableForms, disableForms, formNew, blockSubmitButton, unblockSubmitButton, showSuccessMessage, showErrorMessage, resetForm, setUserFormSubmit};

