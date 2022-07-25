import {disableForms,  enableForms,  setUserFormSubmit, showSuccessMessage} from './form.js';
import {getData} from './api.js';
import {initMap, renderMarkers} from './map.js';
import {showAlert} from './util.js';
import {updateFilters, initFilters, disableFilters} from './filters.js';

disableForms();
disableFilters();
initMap(() => {
  enableForms();
  setUserFormSubmit(showSuccessMessage);
  initFilters();
  updateFilters();
  getData(renderMarkers, showAlert);
});

