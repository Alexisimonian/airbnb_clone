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

accountRoutes.post("/register", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email_input;
  if (req.body.password_input != req.body.password_confirm) {
    res.status(422).send("passwords must match");
  } else {
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
        res.status(422).send("email already taken");
      }
    } else {
      res.status(422).send("username already taken");
    }
  }
});

accountRoutes.post("/verifying-login", async (req, res) => {
  let is_email = undefined;
  let is_password = undefined;
  let email = req.body.email_input;
  let password = req.body.password_input;
  let existing_email = await user.existingEmails(email);
  if (existing_email.length > 0) {
    is_email = true;
  } else {
    is_email = false;
  }
  if (bcrypt.compareSync(password, verifyingUser[0].password)) {
    is_password = true;
  } else {
    is_password = false;
  }
  let data = JSON.stringify({
    is_email: is_email,
    is_password: is_password,
  });
  res.send(data).end();
});

// accountRoutes.post("/login", async (req, res) => {
//   let email = req.body.email_input;
//   let password = req.body.password_input;
//   let verifiedUser = await user.verifyThroughEmail(email);
//   if (verifiedUser.length > 0) {
//     if (bcrypt.compareSync(password, verifiedUser[0].password)) {
//       req.session.loggedin = true;
//       req.session.username = verifiedUser[0].name;
//       req.session.userId = verifiedUser[0].id;
//       res.status(200).end();
//     } else {
//       res.status(422).send("incorect password");
//     }
//   } else {
//     res.status(422).send("no account with this email");
//   }
// });

accountRoutes.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = { AccountRoutes: accountRoutes };
