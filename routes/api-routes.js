// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport');
const paypal = require('paypal-rest-sdk');

module.exports = app => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, '/api/login');
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post('/pay', (req, res) => {
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'http://localhost:8080/success',
        cancel_url: 'http://localhost:8080/cancel'
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'Duck Buck',
                sku: '001',
                price: '1.00',
                currency: 'USD',
                quantity: 1
              }
              // {
              //   name: 'Duck Bucks (10)',
              //   sku: '002',
              //   price: '10.00',
              //   currency: 'USD',
              //   quantity: 1
              // },
              // {
              //   name: 'Duck Bucks (50)',
              //   sku: '003',
              //   price: '1,000.00',
              //   currency: 'USD',
              //   quantity: 1
              // }
            ]
          },
          amount: {
            currency: 'USD',
            total: '1.00'
          },
          description: 'This is the payment description.'
        }
      ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
        console.log(payment);
      }
    });

    app.get('/success', (req, res) => {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;

      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: 'USD',
              total: '1.00'
            }
          }
        ]
      };

      paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
      ) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log('Get Payment Response');
          console.log(JSON.stringify(payment));
          res.send(
            `Success! 1 Duck Buck has been credited to: ${payment.payer.payer_info.first_name}
            <button><a href='/playground.html'>Back to Your Duck</a></button>`
          );
        }
      });
    });
  });

  app.get('/cancel', (req, res) => res.send('cancelled'));

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/login');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
