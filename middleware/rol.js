const { handleHttpError } = require("../utils/handle-error");

const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req; //* traemos al usuario que esta intentando hacer la petición
    console.log(user);
    //* Extraer los roles
    const rolesByUser = user.role; //* trae por defecto user

    //* verificar si cumple con los roles para esta ruta
    const checkValueRol = roles.some( (rolSingle) => rolesByUser.includes(rolSingle));

    if(!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    next();
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSIONS" + error, 403);
  }
};
module.exports = checkRol;
//* roles = ["admin"]
//* authMiddleware, checkRol(["admin"]) (es necesario que esto vaya en este orden ya que checkRol necesita de authMiddleware)