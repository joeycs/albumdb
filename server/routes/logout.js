const router = require("express").Router();
require("dotenv").config();

router.route("/").get((req, res) => {
  req.session.destroy();
  res.redirect(
    `http://localhost:${process.env.FUSION_AUTH_PORT}/oauth2/logout?client_id=${process.env.CLIENT_ID}`
  );
});

module.exports = router;
