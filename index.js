const express = require("express");
const session = require("expres-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(express.static("./")).use(cors());
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/welcome.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/listing", (req, res) => {
  let email = req.body.email;
  let password = req.body.psw;
  res.sendFile(__dirname + "/public/listing.html");
});

app.get("/listing", (req, res) => {
  res.sendFile(__dirname + "/public/listing.html");
});
