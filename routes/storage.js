const express = require("express");
//* Vamos llamar al controlador
const { createImage, getRegisterImages} = require("../controllers/storage-controller");
//* Vamos Middleware
const uploadMiddleware = require("../utils/handle-storage");
const { validatorGetIdMongo } = require("../validators/validator-idmongo");
const router = express.Router();

//* localhost:3000/api/storage
router.post("/", uploadMiddleware.single("myfile"), createImage);
//* GET localhost:3000/api/storage
router.get("/", getRegisterImages);
//* GET localhost:3000/api/storage/IDMONGO
router.get("/:id", validatorGetIdMongo );

module.exports = router;


//* middleware es un intermediario entre la ruta y el controlador