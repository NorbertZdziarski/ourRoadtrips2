const express = require('express');
const saveLog = require("./savelog");
const manageData = require("../app_mongo");
const router = express.Router();
saveLog(` | -- app get -- |`,`app_get >`);
router.get('/all/:collectionname', async (req,res) => {
    const collectionName = req.params.collectionname;
    saveLog(`/all | get pathname: ${collectionName}`,`app_get >`);

    let sendData;

    try {
        saveLog(`14 get try - manageData _ nazwa kolekcji: ${collectionName}`,`app_get >`);
        sendData = await manageData(collectionName,'getall');

            saveLog(`42 | odpowiedz get/all dla ${collectionName} wynosi: \n \n  ${JSON.stringify(sendData)} \n `,`app_get >`)
            res.status(200).json(sendData);

    } catch (err) {
        saveLog(`49 |_ błąd:  ${err} | collection: ${collectionName} `,`app_get >`)
        res.status(500).send('Wystąpił błąd podczas pobierania danych _ get all');
    }

})

router.get('/login', async (req,res) => {

    const user = req.query.user;
    const password = req.query.password;
    saveLog(`/login | get user: ${user}`,`app_get >`);

    let userData;
    try {
            userData = await manageData('users','login',{password}, {user})
            saveLog(`35 } get/login _ response - user data: \n ${JSON.stringify(userData)}  \n`,`app_get >`)
            res.status(200).json(userData[0]);

    } catch (err) {
        saveLog(`29 | błąd:  ${err} `,`app_get >`)
        res.status(500).send('wystąpił błąd 1 podczas pobierania danych: ' + err);
    }


})
router.get('/one/:collectionname/:id', async (req,res) => {
    const collectionName = req.params.collectionName;
    const id = req.params.id;
    saveLog(`/one | collection name: ${collectionName} id: ${id}`,`app_get >`);
})
router.get('/select/:collectionname/:filter', async (req,res) => {
    const collectionName = req.params.collectionName;
    const filter = req.params.filter;
    saveLog(`/select | collection name: ${collectionName} filter: ${filter}`,`app_get >`);

})

router.get('/file/:collectionname/:id', async (req,res) => {
    const collectionName = req.params.collectionName;
    const id = req.params.id;
    saveLog(`/file | collection name: ${collectionName} id: ${id}`,`app_get >`);

})











router.get('/:collectionName', async (req, res) => {
    const collectionName = req.params.collectionName;
    const user = req.query.user;
    const password = req.query.password;
    saveLog(`12 | get pathname: ${collectionName}`,`app_get >`);


    if (collectionName === 'login') {



    } else {

    }
});












module.exports = router;