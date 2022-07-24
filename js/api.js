import {enableFilters} from './filters.js';
import {blockSubmitButton, unblockSubmitButton} from './form.js';
import {GET_DATA_SERVER, SEND_DATA_SERVER} from './util.js';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(GET_DATA_SERVER);
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные');
    }
    const advertisments = await response.json();
    onSuccess(advertisments);
    enableFilters();
  } catch (error) {
    onFail(error.message);
  }
};


const sendData = async (onSuccess, onFail, body) => {
  blockSubmitButton();
  try {
    const response = await fetch(
      SEND_DATA_SERVER,
      {
        method: 'POST',
        body,
      },
    );
    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }
    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
  unblockSubmitButton();
};


export {getData, sendData};
