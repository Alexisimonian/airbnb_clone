const express = require("express");
const cors = require("cors");
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(express.static("public")).use(cors());
app.listen(port, () => {});

app.get("/", (req, res) => {
  res.sendFile("login.html");
});
