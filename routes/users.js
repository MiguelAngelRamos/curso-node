const express = require("express");
const router = express.Router(); //* Extraer de express lo que nos ayudara a trabajar con las rutas
const {createUser, getUsers } = require("../controllers/users-controller");

//* GET http://localhost:3000/api/users
router.get("/", getUsers); 
//* POST http://localhost:3000/api/users
router.post("/", createUser);

module.exports = router;