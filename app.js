mapboxgl.accessToken =
  "pk.eyJ1IjoiaHJvc2VtY21haG9uIiwiYSI6ImNqdTh2eDB6NjI5ajk0ZHNhb25kdGhrdHIifQ.5_ze2MlAP5E8gD3mxoJA6Q";
var weatherToken = "e3ca321c9bccd89f769c2be29197944f";
var weatherMap = document.getElementById("map");

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-104.9903, 39.7392], // starting position
  zoom: 8 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);

// grab content container to then populate weather html
var content = document.querySelector(".content");

map.on("click", function(info) {
  var latitude = info.lngLat.lat;
  var longitude = info.lngLat.lng;

  var query =
    "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&mode=html&units=imperial&appid=" + weatherToken;

  $.ajax({
    method: "GET",
    url: query
  }).done(function(data) {
    content.innerHTML = data;
  });
});