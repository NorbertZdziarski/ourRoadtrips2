import React, { useState } from 'react';

function Login() {

    const handleGoogleLogin = async () => {
    };
    // inputy login hasło
    // serwer weryfikuje zaszyfrowane ? - osobna baza dla haseł

    return (
        <div className="underConstruction">
            <form>
                <input type="text" name="inputUserName" ></input>

            </form>
            <button onClick={handleGoogleLogin}> Zaloguj się za pomocą Google </button>


        </div>
    );
}

export default Login;
