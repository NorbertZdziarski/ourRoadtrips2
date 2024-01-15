const  {MongoClient, ObjectId} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')
const multer = require('multer');
const cors = require('cors')
require('dotenv').config();

const appGet = require('./apps/app_get');
const appPost = require('./apps/app_post');
const appPatch = require('./apps/app_patch');
const appDelete = require('./apps/app_delete');

const saveLog = require("./apps/savelog");

const app = express();

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || '9000';
// let dbName = process.env.DBNAME || 'ourRoadtrips2';

// ------------------------------------------------------------------------ MULTER - do wgrania plików

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const fileType = req.body.type;
        if ((fileType!=='users') && (fileType!=='trips')  && (fileType!=='cars') && (fileType!=='groups')) {
            const error = new Error('błędna nazwa folderu (typ)');
            error.code = 'INCORRECT_FOLDER';
            saveLog(`błąd ${error}`,`app.js _ multer `);
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
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage }).single('image');

// ------------------------------------------------------------------------ CORS

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

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// ------------------------------------------------------------------------ images
app.use(express.static('images'));
app.use((req, res, next) => {
    if (!req.headers['my-header']) {
        return res.status(400).send('error. Attempt to connect without required permissions');
    }
    next();
});

// ------------------------------------------------------------------------ zapytania

app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        try {
            if (err instanceof multer.MulterError) {
                saveLog(`88 error upload _ MulterError -> ${err.message}`)
                throw new Error(err.message);
            } else if (err && err.code === 'INCORRECT_FOLDER') {
                saveLog(`91 error upload _ INCORRECT_FOLDER -> ${err.message}`)
                throw new Error(err.message);
            }
            saveLog(`94 | Plik został przesłany`)
            res.send('Plik został przesłany');
        } catch (err) {
            saveLog(`96 error upload _ 400 -> ${err.message}`)
            res.status(400).send(err.message);
        }
    });
});

// ------------------------------------------------------------------------ GET
app.get('/download', async function(req, res){
    const filePath = req.query.filepath;
    const fileName = req.query.filename;
    let fullPath = path.join(filePath.toString(), fileName.toString());
    let file = path.join(__dirname, fullPath);
    res.download(fullPath, function (err) {
        if (err) {
            saveLog(`145 | błąd podczas pobierania pliku:  ${err} `)
            res.status(400).send("Błąd podczas pobierania pliku");
        } else {
            console.log("Plik został pomyślnie pobrany");
        }
    });
});


app.use(appGet);
app.use(bodyParser.json());

app.use(appPost);
app.use(appPatch)
app.use(appDelete);


app.use('*', function (req, res, next) {
    saveLog(`| Nieobsługiwane zapytanie | Typ zapytania: ${req.method} | Ścieżka: ${req.path}`);

    res.status(400).json({msg: 'Nieobsługiwane zapytanie'});
});



app.listen(port, host, () => {
    saveLog(`}=-=-=-=-=-=-=-=-=-=- uruchomiono serwer na https://${host}:${port}`, `${new Date()}`);
    console.log(`${new Date()} TEN serwer działa na https://${host}:${port}`);
});


