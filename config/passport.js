var bcrypt = require("bcrypt");

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require("passport-local").Strategy;
}

passport.use("index", new LocalStrategy (
   
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }
    
));