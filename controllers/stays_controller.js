const express = require("express");
const bodyParser = require("body-parser");
const upload = require("../middlewares/photo_upload");
const { User } = require("../src/user");
const { Stays } = require("../src/stays");
const stay = require("../src/stay");

const user = new User();
const stays = new Stays();
const staysRoutes = express.Router();

staysRoutes.get("/stays", async (req, res) => {
  let logbtn = "login";
  if (req.session.loggedin == true) {
    logbtn = "logout";
  }
  let listing = await stays.listingStays();
  let booked = await user.getBooked(req.session.userId);
  let bookedlist = JSON.stringify(booked);
  let fullListing = JSON.stringify(listing);
  let options = {
    root: "public",
    headers: {
      booked: bookedlist,
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
  if (req.session.loggedin === true) {
    res.sendFile("new-stay.html", { root: "public" });
  } else {
    res.redirect("/");
  }
});

staysRoutes.post("/stays/new", upload.array("files", 5), (req, res) => {
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
    images.push(req.files[i].key);
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
});

staysRoutes.post("/booking/stays", async (req, res) => {
  let id = req.body.id;
  let stay = await stays.findStay(id);
  let staylist = JSON.stringify(stay);
  res.setHeader("stay", staylist);
  res.status(200).end();
});

staysRoutes.post("/stays/book", (req, res) => {
  let user_id = req.session.userId;
  let stay_id = req.body.stayid;
  let price = req.body.price;
  let start = req.body.start.split("T")[0];
  let end = req.body.end.split("T")[0];
  stays.book(user_id, stay_id, price, start, end);
  res.end();
});

staysRoutes.post("/stays/unbook", (req, res) => {
  let bookingid = req.body.id;
  stays.unbook(bookingid);
  res.end();
});

module.exports = { StaysRoutes: staysRoutes };
