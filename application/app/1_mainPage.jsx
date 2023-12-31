// import React from 'react';
// import {Link, useLocation} from "react-router-dom";
// import {useStoreState} from "easy-peasy";
// import '../css/main.scss';
// import ShowTrips from "./2_showTrips";
// import UserProfile from "./2_userProfile";
// import AboutUs from "./2_aboutUs";
//
// import ShowTrip from "./3_showTrip";
// import MyForm from "./app_form";
// import YesOrNot from "./3_yesOrNot";
// import DataFilter from "./3_filter";
// import Login from "./2_logowanie";
// import AboutMe from "./2_aboutMe";
// import ShowCar from "./3_showCar";
// import Gmap from "./2_map";
// import Tymczasowe from "./tymczasowe";
// import Anim_loading from "./anim_loading";
// import AddTrip from "./2_add_trip";
//
// const MainPage = () => {
//     const page = useStoreState(state => state.page);
//     const yesOrNot = useStoreState(state => state.yesOrNot);
//     const showLoading = useStoreState(state => state.showLoading);
//     const dataFilter = useStoreState(state => state.dataFilter);
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
//
// export default MainPage;
