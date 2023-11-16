import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {deleteData, deleteFile, fetchData, updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";
import DisplayCars from "./3_displayCars";
import PrintTrips from "./4_printTrips";


function UserProfile() {
    const loggedUser = useStoreState(state => state.loggedUser);
    const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
    const setPage = useStoreActions(actions => actions.setPage);
    const setYesOrNot = useStoreActions(actions => actions.setYesOrNot);
    const yesOrNot = useStoreState(state => state.yesOrNot);
    const setToDelete = useStoreActions(actions => actions.setToDelete );
    const toDelete = useStoreState(state => state.toDelete);
    const setDataId = useStoreActions(actions => actions.setDataId);
    const setTripId = useStoreActions(actions => actions.setTripId);
    const [usersTrips, setUsersTrips] = useState({});
    const [usersCars, setUsersCars] = useState(loggedUser.cars);



    useEffect(() => {
        const target = `userstrips/${loggedUser._id}`
        fetchData(target).then(downloadedData => {
            setUsersTrips(downloadedData)
        });
    }, []);


    useEffect(async ()=> {
        if (yesOrNot[1] === 2) {
            if (toDelete[0] === 'car') {
                let carsArr = [...loggedUser.cars];
                const userCopy = {...loggedUser}

                carsArr = carsArr.filter(ob=>ob.carId !== toDelete[1].carId);
                const dataToSave = {
                    cars: carsArr,
                };

                userCopy.cars = carsArr;
                setLoggedUser(userCopy);

                await updateData(`user/${loggedUser._id}`, dataToSave).then(()=>{
                    setUsersCars(carsArr)});
                if (toDelete[1].carPhoto) await deleteFile(`images/users/${toDelete[1].carPhoto}`);
                setToDelete([``,``])
            }
            if (toDelete[0] === 'trip') {
                await deleteData(`trip/${toDelete[1]._id}`);
                const target = `userstrips/${loggedUser._id}`
                fetchData(target).then(downloadedData => {
                    setUsersTrips(downloadedData)
                });
                if (toDelete[1].tripPhoto) await deleteFile(`images/trips/${toDelete[1].tripPhoto}`);
                setToDelete([``,``])
            }
        }
        setYesOrNot([false,0])
    }, [yesOrNot[1]])


    return (
        <section className="userPanel_main">

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
                <div className="userPanel_mainpage_content">
                    <p>Name: {loggedUser.firstName}</p>
                    <p>{loggedUser.lastName}</p>
                    <p>{loggedUser.nick}</p>
                    <p>{loggedUser.email}</p>
                    <p>{loggedUser.userDescription}</p>
                    <p> Twoja najlepiej oceniana podróż: </p>

                </div>
            </section>

            <section className="showtrip_main">
                <button onClick={()=> window.location.href = '#userTrips'}>   my trips </button>
                <button onClick={()=> window.location.href = '#userCars'}>   my cars </button>
                <button disabled onClick={()=> window.location.href = '#userData'}>   my map </button>
            </section>

            <section className="userPanel_trips" id="userTrips">

                {usersTrips ? (
                    Object.values(usersTrips).map((trip) =>
                        <div key={`keytrip${trip._id}`} className="userPanelItem">
                            <button className="clickPage" onClick={()=> {
                                setPage("showTrip")
                                setTripId(trip._id)
                            }}>
                                <PrintTrips  trip={trip}/>
                            </button>
                            <div className="userPanel-buttons">
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
                {(usersTrips.length === 0) ? <div className="userPanel_first"><p>add your first route! </p></div> : <></>}
            </section>
            <section id="userCars">
                <DisplayCars
                usersCars={usersCars}
                setDataId={setDataId}
                setPage={setPage}
                loggedUser={loggedUser}
                setUsersCars={setUsersCars}
                setYesOrNot={setYesOrNot}
                yesOrNot={yesOrNot}
                setToDelete={setToDelete}
                />
                {(usersCars.length === 0) ? <div className="userPanel_first"><p>add your first car! </p></div> : <></>}
            </section>

        </section>
    );
}

export default UserProfile;