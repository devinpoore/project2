
// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

//Creates the base url http://localhost:3000 or whatever deployment site is
var baseUrl = window.location.protocol + "//" + window.location.hostname +":" + window.location.port 
console.log(baseUrl)
var $deleteButton = $(".deletePost")
// The API object contains methods for each kind of request we'll make
let listingAPI = {
  saveListing: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: baseUrl+ "/api/listing",
      data: JSON.stringify(example)
    });
  },
  getListing: function() {
    return $.ajax({
      url: baseUrl+ "api/listing",
      type: "GET"
    });
  },
  deleteListing: function(id) {
    return $.ajax({
      url: baseUrl+ "/api/listing/" + id,
      type: "DELETE"
    });
  }
};

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshListing = function() {
//   API.getListing().then(function(data) {
//     var $listing = data.map(function(listing) {
//       var $a = $("<a>")
//         .text(listing.text)
//         .attr("href", "/listing/" + listing.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": listing.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {

  var idToDelete = $(this)
    .attr("post-id");
    console.log(this)


  listingAPI.deleteListing(idToDelete).then(function() {
    location.reload()
  });
};



// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
$deleteButton.on("click", handleDeleteBtnClick);
