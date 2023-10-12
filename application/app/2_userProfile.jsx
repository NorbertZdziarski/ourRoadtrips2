import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {deleteData, fetchData, updateData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";

function PrintTrips({trip}) {

    let keyData = 'line' + trip._id;
    return (<div key={keyData}>
        {trip.tripName}
    </div>)
}

function PrintCars({car}) {
    let keyData = 'lineCar' + car.id;
    return (<div key={keyData}>
        <p>{car.carMaker} {car.carBrand}</p>

    </div>)
}

async function deleteDataFn(target) {

    // ------------------------------------- dodać pytanie czy aby na pewno !
    await deleteData(target);
}
async function deleteDataFnCar(carId,loggedUser,setUsersCars) {
    // ------------------------------------- dodać pytanie czy aby na pewno !

    let carsArr = [...loggedUser.cars];
    carsArr = carsArr.filter(ob=>ob.carId !== carId);
    const dataToSave = {
        cars: carsArr,
    };
    await updateData(`user/${loggedUser._id}`, dataToSave);
    setUsersCars(carsArr);

}

function DisplayCars({usersCars, setPage, setDataId, loggedUser, setUsersCars}) {
    // ------------------------------------------------------- - zastąpienie jednym kodem
    return (
        <section>
            User Cars
            {usersCars ? (
                Object.values(usersCars).map((car) =>

                    <div key={`keycar${car.carId}`} className="dataImportLine">
                        <button className="clickPage" >
                            <PrintCars  car={car}/>
                            {car.carPhoto ? <LoadImage imageName={car.carPhoto}
                                                       imagePath='images/users'
                                                       imageWidth='120px' /> : <p>no photo</p>}
                        </button>
                        <div>
                            <button onClick={()=>{
                                setPage("addCar")
                                setDataId(car)}
                            }>edit</button>
                            <button onClick={()=>{
                                deleteDataFnCar(car.carId,loggedUser, setUsersCars)
                            }
                            }>delete</button>
                            <button>visibility</button>
                        </div>
                    </div>

                )
            ) : (
                <div>loading data....</div>
            )}
        </section>
    )
}

function UserProfile() {
    const loggedUser = useStoreState(state => state.loggedUser);
    const [usersTrips, setUsersTrips] = useState({});
    const [usersCars, setUsersCars] = useState(loggedUser.cars);
    const setPage = useStoreActions(actions => actions.setPage);
    const page = useStoreState(state => state.page);
    const setReload = useStoreActions(actions => actions.setReload);
    const reload = useStoreState(state => state.reload);
    const setDataId = useStoreActions(actions => actions.setDataId);
    const setTripId = useStoreActions(actions => actions.setTripId);

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
                        <div key={`keytrip${trip._id}`} className="dataImportLine ramka">
                            <button className="clickPage" onClick={()=> {
                                setPage("showTrip")
                                setTripId(trip._id)
                            }}>
                                <PrintTrips  trip={trip}/>
                                {trip.tripPhoto ? <LoadImage imageName={trip.tripPhoto}
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
                                <button>visibility</button>
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
            />

        </section>
    );
}

export default UserProfile;