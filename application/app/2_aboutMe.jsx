import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";
import { useEffect, useState } from 'react';
import path from 'path';
import LoadImage from "./a_loadimage";

function AboutMe() {
    const setChosen = useStoreActions(actions => actions.setChosen);
    const chosen = useStoreState(state => state.chosen);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(chosen) {
            const urlPath = path.join('user',chosen)
            fetchData(urlPath)
                .then(data => {
                    setUserData(data[0]);
                    console.log(urlPath)

                })
                .catch(err => {
                    setError(err.message);
                    console.error('An error occurred:', err);
                });
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(userData)
    // console.log(userData.cars)
    return (
        <section className="underConstruction mainViewStyle">
            <p>about Me {chosen} pathe: </p>
            {userData ?
                <section className="mainViewStyle">
                    <div>photo</div>
                    <div>
                        <h4>nick:{userData.nick}</h4>
                        <p>name:{userData.firstName} {userData.lastName}</p>
                        <p>comment{userData.userPersonalComment}</p>
                        <p>opis{userData.userDescription}</p>

                    </div>
                    {/*<LoadImage imageName={userData.}*/}
                </section> : <>ghj</> }

        </section>
    );
}

export default AboutMe;
