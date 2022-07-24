import {ADS_MAX_NUMBER, GET_DATA_SERVER, SEND_DATA_SERVER} from './util.js';

const getData = (onSuccess) => {
  fetch(GET_DATA_SERVER)
    .then((response) => response.json())
    .then((ads) => ads.slice(0, ADS_MAX_NUMBER))
    .then((ads) => {
      onSuccess(ads);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
