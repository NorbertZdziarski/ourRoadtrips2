import React from 'react';

function Footer() {
    const d = new Date()
    let year = d.getFullYear();
    return (
        <footer className="underConstruction">
            <p >(C) {year} _-_ </p>
        </footer>
    );
}

export default Footer;