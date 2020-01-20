// define data source
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Creating map object
var map = L.map("map", {
  center: [39.7783, -110.4179],
  zoom: 5
});

// Adding tile layer
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);

// get the color of the marker, f(earthquake magnitude)
function getColor(magnitude) {
    switch(false) {
        case magnitude > 1:
            return "rgb(0,255,0)";
        case magnitude > 2:
            return "rgb(128,255,0)";
        case magnitude > 3:
            return "rgb(200,255,0)";
        case magnitude > 4:
            return "rgb(255,255,0)";
        case magnitude > 5:
            return "rgb(255,200,0)";
        case magnitude > 6:
            return "rgb(255,130,0)";
        case magnitude > 7:
            return "rgb(255,80,0)";
        case magnitude > 8:
            return "rgb(255,0,0)";
        default:
            return "black";
    }
}

// get the size of the marker, f(earthquake magnitude)
function getRadius(magnitude) {
    switch(false) {
        case magnitude > 1:
            return 5;
        case magnitude > 2:
            return 10;
        case magnitude > 3:
            return 15;
        case magnitude > 4:
            return 20;
        case magnitude > 5:
            return 25;
        case magnitude > 6:
            return 30;
        case magnitude > 7:
            return 35;
        case magnitude > 8:
            return 40;
        default:
            return 5;
    }
}

// visualization function for calculations, chart generation, etc
function visualize(url) {
    // get json data with arrow function
    d3.json(url, data => {
        console.log(data)
        // add geojson
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                color: "black",
                // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                shape: "circle",
                fillColor: getColor(feature.properties.mag),
                fillOpacity: 1,
                radius: getRadius(feature.properties.mag)
                };
            },
            // create popup
            onEachFeature: function(feature, layer) {
            layer.bindPopup("<br><h3>"+ feature.properties.title +"</h3><br>"+
                "<br>Magnitude: " + feature.properties.mag + "<br>"+
                "<br>Location: " + feature.properties.place + "<br>"+
                "<br>Details:" + "<a href=" + feature.properties.url + ">link"+ "</a>" + "<br>");
            }
        }).addTo(map)
    });



    // create legend
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        var limits = [1, 2, 3, 4, 5, 6, 7, 8];
        var colors = [
            "rgb(0,255,0)",
            "rgb(128,255,0)",
            "rgb(200,255,0)",
            "rgb(255,255,0)",
            "rgb(255,200,0)",
            "rgb(255,130,0)",
            "rgb(255,80,0)",
            "rgb(255,0,0)"
            ];
        var labels = [];

        // Add min & max
        var legendInfo = "<h1>Earth Quake Magnitude</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function (limits, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Add legend to the map
    legend.addTo(map);
}

function init(url) {
  // Grab a reference to the dropdown select element
    visualize(url);
}

// Initialize the dashboard
init(url);