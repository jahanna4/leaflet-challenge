var map = L.map("map", {
    //   used St. Louis, MO as central point
        center: [38.6270, -90.1994],
        zoom: 4
    });

var lightlayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 10,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(map);

function createFeatures(quakesdata) {
    
    var geo = L.geoJSON(quakesdata, {
        // var color = [];
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Date: "+ Date(feature.properties.time) + "<br>Location: " + feature.properties.place + "</br>" + "Magnitude: " + feature.properties.mag);
        },
    // // Tried to change the color of the markers but the code is not working
    //     style: function(feature) {
    //         var colormeasure = feature.properties.mag;
    //         if (colormeasure <0.5) {
    //             color = "blue";
    //         }
    //         else if (colormeasure <1.0) {
    //             color = "green";
    //         }
    //         else if (color <1.5) {
    //             color = "yellow";
    //         }
    //         else if (color <2.0) {
    //             color = "orange";
    //         }
    //         else {color = "red";}
    //     }
    }).addTo(map);

    var base = {
        "Light": lightlayer
    };

    var overlay = {
        "Earthquakes":geo
    };

    L.control.layers(base, overlay, {
        collapsed: false
    }).addTo(map);
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createFeatures);



// I tried this code to create the map and layers, set markers
// and bind the popups but only the initial map worked.
// For the markers, I tried L.circle, L.markers, new L.circleMarkers,
// I also tried to include the radius with the lat & lng coordinates as well as
// pushing the markers to the map through the for loop but none of this worked.

// var map = L.map("map", {
//     //   used St. Louis, MO as central point
//         center: [38.6270, -90.1994],
//         zoom: 4
//     });

// var lightlayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 10,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
// }).addTo(map);

// function initmap(earthquakedata) {

//     var eq = L.geoJSON(earthquakedata, {
//         onEachFeature: function(feature, layer) {
//             layer.bindPopup("Date: "+ Date(feature.properties.time) + "<br>Location: " + feature.properties.place + "</br>" + "Magnitude: " + feature.properties.mag);
//         }
//     }).addTo(map);

//     var base = {
//         "Light": lightlayer
//     };

//     var overlay = {
//         "Earthquakes":eq
//     };

//     L.control.layers(base, overlay, {
//         collapsed: false
//     }).addTo(map);
//     circlemarkers(earthquakedata);
// }

// function circlemarkers(response) {
//     var features = response.features;
//     var circlelocs = [];

//     for (var i=0; i<features.length; i++) {
//         var feature = features[i];
//         var lat = feature.geometry.coordinates[0];
//         var lng = feature.geometry.coordinates[1];
//         // var rad = feature.geometry.coordinates[2];
//         var circ = ([lat, lng]);
//         var cmark = L.circle(circ);
//         cmark.bindPopup("Date: "+ Date(feature.properties.time) + "<br>Location: " + feature.properties.place + "</br>" + "Magnitude: " + feature.properties.mag);
//         // cmark.addTo(map);
//         circlelocs.push(cmark);
//         console.log(circ);
//     }
//     // initmap(L.layerGroup(circlelocs));
// }

// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", initmap);