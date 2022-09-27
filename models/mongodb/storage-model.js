const mongoose = require("mongoose");

const StorageScheme = new mongoose.Schema(
  {
    url: {
      type: String
    },
    filename: {
      type: String
    },
    mediaId: {
      type: mongoose.Types.ObjectId,//* Debe ser del tipo de una ID DE MONGO
    }
  },
  {
    timestamps: true, //* createAt y updateAt
    versionKey: false, //* para evitar se cree __v
  }
);

module.exports = mongoose.model("storages", StorageScheme);