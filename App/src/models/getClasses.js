const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const options = require('../routes/router.js');

const baseURL = options.baseUrl;
const databaseConfig = options.databaseConfig;

router.get(`${baseURL}/getClasses`, async (req, res) => {
   const connection = mysql.createConnection(databaseConfig);

   const titleQuery = `SELECT
         cl.className, 
         cl.classDescription
      FROM class cl`;

         connection.query(titleQuery, (error, results) => {
            if (error) {
              throw error;
            } else {
              res.status(200).send(results);
            }
          });

   connection.end();
});

module.exports = router;