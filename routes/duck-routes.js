const db = require("../models");

module.exports = app => {
  app.get("/api/playground", function(req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Duck]
    }).then(response => {
      console.log(response);
      return res.json(response);
    });
  });

  app.put("/ducklist/sleepy", function(req, res) {
    db.Duck.update({ sleepy: true }, { where: { UserId: req.user.id } })
      .then(updatedDuck => {
        console.log(updatedDuck);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

//   app.update();

//   app.update();

//   app.update();
