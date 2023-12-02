const  {MongoClient, ObjectId} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')
const multer = require('multer');
const cors = require('cors')
require('dotenv').config();

const manageData = require('./app_mongo')
const saveLog = require("./apps/savelog");

const app = express();

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || '9000';
// let dbName = process.env.DBNAME || 'ourRoadtrips2';

// ------------------------------------------------------------------------ MULTER - do wgrania plików



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const fileType = req.body.type;
        if ((fileType!=='users') && (fileType!=='trips')) {
            const error = new Error('błędna nazwa folderu (typ)');
            error.code = 'INCORRECT_FOLDER';
            return cb(error); }
        // const subFolderName = req.body.folderName;
        const folderName = path.join('images',fileType)

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName,{recursive: true})
        }
        cb(null, folderName);
    },
    filename: function(req, file, cb) {
        const fileName = req.body.filename;
        // const extension = path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage }).single('image');

// ------------------------------------------------------------------------ USE
// app.use(cors());
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['https://ourroadtrips.pl', 'https://www.ourroadtrips.pl'];
        if (allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.static('images'));
app.use((req, res, next) => {
    console.log('check my-header')
    saveLog('check my-header');
    if (!req.headers['my-header']) {
        return res.status(400).send('error. Attempt to connect without required permissions');
    }
    next();
});

// ---------------------------------------------- pobieramy wszystko

// saveLog(`77 | pobieramy wszystko`, 'APP - pobranie all');
// app.use(bodyParser.json());
app.get('/pobierzwszystko', async function (req, res) {
    saveLog(`80 }- pobierz async `,'async await FN --')
    try {

        let userData = await manageData('pobierzwszystko')
        saveLog(`84 }- response - user data: ${JSON.stringify(userData)} `)
        res.status(200).json(userData[0]);
    } catch (err) {
        saveLog(`87 }- error: ${err.message} `)
        res.status(400).send(err.message);
    }

    // collection.find({}).toArray((err, data) => {
    //     if (err) {
    //         saveLog(`105 | error pobierz wszystko: ${err} `);
    //         res.status(500).send(err);
    //     } else {
    //         saveLog(`108 | ok - pobierz wszystko `);
    //         res.status(200).send(data);
    //     }
    // });
});

saveLog(`102 }  `)









// ------------------------------------------------------------------------ upload
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        saveLog('116 | upload')
        try {
            if (err instanceof multer.MulterError) {
                throw new Error(err.message);
            } else if (err && err.code === 'INCORRECT_FOLDER') {

                throw new Error(err.message);
            }
            res.send('Plik został przesłany');
        } catch (err) {
            res.status(400).send(err.message);
        }
    });
});

// ------------------------------------------------------------------------ GET
app.get('/download', async function(req, res){
    const filePath = req.query.filepath;
    const fileName = req.query.filename;
        saveLog('download nazwa pliku: ' + fileName)
        saveLog('download sciezka: ' + filePath)
    let fullPath = path.join(filePath.toString(), fileName.toString());
        console.log(typeof fullPath)
        console.log(fullPath)
    saveLog('139 | fullpath : ' + fullPath)
    let file = path.join(__dirname, fullPath);

        saveLog('142 | file : ' + file)
    res.download(fullPath, function (err) {
        if (err) {
            saveLog(`145 | błąd podczas pobierania pliku:  ${err} `)
            res.status(400).send("Błąd podczas pobierania pliku");
        } else {
            console.log("Plik został pomyślnie pobrany");
        }
    });
});
app.get('/:collectionName', async (req, res) => {
    const collectionName = req.params.collectionName;
    const user = req.query.user;
    const password = req.query.password;
        console.log('114 pathname: ' + collectionName)
        saveLog(`157 | get pathname: ${collectionName}`);


    if (collectionName === 'login') {
         console.log('app ____________');
        let userData;
        try {

            if (req.headers['my-header'] === 'all') {
                userData = await manageData('users','login',{password}, {user})
                saveLog(`137 }- response - user data: ${JSON.stringify(userData)} `)
                res.status(200).json(userData[0]);
            } else {
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            saveLog(`157 | błąd:  ${err} `)
            res.status(500).send('wystąpił błąd 1 podczas pobierania danych: ' + err);
        }



    } else {
        let sendData;
        saveLog(`181 | zapytanie get do collection name: ${collectionName} `)
        try {
            // let collectionName = `ourRoadtrips_${pathName}`;
            saveLog(`184 get try - manageData _ nazwa kolekcji: ${collectionName}`);
            sendData = await manageData({collectionName},'get');
            if (req.headers['my-header'] === 'all') {
                saveLog(`185 | odpowiedz get dla ${collectionName} wynosi: ${JSON.stringify(sendData)} `)
                res.status(200).json(sendData);
            } else {
                saveLog(`188 | błąd: Brak wymaganego nagłówka`)
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            saveLog(`193 |_ błąd:  ${err} | pathname: ${collectionName} `)
            res.status(500).send('Wystąpił 2 błąd podczas pobierania danych');
        }
    }
});

app.get('/userstrips/:idNr', async (req, res) => {
        saveLog('200 | get trips ')
    const id = req.params.idNr;
    let sendData;
    saveLog(`203 | /userstrips/:idNr |  id: ${id} `)
    let filter = {tripUserId: id}
    try {
        sendData = await manageData( 'trips', 'get',{filter},{id});
        if (req.headers['my-header'] === 'all') {
            saveLog(`208 | ok - !!!!  wysyłanie sendData ${sendData} `)
            res.status(200).json(sendData);
        } else {
            res.status(400).send('Brak wymaganego nagłówka');
        }
    } catch (err) {
        saveLog(`193 | błąd:  ${err} `)
        res.status(500).send('Wystąpił błąd 3 podczas pobierania danych');
    }
})

app.get('/:inquiryType/:idNr', async (req, res) => {

    const pathName = req.params.inquiryType + 's';
    let filter = null;
    let id = req.params.idNr;
    let collectionName = `${pathName}`;
    saveLog(`204 get pathname: ${pathName} + ${id} + ${collectionName}`);
    let sendData;
    if (id === "allNicks") {
            saveLog('193 | --------------> allNicks')
        id = null;

        try {
            sendData = await manageData({collectionName},'get', pathName, 'getNicks');
            if (req.headers['my-header'] === 'all') {
                saveLog(`234 | response  ${JSON.stringify(sendData)} `)
                res.status(200).json(sendData);
                // res.status(200).json('ok');
            } else {
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            saveLog(`241 | błąd:  ${err} `)
            res.status(500).send('Wystąpił błąd nr 4 podczas pobierania danych');
        }

    } else {

        try {
            sendData = await manageData({collectionName},'get', pathName, filter, id);
            if (req.headers['my-header'] === 'all') {
                saveLog(`250 | response:  ${JSON.stringify(sendData)} `)
                res.status(200).json(sendData);
            } else {
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            saveLog(`255 | błąd:  ${err} `)
            res.status(500).send('Wystąpił błąd nr 5 podczas pobierania danych');
        }
    }
});

// ------------------------------------------------------------------------ POST


app.use(bodyParser.json());
app.post('/:inquiryType/add', async (req, res) => {
    saveLog(`266 | -- app.post -- `);
    const collectionName = req.params.inquiryType + 's';
    const newItem = await req.body;
    let filter = null;
    saveLog(`270 | action 'post', collection name: ${collectionName} , filter: ${filter} newItem: ${newItem}`);
    saveLog(`271 | json:  \n newItem: ${JSON.stringify(newItem)}`);
        console.log(newItem)

    // const toSave =



    // saveLog(`249 | nowy element  ${newItem} `);
    await manageData({collectionName},'post', newItem).then((r) => {
        saveLog(`275 | odpowiedz z zapisu: ${r} json: ${JSON.stringify(r)}`);
    });


    res.status(200).send('Dodano nowy element do bazy danych');
});

// app.use(bodyParser.json());
app.post('/gle', async (req, res) => {
    console.log('---- Google ----')
    const inputData = await req.body;
    let collectionName = 'users';

    // saveLog(`--{ 295 }-- | action 'post dodaj_obj', collection name: ${collectionName}  newItem: ${inputData}`);
    // saveLog(`--{ 296 }-- | json:  \n newItem: ${JSON.stringify(inputData)}`);
    // // console.log(newItem)
    //
    // // const toSave =
    //
    //
    //
    // // saveLog(`249 | nowy element  ${newItem} `);
    // await manageData({collectionName},'dodaj_obj', {inputData}).then((r) => {
    //     saveLog(`--{ 305 }-- | odpowiedz z zapisu: ${r} json: ${JSON.stringify(r)}`);
    // });


    // let toSave = {
    //     "_id": {
    //         "$oid": "65635d5450ce616667cdecf9"
    //     },
    //     "googleId": "101564691360516351529",
    //     "nick": "Norbert Zdziarski",
    //     "firstName": "Norbert Zdziarski",
    //     "lastName": "Zdziarski",
    //     "userPersonalComment": "",
    //     "email": "zdziarski.norbert@gmail.com",
    //     "userPhoto": "https://lh3.googleusercontent.com/a/ACg8ocJv3QGVb8o5g4l4KkWccRiuBzUdTtDuTkilkcihz8wIGA=s96-c",
    //     "userDescription": "",
    //     "dateOfAccountCreation": "2023-11-26T14:59:32.176Z",
    //     "cars": []
    // }
    // // await manageData({collectionName},'dodaj_obj',{toSave})
    // collectionName = 'ourRoadtrips_trips';
    // toSave = {
    //     "_id": {
    //         "$oid": "651c0b7c3bbfd6773c70a4f9"
    //     },
    //     "tripName": "Bieszczadzkie serpentyny :-)",
    //     "tripType": "recreation",
    //     "tripCar": [
    //         "Mazda 3",
    //         "3",
    //         "car"
    //     ],
    //     "tripUser": "Michał",
    //     "tripDate": "2023-10-03T12:39:24.156Z",
    //     "tripPhoto": "651fe6702b474d23c7d1b616trip1.jpg",
    //     "tripPublic": true,
    //     "tripDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     "tripRate": [
    //         {
    //             "rate": 5
    //         },
    //         {
    //             "rate": 3
    //         },
    //         {
    //             "rate": 5
    //         },
    //         {
    //             "rate": 3,
    //             "user": "loggedUser"
    //         },
    //         {
    //             "rate": 5,
    //             "user": "loggedUser"
    //         },
    //         {
    //             "rate": 5,
    //             "user": "loggedUser"
    //         },
    //         {
    //             "rate": 5
    //         },
    //         {
    //             "rate": 4,
    //             "user": "653a2d970e1f75c683dff59c"
    //         },
    //         {
    //             "rate": 4,
    //             "user": "653a6d9989c70b38caab23f6"
    //         }
    //     ],
    //     "tripComments": [
    //         {
    //             "commLike": [
    //                 "653a6d9989c70b38caab23f6",
    //                 "653a2d970e1f75c683dff59c"
    //             ],
    //             "id": 0
    //         },
    //         {
    //             "id": 1,
    //             "commTxt": "Ale Jazda",
    //             "commUser": "Maczo",
    //             "commUserId": "651fe6702b474d23c7d1b616",
    //             "commDate": "",
    //             "commLike": [
    //                 "654b8d927f5a71a5710327e8"
    //             ]
    //         },
    //         {
    //             "id": 2,
    //             "commTxt": "Gratki!",
    //             "commUser": "rom1",
    //             "commUserId": "653a6d9989c70b38caab23f6",
    //             "commDate": "2023-10-29T06:14:03.648Z",
    //             "commLike": [
    //                 "654b8d927f5a71a5710327e8",
    //                 "653a2d970e1f75c683dff59c",
    //                 "65397ef90e1f75c683dff59b"
    //             ]
    //         },
    //         {
    //             "id": 3,
    //             "commTxt": "Pięknie!",
    //             "commUser": "rom1",
    //             "commUserId": "653a6d9989c70b38caab23f6",
    //             "commDate": "2023-10-29T08:08:03.302Z",
    //             "commLike": [
    //                 "653a2d970e1f75c683dff59c",
    //                 "654b8d927f5a71a5710327e8"
    //             ]
    //         },
    //         {
    //             "id": 4,
    //             "commTxt": "zazdro!",
    //             "commUser": "st",
    //             "commUserId": "653a2d970e1f75c683dff59c",
    //             "commDate": "2023-10-29T08:09:50.006Z",
    //             "commLike": [
    //                 "654b8d927f5a71a5710327e8",
    //                 "65397ef90e1f75c683dff59b",
    //                 "653a2d970e1f75c683dff59c",
    //                 "654e1c379e454e4082ed6f65"
    //             ]
    //         },
    //         {
    //             "id": 5,
    //             "commTxt": "śliczna fura!",
    //             "commUser": "nozda",
    //             "commUserId": "654e04948a6e435278e9ae33",
    //             "commDate": "2023-11-10T13:58:33.238Z",
    //             "commLike": [
    //                 "65397ef90e1f75c683dff59b",
    //                 null
    //             ]
    //         },
    //         {
    //             "id": 6,
    //             "commTxt": "cool!",
    //             "commUser": "nozda",
    //             "commUserId": "654e371c9e454e4082ed6f6a",
    //             "commDate": "2023-11-10T14:04:18.103Z",
    //             "commLike": []
    //         },
    //         {
    //             "id": 7,
    //             "commTxt": "fsfdsfdsfds",
    //             "commUser": "nozda",
    //             "commUserId": "654e1c379e454e4082ed6f65",
    //             "commDate": "2023-11-10T14:06:53.203Z",
    //             "commLike": []
    //         }
    //     ],
    //     "tripUserId": "65397ef90e1f75c683dff59b",
    //     "tripCountry": "Poland",
    //     "commLike": [
    //         "",
    //         "653a6d9989c70b38caab23f6"
    //     ],
    //     "tripMap": "",
    //     "tripSaveDate": "2023-11-10T11:36:57.352Z"
    // };
    // await manageData({collectionName},'dodaj_obj',{toSave})

    saveLog(`286 | google: ${inputData} json: ${JSON.stringify(inputData)}`);
    // console.log('gle: ' + inputData)
    // console.log('google id : ' + inputData.googleId)
    let googlefilter = JSON.stringify(inputData.googleId)
    // let abcd = JSON.stringify(inputData)
    // saveLog(`287 | json google:  ${abcd} `);
    saveLog(`288 | json google ID  ${googlefilter} `);

    await manageData({collectionName},'googleId',{inputData}).then((r)=>{
        console.log('-------------- serverJS --- odpowiedz z mongo --' + r)
        saveLog(`292 | google - mongo response:  ${r} `);
        res.status(200).send(r);
    })
        .catch((err)=>{
            saveLog(`271 | google - mongo error:  ${err} `);
            res.status(400).send(`błąd: ${err}`);
        });


});








// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ----------------------------------------------------------------------------------------- PATCH
// console.log('patch')
app.patch('/:inquiryType/:id', async (req, res) => {
    saveLog(`307 | -- app.patch -- `);
    const id = req.params.id;
    const pathName = req.params.inquiryType + 's';
    const newItem = await req.body;
    saveLog(`311 | action 'patch', path name: ${pathName} , newItem: ${newItem} - ${id}`);
    await manageData('patch',{pathName}, {newItem},{id});
    res.send('Dane zostały zaktualizowane');
});
app.patch('/:inquiryType/comment/:id', async (req, res) => {
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
    saveLog(`309 | komentarz ${pathName}`);

    await manageData('patchComm', {pathName}, {newItem},{id});

    res.send('Dane zostały zaktualizowane');
});
app.patch('/:inquiryType/:id/commlike/:idCom', async (req, res) => {
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
    saveLog(`329 | komentarz like ${pathName}`);
    console.log('new item: ' + newItem);
    console.log('idCOm: ' + idCom);
    console.log('----------------------');

    await manageData('patch',pathName, 'patchCommLike',newItem,id, idCom);
    res.send('Dane zostały zaktualizowane');
});
// ----------------------------------------------------------------------------------------- DELETE

app.delete('/file', async (req, res) => {
    console.log('============================= app.js')
    console.log('SERVER: komenda: delete File')
    const filename =  req.body.target;
    saveLog(`343 | delete ${filename}`);
    console.log('file name: ' + filename)
    try {
        fs.unlinkSync(filename);
        console.log('Plik został pomyślnie usunięty');
        res.status(200).send('Plik został pomyślnie usunięty');
    } catch (err) {
        console.error(`Wystąpił błąd podczas usuwania pliku: ${err}`);
        res.status(500).send(`Wystąpił błąd podczas usuwania pliku: ${err}`)
    }

});

app.delete('/:inquiryType/:idNr', async (req, res) => {
    const pathName = req.params.inquiryType + 's';
    const id = req.params.idNr;

    saveLog(`557 | delete do naprawy!!!!!!!!!!!!!!!!`);
    let sendData;
    try {
        sendData = await manageData('ourRoadtrips_tttttttt', {pathName}, 'delete', {id});
        if (req.headers['my-header'] === 'all') {
            res.status(200).json(sendData);
        } else {
            res.status(400).send('Brak wymaganego nagłówka');
        }
    } catch (err) {
        console.log('błąd: ' + err);
        res.status(500).send('Wystąpił błąd nr 6 podczas pobierania danych');
    }
});
app.use('*', function (req, res, next) {
    saveLog(`375 | Nieobsługiwane zapytanie`);

    res.status(400).json({msg: 'Nieobsługiwane zapytanie'});
});


app.listen(port, host, () => {
    saveLog(`v0854 -=-=-=-=-=-=-=-=-=- uruchomiono serwer na https://${host}:${port}`, ` :-) `);
    console.log(`v0854 TEN serwer działa na https://${host}:${port}`);
});


