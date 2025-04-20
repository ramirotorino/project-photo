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
router.post(
  "/",
  checkAdmin,
  (req, res, next) => {
    const uploadHandler = upload.array("images", 10);
    uploadHandler(req, res, function (err) {
      if (err) {
        console.error("❌ Error de multer:", err);
        return res.status(500).send({ message: "Error al procesar archivos" });
      }
      console.log("✅ Pasó multer, continúa al controlador");
      next();
    });
  },
  createPhoto
);

router.delete("/:articleId", deletePhoto);

module.exports = router;
