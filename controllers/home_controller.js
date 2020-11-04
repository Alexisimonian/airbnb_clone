const express = require("express");
const bodyParser = require("body-parser");

const homeRoutes = express.Router();

homeRoutes.get("/", function (req, res) {
  if (req.session.loggedin) {
    let data = JSON.stringify({
      welcomeMsg: "Welcome " + req.session.username,
      loggedin: true,
    });
    res.send(data);
  } else {
    let data = JSON.stringify({
      welcomeMsg: "Welcome to Airbnb",
      loggedin: false,
    });
    res.send(data);
  }
});
module.exports = { HomeRoutes: homeRoutes };
