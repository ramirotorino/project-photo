require("dotenv").config(); // Lee variables desde .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { requestLogger, errorLogger } = require("./middleware/logger");

const auth = require("./middleware/auth"); // 🔐 Middleware de autorización

// Rutas
const authRoutes = require("./routes/auth"); // /signup, /signin
const userRoutes = require("./routes/users"); // /users/me
const photoRoutes = require("./routes/photos"); // /articles

const app = express();
const PORT = process.env.PORT || 3000;

// 🔧 Middleware global
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// 🌐 Conexión a MongoDB local
mongoose.connect("mongodb://127.0.0.1:27017/projectdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger); // 📝 Log de todas las solicitudes

// 🔓 Rutas públicas
app.use("/", authRoutes); // 🔓 se hace explícito que es público

// 🔐 Rutas protegidas
app.use(auth); // A partir de acá se requiere JWT
app.use("/users", userRoutes);
app.use("/articles", photoRoutes);

// ⚠️ Ruta no encontrada
app.use("*", (req, res) => {
  res.status(404).send({ message: "Ruta no encontrada" });
});

const { errors } = require("celebrate");
app.use(errors()); // ← primero: errores de validación
app.use(errorLogger); // ← luego log de errores
app.use(require("./middleware/errors")); // ← por último, tu handler

const errorHandler = require("./middleware/errors");
app.use(errorHandler); //  Middleware centralizado de errores

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
