require("dotenv").config(); //* para decirle a la aplicación que utilize las variables de entorno
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const app = express();

app.use(cors()); //* para evitar el error de origen cruzado, por el momento todos los clientes se pueden conectar

const port = process.env.PORT || 3001; //* en caso que llegue fallar tenemos el puerto 3001

//* pasamos como primer argumento el puerto y luego una función 
app.listen(port, () => {
  //* alt + 96 
  console.log(`Servidor en linea : http://localhost:${port}`);
});
dbConnect();