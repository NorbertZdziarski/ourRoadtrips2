import axios from 'axios';
const host = 'localhost';
const port = 9000
const apiURL = `http://${host}:${port}`;

const sendRequest = async (method, target, data,folderName, fileName) => {
    console.log('data: ' + data)
    console.log('method: ' + method)
    console.log('target: ' + target)
    console.log('folder name: ' + folderName)
    console.log('file name: ' + fileName)
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
                console.log(params)
                console.log(data)
                // data = JSON.stringify(data)

                response = await axios.post(`${apiURL}/${target}`,JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json',
                        'my-header': 'all'
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
            case 'patch':
                console.log('CRUD: patch')
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



