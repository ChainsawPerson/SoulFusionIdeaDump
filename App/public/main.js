const express = require('express');
const router = express.Router();
const path = require('path');
const baseURL = require('../src/routes/router.js').baseUrl;
const Classes = require('./main/classes/classesOption.js');

router.use(express.static(path.join(__dirname)));

router.use('/', Classes);

router.get(baseURL, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'main','main.html'));
});

module.exports = router;