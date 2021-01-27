const router = require("express").Router();
const request = require("request");
const config = require("../config.js");

router.route("/").get((req, res) => {
  if (req.session.token) {
    request(
      {
        method: "POST",
        uri: `http://localhost:${config.fusionAuthPort}/oauth2/introspect`,
        form: {
          client_id: config.clientID,
          token: req.session.token,
        },
      },

      (error, response, body) => {
        let introspectResponse = JSON.parse(body);

        if (introspectResponse.active) {
          request(
            {
              method: "GET",
              uri: `http://localhost:${config.fusionAuthPort}/api/user/registration/${introspectResponse.sub}/${config.applicationID}`,
              json: true,
              headers: {
                Authorization: config.apiKey,
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
