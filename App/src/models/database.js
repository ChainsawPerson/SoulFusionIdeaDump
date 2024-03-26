const getClasses = require('./getClasses.js');
const getClassDetails = require('./getClassDetails.js');
const restoreBackup = require('./restoreBackup.js');
const express = require('express');
const router = express.Router();

// API Requests For the DATABASE
router.use('/', getClasses);
router.use('/', getClassDetails);
router.use('/', restoreBackup); /* Includes:  
                                    - Full DB Restore from Backup (from .sql file ONLY)
                                    - Restore Table (from table_name.json file ONLY)
                                */

module.exports = router;