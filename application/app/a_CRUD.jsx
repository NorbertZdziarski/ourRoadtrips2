import axios from 'axios';

const apiURL = 'http://localhost:9000';

const sendRequest = async (method, target, data,folderName, fileName) => {
    try {
        let response;

        switch (method.toLowerCase()) {
            case 'get':
                response = await axios.get(`${apiURL}/${target}`, {
                    headers: {
                        'my-header': 'all'
                    }
                });
                break;
            case 'post':
                const params = new URLSearchParams();
                for (const key in data) {
                    params.append(key, data[key]);
                }
                console.log(data)
                response = await axios.post(`${apiURL}/${target}`, params,data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'my-header': 'all'
                    }
                });
                break;
            case 'postfile':
                console.log('CRUD')
                const formDatas = new FormData();
                formDatas.append('type', folderName);
                formDatas.append('filename', fileName);
                formDatas.append('image', data);


                axios.post(`${apiURL}/upload`, formDatas, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'my-header': 'all'
                    }
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });




                // response = await axios.post(`${apiURL}/${target}`, formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //         'my-header': 'all'
                //     }
                // });
                break;
            case 'patch':
                response = await axios.patch(`${apiURL}/${target}`, data,{
                    headers: {
                        'Content-Type': 'application/json',
                        'my-header': 'all'
                    }
                });
                break;
            case 'delete':
                response = await axios.delete(`${apiURL}/${target}`, {
                    headers: {
                        'my-header': 'all'
                    }
                });
                break;
            default:
                throw new Error(`Nieobsługiwana metoda: ${method}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Błąd podczas zapytania ${method} do ${target}:`, error);
        throw error;
    }
};

export default sendRequest;



