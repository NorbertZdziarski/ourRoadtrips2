import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {useStoreState} from "easy-peasy";
import '../css/main.scss';
import ShowTrips from "./2_showTrips";
import UserProfile from "./2_userProfile";
import AboutUs from "./2_aboutUs";

import ShowTrip from "./3_showTrip";
import MyForm from "./app_form";
import YesOrNot from "./3_yesOrNot";
import DataFilter from "./3_filter";
import Login from "./2_logowanie";
import AboutMe from "./2_aboutMe";

const MainPage = () => {

    const page = useStoreState(state => state.page);
    const yesOrNot = useStoreState(state => state.yesOrNot);
    const dataFilter = useStoreState(state => state.dataFilter);

    return (
        <div className="mainWindowStyle  ">
            <div className="mainViewStyle ">
                {(page === "userProfile" ? (<UserProfile/>):(<></>))}
                {(page === "mainPage" ? (<ShowTrips dataFilter={dataFilter}/>):(<></>))}
                {(page === "aboutUs" ? (<AboutUs/>):(<></>))}
                {(page === "login" ? (<Login/>):(<></>))}

                {(page === "showTrip" ? (<ShowTrip />):(<></>))}
                {(page === "aboutMe" ? (<AboutMe />):(<></>))}

                {(page === "editUserData" ? (<MyForm
                    type={"user"}/>):(<></>))}
                {(page === "addCar" ? (<MyForm
                    type={"car"}/>):(<></>))}
                {(page === "addTrip" ? (
                    <MyForm
                    type={"trip"}/>):(<></>))}
                {(yesOrNot[0] ? (<YesOrNot/>):(<></>))}
            </div>
        </div>
    );
};

export default MainPage;
