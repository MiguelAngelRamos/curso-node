const { storageModel } = require('../models');
const PUBLIC_URL = process.env.PUBLIC_URL;

//* GET obtener el registro la Imagen
const getImage = async (req, res) => {
  const data = await storageModel.find({});
  // res.send({data: data});
  res.send({data});
};

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
module.exports = { getImage, createImage };