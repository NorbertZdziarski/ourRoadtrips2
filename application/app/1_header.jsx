import React, {useEffect} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";

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
            <div className="underConstruction mainViewStyle">
                <p >logo {page}</p>

                {(page === "userProfile" ? (
                    <div className="">
                        <section>
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
                        <button onClick={()=>{
                            setLoggedUser();
                            setPage("mainPage");

                        }}>
                        Log Out
                        </button>
                    </div>
                ) : (
                    <></>))}
                {(((page === "mainPage") || (page === "aboutUs") || (page === "showTrip") || (page === "mainPageFilter"))? (
                    <div className="">
                        <section>
                            <button onClick={()=>setPage("mainPage")}>
                                Main Page
                            </button>
                            <button onClick={()=>setDataFilter([true,'all','all','all'])}>
                                Filter
                            </button>
                            <button onClick={()=>setPage("aboutUs")} disabled>
                                About Us
                            </button>
                        </section>
                        {loggedUser ? <button onClick={()=>setPage("userProfile")}>
                            USER PROFILE
                        </button> : <button onClick={()=>setPage("login")}>
                            LOGIN
                        </button>}
                    </div>
                ) : ( <></>
                   ))}
                {(((page === "editUserData") || (page === "addCar") || (page === "addTrip") ) ? (
                    <div className="underConstruction">
                        <section>
                            <button onClick={()=>setPage("mainPage")}>
                                Main Page
                            </button>
                            <button onClick={()=>setPage("userProfile")}>
                                USER PROFILE
                            </button>
                        </section>
                        <button onClick={()=>setPage("mainPage")}>
                            Log Out
                        </button>
                    </div>
                ) : (
                    <></>))}
                <div className="">
                    {loggedUser ? (<p>{loggedUser.nick}</p>):(<p>not logged</p>)}
                </div>
            </div>
        </header>
    );
}

export default Header;