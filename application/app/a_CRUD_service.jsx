import sendRequest from "./a_CRUD";

const fetchData = async (target) => {
    return await sendRequest('get', target);
};

const transferData = async (target,data) => {
    return await sendRequest('post', target,data);
};

const updateData = async (target) => {
    return await sendRequest('patch', target);
};

const deleteData = async (target) => {
    return await sendRequest('delete', target);
};

export {fetchData,transferData,updateData,deleteData};

