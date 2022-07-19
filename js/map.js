import {enableForms, formNew} from './form.js';
import {createPopup} from './popup.js';
import {createAdverts} from './create-data.js';

const address = formNew.querySelector('#address');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const COORDINATES = {
  lat: 35.65947,
  lng: 139.74611,
};
const ZOOM = 12;

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

createAdverts.forEach((offer)=>{
  const marker = L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng
  },
  {
    icon: icon,
  });
  marker.addTo(map).bindPopup(createPopup(offer));
});

mainPinMarker.on('moveend', (evt) => {
  const latitude = evt.target.getLatLng().lat.toFixed(5);
  const longitude = evt.target.getLatLng().lng.toFixed(5);
  address.value = `Координаты: ${latitude}, ${longitude}`;
});

const initMap = () => {
  enableForms();
  mainPinMarker.addTo(map);
  map.on('load', () => {
    address.value = `Координаты: ${COORDINATES.lat}, ${COORDINATES.lng}`;
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
  markerGroup.clearLayers();
  address.value = `Координаты: ${COORDINATES.lat}, ${COORDINATES.lng}`;
  mainPinMarker.setLatLng(COORDINATES);
  map.setView(COORDINATES, ZOOM);
};

resetMap();
initMap();

