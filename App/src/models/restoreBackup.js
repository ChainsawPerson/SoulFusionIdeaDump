const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const router = express.Router();
const options = require('../routes/router.js');
const baseURL = options.baseUrl;
const databaseConfig = options.databaseConfig;

let dumpFile = 'C:/Users/takis/Documents/GitHub/SoulFusionIdeaDump/database/soulfusion.sql';

router.use(bodyParser());

router.post(`${baseURL}/admin/restoreBackup`, async (req, res) => {

    exec(`G:/xampp/mysql/bin/mysql -u ${databaseConfig.user} -h ${databaseConfig.host} ${databaseConfig.database} < ${dumpFile}`, (err, stdout, stderr) => {
        if(!(req.body.password === 'S.A.G.A.P.O')) { // Check for password
            res.status(403).json({"message":"Wrong password"});
            return;
        }
        if (err) { 
            console.error(`exec error: ${err}`); 
            res.status(500).json({"message":"Couldn't restore DB"});
            return; 
        }
        res.status(200).json({"message" : stdout});
    });

});

router.post(`${baseURL}/admin/loadClass`, async (req, res) => {
    if(!(req.body.password === 'S.A.G.A.P.O')) {
        res.status(403).json({"message":"Wrong password"});
        return;
    }
    const connection = mysql.createConnection(databaseConfig);
    const jsonFile = require('C:/Users/takis/Documents/GitHub/SoulFusionIdeaDump/database/class.json');
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
            res.status(500).json({"message":error.message});
        } else {
            res.status(200).json({"message":"Insertion complete"});
        }
    });
    connection.end();
});

router.post(`${baseURL}/admin/loadSkill`, async (req, res) => {
    if(!(req.body.password === 'S.A.G.A.P.O')) {
        res.status(403).json({"message":"Wrong password"});
        return;
    }
    const connection = mysql.createConnection(databaseConfig);
    const jsonFile = require('C:/Users/takis/Documents/GitHub/SoulFusionIdeaDump/database/skill.json');
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
            res.status(500).json({"message":error.message});
        } else {
            res.status(200).json({"message":"Insertion complete"});
        }
    });
    connection.end();
});

router.post(`${baseURL}/admin/loadPair`, async (req, res) => {
    if(!(req.body.password === 'S.A.G.A.P.O')) {
        res.status(403).json({"message":"Wrong password"});
        return;
    }
    const connection = mysql.createConnection(databaseConfig);
    const jsonFile = require('C:/Users/takis/Documents/GitHub/SoulFusionIdeaDump/database/class_skill_pairs.json');
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
            res.status(500).json({"message":error.message});
        } else {
            res.status(200).json({"message":"Insertion complete"});
        }
    });
    connection.end();
});

module.exports = router;