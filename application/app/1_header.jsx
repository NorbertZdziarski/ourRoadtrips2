import React, {useEffect} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";
import DataFilter from "./3_filter";

function Header() {
    const page = useStoreState(state => state.page);
    const setPage = useStoreActions(actions => actions.setPage);
    const loggedUser = useStoreState(state => state.loggedUser);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const setDataId = useStoreActions(actions => actions.setDataId);
    const setDataFilter = useStoreActions(actions => actions.setDataFilter);
    const dataFilter = useStoreState(state => state.dataFilter);


    return (
        <header className="headerStyle ">
            <div className="mainViewStyle tymczasowy_header">


                {(((page === "mainPage") || (page === "aboutUs") || (page === "showTrip") || (page === "mainPageFilter"))? (

                        <section className="headerButtons ">
                            {page !== "mainPage" ? <button onClick={()=>setPage("mainPage")}>
                                Main Page
                            </button> : <>
                                {dataFilter[0] ? <DataFilter/> : <>
                                    <button onClick={()=>setDataFilter([true,'all','all','all'])}>
                                        Filter
                                    </button>
                                    <button disabled onClick={()=>setDataFilter([true,'all','all','all'])}>
                                        Sort
                                    </button>
                                </>}
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
                            <button onClick={()=>setPage("userProfile")}>
                                USER PROFILE
                            </button>
                        </section>
                ) : (
                    <></>))}

                {(((page === "aboutMe")) ? (
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




                <p >logo {page}</p>
                <div className="headerButtons">
                    {loggedUser ? (<p>{loggedUser.nick}</p>):(<p>not logged</p>)}
                    {loggedUser ?    <button onClick={()=>setPage("userProfile")}>
                        USER PROFILE
                    </button> : <></>}
                    {loggedUser ? <button onClick={()=>{
                        setLoggedUser();
                        setPage("mainPage");
                    }}> Log Out
                    </button> : <button onClick={()=>setPage("login")}>
                        LOGIN </button>}

                </div>

            </div>
        </header>
    );
}

export default Header;