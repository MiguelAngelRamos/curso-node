const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true, //* que el correo va ser unico
    },
    telefono: {
      type: Number
    },
    empresa: {
      type: String
    }
  },
  {
    timestamps: true, //* createdAt, updateAt
    versionKey: false,
  }
);

UserScheme.plugin(mongooseDelete, {overrideMethods: 'all'}); //* para sobreescribir los métodos de moongose
//* "users" es el nombre de la colección, lo que se conoce en Sql como nombre de la tabla
module.exports = mongoose.model("users", UserScheme);