const  {MongoClient, ObjectId} = require('mongodb');
const path = require("path");
const fs = require("fs");
const saveLog = require("./apps/savelog");

async function manageData(dbName11, collectionName,action,data,filter, idComString ) {



const url = 'mongodb://server470062_ourroadtrips:We2c0nnect@mongodb.server470062.nazwa.pl:4185';

const dbName = 'server470062_ourroadtrips';

//
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    const client = await MongoClient.connect(url);

    
    let idCom = parseInt(idComString);
    // const url = 'mongodb://127.0.0.1:27017';
    // const url = 'mongodb://mongodb.server470062.nazwa.pl:4185';
    // const url = 'mongodb.server470062.nazwa.pl:4185';


    saveLog(`---------------------- APP MONGO \n Filter: ${filter} \n data:  ${data} \n data JSON: ${JSON.stringify(data)} \n idCom: ${idCom} \n  action: ${action} \n  `, 'app_mongo')
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
        saveLog(`36 | db: ${db}`, 'app_mongo');
        const collection = db.collection(collectionName);
        let dataDB;

        console.log('40 | nazwa kolekcji: ' + collectionName)
        saveLog(`40 | nazwa kolekcji: ${collectionName}`, 'app_mongo');
        if (action === 'delete') {
            await collection.deleteOne({_id: new ObjectId(data)});
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
            console.log('like: ' + data)

            //
            try {
                const result = await collection.updateOne(
                    {"_id": new ObjectId(filter), "tripComments": { $elemMatch: { id: idCom } } },
                    { $set: { "tripComments.$.commLike": data } }
                );
                    console.log('Result: ');
                    console.log(result);
                console.log("Dokument został zaktualizowany!");
            } catch (err) {
                console.error(err);
            } finally {
                await client.close();
            }

        } else if (action === 'googleId') {
                console.log('-{ mongo: poszukiwanie po googleID }-')
                console.log('-{ filter: ' + filter + ' }-')
            saveLog(`84 | filter: ${filter}`, 'app_mongo')
            dataDB = await collection.findOne(filter)
            // await collection.insertOne(data);
            await client.close();
            if (!dataDB) {
                return 'noUser';
            }
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