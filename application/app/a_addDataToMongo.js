const {transferData, updateData} = require("./a_CRUD_service");


async function addDataToMongo(dataToSave, dataId, type) {


    console.log('--------------- app form | add data to mongo:  ' + dataToSave)

    let targetPath;
    if (!dataId) {
        console.log('fn addDataToMongo / transfer - zmienna dataToSave: ' + dataToSave);
        targetPath = 'add';
        await transferData(`${type}/${targetPath}`, dataToSave).then((r)=>{
            console.log(r)
            // setPage('userProfile')
            return r;
        });
    } else {
        console.log('fn addDataToMongo / update - zmienna dataToSave' + dataToSave);
        targetPath = dataId._id;
        await updateData(`${type}/${targetPath}`, dataToSave).then((r)=>{
            // setPage('userProfile')
            console.log(r)
            return r;
        });
    };
    // setShowLoading([false,0]);
}

module.exports = addDataToMongo;
