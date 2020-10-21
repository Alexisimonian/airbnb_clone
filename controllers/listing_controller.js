const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const listingRoutes = express.Router();

listingRoutes.get("/listing", function (req, res) {
  res.render("listing");
});
module.exports = { ListingRoutes: listingRoutes };
