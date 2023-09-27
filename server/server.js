const express = require('express');
const server = express();

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || '9000';

server.use((req, res, next) => {
    if (!req.headers['my-header']) {
        return res.status(400).send('Brak wymaganego nagłówka');
    }
    next();
});

server.get('/', (req, res) => {
    res.send('jest ok');
});

server.listen(port, host, () => {
    console.log(`Serwer działa na http://${host}:${port}`);
});
