require("dotenv").config(); //* para decirle a la aplicación que utilize las variables de entorno
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const app = express();

app.use(cors()); //* para evitar el error de origen cruzado, por el momento todos los clientes se pueden conectar
app.use(express.json()); //* Con esto le indicamos a nuestro backend que reciba información en el método POST
const port = process.env.PORT || 3001; //* en caso que llegue fallar tenemos el puerto 3001

//* Aqui vamos a cargar nuestras rutas
//* http://localhost:3000/api/"nombreDeLaRuta"
//* http://localhost:3000/api
// app.use("/api", (req, res) => {
//   res.send({ saludo: 'Hola Ruta accedida'});
// });
app.use("/api", require("./routes"));

//* pasamos como primer argumento el puerto y luego una función 
app.listen(port, () => {
  //* alt + 96 
  console.log(`Servidor en linea : http://localhost:${port}`);
});
dbConnect();