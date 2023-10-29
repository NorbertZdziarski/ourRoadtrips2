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
        <div className=" mainViewStyle">

                <form>
                    <input type="text" name="inputUserName" className="dataImportLine" value={userName}
                           onChange={(e) => setUserName(e.target.value)}></input>
                    <input type="password" name="inputUserPassword" className="dataImportLine" value={userPassword}
                           onChange={(e) => setUserPassword(e.target.value)}></input>

                <button onClick={handleLogin} > Login </button>
                <button onClick={()=>setPage("mainPage")}> Cancel </button>
                </form>
                {fetchError ? <p>{fetchError}</p> : <></>}
                <button onClick={()=>setPage("editUserData")}> Create an account </button>

            {/*<button onClick={handleGoogleLogin}> Zaloguj się za pomocą Google </button>*/}



        </div>
    );
}

export default Login;
