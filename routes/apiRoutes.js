var db = require("../models");

module.exports = function(app) {
  // Get all examples
<<<<<<< HEAD
  app.get("/api/updateList", function(req, res) {
    var boundObj = req.body;
    db.listings.findAll({
        where: {
          // lat is between the lat range from boundsObj
          // long is between the long range from boundsObj
        }
      }).then(function(dbListings) {
        // populate db data into the map list using handlebars
        res.render("index", {data: dbListings});
        // res.json(dbExamples);
    });
  });

  app.get("/api/addMarkers", function(req, res) {
    var boundObj = req.body;
    db.listings.findAll({
        where: {
          // lat is between the lat range from boundsObj
          // long is between the long range from boundsObj
        }
      }).then(function(dbListings) {
        // send the matching db entries to the browser so that it can create the map markers
        res.json(dbListings);
=======

  app.get("/api/examples", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
      res.json("Index");

>>>>>>> 3b2f93a10e689589c1778fb067b6ba44fabc5038
    });
  // });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
