const util = require("util");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(`${__dirname}/../uploads/avatars`));
  },
  filename: function (req, file, callback) {
    let match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      let message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }
    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

let uploadfiles = multer({ storage: storage }).single("avatar");
let uploadFilesMiddleware = util.promisify(uploadfiles);
module.exports = uploadFilesMiddleware;
