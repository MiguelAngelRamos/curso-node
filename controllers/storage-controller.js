const { matchedData } = require('express-validator');
const { storageModel } = require('../models');
const { handleHttpError } = require('../utils/handle-error');
const fs = require('fs');
const PUBLIC_URL = process.env.PUBLIC_URL;
const IMAGE_PATH = `${__dirname}/../storage`;

//* GET obtener el registro la Imagen
const getRegisterImages = async (req, res) => {
  const data = await storageModel.find({});
  // res.send({data: data});
  res.send({data});
};

//*GET image por ID
const getImageById = async (request, response) => {
  try {
    const { id } = matchedData(request);
    // console.log(id);
    const detailsRegisterImage = await storageModel.findById({_id: id});
    response.send({detailsRegisterImage});
  } catch (error) {
    handleHttpError(response, `ERROR_DETAILS_IMAGE_REGISTER, ${error}`);
  }
}

//* POST Para crear el registro de la imagen
const createImage = async (req, res) => {
  const { body, file } = req; //* body, file
  console.log(body);
  console.log("FILE: " + file.filename);
  //TODO: el id de mongo db del usuario al cual, le vamos asignar esta imagen

  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`
  };
  //* localhost:3000/37174146164617.png
  //* Llamamos al Modelo
  const data = await storageModel.create(fileData);
  res.send(data);
};

//* Eliminiacion Fisca de la Imagen
const deleteImage = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataImage = await storageModel.findById({_id: id});

    //* Eliminamos el Registro
    await storageModel.deleteOne({_id:id});

    //* Eliminamos la Imagen fisicamente
    const filePath = `${IMAGE_PATH}/${dataImage.filename}`;

    //* fs lo que elimina
    fs.unlinkSync(filePath);

    const data = {
      filePath,
      delete: 1
    }; //* Con este objeto le indicamos que este archivo ha sido eliminado correctamente
    res.send({data});
  } catch (error) {
    handleHttpError(res, `ERROR_DETAILS_ITEM, ${error}`);
  }
}


module.exports = { getRegisterImages, createImage, getImageById, deleteImage };