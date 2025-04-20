const jwt = require("jsonwebtoken");

const handleAuthError = (res) => {
  res.status(401).send({ message: "Error de autorización" });
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  console.log("🔎 Datos del token decodificado:", req.user);
  return next();
};
