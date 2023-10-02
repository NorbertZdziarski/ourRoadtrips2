import axios from "axios";

const transferData = async (target, dataToTransfer) => {
    try {
        const params = new URLSearchParams();

        for (const key in dataToTransfer) {
            params.append(key, dataToTransfer[key])
        }

        await axios.post(`http://localhost:9000/${target}`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'my-header': 'all'
            }
        })

    } catch (error) {
        console.error('Błąd podczas przesyłania danych: ', error);
    }
}

export default transferData;