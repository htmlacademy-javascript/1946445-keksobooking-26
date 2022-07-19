import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray} from './util.js';

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const TITLES = [
  'Imperial Hotel Tokyo',
  'Akasaka Prince',
  'Ginza Capital',
  'Villa Fontaine Shiodome',
  'Keio Plaza',
  'Shinjuku Washington',
  'Conrad Tokyo',
  'Okura Tokyo',
  'Century Southern Tower',
  'Marunouchi'
];

const DESCRIPTIONS = [
  'Cтандарт',
  'Комфорт',
  'Комфорт плюс',
  'Бизнес',
  'Бизнес плюс',
  'Элит',
  'Премиум Элит'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKINGS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES_ARRAY = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createAdvert = function() {
  return {
    author: {
      avatar: getRandomArrayElement(AVATARS)
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${getRandomPositiveFloat(35.65000, 35.70000)}, ${getRandomPositiveFloat(139.70000, 139.80000)}`,
      price: getRandomPositiveInteger(1000, 20000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 6),
      checkin: getRandomArrayElement(CHECKINGS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomArray(FEATURES_ARRAY),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS)
    },
    location: {
      lat: getRandomPositiveFloat(35.65000, 35.70000),
      lng: getRandomPositiveFloat(139.70000, 139.80000)
    },
  };
};

const createAdverts = Array.from({length: 10}, createAdvert);

export {createAdverts};
