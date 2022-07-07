const formNew = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const formNewComponents = formNew.children;
const formSlider = formNew.querySelector('.ad-form__slider');
const formFiltersComponents = formFilters.children;

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
  formSlider.removeAttribute('disabled', 'disabled');
  for (let i = 0; i < formNewComponents.length; i++) {
    formNewComponents[i].removeAttribute('disabled', 'disabled');
  }
  for (let i = 0; i < formFiltersComponents.length; i++) {
    formFiltersComponents[i].removeAttribute('disabled', 'disabled');
  }
};

disableForms();
enableForms();

export {disableForms, enableForms};
