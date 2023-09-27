const express = require('express');
const router = express.Router();


router.get('/users', (req, res) => {
    if (req.headers['my-header'] === 'all') {
        res.status(200).json(usersData);
    } else {
        res.status(400).send('Brak wymaganego nagłówka');
    }
});


router.get('/trips', (req, res) => {
    if (req.headers['my-header'] === 'all') {
        res.status(200).json(tripsArr);
    } else {
        res.status(400).send('Brak wymaganego nagłówka');
    }
});


router.get('/trip/:tripIdNr', (req, res) => {
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

module.exports = router;
