//Register New User//

//Variables for new user registration

var $userName = $("#newusername");
var $firstName = $("#firstname");
var $lastName = $("#lastname");
var $email = $("#email");
var $newPassword = $("#newpassword");
var $address = $("#address");
var $phoneNumber = $("#phonenumber");
var $signUpBtn = $("#signupbutton")

//Variables for existing user login

var $loginEmail = $("#loginemail");
var $loginPassword = $("#loginpassword");
var $loginBtn = $("#loginbutton");


//API object containing each method used with the User database

var API = {

  addNewUser: function(user) {
    return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/user",
        data: JSON.stringify(user)
      });
  },
  getUser: function(user) {
    return $.ajax({
      url: "api/user",
      type: "POST",
      data: JSON.stringify(user)
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "api/user/" + id,
      type: "DELETE"
    });
  },
  updateUser: function(user) {
    return $.ajax({
      url: "api/user",
      type: "PUT",
      data: JSON.stringify(user)
    });
  }

};


//Add new user to the api/user database:

var newUserSubmit = function(event) {
  event.preventDefault();
  var emailFocus = $email.val().trim();
  var newUser = {
    userName: $userName.val().trim(),
    firstName: $firstName.val().trim(),
    lastName: $lastName.val().trim(),
    email: emailFocus,
    phoneNumber: $phoneNumber.val().trim(),
    streetAddress: $address.val().trim(),
    password: $newPassword.val().trim()
  };

  //alert messages for empty fields
  if (!(newUser.userName)) {
    alert("Please enter a user name for your account.");
    return;
  }
  if (!(newUser.firstName)) {
    alert("Please enter your first name.");
    return;
  }
  if (!(newUser.lastName)) {
    alert("Please enter your last name.");
    return;
  }
  if (!(newUser.email)) {
    alert("Please enter an email address to contact.");
    return;
  }
  if (!(newUser.password)) {
    alert("Please enter a password for your account.");
    return;
  }
  if (!(newUser.phoneNumber)) {
    alert("Please enter a phone number to contact.");
    return;
  }
  if (!(newUser.streetAddress)) {
    alert("Please enter your street address.");
    return;
  }
  

  //pass data into the API database, then clear out fields
  API.addNewUser(newUser).then(function() {
    // alert("Account has been added!");
    location.reload();
    // prompt user to log in
  });
  
  $("#loginModal").modal("show");
  $("#loginemail").val(emailFocus);
  $userName.val("");
  $firstName.val("");
  $lastName.val("");
  // $email.val("");
  $phoneNumber.val("");
  $address.val("");
  $newPassword.val("");

  
};


//TODO: Existing User Login
var userLogin = function(event) {
  event.preventDefault();

  var userLogin = {
    email: $loginEmail.val().trim(),
    password: $loginPassword.val().trim()
  };
  if (!(userLogin.email)) {
    alert("Please enter an email address to contact.");
    return;
  }
  if (!(userLogin.password)) {
    alert("Please enter a password for your account.");
    return;
  }
  API.getUser(userLogin).then(function() {
    for(var i = 0; i < API.length; i++) {
    if (userLogin.email === API[i].email && userLogin.password === API[i].password ) {
      console.log("this worked");
      localStorage.setItem("user", JSON.stringify(API[i]));
      // console.log(user);
    }
  }
  
})
};



//event listeners
  
$signUpBtn.on("click", newUserSubmit);
$loginBtn.on("click", userLogin);

