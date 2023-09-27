const express = require('express');
const readDataFromFile = require('./apps/app_takeData');

const server = express();

let tripsArr;
let usersData;
readDataFromFile('./users/database/users.db')
    .then(data => {
        try {
            usersData = JSON.parse(data);
        } catch (err) {
            console.error('Błąd podczas przetwarzania danych: ', err);
        }
    })
    .catch(err => {
        console.error('Błąd podczas odczytywania pliku: ', err);
    });
readDataFromFile('./trips/database/trips.db')
    .then(data => {
        tripsArr = JSON.parse(data);
    });

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || '9000';



server.use((req, res, next) => {
    if (!req.headers['my-header']) {
        return res.status(400).send('error. Attempt to connect without required permissions');
    }
    next();
});



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



server.listen(port, host, () => {
    console.log(`Serwer działa na http://${host}:${port}`);
});
