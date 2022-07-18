import {createAdverts} from './create-data.js';

const typeObject = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const getRoomNumber = (quantity) => {
  if (quantity === 1) {
    return 'комната';
  } else if (quantity >= 2 && quantity <=4) {
    return 'комнаты';
  } else {
    return 'комнат';
  }
};

const addNew = createAdverts;
const userFragment = document.createDocumentFragment();
const addTemplate = document.querySelector('#card').content.querySelector('.popup');
const addElement = addTemplate.cloneNode(true);
const featureContainer = addElement.querySelector('.popup__features');
const featureList = featureContainer.querySelectorAll('.popup__feature');
const photosList = addElement.querySelector('.popup__photos');
const photosItem = photosList.querySelector('.popup__photo');
const addElementContent = addElement.children;

const createPopup = function() {
  addNew.forEach(({author, offer}) => {
    addElement.querySelector('.popup__title').textContent = offer.title;
    addElement.querySelector('.popup__text--address').textContent = offer.address;
    addElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    addElement.querySelector('.popup__type').textContent = typeObject[offer.type];
    addElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getRoomNumber(offer.rooms)} для ${offer.guests} ${(offer.guests > 1) ? 'гостей' : 'гостя'}`;
    addElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    addElement.querySelector('.popup__description').textContent = offer.description;
    addElement.querySelector('.popup__avatar').src = author.avatar;

    featureList.forEach((featureItem) => {
      const classContains = offer.features.some((feature) => featureItem.classList.contains(`popup__feature--${feature}`));
      if (!classContains) {
        featureItem.remove();
      }
    });

    offer.photos.forEach((photo) => {
      const photoNew = photosItem.cloneNode(true);
      photoNew.src = photo;
      photosList.append(photoNew);
    });
    photosItem.classList.add('hidden');

    for (let i = 0; i < addElementContent.length; i++) {
      if (addElementContent[i].textContent === '') {
        addElementContent[i].classList.add('hidden');
      }
    }
  });
  return addElement;
};

export {userFragment, createPopup};

