import sendRequest from "./a_CRUD";

const fetchData = async (target) => {
    return await sendRequest('get', target);
};

const transferData = async (target) => {
    return await sendRequest('post', target);
};

const updateData = async (target) => {
    return await sendRequest('put', target);
};

const deleteData = async (target) => {
    return await sendRequest('delete', target);
};

export default fetchData;
// export default transferData;
// export default updateData;
// export default deleteData;
