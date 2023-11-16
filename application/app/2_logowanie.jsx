import React, { useState } from 'react';
import {useStoreActions} from "easy-peasy";
import {fetchData, transferData} from "./a_CRUD_service";
import { GoogleLogin, GoogleUser } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const setPage = useStoreActions(actions => actions.setPage);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const [userName, setUserName] = useState()
    const [userPassword, setUserPassword] = useState()
    const [fetchError, setFetchError] = useState()

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('user name: ' + userName);
        console.log();
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

        // zapytanie do serwera czy użytkownik o zadanym ID istnieje. Jeżeli tak - zwraca jego dane - jeżeli nie
        // system dodaje nowego użytkownika i wypełnia pozyskanymi od googla danymi

        console.log("User Name: ", decodedToken.name);
        console.log("User Email: ", decodedToken.email);
        console.log("Issued At: ", new Date(decodedToken.iat * 1000));
        console.log("Expiration Time: ", new Date(decodedToken.exp * 1000));
        console.log("User Profile Pic: ", decodedToken.picture);
        console.log("user ID: ", decodedToken.sub);
        console.log("Issuer: ", decodedToken.iss);
        console.log("Audience: ", decodedToken.aud);
        console.log("Authorized party: ", decodedToken.azp);
        console.log("Given Name: ", decodedToken.given_name);
        console.log("Locale: ", decodedToken.locale);
        console.log("User Family Name: ", decodedToken.family_name);
        let sendData = { googleId: decodedToken.sub }
        await transferData('gle',sendData).then((r)=>{console.log(r)})

    };

    const handleFailure = (response) => {
        console.log('Logowanie nie powiodło się:', response);
    };

    return (
        <div className="mainViewStyle login_main">
            <div className="login_box">
                {fetchError ? <p className="login_error">{fetchError}</p> : <></>}
                <form>
                    <input placeholder='login' type="text" name="inputUserName" className="login_input" value={userName}
                           onChange={(e) => setUserName(e.target.value)}></input>
                    <input placeholder='password' type="password" name="inputUserPassword" className="login_input" value={userPassword}
                           onChange={(e) => setUserPassword(e.target.value)}></input>
                <div className="login_buttons">
                    <button onClick={handleLogin} className="main_button "> Login </button>
                    <button onClick={()=>setPage("mainPage")} className="main_button "> Cancel </button>

                </div>
                </form>

                <div className="login_newaccount">
                    <button onClick={()=>setPage("editUserData")} className=" button-important"> Create an account </button>
                    <div>
                        <GoogleLogin
                            clientId="708085340019-karrgte5hed5fcobjn0ja6t8oitstagb.apps.googleusercontent.com"
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
