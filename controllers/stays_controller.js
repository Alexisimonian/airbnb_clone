const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const upload = require("../middlewares/upload");
const { Stays } = require("../src/stays");

const stays = new Stays();
const staysRoutes = express.Router();

staysRoutes.get("/stays", async (req, res) => {
  let logbtn = "login";
  if (req.session.loggedin == true) {
    logbtn = "logout";
  }
  let listing = await stays.listingStays();
  let fullListing = JSON.stringify(listing);
  let options = {
    root: "public",
    headers: {
      logbtn: logbtn,
      listing: fullListing,
    },
  };
  res.sendFile("stays-list.html", options);
});

staysRoutes.get("/stays/new", (req, res) => {
  if (req.session.loggedin === true) {
    res.sendFile("new-stay.html", { root: "public" });
  } else {
    res.redirect("/login");
  }
});

staysRoutes.post("/stays/new", async (req, res) => {
  try {
    await upload(req, res);
    if (req.files.length <= 0) {
      console.log(req.files);
      res.status(422).send("you must select at least one file");
    }
    let userID = req.session.userId;
    let title = req.body.title;
    let address = req.body.address;
    let price = req.body.price;
    let avaibilityFrom = req.body.startDate;
    let avaibilityTo = req.body.endDate;
    let description = req.body.description;
    let images = [];
    for (let i = 0; i < req.files.length; i++) {
      images.push(req.files[i].filename);
    }
    stays.createStay(
      userID,
      title,
      address,
      price,
      avaibilityFrom,
      avaibilityTo,
      images,
      description
    );
    res.status(200).end();
  } catch (error) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      console.log(error);
      return res.status(422).send("too many files to upload");
    }
    res.status(422).send(`error trying to upload your file(s): ${error}`);
  }
});

module.exports = { StaysRoutes: staysRoutes };
