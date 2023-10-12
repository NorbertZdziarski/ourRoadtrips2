const  {MongoClient, ObjectId} = require('mongodb');

async function manageData(dbName, collectionName,action,data,filter) {

    const url = 'mongodb://127.0.0.1:27017';
    const client = await MongoClient.connect(url);
    console.log('Filter: '+ filter)
    console.log('data: '+ data)
    console.log('action: '+ action)

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let dataDB;

        console.log(collectionName)

        if (action === 'delete') {
            await collection.deleteOne({_id: new ObjectId(data)});
            await client.close();
        } else if (action === 'patch') {
            await collection.updateOne({_id: new ObjectId(filter)}, { $set: data }, { upsert: false });
            await client.close();
        } else if (data && action === 'post') {
            await collection.insertOne(data);
            await client.close();
        } else if (action === 'get' && filter) {
            dataDB = await collection.find(filter).toArray();
            await client.close();
            return dataDB;
        } else if (action === 'get' && !data) {
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

