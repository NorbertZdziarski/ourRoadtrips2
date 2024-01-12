import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import { useNavigate } from 'react-router-dom';
import {fetchData, transferData, transferGooglePhoto} from "./a_CRUD_service";
import { GoogleLogin, GoogleUser } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import {checkIfItExists} from "./app_check";
require('dotenv').config();
function Login() {
    const page = useStoreState(state => state.page);
    const setPage = useStoreActions(actions => actions.setPage);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const [userName, setUserName] = useState()
    const [userPassword, setUserPassword] = useState()
    const [fetchError, setFetchError] = useState()
    const navigate = useNavigate();
    const clientId = process.env.CLIENT_ID;
    const displayStyles = useStoreState(state => state.displayStyles);

    useEffect(()=>{
        if (page === "mainPage") {
            navigate('/');
        }
    },[page])

    async function createUser(data) {
        let user = data.name;

    //     let sourceUrl = data.picture;
    //     console.log('{}-------zapisanie kopii obrazu----------------------{}')
    //     console.log('sourceUrl: ' + sourceUrl)
    //     console.log(typeof sourceUrl);
    //
    //
    //     let dotIndex = sourceUrl.lastIndexOf('.');
    //     let extension = sourceUrl.slice(dotIndex);
    //
    //     console.log('odKropkiDoKonca ' + extension); // Wyświetli: ".string"
    //
    //
    //     let targetPath = `images/users/${data.sub}${extension}`;
    //     console.log('funckja async - brak użytkownika o takim ID, zakładam nowe konto.');
    // console.log(`zapis zdjęcia ${user}: \n targetPath: ${targetPath} \n sourceUrl: ${sourceUrl}`)
    //
    //     await transferGooglePhoto(sourceUrl,targetPath);
    //
    //
    //
    //

        // await checkIfItExists(user).then((r)=>{
        //     console.log('tymczaowa wynik: ' + r)
        //     if (r) user+= new Date();
        // })
        // let saveData = {};
        // saveData = getInitialFormData('user','');

        let saveData = {
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
       await transferData(`user/add`, saveData);

        setLoggedUser(saveData);
    }

    const handleLogin = async (e) => {
        e.preventDefault()
// funkcja logowania przy logowaniu za pomocą email - moje logowanie.
        const target = `?user=${encodeURIComponent(userName)}&password=${encodeURIComponent(userPassword)}`
        await fetchData('login/' + target).then(downloadedData => {
            if (!downloadedData) {
                setFetchError('wrong password or login');
            } else {
                // console.log(downloadedData)
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

                if (downloadedData) {
                    if (downloadedData === 'noUser') {
                            createUser(decodedToken);
                        setPage("mainPage")
                    } else {
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
        // console.log('Logowanie nie powiodło się:', response);
    };

    return (
        <div className="layout_main layout_flex-sb_mobile_Column login_main">
            <section className="login_newaccount">
                <GoogleLogin
                    clientId={clientId}
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                />

            </section>
            <section className={`login_box colorStyle_input_${displayStyles}`}>
                {fetchError ? <p className={`login_error colorStyle_error_${displayStyles}`}>{fetchError}</p> : <></>}
                <form >
                    <input disabled placeholder='login' type="text" name="inputUserName" className={`login_input colorStyle_inputLogin_${displayStyles}`} value={userName}
                           onChange={(e) => setUserName(e.target.value)}></input>
                    <input disabled  placeholder='password' type="password" name="inputUserPassword" className={`login_input colorStyle_inputLogin_${displayStyles}`} value={userPassword}
                           onChange={(e) => setUserPassword(e.target.value)}></input>
                <div className={`login_buttons colorstyle_button_${displayStyles}`}>
                    <button disabled onClick={handleLogin} className="main_button "> Login </button>
                    <button onClick={()=>setPage("mainPage")} className="main_button "> Cancel </button>

                </div>
                </form>

                {/*<div className="login_newaccount">*/}
                {/*    <button disabled onClick={()=>setPage("editUserData")} className={`button-important button-important_${displayStyles}`}> Create an account </button>*/}
                {/*</div>*/}
            </section>

        </div>
    );
}
export default Login;
