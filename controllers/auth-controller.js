// const { compare } = require('bcryptjs');
const { matchedData } = require('express-validator');
const { userSystemModel } = require('../models');
const { handleHttpError } = require('../utils/handle-error');


//* Registrar un Usuario
const registerUserSystemController = async (req, res) => {
  try {
    req = matchedData(req);
    //* encriptar la password
    //* const passwordHash = 
  } catch (error) {
    
  }
};