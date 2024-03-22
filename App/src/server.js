// http://localhost:9876/SoulFusion
const express = require('express');
const main = require('../public/main.js');
const database = require('./models/database.js');

const app = express();
const port = 9876;

app.use('/', main);
app.use('/', database);
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});