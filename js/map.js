import {createPopup} from './popup.js';
import {COORDINATES, ZOOM, ADS_MAX_NUMBER} from './const.js';

const formNewElement = document.querySelector('.ad-form');
const addressElement = formNewElement.querySelector('#address');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: COORDINATES.lat,
    lng: COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderMarker = (ad) => {
  const pinMarker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: icon,
    },
  );
  pinMarker.addTo(markerGroup).bindPopup(() => createPopup(ad));
};

const renderMarkers = (ads) => {
  ads.slice(0, ADS_MAX_NUMBER).forEach((ad) => {
    renderMarker(ad);
  });
};

const moveMainPinMarker = () => {
  mainPinMarker.on('moveend', (evt) => {
    const latitude = evt.target.getLatLng().lat.toFixed(5);
    const longitude = evt.target.getLatLng().lng.toFixed(5);
    addressElement.value = `Координаты: ${latitude}, ${longitude}`;
  });
};

const initMap = (cb) => {
  addressElement.value = `Координаты: ${COORDINATES.lat}, ${COORDINATES.lng}`;
  map.on('load', () => {
    mainPinMarker.addTo(map);
    moveMainPinMarker();
    cb();
  })
    .setView(COORDINATES, ZOOM);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const resetMap = () => {
  addressElement.value = `Координаты: ${COORDINATES.lat}, ${COORDINATES.lng}`;
  mainPinMarker.setLatLng(COORDINATES);
  map.setView(COORDINATES, ZOOM);
};

const resetMarkers = () => {
  markerGroup.clearLayers();
};

export {renderMarkers, initMap, resetMap, resetMarkers};
