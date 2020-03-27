const db = require("../models");

module.exports = app => {
  app.get("/api/playground", function(req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Duck]
    }).then(response => {
      return res.json(response);
    });
  });

  app.get("/api/duckbuck", (req, res) => {
    console.log(req);
    db.User.findOne({ where: { id: req.user.id } })
      .then(buckAdded => {
        return buckAdded.increment("duckbucks", { by: 1 });
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
            console.log(updatedDuck);
            return res.json(updatedDuck);
          }
        );
      }
    });
  });

  app.post("/ducklist/nothungry", function(req, res) {
    db.Duck.update({ hungry: 0 }, { where: { UserId: req.user.id } })
      .then(updatedDuck => {
        return res.json(updatedDuck);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
