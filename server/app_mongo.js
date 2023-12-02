const  {MongoClient, ObjectId} = require('mongodb');
const path = require("path");
const fs = require("fs");
const saveLog = require("./apps/savelog");
require('dotenv').config();

async function manageData({collectionName}, action,data,filter, idComString ) {
    saveLog(`8 | uruchomiono app_mongo`, 'app_mongo');
    const dbName = process.env.DBNAME || 'ourRoadtrips2';
    const url = process.env.DBFULLPATH || 'mongodb://127.0.0.1:27017';

    // const collectionName = 'ourRoadtrips'
    const client = await MongoClient.connect(url);
    let idCom = parseInt(idComString);
    // saveLog(`\n \n data: ${data} \n `,`app_mongo`)
    saveLog(`\n\n--08-53--------------- APP MONGO  \n -- manage data --\n collection Name: ${collectionName} \n action: ${action} \n \ndata:  ${data} \n data JSON: ${JSON.stringify(data)} \n Filter: ${filter} \n idCom: ${idCom} \n   `, 'app_mongo')
    // console.log('---------------------- APP MONGO');
    // console.log('Filter: '+ filter)
    // console.log('data: '+ data)
    // console.log('data JSON: '+ JSON.stringify(data))
    // console.log('idCom: '+ idCom)
    // console.log('action: '+ action)

    try {
        // await client.connect();
        saveLog(`35 | - try -`, 'app_mongo');
        const db = client.db(dbName);
        // saveLog(`36 | db: ${db}`, 'app_mongo');
        const collection = db.collection('users');
        let dataDB;
        // saveLog(`40 | collection: ${collection}`, 'app_mongo');
        console.log('40 | nazwa kolekcji: ' + collectionName)
        saveLog(`42 | nazwa kolekcji: ${collectionName} , JSON ${JSON.stringify(collectionName)}`, 'app_mongo');
        saveLog(`43 | action: ${action}`, 'app_mongo');
        if (action === 'dodaj_obj') {
            saveLog(` /// dodaj obj`, 'app_mongo');
            await collection.insertOne({data}, function (err,res) {
                if (err) { saveLog(` /// BŁĄD: ${err}`, 'app_mongo');}
                client.close();
            });
        }

        if (action === 'delete') {
            await collection.deleteOne({_id: new ObjectId(data)});
            await client.close();
        } else if (action == 'pobierzwszystko') {
            saveLog(`47 !!!!! pobierzwszystko`, 'app_mongo');

            dataDB = await collection.find({})
                // .toArray((err, data) => {
                // if (err) {
                //     saveLog(`52 | error pobierz wszystko: ${err} `, 'app_mongo');
                //
                // } else {
                //     saveLog(`55 | ok - pobierz wszystko ${data}`, '!!!_mongo');
                //
                    return dataDB;
                // }
            // });
            await client.close();
        } else if (action === 'patch') {
            await collection.updateOne({_id: new ObjectId(filter)}, { $set: data }, { upsert: false });
            await client.close();
        } else if (action === 'patchComm') {
            await collection.updateOne(
                {_id: new ObjectId(filter)},
                { $set: { tripComments: data } },
            //     function(err, result) {
            //         if (err) throw err;
            //
            //         console.log("Dokument został zaktualizowany!");
            //
            //         client.close();
            //     }
            );
            await client.close();return
        }  else if (action === 'patchCommLike') {
            console.log('----------------------app mongo: patch comm like.');

            console.log('filter: ' + filter)
            console.log('id: ' + idCom)
            console.log(typeof idCom);
            console.log('data: ' + data)

            //
            try {
                const result = await collection.updateOne(
                    {"_id": new ObjectId(filter), "tripComments": { $elemMatch: { id: idCom } } },
                    { $set: { "tripComments.$.commLike": data } }
                );
                    console.log('Result: ');
                saveLog(`81 | result: ${result} `,`app_mongo`);
                console.log("Dokument został zaktualizowany!");
            } catch (err) {
                saveLog(`84 | błąd: ${err}`,`app_mongo`);
            } finally {
                await client.close();
            }

        } else if (action === 'googleId') {
                // console.log('-{ mongo: poszukiwanie po googleID }-')
                // console.log('-{ filter: ' + filter + ' }-')
            saveLog(`84 | filter: ${filter}`, 'app_mongo')
            dataDB = await collection.findOne(data)
            // await collection.insertOne(data);
            await client.close();
            if (!dataDB) {
                saveLog(`100 | zwrot - noUser`, 'app_mongo')
                return 'noUser';
            }
            saveLog(`103 | zwrot ${dataDB}`, 'app_mongo')
            return dataDB;

        } else if (data && action === 'post') {
            await collection.insertOne(data);
            await client.close();
        } else if (action === 'login') {
        dataDB = await collection.find({nick: filter, password: data}, { projection: { password: 0 } }).toArray();
        await client.close();
        return dataDB;
        } else if (action === 'getNicks') {
                console.log('app mongo _ get Nicks ')
            let filter = {nick: {$exists: true}};
            let projection = {nick: 1};
                console.log('filter ' + JSON.stringify(filter));
            let dataDB = await collection.find(filter).project(projection).toArray();
            await client.close();
            return dataDB;
        } else if (action === 'get' && filter) {
                console.log('app mongo _ filter ->  ' + filter)
           dataDB = await collection.find(filter).toArray();
            await client.close();
            return dataDB;
        } else if (action === 'get' && !data ) {
            dataDB = await collection.find().toArray();
            await client.close();
            saveLog(`137 | pobieranie typu get | uzyskane dane: ${dataDB}  `,`app_mongo`)
            return dataDB;
        } else if (action === 'get' && data) {

            dataDB = await collection.find({_id: new ObjectId(data)}).toArray();
            await client.close();
            return dataDB;
        }
        else { console.log('! Niepoprawny identyfikator action: ' + action + ' lub data: ' + data);
                    }


    } catch (error) {
        console.error(error);
        saveLog(` ! ERROR: ${error}`, 'app_mongo')
        await client.close();
    }
}

module.exports = manageData;
//
// const MongoClient = require('mongodb').MongoClient;
//
// // Connection URL
// const url = 'mongodb://server470062_ourRoadtrips2:your_password@mongodb.server470062.nazwa.pl:4185';
//
// // Database Name
// const dbName = 'server470062_ourRoadtrips2';
//
// // Create a new MongoClient
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//
// async function run() {
//     try {
//         // Connect the client to the server
//         await client.connect();
//
//         console.log("Connected correctly to server");
//
//         // Specify the database to use
//         const db = client.db(dbName);
//
//         // Specify the collection to use
//         const col = db.collection('your_collection');
//
//         // Insert a single document
//         let r = await col.insertOne({hello:'world'});
//
//         console.log("Insertion was successful");
//
//     } catch (err) {
//         console.log(err.stack);
//     }
//
//     // Close connection
//     client.close();
// };
//
// run().catch(console.dir);