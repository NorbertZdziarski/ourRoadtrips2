import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// import {useStoreActions, useStoreState} from "easy-peasy";
// import UserDataEdit from "./app_LoadUserData";



import '../css/main.scss';
import Header from "./1_header";
import MainPage from "./1_mainPage";
import Footer from "./1_footer";



function App() {
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);


    // ----------------------- ustalenie stanu globalnego easy-peasy
    // const setPage = useStoreActions((actions) => actions.setPage);


    const handleChange = (e) => { setSelectedUserData(e.target.value) }
    const handleSubmit = () => { setIsSubmitted(true) }
    return (
        <div className="App">
            {/*--------------------------------------poniżej doeclowe */}
            <Header/>
            <MainPage/>
            <Footer/>



        </div>

    );
}



export default App;

// {/*--------------------------------------poniżej do usunięcia */}
// {/*<DownloadData/>*/}
// {/*<div className="ramka">*/}
// {/*    {isSubmitted && selectedUserData ? (*/}
// {/*        <div>*/}
// {/*            <UserDataEdit userData={selectedUserData} />*/}
// {/*        </div>*/}
// {/*    ):(*/}
// {/*        <form>*/}
// {/*            <label>*/}
// {/*                Podaj IP użytkownika: (docelowo będzie logowanie - wersja robocza!)*/}
// {/*                <input type="text" name="userId" value={selectedUserData} onChange={handleChange} />*/}
// {/*            </label>*/}
//
// {/*            <button type="button" onClick={handleSubmit}>Wyślij</button>*/}
// {/*        </form>*/}
// {/*    )}*/}
// {/*</div>*/}