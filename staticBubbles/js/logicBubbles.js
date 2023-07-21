



// A function to determine the marker size based on the population
function markerSize(population) {
  return Math.sqrt(population) * 50;
}

function markerColor(area) {
  if (area < 10000) return "red";
  else if (area < 100000) return "orangered";
  else if (area < 1000000) return "orange";
  else if (area < 5000000) return "yellow";
  else if (area < 10000000) return "greenyellow";
  else return "#00FF00";
}

// Assemble the API query URL.
let url = "https://restcountries.com/v3.1/all";

function bubbleFunc() {

// Creating the map object
let myMap = L.map("map", {
  center: [34, 27],
  zoom: 2.2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Get the data with d3.
d3.json(url).then(function(response) {

  console.log(response.length);

  // Find min/max values for area and population
  let areas = [];
  let populations = [];
  response.forEach(data => {
    areas.push(data.area);
    populations.push(data.population);
  });

  let minArea = ss.min(areas);
  let maxArea = ss.max(areas);
  console.log(minArea);
  console.log(maxArea);
  let minPop = ss.min(populations);
  let maxPop = ss.max(populations);
  console.log(minPop);
  console.log(maxPop);
 

  // Loop through the data.
  for (let i = 0; i < response.length; i++) {

    // console.log(response[i]);

    // Set the data location property to a variable.
    let location = response[i].latlng;
    let lat = location[0];
    let long = location[1]; 

    // Check for the location property.
    if (location) {

      let country = L.circle([lat, long], {
        title: response[i].name.common,
        stroke: false,
        fillOpacity: 0.65,
        color: "black",
        fillColor: markerColor(response[i].area),
        radius: markerSize(response[i].population)
      }).addTo(myMap);

      // country.bindPopup(response[i].name.common)
      country.bindPopup(`<h3>Location: ${response[i].name.common}</h3><hr>
      <p>Population: ${response[i].population}</p>
      <p>Area (sqkm): ${response[i].area}</p>`);

      // Add a new marker to the cluster group, and bind a popup.
      L.marker([parseFloat(lat), parseFloat(long)])
        .bindPopup(response[i].name.common,
          );
    }

  }
  // Add legend
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    area = [0, 10000, 100000, 1000000, 5000000, 10000000];

    div.innerHTML += "<h3 style='text-align: center'>Area (km2)</h3>"

    for (var i = 0; i < area.length; i++) {
      div.innerHTML +=
      '<i style="background:' + markerColor(area[i] + 1) + '"></i> ' + area[i] + (area[i + 1] ? '&ndash;' + area[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(myMap)

});

};

bubbleFunc();
