var db = require("../models");

module.exports = function(app) {
  // Get all examples

  app.get("/api/spawtted", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
      res.json("Index");

    });
  // });

  // Create a new user profile
  app.post("/api/spawtted", function(req, res) {
    db.user.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      streetAddress: req.body.streetAddress

    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Delete a user by id
  app.delete("/api/spawtted/:id", function(req, res) {
    db.user.destroy({ where: { id: req.params.id } }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  //Update a user by id
  app.put("api/spawtted/:id", function(req,res) {
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
