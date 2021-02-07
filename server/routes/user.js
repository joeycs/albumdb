const router = require("express").Router();
const request = require("request");
require("dotenv").config();

router.route("/").get((req, res) => {
  if (req.session.token) {
    request(
      {
        method: "POST",
        uri: `https://album-db-auth.herokuapp.com/oauth2/introspect`,
        form: {
          client_id: process.env.CLIENT_ID,
          token: req.session.token,
        },
      },

      (error, response, body) => {
        let introspectResponse = JSON.parse(body);

        if (introspectResponse.active) {
          request(
            {
              method: "GET",
              uri: `https://album-db-auth.herokuapp.com/api/user/registration/${introspectResponse.sub}/${process.env.APPLICATION_ID}`,
              json: true,
              headers: {
                Authorization: process.env.API_KEY,
              },
            },

            (error, response, body) => {
              res.send({
                token: {
                  ...introspectResponse,
                },
                ...body,
              });
            }
          );
        } else {
          req.session.destroy();
          res.send({});
        }
      }
    );
  } else {
    res.send({});
  }
});

module.exports = router;
