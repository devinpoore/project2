var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");

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
