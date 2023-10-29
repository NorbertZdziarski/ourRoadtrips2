import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/app';
import {StoreProvider} from "easy-peasy";
import store from "./app/store.js";

const resizeOps = () => {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
};
resizeOps();
window.addEventListener("resize", resizeOps);

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <StoreProvider store={store}>
                <App />
            </StoreProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
