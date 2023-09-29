import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/app';
import {StoreProvider} from "easy-peasy";
import store from "./warehouse/store.js";

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
