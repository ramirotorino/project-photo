const User = require("../models/user");

// Obtener la info del usuario actual
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = { getCurrentUser };
