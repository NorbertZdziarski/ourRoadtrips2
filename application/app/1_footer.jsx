import React from 'react';

function Footer() {
    const d = new Date()
    let year = d.getFullYear();
    return (
        <footer className="footerStyle underConstruction">
            <p >(C) {year} Norbert Zdziarski. Site under construction. </p>
        </footer>
    );
}

export default Footer;