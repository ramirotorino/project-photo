const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sessions",
    allowed_formats: ["jpg", "jpeg", "png"],
    use_filename: true,
  },
});

const upload = multer({ storage });

module.exports = upload;
