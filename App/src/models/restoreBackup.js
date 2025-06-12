const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const router = express.Router();
const options = require('../routes/options.js');
const baseURL = options.baseUrl;
const databaseConfig = options.databaseConfig;
const password = options.adminPassword; // Change admin Password in /routes/options.js
let authMessage = options.responseErrorMessage; // Authentication Error Message For Incorrect Password Usage
authMessage.error.code = 403;
authMessage.error.message = "Authentication Error: Incorrect Password";

const os = require('os');

let dumpFile = require('../routes/filepaths.js').soulfusionDatabasePath; // Path to the SQL dump file
const tableDir = require('../routes/filepaths.js').databasePath; // Path to the database directory

router.use(bodyParser());

router.post(`${baseURL}/admin/restoreBackup`, async (req, res) => {
    const isWindows = os.platform() === 'win32';
    const mysqlPath = isWindows ? 'G:/xampp/mysql/bin/mysql' : 'mysql'; // Adjust path for Windows or Linux
    exec(`${mysqlPath} -u ${databaseConfig.user} -h ${databaseConfig.host} ${databaseConfig.database} < ${dumpFile}`, (err, stdout, stderr) => {
        if(!(req.body.password === password)) { // Check for password
            res.status(403).json(authMessage);
            return;
        }
        if (err) { 
            console.error(`exec error: ${err}`); 
            let errorMessage = options.responseErrorMessage;
            errorMessage.error.code = 500;
            errorMessage.err.message = "Unexpected Internal Error: Could not Restore Backup";
            res.status(500).json(errorMessage);
            return; 
        }
        let resultsMessage = options.responseResultMessage;
        resultsMessage.results.code = 200;
        resultsMessage.results.message = "Database Restore Succesful";
        res.status(200).json(resultsMessage);
    });

});

router.post(`${baseURL}/admin/loadClass`, async (req, res) => {
    if(!(req.body.password === password)) {
        res.status(403).json(authMessage);
        return;
    }
    const connection = mysql.createConnection(databaseConfig);
    const jsonFile = require(tableDir + '/class.json');
    // Get JSON file path
    const Classes = jsonFile[2].data; // First 2 elements are metadata
    let data = [];
    for(let i in Classes) {
        data.push([Classes[i].className, Classes[i].classDescription]); // JSON -> Array
    }
    console.log(data);
    const classQuery = `INSERT INTO class VALUES ?
    ON DUPLICATE KEY UPDATE
    className = VALUES(className),
    classDescription = VALUES(classDescription)`;
    connection.query(classQuery,[data],(error, results) => {
        if(error) {
            let errorMessage = options.responseErrorMessage;
            errorMessage.error.code = 500;
            errorMessage.err.message = "Unexpected Internal Error Occured";
            res.status(500).json(errorMessage);
        } else {
            let resultsMessage = options.responseResultMessage;
            resultsMessage.results.code = 200;
            resultsMessage.results.message = "Insertion Succesful";
            res.status(200).json(resultsMessage);
        }
    });
    connection.end();
});

router.post(`${baseURL}/admin/loadSkill`, async (req, res) => {
    if(!(req.body.password === password)) {
        res.status(403).json(authMessage);
        return;
    }
    const connection = mysql.createConnection(databaseConfig);
    const jsonFile = require(tableDir + '/skill.json');
    const Skills = jsonFile[2].data;
    let data = [];
    for(let i in Skills) {
        data.push([Skills[i].skillName, Skills[i].skillDescription, Skills[i].skillType, Skills[i].skillBaseDamage, Skills[i].skillBaseCost]);
    }
    console.log(data);
    const skillQuery = `INSERT INTO skill VALUES ?
    ON DUPLICATE KEY UPDATE
    skillName = VALUES(skillName),
    skillDescription = VALUES(skillDescription),
    skillType = VALUES(skillType),
    skillBaseDamage = VALUES(skillBaseDamage),
    skillBaseCost = VALUES(skillBaseCost)`;
    connection.query(skillQuery,[data],(error, results) => {
        if(error) {
            let errorMessage = options.responseErrorMessage;
            errorMessage.error.code = 500;
            errorMessage.err.message = "Unexpected Internal Error Occured";
            res.status(500).json(errorMessage);
        } else {
            let resultsMessage = options.responseResultMessage;
            resultsMessage.results.code = 200;
            resultsMessage.results.message = "Insertion Succesful";
            res.status(200).json(resultsMessage);
        }
    });
    connection.end();
});

router.post(`${baseURL}/admin/loadPair`, async (req, res) => {
    if(!(req.body.password === password)) {
        res.status(403).json(authMessage);
        return;
    }
    const connection = mysql.createConnection(databaseConfig);
    const jsonFile = require(tableDir + '/class_skill_pairs.json');
    const Pairs = jsonFile[2].data;
    let data = [];
    for(let i in Pairs) {
        data.push([Pairs[i].pair_index, Pairs[i].className, Pairs[i].skillName]);
    }
    console.log(data);
    const pairQuery = `INSERT INTO class_skill_pairs VALUES ?
    ON DUPLICATE KEY UPDATE
    pair_index = VALUES(pair_index),
    className = VALUES(className),
    skillName = VALUES(skillName)`;
    connection.query(pairQuery,[data],(error, results) => {
        if(error) {
            let errorMessage = options.responseErrorMessage;
            errorMessage.error.code = 500;
            errorMessage.err.message = "Unexpected Internal Error Occured";
            res.status(500).json(errorMessage);
        } else {
            let resultsMessage = options.responseResultMessage;
            resultsMessage.results.code = 200;
            resultsMessage.results.message = "Insertion Succesful";
            res.status(200).json(resultsMessage);
        }
    });
    connection.end();
});

module.exports = router;