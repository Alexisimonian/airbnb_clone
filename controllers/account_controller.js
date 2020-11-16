const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { User } = require("../src/user");

const user = new User();

const accountRoutes = express.Router();

accountRoutes.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "public" });
});

accountRoutes.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "public" });
});

accountRoutes.post("/username-validation", async (req, res) => {
  let username = req.body.username;
  let existingUsernames = await user.existingUsernames(username);
  if (existingUsernames.length == 0) {
    res.send("ok").end();
  } else {
    res.send("Username taken").end();
  }
});

accountRoutes.post("/email-validation", async (req, res) => {
  let email = req.body.email_input;
  let existingEmails = await user.existingEmails(email);
  if (existingEmails.length == 0) {
    res.send("ok").end();
  } else {
    res.send("Email taken").end();
  }
});

accountRoutes.post("/login", async (req, res) => {
  let email = req.body.email_input;
  let password = req.body.password_input;
  let existingEmails = await user.existingEmails(email);
  if (existingEmails.length > 0) {
    if (bcrypt.compareSync(password, existingEmails[0].password)) {
      req.session.loggedin = true;
      req.session.username = existingEmails[0].name;
      req.session.userId = existingEmails[0].id;
      res.status(200).end();
    } else {
      res.status(422).send("Incorect password.");
    }
  } else {
    res.status(422).send("No account with this email.");
  }
});

accountRoutes.post("/register", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email_input;
  let password = req.body.password_input;
  if (username && email && password) {
    let existingUsernames = await user.existingUsernames(username);
    let existingEmails = await user.existingEmails(email);
    if (existingUsernames.length == 0) {
      if (existingEmails.length == 0) {
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        await user.saveUser(username, email, passwordHash);
        req.session.loggedin = true;
        req.session.username = username;
        req.session.userId = await user.getID(username);
        res.status(200).end();
      } else {
        res.status(422).send("Email already taken");
      }
    } else {
      res.status(422).send("Username already taken");
    }
  }
});

accountRoutes.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = { AccountRoutes: accountRoutes };
