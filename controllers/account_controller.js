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

accountRoutes.post("/register", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  if (req.body.password != req.body.confirm_password) {
    res.send("Passwords must match");
  } else {
    (async () => {
      let existingUsernames = await user.existingUsernames(username);
      let existingEmails = await user.existingEmails(email);
      if (existingUsernames.length == 0) {
        if (existingEmails.length == 0) {
          const passwordHash = bcrypt.hashSync(req.body.password, 10);
          await user.saveUser(username, email, passwordHash);
          req.session.loggedin = true;
          req.session.username = username;
          req.session.userId = await user.getID(username);
          res.redirect("/");
        } else {
          res.send("Email already taken");
        }
      } else {
        res.send("Username already taken");
      }
    })();
  }
});

accountRoutes.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  (async () => {
    let verifiedUser = await user.verifyThroughEmail(email);
    if (verifiedUser.length > 0) {
      if (bcrypt.compareSync(password, verifiedUser[0].password)) {
        req.session.loggedin = true;
        req.session.username = verifiedUser[0].name;
        req.session.userId = verifiedUser[0].id;
        res.redirect("/");
      } else {
        res.send("Incorect password");
      }
    } else {
      res.send("No account with this email.");
    }
  })();
});

accountRoutes.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = { AccountRoutes: accountRoutes };
