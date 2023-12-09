import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {deleteData, deleteFile, fetchData, updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";
import DisplayCars from "./3_displayCars";
import PrintTrips from "./4_printTrips";


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


    useEffect(async () => {

        let target = `select/trips/${loggedUser._id}`
        await fetchData(target).then(downloadedData => {
            // console.log('2 user profile | trips |  downloadedData: ' + downloadedData + ' JSON: ' + JSON.stringify(downloadedData))
            setLoggedUserTrips(downloadedData)
        });
        target = `select/cars/${loggedUser._id}`
        await fetchData(target).then(downloadedData => {
            // console.log('2 user profile | cars |  downloadedData: ' + downloadedData + ' JSON: ' + JSON.stringify(downloadedData))
            setLoggedUserCars(downloadedData)
        });
    }, [yesOrNot[1]]);


    useEffect(async ()=> {
        if (yesOrNot[1] === 2) {
            if (toDelete[0] === 'car') {
                // let carsArr = [...loggedUser.cars];
                // const userCopy = {...loggedUser}
                // console.log('///// cars ARR: ' + carsArr)
                // carsArr = carsArr.filter(ob=>ob.carId !== toDelete[1].carId);
                // const dataToSave = {
                //     cars: carsArr,
                // };
                await deleteData(`car/${toDelete[1]._id}`);
                const target = `select/car/${loggedUser._id}`
                fetchData(target).then(downloadedData => {
                    // console.log('2 user profile | toDelete |  downloadedData: ' + downloadedData + ' JSON: ' + JSON.stringify(downloadedData))
                    // setUsersCars(downloadedData)
                });
                // userCopy.cars = carsArr;
                // setLoggedUser(userCopy);
                //
                // await updateData(`user/${loggedUser._id}`, dataToSave).then(()=>{
                //     setUsersCars(carsArr)});

                let photos = Object.values(toDelete[1].carPhoto);
                    // console.log('_______________________________')
                    // console.log(photos)
                    // console.log(photos.length)
                    //  console.log(typeof photos)


                if (toDelete[1].carPhoto) await deleteFile('images/cars/',photos);
                setToDelete([``,``])
            }
            if (toDelete[0] === 'trip') {
                await deleteData(`trip/${toDelete[1]._id}`);
                const target = `select/trip/${loggedUser._id}`
                fetchData(target).then(downloadedData => {
                    console.log('2 user profile | toDelete |  downloadedData: ' + downloadedData + ' JSON: ' + JSON.stringify(downloadedData))
                    setLoggedUserTrips(downloadedData)
                });
                if (toDelete[1].tripPhoto) await deleteFile('images/trips/',toDelete[1].tripPhoto );
                setToDelete([``,``])
            }
        }
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
                    <h3 className="userPanel_mainpage_title"> Cześć {loggedUser.firstName || loggedUser.nick}!</h3>
                    {/*<p className="fnt_subtitle"> {loggedUser.userPersonalComment}</p>*/}
                    <div className="userPanel_mainpage_content">
                        <p> to jest Twoja przestrzeń. </p>
                        <p> tutaj możesz zarządzać swoimi podróżami, samochodami oraz danymi osobistymi. Od Ciebie zależy co będzie widoczne, a co nie dla innych użytkowników.</p>
                        <p> Miłej zabawy! </p>

                    </div>
                </div>

            </header>

            <section id="userData" className="">
                <div>
                    About me:
                </div>
                <div className={`userPanel_mainpage_content colorstyle_button_${displayStyles}`}>
                    <p>Name: {loggedUser.firstName}</p>
                    <p>{loggedUser.lastName}</p>
                    <p>{loggedUser.nick}</p>
                    <p>{loggedUser.email}</p>
                    <p>{loggedUser.userDescription}</p>
                    <p> Twoja najlepiej oceniana podróż: </p>

                </div>
            </section>

            <section className={`showtrip_main colorstyle_button_${displayStyles}`}>
                <button onClick={()=> window.location.href = '#userTrips'}>   my trips </button>
                <button onClick={()=> window.location.href = '#userCars'}>   my cars </button>
                <button disabled onClick={()=> window.location.href = '#userData'}>   my map </button>
            </section>

            <section className={`userPanel_trips colorstyle_button_${displayStyles}`} id="userTrips">

                {loggedUserTrips ? (
                    loggedUserTrips.map((trip) =>
                        <div key={`keytrip${trip._id}`} className={`userPanelItem colorstyle_reverse_${displayStyles}`}>
                            <button className={`clickPage colorStyle_clickPage_${displayStyles}`} onClick={()=> {
                                setPage("showTrip")
                                setTripId(trip._id)
                            }}>
                                <PrintTrips  trip={trip}/>
                            </button>
                            <div className="userPanel-buttons ">
                                <button  onClick={()=>{
                                    setPage("addTrip")
                                    setDataId(trip)}
                                }>edit</button>
                                <button  onClick={()=>{
                                    setToDelete(['trip',trip])
                                    setYesOrNot([true,0])
                                }
                                }>delete</button>
                                {trip.tripPublic ?<p> public </p> : <p>hidden</p>}
                            </div>
                        </div>)
                ) : (
                    <div>
                        loading data....
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
                {(loggedUserCars.length === 0) ? <button onClick={()=>{
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