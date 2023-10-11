import sendRequest from "./a_CRUD";

const fetchData = async (target) => {
    return await sendRequest('get', target);
};

const transferData = async (target,data) => {
    return await sendRequest('post', target,data);
};
const transferDataFile = async (target,data,  folderName, fileName) => {
    console.log('crud service')
    console.log('target: ' + target)
    console.log('file: ' + typeof data)
    return await sendRequest('postFile', target,data,folderName, fileName);
};

const updateData = async (target,data) => {
    return await sendRequest('patch', target,data);
};

const deleteData = async (target) => {
    return await sendRequest('delete', target);
};



export {fetchData,transferData,updateData,deleteData, transferDataFile};

