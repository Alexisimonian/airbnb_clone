const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { User } = require("../src/user");
const upload = require("../middlewares/avatar_upload");

const user = new User();

const accountRoutes = express.Router();

accountRoutes.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "public" });
});

accountRoutes.get("/account", async (req, res) => {
  let user_details = await user.getUser(req.session.userId);
  let userinf = JSON.stringify(user_details);
  let logbtn = "login";
  if (req.session.loggedin) {
    logbtn = "logout";
  }
  let options = {
    root: "public",
    headers: {
      user: userinf,
      logbtn: logbtn,
    },
  };
  res.sendFile("account.html", options);
});

accountRoutes.get("/change/account/remove", async (req, res) => {
  let userid = req.session.userId;
  let user_details = await user.getUser(userid);
  if (user_details[0].avatar != "neutral_avatar.png") {
    console.log(user_details[0].avatar);
    let location = path.join(`${__dirname}/../uploads/photosOffers`);
    fs.unlink(location, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("done");
    });
  }
  user.deleteUser(userid);
  res.redirect("/logout");
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

accountRoutes.post("/change/account/infos", async (req, res) => {
  let userid = req.session.userId;
  let modtype = req.body.type;
  let modelem = req.body[modtype];
  if (modtype == "email" || modtype == "password") {
    let user_details = await user.getUser(userid);
    let password = req.body.password;
    if (bcrypt.compareSync(password, user_details[0].password)) {
      if (modtype == "email") {
        user.modify(userid, modtype, modelem);
      } else if (modtype == "password") {
        password = req.body.newpassword;
        const passwordHash = bcrypt.hashSync(password, 10);
        user.modify(userid, modtype, passwordHash);
      }
    } else {
      res.status(422).send("password incorrect").end();
    }
  }
  if (modtype == "username") {
    user.modify(userid, modtype, modelem);
  }
  res.status(200).end();
});

accountRoutes.post("/change/account/avatar", async (req, res) => {
  try {
    await upload(req, res);
    let userid = req.session.userId;
    let name = req.file.filename;
    let user_details = await user.getUser(userid);
    if (user_details[0].avatar != "neutral_avatar.png") {
      let location = path.join(`${__dirname}/../uploads/photosOffers`);
      fs.unlink(location, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
    user.modify(userid, "avatar", name);
    res.status(200).end();
  } catch (error) {
    res.status(422).send(`error uploading your file: ${error}`).end();
  }
});

module.exports = { AccountRoutes: accountRoutes };
