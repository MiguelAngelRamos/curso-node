const { check } = require("express-validator");
const validateResults = require("../utils/handle-validator");

const validatorCreateUser = [
  check("name").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("telefono").exists().notEmpty(),
  check("empresa").exists().notEmpty(),
  (req, res, next) => {
    //* handle
    validateResults(req, res, next);
  }
];

//* Validador para la Ruta por ID
const validatorGetUser = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorCreateUser, validatorGetUser };