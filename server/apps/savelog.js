const path = require("path");
const fs  = require("fs");

function saveLog(infoToSave, komunikat = 'komunikat') {
    let logFilePath = path.join(__dirname, '../logi.txt');
    let newDate = new Date;

    let saveData = `${newDate} | ${komunikat}: ${infoToSave}`
    fs.appendFile(logFilePath, saveData + '\n', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Informacja została zapisana!');
    });
}

module.exports = saveLog;