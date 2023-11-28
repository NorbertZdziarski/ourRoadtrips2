const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')
const multer = require('multer');
const cors = require('cors')
require('dotenv').config();

const manageData = require('./app_mongo')
const https = require("https");

const app = express();

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || '9000';
let dbName = process.env.DBNAME || 'ourRoadtrips2';

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

// ------------------------------------------------------------------------ USE
// app.use(cors());
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

app.use(express.static('images'));
app.use((req, res, next) => {
    console.log('check my-header')
    if (!req.headers['my-header']) {
        return res.status(400).send('error. Attempt to connect without required permissions');
    }
    next();
});

// ------------------------------------------------------------------------ upload
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        try {
            if (err instanceof multer.MulterError) {
                // Wystąpił błąd Multer podczas przesyłania.
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
    console.log(' download ')
    // const filePath = req.query.filepath;
    const filePath = req.query.filepath;
    const fileName = req.query.filename;
    console.log('nazwa pliku: ' + fileName)
    console.log('sciezka: ' + filePath)
    let fullPath = path.join(filePath.toString(), fileName.toString());
    console.log(typeof fullPath)
    console.log(fullPath)

    let file = path.join(__dirname, fullPath);

    console.log('file : ' + file)
    res.download(fullPath, function (err) {
        if (err) {
            console.log("Błąd podczas pobierania pliku: ", err);
            res.status(400).send("Błąd podczas pobierania pliku");
        } else {
            console.log("Plik został pomyślnie pobrany");
        }
    });
});
app.get('/:pathName', async (req, res) => {
    const pathName = req.params.pathName;
    const user = req.query.user;
    const password = req.query.password;
    console.log('114 pathname: ' + pathName)
    if (pathName === 'login') {
        console.log('app ____________');
        let userData;
        try {

            if (req.headers['my-header'] === 'all') {
                // userData = await manageData(dbName,'users','login',password, user)
                console.log(' alleluja ')
                // res.status(200).json(userData[0]);
                res.status(200).send('alleluja i do przodu');
            } else {
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            console.log('błąd: ' + err);
            res.status(500).send('1 Wystąpił błąd podczas pobierania danych: ' + err);
        }



    } else {
        let sendData;
        try {
            sendData = await manageData(dbName, pathName, 'get');
            if (req.headers['my-header'] === 'all') {
                res.status(200).json(sendData);
            } else {
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            console.log('błąd: ' + err);
            res.status(500).send('2 Wystąpił błąd podczas pobierania danych');
        }
    }
});

app.get('/userstrips/:idNr', async (req, res) => {
        console.log('151 get trips ')
    const id = req.params.idNr;
    let sendData;
    let filter = {tripUserId: id}
    try {
        sendData = await manageData(dbName, 'trips', 'get',id,filter);
        if (req.headers['my-header'] === 'all') {
            // res.status(200).json(sendData);
            res.status(200).json('ok');
        } else {
            res.status(400).send('Brak wymaganego nagłówka');
        }
    } catch (err) {
        console.log('błąd: ' + err);
        res.status(500).send('3 Wystąpił błąd podczas pobierania danych');
    }
})

app.get('/:inquiryType/:idNr', async (req, res) => {

    const pathName = req.params.inquiryType + 's';
    let filter = null;
    let id = req.params.idNr;
    console.log('174 get pathname: ' + pathName)
    let sendData;
    if (id === "allNicks") {
            console.log('--------------> allNicks')
        id = null;

        try {
            // sendData = await manageData(dbName, pathName, 'getNicks');
            if (req.headers['my-header'] === 'all') {
                // res.status(200).json(sendData);
                res.status(200).json('ok');
            } else {
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            console.log('błąd: ' + err);
            res.status(500).send('4 Wystąpił błąd podczas pobierania danych');
        }

    } else {

        try {
            sendData = await manageData(dbName, pathName, 'get', id, filter);
            if (req.headers['my-header'] === 'all') {
                res.status(200).json(sendData);
            } else {
                res.status(400).send('Brak wymaganego nagłówka');
            }
        } catch (err) {
            console.log('błąd: ' + err);
            res.status(500).send('5 Wystąpił błąd podczas pobierania danych');
        }
    }
});

// ------------------------------------------------------------------------ POST


app.use(bodyParser.json());
app.post('/:inquiryType/add', async (req, res) => {
    const pathName = req.params.inquiryType + 's';
    const newItem = await req.body;

    console.log(pathName)
    console.log(newItem)

    await manageData(dbName, pathName, 'post',newItem);


    res.status(200).send('Dodano nowy element do bazy danych');
});

// app.use(bodyParser.json());
app.post('/gle', async (req, res) => {
    console.log('---- Google ----')
    const inputData = await req.body;


    console.log('gle: ' + inputData)
    console.log('google id : ' + inputData.googleId)

    await manageData(dbName, 'users', 'googleId',null,inputData).then((r)=>{
        console.log('-------------- serverJS --- odpowiedz z mongo --')
        console.log(r)
        res.status(200).send(r);
    })
        .catch((err)=>{
            res.status(400).send(`błąd: ${err}`);
        });



});








// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ----------------------------------------------------------------------------------------- PATCH
// console.log('patch')
app.patch('/:inquiryType/:id', async (req, res) => {
    const id = req.params.id;
    const pathName = req.params.inquiryType + 's';
    const newItem = await req.body;
    await manageData(dbName, pathName, 'patch',newItem,id);
    res.send('Dane zostały zaktualizowane');
});
app.patch('/:inquiryType/comment/:id', async (req, res) => {
    const id = req.params.id;
    console.log('patch comment id: ' + id)
    const pathName = req.params.inquiryType + 's';
    // const idCom = req.params.idCom;
    let newItem = await req.body;
    // if (id.includes('/comment/')) {
    //     let parts = id.split('/comment/');
    //     let beforeComment = parts[0];
    //     let afterComment = parts[1];
    //     console.log(beforeComment); // wyświetla 'trip/${tripId}'
    //     console.log(afterComment);  // wyświetla '${comment._id}'}
    // }


    await manageData(dbName, pathName, 'patchComm',newItem,id);

    res.send('Dane zostały zaktualizowane');
});
app.patch('/:inquiryType/:id/commlike/:idCom', async (req, res) => {
    const id = req.params.id;
    console.log('----------------------comm like.');
    console.log(' id: ' + id)
    const pathName = req.params.inquiryType + 's';
    const idCom = req.params.idCom;
    const newItem = await req.body;
    // if (id.includes('/comment/')) {
    //     let parts = id.split('/comment/');
    //     let beforeComment = parts[0];
    //     let afterComment = parts[1];
    //     console.log(beforeComment); // wyświetla 'trip/${tripId}'
    //     console.log(afterComment);  // wyświetla '${comment._id}'}
    // }

    console.log('new item: ' + newItem);
    console.log('idCOm: ' + idCom);
    console.log('----------------------');

    await manageData(dbName, pathName, 'patchCommLike',newItem,id, idCom);
    res.send('Dane zostały zaktualizowane');
});
// ----------------------------------------------------------------------------------------- DELETE

app.delete('/file', async (req, res) => {
    console.log('============================= app.js')
    console.log('SERVER: komenda: delete File')
    const filename =  req.body.target;

    console.log('file name: ' + filename)
    try {
        fs.unlinkSync(filename);
        console.log('Plik został pomyślnie usunięty');
        res.status(200).send('Plik został pomyślnie usunięty');
    } catch (err) {
        console.error(`Wystąpił błąd podczas usuwania pliku: ${err}`);
        res.status(500).send(`Wystąpił błąd podczas usuwania pliku: ${err}`)
    }

});

app.delete('/:inquiryType/:idNr', async (req, res) => {
    const pathName = req.params.inquiryType + 's';
    const id = req.params.idNr;


    let sendData;
    try {
        sendData = await manageData(dbName, pathName, 'delete',id);
        if (req.headers['my-header'] === 'all') {
            res.status(200).json(sendData);
        } else {
            res.status(400).send('Brak wymaganego nagłówka');
        }
    } catch (err) {
        console.log('błąd: ' + err);
        res.status(500).send('6 Wystąpił błąd podczas pobierania danych');
    }
});



// const privateKey = fs.readFileSync('./private.key', 'utf8');
// const certificate = fs.readFileSync('./certificate.crt', 'utf8');
//
// const credentials = { key: privateKey, cert: certificate };
//
// // Utwórz serwer HTTPS
// const httpsServer = https.createServer(credentials, app);

// listen(3000, '10.25.32.19', () => {
//     console.log(`Serwer działa na https://10.25.32.19:${httpsServer.address().port}`);
// });


app.listen(port, host, () => {
    console.log(`ten serwer działa na https://${host}:${port}`);
});
