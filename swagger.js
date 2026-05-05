const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Phonepe Backend API',
    description: 'API Documentation for Phonepe Backend'
  },
  host: 'localhost:5000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token in the format **Bearer &lt;token&gt;**'
    }
  },
  security: [ { bearerAuth: [] } ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation has been generated successfully.');
});
