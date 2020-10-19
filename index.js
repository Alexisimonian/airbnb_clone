const express = require("express");
const cors = require("cors");
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(express.static("./")).use(cors());
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/welcome.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/listing", (req, res) => {
  res.sendFile(__dirname + "/public/listing.html");
});

app.get("/listing", (req, res) => {
  res.sendFile(__dirname + "/public/listing.html");
});
