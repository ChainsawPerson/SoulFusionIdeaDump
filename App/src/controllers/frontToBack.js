const insertSuggestion = require('./insertSuggestion.js');
const express = require('express');
const router = express.Router();

router.use('/', insertSuggestion);
module.exports = router;