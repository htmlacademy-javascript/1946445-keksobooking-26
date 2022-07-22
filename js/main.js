import './create-data.js';
import {createPopup} from './popup.js';
import {setUserFormSubmit, showSuccessMessage} from './form.js';
import {getData} from './api.js';


getData((ads) => {
  createPopup(ads.slice(0, 9));
});

setUserFormSubmit(showSuccessMessage);
