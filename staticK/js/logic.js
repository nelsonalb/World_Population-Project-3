// Creating the map object
let myMap = L.map("map", {
  center: [34, 27],
  zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [22, 24],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var greyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var violetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


/////////////////////////////////////////////////
function markerColor(
  continents) {
    if (
      continents == 'Asia') return redIcon;
    else if (
      continents == "Oceania") return orangeIcon;
    else if (
      continents == 'Europe') return goldIcon;
    else if (
      continents == 'North America') return violetIcon;
      else if (
        continents == 'South America') return greyIcon;
    else if (
      continents == 'Antarctica'||continents =='Antarctic') return blueIcon;
    else if (
      continents == 'Africa') return greenIcon;
    else return "#00FF00";
  }
  
  function legendColor(
    continents) {
    if (
      continents == 'Asia') return "red";
    else if (
      continents== 'Oceania') return "orange";
    else if (
      continents == 'Europe') return "gold";
    else if (
      continents == 'North America') return "violet";
    else if (
      continents == 'South America') return "grey";
    else if (
      continents == 'Antarctica'||continents =='Antarctic') return "blue";
    else if (
      continents == 'Africa') return "green";
    else return "#00FF00";
  }
// Assemble the API query URL.
const url = "https://restcountries.com/v3.1/all";

// Get the data with d3.
d3.json(url).then(function(response) {
  

  // Create a new marker cluster group.
  let markers = L.marker();

  // console.log(response.length);

  // Loop through the data.
  for (let i = 0; i < response.length; i++) {

    // console.log(response[i]);

    // Set the data location property to a variable.
   

    let location = response[i].latlng;
    let lat = location[0];
    let long = location[1];
   
    

    // console.log(lat, long); 

    // Check for the location property.
    if (location) {
      console.log(response[i].continents)

      let country = L.marker([lat, long], {

        title: response[i].name.official,
        icon: markerColor(response[i].continents)
      }).addTo(myMap);

      country.bindPopup(`<h3>Location: ${response[i].name.official}</h3><hr>
      <p>Population: ${(response[i].population)}</p>
      <p>borders: ${response[i].borders}</p>
      <p>timezones: ${response[i].timezones}</p>`
      
      )

      // // Add a new marker to the cluster group, and bind a popup.
      // L.marker([parseFloat(lat), parseFloat(long)])
      //   .bindPopup(response[i].name.common);
    }

  }

  // Add our marker cluster layer to the map.
  // myMap.addLayer(markers);
  // Create an overlay object to hold our overlay.
  

  //Add legend
 // Add legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend"),
    continents = ['Asia', 'Oceania', 'Europe', 'North America', 'South America', 'Antarctica', 'Africa'];

  div.innerHTML += "<h3 style='text-align: center'>Continents</h3>";

  for (var i = 0; i < continents.length; i++) {
    div.innerHTML +=
      '<i style="background:' + legendColor(continents[i]) + '"></i> ' + continents[i] + '<br>';
  }
  return div;
};

legend.addTo(myMap); // Add the legend to the map



});
