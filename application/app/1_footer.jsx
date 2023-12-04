import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";

function Footer() {
    const displayStyles = useStoreState(state => state.displayStyles);
    const setPage = useStoreActions(actions => actions.setPage);
    const d = new Date()
    let year = d.getFullYear();
    return (
        <footer className="mainWindowStyle  footer_underconstruction">
            <div className={`layout_main layout_flex-sb footerStyle colorStyle_footer_${displayStyles}`}>
                <p >(C) {year} Norbert Zdziarski. 12-4-9-24</p>
                <button onClick={()=>setPage("aboutUs")} disabled>
                    about project
                </button>
                <p>Site under construction. </p>
            </div>
        </footer>
    );
}

export default Footer;