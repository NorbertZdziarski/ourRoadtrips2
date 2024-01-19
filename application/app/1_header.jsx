import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useStoreActions, useStoreState} from "easy-peasy";
import {googleLogout} from '@react-oauth/google';
import DataFilter from "./4_filter";
import LoadImage from "./a_loadimage";
import DataSort from "./4_sort";
import logourl from "../images/logo_m.png";
import icotheme from "../images/color-palette_6591234.png";
import icomenu from "../images/menu.png";
import icomap from "../images/map.png";
import icolist from "../images/list_tasks_to_do_list_icon_233416.png";
import icohome from "../images/home_house_icon_143764.png";
import icogroup from "../images/people.png";
import icocars from "../images/cars.png";
import icoenvelope from "../images/envelope.png";
import arrowup from "../images/up-arrow_icon-icons.com_73351.png";
import { Link } from "react-router-dom";
import FilterStaus from "./4_filterStatus";
import {fetchData, transferData} from "./a_CRUD_service";
import InsertIco from "./5_ico";
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
    const pageExclusion = ["aboutus", "showtrip", "showcar", "map", "aboutme", "login", "addtrip", "addcar", "addgroup", "admin", "edituserdata", "showgroup", "groups" , "cars", "post" ,"useradmingroup","useradmingroup-edit"]
    const location = useLocation();
        React.useEffect(() => {
            // console.log('Zmiana URL', location);
            const firstPartOfPath = location.pathname.split('/')[1].toLowerCase();
            // console.log('pierwsza część: ', firstPartOfPath);
            if (firstPartOfPath === "") {setNewPage("mainpage")} else {setNewPage(firstPartOfPath)}
            if (!loggedUser && (firstPartOfPath === "userpanel" || firstPartOfPath === "userprofile" ||  firstPartOfPath === "addcar" || firstPartOfPath === "addtrip" || firstPartOfPath === "addgroup" || firstPartOfPath === "post")) {
                // console.log('>> header - path: ' + firstPartOfPath)
                navigate('/');
            }
        }, [location]);

        useEffect(()=>{
        if (filterBarStatus === 'status' && window.innerWidth < 950) setFilterBar(false)
            // console.log(' ! HEADER CHECK ! ')
            // console.log('screenWidth ' + screenWidth)
            // console.log('moblieMenuClass ' + moblieMenuClass)
            // console.log('filterBar ' + filterBar)
            // console.log('filterBarStatus ' + filterBarStatus)

        },[screenWidth, moblieMenuClass, filterBar, filterBarStatus])


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

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            if (window.innerWidth >= 950) {
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

    return (<>
            <header className={`headerStyle${moblieMenuClass} fnt_btn_header`}>
                <div className={` layout_flex-sb layout_mainViewWidth colorStyle_headerBtn_${displayStyles}`}>
                    {(screenWidth < 950) && (moblieMenuClass === '') && (!pageExclusion.includes(page)) ? <>
                        <button onClick={() => openMenu()}>
                            <img src={icomenu} className={`header_ico ico_${displayStyles}`}/>
                        </button>
                    </> : <>
                        {(((page === "mainpage") || (page === "mainpagefilter")) ? (
                            <section className={`headerButtons${moblieMenuClass} `}>

                           {((page !== "mainpage") && (page !== "map")) ?<>

                               {/*|| (page === "aboutus") || (page === "showtrip") || (page === "showcar") || (page === "map")*/}
                               <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>
                                   {/*<InsertIco icoName={'icohome'} />*/}
                                   <img src={icohome} className={`header_ico ico_${displayStyles}`}/>
                               </Link>

                               </> : <>


                            {/*{(dataFilter[0]) ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}
                            {/*{((dataSortOn) && (page !=="map")) ? <DataSort setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}

                                   {((!dataSortOn) || (!dataFilter[0])) ? <>
                                       <div className={'layout_flex-sb'}>
                                           { (page === "map") ?
                                               <Link to="/"  className="myLink" >
                                                   <img src={icolist} className={`header_ico ico_${displayStyles}`}/>
                                               </Link>
                                               :
                                               <Link to="/map"  className="myLink" >
                                                   <img src={icomap} className={`header_ico ico_${displayStyles}`}/>
                                               </Link>

                                           }
                                           <Link to="/groups" className="myLink" onClick={() => {
                                               setMoblieMenuClass('')
                                               setPage("mainpage")
                                           }}>
                                                <img src={icogroup} className={`header_ico ico_${displayStyles}`}/>
                                           </Link>

                                           <Link to="/cars" className="myLink" onClick={() => {
                                               setMoblieMenuClass('')
                                               setPage("mainpage")
                                           }}>
                                                <img src={icocars} className={`header_ico ico_${displayStyles}`}/>
                                           </Link>
                                           {(moblieMenuClass === '_mobile')? <Link to="/"  onClick={() => {
                                               setMoblieMenuClass('')
                                               setPage("mainpage")}}>
                                               <img src={logourl} className={`header_ico logo_${displayStyles}`}/>
                                           </Link>:null}

                                       </div>
                                       <button  onClick={() => {
                                           setMoblieMenuClass('')
                                           setDataFilter([true, 'all', 'all', 'all'])
                                           if (filterBar) {
                                               setFilterBar(false)
                                               setDataFilter([false, 'all', 'all', 'all'])
                                           } else {
                                               setFilterBar(true)
                                               setDataFilter([true, 'all', 'all', 'all'])
                                           }

                                            }}>
                                           Filter
                                       </button>
                                       {(page !=="map") ?<> <button onClick={() => {
                                           setMoblieMenuClass('')
                                           if (filterBar) {setFilterBar(false)} else {setFilterBar(true)}s
                                           setDataSortOn(true)}}>
                                            Sort / {tripSort}
                                            </button>
                                           </>: <></>}

                                        {(moblieMenuClass === '') ? (<></>) : (
                                          <button onClick={() => setMoblieMenuClass('')}>
                                              <img src={arrowup} className={`header_ico ico_${displayStyles}`}/>
                                         </button>
                                   )}
                                   </> : <></>}

                                </>}

                            </section>

                        ) : (<></>))}

                        {(page === "userprofile") ? (
                            <section className={`headerButtons${moblieMenuClass} colorStyle_headerBtn_${displayStyles}`}>
                                <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>
                                    <img src={icohome} className={`header_ico ico_${displayStyles}`}/>
                                </Link>
                                <Link to="/addtrip" className="myLink" onClick={() => {
                                    setMoblieMenuClass('')
                                    setDataId(''); setPage("addtrip")}}> Add trip </Link>
                                <Link to="/addcar" className="myLink" onClick={() => {
                                    setMoblieMenuClass('')
                                    setDataId(''); setPage("addcar")}}> Add Car </Link>
                                <Link to="/addgroup" className="myLink" onClick={() => {
                                    setMoblieMenuClass('')
                                    setDataId(''); setPage("addgroup")}}> Add Group </Link>
                                <Link to="/admin" className="myLink" onClick={() => {
                                    setMoblieMenuClass('')
                                    setDataId(''); setPage("admin")}}> Admin panel </Link>
                                <Link to="/edituserdata" className="myLink" onClick={() => {setPage("edituserdata")}}> Edit User Data </Link>

                                {(moblieMenuClass === '') ? (<></>) : (
                                    <button onClick={() => setMoblieMenuClass('')}>
                                        <img src={arrowup} className={`header_ico ico_${displayStyles}`}/>
                                    </button>
                                )}
                            </section>
                        ) : (
                            <></>)}

                        {((pageExclusion.includes(page)) ? (
                            <section className={`headerButtons${moblieMenuClass} colorStyle_headerBtn_${displayStyles}`}>
                                <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>
                                    <img src={icohome} className={`header_ico ico_${displayStyles}`}/>
                                </Link>
                                <button onClick={() => navigate(-1)}>
                                    Back
                                </button>
                                {(moblieMenuClass === '') ? (<></>) : (

                                    <button onClick={() => setMoblieMenuClass('')}>
                                        <img src={arrowup} className={`header_ico ico_${displayStyles}`}/>
                                    </button>
                                )}
                            </section>
                        ) : (
                            <></>))}

                        {/*{(((page === "aboutme") || (page === "groups")  || (page === "showgroup")) ? (*/}
                        {/*    <section className={`headerButtons${moblieMenuClass} colorStyle_headerBtn_${displayStyles}`}>*/}
                        {/*        <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>*/}
                        {/*            <img src={icohome} className={`header_ico ico_${displayStyles}`}/>*/}
                        {/*        </Link>*/}
                        {/*        <button onClick={() => navigate(-1)}>*/}
                        {/*            Back*/}
                        {/*        </button>*/}
                        {/*        {(moblieMenuClass === '') ? (<></>) : (*/}

                        {/*            <button onClick={() => setMoblieMenuClass('')}>*/}
                        {/*                hide*/}
                        {/*            </button>*/}
                        {/*        )}*/}
                        {/*    </section>*/}
                        {/*) : (*/}
                        {/*    <></>))}*/}

                        {/*{((page === "login") ? (*/}
                        {/*    <section className={`headerButtons${moblieMenuClass} colorStyle_headerBtn_${displayStyles}`}>*/}
                        {/*        <Link to="/" className="myLink" onClick={() => {setPage("mainpage")}}>*/}
                        {/*            <img src={icohome} className={`header_ico ico_${displayStyles}`}/>*/}
                        {/*        </Link>*/}
                        {/*        <button onClick={() => navigate(-1)}>*/}
                        {/*            Back*/}
                        {/*        </button>*/}
                        {/*        {(moblieMenuClass === '') ? (<></>) : (*/}

                        {/*            <button onClick={() => setMoblieMenuClass('')}>*/}
                        {/*                hide*/}
                        {/*            </button>*/}
                        {/*        )}*/}
                        {/*    </section>*/}
                        {/*) : (*/}
                        {/*    <></>))}*/}


                    </>}
                    {(moblieMenuClass === '') ? (

                        <div className={`headerButtons${moblieMenuClass} `}>

                            {newMessage ? <>
                                    <Link to={`/post`} className="myLink" onClick={() => {setPage("post")}}>
                                        <img src={icoenvelope} className={`header_ico ico_${displayStyles}`}/>
                                    </Link>
                                </> : <></>}
                            {(loggedUser && page !== 'userprofile') ?<>
                                {/*<Link to={`/userprofile`} className="myLink" onClick={() => {setPage("userprofile")}}>*/}

                                {/*</Link>*/}
                                <button onClick={()=>{
                                    setFilterBarStatus("settings");
                                    setFilterBar(!filterBar);

                                }}> <LoadImage imageName={loggedUser.userPhoto || 'user.png'}
                                               imagePath='images/users'
                                               photoClass="header_photo"
                                /></button>
                            </> : <></>}

                            {!loggedUser ?<> <Link to="/login" className="myLink" onClick={() => {setPage("login")}}> LOGIN </Link></> : <></>}
                            {/*{(page === 'userprofile') ? <button onClick={() => {*/}
                            {/*    setLoggedUser();*/}
                            {/*    googleLogout();*/}
                            {/*    setPage("mainPage");*/}
                            {/*}}> Logout*/}
                            {/*</button> : <></>}*/}
                            {(!loggedUser ?
                                <button onClick={() => {
                                if (displayStyles === 'dark') {
                                    setDisplayStyles('light')
                                } else {
                                    setDisplayStyles('dark')
                                }
                            }}>
                                <img src={icotheme} className={`header_ico ico_${displayStyles}`}/>
                            </button> : null )}
                        </div>) : (<></>)}


                </div>
                {(moblieMenuClass !== '_mobile')? <Link to="/"  onClick={() => {setPage("mainpage")}}>
                    <img src={logourl} className={`header_logo logo_${displayStyles}`}/>
                </Link> : null }
            </header>
            <div className={`subHeader_${displayStyles}`}>

            </div>

            <div className={`headerMenu_filter-bar ${filterBar ? 'show' : 'hide'}`}>

                {/*{(dataFilter[0]) ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}
                {/*{((dataSortOn) && (page !=="map")) ? <DataSort setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}

                {filterBarStatus === 'filter' ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/>:<></>}
                {filterBarStatus === 'sort' ? <DataSort setMoblieMenuClass={setMoblieMenuClass}/>:<></>}
                {(filterBarStatus === 'status' && window.innerWidth > 950) ? <FilterStaus setFilterBar={setFilterBar}/> :<></>}

                {filterBarStatus === 'settings' ?
                    <div className={'underHeader_settings'}>
                        {(loggedUser && page !== 'userprofile') ?<>
                            <Link to={`/userprofile`} className="myLink" onClick={() => {
                                setFilterBar(!filterBar);
                                setPage("userprofile");}}>
                        <p>user panel</p>
                            </Link>
                        </> : <></>}
                        <button disabled>yours groups</button>
                        {/*<button disabled>admin panel</button>*/}
                        <Link to={`/useradmingroup`} className="myLink" onClick={() => {
                            setFilterBar(!filterBar);
                            // setPage("post")
                        }}>
                            <p>admin panel</p></Link>

                        <Link to={`/post`} className="myLink" onClick={() => {
                            setFilterBar(!filterBar);
                            setPage("post")}}>
                        <p>post</p></Link>
                        <button onClick={() => {
                            if (displayStyles === 'dark') {
                                setDisplayStyles('light')
                            } else {
                                setDisplayStyles('dark')
                            }
                        }}>
                            <img src={icotheme} className={`header_ico ico_${displayStyles} style_separate`}/>
                        </button>
                        <button onClick={() => {
                            setLoggedUser();
                            googleLogout();
                            setFilterBar(!filterBar);
                            setPage("mainPage");
                        }}> Logout
                        </button>
                        {/*{newMessage ? <>*/}
                        {/*    */}
                        {/*        <img src={icoenvelope} className={`header_ico ico_${displayStyles}`}/>*/}
                        {/*    */}
                        {/*</> : <></>}*/}

                                {/*<LoadImage imageName={loggedUser.userPhoto || 'user.png'}*/}
                                {/*           imagePath='images/users'*/}
                                {/*           photoClass="header_photo"*/}
                                {/*/>*/}


                    {/*    {!loggedUser ?<> <Link to="/login" className="myLink" onClick={() => {setPage("login")}}> LOGIN </Link></> : <></>}*/}
                    {/*    {(page === 'userprofile') ? <button onClick={() => {*/}
                    {/*        setLoggedUser();*/}
                    {/*        googleLogout();*/}
                    {/*        setPage("mainPage");*/}
                    {/*    }}> Logout*/}
                    {/*</button> : <></>}*/}


                    {/*<button onClick={()=>setFilterBar(!filterBar)}> HIDE </button>*/}
                </div>:<></>}
            </div>

        </>
    );
}

export default Header;