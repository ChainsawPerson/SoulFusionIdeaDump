const express = require('express');
const router = express.Router();
const path = require('path');
const baseURL = require('../../../src/routes/options.js').baseUrl;

router.use(express.static(path.join(__dirname)));

router.get(`${baseURL}/ClassForm`, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'class', 'classform.html'));
});

module.exports = router;