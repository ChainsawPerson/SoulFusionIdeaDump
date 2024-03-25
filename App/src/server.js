// http://localhost:9876/SoulFusion
const express = require('express');
const main = require('../public/main.js');
const database = require('./models/database.js');
const frontToBack = require('./controllers/frontToBack.js');

const app = express();
const port = 9876;

app.use('/', main);
app.use('/', database);
app.use('/', frontToBack);
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

process.on("unhandledRejection", err => {
    console.log(`An error occured: ${err.message}`);
    server.close(() => process.exit(1));
});