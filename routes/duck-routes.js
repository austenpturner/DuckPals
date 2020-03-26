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

  app.put("/ducklist/sleepy", function(req, res) {
    db.Duck.update({ sleepy: 1 }, { where: { UserId: req.user.id } })
      .then(updatedDuck => {
        console.log(updatedDuck);
        return res.json(updatedDuck);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.put("/ducklist/notsleepy", function(req, res) {
    db.Duck.update({ sleepy: 0 }, { where: { UserId: req.user.id } })
      .then(updatedDuck => {
        console.log(updatedDuck);
        return res.json(updatedDuck);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.put("/ducklist/hungry", function(req, res) {
    db.Duck.update({ hungry: 1 }, { where: { UserId: req.user.id } })
      .then(updatedDuck => {
        console.log(updatedDuck);
        return res.json(updatedDuck);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.put("/ducklist/nothungry", function(req, res) {
    db.Duck.update({ hungry: 0 }, { where: { UserId: req.user.id } })
      .then(updatedDuck => {
        console.log(updatedDuck);
        return res.json(updatedDuck);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
