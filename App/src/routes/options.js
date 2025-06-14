require('dotenv').config({
    path: require('path').resolve(__dirname, '../../../.env') // Load environment variables from .env file
}); // Load environment variables from .env file

const baseURL = '/SoulFusion';

const adminPassword = process.env.ADMIN_PASSWORD; // Password for admin commands

const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
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