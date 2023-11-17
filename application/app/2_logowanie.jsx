import React, { useState } from 'react';
import {useStoreActions} from "easy-peasy";
import {fetchData, transferData} from "./a_CRUD_service";
import { GoogleLogin, GoogleUser } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import {getInitialFormData} from "./getInitialFormData";

function Login() {
    const setPage = useStoreActions(actions => actions.setPage);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    // const [userName, setUserName] = useState()
    // const [userPassword, setUserPassword] = useState()
    // const [fetchError, setFetchError] = useState()


    async function createUser(data) {
        console.log('funckja async - brak użytkownika o takim ID, zakładam nowe konto.');

        let saveData = {};
        // saveData = getInitialFormData('user','');

        saveData = {
            googleId: data.sub,
            nick: data.name || data.sub,
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

//     const handleLogin = async (e) => {
//         e.preventDefault()
// // funkcja logowania przy logowaniu za pomocą email - moje logowanie.
//         const target = `?user=${encodeURIComponent(userName)}&password=${encodeURIComponent(userPassword)}`
//         await fetchData('login' + target).then(downloadedData => {
//             if (!downloadedData) {
//                 setFetchError('wrong password or login');
//             } else {
//                 console.log(downloadedData)
//                 setLoggedUser(downloadedData)
//                 setPage("mainPage")
//             }
//         });
//     };

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
        <div className="mainViewStyle login_main">
            <div className="login_box">
                {/*{fetchError ? <p className="login_error">{fetchError}</p> : <></>}*/}
                {/*<form >*/}
                {/*    <input disabled placeholder='login' type="text" name="inputUserName" className="login_input" value={userName}*/}
                {/*           onChange={(e) => setUserName(e.target.value)}></input>*/}
                {/*    <input disabled placeholder='password' type="password" name="inputUserPassword" className="login_input" value={userPassword}*/}
                {/*           onChange={(e) => setUserPassword(e.target.value)}></input>*/}
                {/*<div className="login_buttons">*/}
                {/*    <button disabled onClick={handleLogin} className="main_button "> Login </button>*/}
                {/*    <button onClick={()=>setPage("mainPage")} className="main_button "> Cancel </button>*/}

                {/*</div>*/}
                {/*</form>*/}

                {/*<div className="login_newaccount">*/}
                {/*    <button disabled onClick={()=>setPage("editUserData")} className=" button-important"> Create an account </button>*/}
                    <div className="login_newaccount">
                        <GoogleLogin
                            clientId="708085340019-karrgte5hed5fcobjn0ja6t8oitstagb.apps.googleusercontent.com"
                            onSuccess={handleSuccess}
                            onFailure={handleFailure}
                        />

                    </div>

                {/*</div>*/}
            </div>

        </div>
    );
}

export default Login;
