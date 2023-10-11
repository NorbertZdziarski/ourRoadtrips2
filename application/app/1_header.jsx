import React, {useEffect} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";

function Header() {
    const page = useStoreState(state => state.page);
    const setPage = useStoreActions(actions => actions.setPage);
    const loggedUser = useStoreState(state => state.loggedUser);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const setDataId = useStoreActions(actions => actions.setDataId);

    let userId = '651fe6702b474d23c7d1b616'

    useEffect(() => {
        const target = `user/${userId}`
        fetchData(target).then(downloadedData => {
            setLoggedUser(downloadedData[0])
        });
    }, []);



    return (
        <header className="underConstruction">
            <p >logo {page}</p>

            {(page === "userProfile" ? (
                <div className="underConstruction">
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
                    <button onClick={()=>setPage("mainPage")}>
                    Log Out
                    </button>
                </div>
            ) : (
                <></>))}
            {(((page === "mainPage") || (page === "aboutUs") || (page === "showTrip") || (page === "mainPageFilter"))? (
                <div className="underConstruction">
                    <section>
                        <button onClick={()=>setPage("mainPage")}>
                            Main Page
                        </button>
                        <button onClick={()=>setPage("mainPageFilter")}>
                            Filter
                        </button>
                        <button onClick={()=>setPage("aboutUs")}>
                            About Us
                        </button>
                    </section>
                    <button onClick={()=>setPage("userProfile")}>
                        USER PROFILE
                    </button>
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
            <div className="underConstruction">
                {loggedUser ? (<p>{loggedUser.nick}</p>):(<p>not logged</p>)}
            </div>
        </header>
    );
}

export default Header;