const fs = require('fs');
const path = require('path');

class JsonHandler {
    constructor(filePaths) {
        this.filePaths = filePaths;
        this.fileMap = {};

        for (const filePath of filePaths) {
            const base = path.basename(filePath); 
            this.fileMap[base] = filePath;
        }
    }

    fileExists(filePath) {
        try {
            return fs.existsSync(filePath);
        } catch (err) {
            console.error(`Error checking file existence: ${filePath}`, err);
            return false;
        }
    }

    readData(filePath) {
        if (!this.fileExists(filePath)) {
            console.warn(`File does not exist: ${filePath}`);
            return null;
        }

        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const parsed = JSON.parse(data);

            if (!parsed.names || !Array.isArray(parsed.names)) {
                console.warn(`Invalid structure in JSON file: ${filePath}. Expected a "names" array.`);
                return null;
            }

            return parsed;
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.error(`JSON parse error in file ${filePath}:`, error.message);
            } else {
                console.error(`Error reading file ${filePath}:`, error.message);
            }
            return null;
        }
    }

    getAllNames() {
        let allNames = [];

        for (const filePath of this.filePaths) {
            const data = this.readData(filePath);
            if (data && Array.isArray(data.names)) {
                allNames = allNames.concat(data.names);
            } else {
                console.warn(`Skipping file due to invalid or missing data: ${filePath}`);
            }
        }

        return allNames;
    }

    getNameByIndex(index) {
        const allNames = this.getAllNames();
        if (index < 0 || index >= allNames.length) {
            console.warn(`Index out of range: ${index}`);
            return null;
        }
        return allNames[index];
    }

    getNamesFromFile(filename) {
        const filePath = this.fileMap[filename];
        if (!filePath) {
            console.warn(`No file registered with name: ${filename}`);
            return null;
        }

        const data = this.readData(filePath);
        return data ? data.names : null;
    }
}

const jsonHandler = new JsonHandler([
    path.join(__dirname, 'names/csaladnevek.json'),
    path.join(__dirname, 'names/ferfinevek.json'),
    path.join(__dirname, 'names/noinevek.json')
]);

module.exports = jsonHandler;
