const express = require('express');
const saveLog = require("./savelog");
const manageData = require("../app_mongo");
const router = express.Router();
// saveLog(` | -- app get -- |`,`app_get >`);
router.get('/all/:collectionname', async (req,res) => {
    const collectionName = req.params.collectionname;
    // saveLog(`/all | get pathname: ${collectionName}`,`app_get >`);

    let sendData;

    try {
        // saveLog(`14 get try - manageData _ nazwa kolekcji: ${collectionName}`,`app_get >`);
        sendData = await manageData(collectionName,'getall');

            // saveLog(`42 | odpowiedz get/all dla ${collectionName} wynosi: \n \n  ${JSON.stringify(sendData)} \n `,`app_get >`)
            res.status(200).json(sendData);

    } catch (err) {
        saveLog(`49 |_ błąd:  ${err} | collection: ${collectionName} `,`app_get >`)
        res.status(500).send('Wystąpił błąd podczas pobierania danych _ get all');
    }

})

router.get('/login', async (req,res) => {

    const user = req.query.user;
    const password = req.query.password;
    // saveLog(`/login | get user: ${user}`, `app_get >`);

    let userData;
    try {
        userData = await manageData('users', 'login', {password}, {user})
        // saveLog(`35 } get/login _ response - user data: \n ${JSON.stringify(userData)}  \n`, `app_get >`)
        res.status(200).json(userData[0]);

    } catch (err) {
        saveLog(`29 | błąd:  ${err} `, `app_get >`)
        res.status(500).send('wystąpił błąd 1 podczas pobierania danych: ' + err);
    }
})
// ----------------------------------------

    // app.use(bodyParser.json());
// router.post('/gle', async (req, res) => {
//         saveLog('---- Google ----')
//         const inputData = await req.body;
//         let collectionName = 'users';
//
//         saveLog(`286 | google: ${inputData} json: ${JSON.stringify(inputData)}`);
//         // console.log('gle: ' + inputData)
//         // console.log('google id : ' + inputData.googleId)
//         let googlefilter = JSON.stringify(inputData.googleId)
//         // let abcd = JSON.stringify(inputData)
//         // saveLog(`287 | json google:  ${abcd} `);
//         saveLog(`288 | json google ID  ${googlefilter} `);
//
//         await manageData(collectionName,'googleId',inputData).then((r)=>{
//             console.log('-------------- serverJS --- odpowiedz z mongo --' + r)
//             saveLog(`292 | google - mongo response:  ${r} `);
//             res.status(200).send(r);
//         })
//
//
//     // ----------------------------------
//
// })
router.get('/one/:collectionname/:id', async (req,res) => {
    const cn = req.params.collectionname;
    const id = req.params.id;
    const collectionName = `${cn}s`
    // saveLog(`/one | collection name: ${collectionName} id: ${id}`,`app_get >`);

    let sendData = await manageData(collectionName,'getone', id);
    try {
        // saveLog(`250 | response:  ${JSON.stringify(sendData)} `)
        res.status(200).json(sendData);

    } catch (err) {
        saveLog(`255 | błąd:  ${err} `)
        res.status(500).send(`Wystąpił błąd podczas pobierania danych one -> ${collectionName} id: ${id}`);
    }


})
router.get('/select/:collectionname/:filter', async (req,res) => {
    const collectionName = req.params.collectionname;
    const id = req.params.filter;
    let filter;
    if (id === "downloaduserlist") {
        filter = { "status": "public" },
            {
                "_id": 1,
                "nick": 1,
                "userPhoto": 1,
                "groups": 1
            }
    } else {filter = {userId: id}}

    // const id = req.params.idNr;

    // saveLog(`203 | /userstrips/:idNr |  id: ${id} `)


    saveLog(`/select | collection name: ${collectionName} filter: ${filter}`,`app_get >`);
    try {
        let sendData = await manageData( collectionName, 'get',null,filter);
        // saveLog(`/select | sendData: ${sendData} JSON: ${JSON.stringify(sendData)}`,`app_get >`);
        res.status(200).json(sendData);

    } catch (err) {
        saveLog(`193 | błąd:  ${err} `)
        res.status(500).send('Wystąpił błąd 3 podczas pobierania danych');
    }


})

router.get('/file/:collectionname/:id', async (req,res) => {
    const collectionName = req.params.collectionname;
    const id = req.params.id;
    // saveLog(`/file | collection name: ${collectionName} id: ${id}`,`app_get >`);

})


router.get('/:collectionName', async (req, res) => {
    const collectionName = req.params.collectionName;
    const user = req.query.user;
    const password = req.query.password;
    // saveLog(`12 | get pathname: ${collectionName}`,`app_get >`);


    if (collectionName === 'login') {



    } else {

    }
});












module.exports = router;






//
//
// const collectionName = req.params.collectionName;
// const user = req.query.user;
// const password = req.query.password;
// console.log('114 pathname: ' + collectionName)
// saveLog(`157 | get pathname: ${collectionName}`);
//
//
// if (collectionName === 'login') {
//     console.log('app ____________');
//     let userData;
//     try {
//
//         if (req.headers['my-header'] === 'all') {
//             userData = await manageData('users','login',{password}, {user})
//             saveLog(`137 }- response - user data: ${JSON.stringify(userData)} `)
//             res.status(200).json(userData[0]);
//         } else {
//             res.status(400).send('Brak wymaganego nagłówka');
//         }
//     } catch (err) {
//         saveLog(`157 | błąd:  ${err} `)
//         res.status(500).send('wystąpił błąd 1 podczas pobierania danych: ' + err);
//     }
