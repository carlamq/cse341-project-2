const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Contacts API'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFile = ['./src/routes/index.js'];

// tis will generate swagger json
swaggerAutoGen(outputFile, endpointsFile, doc);