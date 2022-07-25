const ALERT_SHOW_TIME = 5000;
const GET_DATA_SERVER = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_DATA_SERVER = 'https://26.javascript.pages.academy/keksobooking';
const ADS_MAX_NUMBER = 10;
const RERENDER_DELAY = 500;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const TYPE_OBJECT = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const PRICE_CORRELATION = {
  high: {
    min: 50000,
    max: 100000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  low: {
    min: 0,
    max: 10000
  },
  any: {
    min: 0,
    max: 100000
  }
};

const COORDINATES = {
  lat: 35.65947,
  lng: 139.74611,
};

const ZOOM = 12;


export {PRICE_CORRELATION, COORDINATES, ZOOM, ALERT_SHOW_TIME, GET_DATA_SERVER, SEND_DATA_SERVER, ADS_MAX_NUMBER, RERENDER_DELAY, FILE_TYPES, TYPE_OBJECT};
