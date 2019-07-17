var db = require("../models");

module.exports = function(app) {
  // Get all listings and display on api/listings

  app.get("/api/listings", function(req, res) {
    db.listings.findAll({}).then(function(dblistings) {
      res.json(dblistings);

    });
  });

  // Create a new user profile
  app.post("/api/listings", function(req, res) {
    db.listings.create({
      image: req.body.image,
      isLost: req.body.isLost,
      isFound: req.body.isFound,
      currentLocationLat: req.body.currentLocationLat,
      currentLocationLong: req.body.currentLocationLong,
      breed: req.body.breed,
      gender: req.body.gender,
      animalType: req.body.animalType,
      comments: req.body.comments

    }).then(function(dblistings) {
      res.json(dblistings);
    });
  });

  // Delete a user by id
  app.delete("/api/listings/:id", function(req, res) {
    db.listings.destroy({ where: { id: req.params.id } }).then(function(dblistings) {
      res.json(dblistings);
    });
  });

  //Update a user by id
  app.put("api/listings/:id", function(req,res) {
    db.listings.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dblistings){
      res.json(dblistings);
    });
  });

};