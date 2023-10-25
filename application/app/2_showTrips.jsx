import React, {useEffect, useState} from 'react';
import {fetchData,transferData,updateData,deleteData} from "./a_CRUD_service";
import TripBox from "./2_tripBox";

const TripsList = ({ tripData, dataFilter }) => {
    return (
        <div className="blabla">
            {tripData.map((trip) => (
                       < TripBox key={trip._id}
                                 trip={trip}
                                 dataFilter={dataFilter}/>
            ))}
        </div>
    );
};

function ShowTrips({dataFilter}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData('trips').then(downloadedData => {
            setData(downloadedData)
        });

    }, []);

    return (
        <section className="underConstruction mainViewStyle ">
            {data ? (
                    <TripsList tripData={data}
                               dataFilter={dataFilter} />
            ) : (
                <p>Ładowanie danych...</p>
            )}
        </section>
    );
}

export default ShowTrips;