import {getData} from './api.js';
import {renderMarkers, resetMarkers} from './map.js';
import {debounce} from './util.js';
import {PRICE_CORRELATION, ADS_MAX_NUMBER, RERENDER_DELAY} from './const.js';

const formFiltersElement = document.querySelector('.map__filters');
const formFiltersElementComponents = formFiltersElement.children;
const typeFilterElement = formFiltersElement.querySelector('#housing-type');
const priceFilterElement = formFiltersElement.querySelector('#housing-price');
const roomFilterElement = formFiltersElement.querySelector('#housing-rooms');
const guestFilterElement = formFiltersElement.querySelector('#housing-guests');
const featureFilterElement = formFiltersElement.querySelector('#housing-features');

const filterAllAdvertisments = (ads) => {
  const filterType = (ad) => typeFilterElement.value === ad.offer.type || typeFilterElement.value === 'any';
  const filterPrice = (ad) => (ad.offer.price <= PRICE_CORRELATION[priceFilterElement.value].max && ad.offer.price >= PRICE_CORRELATION[priceFilterElement.value].min);
  const filterRooms = (ad) => roomFilterElement.value === ad.offer.rooms.toString() || roomFilterElement.value === 'any';
  const filterGuests = (ad) => guestFilterElement.value === ad.offer.guests.toString() || guestFilterElement.value === 'any';
  const filterFeatures = (ad) => {
    const checkedFiltersElement = featureFilterElement.querySelectorAll('input:checked');
    const filteredFeatures = [];
    checkedFiltersElement.forEach((feature) => filteredFeatures.push(feature.value));
    if (ad.offer.features) {
      return filteredFeatures.every((feature) => ad.offer.features.includes(feature));
    }
    return false;
  };

  const filteredAds = [];
  for (const i of ads) {
    if(filterType(i) && filterPrice(i) && filterRooms(i) && filterGuests(i) && filterFeatures(i)) {
      filteredAds.push(i);
    }
    if (filteredAds.length >= ADS_MAX_NUMBER) {
      break;
    }
  }
  return filteredAds;
};

const updateFilters = () => {
  formFiltersElement.addEventListener('change', debounce(() => {
    getData((ads) => {
      resetMarkers();
      renderMarkers(filterAllAdvertisments(ads));
    });
  }, RERENDER_DELAY));
};

const initFilters = () => {
  getData((ads) => {
    resetMarkers(filterAllAdvertisments(ads));
  });
};

const resetFilters = () => {
  formFiltersElement.reset();
  getData((ads) => {
    resetMarkers();
    renderMarkers(filterAllAdvertisments(ads));
  });
};

const disableFilters = () => {
  formFiltersElement.classList.add('.map__filters--disabled');
  for (const i of formFiltersElementComponents) {
    i.setAttribute('disabled', 'disabled');
  }
};

const enableFilters = () => {
  formFiltersElement.classList.remove('.map__filters--disabled');
  for (const i of formFiltersElementComponents) {
    i.removeAttribute('disabled');
  }
};

export {updateFilters, initFilters, resetFilters, disableFilters, enableFilters};
