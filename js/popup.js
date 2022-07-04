import {createAdverts} from './create-data.js';


const userDialog = document.querySelector('.map__canvas');
const addTemplate = document.querySelector('#card').content.querySelector('.popup');

const addNew = createAdverts();

const userFragment = document.createDocumentFragment();

const typeObject = {
  Квартира: 'flat',
  Бунгало: 'bungalow',
  Дом: 'house',
  Дворец : 'palace',
  Отель: 'hotel'
};

addNew.forEach(({author, offer}) => {
  const addElement = addTemplate.cloneNode(true);
  addElement.querySelector('.popup__title').textContent = offer.title;
  addElement.querySelector('.popup__text--address').textContent = offer.address;
  addElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  addElement.querySelector('.popup__type').textContent = Object.keys(typeObject).find((key) => typeObject[key] === offer.type);
  addElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  addElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const featureContainer = addElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const featureModifier = offer.features.map((feature) => `popup__feature--${feature}`);
  featureList.forEach((featureItem) => {
    const modifier = featureItem.classList[1];
    if (!featureModifier.includes(modifier)) {
      featureItem.remove();
    }
  });
  addElement.querySelector('.popup__description').textContent = offer.description;
  const photosList = addElement.querySelector('.popup__photos');
  const photosItem = photosList.querySelector('.popup__photo');
  offer.photos.forEach((photo) => {
    const photoNew = photosItem.cloneNode(true);
    photoNew.src = photo;
    photosList.append(photoNew);
  });
  photosItem.classList.add('hidden');
  addElement.querySelector('.popup__avatar').src = author.avatar;
  const addElementContent = addElement.children;
  for (let i = 0; i < addElementContent.length; i++) {
    if (addElementContent[i].textContent === '') {
      addElementContent[i].classList.add('hidden');
    }
  }
  userFragment.append(addElement);
});


const finalDialog = userDialog.append(userFragment);

export {finalDialog};
