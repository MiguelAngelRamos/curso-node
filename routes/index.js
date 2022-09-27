const express = require("express");
const fs = require("fs"); //* para leer la ruta directorio
const router = express.Router();

const PATH_ROUTES = __dirname; //* Nos devuelve el path en donde esta ubicado este archivo "index.js" (ruta absoluta)
//console.log(PATH_ROUTES);
// const a = fs.readdirSync(PATH_ROUTES); //* retorna un array
// [ 'index.js', 'users.js']

const removeExtension = fileName => {
  return fileName.split('.').shift(); //* solo el nombre
};

//* const removeExtension = fileName => fileName.split('.').shift(); //* solo el nombre

fs.readdirSync(PATH_ROUTES).filter( file => {
  console.log(file); //* index.js y users.js
  const name = removeExtension(file);
  if(name !== 'index') {
    console.log('Loading...' + name);
    //* alt + 96 ``
    router.use(`/${name}`, require(`./${file}`));
  }
});
module.exports = router;
//* http://localhost:3000/api/users
