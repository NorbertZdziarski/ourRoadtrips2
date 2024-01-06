const express = require('express');
const saveLog = require("./savelog");
const manageData = require("../app_mongo");
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const router = express.Router();

saveLog(`10 || -- app.post -- || ---- 231209_1209`,`app_post >`);



// router.use(bodyParser.json());
router.post('/glephoto', async (req,res) => {
    saveLog(`| 16 | -- app.post -- gle photo `,`app_post >`);
    const newdata = req.body;
    const sourceUrl = req.body.sourceUrl;
    const targetPath = req.body.targetPath;
    saveLog(`| 20 | pobrane dane: \n body: ${newdata} \n json: ${JSON.stringify(newdata)}`,`app_post >`);
    saveLog(`| 21 | pobrane dane: \n source: ${sourceUrl} \n target: ${targetPath}`,`app_post >`);
    https.get(sourceUrl, (response) => {

        const fileStream = fs.createWriteStream(targetPath);
        response.pipe(fileStream);
        // saveLog(`24 | filestream: \n  ${fileStream} `,`app_post >`);
        fileStream.on('finish', () => {
            fileStream.close();
            res.send('Pobrano i zapisano obraz!');
        });
    }).on('error', (err) => {
        console.error('Błąd podczas pobierania obrazu: ', err.message);
        saveLog('Błąd podczas pobierania obrazu: ' + err.message,`app_post >`);
        res.status(500).send('Błąd podczas pobierania obrazu');
    });

})

router.post('/gle', async (req, res) => {
    saveLog(`26 | -- app.post -- /GLE `,`app_post >`);
    const inputData = await req.body;
    let collectionName = 'users';

    saveLog(`25 | google: ${inputData} json: ${JSON.stringify(inputData)}`,`app_post >`);
    let googlefilter = JSON.stringify(inputData.googleId)

    saveLog(`28 | json google ID  ${googlefilter} `,`app_post >`);

    await manageData(collectionName,'googleId',inputData).then((r)=>{
        saveLog(`31 | google - mongo response:  ${r} `,`app_post >`);
        res.status(200).send(r);
    })
        .catch((err)=>{
            saveLog(`35 | google - mongo error:  ${err} `,`app_post >`);
            res.status(400).send(`błąd: ${err}`);
        });
});

router.post('/:inquiryType/:what', async (req, res) => {
       saveLog(`9 | -- app.post -- / /add `,`app_post >`);
    const collectionName = req.params.inquiryType + 's';
    const whatToDo = req.params.what;
    const newItem = await req.body;
    let filter = null;
    saveLog(`65 | action 'post', collection name: ${collectionName} ,whatToDo ${whatToDo}, filter: ${filter} newItem: ${newItem}`,`app_post >`);
    if (whatToDo === 'add') {
       saveLog(`67 | json:  \n newItem: ${JSON.stringify(newItem)}`);
    await manageData(collectionName,'post', newItem).then((result) => {
        saveLog(`69 | odpowiedz z zapisu: ${result} json: ${JSON.stringify(result)}`,`app_post >`);
        res.status(200).send({message: 'Dodano nowy element do bazy danych', id: result});
    });
    } else {
        saveLog(`72 | ----`);
        await manageData(collectionName,'postlikeget', newItem).then((result) => {
            saveLog(`74 | odpowiedz z POST: ${result} json: ${JSON.stringify(result)}`,`app_post >`);
            res.status(200).send({message: 'wszystko ok', id: result});
    });
    }
});

// router.post('/:inquiryType/add', async (req, res) => {
//     saveLog(`12 | -- app.post -- `,`app_post >`);
//     const collectionName = req.params.inquiryType + 's';
//     const newItem = await req.body;
//     let filter = null;
//     let photoLink;
//     // saveLog(`12 | action 'post', \n collection name: ${collectionName} , filter: ${filter} newItem: ${newItem} link ${collectionName.userPhoto}`,`app_post >`);
//     // saveLog(`13 | json:  \n newItem: ${JSON.stringify(newItem)}`,`app_post >`);
//     // if (collectionName.userPhoto) {photoLink = collectionName.userPhoto.slice(0,5)}
//     saveLog(`15 | photo link: ${photoLink.length} ${photoLink}`,`app_post >`);
//     // if (photoLink!=='images')
//     await manageData(collectionName,'post', newItem).then((r) => {
//         saveLog(`20 | odpowiedz z zapisu: ${r} json: ${JSON.stringify(r)}`,`app_post >`);
//     });
//
//     res.status(200).send('Dodano nowy element do bazy danych');
// });

module.exports = router;