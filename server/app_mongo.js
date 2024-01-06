const  {MongoClient, ObjectId} = require('mongodb');
const path = require("path");
const fs = require("fs");
const saveLog = require("./apps/savelog");
require('dotenv').config();

async function manageData(collectionName, action, data, filter) {
    saveLog(`8 | uruchomiono app_mongo`, 'app_mongo');
    const dbName = process.env.DBNAME || 'ourRoadtrips2';
    const url = process.env.DBFULLPATH || 'mongodb://127.0.0.1:27017';

    // const collectionName = 'ourRoadtrips'
    const client = await MongoClient.connect(url);
    // let idComString;
    // let idCom = parseInt(idComString);
    // saveLog(`\n \n data: ${data} \n `,`app_mongo`)
    saveLog(`\n \n--23-12-07_1440--------------- APP MONGO  \n -- manage data --\n collection Name: ${collectionName} \n action: ${action} \n \ndata:  ${data} \n data JSON: ${JSON.stringify(data)} \n  `, 'app_mongo')


    try {
        // await client.connect();
        saveLog(`25 | - try -`, 'app_mongo');
        const db = client.db(dbName);
            // saveLog(`29 | ${db}`, 'app_mongo');
        const collection = db.collection(collectionName);
        let dataDB;
            // saveLog(`32 | ${collection}`, 'app_mongo');
        saveLog(`42 | nazwa kolekcji: ${collectionName} , JSON ${JSON.stringify(collectionName)}`, 'app_mongo');
        saveLog(`43 | action: ${action}`, 'app_mongo');

        if (action === 'getall') {
            dataDB = await collection.find().toArray();
            await client.close();
            // saveLog(`34 | pobieranie typu get_all | uzyskane dane: ${dataDB}  `,`app_mongo`)
            return dataDB;


        } else if (action === 'getone') {
            dataDB = await collection.findOne({_id: new ObjectId(data)});
            await client.close();
            saveLog(`41 | pobieranie typu get_one | uzyskane dane: ${dataDB}  `,`app_mongo`);
            return dataDB;
        }
         else if (action === 'get') {

            saveLog(`||| app mongo GET filter ->  ${filter} JSON: ${JSON.stringify(filter) }`,`app_mongo`)

            dataDB = await collection.find(filter).toArray();

            await client.close();
            saveLog(`51 | pobieranie typu get | uzyskane dane: ${dataDB}  `,`app_mongo`);
            return dataDB;


        } else if (action === 'getusers') {
            saveLog(`||| app mongo GET users filter ->  ${filter} JSON: ${JSON.stringify(filter) }`,`app_mongo`)
            dataDB = await collection.find(filter.query, filter.projection).toArray();
            await client.close();
            saveLog(`59 | pobieranie typu get_users | uzyskane dane: ${dataDB}  `,`app_mongo`);
            return dataDB;
        } else if (action === 'dodaj_obj') {
            saveLog(` /// dodaj obj`, 'app_mongo');
            await collection.insertOne({data}, function (err,res) {
                if (err) { saveLog(` /// BŁĄD: ${err}`, 'app_mongo');}
                client.close();
            });
        }
        else if (action === 'patch') {
            saveLog(` /// patch`, 'app_mongo');
            const result = await collection.updateOne({_id: new ObjectId(filter)}, { $set: data }, { upsert: false });
            if (result.modifiedCount === 0) {
                saveLog('Nie znaleziono dokumentu do aktualizacji.' , 'app_mongo');
            } else {
                saveLog( 'Dokument został pomyślnie zaktualizowany.' , 'app_mongo');
            }

            await client.close();
        }
        else if (action === 'delete') {
            await collection.deleteOne({_id: new ObjectId(data)});
            await client.close();
        }
        else if (action === 'googleId') {

            saveLog(`-- google -- ${data}`, 'app_mongo')
            dataDB = await collection.findOne(data)

            await client.close();
            if (!dataDB) {
                saveLog(`100 | zwrot - noUser`, 'app_mongo')
                return 'noUser';
            }
            saveLog(`103 | zwrot ${dataDB}`, 'app_mongo')
            return dataDB;
        } else if (data && action === 'postlikeget') {
            saveLog(`81 | post _ insertOne ${JSON.stringify(data)}`, 'app_mongo')

            try {
                let result = await await collection.find(data).toArray();

                return result;
            } catch (error) {
                saveLog('Error occurred while inserting: ' + error, 'app_mongo');
                client.close();

            }
        } else if (data && action === 'post') {
            saveLog(`81 | post _ insertOne ${JSON.stringify(data)}`, 'app_mongo')
            // await collection.insertOne(data);

            try {
                let result = await collection.insertOne(data);
                // saveLog('inserted record' + result.ops[0], 'app_mongo');
                saveLog('New document ID:' + result.insertedId, 'app_mongo');
                return result.insertedId;
            } catch (error) {
                saveLog('Error occurred while inserting: ' + error, 'app_mongo');
                client.close();
            }


            // await collection.insertOne(data, function(error, result) {
            //     if (error) {
            //         saveLog('Error occurred while inserting: ' + error, 'app_mongo');
            //         client.close();
            //
            //     } else {
            //         saveLog('inserted record' + result.ops[0], 'app_mongo');
            //         saveLog('New document ID:' + result.insertedId, 'app_mongo');
            //         return result.insertedId;
            //     }
            // });
            // await client.close();



        // } else if (action === 'login') {
        //     dataDB = await collection.find({nick: filter, password: data}, {projection: {password: 0}}).toArray();
        //     await client.close();
        //     return dataDB;

            // else { console.log('! Niepoprawny identyfikator action: ' + action + ' lub data: ' + data);
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
            saveLog('----------------------app mongo: patch comm like.', 'app_mongo');

            saveLog('filter: ' + filter, 'app_mongo')
            // saveLog('id: ' + idCom)
            // saveLog(typeof idCom);
            saveLog('data: ' + data, 'app_mongo')

            //
            try {
                const result = await collection.updateOne(
                    {"_id": new ObjectId(filter), "tripComments": { $elemMatch: { id: idCom } } },
                    { $set: { "tripComments.$.commLike": data } }
                );
                // console.log('Result: ');
                saveLog(`81 | result: ${result} `,`app_mongo`);
                saveLog("Dokument został zaktualizowany!", 'app_mongo');
            } catch (err) {
                saveLog(`84 | błąd: ${err}`,`app_mongo`);
            } finally {
                await client.close();
            }

        }


    } catch (error) {
        console.error(error);
        saveLog(` ! ERROR: ${error}`, 'app_mongo')
        await client.close();
    }
}

module.exports = manageData;
