var map;
var infoWindow;
var listingWindow;
var bounds;
var Markers;
var infoWindowHTML;
var listingDOM = $(".list-group-item");

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 14,
    disableDefaultUI: true,
    styles: [
      { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
    ]
  });

  infoWindow = new google.maps.InfoWindow;
  
  map.addListener("idle", function() {
    // the logic of this method should be moved to the api routes and sequelize should handle filtering the results
    Markers = {};
    infoWindowHTML = {};

    bounds = map.getBounds();

    // console.log(bounds);
    // DP_NOTE: Google changed the keys of the bounds object created above - keys corrected 1.5.2020
    //          Issue: Markers were not generating in the Maps window

    var lowLat = bounds.pa.g;
    var highLat = bounds.pa.h;
    var lowLong = bounds.ka.g;
    var highLong = bounds.ka.h;
    $.ajax({
      url: "/api/listing",
      method: "GET"
    }).then(function(listingData) {
      for (listing of listingData) {
        // console.log(listing);
        var listingLat = parseFloat(listing.currentLocationLat);
        var listingLong = parseFloat(listing.currentLocationLong);

        if (listingLat > lowLat && listingLat < highLat && listingLong > lowLong && listingLong < highLong) {
          
          var markerId = listing.id.toString();
          infoWindowHTML[markerId] = buildInfoWindowHTML(listing);
          var listingHTML = buildInfoWindowHTML(listing);
          
          var marker = new google.maps.Marker({
            position: {lat: listingLat, lng: listingLong},
            map: map,
            title: markerId
          });

          marker.addListener("click", function() {
            Markers[marker.title].displayInfo(map);
          });

          var listingTest = new google.maps.InfoWindow({
            content: listingHTML
          });
          
          var newMarker = {
            marker: marker,
            infoWindowHTML: listingHTML,
            infoWindow: listingTest,
            displayInfo: function(map) {
              this.infoWindow.open(map, this.marker);
            },
            close: function() {
              console.log("closing info window")
              this.infoWindow.close();
            }
          };

          Markers[markerId] = newMarker;
          // Markers[markerId].marker.addListener("click", Markers[markerId].displayInfo(map));
        }
      }
    });
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

//
listingDOM.on("click", function() {
  // TODO: close any open info windows
  var clickId = $(this).data("id").toString();
  Markers[clickId].displayInfo(map);
  map.setCenter(Markers[clickId].marker.getPosition());
});

//
function buildInfoWindowHTML(listingObj) {
  var htmlString = [
    "<h2>" + listingObj.petName + "</h2>",
    "<hr>",
    "<img class='markerImage' src='" + listingObj.image + "' alt='Picture of " + listingObj.petName + " - spawtted'>",
    "<hr>",
    "<p>Pet Type: " + listingObj.animalType + "</p>",
    "<p>Breed: " + listingObj.breed + "</p>",
    "<p>Gender: " + listingObj.gender + "</p>",
    "<p>Comments: " + listingObj.comments + "</p>",
    "<hr>",
    "<button class='btn btn-success btn-md sighting-btn'>Report Sighting</button>"
  ].join("")
  return htmlString;
}