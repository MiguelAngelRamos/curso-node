const express = require("express");
const { registerUserSystemController, loginUserSystemController } = require("../controllers/auth-controller");
//* controladores loginController, registerController
//* Modelo
//* Validators para login y register
const { validatorRegisterUser, validatorLoginUser } = require('../validators/auth-validators');
const router = express.Router();

//* http://localhost:3000/api/auth
//* http://localhost:3000/api/auth/Login
//* http://localhost:3000/api/auth/register

/**
 * http://localhost:3000/api
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags: 
 *              - auth
 *          summary: "Registrar un nuevo usuario"
 *          description: "Esta es la ruta para crear un nuevo usuario"
 *          requestBody: 
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                '201':
 *                    description: El usuario se registra de manera correcta
 *                '403':
 *                    description: Error por validación
 */
router.post("/register", validatorRegisterUser, registerUserSystemController);
/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: Iniciar session a un nuevo usuario y obtener el token de sesión
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 */
router.post("/login", validatorLoginUser, loginUserSystemController);

module.exports = router;

//* 3 tabs
//* 5 tabs