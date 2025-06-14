const os = require('os');
const path = require('path');

// Define the base path for the SoulFusionIdeaDump project
const basePath = os.platform() === 'win32' ? path.join('C:', 'Users', 'takis', 'Documents', 'GitHub', 'SoulFusionIdeaDump') :
    path.join(os.homedir(), 'Documents', 'SoulFusionIdeaDump');
const databasePath = path.join(basePath, 'database');

// Define paths for various JSON and SQL files in the database
const classSuggestionsPath = path.join(databasePath, 'classSuggestions.json');
const soulfusionDatabasePath = path.join(databasePath, 'soulfusion.sql');
const databaseBackupPath = path.join(databasePath, 'backup.sql');

// Export the paths as a module
module.exports = {
    databasePath: databasePath,
    classSuggestionsPath: classSuggestionsPath,
    soulfusionDatabasePath: soulfusionDatabasePath,
    databaseBackupPath: databaseBackupPath
}