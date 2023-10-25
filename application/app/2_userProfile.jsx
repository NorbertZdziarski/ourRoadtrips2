import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {deleteData, fetchData, updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";
import DisplayCars from "./3_displayCars";

function PrintTrips({trip}) {

    let keyData = 'line' + trip._id;
    return (<div key={keyData}>
        {trip.tripName}
    </div>)
}



async function deleteDataFn(target) {

    // ------------------------------------- dodać pytanie czy aby na pewno !
    await deleteData(target);
}




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


    useEffect(()=> {
        if (yesOrNot[1] === 2) {

            let carsArr = [...loggedUser.cars];
            const userCopy = {...loggedUser}

            carsArr = carsArr.filter(ob=>ob.carId !== toDelete[1]);
            const dataToSave = {
                cars: carsArr,
            };

            userCopy.cars = carsArr;
            setLoggedUser(userCopy);

            updateData(`user/${loggedUser._id}`, dataToSave).then(()=>{
                setUsersCars(carsArr)});
            setToDelete([``,``])

            }
        setYesOrNot([false,0])
    }, [yesOrNot[1]])


    return (
        <section className="underConstruction mainViewStyle">
            <h3 > user profile </h3>
            <section>
                User Data
                <p>{loggedUser.firstName}</p>
                <p>{loggedUser.lastName}</p>
                <p>{loggedUser.nick}</p>
                <p>{loggedUser.email}</p>

            </section>
            <section>
                User Trips

                {usersTrips ? (
                    Object.values(usersTrips).map((trip) =>
                        <div key={`keytrip${trip._id}`} className="dataImportLine ramka">
                            <button className="clickPage" onClick={()=> {
                                setPage("showTrip")
                                setTripId(trip._id)
                            }}>
                                <PrintTrips  trip={trip}/>
                                {trip.tripPhoto ?
                                    <LoadImage imageName={trip.tripPhoto}
                                               imagePath='images/trips'
                                               imageWidth='120px' />: <p>no photo</p>}
                            </button>
                            <div>
                                <button onClick={()=>{
                                    setPage("addTrip")
                                    setDataId(trip)}
                                }>edit</button>
                                <button onClick={()=>{
                                    deleteDataFn(`trip/${trip._id}`)
                                }
                                }>delete</button>
                                {trip.tripPublic ?<p> public </p> : <p>hidden</p>}
                            </div>
                        </div>)
                ) : (
                    <div>loading data....</div>
                )}

            </section>
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

        </section>
    );
}

export default UserProfile;