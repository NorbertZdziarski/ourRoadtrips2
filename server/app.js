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
        saveLog('check my-header',`app.js _ multer `);
        if ((fileType!=='users') && (fileType!=='trips')) {
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
        // const extension = path.extname(file.originalname);
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

// ------------------------------------------------------------------------ images
app.use(express.static('images'));
app.use((req, res, next) => {
    console.log('check my-header')
    saveLog('check my-header');
    if (!req.headers['my-header']) {
        saveLog(`74 | błąd: Brak wymaganego nagłówka`,`app.js >`)
        return res.status(400).send('error. Attempt to connect without required permissions');
    }
    next();
});

// ------------------------------------------------------------------------ zapytania

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


















app.use(appGet);

app.use(bodyParser.json());

app.use(appPost);









app.use('*', function (req, res, next) {
    saveLog(`| Nieobsługiwane zapytanie |`);

    res.status(400).json({msg: 'Nieobsługiwane zapytanie'});
});


app.listen(port, host, () => {
    saveLog(`new_v0847 -=-=-=-=-=-=-=-=-=- uruchomiono serwer na https://${host}:${port}`, ` :-) `);
    console.log(`new v0847 TEN serwer działa na https://${host}:${port}`);
});


