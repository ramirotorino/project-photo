const express = require("express");
const router = express.Router();
const checkAdmin = require("../middleware/checkAdmin");
const upload = require("../middleware/upload");
const {
  getPhotos,
  createPhoto,
  deletePhoto,
} = require("../controllers/photos");

router.get("/", getPhotos);

// ✅ Ruta protegida solo para el fotógrafo (admin), usa multer + Cloudinary
router.post("/", checkAdmin, upload.array("images", 10), createPhoto);

router.delete("/:articleId", deletePhoto);

module.exports = router;
