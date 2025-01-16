const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');
const env = require('dotenv').config().parsed;

// Function to fetch data from the Factorio API
function fetchLatestVersion() {
    return new Promise((resolve, reject) => {
        https.get('https://factorio.com/api/latest-releases', (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const latestVersion = json[env.BRANCH][env.SERVER_TYPE];
                    resolve(latestVersion);
                } catch (error) {
                    reject(new Error('Failed to parse API response'));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Function to read and parse the local info.json file
function readLocalVersion() {
    try {
        const fileContent = fs.readFileSync(env.FILE_PATH, 'utf8');
        const json = JSON.parse(fileContent);
        return json.version;
    } catch (error) {
        throw new Error(`Failed to read or parse info.json: ${error.message}`);
    }
}

// Function to run another Node.js script
function runScript(scriptPath) {
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Script error: ${stderr}`);
            return;
        }
        console.log(`Script output: ${stdout}`);
    });
}

(async () => {
    try {
        // Fetch latest version from the API
        const latestVersion = await fetchLatestVersion();
        console.log(`Latest ${env.BRANCH} version: ${latestVersion}`);

        // Get the local version from info.json
        const localVersion = readLocalVersion();
        console.log(`Local version: ${localVersion}`);

        // Compare versions
        if (localVersion === latestVersion) {
            console.log('The local version matches the latest version.');
        } else {
            console.log('The local version does not match the latest version.');
            const updateScriptPath = path.join(__dirname, env.SCRIPT_NAME); 
            //runScript(updateScriptPath);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
