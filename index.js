const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

const HomeRoutes = require("./controllers/home_controller");
const ListingRoutes = require("./controllers/listing_controller");
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
app.use("/", HomeRoutes.HomeRoutes);
app.use("/", ListingRoutes.ListingRoutes);
app.use("/", AccountRoutes.AccountRoutes);
app.listen(port);
