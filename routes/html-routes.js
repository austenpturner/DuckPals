// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  app.get("/", (req, res) => {
    // If the user already logged in send them to their ducklist page
    if (req.user) {
      res.redirect("/ducklist");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already logged in send them to their ducklist page
    if (req.user) {
      res.redirect("/ducklist");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", (req, res) => {
    // If the user already logged in send them to their ducklist page
    if (req.user) {
      res.redirect("/ducklist");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the login page
  // If the user is logged in they can access their ducklist page
  app.get("/ducklist", isAuthenticated, (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Duck]
    }).then(response => {
      const ducks = [];
      for (let i = 0; i < response.Ducks.length; i++) {
        let name = response.Ducks[i].dataValues.name;
        ducks.push({
          name: name
        });
      }
      res.render("ducklist", { ducks: ducks });
    });
  });

  // If the user navigates to playground, redirect them to ducklist if there are logged in so they can pick a duck
  // If user is not logged in, redirect them to the login page
  app.get("/playground", isAuthenticated, (req, res) => {
    // res.render('playground', { duck: duckData });
    res.sendFile(path.join(__dirname, "../public/playground.html"));
  });

  app.get("/pay/splash", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pay.html"));
  });
};
