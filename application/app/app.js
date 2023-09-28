import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyForm from './app_form'
import './../css/app.scss';

const UsersList = ({ usersData }) => {
    return (
        <div className="testDataImport">
            {usersData.users.map((user) => (
                <div key={user.id} className="dataImportLine">
                    <h2>{user.nick}</h2>
                    <p>{user.firstName} {user.lastName}</p>
                    <p>Email: {user.email}</p>
                </div>
            ))}
        </div>
    );
};
const DownloadData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/users', {
                    headers: {
                        'my-header': 'all'
                    }
                });
                const data = response.data;

                setData(data);

            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {data ? (
                <div>
                    <UsersList usersData={data} />
                </div>
            ) : (
                <p>Ładowanie danych...</p>
            )}
        </div>
    );
};
function App() {
    return (
        <div className="App">
            przestrzeń robocza do ourRoadtrips.
            <DownloadData/>
            <MyForm/>
        </div>

    );
}

export default App;
