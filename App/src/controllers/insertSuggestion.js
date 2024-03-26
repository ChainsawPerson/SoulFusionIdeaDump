const express = require('express');
const router = express.Router();
const options = require('../routes/options.js');
const classJSON = 'C:/Users/takis/Documents/GitHub/SoulFusionIdeaDump/database/classSuggestions.json';
const fs = require('fs');
const bodyParser = require('body-parser');
const baseURL = options.baseUrl;
router.use(bodyParser());

router.post(`${baseURL}/suggestClass`, async (req, res) => {
    if(!req.body) {
        let errorMessage = options.responseErrorMessage;
        errorMessage.error.code = 400;
        errorMessage.error.message = "No body provided";
        res.send(400).json(errorMessage);
        return;
    }
    const suggestion = req.body;
    fs.readFile(classJSON, function (err, data) {
        var json = JSON.parse(data);
        json.push(suggestion);
        fs.writeFile(classJSON, JSON.stringify(json), function (error){
            if(err) {
                let errorMessage = options.responseErrorMessage;
                errorMessage.error.code = 500;
                errorMessage.error.message = "Unexpected Internal Error Occured";
                res.status(500).json(errorMessage);
                console.error(error);
                throw error;
            }
        });
    });
    let resultsMessage = options.responseResultMessage;
    resultsMessage.results.code = 201;
    resultsMessage.results.message = "Succesfully Inserted Suggestion";
    res.status(201).json(resultsMessage);
});

module.exports = router;