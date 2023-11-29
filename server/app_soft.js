const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')

const cors = require('cors')
require('dotenv').config();


const app = express();

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || '9000';

function saveLog(infoToSave) {
    let logFilePath = path.join(__dirname, 'logi.txt');
    let newDate = new Date;

    let saveData = `${newDate} | komunikat: ${infoToSave}`
    fs.appendFile(logFilePath, saveData + '\n', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Informacja została zapisana!');
    });
}

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
app.use('*', function (req, res, next) {
    saveLog(`Nieobsługiwane zapytanie`);
    console.log('linia 52')
    res.status(400).json({msg: 'Nieobsługiwane zapytanie'});
});

app.use((req, res, next) => {
    console.log('check my-header')
    saveLog('check my-header');
    if (!req.headers['my-header']) {
        return res.status(400).send('error. Attempt to connect without required permissions');
    }
    next();
});


app.listen(port, host, () => {
    saveLog(`uruchomiono serwer na https://${host}:${port}`)
    console.log(`Ten serwer działa na https://${host}:${port}`);
});
