// const { compare } = require('bcryptjs');
const { matchedData } = require('express-validator');
const { userSystemModel } = require('../models');
const { handleHttpError } = require('../utils/handle-error');
const { tokenSign } = require('../utils/handle-jwt');
const { encrypt, compare } = require('../utils/handle-password');
const { authMockUser } = require('../db/auth.mock');


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
    const mockUser = await authMockUser;
    console.log(mockUser);
    const { email, password } = req.body;

    if(mockUser.email !== email) {
      res.status(404);
      res.send({ error: 'User not found'});
    }

    const checkPassword = (mockUser.password === password);
    console.log(checkPassword);
    console.log(mockUser.password);
    console.log(password);
    if(!checkPassword) {
      res.status(409)
      res.send({
          error: 'Invalid password'
      })
      return
    }
    //* Generando el Token
    const tokenSession = await tokenSign(mockUser);
    // delete mockUser.password;
    const userResponse = {...mockUser};
    delete userResponse;
    res.send({
      data: userResponse,
      tokenSession
    });

  
    // req = matchedData(req);
    // const user = await userSystemModel.findOne({email: req.email}).select('password name role email');
    // if(!user) {
    //   handleHttpError(res, `USER_NOT_EXISTS`, 404);
    //   return;
    // }
    // const hashPassword = user.get('password');
    // const check = await compare(req.password, hashPassword);
    // if(!check) {
    //   handleHttpError(res, "CRENDENCIALES_INCORRECTA", 401);
    //   return;
    // }
    // user.set('password', undefined, { strict: false });
    // const data = {
    //   token: tokenSign(user),
    //   user
    // }
    // res.send({data});
  } catch (error) {
    handleHttpError(res, `USER_NOT_EXISTS`, 404);
  }
};

module.exports = { registerUserSystemController, loginUserSystemController };