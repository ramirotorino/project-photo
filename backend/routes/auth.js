const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validateSignup, validateSignin } = require("../middleware/validators");

const router = express.Router();

// Registro
router.post("/signup", validateSignup, (req, res, next) => {
  const { name, email, password } = req.body;

  console.log("📩 Datos recibidos para registro:", { name, email });

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      console.log("✅ Usuario creado:", user.email);
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      console.error("❌ Error en /signup:", err.message); // ✅ nuevo
      next(err);
    });
});

// Login
router.post("/signin", validateSignin, (req, res, next) => {
  const { email, password } = req.body;

  console.log("🔐 Intentando login para:", email); // ✅ nuevo

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        console.warn("❌ Usuario no encontrado"); // ✅ nuevo
        return Promise.reject(new Error("Credenciales incorrectas"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          console.warn("❌ Contraseña incorrecta"); // ✅ nuevo
          return Promise.reject(new Error("Credenciales incorrectas"));
        }

        if (!process.env.JWT_SECRET) {
          console.error("❌ JWT_SECRET no está definido en el entorno"); // ✅ nuevo
        } else {
          console.log("🔑 JWT_SECRET cargado correctamente"); // ✅ nuevo
        }

        const token = jwt.sign(
          { _id: user._id, email: user.email }, // ✅ agregar email al payload
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        console.log("✅ Login exitoso, token generado"); // ✅ nuevo
        res.send({ token });
      });
    })
    .catch((err) => {
      console.error("❌ Error en /signin:", err.message); // ✅ nuevo
      res.status(401).send({ message: err.message });
    });
});

module.exports = router;
