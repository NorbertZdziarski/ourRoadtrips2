import React from 'react';
import {useStoreActions} from "easy-peasy";

function Footer() {
    const setPage = useStoreActions(actions => actions.setPage);
    const d = new Date()
    let year = d.getFullYear();
    return (
        <footer className=" footerStyle ">
            <div className="underConstruction mainViewStyle">
                <p >(C) {year} Norbert Zdziarski. </p>
                <button onClick={()=>setPage("aboutUs")} disabled>
                    about project
                </button>
                <p>Site under construction. </p>
            </div>
        </footer>
    );
}

export default Footer;