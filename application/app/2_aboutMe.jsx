import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";
import { useEffect, useState } from 'react';
import path from 'path';
import LoadImage from "./a_loadimage";
import PrintTrips from "./4_printTrips";

function AboutMe() {
    const setChosen = useStoreActions(actions => actions.setChosen);
    const chosen = useStoreState(state => state.chosen);
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const [userData, setUserData] = useState(null);
    const [userTrips, setUserTrips] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // dodac żę jak nie ma chosen to chosen jest loggedUser.
        if(chosen) {
            const urlPath = path.join('user',chosen)
            fetchData(urlPath)
                .then(data => {
                    setUserData(data[0]);

                })
                .catch(err => {
                    setError(err.message);
                    console.error('An error occurred:', err);
                });
        }
    }, []);
    useEffect(() => {
        const target = `userstrips/${chosen}`
        fetchData(target).then(downloadedData => {
            setUserTrips(downloadedData)
        });
    }, []);
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <section className="underConstruction mainViewStyle">
            {/*<p>about Me {chosen} pathe: </p>*/}
            {userData ?
                <div className="aboutme_conteiner">
                    <section className="aboutme_main">
                        <div className="aboutme_photo">
                            <LoadImage imageName={userData.userPhoto || 'user.png'}
                                       imagePath='images/users'
                                       photoClass="header_photo"
                            />
                            <h4>nick:{userData.nick}</h4>
                            <p>comment{userData.userPersonalComment}</p>
                        </div>
                        <div className="aboutme_column">

                            <p>name:{userData.firstName} {userData.lastName}</p>

                            <p>opis{userData.userDescription}</p>

                        </div>
                        {/*<LoadImage imageName={userData.}*/}
                    </section>
                    <section className="aboutme_cars">
                        <p>my cars</p>

                        {userData.cars ? (
                            Object.values(userData.cars).map((car) =>
                                <div key={`keytrip${car.id}`} className="aboutme_showCar">
                                    <button className="aboutme_button" onClick={()=> {
                                        setPage("showcar")
                                        setChosen(car)
                                    }}>
                                        <LoadImage imageName={car.carPhoto}
                                                   imagePath='images/users'
                                                   imageWidth='200px'
                                                   photoClass='aboutme_PhotoCar'/>
                                    </button>
                                </div>)
                        ) : (
                            <div>loading data....</div>
                        )}
                    </section>
                    <section className="aboutme_trips">
                        my trips
                        {userTrips ? (
                            Object.values(userTrips).map((trip) =>
                                <div key={`keytrip${trip._id}`} className="aboutme_showTrip">
                                    <button className="aboutme_button" onClick={()=> {
                                        setPage("showTrip")
                                        setTripId(trip._id)
                                    }}>
                                        <PrintTrips  trip={trip}/>
                                    </button>

                                </div>)
                        ) : (
                            <div>loading data....</div>
                        )}
                                    </section>

                </div>: <>...no data...</> }

        </section>
    );
}

export default AboutMe;
