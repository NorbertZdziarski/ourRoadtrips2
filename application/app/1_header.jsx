import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import { googleLogout } from '@react-oauth/google';

import DataFilter from "./3_filter";
import LoadImage from "./a_loadimage";
import DataSort from "./4_sort";
import logourl from "../images/logo_m.png"
import icotheme from "../images/color-palette_6591234.png"
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
    const setDisplayStyles = useStoreActions(actions => actions.setDisplayStyles);

    const dataFilter = useStoreState(state => state.dataFilter);
    const dataSortOn = useStoreState(state => state.dataSortOn);
    const setDataSortOn = useStoreActions(actions => actions.setDataSortOn);

    const [screenWidth, setScreenWidth] = useState();
    const [moblieMenuClass, setMoblieMenuClass] = useState('');

    // let moblieMenuClass = '';



    const resizeOps = () => {
        document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
        document.documentElement.style.setProperty("--vw", window.innerWidth * 0.01 + "px");

        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            if (window.innerWidth >= 950) {
                console.log('screenWidth >= 950');
                setMoblieMenuClass('');
            // } else {
            //     setMoblieMenuClass('_mobile'); // Zmień 'someOtherClass' na klasę, którą chcesz użyć, gdy screenWidth < 950
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Wywołaj funkcję handleResize od razu po dodaniu nasłuchiwacza, aby ustawić początkowy stan

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);


    // console.log('Header - screen: '+ screenWidth + " data sort: " + dataSortOn)

    function tymczasowa() {
        // await checkIfItExists('rom1').then((r)=>{
        //     console.log('tymczaowa wynik: ' + r)
        // })

    }

   function openMenu() {

        console.log(`[ 1 ] mobile menu class ${moblieMenuClass} | `)

        if (moblieMenuClass === '') {
            console.log('bla bla bla')
            setMoblieMenuClass('_mobile');
        }  else {setMoblieMenuClass('');}


        console.log(`[ 2 ] mobile menu class ${moblieMenuClass} |`)

   }

    // layout_main  tymczasowy_header

    console.log(`_ mobile menu class ${moblieMenuClass} | ${screenWidth}`)
    return (<>
        <header className={`headerStyle${moblieMenuClass} colorStyle_headerBtn_${displayStyles} `}>
            <div className={`layout_flex-sb`} >
                {(screenWidth < 950) && (moblieMenuClass === '') ? <>
                    <button onClick={()=>openMenu()}>
                        =
                    </button>

                </> : <>

                    {(((page === "mainPage") || (page === "aboutUs") || (page === "showTrip") || (page === "showcar") || (page === "mainPageFilter"))? (

                            <section className={`headerButtons${moblieMenuClass}`}>
                                {page !== "mainPage" ? <button onClick={()=>setPage("mainPage")}>
                                    Main Page
                                </button> : <>
                                    {(dataFilter[0] ) ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/> : <></>}
                                    {(dataSortOn) ? <DataSort setMoblieMenuClass={setMoblieMenuClass} />:<></>}

                                    {((!dataSortOn) && (!dataFilter[0])) ? <>
                                            <button onClick={()=>setDataFilter([true,'all','all','all'])}>
                                                Filter
                                            </button>
                                            <button onClick={()=>setDataSortOn(true)}>
                                                Sort
                                            </button>
                                            {(page === "mainPage") ?
                                                <button disabled onClick={()=>setPage("map")}>
                                                    Map
                                                </button> : <button disabled >
                                                    List
                                                </button>
                                            }
                                        {(moblieMenuClass === '')?(<></>):(

                                            <button onClick={()=>setMoblieMenuClass('')}>
                                                cancel
                                            </button>
                                        )}
                                            {/*<button disabled onClick={()=>setPage("tymczasowe")}>*/}
                                            {/*    tymczasowe*/}
                                            {/*</button>*/}
                                        </> : <></>}

                                </>}
                            </section>

                    ) : ( <></> ))}

                    {(page === "userProfile") ? (
                            <section className={`headerButtons${moblieMenuClass}`}>
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
                                {(moblieMenuClass === '')?(<></>):(

                                    <button onClick={()=>setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                    ) : (
                        <></>)}

                    {(((page === "editUserData") || (page === "addCar") || (page === "addTrip") ) ? (
                            <section className={`headerButtons${moblieMenuClass}`}>
                                <button onClick={()=>setPage("mainPage")}>
                                    Main Page
                                </button>
                                {(moblieMenuClass === '')?(<></>):(

                                    <button onClick={()=>setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                    ) : (
                        <></>))}

                    {((page === "aboutMe") ? (
                            <section className={`headerButtons${moblieMenuClass}`}>
                                <button onClick={()=>setPage("mainPage")}>
                                    Main Page
                                </button>
                                <button onClick={()=>{setPage("showTrip")}}>
                                    Back
                                </button>
                                {(moblieMenuClass === '')?(<></>):(

                                    <button onClick={()=>setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                    ) : (
                        <></>))}

                    {((page === "login") ? (
                            <section className="headerButtons">
                                <button onClick={()=>setPage("mainPage")}>
                                    Main Page
                                </button>
                                {(moblieMenuClass === '')?(<></>):(

                                    <button onClick={()=>setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                    ) : (
                        <></>))}


                </>}
                {(moblieMenuClass === '')?(

                    <div className={`headerButtons${moblieMenuClass}`}>

                        {/*{(loggedUser && page!=='userProfile')  ? (<button onClick={()=>setPage("aboutMe")}>*/}
                        {/*    /!*<p>{loggedUser.nick}</p>*!/*/}
                        {/*    <LoadImage imageName={loggedUser.userPhoto || 'user.png'}*/}
                        {/*               imagePath='images/users'*/}
                        {/*               photoClass="header_photo"*/}
                        {/*    />*/}
                        {/*</button>):(<></>)}*/}
                        {(loggedUser && page!=='userProfile') ?    <button onClick={()=>setPage("userProfile")}>
                            <LoadImage imageName={loggedUser.userPhoto || 'user.png'}
                                       imagePath='images/users'
                                       photoClass="header_photo"
                            />
                        </button> : <></>}
                        {!loggedUser ? <button onClick={()=>setPage("login")}>
                            LOGIN </button> : <></>}
                        {(page==='userProfile') ? <button onClick={()=>{
                            setLoggedUser();
                            googleLogout();
                            setPage("mainPage");
                        }}> Logout
                        </button> : <></>}
                        <button onClick={()=>{
                            if (displayStyles === 'dark') {setDisplayStyles('light')} else {setDisplayStyles('dark')}
                        }}>
                            <img src={icotheme} className={`header_ico ico_${displayStyles}`} />
                        </button>
                        <button onClick={()=>setPage("mainPage")}>
                            <img src={logourl} className={`header_logo logo_${displayStyles}`} />
                        </button>
                    </div>):(<></>)}


            </div>

        </header>
    <div className={`subHeader_${displayStyles}`}>

    </div>
    </>
    );
}

export default Header;