import React, { useEffect, useState } from 'react';

import '../css/main.scss';
import Header from "./1_header";
import MainPage from "./1_mainPage";
import Footer from "./1_footer";
import {useStoreActions, useStoreState} from "easy-peasy";



function App() {
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const displayStyles = useStoreState(state => state.displayStyles);

    // ----------------------- ustalenie stanu globalnego easy-peasy
    // const setPage = useStoreActions((actions) => actions.setPage);

    return (
        <div className={`App colorstyle_${displayStyles}`}>
            <Header/>
            <MainPage/>
            <Footer/>
        </div>
    );
}



export default App;
