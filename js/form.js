const formNew = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const formNewComponents = formNew.children;
const formSlider = formNew.querySelector('.ad-form__slider');
const formFiltersComponents = formFilters.children;
const roomNumber = formNew.querySelector('#room_number');
const roomCapacity = formNew.querySelector('#capacity');

const pristine = new Pristine(formNew, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextTag: 'span',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const roomNumberCapacityCorrelation = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

const validateCapacity = (value) => roomNumberCapacityCorrelation[roomNumber.value].includes(value);
pristine.addValidator(roomCapacity, validateCapacity, 'Некорректное соотношение комнат и гостей');
formNew.addEventListener('change', () => {
  pristine.validate(roomCapacity);
});

formNew.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
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

disableForms();
enableForms();

export {disableForms, enableForms};
