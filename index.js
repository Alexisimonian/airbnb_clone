const dbId = require("./src/dbInfos.js");
//import User from "./src/user.js";
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { request } = require("express");
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

let connection = mysql.createConnection({
  host: "localhost",
  user: dbId.username,
  password: dbId.password,
  database: "Airbnb_clone_test",
});
connection.connect(function (err) {
  if (err) {
    return console.log("error:" + err.message);
  }
  console.log("Connected to mysql server");
});

app.use(express.static("./")).use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/welcome.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/login", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.psw;
  if (username && email && password) {
    connection.query(
      `SELECT * FROM users WHERE name = '${username}' AND password = '${password}'`,
      function (err, result, fields) {
        if (result.length > 0) {
          req.session.loggedin = true;
          res.redirect("/listing");
        } else {
          res.send(
            "Incorrect email and/or password.<br> If you do not have an account please sign up."
          );
        }
        res.end();
      }
    );
  }
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

app.post("/signup", (req, res) => {});

app.get("/listing", (req, res) => {
  res.sendFile(__dirname + "/public/listing.html");
});
