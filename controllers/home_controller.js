const express = require("express");
const bodyParser = require("body-parser");

const homeRoutes = express.Router();

homeRoutes.get("/", function (req, res) {
  if (req.session.loggedin) {
    let options = {
      root: "public",
      headers: {
        logbtn: "logout",
        welcomeMsg: "Welcome" + req.session.username,
      },
    };
    res.sendFile("home.html", options);
  } else {
    let options = {
      root: "public",
      headers: {
        logbtn: "login",
        welcomeMsg: "Welcome to Airbnb",
      },
    };
    res.sendFile("home.html", options);
  }
});
module.exports = { HomeRoutes: homeRoutes };
