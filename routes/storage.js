const express = require("express");
//* Vamos llamar al controlador
//* Vamos Middleware
const router = express.Router();

//* localhost:3000/api/storage
router.post("/", "middleware", "controlador");

module.exports = router;


//* middleware es un intermediario entre la ruta y el controlador