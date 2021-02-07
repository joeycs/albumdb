const router = require("express").Router();
require("dotenv").config();

router.route("/").get((req, res) => {
  res.redirect(
    `https://album-db-auth.herokuapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`
  );
});

module.exports = router;
