const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

const HomeRoutes = require("./controllers/home_controller");
const StaysRoutes = require("./controllers/stays_controller");
const AccountRoutes = require("./controllers/account_controller");

let port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "randomstringsecretsession",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/", HomeRoutes.HomeRoutes);
app.use("/", StaysRoutes.StaysRoutes);
app.use("/", AccountRoutes.AccountRoutes);
app.listen(port);
