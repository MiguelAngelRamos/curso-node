// const { compare } = require('bcryptjs');
const { matchedData } = require('express-validator');
const { userSystemModel } = require('../models');
const { handleHttpError } = require('../utils/handle-error');
const { tokenSign } = require('../utils/handle-jwt');
const { encrypt, compare } = require('../utils/handle-password');


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

const loginUserSystemController = async (req, res) => {
  try {
    req = matchedData(req);
    //* Buscar al usuario en la base de datos
    const user = await userSystemModel.findOne({email: req.email}).select('password name role email');

    if(!user) {
      handleHttpError(res, `USER_NOT_EXISTS`, 404);
      return;
    }
    //* El usuario si existe!
    const hashPassword = user.get('password');
    //* vamos a comparar
    const check = await compare(req.password, hashPassword);

    if(!check) {
      handleHttpError(res, "CRENDENCIALES_INCORRECTA", 401);
      return;
    }

    user.set('password', undefined, { strict: false });
    const data = {
      token: tokenSign(user),
      user
      // user: user
    }
    res.send({data});
  } catch (error) {
    handleHttpError(res, `USER_NOT_EXISTS`, 404);
  }
};

module.exports = { registerUserSystemController, loginUserSystemController };