const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const staysRoutes = express.Router();

staysRoutes.get("/stays", function (req, res) {
  res.render("stays");
});
module.exports = { StaysRoutes: staysRoutes };
