d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson", function(earthquakes) {
    data = earthquakes;
    console.log(data);

    function initmap(earthquakes) {
            var lightlayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
                attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
                tileSize: 512,
                maxZoom: 9,
                zoomOffset: -1,
                id: "mapbox/streets-v11",
                accessToken: API_KEY
          });
          
          var map = L.map("map", {
            //   used St. Louis, MO as central point
              center: [38.6270, -90.1994],
              zoom: 3,
              layers: [lightlayer, earthquakes]
          });
        
          var base = {
              "Light": lightlayer
          };
        
          var overlay = {
              "Earthquakes": earthquakes
          };
        
          L.control.layers(base, overlay, {
              collapsed: false
          }).addTo(map)
    }
    // initmap();

    function mapmarkers(earthquakes) {
        raw = data.features
        console.log(raw);
    //     for (var i=1; i<raw.length; i++)
    //             // L.marker([raw[i].geometry.coordinates[0], raw[i].geometry.coordinates[1]]).addTo(map);
    //             console.log(raw[i].geometry);
    }
});
// function initmap(earthquakes) {
//     var lightlayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 9,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: API_KEY
//   });
  
//   var map = L.map("map", {
//     //   used St. Louis, MO as central point
//       center: [38.6270, -90.1994],
//       zoom: 3,
//       layers: [lightlayer, earthquakes]
//   });

//   var base = {
//       "Light": lightlayer
//   };

//   var overlay = {
//       "Earthquakes": earthquakes
//   };

//   L.control.layers(base, overlay, {
//       collapsed: false
//   }).addTo(map)
// // }
// // initmap();

//     // function mapmarkers(earthquakes) {
//     //     var quakelocs = [];
//     //     var quakemags = [];
//     //     var features = earthquakes.features;
//     //     // var properties = response.features.properties;
//     //     // var geometry = response.features.geometry;

//     //     for (var i=0; i<features.length; i++) {
//     //         var featureloc = features[i];
//     //         var quakelocation = L.marker(featureloc.geometry.coordinates);
//     //         // var quakemagnitude = L.marker(featureloc.properties.mag);

//     //         quakelocation.addTo(map);

//     //         quakelocs.push(quakelocation);
//     //         // quakemags.push(quakemagnitude);


//     //         // var coordinates = geometry
//     //     }
//     //     console.log(quakelocs);
//     //     initmap(L.layergroup(quakelocs));
//     // }
// });