import {getData} from './api.js';
import {renderMarkers, resetMarkers} from './map.js';
import {debounce} from './util.js';
import {PRICE_CORRELATION, ADS_MAX_NUMBER, RERENDER_DELAY} from './const.js';

const formFilters = document.querySelector('.map__filters');
const formFiltersComponents = formFilters.children;
const typeFilter = formFilters.querySelector('#housing-type');
const priceFilter = formFilters.querySelector('#housing-price');
const roomFilter = formFilters.querySelector('#housing-rooms');
const guestFilter = formFilters.querySelector('#housing-guests');
const featureFilter = formFilters.querySelector('#housing-features');

const filterAllAdvertisments = (ads) => {
  const filterType = (ad) => typeFilter.value === ad.offer.type || typeFilter.value === 'any';
  const filterPrice = (ad) => (ad.offer.price <= PRICE_CORRELATION[priceFilter.value].max && ad.offer.price >= PRICE_CORRELATION[priceFilter.value].min);
  const filterRooms = (ad) => roomFilter.value === ad.offer.rooms.toString() || roomFilter.value === 'any';
  const filterGuests = (ad) => guestFilter.value === ad.offer.guests.toString() || guestFilter.value === 'any';
  const filterFeatures = (ad) => {
    const checkedFilters = featureFilter.querySelectorAll('input:checked');
    const filteredFeatures = [];
    checkedFilters.forEach((feature) => filteredFeatures.push(feature.value));
    if (ad.offer.features) {
      return filteredFeatures.every((feature) => ad.offer.features.includes(feature));
    }
    return false;
  };

  const filteredAds = [];
  for (let i = 0; i< ads.length; i++) {
    if(filterType(ads[i]) && filterPrice(ads[i]) && filterRooms(ads[i]) && filterGuests(ads[i]) && filterFeatures(ads[i])) {
      filteredAds.push(ads[i]);
    }
    if (filteredAds.length >= ADS_MAX_NUMBER) {
      break;
    }
  }
  return filteredAds;
};

const updateFilters = () => {
  formFilters.addEventListener('change', debounce(() => {
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
  formFilters.reset();
  getData((ads) => {
    resetMarkers();
    renderMarkers(filterAllAdvertisments(ads));
  });
};

const disableFilters = () => {
  formFilters.classList.add('.map__filters--disabled');
  for (let i = 0; i < formFiltersComponents.length; i++) {
    formFiltersComponents[i].setAttribute('disabled', 'disabled');
  }
};

const enableFilters = () => {
  formFilters.classList.remove('.map__filters--disabled');
  for (let i = 0; i < formFiltersComponents.length; i++) {
    formFiltersComponents[i].removeAttribute('disabled');
  }
};

export {updateFilters, initFilters, resetFilters, disableFilters, enableFilters};
