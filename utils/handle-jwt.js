const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//* Para firmar el token
const tokenSign = user => {
  const sign = jwt.sign(
  {
    _id: user._id,
    role: user.role 
  },
  JWT_SECRET,
  {
    expiresIn: "2h",
  }
  );
  return sign;
}

//* verificar que el token sea el correcto firmado por nuestro backend
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    console.log(e);
    // return null;
  }
};
module.exports = { tokenSign, verifyToken };