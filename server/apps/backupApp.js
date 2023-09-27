const fs = require('fs').promises;
const path = require('path');

async function backupFile(filename) {
    try {

        const data = await fs.readFile(filename, 'utf8');
        const dirPath = path.dirname(filename);
        const backupFilename = path.basename(filename, path.extname(filename)) + '.bak';
        const saveFile = path.join(dirPath, backupFilename)
        await fs.writeFile(saveFile, data);

        console.log(`Zawartość pliku ${filename} została zapisana w ${backupFilename}`);
    } catch (err) {
        console.error('Błąd podczas tworzenia kopii zapasowej pliku: ', err);
    }
}

module.exports = backupFile;
