const { check } = require("express-validator");
const validateResults = require("../utils/handle-validator");

//* Validador para la Ruta por ID
const validatorGetIdMongo = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorGetIdMongo }