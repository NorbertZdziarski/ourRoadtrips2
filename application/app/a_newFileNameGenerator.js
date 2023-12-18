const {useStoreState} = require("easy-peasy");
const newFileNameGenerator = (idObject, filename, type) => {

    const loggedUser = useStoreState(state => state.loggedUser);

    console.log('new file name generator: idObject: ' + idObject)
    let oldFileName = filename.toLowerCase();
    let idx = oldFileName.lastIndexOf('.');
    let fileExtension = oldFileName.slice(idx,oldFileName.length)
    let currentDate = new Date();
    let timestamp = currentDate.getTime();
    let hexTimestamp = timestamp.toString(16);

    return loggedUser._id + type + idObject + hexTimestamp + fileExtension;
}

module.exports = newFileNameGenerator;
