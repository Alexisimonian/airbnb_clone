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

homeRoutes.post("/", (req, res) => {
  let locality = req.body.locality;
  let country = req.body.country;
  let start_date = req.body.check_in;
  let end_date = req.body.check_out;
  let guests = req.body.guests;
  let url = `?locality=${locality}&country=${country}`;
  if (start_date) {
    url += `&start_date=${start_date}`;
  }
  if (end_date) {
    url += `&end_date=${end_date}`;
  }
  if (guests) {
    url += `&guests=${guests}`;
  }
  res.redirect("/stays" + url);
});

module.exports = { HomeRoutes: homeRoutes };
