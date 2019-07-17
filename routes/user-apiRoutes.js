var db = require("../models");

module.exports = function(app) {
  // Get all users in database, display as json on api/user

  app.get("/api/user", function(req, res) {
    db.user.findAll({}).then(function(dbuser) {
      res.json(dbuser);

    });
  });

  // Create a new user profile
  app.post("/api/user", function(req, res) {
    db.user.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      streetAddress: req.body.streetAddress,
      password: req.body.password
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Delete a user by id
  app.delete("/api/user/:id", function(req, res) {
    db.user.destroy({ where: { id: req.params.id } }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  //Update a user by id
  app.put("api/user/:id", function(req,res) {
    db.user.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbuser){
      res.json(dbuser);
    });
  });

};
