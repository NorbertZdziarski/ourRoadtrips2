import sendRequest from "./a_CRUD";

const fetchData = async (target) => {
    return await sendRequest('get', target);

};
// const loginCheck = async (target) => {
//     return await sendRequest('get', target);
// };
const transferData = async (target,data) => {
    return await sendRequest('post', target,data);
};
const transferDataFile = async (target,data, folderName, fileName) => {
    return await sendRequest('postFile', target,data,folderName, fileName);
};

const transferGooglePhoto = async (sourceUrl,targetPath) => {
    return await sendRequest('postgooglephoto', null,sourceUrl,targetPath);
};

const updateData = async (target,data) => {
    return await sendRequest('patch', target,data);
};

const deleteData = async (target) => {
    return await sendRequest('delete', target);
};
const deleteFile = async (target, data) => {
    return await sendRequest('deletefile', target, data);
};


export {fetchData,transferData,updateData,deleteData, deleteFile,transferDataFile, transferGooglePhoto};

