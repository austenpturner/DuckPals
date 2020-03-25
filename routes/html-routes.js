// Requiring path to so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = app => {
  app.get('/', (req, res) => {
    // If the user already logged in send them to the members page
    if (req.user) {
      return res.redirect('/ducklist');
    }
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.get('/playground', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/playground.html'));
  });

  app.get('/login', (req, res) => {
    // If the user already logged in send them to the members page
    if (req.user) {
      return res.redirect('/ducklist');
    }
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  app.get('/signup', (req, res) => {
    // If the user already logged in send them to the members page
    if (req.user) {
      return res.redirect('/ducklist');
    }
    res.sendFile(path.join(__dirname, '../public/signup.html'));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get('/ducklist', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/ducklist.html'));
  });
};
