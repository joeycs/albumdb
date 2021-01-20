const router = require("express").Router();
const config = require("../config.js");

router.route("/").get((req, res) => {
  res.send({
    user: {
      username: "joeycs",
      email: "josephemanuele@gmail.com",
    },
  });
});

module.exports = router;
