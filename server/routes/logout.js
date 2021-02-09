const router = require("express").Router();
require("dotenv").config();

router.route("/").get((req, res) => {
  req.session.destroy();
  res.redirect(
    `https://album-db-auth.herokuapp.com/oauth2/logout?client_id=${process.env.CLIENT_ID}`
  );
});

module.exports = router;
