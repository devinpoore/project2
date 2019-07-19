var bcrypt = require("bcrypt");
var db = require("../models");

module.exports = function(passport, user) {
    var User = db.user;
    var LocalStrategy = require("passport-local").Strategy;
}

passport.use(new LocalStrategy (
   
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, 
    function(req,email,password,done) {
        var generateHash = function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        }
    }
    
));

User.findOne({
    where: {
        email:email
    }
}).then(function(user){
    if(user)
    {
        return done(null, false, {
            message: "That email is already registered."
        });
    }
});

