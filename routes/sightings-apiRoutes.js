var db = require("../models");

module.exports = function(app) {
  app.get("/api/sighting", function(req, res) {
    db.sighting.findAll({}).then(function(dbsightings) {
      res.json(dbsightings);

    });
  });

  app.post("/api/sighting", function(req, res) {
    db.sighting.create({
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

  app.delete("/api/sighting/:id", function(req, res) {
    db.sighting.destroy({ where: { id: req.params.id } }).then(function(dbsightings) {
      res.json(dbsightings);
    });
  });

  app.put("/api/sighting", function(req,res) {
    db.sighting.update(
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