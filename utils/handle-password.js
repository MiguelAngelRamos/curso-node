const bcryptjs = require("bcryptjs");

const encrypt = async ( passwordNormal ) => {
  const hash = await bcryptjs.hash(passwordNormal, 10);
  return hash;
};

const compare = async (passwordNormal, hashPassword) => {
  return await bcryptjs.compare(passwordNormal, hashPassword);
}

module.exports = { encrypt, compare };