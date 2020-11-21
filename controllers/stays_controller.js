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
    let userID = req.session.userId;
    let type = req.body.place_type;
    let size = req.body.place_size;
    let title = req.body.title;
    let address = req.body.street_number + " " + req.body.route;
    console.log(address);
    let postcode = req.body.postal_code;
    console.log(postcode);
    let locality = req.body.locality;
    console.log(locality);
    let country = req.body.country;
    console.log(country);
    let latlng = req.body.lat + "," + req.body.lng;
    console.log(latlng);
    let price = req.body.price;
    let avaibility_from = req.body.available_from;
    let avaibility_to = req.body.available_to;
    let images = [];
    for (let i = 0; i < req.files.length; i++) {
      images.push(req.files[i].filename);
    }
    let description = req.body.description;
    description = description.replace("'", "\\'");
    console.log(description);
    stays.createStay(
      userID,
      type,
      size,
      title,
      address,
      postcode,
      locality,
      country,
      latlng,
      price,
      avaibility_from,
      avaibility_to,
      images,
      description
    );
    res.status(200).end();
  } catch (error) {
    res.status(422).send(`error trying to upload your file(s): ${error}`);
  }
});

module.exports = { StaysRoutes: staysRoutes };
