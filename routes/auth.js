var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app) {
 
    app.get("/layouts/main", authController.index);
 
};

//TODO: app.post("/layout/main", passport.authenticate("local-signup", {
//     successRedirect: "/dashboard",

//     failtureRedirect: "layouts/main"
// }));

