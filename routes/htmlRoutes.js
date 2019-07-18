var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
  /*  db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });*/
    db.listing.findAll({}).then(function(dbListings) {
      console.log(dbListings);
      listings = [];
      for (listing of dbListings) {
        var isDog = true;
        var isMale = true;
        if (listing.dataValues.animalType === "Cat") {
          isDog = false;
        }
        if (listing.dataValues.gender === "Female") {
          isMale = false;
        }
        var dbListing = {
          id: listing.dataValues.id,
          name: listing.dataValues.petName,
          isDog: isDog,
          isMale: isMale
        }
        listings.push(dbListing);
      }
      res.render("index", {listings: listings});
    });
  });

  // Load sPAWtted main page and pass in an example by user id
  app.get("/spawtted/:id", function(req, res) {
    db.user.findOne({ where: { id: req.params.id } }).then(function(dbspawtted) {
      res.render("spawtted", {
        spawtted: dbspawtted
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
