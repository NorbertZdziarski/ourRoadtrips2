import React from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";
import { useEffect, useState } from 'react';
import path from 'path';
import LoadImage from "./a_loadimage";
import PrintTrips from "./4_printTrips";
import {Link, useParams} from 'react-router-dom';
import Anim_loading from "./anim_loading";



function AboutMe() {
    console.log(' about ME')
    let { id } = useParams();
    // const setChosen = useStoreActions(actions => actions.setChosen);
    // const chosen = useStoreState(state => state.chosen);

    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const [userData, setUserData] = useState(null);
    const [userTrips, setUserTrips] = useState(null);
    const [userCars, setUserCars] = useState(null);
    const [error, setError] = useState(null);
    const displayStyles = useStoreState(state => state.displayStyles);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    let chosen = id;
    console.info(' id: ' + id)
    useEffect(() => {
        // dodac żę jak nie ma chosen to chosen jest loggedUser.
        setShowLoading([true,0]);
        if(chosen) {
            const urlPath = path.join('one/user',chosen)
            fetchData(urlPath)
                .then(data => {
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
    useEffect(async () => {
        setShowLoading([true,0]);
        let target = `select/trips/${chosen}`
        // console.log('url target: ' + target)
        await fetchData(target).then(downloadedData => {
            // console.log('downloadedData: ' + downloadedData)
            setShowLoading([false,0]);
            setUserTrips(downloadedData)
        });
        target = `select/cars/${chosen}`
        console.log('url target: ' + target)
        await fetchData(target).then(downloadedData => {
            console.log('downloadedData: ' + downloadedData)
            console.log('downloadedData p0: ' + downloadedData[0].carPhoto[0])
            console.log('downloadedData JSON: ' + JSON.stringify(downloadedData));
            setShowLoading([false,0]);
            setUserCars(downloadedData)
        });
    }, []);
    if (error) {
        setShowLoading([false,0]);
        return <div>Error: {error}</div>;
    }
    console.log('userData:  ' + userData )
    console.log('userTrips:  ' + userTrips )
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


                    {/*<section className={`userPanel_trips colorstyle_button_${displayStyles}`}>*/}

                    {/*    {userTrips ? (*/}
                    {/*        userTrips.map((trip) =>*/}
                    {/*            // return (*/}
                    {/*            <div key={`keytrip${trip._id}`} className={`userPanelItem colorstyle_reverse_${displayStyles}`}>*/}

                    {/*                <Link to={`/showtrip/${trip._id}`} className={`clickPage colorStyle_clickPage_${displayStyles}`} onClick={()=>{*/}
                    {/*                    setTripId(trip._id)*/}
                    {/*                    setPage("showTrip");*/}
                    {/*                }}>*/}
                    {/*                    /!*<button className={`clickPage colorStyle_clickPage_${displayStyles}`} onClick={()=> {*!/*/}
                    {/*                    /!*    setPage("showTrip")*!/*/}
                    {/*                    /!*    setTripId(trip._id)*!/*/}
                    {/*                    /!*}}>*!/*/}
                    {/*                    <PrintTrips  trip={trip}/>*/}
                    {/*                </Link>*/}


                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    ) : (*/}
                    {/*        <div>*/}
                    {/*            <Anim_loading size={'_m'}/>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</section>*/}

                    <section className={`aboutme_show-container colorstyle_button_${displayStyles}`}>

                        {userCars ? (
                            Object.values(userCars).map((car) =>
                                <div key={`keytrip${car.id}`} className={`colorStyle_slideShow_${displayStyles} aboutme_show`}>
                                    <Link to={`/showcar/${car._id}`} className="aboutme_button" onClick={()=>{
                                                           // setTripId(car._id)
                                                            setPage("showcar");
                                                       }}>
                        {/*className={`clickPage colorStyle_clickPage_${displayStyles}`}*/}
                                    {/*<button className="aboutme_button" onClick={()=> {*/}
                                    {/*    // setPage("showcar")*/}
                                    {/*    setChosen(car)*/}
                                    {/*}}>*/}
                                        <LoadImage imageName={car.carPhoto[0]}
                                                   imagePath='images/cars'
                                                   // imageWidth='600px'
                                                   photoClass={`aboutme_PhotoCar colorStyle_clickPage_${displayStyles}`}/>
                                    </Link>
                                </div>)
                        ) : (
                            <div>loading data....</div>
                        )}
                    </section>
                    <section className={`aboutme_show-container colorstyle_button_${displayStyles}`}>
                        {userTrips ? (
                            Object.values(userTrips).map((trip) =>
                                <div key={`keytrip${trip._id}`} className={`colorStyle_slideShow_${displayStyles} aboutme_show`}>
                                    <Link to={`/showtrip/${trip._id}`} className="aboutme_button" onClick={()=>{
                                        // setTripId(trip._id)
                                        setPage("showTrip");
                                    }}>
                                    {/*<button className="aboutme_button" onClick={()=> {*/}
                                    {/*    // setPage("showTrip")*/}
                                    {/*    setTripId(trip._id)*/}
                                    {/*}}>*/}
                                        <PrintTrips  trip={trip}/>
                                    </Link>

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
