const express = require("express");
const bodyParser = require("body-parser");
const upload = require("../middlewares/photo_upload");
const { Stays } = require("../src/stays");
const stay = require("../src/stay");

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

staysRoutes.post("/stays", async (req, res) => {
  let locality = req.body.locality;
  let country = req.body.country;
  let start_date = req.body.check_in;
  let end_date = req.body.check_out;
  let guests = req.body.guests;
  let url = `?country=${country}`;
  if (locality) {
    url += `&locality=${locality}`;
  }
  if (start_date) {
    url += `&start_date=${start_date}`;
  }
  if (end_date) {
    url += `&end_date=${end_date}`;
  }
  if (guests) {
    url += `&guests=${guests}`;
  }
  res.redirect("/stays" + url);
});

staysRoutes.get("/stays/new", (req, res) => {
  res.sendFile("new-stay.html", { root: "public" });
});

staysRoutes.post("/stays/new", async (req, res) => {
  try {
    await upload(req, res);
    let userID = req.session.userId;
    let type = req.body.place_type;
    let size = req.body.place_size.split(" ")[0];
    let title = req.body.title;
    let address = req.body.street_number + " " + req.body.route;
    let postcode = req.body.postal_code;
    let locality = req.body.locality;
    let country = req.body.country;
    let latlng = req.body.lat + "," + req.body.lng;
    let price = req.body.price;
    let avaibility_from = req.body.available_from;
    let avaibility_to = req.body.available_to;
    let images = [];
    for (let i = 0; i < req.files.length; i++) {
      images.push(req.files[i].filename);
    }
    let description = req.body.description;
    description = description.replace("'", "\\'");
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

staysRoutes.post("/booking/stays", async (req, res) => {
  let id = req.body.id;
  let stay = await stays.findStay(id);
  stay = JSON.stringify(stay);
  let options = { stay: stay };
  res.writeHead(200, { options }).end();
});

staysRoutes.post("/change/stays/infos", async (req, res) => {});

staysRoutes.post("/change/stays/photos", async (req, res) => {});

module.exports = { StaysRoutes: staysRoutes };
