const mongoose = require("mongoose");
const validator = require("validator");

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  images: {
    type: [String], // ✅ Array de URLs
    required: true,
    validate: {
      validator: (arr) =>
        Array.isArray(arr) && arr.every((url) => validator.isURL(url)),
      message: "Cada imagen debe ser una URL válida",
    },
  },

  owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("photo", photoSchema);
