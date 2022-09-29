const { matchedData } = require("express-validator");
const { usersModel } = require('../models');
const { handleHttpError } = require('../utils/handle-error');
//* El controlador se encarga de la logica de nuestra aplicación (API)

//* Obtener la lista de usuarios de la base de datos
const getUsers = async (req, res) => {
  const data = await usersModel.find({}); //* traiga todos los usuarios
  res.send({data});
};


//* Crear un Usuario dentro de la base de datos
const createUser = async (req, res) => {
  try {
    //* req "request" es la solicitud
    //* res "response" la respuesta
    // const bodyDirty = req.body;
    const body = matchedData(req);
    // const { body } = req;
    console.log({body});
    const data = await usersModel.create(body);
    // res.send({data: data});
    // res.send({bodyDirty, bodyClean });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
    // res.status(403);
    // res.send({ error });
    //* en mongoDb "code": 11000, es de clave duplicada
  }

};

module.exports = { getUsers, createUser };