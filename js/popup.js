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

const addTemplate = document.querySelector('#card').content.querySelector('.popup');
const addElement = addTemplate.cloneNode(true);
const featureContainer = addElement.querySelector('.popup__features');
const featureList = featureContainer.querySelectorAll('.popup__feature');
const photosList = addElement.querySelector('.popup__photos');
const photosItem = photosList.querySelector('.popup__photo');

const createPopup = (element) => {
  addElement.querySelector('.popup__title').textContent = element.offer.title;
  addElement.querySelector('.popup__text--address').textContent = element.offer.address;
  addElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  addElement.querySelector('.popup__type').textContent = typeObject[element.offer.type];
  addElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} ${getRoomNumber(element.offer.rooms)} для ${element.offer.guests} ${(element.offer.guests > 1) ? 'гостей' : 'гостя'}`;
  addElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  addElement.querySelector('.popup__description').textContent = element.offer.description;
  addElement.querySelector('.popup__avatar').src = element.author.avatar;

  if (featureList.length > element.offer.features.length && element.offer.features.length > 0) {
    featureContainer.textContent = '';
    element.offer.features.forEach((index) => {
      const newFeatureItem = document.createElement('li');
      newFeatureItem.classList.add('popup__feature');
      newFeatureItem.classList.add(`popup__feature--${index}`);
      featureContainer.append(newFeatureItem);
    });
  }
  if (element.offer.features.length < 1) {
    featureContainer.textContent = '';
  }

  element.offer.photos.forEach((photo) => {
    const photoNew = photosItem.cloneNode(true);
    photoNew.src = photo;
    photosList.append(photoNew);
  });
  photosItem.classList.add('hidden');
  return addElement;
};

export {createPopup};

