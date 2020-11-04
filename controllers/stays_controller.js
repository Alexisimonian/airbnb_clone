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
    let listing = await stays.listingStays();
    res.render("stays", { listings: listing });
  })();
});

staysRoutes.get("/stays/new", function (req, res) {
  if (req.session.loggedin) {
    res.render("newStay", { errors: "" });
  } else {
    res.render("login", { errors: "You must be loggedin to continue" });
  }
});

staysRoutes.post("/stays/upload", upload.single("imageFile"), function (
  req,
  res
) {
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
      res.render("newStay", { errors: "Oops something went wrong" });
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
      res.redirect("/stays");
    }
  });
});

module.exports = { StaysRoutes: staysRoutes };
