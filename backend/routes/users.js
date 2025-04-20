const express = require("express");
const { getCurrentUser } = require("../controllers/users");

const router = express.Router();

// Ruta protegida para obtener el usuario actual
router.get("/me", getCurrentUser);

module.exports = router;
