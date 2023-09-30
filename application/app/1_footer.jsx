import React from 'react';

function Footer() {
    const d = new Date()
    let year = d.getFullYear();
    return (
        <footer className="footer mainfont">
            <p >(C) {year} fjghdfjkghdfkj </p>
        </footer>
    );
}

export default Footer;