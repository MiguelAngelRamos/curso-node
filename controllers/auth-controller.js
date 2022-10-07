// const { compare } = require('bcryptjs');
const { matchedData } = require('express-validator');
const { userSystemModel } = require('../models');
const { handleHttpError } = require('../utils/handle-error');
const { tokenSign } = require('../utils/handle-jwt');
const { encrypt } = require('../utils/handle-password');


//* Registrar un Usuario
const registerUserSystemController = async (req, res) => {
  try {
    req = matchedData(req);
    //* encriptar la password
    const passwordHash = await encrypt(req.password);
    const body  = { ...req, password: passwordHash};
    const dataUserSystem = await userSystemModel.create(body);
    //* No voy a pasar la password
    dataUserSystem.set("password", undefined, { strict: false });
    const data = {
      token: tokenSign(dataUserSystem),
      user: dataUserSystem
    }
    res.send({data});
  } catch (error) {
    handleHttpError(res, `ERROR_REGISTER_USER_SYSTEM, ${error}`);
  }
};

module.exports = { registerUserSystemController };