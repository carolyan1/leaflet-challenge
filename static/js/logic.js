//Leaflet-Step-1
//URL Picked: M4.5+ Earthquakes in past 7 days: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
// Creating map object
var myMap = L.map("mapid", { 
    center: [40.7128, -74.0060],
    zoom: 2
  });
  
// Adding tile layer to the map
var thislayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


//load data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

// var dmarkers = []
//need to get coordinates, magnitude, size, dept (third coordinate for each earthquake)
//Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color.

d3.json(url).then(function(data) {
    console.log(data);
    for (i=0; i<data.features.length; i++){
            var coordinates = data.features[i].geometry.coordinates;
            var mag = data.features[i].properties.mag;
            var dept = data.features[i].geometry.coordinates[2];
            var place = data.features[i].properties.place;
            // data.forEach(d=>dmarkers.push(L.marker(coordinates).bindPopup("<h1>"+place+"</h1>")))

            // Conditionals for color
            var colorOpa = "";
            if (dept > 300) {
                colorOpa = 1;
            }
            else if (dept >75) {
                colorOpa = 0.75;
            }
            else if (dept > 50) {
                colorOpa = 0.5;
            }
            else {
                colorOpa = 0.25;
            }

            //Create a circle and pass in the coordinates
            //Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color.
            //and earthquakes with greater depth should appear darker in color. 
            L.circle([coordinates[1],coordinates[0]], {
                radius:mag*50000,
                fillOpacity: colorOpa,
                fill: true
            }).bindPopup("<h3>" + place + "</h3>" + dept).addTo(myMap)
        }})
 

//Create a map using leaflet that plots all of the earthquakes from the data set based on their longitude and latitude
//Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. 

//Earthquakes with higher magnitudes should appear larger 
//and earthquakes with greater depth should appear darker in color.

//Include popups that provide additional information about the earthquake when a marker is clicked.

//Create a legend that will provide context for your map data.


