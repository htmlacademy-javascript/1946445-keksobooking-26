import {setUserFormSubmit, showSuccessMessage} from './form.js';
import {getData} from './api.js';
import {renderMarkers} from './map.js';

getData(renderMarkers);

setUserFormSubmit(showSuccessMessage);
