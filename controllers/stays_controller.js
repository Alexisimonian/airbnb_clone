const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http");
const fs = require("fs");
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

staysRoutes.post("/stays", function (req, res) {
  let title = req.body.title;
  let address = req.body.address;
  let price = req.body.price;
  let avaibilityFrom = req.body.startDate;
  let avaibilityTo = req.body.endDate;
  let description = req.body.description;
  let image = req.body.imageFile;
});

module.exports = { StaysRoutes: staysRoutes };
