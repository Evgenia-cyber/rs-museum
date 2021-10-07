// marker1 [2.3364, 48.86091]
// marker2 [2.3333, 48.8602]
// marker3 [2.3397, 48.8607]
// marker4 [2.3330, 48.8619]
// marker5 [2.3365, 48.8625]

const markers = [
   [2.3364, 48.86091],
   [2.3333, 48.8602],
   [2.3397, 48.8607],
   [2.333, 48.8619],
   [2.3365, 48.8625],
 ];

mapboxgl.accessToken = TOKEN;

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v10',
  center: markers[0], // starting position [lng, lat]
  zoom: 16,
});

// Add zoom and rotation controls to the map.
const nav = new mapboxgl.NavigationControl({
  showCompass: true,
  showYoom: true,
});

map.addControl(nav, 'top-right');

// Add markers

markers.forEach((markerPosition, index) => {
  const markerColor = index === 0 ? '#030303' : '#666666';

  new mapboxgl.Marker({
    color: markerColor,
  })
    .setLngLat(markerPosition)
    .addTo(map);
});
