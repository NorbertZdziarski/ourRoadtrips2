const express = require('express');
const saveLog = require("./savelog");
const manageData = require("../app_mongo");
const fs = require("fs");
const path = require("path")
const router = express.Router();
saveLog(` | -- app delete -- |`,`app_delete <`);

router.delete('/file', async (req, res) => {

    const path =  req.body.path;
    const filesnames =  req.body.filesnames;
    saveLog(`/file | path: ${path} - JSON ${JSON.stringify(path)}`,`app_delete <`);
    saveLog(`/file | delete filename:  ${filesnames} - ${filesnames.length} _ JSON ${JSON.stringify(filesnames)}`,`app_delete <`);
    // saveLog('file name: ' + filename,`app_delete <`)


    try {
        for (let i=0; i<filesnames.length; i++) {
            let filePath = path + filesnames[i];
            saveLog(`ścieżka: ${filePath}`, `app_delete <`)
            fs.unlinkSync(filePath);
            saveLog(`Plik ${filesnames[i]} został pomyślnie usunięty`, `app_delete <`);
        }
        res.status(200).send('Plik został pomyślnie usunięty');
    } catch (err) {
        saveLog(`Wystąpił błąd podczas usuwania pliku: ${err}`,`app_delete <`);
        res.status(500).send(`Wystąpił błąd podczas usuwania pliku: ${err}`)
    }

});

router.delete('/:inquiryType/:idNr', async (req, res) => {
    const pathName = req.params.inquiryType + 's';
    const id = req.params.idNr;

    saveLog(`/inquery | inquery ${pathName} JSON ${JSON.stringify(pathName)}   id: ${id}`,`app_delete <`);
    let sendData;
    try {
        sendData = await manageData( pathName, 'delete', id);
            res.status(200).json(sendData);
    } catch (err) {
        saveLog('błąd: ' + err,`app_delete <`);
        res.status(500).send('Wystąpił błąd nr 6 podczas pobierania danych');
    }
});

module.exports = router;