var map, infoWindow;
var listingWindow;
var bounds;
var Markers;
var infoWindowHTML;
var listingDOM = $(".list-group-item");

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
    // the logic of this method should be moved to the api routes and sequelize should handle filtering the results
    Markers = {};
    infoWindowHTML = {};

    bounds = map.getBounds();
    var lowLat = bounds.na.j;
    var highLat = bounds.na.l;
    var lowLong = bounds.ga.j;
    var highLong = bounds.ga.l;
    $.ajax({
      url: "/api/listing",
      method: "GET"
    }).then(function(listingData) {
      for (listing of listingData) {
        console.log(listing);
        var listingLat = parseFloat(listing.currentLocationLat);
        var listingLong = parseFloat(listing.currentLocationLong);
        if (listingLat > lowLat && listingLat < highLat && listingLong > lowLong && listingLong < highLong) {
          var markerId = listing.id.toString();
          infoWindowHTML[markerId] = buildInfoWindowHTML(listing);
          
          var marker = new google.maps.Marker({
            position: {lat: listingLat, lng: listingLong},
            map: map,
            title: markerId
          })          
          // marker.addListener("click", function() {
          //   some listener logic will need to be added here
          //   possibly loop through the markers in a separate function to add the listener
          // });          
          Markers[markerId] = marker;          
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

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // infoWindow.open(map);
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

listingDOM.on("click", function() {
  var clickId = $(this).data("id").toString();
  console.log(clickId);
  var clickMarker = Markers[clickId];
  map.setCenter(clickMarker.getPosition());
  listingWindow = new google.maps.InfoWindow({
    content: infoWindowHTML[clickId]
  });
  listingWindow.open(map, clickMarker);
  // google.maps.event.trigger(clickMarker, 'click');
});

//
function buildInfoWindowHTML(listingObj) {
  var htmlString = [
    "<h1>" + listingObj.petName + "</h1>",
    "<hr>",
    "<p>" + listingObj.petType + "</p>",
    "<p>Breed: " + listingObj.breed + "</p>",
    "<p>Gender: " + listingObj.gender + "</p>",
    "<p>Comments: " + listingObj.comments + "</p>"
  ].join("")
  return htmlString;
}