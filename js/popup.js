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

const createPopup = (ad) => {
  addElement.querySelector('.popup__title').textContent = ad.offer.title;
  addElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  addElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  addElement.querySelector('.popup__type').textContent = typeObject[ad.offer.type];
  addElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} ${getRoomNumber(ad.offer.rooms)} для ${ad.offer.guests} ${(ad.offer.guests > 1) ? 'гостей' : 'гостя'}`;
  addElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  addElement.querySelector('.popup__description').textContent = ad.offer.description;
  addElement.querySelector('.popup__avatar').src = ad.author.avatar;

  if (ad.offer.features?.length && featureList.length > ad.offer.features.length) {
    featureContainer.textContent = '';
    ad.offer.features.forEach((index) => {
      const newFeatureItem = document.createElement('li');
      newFeatureItem.classList.add('popup__feature');
      newFeatureItem.classList.add(`popup__feature--${index}`);
      featureContainer.append(newFeatureItem);
    });
  }
  if (!ad.offer.features?.length) {
    featureContainer.textContent = '';
  }

  ad.offer.photos.forEach((photo) => {
    const photoNew = photosItem.cloneNode(true);
    photoNew.src = photo;
    photosList.append(photoNew);
  });
  photosItem.classList.add('hidden');
  return addElement;
};

export {createPopup};

