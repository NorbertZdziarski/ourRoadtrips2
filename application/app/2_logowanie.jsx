import React, { useState } from 'react';
import {useStoreActions} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";

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
    // inputy login hasło
    // serwer weryfikuje zaszyfrowane ? - osobna baza dla haseł

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

                    {/*<button onClick={handleGoogleLogin}> Zaloguj się za pomocą Google </button>*/}
                </div>
            </div>


        </div>
    );
}

export default Login;
