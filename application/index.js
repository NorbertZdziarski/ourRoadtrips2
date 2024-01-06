import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/app';
import {StoreProvider} from "easy-peasy";
import store from "./app/store.js";
import { GoogleOAuthProvider } from '@react-oauth/google';

const resizeOps = () => {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
};
resizeOps();
window.addEventListener("resize", resizeOps);

ReactDOM.render(
    <GoogleOAuthProvider clientId="708085340019-karrgte5hed5fcobjn0ja6t8oitstagb.apps.googleusercontent.com">
        <React.StrictMode>

                <StoreProvider store={store}>
                    <App />
                </StoreProvider>

        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);
