// http://localhost:9876/SoulFusion
const express = require('express');
const main = require('../public/main.js');
const database = require('./models/database.js');
const frontToBack = require('./controllers/frontToBack.js');

const app = express();
const port = 9876;

app.use('/', main); // Homepage: main.html
app.use('/', database); // All Database API Requests
app.use('/', frontToBack); // API Requests for Input from Frontend to Backend

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}.
        http://localhost:${port}/SoulFusion`);
});

process.on("unhandledRejection", err => {
    console.log(`An error occured: ${err.message}`);
    server.close(() => process.exit(1));
});