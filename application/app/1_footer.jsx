import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {Link} from "react-router-dom";

function Footer() {

    const displayStyles = useStoreState(state => state.displayStyles);
    const setPage = useStoreActions(actions => actions.setPage);
    const d = new Date()
    let year = d.getFullYear();
    return (<footer className="footerWindowStyle footer_underconstruction">
            <div className={`layout_main layout_gridAuto footerStyle colorStyle_footer_${displayStyles}`}>
                {(window.innerWidth > 950) ? <p>(C) {year} Norbert Zdziarski. 1701-12-14</p> : null}
                <Link to="/aboutus" className="myLink" onClick={() => {setPage("mainPage")}}> about project </Link>

                {(window.innerWidth > 950) ? <p>! Site under construction ! </p> : null}
            </div>
        </footer>
    );
}

export default Footer;