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
        dateTime: req.body.dateTime,
        image: req.body.image,
        comments: req.body.comments
     
    }).then(function(dbsightings) {
      res.json(dbsightings);
    });
  });

  // Delete a user by id
  app.delete("/api/user/:id", function(req, res) {
    db.sightings.destroy({ where: { id: req.params.id } }).then(function(dbsightings) {
      res.json(dbsightings);
    });
  });

  //Update a user by id
  app.put("api/user/:id", function(req,res) {
    db.sightings.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbsightings){
      res.json(dbsightings);
    });
  });

};