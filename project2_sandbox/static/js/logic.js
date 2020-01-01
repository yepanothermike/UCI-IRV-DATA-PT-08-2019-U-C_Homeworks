var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;
var url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

// Create the createMap function
function  createMap(bikeStations) {

  // Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap,
        "Streets": streets
    };

  // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Bike Stations": bikeStations
    };

  // Create the map object with options
    var map = L.map("map-id", {
        center: newYorkCoords,
        zoom: mapZoomLevel,
        layers: [lightmap, bikeStations]
    });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
};

// Create the createMarkers function
function createMarkers(response) {

    // Pull the "stations" property off of response.data
    var stations = response.data.stations;

    // Initialize an array to hold bike markers
    var bikeMarkers = [];

  // Loop through the stations array
    for (var index = 0; index < stations.length; index++) {
        var station = stations[index];

        // For each station, create a marker and bind a popup with the station's name
        var bikeMarker = L.marker([station.lat, station.lon])
            .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: "+ station.capacity + "<h3>");

        // Add the marker to the bikeMarkers array
        bikeMarkers.push(bikeMarker);
    }
  // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(bikeMarkers));
}

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json(url, createMarkers);