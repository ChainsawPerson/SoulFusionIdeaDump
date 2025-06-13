require('dotenv').config(); // Load environment variables from .env file

const baseURL = '/SoulFusion';

const adminPassword = process.env.ADMIN_PASSWORD; // Password for admin commands

const databaseConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
};

const responseErrorMessage = { // Wireframe of Error Message Response
    "error": {
        "code" : 404,
        "message" : "Not found"
    }
};

const responseResultMessage = { // Wireframe of Results Message Response
    "results" : {
        "code" : 200,
        "message" : ""
    }
};

module.exports = {
    baseUrl : baseURL,
    adminPassword : adminPassword,
    databaseConfig : databaseConfig,
    responseErrorMessage : responseErrorMessage,
    responseResultMessage : responseResultMessage
};