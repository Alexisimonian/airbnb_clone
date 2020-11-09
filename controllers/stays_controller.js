const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const upload = require("../src/upload");
const { Stays } = require("../src/stays");

const stays = new Stays();
const staysRoutes = express.Router();

staysRoutes.get("/stays", function (req, res) {
  (async () => {
    let logbtn = "login";
    if (req.session.loggedin == true) {
      logbtn = "logout";
    }
    let listing = await stays.listingStays();
    let options = {
      root: "public",
      headers: {
        logbtn: logbtn,
        listing: listing,
      },
    };
    res.sendFile("listStays.html", options);
  })();
});

staysRoutes.get("/stays/new", (req, res) => {
  if (req.session.loggedin) {
    res.sendFile("newStay.html", { root: "public" });
  }
});

staysRoutes.post("/upload", async (req, res) => {
  try {
    await upload(req, res);
    if (req.files.length <= 0) {
      res.status(422).send("you must select at least one file");
    }
    let userID = req.session.userId;
    console.log(userID);
    let title = req.body.title;
    console.log(title);
    let address = req.body.address;
    console.log(address);
    let price = req.body.price;
    console.log(price);
    let avaibilityFrom = req.body.startDate;
    console.log(avaibilityFrom);
    let avaibilityTo = req.body.endDate;
    console.log(avaibilityTo);
    let description = req.body.description;
    console.log(description);
    let images = req.files;
    console.log(images);
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
  } catch (error) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      res.status(422).send("too many files to upload");
    }
    res.status(422).send(`error trying to upload your file(s): ${error}`);
  }
});

module.exports = { StaysRoutes: staysRoutes };
