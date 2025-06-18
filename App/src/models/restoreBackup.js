const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const os = require('os');
const router = express.Router();
const options = require('../routes/options.js');
const baseURL = options.baseUrl;
const databaseConfig = options.databaseConfig;
const password = options.adminPassword;
const authMessage = options.responseErrorMessage; // Authentication Error Message For Incorrect Password Usage
authMessage.error.code = 403;
authMessage.error.message = "Authentication Error: Incorrect Password";

const dumpFile = require('../routes/filepaths.js').soulfusionDatabasePath; // Path to the SQL dump file
const mysqlDumpPath = require('../routes/filepaths.js').databaseBackupPath; // Path to the MySQL dump file
const tableDir = require('../routes/filepaths.js').databasePath; // Path to the database directory

router.use(bodyParser.json()); // Use `json()` as the middleware for parsing JSON bodies


// Route to create a backup of the database
router.post(`${baseURL}/admin/createBackup`, async (req, res) => {
    if (req.body.password !== password) {
        return res.status(403).json({ error: { code: 403, message: "Authentication Error: Incorrect Password" } });
    }

    const isWindows = os.platform() === 'win32';
    const mysqldumpPath = isWindows 
        ? `C:/"Program Files"/"MariaDB 11.8"/bin/mysqldump` 
        : 'mysqldump'; // Adjust path for Windows or Linux

    // Construct the command to create a backup
    const backupCommand = `${mysqldumpPath} -u ${databaseConfig.user} -h ${databaseConfig.host} ${databaseConfig.database} -p${databaseConfig.password} > ${mysqlDumpPath}`;

    exec(backupCommand, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error creating backup: ${err}`);
            return res.status(500).json({ error: { code: 500, message: "Unexpected Internal Error: Could not create backup" } });
        }

        // Success response
        res.status(200).json({
            results: {
                code: 200,
                message: "Backup Created Successfully"
            }
        });
    });
});

module.exports = router;

// Function to handle MySQL queries using async/await
const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(databaseConfig);
        connection.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
        connection.end();
    });
};

// Route for restoring the database backup
router.post(`${baseURL}/admin/restoreBackup`, async (req, res) => {
    if (req.body.password !== password) {
        return res.status(403).json(authMessage); // Unauthorized
    }

    const isWindows = os.platform() === 'win32';
    const mysqlPath = isWindows ? `C:/"Program Files"/"MariaDB 11.8"/bin/mysql` : 'mysql'; // Adjust path for Windows or Linux

    exec(`${mysqlPath} -u ${databaseConfig.user} -h ${databaseConfig.host} ${databaseConfig.database} -p < ${dumpFile}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            let errorMessage = options.responseErrorMessage;
            errorMessage.error.code = 500;
            errorMessage.error.message = "Unexpected Internal Error: Could not Restore Backup";
            return res.status(500).json(errorMessage);
        }
        let resultsMessage = options.responseResultMessage;
        resultsMessage.results.code = 200;
        resultsMessage.results.message = "Database Restore Successful";
        res.status(200).json(resultsMessage);
    });
});

// Generic function to load data from JSON into a table
const loadDataIntoTable = async (filePath, tableName, columnNames, query) => {
    const jsonFile = require(filePath); // Load JSON file
    const data = jsonFile[2].data.map(item => columnNames.map(col => item[col])); // Transform JSON to the desired format

    const queryStr = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES ? 
                      ON DUPLICATE KEY UPDATE ${columnNames.map(col => `${col} = VALUES(${col})`).join(', ')}`;

    try {
        await executeQuery(queryStr, [data]);
        return { code: 200, message: `${tableName} Insertion Successful` };
    } catch (error) {
        console.error(error);
        return { code: 500, message: `Unexpected Internal Error Occurred in ${tableName}` };
    }
};

// Route for loading Classes
router.post(`${baseURL}/admin/loadClass`, async (req, res) => {
    if (req.body.password !== password) {
        return res.status(403).json(authMessage); // Unauthorized
    }

    const result = await loadDataIntoTable(
        `${tableDir}/class.json`,
        'class',
        ['className', 'classDescription']
    );

    res.status(result.code).json({ results: { code: result.code, message: result.message } });
});

// Route for loading Skills
router.post(`${baseURL}/admin/loadSkill`, async (req, res) => {
    if (req.body.password !== password) {
        return res.status(403).json(authMessage); // Unauthorized
    }

    const result = await loadDataIntoTable(
        `${tableDir}/skill.json`,
        'skill',
        ['skillName', 'skillDescription', 'skillType', 'skillBaseDamage', 'skillBaseCost']
    );

    res.status(result.code).json({ results: { code: result.code, message: result.message } });
});

// Route for loading Class-Skill Pairs
router.post(`${baseURL}/admin/loadPair`, async (req, res) => {
    if (req.body.password !== password) {
        return res.status(403).json(authMessage); // Unauthorized
    }

    const result = await loadDataIntoTable(
        `${tableDir}/class_skill_pairs.json`,
        'class_skill_pairs',
        ['pair_index', 'className', 'skillName']
    );

    res.status(result.code).json({ results: { code: result.code, message: result.message } });
});

// Route for loading Primary Magic
router.post(`${baseURL}/admin/loadPrimaryMagic`, async (req, res) => {
    if (req.body.password !== password) {
        return res.status(403).json(authMessage); // Unauthorized
    }

    const result = await loadDataIntoTable(
        `${tableDir}/primaryMagic.json`,
        'primaryMagic',
        ['primaryMagicName', 'primaryMagicDescription']
    );

    res.status(result.code).json({ results: { code: result.code, message: result.message } });
});

module.exports = router;
