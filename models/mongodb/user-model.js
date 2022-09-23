const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String
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
    timestamps: true,
    versionKey: false,
  }
);
//* "users" es el nombre de la colección, lo que se conoce en Sql como nombre de la tabla
module.exports = mongoose.model("users", UserScheme);