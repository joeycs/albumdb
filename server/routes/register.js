const router = require("express").Router();
const request = require("request");
const config = require("../config.js");
const url = require("url");

router.route("/").get((req, res) => {
  let userData = JSON.parse(url.parse(req.url, true).query.userData);

  request(
    {
      method: "POST",
      uri: `http://localhost:${config.fusionAuthPort}/api/user/registration/`,
      json: true,
      headers: {
        Authorization: config.apiKey,
      },
      body: {
        registration: {
          applicationId: config.applicationID,
        },
        user: {
          email: userData.email,
          password: userData.password,
          twoFactorEnabled: false,
          username: userData.username,
        },
        sendSetPasswordEmail: false,
        skipVerification: false,
      },
    },

    (error, response, body) => {
      res.redirect(`http://localhost:${config.serverPort}/login`);
    }
  );
});

module.exports = router;
