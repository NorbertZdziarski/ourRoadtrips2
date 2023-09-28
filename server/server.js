const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')
const readDataFromFile = require('./apps/takeData');
const writeDataToFile = require('./apps/saveData');
const idGenerator = require('./apps/idGenerator')
const multer = require('multer');
// const routes = require('./apps/routes')

const server = express();

let tripsArr;
let usersData;

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || '9000';

const filesPaths = ['./users/database/users.db','./trips/database/trips.db']

for (let i=0; i<filesPaths.length; i++) {
    readDataFromFile(filesPaths[i])
        .then(data => {
            try {
                if (i === 0) usersData = JSON.parse(data);
                if (i === 1) tripsArr = JSON.parse(data);
            } catch (err) {
                console.error('Błąd podczas przetwarzania danych: ', err);
            }
        })
        .catch(err => {
            console.error('Błąd podczas odczytywania pliku: ', err);
        });
}
// ------------------------------------------------------------------------ MULTER - do wgrania plików
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const fileType = req.body.type;
        console.log(fileType)
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
server.use((req, res, next) => {
    if (!req.headers['my-header']) {
        return res.status(400).send('error. Attempt to connect without required permissions');
    }
    next();
});


// ------------------------------------------------------------------------ GET
server.get('/users', (req, res) => {
    if (req.headers['my-header'] === 'all') {
        res.status(200).json(usersData);
    } else {
        res.status(400).send('Brak wymaganego nagłówka');
    }
});


server.get('/trips', (req, res) => {
    if (req.headers['my-header'] === 'all') {
        res.status(200).json(tripsArr);
    } else {
        res.status(400).send('Brak wymaganego nagłówka');
    }
});


server.get('/trip/:tripIdNr', (req, res) => {
    if (req.headers['my-header'] === 'all') {

        const tripIdNr = req.params.tripIdNr;
        const trip = tripsArr.trips.find(trip => trip.tripId == tripIdNr);

        if (trip) {
            res.status(200).json(trip);
        } else {
            res.status(404).send('Nie znaleziono danych o podanym identyfikatorze');
        }
    } else {
        res.status(400).send('Brak wymaganego nagłówka');
    }
});

// ------------------------------------------------------------------------ POST
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/user/add', (req, res) => {
    const newItem = req.body;
    newItem.id = 'user' + idGenerator;

    usersData.users.push(newItem);
    writeDataToFile(filesPaths[0], usersData)

    res.status(200).send('Dodano nowy element do bazy danych');
});
server.post('/trip/add', (req, res) => {
    const newItem = req.body;
    const userId = req.body.userId;
    newItem.tripId = 'trip-' + userId + '-' + idGenerator;
    tripsArr.trips.push(newItem);
    writeDataToFile(filesPaths[1], tripsArr)

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
server.patch('/trip/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    let item = tripsArr.trips.find(trip => trip.tripId == id);

    if (item) {

        Object.assign(item, newData);  // Zaktualizuj element

        // console.log(JSON.stringify(item))
        writeDataToFile(filesPaths[1], tripsArr)

        res.send('Dane zostały zaktualizowane');

    } else {
        res.status(404).send('Nie znaleziono elementu o podanym ID');
    }
});

server.patch('/user/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    let item = usersData.users.find(user => user.id == id);

    if (item) {

        Object.assign(item, newData);
        writeDataToFile(filesPaths[0], usersData)

        res.send('Dane zostały zaktualizowane');

    } else {
        res.status(404).send('Nie znaleziono elementu o podanym ID');
    }
});


server.listen(port, host, () => {
    console.log(`Serwer działa na http://${host}:${port}`);
});
