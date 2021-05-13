import 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/style.css';

document.querySelector('#app').innerHTML = `
  <div id="map"></div>
`

let locations = [];

navigator.geolocation.getCurrentPosition((position) => {
  locations = [ ...locations, { position: position } ];
  const lat = locations[0].position.coords.latitude;
  const lon = locations[0].position.coords.longitude;

  const macarte = initMap({lat, lon});
  
}, (error) => console.log(error), {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
});

const markerIcon = L.icon({
  iconUrl: './images/marker.png',
  iconSize: [40, 40], // size of the icon
  iconAnchor: [40, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function initMap({lat, lon}) {

  const carte = L.map('map').setView([lat, lon], 6);
  
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 20
  }).addTo(carte);

  locations.forEach(location => {
    L.marker([location.position.coords.latitude, location.position.coords.longitude], { icon: markerIcon }).addTo(carte);
  });

  return carte;
}
