const db = require("../models");

module.exports = app => {
  app.put("/ducklist/sleepy", function(req, res) {
    db.Duck.update({ sleepy: true }, { where: { id: req.body.id } })
      .then(updatedDuck => {
        console.log(updatedDuck.sleepy);
      })
      .catch(err => {
        if (err) throw err;
      });
  });
};

//   app.update();

//   app.update();

//   app.update();
