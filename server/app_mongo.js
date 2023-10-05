const  {MongoClient} = require('mongodb');

async function manageData(dbName, collectionName,action,data) {
    console.log('dbName:' + dbName);
    console.log('col' + collectionName);
    console.log('act' + action);
    console.log('data' + data);
    console.log('---------------------------')
    console.log('  manage DATA ')
    const url = 'mongodb://127.0.0.1:27017';
    const client = await MongoClient.connect(url);
jak dane z bazy 


    try {
        await client.connect();
        const db = client.db(dbName);
        // console.log(db)
        const collection = db.collection(collectionName);

        // console.log(collection)
        if (action === 'delete') await collection.deleteOne(data);
        if (action === 'update') await collection.updateOne({/* your criteria */}, { $set: data }, { upsert: false });
        if (data && action === 'insert') await collection.insertOne(data);
        if (action === 'get') {
            console.log('--1')
            const dataDB = await collection.find().toArray();
            console.log('--2' + dataDB)
            return dataDB;
        }
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

// manageData('ourRoadtrips2','trips', 'insert')
module.exports = manageData;

// {
//     tripName: dataToSave.tripName,
//         tripType: dataToSave.tripType,
//     tripCar: dataToSave.tripCar,
//     tripDescription: dataToSave.tripDescription,
//     tripUser: dataToSave.tripUser,
//     tripDate: dataToSave.tripDate,
//     tripPhoto: dataToSave.tripPhoto,
//     tripMap: dataToSave.tripMap,
//     tripSaveDate: new Date()
// }