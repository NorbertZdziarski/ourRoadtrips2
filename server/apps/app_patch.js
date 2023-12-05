const express = require('express');
const saveLog = require("./savelog");
const manageData = require("../app_mongo");
const router = express.Router();
saveLog(` | -- app patch -- |`,`app_patch >`);

// app.use(bodyParser.json());
// ----------------------------------------------------------------------------------------- PATCH

router.patch('/:inquiryType/:id', async (req, res) => {
    saveLog(`307 | -- app.patch -- `,`app_patch >`);
    const id = req.params.id;
    const pathName = req.params.inquiryType + 's';
    const newItem = await req.body;
    saveLog(`311 | action 'patch', path name: ${pathName} , newItem: ${newItem} - ${id}`,`app_patch >`);
    await manageData(pathName,'patch', newItem,id);
    res.send('Dane zostały zaktualizowane');
});
router.patch('/:inquiryType/comment/:id', async (req, res) => {
    const id = req.params.id;
    console.log('patch comment id: ' + id)
    const pathName = req.params.inquiryType + 's';
    // const idCom = req.params.idCom;
    let newItem = await req.body;
    // if (id.includes('/comment/')) {
    //     let parts = id.split('/comment/');
    //     let beforeComment = parts[0];
    //     let afterComment = parts[1];
    //     console.log(beforeComment); // wyświetla 'trip/${tripId}'
    //     console.log(afterComment);  // wyświetla '${comment._id}'}
    // }
    saveLog(`309 | komentarz ${pathName}`,`app_patch >`);

    await manageData(pathName,'patchComm',  newItem,id);

    res.send('Dane zostały zaktualizowane');
});
router.patch('/:inquiryType/:id/commlike/:idCom', async (req, res) => {
    const id = req.params.id;
    console.log('----------------------comm like.');
    console.log(' id: ' + id)
    const pathName = req.params.inquiryType + 's';
    const idCom = req.params.idCom;
    const newItem = await req.body;
    // if (id.includes('/comment/')) {
    //     let parts = id.split('/comment/');
    //     let beforeComment = parts[0];
    //     let afterComment = parts[1];
    //     console.log(beforeComment); // wyświetla 'trip/${tripId}'
    //     console.log(afterComment);  // wyświetla '${comment._id}'}
    // }
    saveLog(`329 | komentarz like ${pathName}`,`app_patch >`);
    console.log('new item: ' + newItem);
    console.log('idCOm: ' + idCom);
    console.log('----------------------');

    await manageData(pathName,'patch', 'patchCommLike',newItem,id, idCom);
    res.send('Dane zostały zaktualizowane');
});



module.exports = router;