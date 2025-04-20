const ADMIN_EMAIL = "themanco@example.com"; // ⚠️ Reemplazalo por tu correo real

module.exports = (req, res, next) => {
  if (req.user && req.user.email === ADMIN_EMAIL) {
    return next(); // ✅ Tiene permiso
  }

  return res
    .status(403)
    .send({ message: "No tienes permiso para realizar esta acción" });
};
