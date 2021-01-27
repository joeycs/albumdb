const router = require("express").Router();
const config = require("../config.js");

router.route("/").get((req, res) => {
  res.redirect(
    `http://localhost:${config.fusionAuthPort}/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code`
  );
});

module.exports = router;
