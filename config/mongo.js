const mongoose = require("mongoose");

const dbConnect = () => {
  // const DB_URI = process.env.DB_URI;
  const DB_URI = 'mongodb://localhost:27017/db_usuarios';

  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err, res) => {
    if(!err) {
      //* si no hay un error
      console.log("*** CONEXIÓN HACIA LA BASE DATOS, CORRECTA ***");
    } else {
      console.log("*** ERROR EN LA CONEXIÓN *** ");
    }
  });
};

module.exports = dbConnect;

//* useNewUrlParser: true, si no especifica mongoose utilizará un método obsoleto, para intentar parsear la uri de conexión.

//* useUnifiedTopology: true para que intente la conexión cada milisegundo