const swaggerJsDoc = require("swagger-jsdoc");

/**
 * API Config Info
 */

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentación del Api del Curso de Node",
    version: "1.0.0"
  },
  servers : [
    {
      url: "http://localhost:3000/api"
    }
  ],
  components: {
   securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer"
    }
   },
   schemas: {
    authLogin: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string"
        },
        password: {
          type: "string"
        },
      },
    },
    authRegister: {
      type: "object",
      required: ["email", "password", "age", "name"],
      properties: {
        name: {
          type: "string"
        },
        age: {
          type: "string"
        },
        email: {
          type: "string"
        },
        password: {
          type: "string"
        }
      }
    }
   }
  }
};

/**
 * Opciones
 *  */
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

const openApiConfiguration = swaggerJsDoc(options);
module.exports = openApiConfiguration;