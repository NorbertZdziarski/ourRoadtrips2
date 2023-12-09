import sendRequest from "./a_CRUD";

const fetchData = async (target) => {
    return await sendRequest('get', target);
};
// const loginCheck = async (target) => {
//     return await sendRequest('get', target);
// };
const transferData = async (target,data) => {
    console.log('CRUD : post');
    console.log('target: ' + target);
    console.log('data: ' + data);
    return await sendRequest('post', target,data);
};
const transferDataFile = async (target,data, folderName, fileName) => {

    return await sendRequest('postFile', target,data,folderName, fileName);
};

const transferGooglePhoto = async (sourceUrl,targetPath) => {
    console.log('CRUD : post google photo');
    // console.log('target: ' + target);
    console.log('data: ' + sourceUrl);
    console.log('folderName: ' + targetPath);
    return await sendRequest('postgooglephoto', null,sourceUrl,targetPath);
};

const updateData = async (target,data) => {
    console.log('CRUD update');
    console.log('target: ' + target);
    console.log('data: ' + data);
    console.log('data: ' + JSON.stringify(data));
    return await sendRequest('patch', target,data);
};

const deleteData = async (target) => {
    console.log('     delete :    ')

    return await sendRequest('delete', target);
};
const deleteFile = async (target, data) => {
    console.log('crud service delete file');
    console.log('     target :  ' + target)
    console.log('     data :    ' + data)
    console.log('     data JSON:' + JSON.stringify(data))
    return await sendRequest('deletefile', target, data);
};



export {fetchData,transferData,updateData,deleteData, deleteFile,transferDataFile, transferGooglePhoto};

