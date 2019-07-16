//GEOIP_DB//

//Get User's location data with geo-ip

//to be taken from geoip-db
var localLat = '';
var localLng = '';


//On page load, initialize userLocation and Google Maps display:
$(document).ready(function () {
    userLocation();
    initMAP();

});

//Ajax call to geoip-db get the city data from geoip-db and define the 'local' variables

function userLocation() {
    $.ajax({
      url: "https://geoip-db.com/jsonp",
      jsonpCallback: "callback",
      dataType: "jsonp",
  
    }).then(function (location) {
      localLat = location.latitude;
      localLng = location.longitude;
      
    });
  };


//GOOGLE MAPS//

//scipt source:

{/* <script async defer src="https://maps.googleapis.com/maps/api/js?key=APIKEY&callback=initMap"> */ }

//style #map {
// height: 400px;
// width: 100%;
// }



//TODO: Initialize Google Map with Pet Markers

function initMAP() {
    //TODO: location variable to change based on address
    var location = {
        zoom: 8,
        center: { lat: localLat, lng: localLng }
    }

    var map = new google.maps.Map(document.getElementById('map'), options);
    


    //Array of pet data for markers
    var pets = []

    //loop through all pets and apply markers for each
    for(var i =0; i<petArray.length; i++){
        addMarker(pets[i])
    };




    //Main function to add markers to the google map, calling from data array
    function addMarker(petObject) {
          var marker = new google.maps.Marker({
        position: petObject.location,
        map: map,
        icon: petObject.iconImage
        // TODO: create an icon for the different marker types

      });
      //Check for icon to avoid undefined values
      if(petObject.icomImage) {
         marker.setIcon(petObject.iconImage); 
      }
      //Check for object content -- content is temporary variable
      if(petObject.content) {
    //TODO: Information window displays when marker is clicked
      var infoWindow = new google.maps.InfoWindow({
          content: petObject.content
      });

    // event listener for marker
      marker.addListener("click", function() {
        infoWindow.open(map,marker);
      });
      }
    }
};