const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { User } = require("../src/user");

const user = new User();

const accountRoutes = express.Router();

accountRoutes.get("/login", (req, res) => {
  res.render("login", { errors: "" });
});

accountRoutes.get("/register", (req, res) => {
  res.render("register", { errors: "" });
});

accountRoutes.post("/register", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  if (req.body.password != req.body.confirm_password) {
    res.render("register", { errors: "Passwords must match" });
  } else {
    (async () => {
      let unusedUsername = await user.unusedUsername(username);
      let unusedEmail = await user.unusedEmail(email);
      if (unusedUsername.length == 0) {
        if (unusedEmail.length == 0) {
          const passwordHash = bcrypt.hashSync(req.body.password, 10);
          req.session.loggedin = true;
          req.session.username = username;
          user.saveUser(username, email, passwordHash);
          res.redirect("/");
        } else {
          res.render("register", { errors: "Email already taken" });
        }
      } else {
        res.render("register", { errors: "Username already taken" });
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
        res.redirect("/");
      } else {
        res.render("login", { errors: "Incorrect password" });
      }
    } else {
      res.render("login", { errors: "No account with this email." });
    }
  })();
});

accountRoutes.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = { AccountRoutes: accountRoutes };
