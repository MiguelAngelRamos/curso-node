const express = require("express");
const router = express.Router(); //* Extraer de express lo que nos ayudara a trabajar con las rutas
const {createUser, getUsers } = require("../controllers/users-controller");
const { validatorCreateUser } = require("../validators/users-validators");

//* GET http://localhost:3000/api/users
router.get("/", getUsers); 
//* POST http://localhost:3000/api/users
router.post("/", validatorCreateUser, createUser);

module.exports = router;