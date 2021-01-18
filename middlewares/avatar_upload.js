const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const util = require("util");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "airbnb_clone_avatars",
    allowedFormats: ["jpg", "png", "jpeg"],
    filename: function (req, file, cb) {
      let filenamevar = `${Date.now()}-${file.originalname}`;
      cb(null, filenamevar);
    },
  },
});

console.log(storage);

let uploadfiles = multer({ storage: storage }).single("avatar");
let uploadFilesMiddleware = util.promisify(uploadfiles);
module.exports = uploadFilesMiddleware;
