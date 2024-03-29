const express = require('express');
const router = express.Router();
const path = require('path');
const baseURL = require('../src/routes/options.js').baseUrl;
const Classes = require('./main/classes/classesOption.js');
const Forms = require('./main/suggestions/suggestions.js');

router.use(express.static(path.join(__dirname)));

router.use('/', Classes);
router.use('/', Forms);

router.get(baseURL, (req, res) => { // GET localhost:9876/SoulFusion -> Bring up the main page
    res.status(200).sendFile(path.join(__dirname, 'main','main.html'));
});

module.exports = router;