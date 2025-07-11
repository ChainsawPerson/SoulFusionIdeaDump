const express = require('express');
const router = express.Router();
const path = require('path');
const baseURL = require('../../../src/routes/options.js').baseUrl;

router.use('/', express.static(path.join(__dirname)));
router.get(`${baseURL}/Classes`, (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'classes.html'));
})

router.get(`${baseURL}/Classes/:ClassName`, (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'class.html'));
})

module.exports = router;