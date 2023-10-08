import React, {useEffect, useState} from 'react';
import {useStoreState} from "easy-peasy";
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
                    Object.values(usersTrips).map((trip) => <PrintTrips key={`keyline${trip._id}`} trip={trip}/>)
                ) : (
                    <div>loading data....</div>
                )}

            </section>

            <section>
                User Cars
                {usersCars ? (
                    Object.values(usersCars).map((car) => <PrintCars key={`keyline${car._id}`} car={car}/>)
                ) : (
                    <div>loading data....</div>
                )}
            </section>
        </section>
    );
}

export default UserProfile;