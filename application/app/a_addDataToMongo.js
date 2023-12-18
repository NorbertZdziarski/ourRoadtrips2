const {transferData, updateData} = require("./a_CRUD_service");
const {useStoreActions} = require("easy-peasy");

async function addDataToMongo(dataToSave, dataId, type) {

    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    setShowLoading([true,0]);
    console.log('--------------- app form | add data to mongo:  ' + dataToSave)

    let targetPath;
    if (!dataId) {
        console.log('fn addDataToMongo / transfer - zmienna dataToSave: ' + dataToSave);
        targetPath = 'add';
        await transferData(`${type}/${targetPath}`, dataToSave).then(()=>{
            // setPage('userProfile')
        });
    } else {
        console.log('fn addDataToMongo / update - zmienna dataToSave' + dataToSave);
        targetPath = dataId._id;
        await updateData(`${type}/${targetPath}`, dataToSave).then(()=>{
            // setPage('userProfile')
        });
    };
    setShowLoading([false,0]);
}

module.exports = addDataToMongo;
