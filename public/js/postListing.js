var petName = $("#petName");
var petBreed = $("#petBreed");
var petGender = $("#petGender");
var petType = $("#petType");
var lastKnownLocation = $("#lastKnownLocation");
var description = $("#petDescription");

//
$("#lostPetSubmit").on("click", function(event) {
    event.preventDefault();
    $("#listingModal").modal("hide");
    var addressString = lastKnownLocation.val().trim().split(" ").join("+");
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressString + "&key=AIzaSyB8eOGgIxYaJTzAqnBUh3pTyi0j2UQjSig",
        method: "GET"
    }).then(function(data) {
        // console.log(data);        
        // console.log(lostLat);
        var newListing = buildNewListing(data);
        // console.log(newListing);   
        pushListing(newListing);
    });    
});

// could refactor this down - contemplate what's more elegant
function buildNewListing(addressObj) {
    var lostLat = addressObj.results[0].geometry.location.lat;
    var lostLong = addressObj.results[0].geometry.location.lng;
    var newListingBuild = {
        name: petName.val().trim(),
        breed: petBreed.val().trim(),
        gender: petGender.val().trim(),
        type: petType.val().trim(),
        desc: description.val().trim(),
        lat: lostLat,
        long: lostLong
    }
    return newListingBuild;
}

//
function pushListing(listing) {
    $.ajax({
        url: "/api/listing",
        method: "POST",
        data: listing
    }).then(function() {
        console.log("DP - Listing sent to the server");
        location.reload();
    });
}