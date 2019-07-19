var map, infoWindow;
var bounds; 

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 12,
    disableDefaultUI: true,
    styles: [
      { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
    ]
  });
  infoWindow = new google.maps.InfoWindow;
  
  map.addListener("idle", function() {
    // updateList(bounds);
    // addMarkers(bounds);
    //console.log(map.getBounds());
    // the logic of this method should be moved to the api routes and sequelize should handle filtering the results
    var markers = {};
    var windows = {};

    bounds = map.getBounds();
    var lowLat = bounds.na.j;
    var highLat = bounds.na.l;
    var lowLong = bounds.ga.j;
    var highLong = bounds.ga.l;
    //console.log(lowLat, highLat, lowLong, highLong);
    $.ajax({
      url: "/api/listing",
      method: "GET"
    }).then(function(listingData) {
      console.log(listingData);
      for (listing of listingData) {
        var listingLat = parseFloat(listing.currentLocationLat);
        var listingLong = parseFloat(listing.currentLocationLong);
        //console.log(listingLat, listingLong);
        if (listingLat > lowLat && listingLat < highLat && listingLong > lowLong && listingLong < highLong) {
          console.log(listing.petName);
          // possibly name these markers
          var markerId = listing.id;

          var listingInfo = new google.maps.InfoWindow({
            content: listing.petName
          });
          windows[markerId] = listingInfo;
          
          var marker = new google.maps.Marker({
            position: {lat: listingLat, lng: listingLong},
            map: map,
            title: listing.id + ": " + listing.petName
          })
          
          marker.addListener("click", function() {
            windows[markerId].open(map, markers[markerId]);
          });
          
          markers[markerId] = marker;

          console.log(windows);
          console.log(markers);
          
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

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
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

function updateList(boundObj) {
  // $.ajax({
  //   url: "/api/listing",
  //   method: "GET"
  // }).then(function(listingData) {

  // });  
}

// TODO: info windows can be added to markers on the map
function addMarkers(boundObj) {
  // $.ajax({
  //   url: "/api/listing",
  //   method: "GET"
  // }).then(function(listingData) {

  // });
}

$("#test").on("click", function(event) {
  console.log(map.getBounds());
});