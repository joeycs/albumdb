const router = require("express").Router();
const config = require("../config.js");

router.route("/").get((req, res) => {
  req.session.destroy();
  res.redirect(
    `http://localhost:${config.fusionAuthPort}/oauth2/logout?client_id=${config.clientID}`
  );
});

module.exports = router;
