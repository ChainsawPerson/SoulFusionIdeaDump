const express = require('express');
const router = express.Router();
const path = require('path');
const baseURL = require('../src/routes/options.js').baseUrl;
const Classes = require('./main/classes/classesOption.js');
const Forms = require('./main/suggestions/suggestions.js');
const Magic = require('./main/magic/magicOption.js');

router.use(express.static(path.join(__dirname)));

router.use('/', Classes);
router.use('/', Forms);
router.use('/', Magic);

router.get(baseURL, (req, res) => { // GET IPaddress:9876/SoulFusion -> Bring up the main page
    res.status(200).sendFile(path.join(__dirname, 'main','main.html'));
});

// Coming Soon Page for not yet implemented features

const comingSoonPages = [ // Need to be changed manually when new pages are added
    '/Souls',
]

comingSoonPages.forEach(page => {
    router.get(`${baseURL}${page}`, (req, res) => { // GET IPaddress:9876/SoulFusion/Souls -> Bring up the Coming Soon page
        res.status(200).sendFile(path.join(__dirname, 'main','comingsoon.html'));
    });
});

// Fallback route for any other requests
router.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'main', '404.html'));
});

module.exports = router;