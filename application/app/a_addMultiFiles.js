const newFileNameGenerator = require("./a_newFileNameGenerator");
const {transferDataFile} = require("./a_CRUD_service");



async function addMultiFiles(file, dataId, type, formData, loggedUser) {

    // const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    // setShowLoading([true,0]);
    console.log('--------------- app form | add multi files ')
    console.log('| file: ' + file)
    console.log('| dataId: ' + dataId)
    console.log(typeof dataId)
    console.log('| type: ' + type)
    console.log('| form data: ' + formData)
    console.log('| fomr data json ' + JSON.stringify(formData))
    let newFileName;

    const tempFileNameArr = [];
    let folderName = type + 's';
    console.log('folder name: ' + folderName)
    for (let i=0; i<file.length; i++) {
        let name = file[i].name
        newFileName = newFileNameGenerator(dataId, name, type, loggedUser);
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

    // setShowLoading([false,'']);
    return toReturn;
}

module.exports = addMultiFiles;
