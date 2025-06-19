const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const options = require('../routes/options.js');

const baseURL = options.baseUrl;
const databaseConfig = options.databaseConfig;

router.get(`${baseURL}/getPrimaryMagic/:MagicName`, async (req, res) => {
    if(!req.params.MagicName) {
        let errorMessage = options.responseErrorMessage;
        errorMessage.error.code = 400;
        errorMessage.error.message = "Did not provide parameter";
        res.status(400).json(errorMessage);
    }
  
    const connection = mysql.createConnection(databaseConfig);
  
    const magicQuery = `SELECT DISTINCT
          pm.primaryMagicName, 
          pm.primaryMagicDescription,
          sm.secondaryMagicName,
          sm.secondaryMagicDescription
        FROM primary_secondary_pairs pair
        INNER JOIN
          primaryMagic pm ON pair.primaryMagicName = pm.primaryMagicName
        INNER JOIN
          secondaryMagic sm ON pair.secondaryMagicName = sm.secondaryMagicName
        WHERE pm.primaryMagicName = ?`;
  
    connection.query(magicQuery, [req.params.MagicName], (error, results) => {
        if (error) {
          res.status(404).json(options.responseErrorMessage);
          return;
        } else {
          // Organize data into desired structure
            const data = {};
            results.forEach(row => {
              const { primaryMagicName, primaryMagicDescription, secondaryMagicName, secondaryMagicDescription} = row;
              if (!data[primaryMagicName]) {
                data[primaryMagicName] = {
                  primaryMagicName: primaryMagicName,
                  primaryMagicDescription: primaryMagicDescription,
                  secondaryMagicList: [{ secondaryMagicName: secondaryMagicName, secondaryMagicDescription: secondaryMagicDescription}]
                };
              } else {
                data[primaryMagicName].secondaryMagicList.push({ secondaryMagicName: secondaryMagicName, secondaryMagicDescription: secondaryMagicDescription});
              }
            });
        
            // Convert data to array of objects
            const formattedData = Object.values(data);
        
          res.status(200).send(formattedData);
        }
    });
  
    connection.end();
});

router.get(`${baseURL}/getSecondaryMagic`, async (req, res) => {
   const connection = mysql.createConnection(databaseConfig);

   const titleQuery = `SELECT
         sm.secondaryMagicName, 
         sm.secondaryMagicDescription,
         sm.secondaryMagicType
      FROM secondaryMagic sm`;

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