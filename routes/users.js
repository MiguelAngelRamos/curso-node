const express = require("express");
const router = express.Router(); //* Extraer de express lo que nos ayudara a trabajar con las rutas
const {createUser, getUsers, getUserById, deleteUser, updateUser } = require("../controllers/users-controller");
const { validatorCreateUser, validatorGetUser } = require("../validators/users-validators");

//* GET http://localhost:3000/api/users
router.get("/", getUsers); 
//* GET  http://localhost:3000/api/users/"ELID"
router.get("/:id", validatorGetUser, getUserById);
//* POST http://localhost:3000/api/users
router.post("/", validatorCreateUser, createUser);

//* Actualizar
router.put("/:id", validatorGetUser, validatorCreateUser, updateUser);
//* Eliminar
router.delete("/:id", validatorGetUser, deleteUser);

module.exports = router;