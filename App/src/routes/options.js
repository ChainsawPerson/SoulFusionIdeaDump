const baseURL = '/SoulFusion';

const adminPassword = 'S.A.G.A.P.O'; // Password for admin commands

const databaseConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soulfusion'
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