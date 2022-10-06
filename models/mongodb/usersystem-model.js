const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
//* Declarar el Schema
const UserSystemScheme = new mongoose.Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      unique: true //* correo debe ser unico 
    },
    password: {
      type: String,
      select: false //* para que no retorne la password
    },
    role: {
      type: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true, //* createdAt, updatedAt
    versionKey: false,
  }
  );
  UserSystemScheme.plugin(mongooseDelete, {overrideMethods: 'all'});
  module.exports = mongoose.model('usersystem', UserSystemScheme);