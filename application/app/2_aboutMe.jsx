import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";
import { useEffect, useState } from 'react';
import path from 'path';
import LoadImage from "./a_loadimage";
import PrintTrips from "./4_printTrips";
import { useParams } from 'react-router-dom';



function AboutMe() {
    console.log(' about ME')
    let { id } = useParams();
    // const setChosen = useStoreActions(actions => actions.setChosen);
    // const chosen = useStoreState(state => state.chosen);

    // const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const [userData, setUserData] = useState(null);
    const [userTrips, setUserTrips] = useState(null);
    const [error, setError] = useState(null);
    const displayStyles = useStoreState(state => state.displayStyles);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    let chosen = id;

    useEffect(() => {
        // dodac żę jak nie ma chosen to chosen jest loggedUser.
        setShowLoading([true,0]);
        if(chosen) {
            const urlPath = path.join('one/user',chosen)
            fetchData(urlPath)
                .then(data => {
                    // console.log(JSON.stringify(data))
                    setShowLoading([false,0]);
                    setUserData(data);

                })
                .catch(err => {
                    setError(err.message);
                    setShowLoading([false,0]);
                    console.error('An error occurred:', err);
                });
        }
    }, []);
    useEffect(() => {
        setShowLoading([true,0]);
        const target = `one/trip/${chosen}`
        fetchData(target).then(downloadedData => {
            setShowLoading([false,0]);
            setUserTrips(downloadedData)
        });
    }, []);
    if (error) {
        setShowLoading([false,0]);
        return <div>Error: {error}</div>;
    }
    return (<>
        <section className="layout_main layout_flex-sb">
            {userData ?
                <div className="aboutme_conteiner">
                    <section className="aboutme_main">
                        <div className={`aboutme_info colorstyle_glow_${displayStyles}`}>
                            <div className="aboutme_photoBox">
                                <LoadImage imageName={userData.userPhoto || 'user.png'}
                                           imagePath='images/users'
                                           photoClass="aboutme_photo"
                                />
                            </div>
                            <div className="aboutme_column fnt_subtitle">

                                <h4 className="fnt_Title">I'm: {userData.firstName} {userData.lastName} vel {userData.nick}</h4>
                                {/*<p></p>*/}
                                <p className="aboutme_column_title">{userData.userPersonalComment}</p>
                                <p>about me: {userData.userDescription}</p>

                            </div>
                        </div>
                        <div className={`aboutme_underHeader colorStyle_shading_${displayStyles}`}>
                            <LoadImage imageName={userData.userPhoto || 'user.png'}
                                       imagePath='images/users'
                                       photoClass="aboutme_photo_reflex"
                                       perspectiveStyle="perspectiveStyle"
                                       imgProporcion={false}

                            />
                        </div>
                        {/*<LoadImage imageName={userData.}*/}
                    </section>
                    <section className={`aboutme_show-container colorstyle_button_${displayStyles}`}>

                        {userData.cars ? (
                            Object.values(userData.cars).map((car) =>
                                <div key={`keytrip${car.id}`} className={`colorStyle_slideShow_${displayStyles} aboutme_show`}>
                                    <button className="aboutme_button" onClick={()=> {
                                        // setPage("showcar")
                                        setChosen(car)
                                    }}>
                                        <LoadImage imageName={car.carPhoto}
                                                   imagePath='images/users'
                                                   imageWidth='600px'
                                                   photoClass={`aboutme_PhotoCar colorStyle_clickPage_${displayStyles}`}/>
                                    </button>
                                </div>)
                        ) : (
                            <div>loading data....</div>
                        )}
                    </section>
                    <section className={`aboutme_show-container colorstyle_button_${displayStyles}`}>
                        {/*my trips*/}
                        {userTrips ? (
                            Object.values(userTrips).map((trip) =>
                                <div key={`keytrip${trip._id}`} className={`colorStyle_slideShow_${displayStyles} aboutme_show`}>
                                    <button className="aboutme_button" onClick={()=> {
                                        // setPage("showTrip")
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
        </>
    );
}

export default AboutMe;
