const  {MongoClient, ObjectId} = require('mongodb');

async function manageData(dbName, collectionName,action,data,filter, idComString ) {

    let idCom = parseInt(idComString);
    // const url = 'mongodb://127.0.0.1:27017';
    const url = 'mongodb://0.0.0.0:27017';
    const client = await MongoClient.connect(url);
    console.log('---------------------- APP MONGO');
    console.log('Filter: '+ filter)
    console.log('data: '+ data)
    console.log('data JSON: '+ JSON.stringify(data))
    console.log('idCom: '+ idCom)
    console.log('action: '+ action)

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let dataDB;

        console.log('nazwa kolekcji: ' + collectionName)

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
        else { console.log('Niepoprawny identyfikator action: ' + action + ' lub data: ' + data);
                    }


    } catch (error) {
        console.error(error);
        await client.close();
    }
}

module.exports = manageData;

