const fs = require('fs');
const path = require('path');

class JsonHandler {
    constructor(filePaths) {
        this.filePaths = filePaths;
    }

    readData(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading JSON file ${filePath}:`, error);
            return null;
        }
    }

    getAllNames() {
        let allNames = [];
        for (const filePath of this.filePaths) {
            const data = this.readData(filePath);
            if (data && data.names && Array.isArray(data.names)) {
                allNames = allNames.concat(...data.names);
            }
        }
        return allNames;
    }

    getNameByIndex(index) {
        const allNames = this.getAllNames();
        if (allNames && index >= 0 && index < allNames.length) {
            return allNames[index];
        }
        return null;
    }
}

const jsonHandler = new JsonHandler([
    path.join(__dirname, 'names/csaladnevek.json'),
    path.join(__dirname, 'names/ferfinevek.json'),
    path.join(__dirname, 'names/noinevek.json')
]);

module.exports = jsonHandler;