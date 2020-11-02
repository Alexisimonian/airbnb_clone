const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { Stays } = require("../src/stays");

const stays = new Stays();

const staysRoutes = express.Router();

staysRoutes.get("/stays", function (req, res) {
  (async () => {
    let listing = await stays.listingStays();
    res.render("stays", { listings: listing });
  })();
});

staysRoutes.get("/stays/new", function (req, res) {
  res.render("newStay", { errors: "" });
});

module.exports = { StaysRoutes: staysRoutes };
