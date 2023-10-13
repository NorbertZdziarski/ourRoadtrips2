import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {useStoreActions, useStoreState} from "easy-peasy";
import '../css/main.scss';
import ShowTrips from "./2_showTrips";
import UserProfile from "./2_userProfile";
import AboutUs from "./2_aboutUs";

import ShowTrip from "./3_showTrip";
import MyForm from "./app_form";
import YesOrNot from "./3_yesOrNot";

const MainPage = () => {

    const page = useStoreState(state => state.page);
    const yesOrNot = useStoreState(state => state.yesOrNot);

    return (
        <div className="underConstruction-height">
            {(page === "userProfile" ? (<UserProfile/>):(<></>))}
            {(page === "mainPage" ? (<ShowTrips/>):(<></>))}
            {(page === "aboutUs" ? (<AboutUs/>):(<></>))}

            {(page === "showTrip" ? (<ShowTrip/>):(<></>))}

            {(page === "editUserData" ? (<MyForm
                type={"user"}/>):(<></>))}
            {(page === "addCar" ? (<MyForm
                type={"car"}/>):(<></>))}
            {(page === "addTrip" ? (<MyForm
                type={"trip"}/>):(<></>))}
            {(yesOrNot[0] ? (<YesOrNot/>):(<></>))}
        </div>
    );
};

export default MainPage;
