import {TYPE_OBJECT} from './const.js';

const getRoomNumber = (quantity) => {
  if (quantity === 1) {
    return 'комната';
  } if (quantity >= 2 && quantity <=4) {
    return 'комнаты';
  }
  return 'комнат';
};

const addTemplateElement = document.querySelector('#card').content.querySelector('.popup');
const addElement = addTemplateElement.cloneNode(true);
const featureContainerElement = addElement.querySelector('.popup__features');
const featureListElement = featureContainerElement.querySelectorAll('.popup__feature');
const photosListElement = addElement.querySelector('.popup__photos');
const photosItemElement = photosListElement.querySelector('.popup__photo');

const createPopup = (ad) => {
  addElement.querySelector('.popup__title').textContent = ad.offer.title;
  addElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  addElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  addElement.querySelector('.popup__type').textContent = TYPE_OBJECT[ad.offer.type];
  addElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} ${getRoomNumber(ad.offer.rooms)} для ${ad.offer.guests} ${(ad.offer.guests > 1) ? 'гостей' : 'гостя'}`;
  addElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  addElement.querySelector('.popup__description').textContent = ad.offer.description;
  addElement.querySelector('.popup__avatar').src = ad.author.avatar;

  if (ad.offer.features && ad.offer.features.length > 0 && featureListElement.length > ad.offer.features.length) {
    featureContainerElement.textContent = '';
    ad.offer.features.forEach((index) => {
      const newFeatureItem = document.createElement('li');
      newFeatureItem.classList.add('popup__feature');
      newFeatureItem.classList.add(`popup__feature--${index}`);
      featureContainerElement.append(newFeatureItem);
    });
  }
  if (!ad.offer.features) {
    featureContainerElement.textContent = '';
  }

  if (ad.offer.photos && ad.offer.photos.length > 0) {
    photosListElement.textContent = '';
    ad.offer.photos.forEach((photo) => {
      const photoNew = document.createElement('img');
      photoNew.classList.add('popup__photo');
      photoNew.width = 45;
      photoNew.height = 40;
      photoNew.src = photo;
      photoNew.alt = 'Фотография жилья';
      photosListElement.append(photoNew);
    });
    photosItemElement.classList.add('hidden');
  }
  if (!ad.offer.photos) {
    photosListElement.remove();
  }
  return addElement;
};


export {createPopup};

