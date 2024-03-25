const express = require('express');
const router = express.Router();
const baseURL = require('../routes/router.js').baseUrl;
const classJSON = 'C:/Users/takis/Documents/GitHub/SoulFusionIdeaDump/database/classSuggestions.json';
const fs = require('fs');
const bodyParser = require('body-parser');

router.use(bodyParser());

router.post(`${baseURL}/suggestClass`, async (req, res) => {
    if(!req.body) {
        res.send(400).json({"message":"no suggestion made"});
        return;
    }
    const suggestion = req.body;
    fs.readFile(classJSON, function (err, data) {
        var json = JSON.parse(data);
        json.push(suggestion);
        fs.writeFile(classJSON, JSON.stringify(json), function (error){
            if(err) {
                res.status(500).json({"message":"problem in adding suggestion"});
                console.error(error);
                throw error;
            }
        });
    });

    res.status(200).json({"message":"suggestion added"});
});

module.exports = router;