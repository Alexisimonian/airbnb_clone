const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const dbId = require("./src/dbInfos.js");
const { User } = require("./src/users");

const accountRoutes = express.Router();

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

accountRoutes.get("/login", (req, res) => {
  res.render("login");
});

accountRoutes.get("/register", (req, res) => {
  res.render("register", { errors: "" });
});

accountRoutes.post("/register", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  if (username && email) {
    connection.query(
      `SELECT * FROM users WHERE name='${username}' OR email='${email}'`,
      function (err, result, field) {
        if (result.length > 0) {
          res.render("register", { errors: "Username or email already used" });
        } else {
          const passwordHash = bcrypt.hashSync(req.body.password, 10);
          user = new User(username, email, passwordHash);
          req.session.loggedin = true;
          req.session.username = username;
          connection.query(
            `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${passwordHash}')`,
            function (err, result, field) {
              if (err) throw err;
              res.redirect("/");
            }
          );
        }
        res.end();
      }
    );
  } else {
    res.render("register", {
      errors: "Please enter username, email and password",
    });
    res.end();
  }
});

accountRoutes.post("./login", (req, res) => {
  let email = req.body.username;
  let password = req.body.password;
  if (email && password) {
    connection.query(`SELECT * FROM users WHERE email='${email}'`, function (
      err,
      result,
      field
    ) {
      console.log(result);
    });
  }
});
module.exports = { AccountRoutes: accountRoutes };
