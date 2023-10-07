import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";

function ShowTrip() {
    const page = useStoreState(state => state.page);
    const tripId = useStoreState(state => state.tripId);
    const setPage = useStoreActions(actions => actions.setPage);
    const setTripId = useStoreActions(actions => actions.setTripId);

    const [data, setData] = useState(null);

    useEffect(() => {
        const target = `trip/${tripId}`
        fetchData(target).then(downloadedData => {
            setData(downloadedData[0])
        });
    }, []);

    return (
        <section className="underConstruction">
            <h4 > Show trip id: {tripId}</h4>

            {data ? (<section className="ramka">
                <h3>   {data.tripName} </h3>
                <p>   {data.tripDescription} </p>
                <p>   {data.tripType} </p>
                <p>   {data.tripUser} </p>
                <p>   {data.tripCar} </p>
            </section>) : (<p>loading data</p>) }
        </section>
    );
}

export default ShowTrip;