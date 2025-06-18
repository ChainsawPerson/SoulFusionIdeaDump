const express = require('express');
const router = express.Router();
const path = require('path');
const baseURL = require('../../../src/routes/options.js').baseUrl;

router.use('/', express.static(path.join(__dirname)));
router.get(`${baseURL}/Magic`, (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'magic.html'));
})

router.get(`${baseURL}/Magic/:Magicname`, (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'magic.html'));
})

module.exports = router;