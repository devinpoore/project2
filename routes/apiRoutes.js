var db = require("../models");

module.exports = function (app) {
  // Get all examples

  app.get("/api/examples", function (req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.json("Index");

    app.get("/api/addMarkers", function (req, res) {
      var boundObj = req.body;
      db.listings.findAll({
        where: {
          // lat is between the lat range from boundsObj
          // long is between the long range from boundsObj
        }
      }).then(function (dbListings) {
        // send the matching db entries to the browser so that it can create the map markers
        res.json(dbListings);
      });
      // });

      // Create a new example
      app.post("/api/examples", function (req, res) {
        db.Example.create(req.body).then(function (dbExample) {
          res.json(dbExample);
        });
      });

      // Delete an example by id
      app.delete("/api/examples/:id", function (req, res) {
        db.Example.destroy({
          where: {
            id: req.params.id
          }
        }).then(function (dbExample) {
          res.json(dbExample);
        });
      });
    });
  })
}