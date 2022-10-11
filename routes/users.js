const express = require("express");
const router = express.Router(); //* Extraer de express lo que nos ayudara a trabajar con las rutas
const {createUser, getUsers, getUserById, deleteUser, updateUser } = require("../controllers/users-controller");

const checkRol = require("../middleware/rol");
//* el guardian
const authMiddleware = require("../middleware/session");

const { validatorCreateUser } = require("../validators/users-validators");
const { validatorGetIdMongo } = require("../validators/validator-idmongo");

//* GET http://localhost:3000/api/users
router.get("/", authMiddleware, checkRol(["admin"]), getUsers);
//* GET  http://localhost:3000/api/users/"ELID"
router.get("/:id",validatorGetIdMongo , getUserById);
//* POST http://localhost:3000/api/users
router.post("/", validatorCreateUser, createUser);

//* Actualizar
router.put("/:id", validatorGetIdMongo, validatorCreateUser, updateUser);
//* Eliminar
router.delete("/:id",validatorGetIdMongo, deleteUser);

module.exports = router;