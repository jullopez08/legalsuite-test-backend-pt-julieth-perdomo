const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LegalSuite API',
      version: '1.0.0',
      description: 'API para gestión de abogados y casos legales'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/docs/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
