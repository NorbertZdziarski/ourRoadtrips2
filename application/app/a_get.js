import axios from "axios";

const fetchData = async (target) => {
    try {
        const response = await axios.get(`http://localhost:9000/${target}`, {
            headers: {
                'my-header': 'all'
            }
        });
        return response.data;

    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
    }
};

export default fetchData;