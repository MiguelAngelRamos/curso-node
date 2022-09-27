const multer = require("multer");
//* Esta constante "storage", hace referencia al disco de almacenamiento de nuestro equipo o servidor
const storage = multer.diskStorage({
  //* destination en su función, los parametros: request, file(archivo) y cb (callback que nos va indicar cuando finaliza el proceso de la logica que vamos a implementar)
  destination: function(req, file, cb){
    const pathStorage = `${__dirname}/../storage`;
    //* __dirname "es donde estoy ubicado", llegamos a la carpeta (storage)
    //* Hacemos uso del callback, pasa como primer argumento el error si existiese y como segundo argumento
    //* el pathStorage que hace relacion al distino del archivo
    cb(null, pathStorage);
  },
  filename: function(req, file, cb) {
    //* mi-cv.pdf, mi-foto.png, mi-video.mp4
    //* file obtenemos el nombre original del archivo
    const ext = file.originalname.split(".").pop();
    //* ['mi-cv', 'pdf'] la extensión siempre va ser el ultimo elemento del array
    //* El objetivo es crear un archivo con un nombre aleatorio, de manera que ningun se sobreescriba.
    //* file-38184184171."extension"
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({storage});
// const uploadMiddleware = multer({
//   storage: storage
// });

module.exports = uploadMiddleware;

//* En este archivo podriamos una conexión a servicios como S3 de amazon.