const getClasses = require('./getClasses.js');
const getClassDetails = require('./getClassDetails.js');
const restoreBackup = require('./restoreBackup.js');
const express = require('express');
const router = express.Router();

router.use('/', getClasses);
router.use('/', getClassDetails);
router.use('/', restoreBackup);
module.exports = router;