import React from 'react';

function Footer() {
    const d = new Date()
    let year = d.getFullYear();
    return (
        <footer className=" footerStyle ">
            <div className="underConstruction mainViewStyle">
                <p >(C) {year} Norbert Zdziarski. </p>
                <p>Site under construction. </p>
            </div>
        </footer>
    );
}

export default Footer;