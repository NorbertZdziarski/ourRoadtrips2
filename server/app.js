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
        return res.status(400).send('error. Attempt to connect without required permissions');
    }
    next();
});

// ------------------------------------------------------------------------ zapytania


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


