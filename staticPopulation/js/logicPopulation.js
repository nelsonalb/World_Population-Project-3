// reading data
let url = "https://restcountries.com/v3.1/all";
var result = [];
d3.json(url).then(function(response) {
 
  // groupby and sum population by region and subregion - this section completed with tutor
  response.reduce(function(res, value) {
    if (!res[value.region]) {
      res[value.region] = { Id: value.region, population: 0 , subregions: []};
      result.push(res[value.region])
    }
    res[value.region].population += value.population;
    return res;
  }, {});

    response.reduce(function(res2, value2) {
      
    if (!res2[value2.subregion]) {
      res2[value2.subregion] = { Id: value2.subregion, population: 0 };
      resultregion = result.filter(r => r.Id == value2.region)[0]
      resultregion.subregions.push(res2[value2.subregion])
    }
     res2[value2.subregion].population += value2.population;
    return res2;
  }, {});

console.log(result)

// Display the default plot
function init() {
  IDs = []
  populations = []

  for(let i=0; i < result.length; i ++) {
    IDs.push(result[i].Id)
    populations.push(result[i].population)
  }
  console.log(result.population);
  let data = [{
    values: populations,
    labels: IDs,
    type: "pie"
  }];

  let layout = {
    height: 500,
    width: 700,
    title: "Population by Region"
  };

  Plotly.newPlot("pie", data, layout);
// create the initial subregion pie
  subIDs = []
  subpopulations = []
  subregionresult = result.filter(r => r.Id == "Asia")[0]
  for(let i=0; i < subregionresult.subregions.length; i ++) {
    subIDs.push(subregionresult.subregions[i].Id)
    subpopulations.push(subregionresult.subregions[i].population)
  }
  let data2 = [{
    values: subpopulations,
    labels: subIDs,
    type: "pie"
  }];

  let layout2 = {
    height: 500,
    width: 700,
    title: "Population by Subregion"
  };

  Plotly.newPlot("pie2", data2, layout2);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let region = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  subIDs = []
  subpopulations = []
  subregionresult = result.filter(r => r.Id == region)[0]
  for(let i=0; i < subregionresult.subregions.length; i ++) {
    subIDs.push(subregionresult.subregions[i].Id)
    subpopulations.push(subregionresult.subregions[i].population)
  }

  let data2 = [{
    values: subpopulations,
    labels: subIDs,
    type: "pie"
  }];

  let layout2 = {
    height: 500,
    width: 700,
    title: "Population by Subregion"
  };

  Plotly.newPlot("pie2", data2, layout2);
// Call function to update the chart
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "labels", [newdata]);
}

 init();


});
