import React, {useEffect, useState} from 'react';
import {fetchData,transferData,updateData,deleteData} from "./a_CRUD_service";
import TripBox from "./2_tripBox";

const TripsList = ({ tripData, dataFilter }) => {
    return (

        <div className="testDataImport">

            {tripData.map((trip) => (
                <div key={trip._id} className="dataImportLine">
                       < TripBox trip={trip}
                                dataFilter={dataFilter}/>

                </div>
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
        <section className="underConstruction">
            <h2 > Show trips  </h2>
            <div className="ramka">
                {data ? (
                    <div>
                        <TripsList tripData={data}
                                   dataFilter={dataFilter} />
                    </div>
                ) : (
                    <p>Ładowanie danych...</p>
                )}
            </div>
        </section>
    );
}

export default ShowTrips;