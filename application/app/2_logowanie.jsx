import React, { useState } from 'react';
import {useStoreActions} from "easy-peasy";

function Login() {
    const setPage = useStoreActions(actions => actions.setPage);
    const handleGoogleLogin = async () => {
    };
    // inputy login hasło
    // serwer weryfikuje zaszyfrowane ? - osobna baza dla haseł

    return (
        <div className="underConstruction mainViewStyle">
            <div>
                <form>
                    <input type="text" name="inputUserName" className="dataImportLine"></input>
                    <input type="password" name="inputUserPassword" className="dataImportLine"></input>
                </form>
                <button onClick={handleGoogleLogin} disabled> Login </button>
                <button onClick={()=>setPage("mainPage")}> Cancel </button>
            </div>
            {/*<button onClick={handleGoogleLogin}> Zaloguj się za pomocą Google </button>*/}


        </div>
    );
}

export default Login;
