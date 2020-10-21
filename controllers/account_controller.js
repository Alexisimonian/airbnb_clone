const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const dbId = require("../src/dbInfos.js");

const accountRoutes = express.Router();

let connection = mysql.createConnection({
  host: "localhost",
  user: dbId.username,
  password: dbId.password,
  database: "Airbnb_clone_test",
});

accountRoutes.get("/login", (req, res) => {
  res.render("login", { errors: "" });
});

accountRoutes.get("/register", (req, res) => {
  res.render("register", { errors: "" });
});

accountRoutes.post("/register", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  connection.query(
    `SELECT * FROM users WHERE name='${username}' OR email='${email}'`,
    function (err, result, field) {
      if (result.length > 0) {
        res.render("register", { errors: "Username or email already used" });
      } else {
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        req.session.loggedin = true;
        req.session.username = username;
        connection.query(
          `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${passwordHash}')`,
          function (err, result, field) {
            res.redirect("/");
          }
        );
      }
    }
  );
});

accountRoutes.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  connection.query(`SELECT * FROM users WHERE email='${email}'`, function (
    err,
    result,
    field
  ) {
    if (result.length > 0) {
      if (bcrypt.compareSync(password, result[0].password)) {
        req.session.loggedin = true;
        req.session.username = result[0].name;
        res.redirect("/");
      } else {
        res.render("login", { errors: "Incorrect password" });
      }
    } else {
      res.render("login", { errors: "No account with this email." });
    }
  });
});

module.exports = { AccountRoutes: accountRoutes };
