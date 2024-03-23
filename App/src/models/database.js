const getClasses = require('./getClasses.js');
const getClassDetails = require('./getClassDetails.js');
const express = require('express');
const router = express.Router();

router.use('/', getClasses);
router.use('/', getClassDetails);
module.exports = router;