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
                <input type="password" name="inputUserPassword" ></input>
            </form>
            <button onClick={handleGoogleLogin}> Login </button>
            <button onClick={handleGoogleLogin}> Cancel </button>
            <button onClick={handleGoogleLogin}> Zaloguj się za pomocą Google </button>


        </div>
    );
}

export default Login;
