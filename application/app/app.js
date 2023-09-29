import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyForm from './app_form'
import {useStoreActions, useStoreState} from "easy-peasy";
import UserDataEdit from "./app_LoadUserData";
import '../css/main.scss';


// ----------------------------- piaskownica do testowania kodu do produkcji komponentów

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
        <div className="ramka">
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
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);


    // ----------------------- ustalenie stanu globalnego easy-peasy
    // const setPage = useStoreActions((actions) => actions.setPage);


    const handleChange = (e) => { setSelectedUserData(e.target.value) }
    const handleSubmit = () => { setIsSubmitted(true) }
    return (
        <div className="App">
            przestrzeń robocza do ourRoadtrips.
            <DownloadData/>
            <div className="ramka">
                {isSubmitted && selectedUserData ? (
                    <div>
                        <UserDataEdit userData={selectedUserData} />
                    </div>
                ):(
                    <form>
                        <label>
                            Podaj IP użytkownika: (docelowo będzie logowanie - wersja robocza!)
                            <input type="text" name="userId" value={selectedUserData} onChange={handleChange} />
                        </label>

                        <button type="button" onClick={handleSubmit}>Wyślij</button>
                    </form>
                )}
            </div>
            <div className="ramka">
                <MyForm/>
            </div>
        </div>

    );
}



export default App;
