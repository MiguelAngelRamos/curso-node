const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

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
StorageScheme.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model("storages", StorageScheme);