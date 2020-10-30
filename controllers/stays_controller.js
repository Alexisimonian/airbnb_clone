const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { Stays } = require("../src/stays");

const stays = new Stays();

const staysRoutes = express.Router();

staysRoutes.get("/stays", function (req, res) {
  (async () => {
    let listing = await stays.listingStays();
    console.log(listing);
    res.render("stays", { listings: listing });
  })();
});

module.exports = { StaysRoutes: staysRoutes };
