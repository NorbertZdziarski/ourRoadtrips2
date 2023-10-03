const  {MongoClient} = require('mongodb');

async function manageData(dbName, collectionName,action) {
    const url = 'mongodb://127.0.0.1:27017';
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    if (action === 'delete') return collection;

    if (action === 'get') { return collection; }
    if (action === 'insert') {
        await collection.insertOne({
            tripName: 'poObornik',
            tripType: 'adrenaline',
            tripCar: 'taczki',
            tripUser: 'nobody',
            tripDate: new Date()
        });
    }

    client.close();
}

manageData('ourRoadtrips2','trips', 'insert')
