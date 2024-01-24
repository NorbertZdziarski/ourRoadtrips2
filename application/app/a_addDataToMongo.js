const {transferData, updateData} = require("./a_CRUD_service");


async function addDataToMongo(dataToSave, dataId, type) {
    // console.log('--------------- app form | add data to mongo:  ' + dataToSave)
    let targetPath;
    let result;
    if (!dataId) {
        // console.log('fn addDataToMongo / transfer - zmienna dataToSave: ' + dataToSave);
        targetPath = 'add';
        result = await transferData(`${type}/${targetPath}`, dataToSave).then((r)=>{
            // console.log(r)
            return r;
        });
    } else {
        // console.log('fn addDataToMongo / update - zmienna dataToSave' + dataToSave);
        targetPath = dataId._id;
        result = await updateData(`${type}/${targetPath}`, dataToSave).then((r)=>{
            // console.log(r)
            return r;
        });
    };
    return result;
}

module.exports = addDataToMongo;
