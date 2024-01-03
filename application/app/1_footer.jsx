import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {Link} from "react-router-dom";

function Footer() {

    const displayStyles = useStoreState(state => state.displayStyles);
    const setPage = useStoreActions(actions => actions.setPage);
    const d = new Date()
    let year = d.getFullYear();
    return (

        <footer className="footerWindowStyle footer_underconstruction">
            <div className={`layout_main layout_flex-sb footerStyle colorStyle_footer_${displayStyles}`}>
                <p >(C) {year} Norbert Zdziarski. 401-03-13-11</p>
                <Link to="/aboutus" className="myLink" onClick={() => {setPage("mainPage")}}> about project </Link>

                <p>Site under construction. </p>
            </div>
        </footer>
    );
}

export default Footer;