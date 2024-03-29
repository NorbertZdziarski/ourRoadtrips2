import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {deleteData, deleteFile, fetchData, updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";
import DisplayCars from "./3_displayCars";
import PrintTrips from "./4_printTrips";
import Anim_loading from "./anim_loading";
import { Link } from "react-router-dom";
import NewMessage from "./5_newMessage";



function UserProfile() {
    const loggedUser = useStoreState(state => state.loggedUser);
    const setPage = useStoreActions(actions => actions.setPage);
    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);
    const yesOrNot = useStoreState(state => state.yesOrNot);
    const setToDelete = useStoreActions(actions => actions.setToDelete );
    const toDelete = useStoreState(state => state.toDelete);
    const setDataId = useStoreActions(actions => actions.setDataId);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const loggedUserCars = useStoreState(state => state.loggedUserCars);
    const setLoggedUserCars = useStoreActions(actions => actions.setLoggedUserCars);
    const loggedUserTrips = useStoreState(state => state.loggedUserTrips);
    const setLoggedUserTrips = useStoreActions(actions => actions.setLoggedUserTrips);
    const displayStyles = useStoreState(state => state.displayStyles);
    // const [loggedUserCars,setLoggedUserCars] = useState(null);
    const setShowLoading = useStoreActions(actions => actions.setShowLoading);

    useEffect(async () => {

        setShowLoading([true,0]);
        let targetTrips = `select/trips/${loggedUser._id}`
        await fetchData(targetTrips).then(downloadedTrips => {

            setLoggedUserTrips(downloadedTrips)
        });
        let targetCars = `select/cars/${loggedUser._id}`


        await fetchData(targetCars).then(downloadedCars => {
            setShowLoading([false,0]);

            setLoggedUserCars(downloadedCars)
        });
        setShowLoading([false,0]);
    },[]);


    useEffect(async ()=> {
        setShowLoading([true,0]);
        if (yesOrNot[1] === 2) {
            if (toDelete[0] === 'car') {

                await deleteData(`car/${toDelete[1]._id}`);
                const target = `select/cars/${loggedUser._id}`
                fetchData(target).then(downloadedData => {
                    console.log('2 user profile | toDelete |  downloadedData: ' + downloadedData + ' JSON: ' + JSON.stringify(downloadedData))
                    setLoggedUserCars(downloadedData)
                });
                if (toDelete[1].carPhoto) await deleteFile('images/cars/',toDelete[1].carPhoto);
                setToDelete([``,``])

            }
            if (toDelete[0] === 'trip') {
                await deleteData(`trip/${toDelete[1]._id}`);
                const target = `select/trips/${loggedUser._id}`
                await fetchData(target).then(downloadedData => {

                    setLoggedUserTrips(downloadedData)
                });
                if (toDelete[1].tripPhoto) await deleteFile('images/trips/',toDelete[1].tripPhoto );
                setToDelete([``,``])
            }
        }
        setShowLoading([false,0]);
        setYesOrNot([false,0])
    }, [yesOrNot[1]])


    return (
        <section className="userPanel_main">
            <LoadImage imageName={loggedUser.userPhoto || 'user.png'}
                       imagePath='images/users'
                       photoClass="userPanel_bgphoto"
            />
            <header className="userPanel_mainpage_box">
                <div>
                    <LoadImage imageName={loggedUser.userPhoto || 'user.png'}
                               imagePath='images/users'
                               photoClass="userPanel_userPhoto"
                    />
                </div>
                <div>
                    <h3 className="userPanel_mainpage_title"> Hi {loggedUser.firstName || loggedUser.nick}!</h3>

                    <div className="userPanel_mainpage_content">
                        <h4>this is your space. </h4>
                        <p>here you can manage your trips, cars and personal data. It's up to you what will be visible and what will not be visible to other users.</p>
                        <p>Have fun!</p>

                    </div>
                </div>

            </header>

            <section id="userData" className="">
                <div>
                    <h5>Your data:</h5>
                </div>
                <div className={`userPanel_mainpage_content colorstyle_button_${displayStyles}`}>
                    <p>Name: {loggedUser.firstName}</p>
                    <p>{loggedUser.lastName}</p>
                    <p>{loggedUser.nick}</p>
                    <p>{loggedUser.email}</p>
                    <p>{loggedUser.userDescription}</p>
                    <p>Your top rated trip:</p>
                </div>
            </section>
            <section className={`showtrip_main fnt_Title colorstyle_button_${displayStyles}`}>
                <button onClick={()=> window.location.href = '#userTrips'}>   my trips </button>
                <button onClick={()=> window.location.href = '#userCars'}>   my cars </button>
                <button disabled onClick={()=> window.location.href = '#userData'}>   my map </button>
            </section>

            <section className={`userPanel_trips colorstyle_button_${displayStyles}`} id="userTrips">

                {loggedUserTrips ? (
                    loggedUserTrips.map((trip) =>

                        <div key={`keytrip${trip._id}`} className={`userPanelItem colorstyle_reverse_${displayStyles}`}>

                            <Link to={`/showtrip/${trip._id}`} className={`clickPage colorStyle_clickPage_${displayStyles}`} onClick={()=>{
                            setTripId(trip._id)
                            setPage("showTrip");
                        }}>

                                <PrintTrips  trip={trip}/>
                            </Link>

                            <div className="userPanel-buttons ">
                                <Link to="/addtrip" onClick={()=>{
                                    setPage("addTrip")
                                    setDataId(trip)}
                                }>edit</Link>
                                <button  onClick={()=>{
                                    setToDelete(['trip',trip])
                                    setYesOrNot([true,0])
                                }
                                }>delete</button>
                                {trip.tripPublic ? <p>public</p> : <p>hidden</p>}
                            </div>
                        </div>
                        )
                ) : (
                    <div>
                        <Anim_loading size={'_m'}/>
                    </div>
                )}
                {(loggedUserTrips.length === 0) ? <button onClick={()=>{
                                                    setDataId('')
                                                    setPage("addTrip")}
                                            }
                                            className={`userPanel_first colorstyle_userPanel_first_${displayStyles}`}>
                    <p>add your first route! </p></button> : <></>}
            </section>
            <section className={`userPanel_trips colorstyle_button_${displayStyles}`} id="userCars ">
                <DisplayCars
                usersCars={loggedUserCars}
                setDataId={setDataId}
                setPage={setPage}
                loggedUser={loggedUser}

                setYesOrNot={setYesOrNot}
                yesOrNot={yesOrNot}
                setToDelete={setToDelete}
                />
                {(loggedUserCars && loggedUserCars.length === 0) ? <button onClick={()=>{
                                                setDataId('')
                                                setPage("addCar")}
                                            }
                                            className={`userPanel_first colorstyle_userPanel_first_${displayStyles}`}>
                    <p>add your first car! </p>
                </button> : <></>}
            </section>

        </section>
    );
}
export default UserProfile;