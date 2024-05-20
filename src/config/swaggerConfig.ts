import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GameVault API',
            version: '1.0.0',
            description: 'API documentation for the GameVault application',
        },
    },
    apis: ['./src/routes/*.ts'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export default specs;
