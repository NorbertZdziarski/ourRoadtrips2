import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import '../css/main.scss';
import Header from "./1_header";
import Footer from "./1_footer";
import {useStoreActions, useStoreState} from "easy-peasy";
import ShowTrips from "./2_showTrips";
import UserProfile from "./2_userProfile";
import AboutUs from "./2_aboutUs";
import ShowTrip from "./3_showTrip";
import MyForm from "./app_form";
import YesOrNot from "./3_yesOrNot";
import DataFilter from "./3_filter";
import Login from "./2_logowanie";
import AboutMe from "./2_aboutMe";
import ShowCar from "./3_showCar";
import Gmap from "./2_map";
import Anim_loading from "./anim_loading";
import AddTrip from "./2_add_trip";

function App() {
    const page = useStoreState(state => state.page);
    const yesOrNot = useStoreState(state => state.yesOrNot);
    const dataFilter = useStoreState(state => state.dataFilter);
    const displayStyles = useStoreState(state => state.displayStyles);

    return (
        <div className={`app colorstyle_${displayStyles}`}>
            <BrowserRouter>
                <Header/>
                <div className="mainWindowStyle  ">
                    <div className="layout_main layout_flex-sb layout_mainViewWidth">
                        <Routes>
                            <Route exact path="/" element={<ShowTrips dataFilter={dataFilter}/>}/>
                            <Route path="/userprofile" element={<UserProfile/>}/>
                            <Route path="/aboutus" element={<AboutUs/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/map" element={<Gmap/>}/>
                            <Route path="/showTrip" element={<ShowTrip />}/>
                            <Route path="/showtrip/:id" element={<ShowTrip/>} />
                            <Route path="/aboutme/:id" element={<AboutMe/>}/>
                            <Route path="/showcar/:id" element={<ShowCar/>}/>
                            <Route path="/edituserdata" element={<MyForm type={"user"}/>}/>
                            <Route path="/addcar" element={<MyForm type={"car"}/>}/>
                            <Route path="/addtrip" element={<AddTrip/>}/>
                        </Routes>
                        {(yesOrNot[0] ? (<YesOrNot/>):(<></>))}
                        {/*{(showLoading[0]) ? (<Anim_loading/>):(<></>)}*/}
                    </div>
                </div>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}
export default App;
