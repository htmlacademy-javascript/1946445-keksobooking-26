import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, shuffle, getRandomArray, addLeadingZeros} from './util.js';

const AVATARS = shuffle(Array.from({length: 10}, (value, index) => `img/avatars/user${addLeadingZeros(index + 1, 2)}.png`));

const TITLES = shuffle(Array.from({length: 10}, (value, index) => `title${addLeadingZeros(index + 1, 2)}`));

const DESCRIPTIONS = shuffle(Array.from({length: 10}, (value, index) => `description${addLeadingZeros(index + 1, 2)}`));

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


const LOCATION = {
  lat: getRandomPositiveFloat(35.65000, 35.70000),
  lng: getRandomPositiveFloat(139.70000, 139.80000)
};

const createAdvert = function(value, index) {
  return {
    author: {
      avatar: AVATARS[index]
    },
    offer: {
      title: TITLES[index],
      address: Object.values(LOCATION).join(', '),
      price: getRandomPositiveInteger(1000, 20000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 6),
      checkin: getRandomArrayElement(CHECKINGS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomArray(FEATURES_ARRAY),
      description: DESCRIPTIONS[index],
      photos: getRandomArray(PHOTOS)
    },
    location: LOCATION,
  };
};

const createAdverts = () => Array.from({length: 10}, createAdvert);

export {createAdverts};
