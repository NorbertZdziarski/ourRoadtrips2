const fs = require('fs').promises;

async function readDataFromFile(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        console.log(`poprawny odczyt pliku: ` + filename);
        return data;
    } catch (err) {
        console.error(`Błąd podczas odczytywania pliku: ${err}`);
    }
}

module.exports = readDataFromFile;