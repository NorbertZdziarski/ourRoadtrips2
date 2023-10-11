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
import ShowTrip from "./3_showTrip";
import MyForm from "./app_form";

const MainPage = () => {

    const page = useStoreState(state => state.page);


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
        </div>
    );
};

export default MainPage;
