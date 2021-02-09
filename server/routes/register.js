const router = require("express").Router();
const request = require("request");
const url = require("url");
require("dotenv").config();

router.route("/").get((req, res) => {
  let userData = JSON.parse(url.parse(req.url, true).query.userData);
  console.log(userData);

  request(
    {
      method: "POST",
      uri: `https://album-db-auth.herokuapp.com/api/user/registration/`,
      json: true,
      headers: {
        Authorization: process.env.API_KEY,
      },
      body: {
        registration: {
          applicationId: process.env.APPLICATION_ID,
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
      res.redirect("https://album-db.herokuapp.com/login");
    }
  );
});

module.exports = router;
