const express = require("express");
const bodyParser = require("body-parser");

const homeRoutes = express.Router();

homeRoutes.get("/", (req, res) => {
  let logbtn = "login";
  if (req.session.loggedin) {
    logbtn = "logout";
  }
  let options = {
    root: "public",
    headers: {
      logbtn: logbtn,
    },
  };
  res.sendFile("home.html", options);
});

module.exports = { HomeRoutes: homeRoutes };
