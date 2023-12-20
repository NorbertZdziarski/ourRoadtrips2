import axios from 'axios';

require('dotenv').config();

const host = process.env.SERVER_HOST || 'llllocalhost';
const port = process.env.SERVER_PORT || 9000
// const apiURL = `http://${host}:${port}`;
const apiURL = `https://${host}:${port}`;
// console.log('_server HOST: ' + host);
// console.log('_server PORT: ' + port);
// console.log('_api url: ' + apiURL);
const sendRequest = async (method, target, data,folderName, fileName) => {

    // console.log('method: ' + method)
    // console.log('target: ' + target)
    // console.log('data: ' + data)
    // console.log('folder name: ' + folderName)
    // console.log('file name: ' + fileName)

    try {
        let response;

        switch (method.toLowerCase()) {
            case 'get':
                console.log('get ' + `${apiURL}/${target}`)
                try {
                    const response = await axios.get(`${apiURL}/${target}`, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'my-header': 'all'
                        }
                    });
                    // console.log(response.data);
                    // console.log(response);
                    return response.data;
                } catch (error) {
                    console.error(error);
                }

                break;
            case 'post':
                const params = new URLSearchParams();
                for (const key in data) {
                    params.append(key, data[key]);
                }
                // console.log(params)
                // console.log(data)
                // console.log(JSON.stringify(data))
                // console.log(typeof data)
                // JSON.stringify(data)

                response = await axios.post(`${apiURL}/${target}`,JSON.stringify(data), {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'my-header': 'all',
                        'Content-Type': 'application/json'
                    }
                });
                break;
            case 'postgooglephoto':
                // const linksToSend = new FormData();
                // console.log('CRUD | -=-=- GooglePhoto -=-=- v3 -=---------');
                // console.log('folder name: ' + folderName + ' JSON: ' + JSON.stringify(folderName));
                // console.log('data: ' + data + ' JSON: ' + JSON.stringify(data));
                // // console.log('CRUD | ------------------------- ');

                // linksToSend.append('sourceUrl', data);
                // linksToSend.append('targetPath', folderName);
                // formDatas.append('image', data);
                await axios.post(`${apiURL}/glephoto`, {
                    sourceUrl: data,
                    targetPath: folderName
                }, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'my-header': 'all'
                    }
                })
                    .then(response => {
                        console.log('-=-=- GooglePhoto response ')
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log('-=-=- GooglePhoto error ')
                        console.error(error);
                    });
                return;
            case 'postfile':
                const formDatas = new FormData();
                console.log('CRUD | -=-=- post file -=-=- ');
                // console.log('type' + folderName + ' JSON: ' + JSON.stringify(folderName));
                // console.log('filename' + fileName + ' JSON: ' + JSON.stringify(fileName));
                // console.log('CRUD | ------------------------- ');

                formDatas.append('type', folderName);
                formDatas.append('filename', fileName);
                formDatas.append('image', data);
                await axios.post(`${apiURL}/upload`, formDatas, {
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
                    data: {
                        path: target,
                        filesnames: data
                    },
                    headers: {
                        'my-header': 'all',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                break;
            default:
                throw new Error(`Nieobsługiwana metoda: ${method}`);
        }
        console.log(response.data)
        if (!response.data) return 'brak danych'
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas zapytania ${method} do ${target}:`, error);
        throw error;
    }

};

export default sendRequest;



