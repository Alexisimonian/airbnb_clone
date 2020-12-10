const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { User } = require("../src/user");

const user = new User();

const accountRoutes = express.Router();

accountRoutes.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "public" });
});

accountRoutes.get("/account", (req, res) => {
  let logbtn = "login";
  if (req.session.loggedin) {
    logbtn = "logout";
  }
  let options = {
    root: "public",
    headers: {
      username: req.session.username,
      logbtn: logbtn,
    },
  };
  res.sendFile("account.html", options);
});

accountRoutes.post("/username-validation", async (req, res) => {
  let username = req.body.username;
  let existingUsernames = await user.existingUsernames(username);
  if (existingUsernames.length == 0) {
    res.send("username free").end();
  } else {
    res.send("username taken").end();
  }
});

accountRoutes.post("/email-validation", async (req, res) => {
  let email = req.body.email_input;
  let existingEmails = await user.existingEmails(email);
  if (existingEmails.length == 0) {
    res.send("email free").end();
  } else {
    res.send("email taken").end();
  }
});

accountRoutes.post("/login", async (req, res) => {
  let email = req.body.email_input;
  let password = req.body.password_input;
  if (email && password) {
    let user_details = await user.existingEmails(email);
    if (user_details.length > 0) {
      if (bcrypt.compareSync(password, user_details[0].password)) {
        req.session.loggedin = true;
        req.session.username = user_details[0].name;
        req.session.userId = user_details[0].id;
        res.status(200).end();
      } else {
        res.status(422).send("password incorrect");
      }
    } else {
      res.status(422).send("email incorrect");
    }
  }
});

accountRoutes.post("/register", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email_input;
  let password = req.body.password_input;
  if (username && email && password) {
    const passwordHash = bcrypt.hashSync(password, 10);
    await user.saveUser(username, email, passwordHash);
    req.session.loggedin = true;
    req.session.username = username;
    req.session.userId = await user.getID(username);
    res.status(200).end();
  }
});

accountRoutes.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = { AccountRoutes: accountRoutes };
