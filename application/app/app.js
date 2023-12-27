import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// const MainPage = () => {
//
//
//     return (
//         <div className="mainWindowStyle  ">
//
//             <div className="layout_main layout_flex-sb layout_mainViewWidth">
//                 {(page === "userProfile" ? (<UserProfile/>):(<></>))}
//                 {(page === "mainPage" ? (<ShowTrips dataFilter={dataFilter}/>):(<></>))}
//                 {/*{(page === "mainPage" ? (<AddTrip/>):(<></>))}*/}
//                 {(page === "aboutUs" ? (<AboutUs/>):(<></>))}
//                 {(page === "login" ? (<Login/>):(<></>))}
//                 {(page === "map" ? (<Gmap/>):(<></>))}
//                 {(page === "tymczasowe" ? (<Tymczasowe/>):(<></>))}
//
//
//                 {(page === "showTrip" ? (<ShowTrip />):(<></>))}
//                 {(page === "aboutMe" ? (<AboutMe />):(<></>))}
//                 {(page === "showcar" ? (<ShowCar />):(<></>))}
//
//                 {(page === "editUserData" ? (<MyForm
//                     type={"user"}/>):(<></>))}
//                 {(page === "addCar" ? (<MyForm
//                     type={"car"}/>):(<></>))}
//                 {(page === "addTrip" ? (<AddTrip/>):(<></>))}
//
//                 {(yesOrNot[0] ? (<YesOrNot/>):(<></>))}
//
//                 {(showLoading[0]) ? (<Anim_loading/>):(<></>)}
//             </div>
//         </div>
//     );
// };

function App() {
    const page = useStoreState(state => state.page);
    const yesOrNot = useStoreState(state => state.yesOrNot);
    const dataFilter = useStoreState(state => state.dataFilter);
    const displayStyles = useStoreState(state => state.displayStyles);
    // console.log(' a p p ')
    // console.log(typeof page)
    // console.log(typeof yesOrNot)
    // console.log(JSON.stringify(yesOrNot))
    // console.log(yesOrNot)
    // console.log(typeof dataFilter)
    // console.log(dataFilter)
    // console.log(JSON.stringify(dataFilter))
    // console.log(typeof displayStyles)
    return (
        <div className={`app colorstyle_${displayStyles}`}>
            <Router>
                <Header/>
                <div className="mainWindowStyle  ">
                    <div className="layout_main layout_flex-sb layout_mainViewWidth">
                        <Routes>
                            <Route path="/" element={<ShowTrips dataFilter={dataFilter}/>}/>
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
                        {/*{(yesOrNot[0] ? (<YesOrNot/>):(<></>))}*/}
                        {/*{(showLoading[0]) ? (<Anim_loading/>):(<></>)}*/}
                    </div>
                </div>
                <Footer/>
            </Router>
        </div>
    );
}
export default App;
