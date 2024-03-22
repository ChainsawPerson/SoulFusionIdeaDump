const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const options = require('../routes/router.js');

const baseURL = options.baseUrl;
const databaseConfig = options.databaseConfig;

router.get(`${baseURL}/getClasses`, async (req, res) => {
   const connection = mysql.createConnection(databaseConfig);

   const titleQuery = `SELECT DISTINCT
         cl.className, 
         cl.classDescription, 
         ck.skillName,
         ck.skillDescription,
         ck.skillType,
         ck.skillBaseDamage,
         ck.skillBaseCost
      FROM class_skill_pairs
      INNER JOIN
         class cl
      ON
         class_skill_pairs.className = cl.className
      INNER JOIN
         skill ck
      ON
         class_skill_pairs.skillName = ck.skillName`;

         connection.query(titleQuery, (error, results) => {
            if (error) {
              throw error;
            } else {
              // Organize data into desired structure
              const data = {};
              results.forEach(row => {
                const { className, classDescription, skillName, skillDescription, skillType, skillBaseDamage, skillBaseCost } = row;
                if (!data[className]) {
                  data[className] = {
                    className: className,
                    classDescription: classDescription,
                    classSkillList: [{ skillName: skillName, skillDescription: skillDescription, skillType: skillType, skillBaseDamage: skillBaseDamage, skillBaseCost: skillBaseCost }]
                  };
                } else {
                  data[className].classSkillList.push({ skillName: skillName, skillDescription: skillDescription, skillType: skillType, skillBaseDamage: skillBaseDamage, skillBaseCost: skillBaseCost });
                }
              });
          
              // Convert data to array of objects
              const formattedData = Object.values(data);
          
              res.status(200).send(formattedData);
            }
          });

   connection.end();
});

module.exports = router;