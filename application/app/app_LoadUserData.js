import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/main.scss';

const UserDataEdit = ({userData}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDataFn = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/trip/${userData}`, {
                    headers: {
                        'my-header': 'all'
                    }
                });
                const newdata = response.data;
                console.log(newdata);
                setData(newdata);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };

        fetchDataFn();
    }, [userData]);

    return (
        <div>
            <p>program w trakcie dziergania. Przekazane dane: {userData} </p>
            {data ? <p>{data.tripName}</p> : <p> oczekiwanie na dane </p>}
        </div>
    );
};

export default UserDataEdit;
