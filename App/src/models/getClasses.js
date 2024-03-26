const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const options = require('../routes/options.js');

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
              let errorMessage = options.responseErrorMessage;
              errorMessage.error.code = 500;
              errorMessage.error.message = "Unexpected Internal Error Occured";
              res.status(500).json(errorMessage);
              console.error(error);
              return;
            } else {
              res.status(200).send(results);
            }
          });

   connection.end();
});

module.exports = router;