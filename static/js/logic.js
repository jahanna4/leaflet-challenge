// **DELETE CONFIG FILE BEFORE SUBMITTING**
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(earthquakes) {
    features(earthquakes.features);
});

function features(quakedata) {
    
    function eachfeature(feature, layer) {
        layer.bindPopup("Date: " + Date(feature.properties.time) + "Summary: " + feature.properties.title);
    }    

    var myquakedata = L.geoJSON(quakedata, {
        eachfeature:eachfeature
    });

    mapinit(myquakedata);
}

function mapinit(myquakedata) {
    var lightlayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
                attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
                tileSize: 512,
                maxZoom: 10,
                zoomOffset: -1,
                id: "mapbox/streets-v11",
                accessToken: API_KEY
    });
    var map = L.map("map", {
    //   used St. Louis, MO as central point
        center: [38.6270, -90.1994],
        zoom: 4,
        layers: [lightlayer, myquakedata]
    });

    var base = {
        "Light": lightlayer
    };

    var overlay = {
        "Earthquakes": myquakedata
    };
    L.control.layers(base, overlay, {
        collapsed: false
    }).addTo(map)
}
