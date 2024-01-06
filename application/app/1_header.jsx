import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useStoreActions, useStoreState} from "easy-peasy";
import {googleLogout} from '@react-oauth/google';
import DataFilter from "./4_filter";
import LoadImage from "./a_loadimage";
import DataSort from "./4_sort";
import logourl from "../images/logo_m.png";
import icotheme from "../images/color-palette_6591234.png";
import icomap from "../images/map.png";
import icolist from "../images/list_tasks_to_do_list_icon_233416.png";
import icohome from "../images/home_house_icon_143764.png";
import { Link } from "react-router-dom";
import FilterStaus from "./4_filterStatus";
import {fetchData, transferData} from "./a_CRUD_service";

function Header() {
    const navigate = useNavigate();
    const [page, setNewPage] = useState('mainPage')
    // const page = useStoreState(state => state.page);
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
    const tripSort = useStoreState(state => state.tripSort);
    const [screenWidth, setScreenWidth] = useState();
    const [moblieMenuClass, setMoblieMenuClass] = useState('');
    const [filterBar, setFilterBar] = useState(false);
    const [filterBarStatus, setFilterBarStatus] = useState('status');
    const [newMessage, setNewMessage] = useState(false);

    const location = useLocation();
        React.useEffect(() => {
            // console.log('Zmiana URL', location);
            const firstPartOfPath = location.pathname.split('/')[1].toLowerCase();
            console.log('pierwsza część: ', firstPartOfPath);
            if (firstPartOfPath === "") {setNewPage("mainpage")} else {setNewPage(firstPartOfPath)}
            if (!loggedUser && (firstPartOfPath === "userpanel" || firstPartOfPath === "userprofile" ||  firstPartOfPath === "addcar" || firstPartOfPath === "addtrip" || firstPartOfPath === "addgroup")) {
                console.log('>> header - path: ' + firstPartOfPath)
                navigate('/');
            }
        }, [location]);

    useEffect(() => {

        if (loggedUser) {
            async function fetchDataaa() {
                let askForm = {receiverId: loggedUser._id};
                let response = await transferData(`message/find`, askForm);
                let data = response.id;
                if (data.length > 0) setNewMessage(true)
            }
            fetchDataaa();
        }
    }, [loggedUser]);



        // console.log(`Obecny URL: ${location.pathname}`);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setScreenWidth(window.innerWidth);
    //         if (window.innerWidth >= 950) {
    //             console.log('screenWidth >= 950');
    //             setMoblieMenuClass('');
    //         }
    //     }
    //     window.addEventListener('resize', handleResize);
    //     handleResize();
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);
    function openMenu() {
        if (moblieMenuClass === '') {
            console.log('bla bla bla');
            setMoblieMenuClass('_mobile');
        } else {
            setMoblieMenuClass('');
        }
    }

    useEffect(() => {

        if (dataSortOn && page !== "map") {
            setFilterBar(true);
            setFilterBarStatus('sort');
        } else {
            if (filterBarStatus === 'sort') {
                setFilterBar(false);
                setFilterBarStatus('status');
            }
        }
        if (dataFilter[0]) {
            setFilterBar(true);
            setFilterBarStatus('filter');
        } else {
            if (filterBarStatus === 'filter') {
                setFilterBar(false);
                setFilterBarStatus('status');
            }
        }
        if (dataFilter[1] !== 'all' || dataFilter[2] !== 'all' || dataFilter[3] !== 'all') {
            setFilterBar(true);
        }

    }, [dataFilter, dataSortOn, page]);

    // colorStyle_headerBtn_${displayStyles}

    return (<>
            <header className={`headerStyle${moblieMenuClass} fnt_btn_header`}>
                <div className={` layout_flex-sb layout_mainViewWidth colorStyle_headerBtn_${displayStyles}`}>
                    {(screenWidth < 950) && (moblieMenuClass === '') ? <>
                        <button onClick={() => openMenu()}>
                            =
                        </button>
                    </> : <>
                        {(((page === "mainpage") || (page === "aboutus") || (page === "showtrip") || (page === "showcar") || (page === "map") || (page === "mainpagefilter")) ? (
                            <section className={`headerButtons${moblieMenuClass} `}>

                           {((page !== "mainpage") && (page !== "map")) ?<>


                               <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>
                                   <img src={icohome} className={`header_ico ico_${displayStyles}`}/>
                               </Link>

                               </> : <>


                            {/*{(dataFilter[0]) ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}
                            {/*{((dataSortOn) && (page !=="map")) ? <DataSort setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}

                                   {((!dataSortOn) || (!dataFilter[0])) ? <>
                                       { (page === "map") ?
                                           // <Link to="/"  onClick={() => {setPage("mainPage")}}>
                                           //
                                           // </Link>
                                           <Link to="/"  className="myLink" >
                                               <img src={icolist} className={`header_ico ico_${displayStyles}`}/>
                                           </Link>
                                           :
                                           // <Link to="/"  onClick={() => {setPage("mainPage")}}>
                                           // <img src={ico} className={`header_logo logo_${displayStyles}`}/>
                                           // </Link>
                                           <Link to="/map"  className="myLink" >
                                               <img src={icomap} className={`header_ico ico_${displayStyles}`}/>
                                           </Link>
                                       }
                                       <button  onClick={() => setDataFilter([true, 'all', 'all', 'all'])}>
                                            Filter
                                            </button>
                                       {(page !=="map") ?<> <button onClick={() => setDataSortOn(true)}>
                                            Sort
                                            </button>
                                           <p> {tripSort}</p></>: <></>}





                                   {/* {(page === "mainPage") ?*/}
                                   {/*        <Link to="/map"  className="myLink" onClick={() => {setPage("mainPage")}}> Map </Link> : <button disabled>*/}
                                   {/*          List*/}
                                   {/*      </button>*/}
                                   {/*}*/}
                                        {(moblieMenuClass === '') ? (<></>) : (
                                          <button onClick={() => setMoblieMenuClass('')}>
                                              cancel
                                         </button>
                                   )}
                                      {/*<button disabled onClick={()=>setPage("tymczasowe")}>*/}
                                      {/* tymczasowe*/}
                                      {/* </button>*/}
                                   </> : <></>}

                                </>}
                            </section>

                        ) : (<></>))}

                        {(page === "userprofile") ? (
                            <section className={`headerButtons${moblieMenuClass} colorStyle_headerBtn_${displayStyles}`}>
                                <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>
                                    <img src={icohome} className={`header_ico ico_${displayStyles}`}/>
                                </Link>
                                <Link to="/addtrip" className="myLink" onClick={() => {setDataId(''); setPage("addtrip")}}> Add trip </Link>
                                <Link to="/addcar" className="myLink" onClick={() => {setDataId(''); setPage("addcar")}}> Add Car </Link>
                                <Link to="/addgroup" className="myLink" onClick={() => {setDataId(''); setPage("addgroup")}}> Add Group </Link>
                                <Link to="/admin" className="myLink" onClick={() => {setDataId(''); setPage("admin")}}> Admin panel </Link>
                                <Link to="/edituserdata" className="myLink" onClick={() => {setPage("edituserdata")}}> Edit User Data </Link>


                                {/*<button onClick={() => {*/}
                                {/*    */}
                                {/*}}>*/}
                                {/*    Add trip*/}
                                {/*</button>*/}
                                {/*<button onClick={() => {*/}
                                {/*    setDataId('')*/}
                                {/*    setPage("addCar")*/}
                                {/*}*/}
                                {/*}>*/}
                                {/*    Add car*/}
                                {/*</button>*/}
                                {/*<button onClick={() => setPage("editUserData")}>*/}
                                {/*    Edit User Data*/}
                                {/*</button>*/}
                                {(moblieMenuClass === '') ? (<></>) : (

                                    <button onClick={() => setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                        ) : (
                            <></>)}

                        {(((page === "edituserdata") || (page === "addcar") || (page === "addtrip")) ? (
                            <section className={`headerButtons${moblieMenuClass} colorStyle_headerBtn_${displayStyles}`}>
                                <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>
                                    <img src={icohome} className={`header_ico ico_${displayStyles}`}/>
                                </Link>
                                {(moblieMenuClass === '') ? (<></>) : (

                                    <button onClick={() => setMoblieMenuClass('')}>
                                        cancel
                                    </button>
                                )}
                            </section>
                        ) : (
                            <></>))}

                        {((page === "aboutme") ? (
                            <section className={`headerButtons${moblieMenuClass} colorStyle_headerBtn_${displayStyles}`}>
                                <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>
                                    <img src={icohome} className={`header_ico ico_${displayStyles}`}/>
                                </Link>
                                <button onClick={() => {
                                    setPage("showtrip")
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
                            <section className={`headerButtons${moblieMenuClass} colorStyle_headerBtn_${displayStyles}`}>
                                <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>
                                    <img src={icohome} className={`header_ico ico_${displayStyles}`}/>
                                </Link>
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

                        <div className={`headerButtons${moblieMenuClass} `}>

                            {newMessage ? <>
                                    <Link to={`/post`} className="myLink" onClick={() => {setPage("post")}}>
                                    new message!
                                    </Link>
                                </> : <></>}
                            {(loggedUser && page !== 'userprofile') ?<>
                                <Link to={`/userprofile`} className="myLink" onClick={() => {setPage("userprofile")}}>
                                <LoadImage imageName={loggedUser.userPhoto || 'user.png'}
                                           imagePath='images/users'
                                           photoClass="header_photo"
                                />
                                </Link>
                            </> : <></>}

                            {!loggedUser ?<> <Link to="/login" className="myLink" onClick={() => {setPage("login")}}> LOGIN </Link></> : <></>}
                            {(page === 'userprofile') ? <button onClick={() => {
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
                            {/*<button onClick={() => setPage("mainPage")}>*/}

                            {/*</button>*/}
                        </div>) : (<></>)}


                </div>
                <Link to="/"  onClick={() => {setPage("mainpage")}}>
                    <img src={logourl} className={`header_logo logo_${displayStyles}`}/>
                </Link>
                {/*<button onClick={() => setFilterBar(!filterBar)}>*/}
                {/*    Toggle Filter Bar*/}
                {/*</button>*/}
            </header>
            <div className={`subHeader_${displayStyles}`}>

            </div>

            <div className={`headerMenu_filter-bar ${filterBar ? 'show' : 'hide'}`}>

                {/*{(dataFilter[0]) ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}
                {/*{((dataSortOn) && (page !=="map")) ? <DataSort setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}

                {filterBarStatus === 'filter' ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/>:<></>}
                {filterBarStatus === 'sort' ? <DataSort setMoblieMenuClass={setMoblieMenuClass}/>:<></>}
                {filterBarStatus === 'status' ? <FilterStaus setFilterBar={setFilterBar}/> :<></>}
            </div>

        </>
    );
}

export default Header;