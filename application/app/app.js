import React, { useEffect, useState } from 'react';

import '../css/main.scss';
import Header from "./1_header";
import MainPage from "./1_mainPage";
import Footer from "./1_footer";



function App() {
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);


    // ----------------------- ustalenie stanu globalnego easy-peasy
    // const setPage = useStoreActions((actions) => actions.setPage);

    return (
        <div className="App">
            <Header/>
            <MainPage/>
            <Footer/>
        </div>
    );
}



export default App;
