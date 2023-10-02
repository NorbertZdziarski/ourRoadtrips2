import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyForm from './app_form'
import {useStoreActions, useStoreState} from "easy-peasy";
import UserDataEdit from "./app_LoadUserData";
import '../css/main.scss';
import Header from "./1_header";
import MainPage from "./1_mainPage";
import Footer from "./1_footer";
import fetchData from "./a_get"


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

        fetchData('users').then(downloadedData => {
            setData(downloadedData)
        });

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
            <p className="underConstruction">przestrzeń robocza do ourRoadtrips.</p>
            <Header/>
            <MainPage/>
            <Footer/>

            {/*--------------------------------------poniżej do usunięcia */}
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
