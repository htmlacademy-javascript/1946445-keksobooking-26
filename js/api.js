import {ADS_MAX_NUMBER, GET_DATA_SERVER, SEND_DATA_SERVER} from './util.js';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(GET_DATA_SERVER);
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные');
    }
    const advertisments = await response.json();
    onSuccess(advertisments.slice(0, ADS_MAX_NUMBER));
  } catch (error) {
    onFail(error.message);
  }
};


const sendData = async (onSuccess, onFail, body) => {
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
};


export {getData, sendData};
