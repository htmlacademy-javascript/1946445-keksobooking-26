const ALERT_SHOW_TIME = 5000;
const GET_DATA_SERVER = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_DATA_SERVER = 'https://26.javascript.pages.academy/keksobooking';
const ADS_MAX_NUMBER = 10;
const RERENDER_DELAY = 500;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Не удалось загрузить данные';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showAlert, GET_DATA_SERVER, SEND_DATA_SERVER, ADS_MAX_NUMBER, RERENDER_DELAY, debounce, FILE_TYPES};
