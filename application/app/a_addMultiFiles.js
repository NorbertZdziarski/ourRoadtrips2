const newFileNameGenerator = require("./a_newFileNameGenerator");
const {transferDataFile} = require("./a_CRUD_service");
const {useStoreActions} = require("easy-peasy");


async function addMultiFiles(file, dataId, type, formData) {

    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    setShowLoading([true,0]);
    console.log('--------------- app form | add multi files ')
    let newFileName;

    const tempFileNameArr = [];
    let folderName = type + 's';
    for (let i=0; i<file.length; i++) {
        let name = file[i].name
        newFileName = newFileNameGenerator(dataId._id, name, type);
        tempFileNameArr.push(newFileName);
        await transferDataFile(`upload`, file[i], folderName, newFileName);
    }

    let toSave;
    if (type === 'car') {
        toSave = {
            carPhoto: tempFileNameArr
        };
    } else if (type === 'trip') {
        toSave = {
            tripPhoto: tempFileNameArr
        };
    }

    const toReturn = {
        ...formData,
        ...toSave
    }

    setShowLoading([false,'']);
    return toReturn;
}

module.exports = addMultiFiles;
