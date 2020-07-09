// Note: Choropeth is overriding EarthqakeData on features menu

var choro;

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


function createFeatures(quakedata) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("Date: "+ Date(feature.properties.time) + "<br>Location: " + feature.properties.place + "</br>" + "Magnitude: " + feature.properties.mag);
    }

    var eq = L.geoJSON(quakedata, {
        onEachFeature: onEachFeature
    });

    var base = {
        "Light": lightlayer
    };

    var overlay = {
        "Earthquakes": eq
    };

    L.control.layers(base, overlay, {
        collapsed: false
    }).addTo(map);
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(earthquakedata) {

    choro = L.choropleth(earthquakedata, {
        valueProperty: "mag",
        scale: ["#e7e1ef", "#dd1c77"],
        steps: 10,
        mode: "q",
        style: {
            color:"#fff",
            weight: 1,
            fillOpacity: 0.8
        },

        onEachFeature: function(feature, layer) {
            layer.bindPopup("Date: "+ Date(feature.properties.time) + "<br>Location: " + feature.properties.place + "</br>" + "Magnitude: " + feature.properties.mag);
        }

    }).addTo(map);

    createFeatures(earthquakedata);
});