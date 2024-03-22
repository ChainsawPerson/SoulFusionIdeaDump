const express = require('express');
const router = express.Router();
const path = require('path');
const baseURL = require('../../../src/routes/router.js').baseUrl;

router.get(`${baseURL}/Classes`, (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'classes.html'));
})

module.exports = router;