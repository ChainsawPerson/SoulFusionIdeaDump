const getClasses = require('./getClasses.js');
const express = require('express');
const router = express.Router();

router.use('/', getClasses);

module.exports = router;