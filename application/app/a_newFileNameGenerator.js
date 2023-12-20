
const newFileNameGenerator = (idObject, filename, type, loggedUser) => {

    console.log('new file name generator: idObject: ' + idObject)
    let oldFileName = filename.toLowerCase();
    let idx = oldFileName.lastIndexOf('.');
    let fileExtension = oldFileName.slice(idx,oldFileName.length)
    let currentDate = new Date();
    let timestamp = currentDate.getTime();
    let hexTimestamp = timestamp.toString(16);

    console.log('oldFileName ' + oldFileName)
    console.log('idx ' + idx)
    console.log('fileExtension ' + fileExtension)
    console.log('currentDate ' + currentDate)
    console.log('timestamp ' + timestamp)
    console.log('hexTimestamp ' + hexTimestamp)
    console.log('idObject ' + idObject)
    console.log('type ' + type)
    console.log('loggedUser ' +  loggedUser)



    return loggedUser + '-' + type + idObject + '-' + hexTimestamp + fileExtension;
}

module.exports = newFileNameGenerator;
