const Photo = require("../models/photo");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");

// Obtener las fotos del usuario autenticado (o todas si es admin)
const getPhotos = (req, res, next) => {
  const userEmail = req.user.email;

  const query =
    userEmail === "themanco@example.com"
      ? {} // administrador ve todo
      : { owner: req.user.email }; // ✅ cliente ve solo sus fotos asociadas por email

  Photo.find(query)
    .then((photos) => {
      console.log("📤 Sesiones enviadas al cliente:", photos);
      res.send(photos);
    })

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
const deletePhoto = async (req, res, next) => {
  const { articleId } = req.params;
  const userEmail = req.user.email;

  try {
    const photo = await Photo.findById(articleId);

    if (!photo) {
      return res.status(404).send({ message: "Foto no encontrada" });
    }

    const isAdmin = userEmail === "themanco@example.com";
    const isOwner = photo.owner === userEmail;

    if (!isAdmin && !isOwner) {
      return res.status(403).send({ message: "No puedes borrar esta foto" });
    }

    // 🟡 Extra: eliminar imágenes de Cloudinary
    const deletionPromises = photo.images.map((url) => {
      const publicId = url.split("/upload/")[1].split(".")[0]; // ✅ obtiene "sessions/file_xyz"
      return cloudinary.uploader.destroy(publicId); // 🧨 borra la imagen
    });

    await Promise.all(deletionPromises);

    await photo.deleteOne();

    res.send({ message: "Sesión eliminada junto con imágenes" });
  } catch (err) {
    console.error("❌ Error al eliminar sesión:", err);
    next(err);
  }
};

module.exports = { getPhotos, createPhoto, deletePhoto };
