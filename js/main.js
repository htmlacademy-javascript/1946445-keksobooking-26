const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 5) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const getRandomArray = (array) => shuffle(array).slice(0, getRandomPositiveInteger(0, array.length));

const addLeadingZeros = (value, size) => {
  let result = `${value}`;
  while (result.length < size) {
    result = `0${result}`;
  }
  return result;
};

const AVATARS = shuffle(Array.from({length: 10}, (value, index) => `img/avatars/user${addLeadingZeros(index + 1, 2)}.png`));

const TITLES = [
  'header1',
  'header2',
  'header3',
  'header4',
  'header5',
  'header6',
  'header7',
  'header8',
  'header9',
  'header10'
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

const DESCRIPTIONS = [
  'description1',
  'description2',
  'description3',
  'description4',
  'description5',
  'description6',
  'description7',
  'description8',
  'description9',
  'description'
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
      title: getRandomArrayElement(TITLES),
      address: Object.values(LOCATION).join(', '),
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
    location: LOCATION,
  };
};

const adverts = Array.from({length: 10}, createAdvert);

console.log(adverts);
