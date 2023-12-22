import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {googleLogout} from '@react-oauth/google';
import DataFilter from "./3_filter";
import LoadImage from "./a_loadimage";
import DataSort from "./4_sort";
import logourl from "../images/logo_m.png";
import icotheme from "../images/color-palette_6591234.png";
import { Link } from "react-router-dom";

function Header() {
    const page = useStoreState(state => state.page);
    const setPage = useStoreActions(actions => actions.setPage);
    const loggedUser = useStoreState(state => state.loggedUser);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const setDataId = useStoreActions(actions => actions.setDataId);
    const setDataFilter = useStoreActions(actions => actions.setDataFilter);
    const displayStyles = useStoreState(state => state.displayStyles);
    const setDisplayStyles = useStoreActions(actions => actions.setDisplayStyles);
    const dataFilter = useStoreState(state => state.dataFilter);
    const dataSortOn = useStoreState(state => state.dataSortOn);
    const setDataSortOn = useStoreActions(actions => actions.setDataSortOn);
    const [screenWidth, setScreenWidth] = useState();
    const [moblieMenuClass, setMoblieMenuClass] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            if (window.innerWidth >= 950) {
                console.log('screenWidth >= 950');
                setMoblieMenuClass('');
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    function openMenu() {
        if (moblieMenuClass === '') {
            console.log('bla bla bla');
            setMoblieMenuClass('_mobile');
        } else {
            setMoblieMenuClass('');
        }
    }
    return (<>
            <header className={`headerStyle${moblieMenuClass} colorStyle_headerBtn_${displayStyles} `}>
                <div className={` layout_flex-sb layout_mainViewWidth`}>
                    {(screenWidth < 950) && (moblieMenuClass === '') ? <>
                        <button onClick={() => openMenu()}>
                            =
                        </button>
                    </> : <>
                        {(((page === "mainPage") || (page === "aboutUs") || (page === "showTrip") || (page === "showcar") || (page === "mainPageFilter")) ? (
                            <section className={`headerButtons${moblieMenuClass}`}>
                                {page !== "mainPage" ? <Link to="/"> Main Page </Link> : <>
                                    {(dataFilter[0]) ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/> : <></>}
                                    {(dataSortOn) ? <DataSort setMoblieMenuClass={setMoblieMenuClass}/> : <></>}

                                    {((!dataSortOn) && (!dataFilter[0])) ? <>
                                        <button onClick={() => setDataFilter([true, 'all', 'all', 'all'])}>
                                            Filter
                                        </button>
                                        <button onClick={() => setDataSortOn(true)}>
                                            Sort
                                        </button>
                                        {(page === "mainPage") ?
                                            <Link to="/map"> Map </Link> : <button disabled>
                                                List
                                            </button>
                                        }
                                        {(moblieMenuClass === '') ? (<></>) : (

                                            <button onClick={() => setMoblieMenuClass('')}>
                                                cancel
                                            </button>
                                        )}
                                        {/*<button disabled onClick={()=>setPage("tymczasowe")}>*/}
                                        {/*    tymczasowe*/}
                                        {/*</button>*/}
                                    </> : <></>}

                                </>}
                            </section>

                        ) : (<></>))}

                        {(page === "userProfile") ? (
                            <section className={`headerButtons${moblieMenuClass}`}>
                                <Link to="/"> Main Page </Link>
                                <button onClick={() => {
                                    setDataId('')
                                    setPage("addTrip")
                                }}>
                                    Add trip
                                </button>
                                <button onClick={() => {
                                    setDataId('')
                                    setPage("addCar")
                                }
                                }>
                                    Add car
                                </button>
                                <button onClick={() => setPage("editUserData")}>
                                    Edit User Data
                                </button>
                                {(moblieMenuClass === '') ? (<></>) : (

                                    <button onClick={() => setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                        ) : (
                            <></>)}

                        {(((page === "editUserData") || (page === "addCar") || (page === "addTrip")) ? (
                            <section className={`headerButtons${moblieMenuClass}`}>
                                <Link to="/"> Main Page </Link>
                                {(moblieMenuClass === '') ? (<></>) : (

                                    <button onClick={() => setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                        ) : (
                            <></>))}

                        {((page === "aboutMe") ? (
                            <section className={`headerButtons${moblieMenuClass}`}>
                                <Link to="/"> Main Page </Link>
                                <button onClick={() => {
                                    setPage("showTrip")
                                }}>
                                    Back
                                </button>
                                {(moblieMenuClass === '') ? (<></>) : (

                                    <button onClick={() => setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                        ) : (
                            <></>))}

                        {((page === "login") ? (
                            <section className="headerButtons">
                                <Link to="/"> Main Page </Link>
                                {(moblieMenuClass === '') ? (<></>) : (

                                    <button onClick={() => setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                        ) : (
                            <></>))}


                    </>}
                    {(moblieMenuClass === '') ? (

                        <div className={`headerButtons${moblieMenuClass}`}>

                            {/*{(loggedUser && page!=='userProfile')  ? (<button onClick={()=>setPage("aboutMe")}>*/}
                            {/*    /!*<p>{loggedUser.nick}</p>*!/*/}
                            {/*    <LoadImage imageName={loggedUser.userPhoto || 'user.png'}*/}
                            {/*               imagePath='images/users'*/}
                            {/*               photoClass="header_photo"*/}
                            {/*    />*/}
                            {/*</button>):(<></>)}*/}
                            {(loggedUser && page !== 'userProfile') ?<> <button onClick={() => setPage("userProfile")}>
                                <LoadImage imageName={loggedUser.userPhoto || 'user.png'}
                                           imagePath='images/users'
                                           photoClass="header_photo"
                                />
                            </button></> : <></>}
                            {!loggedUser ?<> <Link to="/login"> -Login- </Link> <button onClick={() => setPage("login")}>
                                LOGIN </button> </> : <></>}
                            {(page === 'userProfile') ? <button onClick={() => {
                                setLoggedUser();
                                googleLogout();
                                setPage("mainPage");
                            }}> Logout
                            </button> : <></>}
                            <button onClick={() => {
                                if (displayStyles === 'dark') {
                                    setDisplayStyles('light')
                                } else {
                                    setDisplayStyles('dark')
                                }
                            }}>
                                <img src={icotheme} className={`header_ico ico_${displayStyles}`}/>
                            </button>
                            <button onClick={() => setPage("mainPage")}>
                                <img src={logourl} className={`header_logo logo_${displayStyles}`}/>
                            </button>
                        </div>) : (<></>)}


                </div>

            </header>
            <div className={`subHeader_${displayStyles}`}>

            </div>
        </>
    );
}

export default Header;