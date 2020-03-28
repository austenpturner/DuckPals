// Requiring necessary npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
// const favicon = require("serve-favicon");
// const path = require("path");

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Requiring the Paypal API Dev Kit
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "ASDraD_C2gNn2uPXaX5kc-2HE7p22YaMdzI02DUY5FunSRf_b04yXVRVM2JSIl5g-On6vHtlBNZ2ZBHN",
  client_secret:
    "EJonUMOQqeu-QlnqYFl6NMZ8ce4aca8FP_bub9RLbCp0wDcP2EIhkb1dPlKvptF_zlWfVoQwKBkQOXF_"
});

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(ignoreFavicon);

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars middleware - use handlebars as template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === "/favicon.ico") {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/duck-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
