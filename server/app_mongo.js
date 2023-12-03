const  {MongoClient, ObjectId} = require('mongodb');
const path = require("path");
const fs = require("fs");
const saveLog = require("./apps/savelog");
require('dotenv').config();

async function manageData(collectionName, action, data) {
    saveLog(`8 | uruchomiono app_mongo`, 'app_mongo');
    const dbName = process.env.DBNAME || 'ourRoadtrips2';
    const url = process.env.DBFULLPATH || 'mongodb://127.0.0.1:27017';

    // const collectionName = 'ourRoadtrips'
    const client = await MongoClient.connect(url);
    // let idComString;
    // let idCom = parseInt(idComString);
    // saveLog(`\n \n data: ${data} \n `,`app_mongo`)
    saveLog(`\n \n--23-12-03_0940--------------- APP MONGO  \n -- manage data --\n collection Name: ${collectionName} \n action: ${action} \n \ndata:  ${data} \n data JSON: ${JSON.stringify(data)} \n  `, 'app_mongo')


    try {
        // await client.connect();
        saveLog(`25 | - try -`, 'app_mongo');
        const db = client.db(dbName);
        saveLog(`29 | ${db}`, 'app_mongo');
        const collection = db.collection(collectionName);
        let dataDB;
        saveLog(`32 | ${collection}`, 'app_mongo');
        saveLog(`42 | nazwa kolekcji: ${collectionName} , JSON ${JSON.stringify(collectionName)}`, 'app_mongo');
        saveLog(`43 | action: ${action}`, 'app_mongo');

    if (action === 'getall') {
        dataDB = await collection.find().toArray();
        await client.close();
        saveLog(`40 | pobieranie typu get_all | uzyskane dane: ${dataDB}  `,`app_mongo`)
        return dataDB;


    } else if (action === 'dodaj_obj') {
            saveLog(` /// dodaj obj`, 'app_mongo');
            await collection.insertOne({data}, function (err,res) {
                if (err) { saveLog(` /// BŁĄD: ${err}`, 'app_mongo');}
                client.close();
            });
        }

        if (action === 'delete') {
            await collection.deleteOne({_id: new ObjectId(data)});
            await client.close();


        // }
        // } else if (action === 'googleId') {
        //         // console.log('-{ mongo: poszukiwanie po googleID }-')
        //         // console.log('-{ filter: ' + filter + ' }-')
        //     saveLog(`84 | filter: ${filter}`, 'app_mongo')
        //     dataDB = await collection.findOne(data)
        //     // await collection.insertOne(data);
        //     await client.close();
        //     if (!dataDB) {
        //         saveLog(`100 | zwrot - noUser`, 'app_mongo')
        //         return 'noUser';
        //     }
        //     saveLog(`103 | zwrot ${dataDB}`, 'app_mongo')
        //     return dataDB;
        //
        // } else if (data && action === 'post') {
        //     await collection.insertOne(data);
        //     await client.close();
        // } else if (action === 'login') {
        // dataDB = await collection.find({nick: filter, password: data}, { projection: { password: 0 } }).toArray();
        // await client.close();
        // return dataDB;

        // else { console.log('! Niepoprawny identyfikator action: ' + action + ' lub data: ' + data);
                    }


    } catch (error) {
        console.error(error);
        saveLog(` ! ERROR: ${error}`, 'app_mongo')
        await client.close();
    }
}

module.exports = manageData;
