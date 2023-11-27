import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import { googleLogout } from '@react-oauth/google';

import DataFilter from "./3_filter";
import LoadImage from "./a_loadimage";
import DataSort from "./4_sort";
import logourl from "../images/logo_m.png"
import {fetchData} from "./a_CRUD_service";
import {checkIfItExists} from "./app_check";

function Header() {
    const page = useStoreState(state => state.page);
    const setPage = useStoreActions(actions => actions.setPage);
    const loggedUser = useStoreState(state => state.loggedUser);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const setDataId = useStoreActions(actions => actions.setDataId);
    const setDataFilter = useStoreActions(actions => actions.setDataFilter);
    const displayStyles = useStoreState(state => state.displayStyles);

    const dataFilter = useStoreState(state => state.dataFilter);
    const dataSortOn = useStoreState(state => state.dataSortOn);
    const setDataSortOn = useStoreActions(actions => actions.setDataSortOn);

    const [screenWidth, setScreenWidth] = useState();



    const resizeOps = () => {
        document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
        document.documentElement.style.setProperty("--vw", window.innerWidth * 0.01 + "px");

        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    console.log('Header - screen: '+ screenWidth + " data sort: " + dataSortOn)

    function tymczasowa() {
        // await checkIfItExists('rom1').then((r)=>{
        //     console.log('tymczaowa wynik: ' + r)
        // })

    }

    return (
        <header className={`headerStyle colorStyle_headerBtn_${displayStyles} `}>
            <div className="layout_main layout_flex-sb tymczasowy_header">
                {screenWidth < 950 ? <>
                    <button onClick={()=>setPage("mainPage")}>
                        =
                    </button>


                </> : <>

                    {(((page === "mainPage") || (page === "aboutUs") || (page === "showTrip") || (page === "showcar") || (page === "mainPageFilter"))? (

                            <section className="headerButtons ">
                                {page !== "mainPage" ? <button onClick={()=>setPage("mainPage")}>
                                    Main Page
                                </button> : <>
                                    {(dataFilter[0] ) ? <DataFilter/> : <></>}
                                    {(dataSortOn) ? <DataSort />:<></>}

                                    {((!dataSortOn) && (!dataFilter[0])) ? <>
                                            <button onClick={()=>setDataFilter([true,'all','all','all'])}>
                                                Filter
                                            </button>
                                            <button onClick={()=>setDataSortOn(true)}>
                                                Sort
                                            </button>
                                            {(page === "mainPage") ?
                                                <button disabled onClick={()=>tymczasowa()}>
                                                    Map
                                                </button> : <button disabled >
                                                    List
                                                </button>
                                            }
                                        </> : <></>}

                                </>}
                            </section>

                    ) : ( <></> ))}

                    {(page === "userProfile" ? (
                            <section className="headerButtons">
                                <button onClick={()=>setPage("mainPage")}>
                                    Main Page
                                </button>
                                <button onClick={()=>{
                                    setDataId('')
                                    setPage("addTrip")}}>
                                    Add trip
                                </button>
                                <button onClick={()=>{
                                    setDataId('')
                                    setPage("addCar")}
                                }>
                                    Add car
                                </button>
                                <button onClick={()=>setPage("editUserData")}>
                                    Edit User Data
                                </button>
                            </section>
                    ) : (
                        <></>))}

                    {(((page === "editUserData") || (page === "addCar") || (page === "addTrip") ) ? (
                            <section className="headerButtons">
                                <button onClick={()=>setPage("mainPage")}>
                                    Main Page
                                </button>
                            </section>
                    ) : (
                        <></>))}

                    {((page === "aboutMe") ? (
                            <section className="headerButtons">
                                <button onClick={()=>setPage("mainPage")}>
                                    Main Page
                                </button>
                                <button onClick={()=>{setPage("showTrip")}}>
                                    Back
                                </button>
                            </section>
                    ) : (
                        <></>))}

                    {((page === "login") ? (
                            <section className="headerButtons">
                                <button onClick={()=>setPage("mainPage")}>
                                    Main Page
                                </button>
                            </section>
                    ) : (
                        <></>))}


                </>}

                    <div className="headerButtons">
                        {(loggedUser && page!=='userProfile')  ? (<button onClick={()=>setPage("aboutMe")}>
                            {/*<p>{loggedUser.nick}</p>*/}
                            <LoadImage imageName={loggedUser.userPhoto || 'user.png'}
                                       imagePath='images/users'
                                       photoClass="header_photo"
                            />
                        </button>):(<></>)}
                        {(loggedUser && page!=='userProfile') ?    <button onClick={()=>setPage("userProfile")}>
                            USER PROFILE
                        </button> : <></>}
                        {loggedUser ? <button onClick={()=>{
                            setLoggedUser();
                            googleLogout();
                            setPage("mainPage");
                        }}> Logout
                        </button> : <button onClick={()=>setPage("login")}>
                            LOGIN </button>}
                        <img src={logourl} className={`header_logo logo_${displayStyles}`} />
                    </div>

            </div>
        </header>
    );
}

export default Header;