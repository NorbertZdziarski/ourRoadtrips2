import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";

function Header() {
    const page = useStoreState(state => state.page);
    const setPage = useStoreActions(actions => actions.setPage);

    return (
        <header className="underConstruction">
            <p >logo</p>

            {(page === "userProfile" ? (
                <div className="underConstruction">
                    <section>
                        <button onClick={()=>setPage("mainPage")}>
                            Main Page
                        </button>
                        <button onClick={()=>setPage("addTrip")}>
                            Add trip
                        </button>
                        <button onClick={()=>setPage("addCar")}>
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
                </div>))}
        </header>
    );
}

export default Header;``