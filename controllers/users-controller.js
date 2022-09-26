const { usersModel } = require('../models');
//* El controlador se encarga de la logica de nuestra aplicación (API)

//* Obtener la lista de usuarios de la base de datos
const getUsers = async (req, res) => {
  const data = await usersModel.find({}); //* traiga todos los usuarios
  res.send({data});
};


//* Crear un Usuario dentro de la base de datos
const createUser = async (req, res) => {
  //* req "request" es la solicitud
  //* res "response" la respuesta
  // const body = req.body;
  const { body } = req;
  console.log("El Body: " + body);
  const data = await usersModel.create(body);
  // res.send({data: data});
  res.send({ data })
};

module.exports = { getUsers, createUser };