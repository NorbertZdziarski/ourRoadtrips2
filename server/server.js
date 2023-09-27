const express = require('express');
const bodyParser = require('body-parser');
const readDataFromFile = require('./apps/takeData');
const writeDataToFile = require('./apps/saveData');
const idGenerator = require('./apps/idGenerator')
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
    newItem.id = idGenerator;

    usersData.users.push(newItem);
    writeDataToFile(filesPaths[0], usersData)

    res.status(200).send('Dodano nowy element do bazy danych');
});

server.listen(port, host, () => {
    console.log(`Serwer działa na http://${host}:${port}`);
});
