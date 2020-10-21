const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

const AccountRoutes = require("./controllers/account_controller");

let port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "randomstringsecretsession",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/", AccountRoutes.AccountRoutes);
app.listen(port);
