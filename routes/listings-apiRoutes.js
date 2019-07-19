var db = require("../models");

module.exports = function (app) {
  // Get all listings and display on api/listings
  app.get("/api/listing", function(req, res) {
    db.listing.findAll({}).then(function(dblistings) {
      res.json(dblistings);
    });
  });

  app.get("/api/listing", function(req, res) {
    db.listing.findAll({}).then(function(dblistings) {
      res.json(dblistings);

    });
  });

  app.post("/api/listing", function (req, res) {
    var listing = req.body;
    console.log(listing);
    db.listing.create({
      petName: listing.name,
      // image: listing.image,
      // isLost: req.body.isLost,
      currentLocationLat: listing.lat,
      currentLocationLong: listing.long,
      breed: listing.breed,
      gender: listing.gender,
      animalType: listing.animalType,
      comments: listing.comments,
      userId: listing.userId // take this out once relationship with tables are 
    }).then(function (dblistings) {
      console.log(dblistings);
      res.json(dblistings);
    })
    // .catch(function(err) {
    //   // Whenever a validation or flag fails, an error is thrown
    //   // We can "catch" the error to prevent it from being "thrown", which could crash our node app
    //   res.json(err);
    // });
  });


  app.delete("/api/listing/:id", function (req, res) {
    db.listing.destroy({ where: { id: req.params.id } }).then(function (dblistings) {
      res.json(dblistings);
    });
  });


  app.put("/api/listing", function (req, res) {
    db.listing.update(
      {
        image: req.body.image,
        isLost: req.body.isLost,
        currentLocationLat: req.body.currentLocationLat,
        currentLocationLong: req.body.currentLocationLong,
        breed: req.body.breed,
        gender: req.body.gender,
        animalType: req.body.animalType,
        comments: req.body.comments

      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function (dblistings) {
      res.json(dblistings);
    })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

 
};