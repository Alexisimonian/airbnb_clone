const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeRoutes = express.Router();

homeRoutes.get("/", function (req, res) {
  if (req.session.loggedin) {
    res.render("home", {
      welcome_msg: `Welcome back ${req.session.username}`,
      loggedin: true,
    });
  } else {
    res.render("home", { welcome_msg: "", loggedin: false });
  }
});
module.exports = { HomeRoutes: homeRoutes };
