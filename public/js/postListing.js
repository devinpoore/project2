var petName = $("#petName");
var petBreed = $("#petBreed");
var petGender = $("#petGender");
var petType = $("#petType");
var lastKnownLocation = $("#lastKnownLocation");
var description = $("#petDescription");
// var userID = localStorage.getItem("");
var photoUrl = "";

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dvi7y8bvb',
    uploadPreset: 'aauqtyy6'
}, function (error, result) {
    if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image url: ', result.info.secure_url);
        photoUrl = result.info.secure_url;
    }
});

document.getElementById("upload_widget").addEventListener("click", function(event) {
    event.preventDefault();
    myWidget.open();
}, false);

//
$("#lostPetSubmit").on("click", function(event) {
    event.preventDefault();
    // add if to check and alert the user that they should add an image
    $("#listingModal").modal("hide");
    var addressString = lastKnownLocation.val().trim().split(" ").join("+");
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressString + "&key=AIzaSyB8eOGgIxYaJTzAqnBUh3pTyi0j2UQjSig",
        method: "GET"
    }).then(function(data) {
        var newListing = buildNewListing(data);  
        pushListing(newListing);
    });    
});

//
function buildNewListing(addressObj) {
    var lostLat = addressObj.results[0].geometry.location.lat;
    var lostLong = addressObj.results[0].geometry.location.lng;
    var newListingBuild = {
        name: petName.val().trim(),
        image: photoUrl,
        breed: petBreed.val().trim(),
        gender: petGender.val().trim(),
        type: petType.val().trim(),
        desc: description.val().trim(),
        lat: lostLat,
        long: lostLong,
        // userID: userID
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
        petName.val("");
        petBreed.val("");
        lastKnownLocation.val("");
        description.val("");
        location.reload();
    });
}