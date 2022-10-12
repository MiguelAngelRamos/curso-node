const express = require("express");
const router = express.Router(); //* Extraer de express lo que nos ayudara a trabajar con las rutas
const {createUser, getUsers, getUserById, deleteUser, updateUser } = require("../controllers/users-controller");

const checkRol = require("../middleware/rol");
//* el guardian
const authMiddleware = require("../middleware/session");

const { validatorCreateUser } = require("../validators/users-validators");
const { validatorGetIdMongo } = require("../validators/validator-idmongo");

//* GET http://localhost:3000/api/users
/**
 * Get all users
 * @openapi
 * /users:
 *    get:
 *      tags:
 *        - users
 *      summary: "Listar canciones"
 *      description: Obten todas las listas de los usuarios
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de los usuarios
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", authMiddleware, checkRol(["admin"]), getUsers);
//* GET  http://localhost:3000/api/users/"ELID"
/**
 * Get user
 * @openapi
 * /users/{id}:
 *    get:
 *      tags:
 *        - users
 *      summary: "Detalle Usuario"
 *      description: Obten el detalle de un usuario
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de usuario a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto del usuario.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/user'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id",validatorGetIdMongo , getUserById);
//* POST http://localhost:3000/api/users
/**
 * Register new Usuario
 * @openapi
 * /users:
 *    post:
 *      tags:
 *        - users
 *      summary: "Register user"
 *      description: Registra una cancion y obtener el detalle del registro
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/user"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/", validatorCreateUser, createUser);

//* Actualizar
/**
 * Update user
 * @openapi
 * /users/{id}:
 *    put:
 *      tags:
 *        - users
 *      summary: "Update track"
 *      description: Actualiza un usuario y obtener el detalle del registro
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de usuario a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objeto actualizado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/user"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/user'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.put("/:id", validatorGetIdMongo, validatorCreateUser, updateUser);
//* Eliminar
/**
 * Delete usuario
 * @openapi
 * /users/{id}:
 *    delete:
 *      tags:
 *        - users
 *      summary: "Eliminar usuario"
 *      description: Elimiar el detalle de un usuario
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de usuario a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de un usuario
 *        '422':
 *          description: Error de validacion.
 */
router.delete("/:id",validatorGetIdMongo, deleteUser);

module.exports = router;