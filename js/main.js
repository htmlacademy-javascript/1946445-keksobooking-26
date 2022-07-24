import {setUserFormSubmit, showSuccessMessage} from './form.js';
import {getData} from './api.js';
import {renderMarkers} from './map.js';
import {showAlert} from './util.js';

getData(renderMarkers, showAlert);

setUserFormSubmit(showSuccessMessage);
