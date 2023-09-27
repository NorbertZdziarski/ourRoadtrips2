const express = require('express');
const server = express();


let channel = process.env.CHANNEL || '127.0.0.1:9003';


server.use((req, res, next) => {
    if (!req.headers['my-header']) {
        return res.status(400).send('Brak wymaganego nagłówka');
    }
    next();
});


server.get('/', (req, res) => {
    res.send('jest ok');
});


server.listen(channel, () => {
    console.log(`Serwer działa na ${channel}`);
});
