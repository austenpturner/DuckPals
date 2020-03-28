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
    const id = parseInt(req.body.id);
    db.Duck.update({
        sleepy: req.body.sleepy
      },
      {
        where: {
          id: id
        }
    }).then(updatedDuck => {
      return res.json(updatedDuck);
    })
    .catch(err => {
      console.log(err);
    });
  });

  app.post("/ducklist/hungry", function(req, res) {
    const id = parseInt(req.body.id);
    db.Duck.update({
      hungry: req.body.hungry
    },
    {
      where: {
        id: id
      }
    })
    if (!req.body.hungry) {
      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then(user => {
        return user.decrement("duckfood", {
          by: 1
        })
      }).then(data => {
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  });

  app.post("/ducklist/color", function(req, res) {
    const id = parseInt(req.body.id);
    db.Duck.update({
      color: req.body.color
     },
     {
       where: {
         id: id
       }
    }).then(updatedDuck => {
      console.log(updatedDuck);
      return res.json(updatedDuck);
    })
    .catch(err => {
      console.log(err);
    });
  });
};
