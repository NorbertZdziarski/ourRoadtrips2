import React from 'react';
import {useStoreActions} from "easy-peasy";

function Footer() {
    const setPage = useStoreActions(actions => actions.setPage);
    const d = new Date()
    let year = d.getFullYear();
    return (
        <footer className="mainWindowStyle  footer_underconstruction">
            <div className="layout_main layout_flex-sb footerStyle">
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