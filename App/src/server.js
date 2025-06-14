const express = require('express');
const fs = require('fs');
const https = require('https');
require('dotenv').config({
    path: '../.env'
});
const main = require('../public/main.js');
const database = require('./models/database.js');
const frontToBack = require('./controllers/frontToBack.js');

const app = express();
const port = 9876;

// Apply middleware routes
app.use('/', main);
app.use('/', database);
app.use('/', frontToBack);

// Read SSL certificate and key
const sslOptions = {
    key: fs.readFileSync('../../certs/key.pem'),
    cert: fs.readFileSync('../../certs/cert.pem')
};

// Create HTTPS server using Express app
const server = https.createServer(sslOptions, app);

server.listen(port, '0.0.0.0', () => {
    console.log(`Secure server is running at https://${process.env.IPaddress}:${port}/SoulFusion`);
});

// Global error handler
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`);
    server.close(() => process.exit(1));
});
