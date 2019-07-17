var db = require("../models");

module.exports = function(app) {
  // Get all users in database, display as json on api/user

  app.get("/api/sightings", function(req, res) {
    db.sightings.findAll({}).then(function(dbsightings) {
      res.json(dbsightings);

    });
  });

  // Create a new user profile
  app.post("/api/sightings", function(req, res) {
    db.sightings.create({
        sightingLocationLat: req.body.sightingLocationLat,
        sightingLocationLong: req.body.sightingLocationLong,
        dateTime: req.body.dateTime,
        image: req.body.image,
        comments: req.body.comments
     
    }).then(function(dbsightings) {
      res.json(dbsightings);
    })
    .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
          res.json(err);
        });
  });

  // Delete a user by id
  app.delete("/api/user/:id", function(req, res) {
    db.sightings.destroy({ where: { id: req.params.id } }).then(function(dbsightings) {
      res.json(dbsightings);
    });
  });

  //Update a user by id
  app.put("/api/user", function(req,res) {
    db.sightings.update(
      {
        sightingLocationLat: req.body.sightingLocationLat,
        sightingLocationLong: req.body.sightingLocationLong,
        dateTime: req.body.dateTime,
        image: req.body.image,
        comments: req.body.comments
     
    },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbsightings){
      res.json(dbsightings);
    })
    .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
          res.json(err);
        });
  });

};