const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeRoutes = express.Router();

homeRoutes.get("/", function (req, res) {
  if (req.session.loggedin) {
    res.send(req.session.username);
  }
});
module.exports = { HomeRoutes: homeRoutes };
