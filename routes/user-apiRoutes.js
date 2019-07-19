var db = require("../models");

module.exports = function (app) {
  // Get all users in database, display as json on api/user

  app.get("/api/user", function (req, res) {
    db.user.findAll({}).then(function (dbuser) {
      res.json(dbuser);

    });
  });

  // Create a new user profile
  app.post("/api/user", function (req, res) {
    db.user.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      streetAddress: req.body.streetAddress,
      password: req.body.password
    }).then(function (dbuser) {
      res.json(dbuser);
    })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // Delete a user by id
  app.delete("/api/user/:id", function (req, res) {
    db.user.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbuser) {
      res.json(dbuser);
    });
  });

  //Update a user by id
  app.put("/api/user", function (req, res) {
    db.user.update(
      {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        streetAddress: req.body.streetAddress,
        password: req.body.password
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function (dbuser) {
      res.json(dbuser);
    })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });


  //Existing User Login
  app.post("/api/user", function (req, res) {
    db.user.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      if (!user) {
        res.redirect('/');
      } else {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (result == true) {
            res.redirect("/" + user.id);
          } else {
            res.send('Incorrect password');
            res.redirect('/');
          }
        });
      }
    });
  });

  //View main page as user after login
  app.get("/:id", function (req, res) {
    db.user.findOne({ where: { id: req.params.id } })
    .then(function (user) {
      res.render("layouts/main", user.dataValues)
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });


  //View user info on account page
  app.get("/account/:id", function (req, res) {
    db.user.findOne({ where: { id: req.params.id } })
      .then(account => {
        res.render("account", account.dataValues)
      });
  });

};
