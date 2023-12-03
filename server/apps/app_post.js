const express = require('express');
const saveLog = require("./savelog");
const manageData = require("../app_mongo");
const router = express.Router();

router.post('/:inquiryType/add', async (req, res) => {
       saveLog(`12 | -- app.post -- `,`app_post >`);
    const collectionName = req.params.inquiryType + 's';
    const newItem = await req.body;
    let filter = null;
       saveLog(`16 | action 'post', collection name: ${collectionName} , filter: ${filter} newItem: ${newItem}`,`app_post >`);
       saveLog(`17 | json:  \n newItem: ${JSON.stringify(newItem)}`);

    await manageData({collectionName},'post', newItem).then((r) => {
        saveLog(`20 | odpowiedz z zapisu: ${r} json: ${JSON.stringify(r)}`,`app_post >`);
    });

    res.status(200).send('Dodano nowy element do bazy danych');
});
router.post('/gle', async (req, res) => {

    const inputData = await req.body;
    let collectionName = 'users';

        saveLog(`25 | google: ${inputData} json: ${JSON.stringify(inputData)}`,`app_post >`);
    let googlefilter = JSON.stringify(inputData.googleId)

        saveLog(`28 | json google ID  ${googlefilter} `,`app_post >`);

    await manageData({collectionName},'googleId',{inputData}).then((r)=>{
        saveLog(`31 | google - mongo response:  ${r} `,`app_post >`);
        res.status(200).send(r);
    })
        .catch((err)=>{
                 saveLog(`35 | google - mongo error:  ${err} `,`app_post >`);
            res.status(400).send(`błąd: ${err}`);
        });
});



module.exports = router;