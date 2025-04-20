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

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // ✅ límite aumentado a 50MB
});

console.log("entra a upload");

module.exports = upload;
