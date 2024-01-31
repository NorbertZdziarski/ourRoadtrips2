import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useStoreActions, useStoreState} from "easy-peasy";
import {googleLogout} from '@react-oauth/google';
import DataFilter from "./4_filter";
import LoadImage from "./a_loadimage";
import DataSort from "./4_sort";
import logourl from "../images/logo_m.png";
import icotheme from "../images/palette_FILL0_wght400_GRAD0_opsz24.svg";
import icomenu from "../images/menu_FILL0_wght400_GRAD0_opsz24.svg";
import icomap from "../images/map_FILL0_wght400_GRAD0_opsz24.svg";
import icolist from "../images/splitscreen_FILL0_wght400_GRAD0_opsz24.svg";
import icohome from "../images/home_FILL0_wght400_GRAD0_opsz24.svg";
import icogroup from "../images/groups_FILL0_wght400_GRAD0_opsz24.svg";
import icocars from "../images/cars.png";
import icoenvelope from "../images/mail_FILL0_wght400_GRAD0_opsz24.svg";
import arrowup from "../images/expand_less_FILL0_wght400_GRAD0_opsz24.svg";
import { Link } from "react-router-dom";
import FilterStaus from "./4_filterStatus";
import {fetchData, transferData} from "./a_CRUD_service";
import InsertIco from "./5_ico";
import {fetchMessages} from "./a_fetchMessages";
function Header() {
    const navigate = useNavigate();
    const [page, setNewPage] = useState('mainPage')

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
    const [filterBarStatus, setFilterBarStatus] = useState('filter');
    const [newMessage, setNewMessage] = useState(false);
    const [incommingMessages, setIncommingMessages] = useState(false);
    const [sendMessages, setSendMessages] = useState(false);

    const pageExclusion = ["aboutus", "showtrip", "showcar", "aboutme", "login", "addtrip", "addcar", "addgroup", "admin", "edituserdata", "showgroup", "post","useradmingroup" ,"useradmingroup-edit"]
    const location = useLocation();
        React.useEffect(() => {

            const firstPartOfPath = location.pathname.split('/')[1].toLowerCase();

            if (firstPartOfPath === "") {setNewPage("mainpage")} else {setNewPage(firstPartOfPath)}
            if (!loggedUser && (firstPartOfPath === "userpanel" || firstPartOfPath === "userprofile" ||  firstPartOfPath === "addcar" || firstPartOfPath === "addtrip" || firstPartOfPath === "addgroup" || firstPartOfPath === "post" || firstPartOfPath === "useradmingroup" || firstPartOfPath === "useradmingroup-edit")) {
                navigate('/');
            }
        }, [location]);

        useEffect(()=>{

            // console.log(' ! HEADER CHECK ! ')
            // console.log('page ' + page)
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
                // if (data.length > 0) setNewMessage(true)
            }
            fetchDataaa();
        }
    }, [loggedUser]);
        useEffect(()=>{
            if (incommingMessages) {
            let countMess = 0;
            incommingMessages.forEach((inmess)=>{
                if (inmess.readed === false)  {
                    countMess++;
                }
            })

            if (countMess > 0) {setNewMessage(true)} else {setNewMessage(false)}
            }
        },[incommingMessages])
    const checkMessage = () => {
        fetchMessages(loggedUser, setIncommingMessages, setSendMessages);
    };

    useEffect(() => {
        if (loggedUser) {


            const intervalId = setInterval(checkMessage, 20000);
            return () => clearInterval(intervalId);
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

        } else {
            if (filterBarStatus === 'sort') {
                setFilterBar(false);
               }
        }
        if (dataFilter[0]) {
            setFilterBar(true);

        } else {
            if (filterBarStatus === 'filter') {
                setFilterBar(false);

            }
        }
        if (dataFilter[1] !== 'all' || dataFilter[2] !== 'all' || dataFilter[3] !== 'all') {
            setFilterBar(true);
        }
        if ((filterBarStatus === 'filter') && (page !=="mainpage")) {

            setFilterBar(false);
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
                        {(((page === "mainpage") || (page === "mainpagefilter") || (page === "map")|| (page === "groups") || (page === "cars")) ? (
                            <section className={`headerButtons${moblieMenuClass} `}>

                                   {/*{((!dataSortOn) || (!dataFilter[0])) ? <>*/}
                                       <div className={'layout_flex-sb'}>

                                           <Link to="/"  className={`myLink ${page === "mainpage" && 'underlineStyle'}`} >
                                               <img src={icolist} className={`header_ico ico_${displayStyles} `}/>
                                           </Link>

                                           <Link to="/map"  className={`myLink ${page === "map" && 'underlineStyle'}`} >
                                               <img src={icomap} className={`header_ico ico_${displayStyles}`}/>
                                           </Link>

                                           <Link to="/groups" className={`myLink ${page === "groups" && 'underlineStyle'}`} onClick={() => {
                                               setMoblieMenuClass('')
                                               setPage("mainpage")
                                           }}>
                                                <img src={icogroup} className={`header_ico ico_${displayStyles}`}/>
                                           </Link>

                                           <Link to="/cars" className={`myLink ${page === "cars" && 'underlineStyle'}`} onClick={() => {
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
                                       {(page ==="mainpage" || page ==="map") ?
                                       <button  onClick={() => {
                                           setFilterBarStatus('filter')
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
                                       </button> : <></>}
                                       {(page !=="map") ?<> <button onClick={() => {
                                           setFilterBarStatus('sort')
                                           setMoblieMenuClass('')
                                           if (filterBar) {setFilterBar(false)} else {setDataSortOn(true); setFilterBar(true)}
                                           }}>
                                            Sort / {tripSort}
                                            </button>
                                           {/*</>: <></>}*/}

                                        {(moblieMenuClass === '') ? (<></>) : (
                                          <button onClick={() => setMoblieMenuClass('')}>
                                              <img src={arrowup} className={`header_ico ico_${displayStyles}`}/>
                                         </button>
                                   )}
                                   </> : <></>}


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
                                <Link to="/useradmingroup" className="myLink" onClick={() => {
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
            <div className={`subHeader_${displayStyles}`}></div>
            <div className={`headerMenu_filter-bar ${filterBar ? 'show' : 'hide'}`}>

                {/*{(dataFilter[0]) ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}
                {/*{((dataSortOn) && (page !=="map")) ? <DataSort setMoblieMenuClass={setMoblieMenuClass}/> : <></>}*/}

                {filterBarStatus === 'filter' ? <DataFilter setMoblieMenuClass={setMoblieMenuClass}/>:<></>}
                {filterBarStatus === 'sort' ? <DataSort setMoblieMenuClass={setMoblieMenuClass}/>:<></>}
                {/*{(filterBarStatus === 'status' && window.innerWidth > 950) ? <FilterStaus setFilterBar={setFilterBar}/> :<></>}*/}

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

                </div>:<></>}
            </div>
        </>
    );
}

export default Header;