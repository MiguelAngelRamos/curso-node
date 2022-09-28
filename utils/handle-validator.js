const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw(); // * Sino cumple la validación sea creashea (revienta)
    return next(); //* vaya hacia el controlador paso la validaciones
  } catch (error) {
    res.status(403);
    res.send({ errors: error.array()});
  }
};

module.exports = validateResults;