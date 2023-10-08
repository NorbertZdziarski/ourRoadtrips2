const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')
const multer = require('multer');
const cors = require('cors');

const manageData = require('./app_mongo')

const server = express();

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || '9000';
let dbName = process.env.DBNAME || 'ourRoadtrips2';



// ------------------------------------------------------------------------ MULTER - do wgrania plików
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const fileType = req.body.type;

        if ((fileType!=='users') && (fileType!=='trips')) {
            const error = new Error('błędna nazwa folderu (typ)');
            error.code = 'INCORRECT_FOLDER';
            return cb(error); }
        const subFolderName = req.body.folderName;
        const folderName = path.join(fileType,'images', subFolderName)

        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName,{recursive: true})
        }
        cb(null, folderName);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image');

// ------------------------------------------------------------------------ USE

server.use(cors());
server.use((req, res, next) => {
    if (!req.headers['my-header']) {
        return res.status(400).send('error. Attempt to connect without required permissions');
    }
    next();
});

// ------------------------------------------------------------------------ GET

server.get('/:pathName', async (req, res) => {
    const pathName = req.params.pathName;
    let sendData;
    try {
        sendData = await manageData(dbName, pathName, 'get');
        if (req.headers['my-header'] === 'all') {
            res.status(200).json(sendData);
        } else {
            res.status(400).send('Brak wymaganego nagłówka');
        }
    } catch (err) {
        console.log('błąd: ' + err);
        res.status(500).send('Wystąpił błąd podczas pobierania danych');
    }
});

server.get('/userstrips/:idNr', async (req,res) => {

    const id = req.params.idNr;
    let sendData;
    let filter = {tripUserId: id}
    try {
        sendData = await manageData(dbName, 'trips', 'get',id,filter);
        if (req.headers['my-header'] === 'all') {
            res.status(200).json(sendData);
        } else {
            res.status(400).send('Brak wymaganego nagłówka');
        }
    } catch (err) {
        console.log('błąd: ' + err);
        res.status(500).send('Wystąpił błąd podczas pobierania danych');
    }
})

server.get('/:inquiryType/:idNr', async (req, res) => {
    const pathName = req.params.inquiryType + 's';

    const id = req.params.idNr;
    let sendData;
    try {
        sendData = await manageData(dbName, pathName, 'get',id);
        if (req.headers['my-header'] === 'all') {
            res.status(200).json(sendData);
        } else {
            res.status(400).send('Brak wymaganego nagłówka');
        }
    } catch (err) {
        console.log('błąd: ' + err);
        res.status(500).send('Wystąpił błąd podczas pobierania danych');
    }
});

// ------------------------------------------------------------------------ POST
// server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post('/:inquiryType/add', async (req, res) => {
    const pathName = req.params.inquiryType + 's';
    const newItem = await req.body;
    await manageData(dbName, pathName, 'post',newItem);


    res.status(200).send('Dodano nowy element do bazy danych');
});




server.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        try {
            if (err instanceof multer.MulterError) {
                // Wystąpił błąd Multer podczas przesyłania.
                throw new Error(err.message);
            } else if (err && err.code === 'INCORRECT_FOLDER') {
                // Nasz niestandardowy błąd został zgłoszony.
                throw new Error(err.message);
            }
            res.send('Plik został przesłany');
        } catch (err) {
            res.status(400).send(err.message);
        }
    });
});
// ----------------------------------------------------------------------------------------- PATCH
server.patch('/:inquiryType/:id', async (req, res) => {
    const id = req.params.id;
    const pathName = req.params.inquiryType + 's';
    const newItem = await req.body;
    await manageData(dbName, pathName, 'patch',newItem,id);
    res.send('Dane zostały zaktualizowane');

});

// ----------------------------------------------------------------------------------------- DELETE

server.delete('/:inquiryType/:idNr', async (req, res) => {
    const pathName = req.params.inquiryType;
    const id = req.params.idNr;
    let sendData;
    try {
        sendData = await manageData(dbName, pathName, 'delete',id);
        if (req.headers['my-header'] === 'all') {
            res.status(200).json(sendData);
        } else {
            res.status(400).send('Brak wymaganego nagłówka');
        }
    } catch (err) {
        console.log('błąd: ' + err);
        res.status(500).send('Wystąpił błąd podczas pobierania danych');
    }
});



server.listen(port, host, () => {
    console.log(`Serwer działa na http://${host}:${port}`);
});
