const fs = require('fs').promises;
const backUpFile = require('./backupApp')


async function writeDataToFile(filename, data) {
    try {
        const jsonData = JSON.stringify(data);
        await backUpFile(filename);
        await fs.writeFile(filename, jsonData);
        console.log('Dane zostały zapisane do pliku');
    } catch (err) {
        console.error('Błąd podczas zapisywania do pliku: ', err);
    }
}

module.exports = writeDataToFile;