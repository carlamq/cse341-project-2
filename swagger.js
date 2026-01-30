const swaggerAutogen = require('swagger-autogen')();

const doc = { 
    info: {   
        title: 'Mind Habit Tracker API',   
        description: 'API for tracking habits and journal entries'
    },
    host: 'localhost:3000', 
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
