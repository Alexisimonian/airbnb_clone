const credentials = require("./src/credentials");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const app = express();
const favicon = require("serve-favicon");
const path = require("path");

const HomeRoutes = require("./controllers/home_controller");
const StaysRoutes = require("./controllers/stays_controller");
const AccountRoutes = require("./controllers/account_controller");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.static("./public")).use(express.static("./uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: credentials.secretsess,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use("/", HomeRoutes.HomeRoutes);
app.use("/", StaysRoutes.StaysRoutes);
app.use("/", AccountRoutes.AccountRoutes);
