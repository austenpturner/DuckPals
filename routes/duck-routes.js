const db = require("../models");

module.exports = app => {
  app.get("/api/duckbuck", (req, res) => {
    db.User.findOne({ where: { id: req.user.id } })
      .then(buckAdded => {
        return buckAdded.increment("duckbucks", { by: 1 });
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get("/api/buyfood", (req, res) => {
    db.User.findOne({ where: { id: req.user.id } })
      .then(foodAdded => {
        return {
          duckfood: foodAdded.increment("duckfood", { by: 3 }),
          duckbucks: foodAdded.decrement("duckbucks", { by: 1 })
        };
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post("/ducklist/sleepy", function(req, res) {
    db.Duck.update({ sleepy: 1 }, { where: { UserId: req.user.id } })
      .then(updatedDuck => {
        return res.json(updatedDuck);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post("/ducklist/notsleepy", function(req, res) {
    db.Duck.update({ sleepy: 0 }, { where: { UserId: req.user.id } })
      .then(updatedDuck => {
        return res.json(updatedDuck);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post("/ducklist/hungry", function(req, res) {
    db.Duck.findOne({ where: { UserId: req.user.id } }).then(foundDuck => {
      if (foundDuck.hungry === true) {
        return res.json(foundDuck);
      } else if (foundDuck.hungry === false) {
        db.Duck.update({ hungry: 1 }, { where: { UserId: req.user.id } }).then(
          updatedDuck => {
            return res.json(updatedDuck);
          }
        );
      }
    });
  });

  app.post("/ducklist/nothungry", function(req, res) {
    db.Duck.findOne({ where: { UserId: req.user.id } }).then(foundDuck => {
      if (foundDuck.hungry === true) {
        db.Duck.update({ hungry: 0 }, { where: { UserId: req.user.id } }).then(
          foundDuck => {
            return res.json(foundDuck);
          }
        );
      } else if (foundDuck.hungry === false) {
        db.User.findOne({ where: { id: req.user.id } }).then(foundUser => {
          return foundUser.decrement("duckfood", { by: 1 });
        });
      }
    });
  });

  app.post("/ducklist/color", function(req, res) {
    db.Duck.update(req.body, { where: { UserId: req.user.id } })
      .then(updatedDuck => {
        return res.json(updatedDuck);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
