const router = require("express").Router();
const request = require("request");
const config = require("../config.js");

router.route("/").get((req, res) => {
  request(
    {
      method: "POST",
      uri: `http://localhost:${config.fusionAuthPort}/oauth2/token`,
      form: {
        client_id: config.clientID,
        client_secret: config.clientSecret,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: config.redirectURI,
      },
    },

    (error, response, body) => {
      req.session.token = JSON.parse(body).access_token;
      res.redirect(`http://localhost:${config.clientPort}`);
    }
  );
});

module.exports = router;
