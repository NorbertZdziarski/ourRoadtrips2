import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {useStoreActions, useStoreState} from "easy-peasy";
import '../css/main.scss';
import ShowTrips from "./2_showTrips";
import UserProfile from "./2_userProfile";
import AboutUs from "./2_aboutUs";
import EditUserProfile from "./3_editUserData";
import EditTrip from "./3_editTrip";
import EditCar from "./3_editCar";

const MainPage = () => {

    const page = useStoreState(state => state.page);


    return (
        <div>
            {(page === "userProfile" ? (<UserProfile/>):(<></>))}
            {(page === "mainPage" ? (<ShowTrips/>):(<></>))}
            {(page === "aboutUs" ? (<AboutUs/>):(<></>))}

            {(page === "editUserData" ? (<EditUserProfile/>):(<></>))}
            {(page === "editCar" ? (<EditCar/>):(<></>))}
            {(page === "addTrip" ? (<EditTrip/>):(<></>))}
        </div>
    );
};

export default MainPage;
