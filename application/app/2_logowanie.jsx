import React, { useState } from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData, transferData} from "./a_CRUD_service";
import { GoogleLogin, GoogleUser } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import {getInitialFormData} from "./getInitialFormData";
import {checkIfItExists} from "./app_check";
require('dotenv').config();
function Login() {
    const setPage = useStoreActions(actions => actions.setPage);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const [userName, setUserName] = useState()
    const [userPassword, setUserPassword] = useState()
    const [fetchError, setFetchError] = useState()

    const clientId = process.env.CLIENT_ID || '';

    const displayStyles = useStoreState(state => state.displayStyles);

    async function createUser(data) {
        let user = data.name;
        console.log('funckja async - brak użytkownika o takim ID, zakładam nowe konto.');

        await checkIfItExists(user).then((r)=>{
            console.log('tymczaowa wynik: ' + r)
            if (r) user+= new Date();
        })


        let saveData = {};
        // saveData = getInitialFormData('user','');

        saveData = {
            googleId: data.sub,
            nick: user || data.sub,
            firstName: data.name || '',
            lastName: data.family_name || '',
            userPersonalComment: data.locale ||'',
            email: data.email || '',
            userPhoto: data.picture || '',
            userDescription: '',
            dateOfAccountCreation: new Date(),
            cars: []
        }

        console.log('save data: ' + saveData)
        console.log('JSON data: ' + JSON.stringify(saveData));

        await transferData(`user/add`, saveData);
        setLoggedUser(saveData);

    }

    const handleLogin = async (e) => {
        e.preventDefault()
// funkcja logowania przy logowaniu za pomocą email - moje logowanie.
        const target = `?user=${encodeURIComponent(userName)}&password=${encodeURIComponent(userPassword)}`
        await fetchData('login' + target).then(downloadedData => {
            if (!downloadedData) {
                setFetchError('wrong password or login');
            } else {
                console.log(downloadedData)
                setLoggedUser(downloadedData)
                setPage("mainPage")
            }
        });
    };

    const handleSuccess = async (response) => {
        const decodedToken = jwtDecode(response.credential);

        let sendData = { googleId: decodedToken.sub }
        await transferData('gle',sendData)
            .then((downloadedData)=>{
                console.log('udało się pobrać dane googleID')
                if (downloadedData) {
                    if (downloadedData === 'noUser') {
                        console.log('brak użytkownika o takim ID, zakładam nowe konto.')
                        createUser(decodedToken);
                        setPage("mainPage")
                    } else {
                        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~')

                        console.log(downloadedData)
                        setLoggedUser(downloadedData)
                        setPage("mainPage")
                    }

                } else {
                    console.log('błąd.')
                }
        })
            .catch((err)=>{
                console.log('błąd pobierania danych google ID: ' + err)
            });

    };

    const handleFailure = (response) => {
        console.log('Logowanie nie powiodło się:', response);
    };

    return (
        <div className="layout_main layout_flex-sb login_main">
            <div className={`login_box colorStyle_input_${displayStyles}`}>
                {fetchError ? <p className={`login_error colorStyle_error_${displayStyles}`}>{fetchError}</p> : <></>}
                <form >
                    <input placeholder='login' type="text" name="inputUserName" className={`login_input colorStyle_inputLogin_${displayStyles}`} value={userName}
                           onChange={(e) => setUserName(e.target.value)}></input>
                    <input  placeholder='password' type="password" name="inputUserPassword" className={`login_input colorStyle_inputLogin_${displayStyles}`} value={userPassword}
                           onChange={(e) => setUserPassword(e.target.value)}></input>
                <div className={`login_buttons colorstyle_button_${displayStyles}`}>
                    <button onClick={handleLogin} className="main_button "> Login </button>
                    <button onClick={()=>setPage("mainPage")} className="main_button "> Cancel </button>

                </div>
                </form>

                <div className="login_newaccount">
                    <button onClick={()=>setPage("editUserData")} className={` button-important colorStyle_btn_important_${displayStyles} `}> Create an account </button>
                    <div className="login_newaccount">
                        <GoogleLogin
                            clientId={clientId}
                            onSuccess={handleSuccess}
                            onFailure={handleFailure}
                        />

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Login;
