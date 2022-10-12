const express = require("express");
//* Vamos llamar al controlador
const { createImage, getRegisterImages, getImageById, deleteImage } = require("../controllers/storage-controller");
//* Vamos Middleware
const uploadMiddleware = require("../utils/handle-storage");
const { validatorGetIdMongo } = require("../validators/validator-idmongo");
const router = express.Router();

//* localhost:3000/api/storage
/**
 * Upload file
 * @openapi
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "Upload file"
 *      description: Subir un archivo
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myfile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/", uploadMiddleware.single("myfile"), createImage);
//* GET localhost:3000/api/storage
/**
 * Get all storages
 * @openapi
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: "Listar archivos"
 *      description: Obten todas las listas de las archivos
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las archivos.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", getRegisterImages);
//* GET localhost:3000/api/storage/IDMONGO
router.get("/:id", validatorGetIdMongo, getImageById);
// * DELETE
router.delete("/:id", validatorGetIdMongo, deleteImage );

module.exports = router;


//* middleware es un intermediario entre la ruta y el controlador