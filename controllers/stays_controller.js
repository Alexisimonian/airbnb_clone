const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const upload = multer({ dest: "../public/images/" });

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
    let fulllisting = JSON.stringify(listing);
    let options = {
      root: "public",
      headers: {
        logbtn: logbtn,
        listing: fulllisting,
      },
    };
    res.sendFile("listStays.html", options);
  })();
});

staysRoutes.get("/stays/new", function (req, res) {
  if (req.session.loggedin) {
    res.sendFile("newStay.html", { root: "public" });
  }
});

staysRoutes.post("/upload", upload.array("imageFiles", 5), function (req, res) {
  let userID = req.session.userId;
  let title = req.body.title;
  let address = req.body.address;
  let price = req.body.price;
  let avaibilityFrom = req.body.startDate;
  let avaibilityTo = req.body.endDate;
  let description = req.body.description;

  let image = req.file.originalname;
  let tempPath = req.file.path;
  let targetPath = path.join(__dirname, `../public/images/${image}`);
  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      res.status(422).send("Oops Something went wrong");
    } else {
      stays.createStay(
        userID,
        title,
        address,
        price,
        avaibilityFrom,
        avaibilityTo,
        image,
        description
      );
      res.status(200).end();
    }
  });
});

module.exports = { StaysRoutes: staysRoutes };
