const router = require("express").Router();
const request = require("request");
require("dotenv").config();

router.route("/").get((req, res) => {
  request(
    {
      method: "POST",
      uri: `http://localhost:${process.env.FUSION_AUTH_PORT}/oauth2/token`,
      form: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI,
      },
    },

    (error, response, body) => {
      req.session.token = JSON.parse(body).access_token;
      res.redirect(`http://localhost:${process.env.CLIENT_PORT}`);
    }
  );
});

module.exports = router;
