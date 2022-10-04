const { matchedData } = require("express-validator");
const { usersModel } = require('../models');
const userModel = require("../models/mongodb/user-model");
const { handleHttpError } = require('../utils/handle-error');
//* El controlador se encarga de la logica de nuestra aplicación (API)

//* Obtener la lista de usuarios de la base de datos
const getUsers = async (req, res) => {
  try {
    const data = await usersModel.find({}); //* traiga todos los usuarios
    res.send({data});
  } catch (error) {
    handleHttpError(res, `ERROR_GET_USERS, ${error}`);
  }
};

const getUserById = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    // const id = req.id;
    const data = await usersModel.findById(id).exec();
    res.send({data});
    //* antes de llegar aca necesitamos el id que sea de tipo mongo id
  } catch (error) {
    handleHttpError(res, `ERROR_GET_USER_BY_ID, ${error}`);
  }
}

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
    // handleHttpError(res, error);
    handleHttpError(res, `ERROR_CREATE_USER, ${error}`);
    // res.status(403);
    // res.send({ error });
    //* en mongoDb "code": 11000, es de clave duplicada
  }
};
//* Actualizar el Usuario
const updateUser = async (req, res) => {
  try {
     const {id, ...body }= matchedData(req);
     const data = await userModel.findByIdAndUpdate({_id: id}, body, { new: true});
     res.send({ data });
  } catch (error) {
    handleHttpError(res, `ERROR_UPDATE_USERS, ${error}`);
  }
};

//* Eliminacion Logica
const deleteUser = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const info = await usersModel.delete({_id: id});
    res.send({info});
  } catch (error) {
    handleHttpError(res, `ERROR_DELETE_USER, ${error}`)
  }
};

//* Eliminar un Usuario Fisica
// const deleteUser = async (req, res) => {
//   try {
//     req = matchedData(req);
//     const { id } = req;
//     const info = await usersModel.deleteOne({_id: id});
//     res.send({info});
//   } catch (error) {
//     handleHttpError(res, `ERROR_DELETE_USER, ${error}`)
//   }
// };

module.exports = { getUsers, createUser, getUserById, deleteUser, updateUser};