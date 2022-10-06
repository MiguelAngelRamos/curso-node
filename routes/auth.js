const express = require("express");
const { registerUserSystemController } = require("../controllers/auth-controller");
//* controladores loginController, registerController
//* Modelo
//* Validators para login y register
const { validatorRegisterUser, validatorLoginUser } = require('../validators/auth-validators');
const router = express.Router();

//* http://localhost:3000/api/auth
//* http://localhost:3000/api/auth/Login
//* http://localhost:3000/api/auth/register

router.post("/register", validatorRegisterUser, registerUserSystemController);