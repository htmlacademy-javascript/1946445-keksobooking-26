import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray, addLeadingZeros} from './util.js';

const AVATARS = [];
for (let i = 1; i <= 10; i++) {
  AVATARS.push(`img/avatars/user${addLeadingZeros(i, 2)}.png`);
}

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
  const lat = getRandomPositiveFloat(35.65000, 35.70000);
  const lng = getRandomPositiveFloat(139.70000, 139.80000);
  return {
    author: {
      avatar: getRandomArrayElement(AVATARS)
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `Координаты: ${lat}, ${lng}`,
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
      lat,
      lng
    },
  };
};

const createAdverts = Array.from({length: 10}, createAdvert);

export {createAdverts};
