const express = require('express');
const saveLog = require("./savelog");
const manageData = require("../app_mongo");
const router = express.Router();

router.get('/:collectionName', async (req, res) => {
    const collectionName = req.params.collectionName;
    const user = req.query.user;
    const password = req.query.password;
    saveLog(`12 | get pathname: ${collectionName}`,`app_get >`);


    if (collectionName === 'login') {

        let userData;
        try {

            if (req.headers['my-header'] === 'all') {
                userData = await manageData('users','login',{password}, {user})
                saveLog(`23 }- response - user data: \n ${JSON.stringify(userData)}  \n`,`app_get >`)
                res.status(200).json(userData[0]);
            } else {
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            saveLog(`29 | błąd:  ${err} `,`app_get >`)
            res.status(500).send('wystąpił błąd 1 podczas pobierania danych: ' + err);
        }

    } else {
        let sendData;
        saveLog(`35 | zapytanie get do collection name: ${collectionName} `,`app_get >`)
        try {

            saveLog(`38 get try - manageData _ nazwa kolekcji: ${collectionName}`,`app_get >`);
            sendData = await manageData(collectionName,'getall');

            if (req.headers['my-header'] === 'all') {
                saveLog(`42 | odpowiedz get dla ${collectionName} wynosi: \n \n  ${JSON.stringify(sendData)} \n `,`app_get >`)
                res.status(200).json(sendData);
            } else {
                saveLog(`45 | błąd: Brak wymaganego nagłówka`,`app_get >`)
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            saveLog(`49 |_ błąd:  ${err} | pathname: ${collectionName} `,`app_get >`)
            res.status(500).send('Wystąpił 2 błąd podczas pobierania danych');
        }
    }
});












module.exports = router;