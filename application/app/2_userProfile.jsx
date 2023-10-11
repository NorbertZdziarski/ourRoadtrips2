import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";

function PrintTrips({trip}) {

    let keyData = 'line' + trip._id;
    return (<div key={keyData}>
        {trip.tripName}
    </div>)
}

function PrintCars({car}) {
    let keyData = 'lineCar' + car.id;
    return (<div key={keyData}>
        {car.carBrand}
    </div>)
}


function UserProfile() {
    const loggedUser = useStoreState(state => state.loggedUser);
    const [usersTrips, setUsersTrips] = useState({});
    const [usersCars, setUsersCars] = useState(loggedUser.cars);
    const setPage = useStoreActions(actions => actions.setPage);
    const setDataId = useStoreActions(actions => actions.setDataId);

    useEffect(() => {
        const target = `userstrips/${loggedUser._id}`
        fetchData(target).then(downloadedData => {
            setUsersTrips(downloadedData)
        });
    }, []);


    return (
        <section className="underConstruction">
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
                        <div key={`keytrip${trip._id}`} className="dataImportLine">
                            <button className="clickPage" onClick={()=>{
                                setPage("addTrip")
                                setDataId(trip)}
                            }>
                                <PrintTrips  trip={trip}/>
                            </button>
                        </div>)
                ) : (
                    <div>loading data....</div>
                )}

            </section>

            <section>
                User Cars
                {usersCars ? (
                    Object.values(usersCars).map((car) =>
                        <div key={`keycar${car.carId}`} className="dataImportLine">
                            <button className="clickPage" onClick={()=>{
                                setPage("addCar")
                                setDataId(car)}
                            }> <PrintCars  car={car}/></button>
                        </div>

                        )
                ) : (
                    <div>loading data....</div>
                )}
            </section>
        </section>
    );
}

export default UserProfile;