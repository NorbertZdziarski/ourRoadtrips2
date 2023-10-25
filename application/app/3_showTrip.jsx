import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "easy-peasy";
import {fetchData} from "./a_CRUD_service";
import LoadImage from "./a_loadimage";

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
        <section className="mainViewStyle">
            {data ? (<section className="">
                <header className="showtrip_header">
                    <h3>   {data.tripName} </h3>
                    <p>****</p>
                </header>
                <div className="showtrip_main">
                    <p>   {data.tripType} </p>
                    <p>   {data.tripUser} </p>
                    <p>   {data.tripCar} </p>
                </div>

                {data.tripPhoto ? <LoadImage imageName={data.tripPhoto}
                                             imagePath='images/trips'
                                             imageWidth='100%'
                                             photoClass="showtrip_photoStyle"
                /> : <p>no photo</p>}

                <div className="showtrip_description">
                    <p>   {data.tripDescription} </p>
                </div>
                <div className="showtrip_main">
                    <button disabled>Like It</button>
                    <button disabled>Comment</button>
                    <button disabled>Share</button>

                </div>
            </section>) : (<p>loading data</p>) }
        </section>
    );
}

export default ShowTrip;