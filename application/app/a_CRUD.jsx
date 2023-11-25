import axios from 'axios';
require('dotenv').config();

const host = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || 9000
const apiURL = `https://${host}:${port}`;
console.log('server HOST: ' + host);
console.log('server PORT: ' + port);
console.log('api url: ' + apiURL);
const sendRequest = async (method, target, data,folderName, fileName) => {
    // console.log('data: ' + data)
    // console.log('method: ' + method)
    // console.log('target: ' + target)
    // console.log('folder name: ' + folderName)
    // console.log('file name: ' + fileName)
    try {
        let response;

        switch (method.toLowerCase()) {
            case 'get':
                console.log('get ' + `${apiURL}/${target}`)
                    response = await axios.get(`${apiURL}/${target}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'my-header': 'all'
                    }
                });
                break;
            case 'post':
                const params = new URLSearchParams();
                for (const key in data) {
                    params.append(key, data[key]);
                }
                console.log(params)
                console.log(data)
                console.log(JSON.stringify(data))
                console.log(typeof data)

                response = await axios.post(`${apiURL}/${target}`,JSON.stringify(data), {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'my-header': 'all',
                        'Content-Type': 'application/json'
                    }
                });
                break;
            case 'postfile':
                const formDatas = new FormData();
                formDatas.append('type', folderName);
                formDatas.append('filename', fileName);
                formDatas.append('image', data);
                axios.post(`${apiURL}/upload`, formDatas, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
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
                return;
                // break;
            case 'patch':
                console.log('CRUD: patch')
                response = await axios.patch(`${apiURL}/${target}`, data,{
                    headers: {
                        'Content-Type': 'application/json',
                        'my-header': 'all',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                break;
            case 'delete':
                response = await axios.delete(`${apiURL}/${target}`, {
                    headers: {
                        'my-header': 'all',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                break;
            case 'deletefile':
                response = await axios.delete(`${apiURL}/file`, {
                    data: {target},
                    headers: {
                        'my-header': 'all',
                        'Access-Control-Allow-Origin': '*'
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



