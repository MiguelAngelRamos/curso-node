const express = require("express");
const fs = require("fs"); //* para leer la ruta directorio
const router = express.Router();

const PATH_ROUTES = __dirname; //* Nos devuelve el path en donde esta ubicado este archivo "index.js" (ruta absoluta)
console.log(PATH_ROUTES);

const a = fs.readdirSync(PATH_ROUTES);
console.log(a);
