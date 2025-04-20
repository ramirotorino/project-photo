const Photo = require("../models/photo");
const User = require("../models/user");

// Obtener las fotos del usuario autenticado (o todas si es admin)
const getPhotos = (req, res, next) => {
  const userEmail = req.user.email;

  const query =
    userEmail === "themanco@example.com"
      ? {} // administrador ve todo
      : { owner: req.user._id }; // cliente ve solo sus fotos

  Photo.find(query)
    .then((photos) => res.send(photos))
    .catch(next);
};

const createPhoto = async (req, res) => {
  console.log("📥 BODY recibido:", req.body);
  console.log("📷 Archivos recibidos:", req.files);
  const { title, date, owner } = req.body;

  if (!req.files || req.files.length === 0) {
    console.error("⚠️ No se recibieron archivos.");
    return res.status(400).send({ message: "No se subieron imágenes" });
  }
  const imageUrls = req.files.map((file) => file.path); // ✅ URLs desde Cloudinary
  const userEmail = req.user.email;

  if (userEmail !== "themanco@example.com") {
    return res
      .status(403)
      .send({ message: "Solo el fotógrafo puede subir fotos" });
  }

  try {
    const existingUser = await User.findOne({ email: owner });
    if (!existingUser) {
      return res.status(404).send({ message: "El cliente no existe" });
    }

    const newPhoto = await Photo.create({
      title,
      date,
      images: imageUrls,
      owner,
    });

    res.status(201).send(newPhoto);
  } catch (err) {
    console.error("❌ Error al crear la sesión:", err);
    res.status(500).send({ message: "Error interno al guardar la sesión" });
  }
};

// Eliminar una foto
const deletePhoto = (req, res, next) => {
  const { articleId } = req.params;
  const userEmail = req.user.email;

  Photo.findById(articleId)
    .then((photo) => {
      if (!photo) {
        return res.status(404).send({ message: "Foto no encontrada" });
      }

      const isAdmin = userEmail === "themanco@example.com";
      const isOwner = photo.owner.toString() === req.user._id;

      if (!isAdmin && !isOwner) {
        return res.status(403).send({ message: "No puedes borrar esta foto" });
      }

      return photo
        .deleteOne()
        .then(() => res.send({ message: "Foto eliminada" }));
    })
    .catch(next);
};

module.exports = { getPhotos, createPhoto, deletePhoto };
